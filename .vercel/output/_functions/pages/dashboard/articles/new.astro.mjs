import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../../chunks/supabase_CFYPoMlB.mjs';
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
  const { data: categories } = await supabase.from("categories").select("id, name, slug").order("name");
  const { data: issues } = await supabase.from("issues").select("id, title, volume, issue_number").order("published_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Write New Article" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-5xl mx-auto animate-fade-in"> <div class="flex items-center justify-between mb-10"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
Write New Article
</h2> <p class="text-gray-500 mt-1">
Share your expertise with the dental community.
</p> </div> <a href="/dashboard/my-articles" class="text-gray-400 font-bold hover:text-tuio-red transition-colors flex items-center gap-2 text-sm uppercase tracking-wide"> <span>← Back to My Articles</span> </a> </div> <form class="space-y-8"> <!-- Title --> <div class="tuio-card"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">✍️</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Article Details
</h3> </div> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Article Title</label> <input type="text" name="title" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-bold text-lg focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all placeholder:font-normal" placeholder="Enter a compelling title..."> </div> </div> <!-- Category & Type --> <div class="grid md:grid-cols-2 gap-8"> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Category</label> <div class="relative"> <select name="category_id" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors"> <option value="">Select a category</option> ${categories?.map((cat) => renderTemplate`<option${addAttribute(cat.id, "value")}>${cat.name}</option>`)} </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Article Type</label> <div class="relative"> <select name="type" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors"> <option value="article">Standard Article</option> <option value="case_study">Case Study</option> <option value="research">Research Paper</option> <option value="guide">How-To Guide</option> <option value="opinion">Opinion Piece</option> </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> </div> <!-- Issue Assignment --> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Assign to Issue (Optional)</label> <div class="relative"> <select name="issue_id" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors"> <option value="">None (Standalone Article)</option> ${issues?.map((issue) => renderTemplate`<option${addAttribute(issue.id, "value")}>
Vol ${issue.volume}, Issue${" "} ${issue.issue_number}: ${issue.title} </option>`)} </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> <!-- Excerpt --> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Excerpt / Summary</label> <textarea name="excerpt" rows="3" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none resize-none" placeholder="Write a brief summary to hook your readers (150-200 characters)..."></textarea> </div> <!-- Tags --> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Tags (Comma Separated)</label> <input type="text" name="tags" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none placeholder:font-normal" placeholder="e.g., Digital Dentistry, AI, Case Study"> </div> <!-- Content --> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Content</label> <div class="relative"> <textarea name="content" rows="20" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none resize-none font-mono text-sm leading-relaxed" placeholder="# Your Article Content

Write your article here using Markdown..."></textarea> <div class="absolute bottom-4 right-4 text-xs font-mono text-gray-400 bg-white/80 px-2 py-1 rounded">
Markdown Supported
</div> </div> </div> <!-- Featured Image --> <div class="tuio-card"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Featured Image</label> <div class="border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center hover:bg-gray-50 transition-colors group cursor-pointer relative overflow-hidden"> <div class="relative z-10"> <div class="w-20 h-20 bg-tuio-bg rounded-full flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
🖼️
</div> <p class="text-tuio-navy font-medium mb-1">
Drag and drop an image or click to upload
</p> <p class="text-xs text-gray-400 mb-6">
Recommended size: 1200x630px (JPG, PNG)
</p> <input type="file" name="image" accept="image/*" class="hidden" id="image-upload"> <label for="image-upload" class="inline-block px-8 py-3 bg-white text-tuio-navy border border-gray-200 rounded-full font-bold uppercase tracking-wide text-xs cursor-pointer hover:bg-tuio-navy hover:text-white transition-all shadow-sm">
Choose File
</label> </div> </div> </div> <!-- Metadata --> <div class="tuio-card"> <div class="space-y-6"> <div class="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100"> <span class="text-2xl">📚</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Academic Metadata
</h3> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">DOI</label> <input type="text" name="doi" placeholder="10.1000/xyz123" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all placeholder:font-normal"> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">References</label> <textarea name="references" rows="5" placeholder="[&quot;Smith, J. (2020)...&quot;, &quot;Doe, A. (2021)...&quot;]" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all font-mono text-sm placeholder:font-normal"></textarea> <p class="text-xs text-gray-400 mt-2">
Enter references as a JSON array of strings or
                            simple text.
</p> </div> </div> </div> <!-- Actions --> <div class="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-200 md:static md:bg-transparent md:border-none md:p-0 flex gap-4 justify-end z-40"> <button type="button" class="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-full font-bold uppercase tracking-wide hover:border-gray-400 hover:text-gray-700 transition-all bg-white">
Save Draft
</button> <button type="submit" class="px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Publish Article
</button> </div> </form> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/articles/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/articles/new.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/articles/new.astro";
const $$url = "/dashboard/articles/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$New,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
