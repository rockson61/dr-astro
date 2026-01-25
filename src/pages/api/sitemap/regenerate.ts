import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';
import * as fs from 'fs';
import * as path from 'path';

export const prerender = false;

const BASE_URL = import.meta.env.SITE || 'https://dentalreach.today';
const MAX_URLS_PER_SITEMAP = 100;
// Note: In a deployed Vercel/Node environment, writing to 'public' might not persist or be served immediately if using serverless.
// But we replicate local logic here.
const PUBLIC_DIR = path.join(process.cwd(), 'public');

interface UrlEntry {
    loc: string;
    changefreq: string;
    priority: number;
    lastmod?: string;
}

const slugify = (value: string | null | undefined): string => {
    if (!value) return '';
    return value.toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-')
        .replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
};

const generateUrlsetXml = (urls: UrlEntry[]): string => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach((url) => {
        xml += `<url>\n<loc>${url.loc}</loc>\n`;
        if (url.lastmod) xml += `<lastmod>${url.lastmod}</lastmod>\n`;
        xml += `<changefreq>${url.changefreq}</changefreq>\n<priority>${url.priority}</priority>\n</url>\n`;
    });
    return xml + `</urlset>`;
};

const generateSitemapIndexXml = (locs: string[]): string => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    locs.forEach((loc) => {
        xml += `<sitemap>\n<loc>${loc}</loc>\n<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n</sitemap>\n`;
    });
    return xml + `</sitemapindex>`;
};

const chunkArray = <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
};

const writeFile = (filename: string, content: string) => {
    const filepath = path.join(PUBLIC_DIR, filename);
    try {
        fs.writeFileSync(filepath, content, 'utf-8');
    } catch (e) {
        console.error(`Failed to write sitemap ${filename}`, e);
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const allSitemapLocs: string[] = [];
        let totalUrls = 0;
        const generatedSitemaps: string[] = [];

        // Static pages
        const staticUrls: UrlEntry[] = [
            { loc: `${BASE_URL}/`, changefreq: 'always', priority: 1 },
            { loc: `${BASE_URL}/articles`, changefreq: 'hourly', priority: 0.9 },
            { loc: `${BASE_URL}/events`, changefreq: 'daily', priority: 0.9 },
            { loc: `${BASE_URL}/jobs`, changefreq: 'daily', priority: 0.9 },
            { loc: `${BASE_URL}/podcasts`, changefreq: 'daily', priority: 0.8 },
            { loc: `${BASE_URL}/products`, changefreq: 'daily', priority: 0.8 },
            { loc: `${BASE_URL}/forum`, changefreq: 'hourly', priority: 0.8 },
            { loc: `${BASE_URL}/dentists`, changefreq: 'daily', priority: 0.7 },
            { loc: `${BASE_URL}/journals`, changefreq: 'daily', priority: 0.7 },
            { loc: `${BASE_URL}/business-listings`, changefreq: 'daily', priority: 0.7 },
            { loc: `${BASE_URL}/guides`, changefreq: 'weekly', priority: 0.7 },
            { loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: 0.6 },
            { loc: `${BASE_URL}/login`, changefreq: 'monthly', priority: 0.5 },
            { loc: `${BASE_URL}/register`, changefreq: 'monthly', priority: 0.5 },
            { loc: `${BASE_URL}/privacy`, changefreq: 'monthly', priority: 0.5 },
            { loc: `${BASE_URL}/terms`, changefreq: 'monthly', priority: 0.5 },
            { loc: `${BASE_URL}/locations`, changefreq: 'weekly', priority: 0.6 },
        ];

        writeFile('sitemap_main.xml', generateUrlsetXml(staticUrls));
        allSitemapLocs.push(`${BASE_URL}/sitemap_main.xml`);
        generatedSitemaps.push('sitemap_main.xml');
        totalUrls += staticUrls.length;

        // Articles
        const allArticles: any[] = [];
        let from = 0;
        const pageSize = 1000;
        while (true) {
            const { data, error } = await supabase.from('articles').select('id, title, created_at, updated_at')
                .eq('is_approved', true).order('created_at', { ascending: false }).range(from, from + pageSize - 1);
            if (!data || data.length === 0) break;
            allArticles.push(...data);
            if (data.length < pageSize) break;
            from += pageSize;
        }

        if (allArticles.length > 0) {
            const articleUrls: UrlEntry[] = allArticles.map((a: any) => ({
                loc: `${BASE_URL}/${slugify(a.title) || a.id}`,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: a.updated_at ? new Date(a.updated_at).toISOString().split('T')[0] : undefined,
            }));
            const chunks = chunkArray(articleUrls, MAX_URLS_PER_SITEMAP);
            chunks.forEach((chunk, i) => {
                const filename = chunks.length === 1 ? 'sitemap_articles.xml' : `sitemap_articles_${i + 1}.xml`;
                writeFile(filename, generateUrlsetXml(chunk));
                allSitemapLocs.push(`${BASE_URL}/${filename}`);
                generatedSitemaps.push(filename);
            });
            totalUrls += allArticles.length;
        }

        // Main Index
        writeFile('sitemap.xml', generateSitemapIndexXml(allSitemapLocs));
        generatedSitemaps.push('sitemap.xml');

        return new Response(JSON.stringify({
            success: true,
            totalUrls,
            sitemapsCount: allSitemapLocs.length,
            sitemaps: generatedSitemaps,
            message: `Successfully regenerated ${allSitemapLocs.length} sitemaps`
        }), { status: 200 });

    } catch (error: any) {
        console.error('Error regenerating sitemap:', error);
        return new Response(JSON.stringify({ error: error.message || 'Failed' }), { status: 500 });
    }
}
