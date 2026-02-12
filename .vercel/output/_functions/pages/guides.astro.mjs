import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { s as supabase } from '../chunks/supabase_CYzxA37O.mjs';
import { format } from 'date-fns';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let guides = [];
  try {
    const { data } = await supabase.from("articles").select("*, category:categories(name, slug)").eq("status", "published").or("type.eq.guide,category.slug.eq.guides").order("published_at", { ascending: false }).limit(12);
    if (data) guides = data;
  } catch (e) {
    console.error("DB error", e);
  }
  if (guides.length === 0) {
    guides = [
      {
        title: "Complete Guide to Dental SEO",
        slug: "dental-seo-guide",
        excerpt: "Learn how to rank your dental practice on Google.",
        image_url: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
        published_at: "2026-01-15",
        category: { name: "Marketing" }
      },
      {
        title: "How to Start a Dental Practice",
        slug: "start-dental-practice",
        excerpt: "Step-by-step guide for new dental entrepreneurs.",
        image_url: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=800",
        published_at: "2026-01-10",
        category: { name: "Business" }
      },
      {
        title: "Mastering Patient Communication",
        slug: "patient-communication",
        excerpt: "Build trust and improve treatment acceptance rates.",
        image_url: "https://images.pexels.com/photos/5355834/pexels-photo-5355834.jpeg?auto=compress&cs=tinysrgb&w=800",
        published_at: "2026-01-05",
        category: { name: "Practice" }
      },
      {
        title: "Infection Control Best Practices",
        slug: "infection-control",
        excerpt: "Updated protocols for modern dental practices.",
        image_url: "https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg?auto=compress&cs=tinysrgb&w=800",
        published_at: "2025-12-20",
        category: { name: "Clinical" }
      }
    ];
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dental Guides | How-To Resources" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy text-white py-20 relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10 text-center"> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-tight">
Dental<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Guides</span> </h1> <p class="text-xl text-gray-400 max-w-2xl mx-auto font-light">
Step-by-step how-to resources for dental professionals. From
                practice management to clinical techniques.
</p> </div> </section> <div class="bg-tuio-bg min-h-screen py-16"> <div class="container mx-auto px-4"> <div class="grid md:grid-cols-2 gap-8"> ${guides.map((guide, i) => renderTemplate`<a${addAttribute(`/articles/${guide.slug}`, "href")}${addAttribute(`bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group ${i === 0 ? "md:col-span-2" : ""}`, "class")}> <div${addAttribute(`flex flex-col ${i === 0 ? "md:flex-row" : ""}`, "class")}> <div${addAttribute(`${i === 0 ? "md:w-1/2 h-64 md:h-auto" : "h-56"} overflow-hidden`, "class")}> <img${addAttribute(
    guide.image_url || "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
    "src"
  )}${addAttribute(guide.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"> </div> <div${addAttribute(`p-8 ${i === 0 ? "md:w-1/2 flex flex-col justify-center" : ""}`, "class")}> <span class="text-tuio-red font-bold uppercase tracking-widest text-sm mb-3 block"> ${guide.category?.name || "Guide"} </span> <h2${addAttribute(`font-tuio uppercase text-tuio-navy mb-4 leading-tight group-hover:text-tuio-red transition-colors ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`, "class")}> ${guide.title} </h2> <p class="text-gray-500 font-light mb-6 line-clamp-2"> ${guide.excerpt} </p> <div class="flex items-center justify-between"> <span class="text-gray-400 text-sm"> ${format(
    new Date(guide.published_at),
    "MMM d, yyyy"
  )} </span> <span class="w-10 h-10 bg-tuio-bg rounded-full flex items-center justify-center group-hover:bg-tuio-red group-hover:text-white transition-all">
→
</span> </div> </div> </div> </a>`)} </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/guides/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/guides/index.astro";
const $$url = "/guides";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
