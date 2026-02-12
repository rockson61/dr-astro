import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

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
  if (profile?.role !== "moderator" && profile?.role !== "admin" && profile?.role !== "super_admin") {
    return Astro2.redirect("/dashboard");
  }
  const view = Astro2.url.searchParams.get("view") || "pending";
  let query = supabase.from("comments").select(
    "*, author:profiles(full_name, avatar_url), article:articles(title, slug)"
  ).order("created_at", { ascending: false });
  if (view === "pending") {
    query = query.eq("is_approved", false);
  } else if (view === "approved") {
    query = query.eq("is_approved", true);
  }
  const { data: comments } = await query;
  const tabs = [
    { id: "pending", label: "Pending Approval" },
    { id: "approved", label: "Approved History" }
  ];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Moderation Queue" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in space-y-8"> <div class="flex justify-between items-center"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-2">
Moderation Queue
</h2> <p class="text-gray-500">
Review community comments and reports.
</p> </div> </div>  <div class="flex gap-2 overflow-x-auto pb-2 border-b border-gray-100"> ${tabs.map((tab) => renderTemplate`<a${addAttribute(`?view=${tab.id}`, "href")}${addAttribute(`px-6 py-3 rounded-t-2xl font-bold text-sm transition-all whitespace-nowrap ${view === tab.id ? "bg-white text-tuio-navy border-t border-x border-gray-100 shadow-sm translate-y-[1px]" : "text-gray-400 hover:text-tuio-navy hover:bg-gray-100/50"}`, "class")}> ${tab.label} </a>`)} </div>  <div class="bg-white rounded-b-3xl rounded-tr-3xl shadow-sm border border-gray-100 min-h-[400px]"> ${comments && comments.length > 0 ? renderTemplate`<ul class="divide-y divide-gray-50"> ${comments.map((comment) => renderTemplate`<li class="p-6 hover:bg-gray-50 transition-colors group"> <div class="flex gap-4"> <img${addAttribute(
    comment.author?.avatar_url || `https://ui-avatars.com/api/?name=${comment.author?.full_name}&background=random`,
    "src"
  )} class="w-10 h-10 rounded-full object-cover shrink-0" alt="User"> <div class="flex-grow"> <div class="flex items-center gap-2 mb-1"> <span class="font-bold text-tuio-navy"> ${comment.author?.full_name} </span> <span class="text-xs text-gray-400">
on${" "} <a${addAttribute(`/articles/${comment.article?.slug}`, "href")} class="underline hover:text-tuio-red"> ${comment.article?.title} </a> </span> <span class="text-xs text-gray-400">
•${" "} ${new Date(
    comment.created_at
  ).toLocaleString()} </span> </div> <p class="text-gray-600 my-2 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
"${comment.content}"
</p> <div class="flex gap-2 mt-3"> ${view === "pending" && renderTemplate`<button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-green-200"${addAttribute(`approveComment('${comment.id}')`, "onclick")}>
Approve
</button>`} <button class="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-500 rounded-xl text-xs font-bold transition-colors"${addAttribute(`deleteComment('${comment.id}')`, "onclick")}>
Delete
</button> </div> </div> </div> </li>`)} </ul>` : renderTemplate`<div class="flex flex-col items-center justify-center py-20 text-gray-400"> <span class="text-4xl mb-4">✅</span> <p>All caught up! No comments to review.</p> </div>`} </div> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/moderator/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/moderator/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/moderator/index.astro";
const $$url = "/dashboard/moderator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
