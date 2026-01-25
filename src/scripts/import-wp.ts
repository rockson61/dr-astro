import { createClient } from '@supabase/supabase-js';
import DOMPurify from 'isomorphic-dompurify';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const WP_API_URL = process.env.WP_API_URL || 'https://dentalreach.today/wp-json/wp/v2';
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface WPPost {
    id: number;
    date: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    author: number;
    featured_media: number;
    categories: number[];
    tags: number[];
    yoast_head_json?: any; // For SEO
    _embedded?: any;
}

interface WPUser {
    id: number;
    name: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls?: Record<string, string>;
}

// Map key: WP Author ID -> Value: Supabase Profile UUID
const authorMap = new Map<number, string>();

async function fetchWP(endpoint: string) {
    const res = await fetch(`${WP_API_URL}/${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
    return res.json();
}

async function uploadImageToSupabase(url: string, slug: string): Promise<string | null> {
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const filename = path.basename(url).split('?')[0]; // simple filename extraction
        const storagePath = `articles/${slug}/${filename}`;

        const { data, error } = await supabase.storage
            .from('images') // Ensure this bucket exists
            .upload(storagePath, buffer, {
                contentType: response.headers.get('content-type') || 'image/jpeg',
                upsert: true
            });

        if (error) {
            console.error(`Upload error for ${url}:`, error.message);
            return null;
        }

        const { data: publicData } = supabase.storage.from('images').getPublicUrl(storagePath);
        return publicData.publicUrl;
    } catch (e) {
        console.error(`Failed to process image ${url}:`, e);
        return null;
    }
}

async function migrateAuthors() {
    console.log('Migrating Authors...');
    let page = 1;
    let authors: WPUser[] = [];

    while (true) {
        try {
            const batch = await fetchWP(`users?page=${page}&per_page=100`);
            if (batch.length === 0) break;
            authors = [...authors, ...batch];
            page++;
        } catch (e) {
            break; // End of pagination usually implies 400 error on WP API
        }
    }

    for (const author of authors) {
        // Check if profile exists by checking wp_author_id
        const { data: existing } = await supabase.from('profiles').select('id').eq('wp_author_id', author.id).single();

        if (existing) {
            authorMap.set(author.id, existing.id);
            continue;
        }

        // Create new profile (placeholder email)
        const email = `wp_import_${author.slug}@dentalreach.temp`; // Placeholder

        // 1. Create Auth User (Optional: Skipping strict Auth creation for migration simplicity, inserting directly to profiles if RLS allows, but usually we need an auth user. 
        // For a script using service_role, we can insert into auth.users directly or just profiles if profiles is decoupled. 
        // Assuming profiles.id references auth.users, we MUST create an auth user first.

        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email: email,
            email_confirm: true,
            user_metadata: { full_name: author.name }
        });

        if (authError || !authUser.user) {
            console.error(`Failed to create user for ${author.name}:`, authError);
            continue;
        }

        const { error: profileError } = await supabase.from('profiles').insert({
            id: authUser.user.id,
            email: email,
            username: author.slug,
            full_name: author.name,
            role: 'author',
            bio: author.description,
            wp_author_id: author.id,
            avatar_url: author.avatar_urls?.['96']
        });

        if (profileError) {
            console.error(`Failed to create profile for ${author.name}:`, profileError);
        } else {
            authorMap.set(author.id, authUser.user.id);
            console.log(`Migrated author: ${author.name}`);
        }
    }
}

async function migratePosts() {
    console.log('Migrating Posts...');
    let page = 1;

    while (true) {
        // Fetch posts with embedded media/author info
        let posts: WPPost[] = [];
        try {
            posts = await fetchWP(`posts?page=${page}&per_page=20&_embed`);
            if (posts.length === 0) break;
        } catch (e) {
            console.log('Finished fetching posts.');
            break;
        }

        for (const post of posts) {
            const { data: existing } = await supabase.from('articles').select('id').eq('wp_post_id', post.id).single();
            if (existing) {
                console.log(`Skipping existing post: ${post.title.rendered}`);
                continue;
            }

            // Sanitize Content
            let cleanContent = DOMPurify.sanitize(post.content.rendered, {
                USE_PROFILES: { html: true },
                ADD_ATTR: ['target']
            });

            // Handle Featured Image
            let featuredImageUrl = null;
            if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
                const wpUrl = post._embedded['wp:featuredmedia'][0].source_url;
                featuredImageUrl = await uploadImageToSupabase(wpUrl, post.slug);
            }

            // Map Author
            const authorId = authorMap.get(post.author) || authorMap.values().next().value; // Fallback

            // Map SEO
            const seoTitle = post.yoast_head_json?.title || post.title.rendered;
            const seoDesc = post.yoast_head_json?.description || post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160);

            // Structure for TipTap (Basic HTML wrapper since we aren't converting to JSON Schema strictly yet)
            // Ideally we parse HTML to TipTap JSON, but EditorContent accepts HTML string too if configured.
            // For robustness, we'll store specific HTML structure.

            const insertPayload = {
                title: post.title.rendered,
                slug: post.slug,
                content: cleanContent, // Storing HTML string directly as JSONB might need wrapping or specific handling in renderer
                excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
                status: post.status === 'publish' ? 'published' : 'draft',
                author_id: authorId,
                wp_post_id: post.id,
                wp_guid: post.link,
                image_url: featuredImageUrl,
                meta_title: seoTitle,
                meta_description: seoDesc,
                published_at: post.date,
                views_count: 0
            };

            const { error } = await supabase.from('articles').insert(insertPayload);

            if (error) {
                console.error(`Failed to insert post ${post.title.rendered}:`, error.message);
            } else {
                console.log(`Migrated post: ${post.title.rendered}`);
            }
        }
        page++;
    }
}

async function run() {
    await migrateAuthors();
    await migratePosts();
    console.log('Migration Complete');
}

run().catch(console.error);
