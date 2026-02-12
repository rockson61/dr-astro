import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login?redirect=/community/new");
  }
  const categories = [
    { id: "clinical", title: "Clinical Cases" },
    { id: "tech", title: "Dental Technology" },
    { id: "business", title: "Practice Management" },
    { id: "student", title: "Student Corner" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Start New Discussion | Community" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy py-16 text-center text-white relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <h1 class="text-4xl md:text-5xl font-tuio uppercase mb-4">
Start a Discussion
</h1> <p class="text-white/80 max-w-xl mx-auto">
Share your thoughts, ask questions, or discuss cases with the
                community.
</p> </div> </section> <div class="bg-tuio-bg min-h-screen"> <div class="container mx-auto px-4 py-12 max-w-3xl"> <form class="space-y-8" id="new-thread-form"> <!-- Title --> <div class="tuio-card"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">💬</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Discussion Details
</h3> </div> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Title</label> <input type="text" name="title" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-bold text-lg focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all placeholder:font-normal" placeholder="What would you like to discuss?" required> </div> </div> <!-- Category --> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Category</label> <div class="relative"> <select name="category" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors" required> <option value="">Select a category</option> ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.id, "value")}>${cat.title}</option>`)} </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> <!-- Content --> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Content</label> <div class="relative"> <textarea name="content" rows="10" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none resize-none" placeholder="Share your thoughts, describe a case, or ask a question...

You can use Markdown for formatting." required></textarea> <div class="absolute bottom-4 right-4 text-xs font-mono text-gray-400 bg-white/80 px-2 py-1 rounded">
Markdown Supported
</div> </div> </div> <!-- Actions --> <div class="flex gap-4 justify-end"> <a href="/community" class="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-full font-bold uppercase tracking-wide hover:border-gray-400 hover:text-gray-700 transition-all bg-white">
Cancel
</a> <button type="submit" class="px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Post Discussion
</button> </div> </form> </div> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/community/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/community/new.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/community/new.astro";
const $$url = "/community/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$New,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
