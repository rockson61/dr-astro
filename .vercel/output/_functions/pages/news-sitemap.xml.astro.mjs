import { createClient } from '@supabase/supabase-js';
export { renderers } from '../renderers.mjs';

const supabaseUrl = "http://api.db.dentaloffice.io";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc";
const supabase = createClient(supabaseUrl, supabaseKey);
async function GET({ site }) {
  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1e3).toISOString();
  const { data: articles } = await supabase.from("articles").select("title, slug, published_at, category:categories(name)").eq("status", "published").gte("published_at", twoDaysAgo).order("published_at", { ascending: false });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${(articles || []).map((article) => `
  <url>
    <loc>${new URL(`/articles/${article.slug}`, site).href}</loc>
    <news:news>
      <news:publication>
        <news:name>DentalReach Magazine</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.published_at).toISOString()}</news:publication_date>
      <news:title>${article.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")}</news:title>
      <news:keywords>${article.category?.name || "Dentistry"}</news:keywords>
    </news:news>
  </url>
  `).join("")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
