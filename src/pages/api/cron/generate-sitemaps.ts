import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

export const prerender = false;

// Initialize Supabase Client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BASE_URL = import.meta.env.SITE || 'https://dentalreach.today';
const MAX_URLS = 100;

const slugify = (value: string | null | undefined): string => {
    if (!value) return '';
    return value.toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-')
        .replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
};

interface UrlEntry { loc: string; changefreq: string; priority: number; }

const generateUrlsetXml = (urls: UrlEntry[]): string => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach((url) => {
        xml += `<url>\n<loc>${url.loc}</loc>\n<changefreq>${url.changefreq}</changefreq>\n<priority>${url.priority}</priority>\n</url>\n`;
    });
    return xml + `</urlset>`;
};

const generateSitemapIndexXml = (locs: string[]): string => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    locs.forEach((loc) => { xml += `<sitemap>\n<loc>${loc}</loc>\n</sitemap>\n`; });
    return xml + `</sitemapindex>`;
};

const chunkArray = <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
};

export const GET: APIRoute = async ({ request }) => {
    // Verify cron secret (Vercel sends this header)
    const authHeader = request.headers.get('authorization');
    const cronSecret = import.meta.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const allSitemapLocs: string[] = [];
        const generatedFiles: { name: string; content: string }[] = [];

        // Static pages
        const staticUrls: UrlEntry[] = [
            { loc: `${BASE_URL}/`, changefreq: 'always', priority: 1 },
            { loc: `${BASE_URL}/articles`, changefreq: 'daily', priority: 0.9 },
            { loc: `${BASE_URL}/events`, changefreq: 'daily', priority: 0.9 },
            { loc: `${BASE_URL}/jobs`, changefreq: 'daily', priority: 0.9 },
            { loc: `${BASE_URL}/podcasts`, changefreq: 'daily', priority: 0.8 },
            { loc: `${BASE_URL}/products`, changefreq: 'daily', priority: 0.8 },
            { loc: `${BASE_URL}/forum`, changefreq: 'daily', priority: 0.8 },
            { loc: `${BASE_URL}/about`, changefreq: 'daily', priority: 0.6 },
            { loc: `${BASE_URL}/guides`, changefreq: 'daily', priority: 0.7 },
            { loc: `${BASE_URL}/locations`, changefreq: 'daily', priority: 0.6 },
        ];
        generatedFiles.push({ name: 'sitemap_main.xml', content: generateUrlsetXml(staticUrls) });
        allSitemapLocs.push(`${BASE_URL}/sitemap_main.xml`);

        // Fetch all articles with pagination
        const allArticles: any[] = [];
        let from = 0;
        while (true) {
            const { data } = await supabase.from('articles').select('id, title')
                .eq('is_approved', true).order('created_at', { ascending: false }).range(from, from + 999);
            if (!data || data.length === 0) break;
            allArticles.push(...data);
            if (data.length < 1000) break;
            from += 1000;
        }

        if (allArticles.length > 0) {
            const articleUrls = allArticles.map((a) => ({
                loc: `${BASE_URL}/articles/${slugify(a.title) || a.id}`,
                changefreq: 'daily',
                priority: 0.8,
            }));
            const chunks = chunkArray(articleUrls, MAX_URLS);
            chunks.forEach((chunk, i) => {
                const filename = chunks.length === 1 ? 'sitemap_articles.xml' : `sitemap_articles_${i + 1}.xml`;
                generatedFiles.push({ name: filename, content: generateUrlsetXml(chunk) });
                allSitemapLocs.push(`${BASE_URL}/${filename}`);
            });
        }

        // Podcasts
        const { data: podcasts } = await supabase.from('podcasts').select('id, title')
            .eq('is_approved', true).order('created_at', { ascending: false });
        if (podcasts && podcasts.length > 0) {
            const urls = podcasts.map((p: any) => ({
                loc: `${BASE_URL}/podcasts/${slugify(p.title) || p.id}-${p.id}`,
                changefreq: 'daily',
                priority: 0.6,
            }));
            generatedFiles.push({ name: 'sitemap_podcasts.xml', content: generateUrlsetXml(urls) });
            allSitemapLocs.push(`${BASE_URL}/sitemap_podcasts.xml`);
        }

        // Products
        const { data: products } = await supabase.from('products').select('id, name')
            .order('created_at', { ascending: false });
        if (products && products.length > 0) {
            const urls = products.map((p: any) => ({
                loc: `${BASE_URL}/products/${slugify(p.name) || p.id}-${p.id}`,
                changefreq: 'daily',
                priority: 0.6,
            }));
            generatedFiles.push({ name: 'sitemap_products.xml', content: generateUrlsetXml(urls) });
            allSitemapLocs.push(`${BASE_URL}/sitemap_products.xml`);
        }

        // Main index
        generatedFiles.push({ name: 'sitemap.xml', content: generateSitemapIndexXml(allSitemapLocs) });

        // Write files to public directory
        const publicDir = path.join(process.cwd(), 'public');
        for (const file of generatedFiles) {
            fs.writeFileSync(path.join(publicDir, file.name), file.content);
        }

        return new Response(JSON.stringify({
            success: true,
            message: `Generated ${generatedFiles.length} sitemaps`,
            files: generatedFiles.map(f => f.name),
            articlesCount: allArticles.length,
        }), { status: 200 });

    } catch (error) {
        console.error('Cron error:', error);
        return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
};
