import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, ak as Fragment } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CFYPoMlB.mjs';
import { format } from 'date-fns';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let articles = [];
  let categories = [];
  try {
    const url = new URL(Astro2.request.url);
    const categoryFilter2 = url.searchParams.get("category");
    const tagFilter2 = url.searchParams.get("tag");
    const supabase = createSupabaseServerClient(Astro2);
    let query = supabase.from("articles").select(
      "*, author:profiles(full_name, avatar_url), category:categories(name, slug)"
    ).eq("status", "published").order("created_at", { ascending: false });
    if (categoryFilter2) {
      query = supabase.from("articles").select(
        "*, author:profiles(full_name, avatar_url), category:categories!inner(name, slug)"
      ).eq("status", "published").eq("category.slug", categoryFilter2).order("created_at", { ascending: false });
    }
    if (tagFilter2) {
      query = query.contains("tags", [tagFilter2]);
    }
    const { data: articleData } = await query.limit(20);
    if (articleData) articles = articleData;
    const { data: categoryData } = await supabase.from("categories").select("id, name, slug").order("name");
    if (categoryData) categories = categoryData;
  } catch (error) {
    console.log("Using mock articles - Supabase not configured");
  }
  const mockArticles = [
    {
      title: "The Future of Digital Impressioning",
      slug: "future-digital-impressioning",
      excerpt: "How intraoral scanners are revolutionizing dental workflows and patient experiences.",
      image_url: "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=800",
      created_at: "2026-01-15",
      author: { full_name: "Dr. Sarah Chen" },
      category: { name: "Digital Dentistry", slug: "digital" }
    },
    {
      title: "Minimally Invasive Techniques in Endodontics",
      slug: "minimally-invasive-endodontics",
      excerpt: "Advances in root canal therapy that preserve more tooth structure and improve outcomes.",
      image_url: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
      created_at: "2026-01-12",
      author: { full_name: "Dr. Raj Patel" },
      category: { name: "Endodontics", slug: "endodontics" }
    },
    {
      title: "AI-Powered Diagnostics: A New Era",
      slug: "ai-powered-diagnostics",
      excerpt: "How artificial intelligence is transforming radiograph analysis and treatment planning.",
      image_url: "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800",
      created_at: "2026-01-10",
      author: { full_name: "Dr. Emily Watson" },
      category: { name: "Technology", slug: "technology" }
    },
    {
      title: "Building a Successful Dental Practice in 2026",
      slug: "successful-practice-2026",
      excerpt: "Key strategies for growth, patient retention, and operational efficiency.",
      image_url: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800",
      created_at: "2026-01-08",
      author: { full_name: "Dr. Michael Torres" },
      category: { name: "Practice Management", slug: "practice-management" }
    },
    {
      title: "Pediatric Dental Anxiety: New Approaches",
      slug: "pediatric-dental-anxiety",
      excerpt: "Evidence-based techniques for managing fear and creating positive experiences for young patients.",
      image_url: "https://images.pexels.com/photos/3779706/pexels-photo-3779706.jpeg?auto=compress&cs=tinysrgb&w=800",
      created_at: "2026-01-05",
      author: { full_name: "Dr. Lisa Andersson" },
      category: { name: "Pediatric", slug: "pediatric" }
    },
    {
      title: "Implant Dentistry: Complications and Solutions",
      slug: "implant-complications",
      excerpt: "Understanding and managing common implant failures.",
      image_url: "https://images.pexels.com/photos/6502002/pexels-photo-6502002.jpeg?auto=compress&cs=tinysrgb&w=800",
      created_at: "2026-01-03",
      author: { full_name: "Dr. James Liu" },
      category: { name: "Implantology", slug: "implantology" }
    }
  ];
  const displayArticles = articles && articles.length > 0 ? articles : mockArticles;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Articles | DentalReach" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy py-20 text-center text-white relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-tight">
Dental<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Insights</span> </h1> <p class="text-gray-400 max-w-2xl mx-auto text-lg font-light">
Expert articles, case studies, and research from leading dental
                professionals.
</p> </div> </section> <div class="bg-tuio-bg min-h-screen"> <div class="container mx-auto px-4 py-12"> <!-- Category Filters --> <div class="flex flex-wrap gap-3 mb-12 justify-center"> <a href="/articles"${addAttribute(`px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm transition-all ${!categoryFilter ? "bg-tuio-red text-white shadow-lg" : "bg-white text-tuio-navy hover:bg-gray-100 border border-gray-200"}`, "class")}>
All Articles
</a> ${categories.length > 0 ? categories.map((cat) => renderTemplate`<a${addAttribute(`/articles?category=${cat.slug}`, "href")}${addAttribute(`px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm transition-all ${categoryFilter === cat.slug ? "bg-tuio-red text-white shadow-lg" : "bg-white text-tuio-navy hover:bg-gray-100 border border-gray-200"}`, "class")}> ${cat.name} </a>`) : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <a href="/articles?category=digital"${addAttribute(`px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm bg-white text-tuio-navy hover:bg-gray-100 border border-gray-200 transition-all ${categoryFilter === "digital" ? "!bg-tuio-red !text-white shadow-lg" : ""}`, "class")}>
Digital Dentistry
</a> <a href="/articles?category=endodontics"${addAttribute(`px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm bg-white text-tuio-navy hover:bg-gray-100 border border-gray-200 transition-all ${categoryFilter === "endodontics" ? "!bg-tuio-red !text-white shadow-lg" : ""}`, "class")}>
Endodontics
</a> <a href="/articles?category=implantology"${addAttribute(`px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm bg-white text-tuio-navy hover:bg-gray-100 border border-gray-200 transition-all ${categoryFilter === "implantology" ? "!bg-tuio-red !text-white shadow-lg" : ""}`, "class")}>
Implantology
</a> <a href="/articles?category=orthodontics"${addAttribute(`px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm bg-white text-tuio-navy hover:bg-gray-100 border border-gray-200 transition-all ${categoryFilter === "orthodontics" ? "!bg-tuio-red !text-white shadow-lg" : ""}`, "class")}>
Orthodontics
</a> ` })}`} </div> <!-- Active Filters --> ${tagFilter && renderTemplate`<div class="flex justify-center mb-8"> <div class="inline-flex items-center gap-2 bg-tuio-navy text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"> <span>Tag: #${tagFilter}</span> <a href="/articles" class="hover:text-tuio-red transition-colors ml-2" aria-label="Remove filter">
✕
</a> </div> </div>`} <!-- Articles Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${displayArticles.map((article) => renderTemplate`<article class="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group border border-transparent hover:border-tuio-red"> <div class="h-56 bg-gray-200 relative overflow-hidden"> ${article.image_url ? renderTemplate`<img${addAttribute(article.image_url, "src")}${addAttribute(article.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">` : renderTemplate`<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-tuio text-xl uppercase">
Article
</div>`} ${article.category && renderTemplate`<a${addAttribute(`/articles?category=${article.category.slug}`, "href")} class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-tuio-red hover:bg-tuio-red hover:text-white transition-colors"> ${article.category.name} </a>`} </div> <div class="p-8"> <div class="flex items-center gap-3 mb-4"> ${article.author?.avatar_url ? renderTemplate`<img${addAttribute(article.author.avatar_url, "src")}${addAttribute(article.author.full_name, "alt")} class="w-10 h-10 rounded-full object-cover">` : renderTemplate`<div class="w-10 h-10 rounded-full bg-tuio-red text-white flex items-center justify-center font-bold text-sm"> ${article.author?.full_name?.charAt(
    0
  ) || "A"} </div>`} <div> <div class="text-sm font-bold text-tuio-navy"> ${article.author?.full_name || "Anonymous"} </div> <div class="text-xs text-gray-400"> ${format(
    new Date(article.created_at),
    "MMM d, yyyy"
  )} </div> </div> </div> <h3 class="text-xl font-tuio uppercase text-tuio-navy mb-3 group-hover:text-tuio-red transition-colors line-clamp-2"> <a${addAttribute(`/articles/${article.slug}`, "href")}> ${article.title} </a> </h3> <p class="text-gray-500 text-sm line-clamp-2 mb-6"> ${article.excerpt} </p> <a${addAttribute(`/articles/${article.slug}`, "href")} class="inline-flex items-center gap-2 text-tuio-red font-bold uppercase text-sm tracking-wide hover:gap-4 transition-all">
Read More
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </article>`)} </div> ${displayArticles.length === 0 && renderTemplate`<div class="text-center py-20"> <div class="text-6xl mb-6">📝</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-4">
No Articles Found
</h3> <p class="text-gray-500">
Check back soon for new content!
</p> </div>`} </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/articles/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/articles/index.astro";
const $$url = "/articles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
