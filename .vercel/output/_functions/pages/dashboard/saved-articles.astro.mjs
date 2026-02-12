import { e as createAstro, c as createComponent, a as renderTemplate, r as renderComponent, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
import { format } from 'date-fns';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://dentalreach.today");
const $$SavedArticles = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SavedArticles;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: savedArticles } = await supabase.from("saved_articles").select(
    `
    id,
    created_at,
    article:articles (
      id,
      title,
      slug,
      image_url,
      excerpt,
      category:categories(name, slug),
      author:profiles(full_name)
    )
  `
  ).eq("user_id", user.id).order("created_at", { ascending: false });
  return renderTemplate(_a || (_a = __template(["", ' <script>\n    async function removeBookmark(articleId, btn) {\n        if (!confirm("Remove this article from your bookmarks?")) return;\n\n        // Optimistic remove\n        const card = btn.closest(".group");\n        card.style.opacity = "0.5";\n\n        try {\n            const res = await fetch("/api/bookmarks", {\n                method: "POST",\n                headers: { "Content-Type": "application/json" },\n                body: JSON.stringify({ article_id: articleId }),\n            });\n\n            if (res.ok) {\n                card.remove();\n                // Check if empty and reload if needed to show empty state, or just leave it\n                if (document.querySelectorAll(".group").length === 0)\n                    location.reload();\n            } else {\n                card.style.opacity = "1";\n                alert("Failed to remove bookmark.");\n            }\n        } catch (e) {\n            console.error(e);\n            card.style.opacity = "1";\n            alert("An error occurred.");\n        }\n    }\n<\/script>'])), renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Saved Articles | DentalReach" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-tuio uppercase text-tuio-navy mb-2">
Saved Articles
</h1> <p class="text-gray-500">Your curated reading list.</p> </div> ${savedArticles && savedArticles.length > 0 ? renderTemplate`<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6"> ${savedArticles.map((item) => {
    const article = item.article;
    return renderTemplate`<div class="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full relative">  <button class="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm text-tuio-navy hover:text-red-500 hover:bg-white transition-colors" title="Remove from saved"${addAttribute(`removeBookmark('${item.article.id}', this)`, "onclick")}> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </button> <a${addAttribute(`/articles/${article.slug}`, "href")} class="block h-48 overflow-hidden relative"> <img${addAttribute(
      article.image_url || "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
      "src"
    )}${addAttribute(article.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"> <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div> </a> <div class="p-6 flex flex-col flex-grow"> <div class="flex items-center gap-2 mb-3"> <span class="text-xs font-bold uppercase tracking-wider text-tuio-red bg-tuio-red/5 px-2 py-1 rounded-full"> ${article.category?.name || "Article"} </span> <span class="text-xs text-gray-400 ml-auto">
Saved${" "} ${format(
      new Date(item.created_at),
      "MMM d"
    )} </span> </div> <a${addAttribute(`/articles/${article.slug}`, "href")} class="group-hover:text-tuio-red transition-colors"> <h3 class="font-bold text-tuio-navy text-xl leading-tight mb-2 line-clamp-2"> ${article.title} </h3> </a> <p class="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow"> ${article.excerpt} </p> <div class="flex items-center gap-2 pt-4 border-t border-gray-50 mt-auto"> <span class="text-xs text-gray-400 font-medium">
By${" "} ${article.author?.full_name || "DentalReach"} </span> </div> </div> </div>`;
  })} </div>` : renderTemplate`<div class="text-center py-20 bg-gray-50 rounded-[32px] border border-dashed border-gray-200"> <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg> </div> <h3 class="text-lg font-bold text-tuio-navy mb-2">
No saved articles yet
</h3> <p class="text-gray-500 mb-6">
Start curating your reading list by benchmarking articles
                    you love.
</p> <a href="/articles" class="px-6 py-3 bg-tuio-navy text-white rounded-full font-bold uppercase tracking-wide text-sm hover:bg-tuio-red transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-block">
Explore Articles
</a> </div>`}` }));
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/saved-articles.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/saved-articles.astro";
const $$url = "/dashboard/saved-articles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SavedArticles,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
