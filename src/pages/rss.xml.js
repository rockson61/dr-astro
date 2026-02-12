
import rss from '@astrojs/rss';


// Helper to create a client (we can't use the server client helper here easily as context is different, or we can assume env vars are present)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(context) {
    const { data: articles } = await supabase
        .from('articles')
        .select('title, slug, excerpt, content, published_at, cover_image, author:profiles(full_name)')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(50);

    return rss({
        title: 'DentalReach Magazine',
        description: 'Leading digital magazine for dental professionals.',
        site: context.site,
        items: (articles || []).map((post) => ({
            title: post.title,
            pubDate: new Date(post.published_at),
            description: post.excerpt,
            link: `/articles/${post.slug}`,
            content: post.content, // Optional: verify if full content is desired in RSS
            author: post.author?.full_name,
            customData: `<enclosure url="${post.cover_image || ''}" length="0" type="image/jpeg" />`
        })),
        customData: `<language>en-us</language>`,
    });
}
