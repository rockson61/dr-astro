import { s as supabase } from '../../../chunks/supabase_CFYPoMlB.mjs';
import * as fs from 'fs';
import * as path from 'path';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const BASE_URL = "https://dentalreach.today";
const MAX_URLS_PER_SITEMAP = 100;
const PUBLIC_DIR = path.join(process.cwd(), "public");
const slugify = (value) => {
  if (!value) return "";
  return value.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/-{2,}/g, "-").replace(/^-|-$/g, "");
};
const generateUrlsetXml = (urls) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  urls.forEach((url) => {
    xml += `<url>
<loc>${url.loc}</loc>
`;
    if (url.lastmod) xml += `<lastmod>${url.lastmod}</lastmod>
`;
    xml += `<changefreq>${url.changefreq}</changefreq>
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
<lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
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
const writeFile = (filename, content) => {
  const filepath = path.join(PUBLIC_DIR, filename);
  try {
    fs.writeFileSync(filepath, content, "utf-8");
  } catch (e) {
    console.error(`Failed to write sitemap ${filename}`, e);
  }
};
const POST = async ({ request }) => {
  try {
    const allSitemapLocs = [];
    let totalUrls = 0;
    const generatedSitemaps = [];
    const staticUrls = [
      { loc: `${BASE_URL}/`, changefreq: "always", priority: 1 },
      { loc: `${BASE_URL}/articles`, changefreq: "hourly", priority: 0.9 },
      { loc: `${BASE_URL}/events`, changefreq: "daily", priority: 0.9 },
      { loc: `${BASE_URL}/jobs`, changefreq: "daily", priority: 0.9 },
      { loc: `${BASE_URL}/podcasts`, changefreq: "daily", priority: 0.8 },
      { loc: `${BASE_URL}/products`, changefreq: "daily", priority: 0.8 },
      { loc: `${BASE_URL}/forum`, changefreq: "hourly", priority: 0.8 },
      { loc: `${BASE_URL}/dentists`, changefreq: "daily", priority: 0.7 },
      { loc: `${BASE_URL}/journals`, changefreq: "daily", priority: 0.7 },
      { loc: `${BASE_URL}/business-listings`, changefreq: "daily", priority: 0.7 },
      { loc: `${BASE_URL}/guides`, changefreq: "weekly", priority: 0.7 },
      { loc: `${BASE_URL}/about`, changefreq: "monthly", priority: 0.6 },
      { loc: `${BASE_URL}/login`, changefreq: "monthly", priority: 0.5 },
      { loc: `${BASE_URL}/register`, changefreq: "monthly", priority: 0.5 },
      { loc: `${BASE_URL}/privacy`, changefreq: "monthly", priority: 0.5 },
      { loc: `${BASE_URL}/terms`, changefreq: "monthly", priority: 0.5 },
      { loc: `${BASE_URL}/locations`, changefreq: "weekly", priority: 0.6 }
    ];
    writeFile("sitemap_main.xml", generateUrlsetXml(staticUrls));
    allSitemapLocs.push(`${BASE_URL}/sitemap_main.xml`);
    generatedSitemaps.push("sitemap_main.xml");
    totalUrls += staticUrls.length;
    const allArticles = [];
    let from = 0;
    const pageSize = 1e3;
    while (true) {
      const { data, error } = await supabase.from("articles").select("id, title, created_at, updated_at").eq("is_approved", true).order("created_at", { ascending: false }).range(from, from + pageSize - 1);
      if (!data || data.length === 0) break;
      allArticles.push(...data);
      if (data.length < pageSize) break;
      from += pageSize;
    }
    if (allArticles.length > 0) {
      const articleUrls = allArticles.map((a) => ({
        loc: `${BASE_URL}/${slugify(a.title) || a.id}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: a.updated_at ? new Date(a.updated_at).toISOString().split("T")[0] : void 0
      }));
      const chunks = chunkArray(articleUrls, MAX_URLS_PER_SITEMAP);
      chunks.forEach((chunk, i) => {
        const filename = chunks.length === 1 ? "sitemap_articles.xml" : `sitemap_articles_${i + 1}.xml`;
        writeFile(filename, generateUrlsetXml(chunk));
        allSitemapLocs.push(`${BASE_URL}/${filename}`);
        generatedSitemaps.push(filename);
      });
      totalUrls += allArticles.length;
    }
    writeFile("sitemap.xml", generateSitemapIndexXml(allSitemapLocs));
    generatedSitemaps.push("sitemap.xml");
    return new Response(JSON.stringify({
      success: true,
      totalUrls,
      sitemapsCount: allSitemapLocs.length,
      sitemaps: generatedSitemaps,
      message: `Successfully regenerated ${allSitemapLocs.length} sitemaps`
    }), { status: 200 });
  } catch (error) {
    console.error("Error regenerating sitemap:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
