import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, ah as unescapeHTML } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C_IiUpen.mjs';
import { s as supabase } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: award } = await supabase.from("awards").select("*").eq("slug", slug).single();
  const mockAward = {
    title: "Best Clinical Case 2026",
    description: `Recognizing the most challenging and well-documented clinical cases of the year. This award celebrates excellence in diagnosis, treatment planning, and execution.

  **Evaluation Criteria:**
  - Case complexity
  - Documentation quality (photos, x-rays)
  - Scientific basis of treatment
  - Long-term follow-up`,
    icon: "\u{1F3C6}",
    nomination_deadline: "Oct 31, 2026",
    winner_announcement: "Dec 15, 2026",
    category: "Clinical Excellence"
  };
  const displayAward = award || mockAward;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${displayAward.title} | DentalReach Awards` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-tuio-bg py-16 min-h-screen flex items-center"> <div class="container mx-auto px-4 max-w-4xl"> <div class="mb-8 text-center"> <a href="/awards" class="text-gray-500 hover:text-tuio-red font-bold uppercase tracking-widest text-sm">
← Back to Awards
</a> </div> <div class="bg-white rounded-[40px] shadow-xl overflow-hidden text-center relative"> <div class="absolute inset-0 bg-gradient-to-b from-yellow-50/50 to-transparent pointer-events-none"></div> <div class="p-12 md:p-16 relative z-10"> <div class="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner text-yellow-500 border border-yellow-200"> ${displayAward.icon || "\u{1F3C6}"} </div> <span class="bg-tuio-navy text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 inline-block"> ${displayAward.category} </span> <h1 class="font-tuio text-4xl md:text-5xl text-tuio-navy mb-6 max-w-2xl mx-auto uppercase"> ${displayAward.title} </h1> <div class="prose prose-lg text-gray-600 max-w-2xl mx-auto mb-10 font-light">${unescapeHTML(displayAward.description?.replace(
    /\n/g,
    "<br/>"
  ))}</div> <div class="grid grid-cols-2 gap-4 max-w-md mx-auto mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100"> <div> <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Deadline</span> <span class="block text-tuio-navy font-bold">${displayAward.nomination_deadline}</span> </div> <div> <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Announcement</span> <span class="block text-tuio-navy font-bold">${displayAward.winner_announcement}</span> </div> </div> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <button class="px-8 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
Nominate Now
</button> <button class="px-8 py-4 bg-white border-2 border-tuio-navy text-tuio-navy rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy hover:text-white transition-all">
View Past Winners
</button> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/awards/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/awards/[slug].astro";
const $$url = "/awards/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
