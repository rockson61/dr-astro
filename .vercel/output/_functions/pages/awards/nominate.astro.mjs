import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Nominate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nominate;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login?redirect=/awards/nominate");
  }
  const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("id", user.id).single();
  const awardCategories = [
    { value: "clinical_excellence", label: "Clinical Excellence Award" },
    { value: "young_dentist", label: "Young Dentist of the Year" },
    { value: "best_dental_lab", label: "Best Dental Laboratory" },
    { value: "innovative_tech", label: "Innovative Technology Award" },
    { value: "community_impact", label: "Community Impact Award" },
    { value: "best_educator", label: "Best Dental Educator" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Nominate for DentalReach Awards 2026" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy py-16 text-center text-white relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="absolute -right-20 top-20 w-96 h-96 bg-tuio-red/30 rounded-full blur-3xl animate-pulse"></div> <div class="container mx-auto px-4 relative z-10"> <span class="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-[0.2em] uppercase border border-tuio-red text-tuio-red rounded-full bg-tuio-red/10">Nominations Open</span> <h1 class="text-4xl md:text-6xl font-tuio uppercase mb-4">
Submit Your<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Nomination</span> </h1> <p class="text-gray-400 max-w-2xl mx-auto">
Recognize excellence in dentistry. Nominate a colleague, mentor,
                or yourself for the DentalReach Awards 2026.
</p> </div> </section> <div class="bg-tuio-bg min-h-screen"> <div class="container mx-auto px-4 py-12 max-w-3xl"> <form class="space-y-8" id="nomination-form"> <!-- Nominator Info --> <div class="tuio-card"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">👤</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Your Information
</h3> </div> <div class="grid md:grid-cols-2 gap-6"> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Your Name</label> <input type="text" name="nominator_name"${addAttribute(profile?.full_name || "", "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" readonly> </div> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Your Email</label> <input type="email"${addAttribute(user.email, "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" readonly> </div> </div> </div> <!-- Award Category --> <div class="tuio-card"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">🏆</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Award Category
</h3> </div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Select Category</label> <div class="relative"> <select name="category" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors" required> <option value="">Select an award category</option> ${awardCategories.map((cat) => renderTemplate`<option${addAttribute(cat.value, "value")}> ${cat.label} </option>`)} </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> <!-- Nominee Info --> <div class="tuio-card"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">🌟</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Nominee Details
</h3> </div> <div class="space-y-6"> <div class="grid md:grid-cols-2 gap-6"> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Nominee Name *</label> <input type="text" name="nominee_name" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-bold focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="Dr. Jane Doe" required> </div> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Nominee Email</label> <input type="email" name="nominee_email" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="jane@example.com"> </div> </div> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Organization / Practice</label> <input type="text" name="organization" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="Smile Dental Clinic, Mumbai"> </div> </div> </div> <!-- Justification --> <div class="tuio-card"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">📝</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Why This Nominee?
</h3> </div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Nomination Reason *</label> <textarea name="reason" rows="6" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none resize-none" placeholder="Describe the nominee's achievements, contributions to dentistry, and why they deserve this recognition..." required></textarea> </div> <!-- Self Nomination Toggle --> <div class="tuio-card"> <label class="flex items-center gap-4 cursor-pointer"> <input type="checkbox" name="is_self_nomination" class="w-5 h-5 text-tuio-red rounded focus:ring-tuio-red border-gray-300"> <span class="font-bold text-tuio-navy">This is a self-nomination</span> </label> <p class="text-sm text-gray-500 mt-2 pl-9">
Self-nominations are welcome and encouraged!
</p> </div> <!-- Actions --> <div class="flex gap-4 justify-end"> <a href="/awards" class="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-full font-bold uppercase tracking-wide hover:border-gray-400 hover:text-gray-700 transition-all bg-white">
Cancel
</a> <button type="submit" class="px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Submit Nomination
</button> </div> </form> </div> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/awards/nominate.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/awards/nominate.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/awards/nominate.astro";
const $$url = "/awards/nominate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Nominate,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
