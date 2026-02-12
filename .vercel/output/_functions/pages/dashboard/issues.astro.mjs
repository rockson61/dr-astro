import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
import { format } from 'date-fns';
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
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: issues } = await supabase.from("issues").select("*").order("published_at", { ascending: false, nullsFirst: true });
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Manage Issues" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto animate-fade-in"> <div class="flex items-center justify-between mb-8"> <div> <h1 class="text-3xl font-tuio uppercase text-tuio-navy">
Magazine Issues
</h1> <p class="text-gray-500 mt-1">
Manage and publish magazine editions.
</p> </div> <a href="/dashboard/issues/new" class="px-6 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-md hover:shadow-lg flex items-center gap-2"> <span>+ Create Issue</span> </a> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> ${issues?.map((issue) => renderTemplate`<div class="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"> <div class="h-48 bg-gray-100 relative overflow-hidden"> ${issue.cover_image ? renderTemplate`<img${addAttribute(issue.cover_image, "src")}${addAttribute(issue.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` : renderTemplate`<div class="w-full h-full flex items-center justify-center text-gray-300"> <span class="text-5xl">📰</span> </div>`} <div class="absolute top-4 right-4"> <span${addAttribute(`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${issue.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`, "class")}> ${issue.status} </span> </div> </div> <div class="p-6"> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-2 line-clamp-2"> ${issue.title} </h3> <p class="text-gray-500 text-sm mb-4 line-clamp-2"> ${issue.description || "No description provided."} </p> <div class="flex items-center justify-between mt-4 text-sm text-gray-400"> <span>
Vol ${issue.volume}, Issue${" "} ${issue.issue_number} </span> <span> ${issue.published_at ? format(
    new Date(issue.published_at),
    "MMM yyyy"
  ) : "Unpublished"} </span> </div> <div class="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center"> <a${addAttribute(`/issues/${issue.slug}`, "href")} class="text-tuio-navy font-bold text-sm hover:text-tuio-red transition-colors" target="_blank">
View Live
</a> <div class="flex gap-2"> <a${addAttribute(`/dashboard/issues/edit/${issue.id}`, "href")} class="p-2 text-gray-400 hover:text-tuio-navy hover:bg-gray-100 rounded-full transition-all" title="Edit Issue">
✏️
</a> </div> </div> </div> </div>`)} ${(!issues || issues.length === 0) && renderTemplate`<div class="col-span-full py-16 text-center bg-gray-50 rounded-[24px] border border-dashed border-gray-200"> <div class="text-4xl mb-4">📭</div> <h3 class="text-xl font-tuio text-tuio-navy mb-2">
No Issues Found
</h3> <p class="text-gray-500 mb-6">
Start by creating your first magazine issue.
</p> <a href="/dashboard/issues/new" class="px-6 py-3 bg-white border border-gray-200 text-tuio-navy rounded-full font-bold uppercase tracking-wide hover:border-tuio-red hover:text-tuio-red transition-all">
Create Issue
</a> </div>`} </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/issues/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/issues/index.astro";
const $$url = "/dashboard/issues";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
