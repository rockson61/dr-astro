import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let featuredListings = [];
  try {
    const supabase = createSupabaseServerClient(Astro2);
    const { data } = await supabase.from("listings").select("*").eq("is_verified", true).order("rating_avg", { ascending: false }).limit(6);
    if (data) featuredListings = data;
  } catch (error) {
    console.log("Using mock listings - Supabase not configured");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dental Directory | Find Verified Clinics & Labs" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-tuio-navy relative py-20 px-4 rounded-b-[40px] shadow-lg"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto relative z-10 text-center"> <h1 class="text-4xl md:text-7xl font-tuio uppercase text-white mb-6 leading-tight">
Find Experts<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">In Dentistry</span> </h1> <p class="text-gray-400 mb-10 max-w-2xl mx-auto text-lg font-light">Search thousands of verified dentists, clinics, and laboratories worldwide.</p> <form class="max-w-3xl mx-auto flex flex-col md:flex-row gap-2 bg-white/10 backdrop-blur-md p-3 rounded-[32px] border border-white/20"> <input type="text" placeholder="Search by name, specialty, or city..." class="flex-grow px-6 py-4 rounded-[24px] bg-white text-tuio-navy placeholder:text-gray-400 outline-none font-medium focus:ring-2 focus:ring-tuio-red"> <button class="px-8 py-4 bg-tuio-red text-white font-bold rounded-[24px] hover:bg-white hover:text-tuio-red transition-all shadow-lg uppercase tracking-wide">
Search
</button> </form> </div> </section>  <section class="py-16 bg-tuio-bg"> <div class="container mx-auto px-4"> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-8 text-center md:text-left">Browse by Category</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"> ${["General Dentistry", "Orthodontics", "Oral Surgery", "Dental Labs", "Manufacturers", "Pediatric", "Cosmetic", "Implants"].map((cat, i) => renderTemplate`<a${addAttribute(`/directory?category=${cat}`, "href")}${addAttribute(`bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center border overflow-hidden group relative ${i === 0 ? "bg-tuio-blue text-white hover:text-white" : "border-transparent hover:border-tuio-red"}`, "class")}> ${i === 0 && renderTemplate`<div class="absolute inset-0 bg-blue-600 opacity-50 mix-blend-multiply"></div>`} <span${addAttribute(`block font-tuio text-lg relative z-10 ${i === 0 ? "text-white" : "text-tuio-navy group-hover:text-tuio-red"} transition-colors uppercase`, "class")}>${cat}</span> </a>`)} </div> </div> </section>  <section class="py-12 bg-white rounded-t-[40px]"> <div class="container mx-auto px-4"> <div class="flex flex-col md:flex-row justify-between items-end mb-8 gap-4"> <div> <span class="text-tuio-red font-bold tracking-widest uppercase text-sm">Best In Class</span> <h2 class="text-4xl font-tuio uppercase text-tuio-navy">Featured Listings</h2> </div> <a href="/directory/search" class="px-6 py-2 border border-gray-200 rounded-full font-bold text-gray-500 hover:bg-tuio-navy hover:text-white transition-all">View All Members</a> </div> <div class="grid md:grid-cols-3 gap-6"> ${featuredListings && featuredListings.length > 0 ? featuredListings.map((listing) => renderTemplate`<a${addAttribute(`/directory/${listing.slug}`, "href")} class="bg-tuio-bg rounded-[32px] overflow-hidden block hover:shadow-2xl hover:-translate-y-2 transition-all group border border-transparent hover:border-tuio-red"> <div class="h-64 bg-gray-200 relative overflow-hidden"> ${listing.gallery && listing.gallery[0] ? renderTemplate`<img${addAttribute(listing.gallery[0], "src")}${addAttribute(listing.business_name, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">` : renderTemplate`<div class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 font-tuio text-2xl uppercase opacity-50"> ${listing.business_name.substring(0, 2)} </div>`} ${listing.is_verified && renderTemplate`<div class="absolute top-4 right-4 bg-white/90 backdrop-blur text-tuio-navy text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1"> <span class="text-tuio-red">✓</span> VERIFIED
</div>`} </div> <div class="p-8"> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2 group-hover:text-tuio-red transition-colors">${listing.business_name}</h3> <div class="flex items-center gap-1 text-yellow-500 mb-4 font-bold"> <span>★ ${listing.rating_avg}</span> <span class="text-gray-300 font-normal">(${Math.floor(Math.random() * 50) + 1} reviews)</span> </div> <p class="text-gray-500 line-clamp-2 mb-6 font-light"> ${listing.description || "Premium dental service provider."} </p> <div class="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wide"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> ${listing.address_json?.city || "Global"}, ${listing.address_json?.country || "Network"} </div> </div> </a>`) : (
    // Mock Data Fallback for Design Verification
    [1, 2, 3].map((i) => renderTemplate`<div class="bg-tuio-bg rounded-[32px] overflow-hidden block opacity-80 border border-transparent"> <div class="h-64 bg-gray-200 animate-pulse"></div> <div class="p-8"> <div class="h-8 bg-gray-200 rounded-full w-3/4 mb-4"></div> <div class="h-4 bg-gray-200 rounded-full w-1/2 mb-6"></div> <div class="h-20 bg-gray-200 rounded-2xl w-full"></div> </div> </div>`)
  )} </div> </div> </section> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/directory/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/directory/index.astro";
const $$url = "/directory";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
