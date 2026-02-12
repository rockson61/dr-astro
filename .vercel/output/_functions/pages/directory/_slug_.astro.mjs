import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CYzxA37O.mjs';
import { MapPin, Star, Share2, Phone, Globe } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const supabase = createSupabaseServerClient(Astro2);
  const { data: listing, error } = await supabase.from("listings").select("*").eq("slug", slug).single();
  if (error || !listing) {
    return Astro2.redirect("/404");
  }
  const services = listing.amenities || [];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${listing.business_name} | DentalReach Directory` }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="relative h-[400px] w-full bg-tuio-navy overflow-hidden"> ${listing.gallery && listing.gallery[0] && renderTemplate`<div class="absolute inset-0"> <img${addAttribute(listing.gallery[0], "src")}${addAttribute(listing.business_name, "alt")} class="w-full h-full object-cover opacity-60"> <div class="absolute inset-0 bg-gradient-to-t from-tuio-navy via-transparent to-transparent"></div> </div>`} <div class="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10"> <div class="flex flex-col md:flex-row justify-between items-end gap-6"> <div> <div class="flex items-center gap-3 mb-4"> <span class="px-4 py-1 bg-tuio-red text-white text-xs font-bold uppercase tracking-widest rounded-full">${listing.type}</span> ${listing.is_verified && renderTemplate`<span class="px-4 py-1 bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
✓ Verified
</span>`} </div> <h1 class="text-4xl md:text-6xl font-tuio uppercase text-white mb-2"> ${listing.business_name} </h1> <div class="flex items-center gap-4 text-gray-300"> <div class="flex items-center gap-2"> ${renderComponent($$result2, "MapPin", MapPin, { "className": "w-5 h-5" })} ${listing.address_json?.city}, ${listing.address_json?.country} </div> <div class="flex items-center gap-1 text-yellow-400"> ${renderComponent($$result2, "Star", Star, { "className": "w-5 h-5 fill-current" })} <span class="font-bold">${listing.rating_avg || "New"}</span> </div> </div> </div> <div class="flex gap-4"> <button class="px-6 py-3 bg-white/20 backdrop-blur text-white rounded-full font-bold hover:bg-white hover:text-tuio-navy transition-all flex items-center gap-2"> ${renderComponent($$result2, "Share2", Share2, { "className": "w-5 h-5" })} Share
</button> <a href="#contact" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold hover:bg-white hover:text-tuio-red transition-all shadow-lg shadow-tuio-red/30">
Contact Now
</a> </div> </div> </div> </div> <div class="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-12"> <div class="md:col-span-2 space-y-12">  <div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"> <h2 class="text-2xl font-tuio uppercase text-tuio-navy mb-6">
About Us
</h2> <div class="prose max-w-none text-gray-600 leading-relaxed"> ${listing.description} </div> </div>  <div> <h2 class="text-2xl font-tuio uppercase text-tuio-navy mb-6">
Services
</h2> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"> ${services.map((service) => renderTemplate`<div class="bg-tuio-bg p-4 rounded-2xl flex items-center gap-3"> <div class="w-2 h-2 rounded-full bg-tuio-red"></div> <span class="font-bold text-tuio-navy"> ${service} </span> </div>`)} </div> </div>  ${listing.gallery && listing.gallery.length > 0 && renderTemplate`<div> <h2 class="text-2xl font-tuio uppercase text-tuio-navy mb-6">
Gallery
</h2> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"> ${listing.gallery.map((img) => renderTemplate`<img${addAttribute(img, "src")} class="rounded-2xl w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer">`)} </div> </div>`} </div>  <div class="space-y-8"> <div class="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100 sticky top-24" id="contact"> <h3 class="text-xl font-tuio uppercase text-tuio-navy mb-6">
Contact Info
</h3> <div class="space-y-6"> ${listing.address_json?.full_address && renderTemplate`<div class="flex gap-4"> <div class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0"> ${renderComponent($$result2, "MapPin", MapPin, { "className": "w-5 h-5 text-gray-500" })} </div> <div> <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
Address
</span> <p class="text-tuio-navy font-medium leading-snug"> ${listing.address_json.full_address} </p> </div> </div>`} ${listing.contact_phone && renderTemplate`<div class="flex gap-4"> <div class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0"> ${renderComponent($$result2, "Phone", Phone, { "className": "w-5 h-5 text-gray-500" })} </div> <div> <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
Phone
</span> <a${addAttribute(`tel:${listing.contact_phone}`, "href")} class="text-tuio-navy font-bold text-lg hover:text-tuio-red transition-colors"> ${listing.contact_phone} </a> </div> </div>`} ${listing.website && renderTemplate`<div class="flex gap-4"> <div class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0"> ${renderComponent($$result2, "Globe", Globe, { "className": "w-5 h-5 text-gray-500" })} </div> <div> <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
Website
</span> <a${addAttribute(listing.website, "href")} target="_blank" rel="noopener noreferrer" class="text-tuio-navy font-bold hover:text-tuio-red transition-colors break-all">
Visit Website
</a> </div> </div>`} </div> <div class="mt-8 pt-6 border-t border-gray-100"> <button class="w-full py-4 bg-tuio-navy text-white rounded-2xl font-bold uppercase tracking-wide hover:bg-tuio-red transition-colors shadow-lg">
Book Appointment
</button> <p class="text-xs text-center text-gray-400 mt-3">
Directly via DentalReach
</p> </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/directory/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/directory/[slug].astro";
const $$url = "/directory/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
