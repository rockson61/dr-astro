import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { s as supabase } from '../chunks/supabase_woKm2pOd.mjs';
import { format } from 'date-fns';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let articles = [];
  try {
    const { data, error } = await supabase.from("articles").select(
      "*, author:profiles(full_name, avatar_url), category:categories(name, slug)"
    ).eq("status", "published").eq("category.slug", "news").order("published_at", { ascending: false }).limit(12);
    if (!error && data) articles = data;
  } catch (e) {
    console.error("DB connection failed, using mock data", e);
  }
  if (articles.length === 0) {
    articles = [
      {
        title: "FDA Approves New AI-Powered Diagnostic Tool",
        slug: "fda-ai-diagnostic-2026",
        excerpt: "A breakthrough in dental imaging technology receives regulatory clearance.",
        image_url: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=800",
        published_at: "2026-01-20T10:00:00Z",
        author: { full_name: "Dr. Sarah Chen" },
        category: { name: "Industry News" }
      },
      {
        title: "Global Shortage of Dental Lab Technicians",
        slug: "lab-technician-shortage",
        excerpt: "New report highlights the growing workforce crisis in dental laboratories worldwide.",
        image_url: "https://images.pexels.com/photos/3845777/pexels-photo-3845777.jpeg?auto=compress&cs=tinysrgb&w=800",
        published_at: "2026-01-18T14:30:00Z",
        author: { full_name: "Dr. Michael Ross" },
        category: { name: "Workforce" }
      },
      {
        title: "Sustainability in Dentistry: 2026 Trends",
        slug: "sustainability-trends-2026",
        excerpt: "How eco-conscious practices are reshaping modern dental operations.",
        image_url: "https://images.pexels.com/photos/5217882/pexels-photo-5217882.jpeg?auto=compress&cs=tinysrgb&w=800",
        published_at: "2026-01-15T09:00:00Z",
        author: { full_name: "Emily Williams" },
        category: { name: "Green Dentistry" }
      }
    ];
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dental News | Latest Industry Updates" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy py-20 text-center text-white relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-tight">
Dental<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">News</span> </h1> <p class="text-gray-400 max-w-2xl mx-auto text-lg font-light">
Stay informed with the latest developments in dental science,
                technology, and business.
</p> </div> </section> <div class="bg-tuio-bg min-h-screen py-12"> <div class="container mx-auto px-4"> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${articles.map((article) => renderTemplate`<article class="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group border border-transparent hover:border-tuio-red"> <div class="relative h-56 overflow-hidden"> <img${addAttribute(
    article.image_url || "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
    "src"
  )}${addAttribute(article.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"> <span class="absolute top-4 left-4 bg-white/90 backdrop-blur text-tuio-navy px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"> ${article.category?.name || "News"} </span> </div> <div class="p-8"> <div class="text-sm text-tuio-red mb-3 uppercase tracking-widest font-bold"> ${format(
    new Date(article.published_at),
    "MMM d, yyyy"
  )} </div> <h2 class="font-tuio text-2xl uppercase text-tuio-navy mb-4 leading-tight group-hover:text-tuio-red transition-colors"> <a${addAttribute(`/articles/${article.slug}`, "href")}> ${article.title} </a> </h2> <p class="text-gray-500 line-clamp-2 mb-6 font-light"> ${article.excerpt} </p> <div class="flex items-center justify-between border-t border-gray-100 pt-6"> <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">
By${" "} ${article.author?.full_name || "DentalReach"} </span> <a${addAttribute(`/articles/${article.slug}`, "href")} class="w-10 h-10 rounded-full bg-tuio-bg flex items-center justify-center text-gray-400 group-hover:bg-tuio-navy group-hover:text-white transition-all"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path> </svg> </a> </div> </div> </article>`)} </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/news/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/news/index.astro";
const $$url = "/news";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
