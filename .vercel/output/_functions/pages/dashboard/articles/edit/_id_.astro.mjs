import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../../chunks/DashboardLayout_CKsRPMqu.mjs';
import { c as createSupabaseServerClient } from '../../../../chunks/supabase_woKm2pOd.mjs';
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
    return Astro2.redirect("/dashboard/my-articles");
  }
  const { data: article, error } = await supabase.from("articles").select("*").eq("id", id).eq("author_id", user.id).single();
  if (error || !article) {
    console.error("Error fetching article or unauthorized:", error);
    return Astro2.redirect("/dashboard/my-articles");
  }
  const { data: categories } = await supabase.from("categories").select("id, name, slug").order("name");
  const { data: issues } = await supabase.from("issues").select("id, title, volume, issue_number").order("published_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `Edit: ${article.title}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-5xl mx-auto animate-fade-in"> <div class="flex items-center justify-between mb-10"> <div> <h2 class="text-3xl font-heading uppercase text-primary-900">
Edit Article
</h2> <p class="text-gray-500 mt-1">Update your content.</p> </div> <a href="/dashboard/my-articles" class="text-gray-400 font-bold hover:text-primary-600 transition-colors flex items-center gap-2 text-sm uppercase tracking-wide"> <span>← Back to My Articles</span> </a> </div> <form class="space-y-8" id="edit-form"${addAttribute(article.id, "data-id")}> <!-- Title --> <div class="glass-card bg-white p-8"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">✍️</span> <h3 class="font-heading text-xl uppercase text-primary-900">
Article Details
</h3> </div> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Article Title</label> <input type="text" name="title"${addAttribute(article.title, "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-bold text-lg focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none transition-all placeholder:font-normal" placeholder="Enter a compelling title..."> </div> </div> <!-- Category & Type --> <div class="grid md:grid-cols-2 gap-8"> <div class="glass-card bg-white p-8"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Category</label> <div class="relative"> <select name="category_id" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors"> <option value="">Select a category</option> ${categories?.map((cat) => renderTemplate`<option${addAttribute(cat.id, "value")}${addAttribute(
    article.category_id === cat.id,
    "selected"
  )}> ${cat.name} </option>`)} </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> <div class="glass-card bg-white p-8"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Article Type</label> <div class="relative"> <select name="type" Note: Check if 'type' column exists, new.astro suggests it does implicitly or is handled. is handled. class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors"> <option value="article"${addAttribute(!article.type || article.type === "article", "selected")}>Standard Article</option> <option value="case_study"${addAttribute(article.type === "case_study", "selected")}>Case Study</option> <option value="research"${addAttribute(article.type === "research", "selected")}>Research Paper</option> <option value="guide"${addAttribute(article.type === "guide", "selected")}>How-To Guide</option> <option value="opinion"${addAttribute(article.type === "opinion", "selected")}>Opinion Piece</option> </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> </div> <!-- Issue Assignment --> <div class="glass-card bg-white p-8"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Assign to Issue (Optional)</label> <div class="relative"> <select name="issue_id" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors"> <option value="">None (Standalone Article)</option> ${issues?.map((issue) => renderTemplate`<option${addAttribute(issue.id, "value")}${addAttribute(article.issue_id === issue.id, "selected")}>
Vol ${issue.volume}, Issue${" "} ${issue.issue_number}: ${issue.title} </option>`)} </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> <!-- Excerpt --> <div class="glass-card bg-white p-8"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Excerpt / Summary</label> <textarea name="excerpt" rows="3" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none resize-none" placeholder="Write a brief summary to hook your readers (150-200 characters)...">${article.excerpt}</textarea> </div> <!-- Tags --> <div class="glass-card bg-white p-8"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Tags (Comma Separated)</label> <input type="text" name="tags"${addAttribute(article.tags?.join(", "), "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none placeholder:font-normal" placeholder="e.g., Digital Dentistry, AI, Case Study"> </div> <!-- Content --> <div class="glass-card bg-white p-8"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Content</label> <div class="relative"> <textarea name="content" rows="20" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none resize-none font-mono text-sm leading-relaxed" placeholder="# Your Article Content...">${article.content}</textarea> <div class="absolute bottom-4 right-4 text-xs font-mono text-gray-400 bg-white/80 px-2 py-1 rounded">
Markdown Supported
</div> </div> </div> <!-- Featured Image --> <div class="glass-card bg-white p-8"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Featured Image URL (Optional for now)</label> <!-- Simplified Image Input for Edit --> <input type="text" name="image_url"${addAttribute(article.image_url, "value")} placeholder="https://example.com/image.jpg" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900"> </div> <!-- Actions --> <div class="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-200 md:static md:bg-transparent md:border-none md:p-0 flex gap-4 justify-between z-40"> <button type="button" id="delete-btn" class="px-8 py-4 border-2 border-red-100 text-red-600 rounded-full font-bold uppercase tracking-wide hover:bg-red-50 transition-all bg-white">
Delete Article
</button> <!-- Metadata --> <div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"> <h2 class="text-xl font-tuio uppercase text-tuio-navy mb-6">
Academic Metadata
</h2> <div class="space-y-6"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">DOI (Digital Object Identifier)</label> <input type="text" name="doi"${addAttribute(article.doi || "", "value")} placeholder="10.1000/xyz123" class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tuio-red/10 focus:border-tuio-red focus:outline-none transition-all"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">References (JSON or Line-separated)</label> <textarea name="references" rows="5" class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tuio-red/10 focus:border-tuio-red focus:outline-none transition-all font-mono text-sm">${typeof article.references === "object" ? JSON.stringify(
    article.references,
    null,
    2
  ) : article.references}</textarea> <p class="text-xs text-gray-400 mt-2">
Enter references as a JSON array of strings.
</p> </div> </div> </div> <div class="flex gap-4"> <button type="button" class="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-full font-bold uppercase tracking-wide hover:border-gray-400 hover:text-gray-700 transition-all bg-white" onclick="history.back()">
Cancel
</button> <button type="submit" class="px-10 py-4 bg-primary-600 text-white rounded-full font-bold uppercase tracking-wide hover:bg-primary-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Save Changes
</button> </div> </div> </form> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/articles/edit/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/articles/edit/[id].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/articles/edit/[id].astro";
const $$url = "/dashboard/articles/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
