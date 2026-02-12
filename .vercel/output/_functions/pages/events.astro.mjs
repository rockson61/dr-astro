import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CYzxA37O.mjs';
import { format } from 'date-fns';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let events = [];
  try {
    const supabase = createSupabaseServerClient(Astro2);
    const { data } = await supabase.from("events").select("*").eq("status", "upcoming").order("start_date", { ascending: true });
    if (data) events = data;
  } catch (error) {
    console.log("Using mock events - Supabase not configured");
  }
  const mockEvents = [
    { title: "IDS 2026 - Cologne", slug: "ids-2026", type: "Conference", start_date: "2026-03-24", location_name: "Cologne, Germany", is_virtual: false, image_url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Digital Dentistry Summit", slug: "digital-summit", type: "Webinar", start_date: "2026-05-10", location_name: null, is_virtual: true, image_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Asia Pacific Dental Congress", slug: "apdc-2026", type: "Congress", start_date: "2026-07-15", location_name: "Singapore", is_virtual: false, image_url: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ];
  const displayEvents = events && events.length > 0 ? events : mockEvents;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dental Events & Conferences" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy py-20 text-center text-white relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-tight">
Global Dental<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Events</span> </h1> <p class="text-gray-400 max-w-2xl mx-auto text-lg font-light">Discover conferences, webinars, and workshops to advance your career.</p> </div> </section> <div class="bg-tuio-bg min-h-screen container mx-auto px-4 py-12"> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${displayEvents.map((event) => renderTemplate`<div class="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group border border-transparent hover:border-tuio-red"> <div class="h-56 bg-gray-200 relative overflow-hidden"> ${event.image_url ? renderTemplate`<img${addAttribute(event.image_url, "src")}${addAttribute(event.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">` : renderTemplate`<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-tuio text-xl uppercase">Event</div>`} <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-tuio-red"> ${event.type} </div> </div> <div class="p-8"> <div class="text-sm text-tuio-red mb-3 uppercase tracking-widest font-bold"> ${format(new Date(event.start_date), "MMM d, yyyy")} </div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-4 group-hover:text-tuio-red transition-colors"> <a${addAttribute(`/events/${event.slug}`, "href")}>${event.title}</a> </h3> <div class="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> ${event.is_virtual ? "Virtual Event" : event.location_name || "TBA"} </div> <a${addAttribute(event.registration_url || "#", "href")} target="_blank" class="block w-full text-center py-3 bg-tuio-navy text-white rounded-full font-bold hover:bg-tuio-red transition-all shadow-md uppercase tracking-wide">
Register Now
</a> </div> </div>`)} </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/events/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/events/index.astro";
const $$url = "/events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
