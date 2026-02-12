import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { c as createSupabaseServerClient } from '../../../../chunks/supabase_CFYPoMlB.mjs';
import { format } from 'date-fns';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  if (!id) {
    return Astro2.redirect("/dashboard/issues");
  }
  const { data: issue, error } = await supabase.from("issues").select("*").eq("id", id).single();
  if (error || !issue) {
    return Astro2.redirect("/dashboard/issues");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `Edit: ${issue.title}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto animate-fade-in"> <div class="flex items-center justify-between mb-10"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
Edit Issue
</h2> <p class="text-gray-500 mt-1">Update issue details.</p> </div> <a href="/dashboard/issues" class="text-gray-400 font-bold hover:text-tuio-red transition-colors flex items-center gap-2 text-sm uppercase tracking-wide"> <span>← Back to Issues</span> </a> </div> <form class="space-y-8" id="edit-form"${addAttribute(issue.id, "data-id")}> <!-- Basic Info --> <div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">📰</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Issue Details
</h3> </div> <div class="grid md:grid-cols-2 gap-6 mb-6"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Title</label> <input type="text" name="title"${addAttribute(issue.title, "value")} required class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-bold focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all"> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Slug</label> <input type="text" name="slug"${addAttribute(issue.slug, "value")} required class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-600 font-mono text-sm focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all"> </div> </div> <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Volume</label> <input type="number" name="volume"${addAttribute(issue.volume, "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all"> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Issue No.</label> <input type="number" name="issue_number"${addAttribute(issue.issue_number, "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all"> </div> <div class="col-span-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Publication Date</label> <input type="date" name="published_at"${addAttribute(issue.published_at ? format(
    new Date(issue.published_at),
    "yyyy-MM-dd"
  ) : "", "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all"> </div> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Description</label> <textarea name="description" rows="3" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none resize-none">${issue.description}</textarea> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Status</label> <select name="status" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all"> <option value="draft"${addAttribute(issue.status === "draft", "selected")}>Draft</option> <option value="published"${addAttribute(issue.status === "published", "selected")}>Published</option> <option value="archived"${addAttribute(issue.status === "archived", "selected")}>Archived</option> </select> </div> </div> <!-- Assets --> <div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">🖼️</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Assets
</h3> </div> <div class="space-y-6"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Cover Image URL</label> <input type="text" name="cover_image"${addAttribute(issue.cover_image, "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="https://..."> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Full PDF URL</label> <input type="text" name="pdf_url"${addAttribute(issue.pdf_url, "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="https://..."> </div> </div> </div> <div class="flex justify-between items-center"> <button type="button" id="delete-btn" class="px-8 py-4 border-2 border-red-100 text-red-600 rounded-full font-bold uppercase tracking-wide hover:bg-red-50 transition-all bg-white">
Delete Issue
</button> <button type="submit" class="px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Save Changes
</button> </div> </form> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/issues/edit/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/issues/edit/[id].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/issues/edit/[id].astro";
const $$url = "/dashboard/issues/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
