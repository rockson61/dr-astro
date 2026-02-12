import { e as createAstro, c as createComponent, a as renderTemplate, d as renderScript, r as renderComponent, m as maybeRenderHead, b as addAttribute, ak as Fragment } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_CKsRPMqu.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "editor" && profile?.role !== "admin" && profile?.role !== "super_admin") {
    return Astro2.redirect("/dashboard");
  }
  const status = Astro2.url.searchParams.get("status") || "under_review";
  let query = supabase.from("articles").select("*, author:profiles(full_name)").order("updated_at", { ascending: false });
  if (status !== "all") {
    query = query.eq("status", status);
  }
  const { data: articles } = await query;
  const tabs = [
    { id: "under_review", label: "Pending Review" },
    { id: "published", label: "Published" },
    { id: "draft", label: "Drafts" },
    { id: "rejected", label: "Rejected" }
  ];
  return renderTemplate(_a || (_a = __template(["", " <script>\n    // Simple inline script for now, ideally verified with Supabase client\n    async function updateStatus(id, status) {\n        if (!confirm(`Mark article as ${status}?`)) return;\n\n        // This needs client-side Supabase.\n        // We'll use a fetch to an API route in real app, but for now let's assume client-side lib is available globally\n        // or re-import it.\n        // Since `is:inline` limits import, we'll use a hidden API endpoint or just reload (simulated).\n        // Best approach: create a small script tag that imports the library.\n    }\n<\/script> ", ""], ["", " <script>\n    // Simple inline script for now, ideally verified with Supabase client\n    async function updateStatus(id, status) {\n        if (!confirm(\\`Mark article as \\${status}?\\`)) return;\n\n        // This needs client-side Supabase.\n        // We'll use a fetch to an API route in real app, but for now let's assume client-side lib is available globally\n        // or re-import it.\n        // Since \\`is:inline\\` limits import, we'll use a hidden API endpoint or just reload (simulated).\n        // Best approach: create a small script tag that imports the library.\n    }\n<\/script> ", ""])), renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Editorial Desk" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in space-y-8"> <div class="flex justify-between items-center"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-2">
Editorial Desk
</h2> <p class="text-gray-500">
Review submissions and manage publication schedule.
</p> </div> </div>  <div class="flex gap-2 overflow-x-auto pb-2 border-b border-gray-100"> ${tabs.map((tab) => renderTemplate`<a${addAttribute(`?status=${tab.id}`, "href")}${addAttribute(`px-6 py-3 rounded-t-2xl font-bold text-sm transition-all whitespace-nowrap ${status === tab.id ? "bg-white text-tuio-navy border-t border-x border-gray-100 shadow-sm translate-y-[1px]" : "text-gray-400 hover:text-tuio-navy hover:bg-gray-100/50"}`, "class")}> ${tab.label} </a>`)} </div>  <div class="bg-white rounded-b-3xl rounded-tr-3xl shadow-sm border border-gray-100 min-h-[400px]"> ${articles && articles.length > 0 ? renderTemplate`<ul class="divide-y divide-gray-50"> ${articles.map((article) => renderTemplate`<li class="p-6 hover:bg-gray-50 transition-colors group"> <div class="flex flex-col md:flex-row gap-4 justify-between"> <div class="flex-grow"> <div class="flex items-center gap-2 mb-1"> <span${addAttribute(`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${article.status === "published" ? "bg-green-100 text-green-700" : article.status === "under_review" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500"}`, "class")}> ${article.status.replace(
    "_",
    " "
  )} </span> <span class="text-xs text-gray-400">
By${" "} ${article.author?.full_name || "Unknown"} </span> <span class="text-xs text-gray-400">
•${" "} ${new Date(
    article.updated_at
  ).toLocaleDateString()} </span> </div> <h3 class="text-xl font-bold text-tuio-navy group-hover:text-tuio-red transition-colors mb-2"> <a${addAttribute(`/articles/${article.slug}`, "href")}> ${article.title} </a> </h3> <p class="text-sm text-gray-500 line-clamp-2 max-w-3xl"> ${article.excerpt} </p> </div> <div class="flex items-center gap-3 shrink-0"> <a${addAttribute(`/articles/${article.slug}`, "href")} class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-bold transition-colors" target="_blank">
Preview
</a> ${status === "under_review" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-green-200"${addAttribute(`updateStatus('${article.id}', 'published')`, "onclick")}>
Approve
</button> <button class="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-500 rounded-xl text-xs font-bold transition-colors"${addAttribute(`updateStatus('${article.id}', 'rejected')`, "onclick")}>
Reject
</button> ` })}`} ${status === "published" && renderTemplate`<button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl text-xs font-bold transition-colors"${addAttribute(`updateStatus('${article.id}', 'draft')`, "onclick")}>
Unpublish
</button>`} </div> </div> </li>`)} </ul>` : renderTemplate`<div class="flex flex-col items-center justify-center py-20 text-gray-400"> <span class="text-4xl mb-4">📭</span> <p>No articles found in this queue.</p> </div>`} </div> </div> ` }), renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/editor/index.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/editor/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/editor/index.astro";
const $$url = "/dashboard/editor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
