
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET({ site }) {
    // Google News sitemaps should only contain articles published in the last 2 days
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

    const { data: articles } = await supabase
        .from('articles')
        .select('title, slug, published_at, category:categories(name)')
        .eq('status', 'published')
        .gte('published_at', twoDaysAgo)
        .order('published_at', { ascending: false });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${(articles || []).map(article => `
  <url>
    <loc>${new URL(`/articles/${article.slug}`, site).href}</loc>
    <news:news>
      <news:publication>
        <news:name>DentalReach Magazine</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.published_at).toISOString()}</news:publication_date>
      <news:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</news:title>
      <news:keywords>${article.category?.name || 'Dentistry'}</news:keywords>
    </news:news>
  </url>
  `).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
