import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C_IiUpen.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let episodes = [];
  try {
    const supabase = createSupabaseServerClient(Astro2);
    const { data } = await supabase.from("podcasts").select("*").eq("status", "published").order("published_at", { ascending: false }).limit(10);
    if (data) episodes = data;
  } catch (e) {
    console.log("Using mock episodes - Supabase not configured");
  }
  if (episodes.length === 0) {
    episodes = [
      {
        title: "The Future of Digital Dentistry",
        slug: "digital-dentistry",
        host: "Dr. Sarah Johnson",
        duration: "45 min",
        published_at: "2026-01-20",
        cover_url: "https://images.pexels.com/photos/5217882/pexels-photo-5217882.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        title: "Practice Management 101",
        slug: "practice-management",
        host: "Dr. Michael Chen",
        duration: "32 min",
        published_at: "2026-01-15",
        cover_url: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        title: "AI in Diagnostics: Friend or Foe?",
        slug: "ai-diagnostics",
        host: "Dr. Emily Watson",
        duration: "51 min",
        published_at: "2026-01-10",
        cover_url: "https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        title: "Building Your Personal Brand",
        slug: "personal-brand",
        host: "Dr. Rockson Samuel",
        duration: "38 min",
        published_at: "2026-01-05",
        cover_url: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ];
  }
  const latestEpisode = episodes[0];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "DentalReach Podcasts | Voices of Dentistry" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-tuio-navy text-white py-20 relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <div class="flex flex-col md:flex-row items-center gap-12"> <div class="md:w-1/2"> <span class="inline-block px-4 py-1 bg-tuio-red rounded-full text-sm font-bold uppercase tracking-widest mb-6">New Episode</span> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-[0.9]">
Voices of<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Dentistry</span> </h1> <p class="text-xl text-gray-400 font-light mb-8">
Listen to candid conversations with the world's leading
                        dental experts, innovators, and academics.
</p> <a${addAttribute(`/podcasts/${latestEpisode.slug}`, "href")} class="px-8 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all flex items-center gap-3 inline-flex"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
Listen to Latest Episode
</a> </div> <div class="md:w-1/2 flex justify-center"> <div class="bg-white/10 backdrop-blur-sm rounded-[32px] p-8 border border-white/20 w-full max-w-md"> <div class="aspect-square bg-gray-800 rounded-[24px] mb-6 overflow-hidden relative"> <img${addAttribute(latestEpisode.cover_url, "src")}${addAttribute(latestEpisode.title, "alt")} class="w-full h-full object-cover"> <div class="absolute inset-0 bg-gradient-to-t from-tuio-navy/80 to-transparent flex items-end p-6"> <div> <h3 class="font-tuio text-xl uppercase text-white"> ${latestEpisode.title} </h3> <p class="text-gray-300 text-sm">
by ${latestEpisode.host} </p> </div> </div> </div> <div class="h-2 bg-white/20 rounded-full mb-3 overflow-hidden"> <div class="h-full bg-tuio-red w-1/3 rounded-full"></div> </div> <div class="flex justify-between text-sm text-gray-400"> <span>12:45</span> <span>${latestEpisode.duration}</span> </div> </div> </div> </div> </div> </section>  <div class="bg-tuio-bg min-h-screen py-16"> <div class="container mx-auto px-4"> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-8">
All Episodes
</h2> <div class="space-y-4"> ${episodes.map((ep, i) => renderTemplate`<a${addAttribute(`/podcasts/${ep.slug}`, "href")} class="bg-white rounded-[24px] p-6 flex items-center gap-6 hover:shadow-lg transition-all cursor-pointer group border border-transparent hover:border-tuio-red block"> <div class="w-20 h-20 rounded-[16px] overflow-hidden shrink-0"> <img${addAttribute(ep.cover_url, "src")}${addAttribute(ep.title, "alt")} class="w-full h-full object-cover"> </div> <div class="w-14 h-14 bg-tuio-bg rounded-full flex items-center justify-center shrink-0 group-hover:bg-tuio-red transition-colors"> <svg class="w-6 h-6 text-tuio-navy group-hover:text-white transition-colors pl-1" fill="currentColor" viewBox="0 0 24 24"> <path d="M8 5v14l11-7z"></path> </svg> </div> <div class="flex-grow"> <h3 class="font-tuio text-xl uppercase text-tuio-navy group-hover:text-tuio-red transition-colors"> ${ep.title} </h3> <p class="text-gray-500">Hosted by ${ep.host}</p> </div> <div class="text-gray-400 font-medium shrink-0"> ${ep.duration} </div> </a>`)} </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/podcasts/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/podcasts/index.astro";
const $$url = "/podcasts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
