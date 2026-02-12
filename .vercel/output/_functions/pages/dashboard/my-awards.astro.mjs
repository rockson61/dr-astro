import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_CKsRPMqu.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$MyAwards = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyAwards;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: nominations } = await supabase.from("award_nominations").select("*, award:awards(title, year)").eq("nominee_id", user.id).order("created_at", { ascending: false });
  const statusColors = {
    nominated: "bg-blue-100 text-blue-700",
    shortlisted: "bg-red-100 text-red-700",
    winner: "bg-yellow-100 text-yellow-700",
    finalist: "bg-green-100 text-green-700"
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "My Awards" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in max-w-4xl"> <div class="mb-10"> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
My Awards & Nominations
</h2> <p class="text-gray-500 mt-1">
Track your recognition in the DentalReach Awards program.
</p> </div> ${nominations && nominations.length > 0 ? renderTemplate`<div class="space-y-6"> ${nominations.map((nom) => renderTemplate`<div class="tuio-card !p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-all border border-transparent hover:border-yellow-200"> <div class="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-yellow-200"> <span class="text-4xl drop-shadow-md">🏆</span> </div> <div class="flex-grow text-center md:text-left"> <h3 class="text-xl font-tuio text-tuio-navy mb-1 uppercase tracking-wide"> ${nom.award?.title || "DentalReach Award"} </h3> <p class="text-gray-500 font-bold"> ${nom.award?.year || "2026"} </p> </div> <div class="text-center"> <span${addAttribute(`text-xs font-bold uppercase px-6 py-2 rounded-full tracking-widest block mb-2 shadow-sm ${statusColors[nom.status] || "bg-gray-100 text-gray-700"}`, "class")}> ${nom.status} </span> <span class="text-xs text-gray-400 font-medium">
Status
</span> </div> </div>`)} </div>` : renderTemplate`<div class="tuio-card py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/30"> <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
🎖️
</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2">
No nominations yet
</h3> <p class="text-gray-500 max-w-md mb-8">
Participate in the DentalReach Awards to get recognized
                        for your contributions to the field.
</p> <a href="/awards" class="px-8 py-3 bg-tuio-navy text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-red transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Explore Awards
</a> </div>`} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-awards.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-awards.astro";
const $$url = "/dashboard/my-awards";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MyAwards,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
