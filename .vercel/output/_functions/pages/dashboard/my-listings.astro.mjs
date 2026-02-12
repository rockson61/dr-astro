import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$MyListings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyListings;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: listings } = await supabase.from("listings").select("id, business_name, slug, is_verified, rating_avg, created_at").eq("owner_id", user.id).order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "My Listings" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
My Listings
</h2> <p class="text-gray-500 mt-1">
Manage your clinic and lab listings.
</p> </div> <a href="/dashboard/listings/new" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"> <span>+ Add Listing</span> </a> </div> ${listings && listings.length > 0 ? renderTemplate`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${listings.map((listing) => renderTemplate`<div class="tuio-card group !p-6 hover:border-tuio-red/50 border border-transparent transition-all"> <div class="flex items-start justify-between mb-6"> <div class="w-14 h-14 bg-tuio-bg rounded-2xl flex items-center justify-center text-xl font-tuio text-tuio-navy shadow-sm group-hover:bg-tuio-red group-hover:text-white transition-colors"> ${listing.business_name.substring(0, 2).toUpperCase()} </div> ${listing.is_verified && renderTemplate`<span class="text-[10px] font-bold uppercase px-3 py-1.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1 tracking-wider">
✓ Verified
</span>`} </div> <h3 class="text-xl font-bold text-tuio-navy mb-2 line-clamp-1 group-hover:text-tuio-red transition-colors"> ${listing.business_name} </h3> <div class="flex items-center gap-2 text-yellow-500 mb-6 font-bold text-sm"> <span class="flex items-center gap-1">
⭐ ${listing.rating_avg || "New"} </span> </div> <div class="grid grid-cols-2 gap-3"> <a${addAttribute(`/directory/${listing.slug}`, "href")} class="text-center py-3 border border-gray-200 rounded-xl text-gray-600 hover:border-tuio-red hover:text-tuio-red transition-all text-sm font-bold uppercase tracking-wide">
View
</a> <a${addAttribute(`/dashboard/listings/edit/${listing.id}`, "href")} class="text-center py-3 bg-gray-50 rounded-xl text-tuio-navy hover:bg-tuio-navy hover:text-white transition-all text-sm font-bold uppercase tracking-wide">
Edit
</a> </div> </div>`)} </div>` : renderTemplate`<div class="tuio-card py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/30"> <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
🏢
</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2">
No listings yet
</h3> <p class="text-gray-500 max-w-md mb-8">
Increase your visibility by adding your clinic or lab to
                        our verified directory.
</p> <a href="/dashboard/listings/new" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Create Your First Listing
</a> </div>`} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-listings.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-listings.astro";
const $$url = "/dashboard/my-listings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MyListings,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
