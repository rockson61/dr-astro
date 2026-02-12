import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_CKsRPMqu.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$MyArticles = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyArticles;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: articles } = await supabase.from("articles").select("id, title, slug, status, published_at, views_count").eq("author_id", user.id).order("created_at", { ascending: false });
  const statusColors = {
    published: "bg-green-100 text-green-700",
    draft: "bg-yellow-100 text-yellow-700",
    pending: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700"
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "My Articles" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"> <div> <h2 class="text-3xl font-heading uppercase text-primary-900">
My Articles
</h2> <p class="text-gray-500 mt-1">
Manage your published and draft articles.
</p> </div> <a href="/dashboard/articles/new" class="px-8 py-3 bg-primary-600 text-white rounded-full font-bold uppercase tracking-wide hover:bg-primary-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"> <span>+ Create new</span> </a> </div> ${articles && articles.length > 0 ? renderTemplate`<div class="glass-card bg-white overflow-hidden !p-0"> <div class="overflow-x-auto"> <table class="w-full"> <thead class="bg-gray-50/50 border-b border-gray-100"> <tr> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Title
</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Status
</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Views
</th> <th class="text-right px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Actions
</th> </tr> </thead> <tbody class="divide-y divide-gray-50"> ${articles.map((article) => renderTemplate`<tr class="hover:bg-gray-50 transition-colors group"> <td class="px-8 py-5"> <a${addAttribute(`/articles/${article.slug}`, "href")} class="font-bold text-lg text-primary-900 group-hover:text-primary-600 transition-colors block"> ${article.title} </a> <span class="text-xs text-gray-400"> ${new Date(
    article.published_at || article.created_at
  ).toLocaleDateString()} </span> </td> <td class="px-8 py-5"> <span${addAttribute(`text-xs font-bold uppercase px-3 py-1.5 rounded-full tracking-wide ${statusColors[article.status] || "bg-gray-100 text-gray-700"}`, "class")}> ${article.status} </span> </td> <td class="px-8 py-5 text-gray-500 font-medium"> <div class="flex items-center gap-2"> <span>👁</span> ${article.views_count || 0} </div> </td> <td class="px-8 py-5 text-right"> <a${addAttribute(`/dashboard/articles/edit/${article.id}`, "href")} class="inline-block px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-primary-600 hover:text-primary-600 transition-all bg-white">
Edit
</a> </td> </tr>`)} </tbody> </table> </div> </div>` : renderTemplate`<div class="glass-card bg-white py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/30"> <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
📝
</div> <h3 class="text-2xl font-heading uppercase text-primary-900 mb-2">
No articles yet
</h3> <p class="text-gray-500 max-w-md mb-8">
You haven't published any articles yet. Start sharing
                        your expertise with the dental community today.
</p> <a href="/dashboard/articles/new" class="px-8 py-3 bg-primary-600 text-white rounded-full font-bold uppercase tracking-wide hover:bg-primary-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Write Your First Article
</a> </div>`} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-articles.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-articles.astro";
const $$url = "/dashboard/my-articles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MyArticles,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
