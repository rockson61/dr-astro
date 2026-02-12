import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const supabaseUrl = "http://api.db.dentaloffice.io";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const BASE_URL = "https://dentalreach.today";
const MAX_URLS = 100;
const generateUrlsetXml = (urls) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  urls.forEach((url) => {
    xml += `<url>
<loc>${url.loc}</loc>
<changefreq>${url.changefreq}</changefreq>
<priority>${url.priority}</priority>
</url>
`;
  });
  return xml + `</urlset>`;
};
const generateSitemapIndexXml = (locs) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  locs.forEach((loc) => {
    xml += `<sitemap>
<loc>${loc}</loc>
</sitemap>
`;
  });
  return xml + `</sitemapindex>`;
};
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
};
const GET = async ({ request }) => {
  request.headers.get("authorization");
  try {
    const allSitemapLocs = [];
    const generatedFiles = [];
    const staticUrls = [
      { loc: `${BASE_URL}/`, changefreq: "always", priority: 1 },
      { loc: `${BASE_URL}/articles`, changefreq: "daily", priority: 0.9 },
      { loc: `${BASE_URL}/events`, changefreq: "daily", priority: 0.9 },
      { loc: `${BASE_URL}/jobs`, changefreq: "daily", priority: 0.9 },
      { loc: `${BASE_URL}/podcasts`, changefreq: "daily", priority: 0.8 },
      { loc: `${BASE_URL}/products`, changefreq: "daily", priority: 0.8 },
      { loc: `${BASE_URL}/forum`, changefreq: "daily", priority: 0.8 },
      { loc: `${BASE_URL}/about`, changefreq: "daily", priority: 0.6 },
      { loc: `${BASE_URL}/guides`, changefreq: "daily", priority: 0.7 },
      { loc: `${BASE_URL}/locations`, changefreq: "daily", priority: 0.6 }
    ];
    generatedFiles.push({ name: "sitemap_main.xml", content: generateUrlsetXml(staticUrls) });
    allSitemapLocs.push(`${BASE_URL}/sitemap_main.xml`);
    const allArticles = [];
    let from = 0;
    while (true) {
      const { data } = await supabase.from("articles").select("id, title, slug").eq("is_approved", true).order("created_at", { ascending: false }).range(from, from + 999);
      if (!data || data.length === 0) break;
      allArticles.push(...data);
      if (data.length < 1e3) break;
      from += 1e3;
    }
    if (allArticles.length > 0) {
      const articleUrls = allArticles.map((a) => ({
        loc: `${BASE_URL}/articles/${a.slug || a.id}`,
        changefreq: "daily",
        priority: 0.8
      }));
      const chunks = chunkArray(articleUrls, MAX_URLS);
      chunks.forEach((chunk, i) => {
        const filename = chunks.length === 1 ? "sitemap_articles.xml" : `sitemap_articles_${i + 1}.xml`;
        generatedFiles.push({ name: filename, content: generateUrlsetXml(chunk) });
        allSitemapLocs.push(`${BASE_URL}/${filename}`);
      });
    }
    const { data: podcasts } = await supabase.from("podcasts").select("id, title, slug").eq("is_approved", true).order("created_at", { ascending: false });
    if (podcasts && podcasts.length > 0) {
      const urls = podcasts.map((p) => ({
        loc: `${BASE_URL}/podcasts/${p.slug || p.id}`,
        changefreq: "daily",
        priority: 0.6
      }));
      generatedFiles.push({ name: "sitemap_podcasts.xml", content: generateUrlsetXml(urls) });
      allSitemapLocs.push(`${BASE_URL}/sitemap_podcasts.xml`);
    }
    const { data: products } = await supabase.from("products").select("id, name, slug").order("created_at", { ascending: false });
    if (products && products.length > 0) {
      const urls = products.map((p) => ({
        loc: `${BASE_URL}/products/${p.slug || p.id}`,
        changefreq: "daily",
        priority: 0.6
      }));
      generatedFiles.push({ name: "sitemap_products.xml", content: generateUrlsetXml(urls) });
      allSitemapLocs.push(`${BASE_URL}/sitemap_products.xml`);
    }
    generatedFiles.push({ name: "sitemap.xml", content: generateSitemapIndexXml(allSitemapLocs) });
    const publicDir = path.join(process.cwd(), "public");
    for (const file of generatedFiles) {
      fs.writeFileSync(path.join(publicDir, file.name), file.content);
    }
    return new Response(JSON.stringify({
      success: true,
      message: `Generated ${generatedFiles.length} sitemaps`,
      files: generatedFiles.map((f) => f.name),
      articlesCount: allArticles.length
    }), { status: 200 });
  } catch (error) {
    console.error("Cron error:", error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
