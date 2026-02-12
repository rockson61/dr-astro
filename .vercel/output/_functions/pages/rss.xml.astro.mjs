import rss from '@astrojs/rss';
import '../chunks/supabase_CFYPoMlB.mjs';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../renderers.mjs';

const supabaseUrl = "http://api.db.dentaloffice.io";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc";
const supabase = createClient(supabaseUrl, supabaseKey);
async function GET(context) {
  const { data: articles } = await supabase.from("articles").select("title, slug, excerpt, content, published_at, cover_image, author:profiles(full_name)").eq("status", "published").order("published_at", { ascending: false }).limit(50);
  return rss({
    title: "DentalReach Magazine",
    description: "Leading digital magazine for dental professionals.",
    site: context.site,
    items: (articles || []).map((post) => ({
      title: post.title,
      pubDate: new Date(post.published_at),
      description: post.excerpt,
      link: `/articles/${post.slug}`,
      content: post.content,
      // Optional: verify if full content is desired in RSS
      author: post.author?.full_name,
      customData: `<enclosure url="${post.cover_image || ""}" length="0" type="image/jpeg" />`
    })),
    customData: `<language>en-us</language>`
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
