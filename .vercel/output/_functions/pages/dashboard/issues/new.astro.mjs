import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_B_rgsWHr.mjs';
import { c as createSupabaseServerClient } from '../../../chunks/supabase_CYzxA37O.mjs';
export { renderers } from '../../../renderers.mjs';

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
    return Astro2.redirect("/login");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Create New Issue" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto animate-fade-in"> <div class="flex items-center justify-between mb-10"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
Create New Issue
</h2> <p class="text-gray-500 mt-1">
Set up a new edition of the magazine.
</p> </div> <a href="/dashboard/issues" class="text-gray-400 font-bold hover:text-tuio-red transition-colors flex items-center gap-2 text-sm uppercase tracking-wide"> <span>← Back to Issues</span> </a> </div> <form class="space-y-8"> <!-- Basic Info --> <div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">📰</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Issue Details
</h3> </div> <div class="grid md:grid-cols-2 gap-6 mb-6"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Title</label> <input type="text" name="title" required class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-bold focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="e.g. The Future of Digital Dentistry"> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Slug</label> <input type="text" name="slug" required class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-600 font-mono text-sm focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="vol-4-issue-2"> </div> </div> <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Volume</label> <input type="number" name="volume" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="1"> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Issue No.</label> <input type="number" name="issue_number" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="1"> </div> <div class="col-span-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Publication Date</label> <input type="date" name="published_at" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all"> </div> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Description</label> <textarea name="description" rows="3" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none resize-none" placeholder="Brief summary of this issue..."></textarea> </div> </div> <!-- Assets --> <div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">🖼️</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Assets
</h3> </div> <div class="space-y-6"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Cover Image URL</label> <input type="text" name="cover_image" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="https://..."> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Full PDF URL</label> <input type="text" name="pdf_url" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="https://..."> </div> </div> </div> <div class="flex justify-end gap-4"> <button type="button" class="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-full font-bold uppercase tracking-wide hover:border-gray-400 hover:text-gray-700 transition-all bg-white">
Save Draft
</button> <button type="submit" class="px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Create Issue
</button> </div> </form> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/issues/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/issues/new.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/issues/new.astro";
const $$url = "/dashboard/issues/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$New,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
