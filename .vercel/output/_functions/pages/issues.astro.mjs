import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BrSpvVaz.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CFYPoMlB.mjs';
import { format } from 'date-fns';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const supabase = createSupabaseServerClient(Astro2);
  const { data: issues } = await supabase.from("issues").select("*").eq("status", "published").order("published_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Magazine Archive | Dental Reach" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative py-20 bg-primary-900 overflow-hidden"> <div class="absolute inset-0 z-0"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/90"></div> </div> <div class="container mx-auto px-4 relative z-10 text-center"> <span class="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-sm border border-primary-500/20">
Archive
</span> <h1 class="text-4xl md:text-6xl font-heading text-white mb-6 uppercase">
Magazine Issues
</h1> <p class="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
Explore our collection of curated dental knowledge, featuring expert insights, case studies, and the latest industry trends.
</p> </div> </section>  <section class="py-20 bg-gray-50"> <div class="container mx-auto px-4"> ${issues && issues.length > 0 ? renderTemplate`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${issues.map((issue) => renderTemplate`<a${addAttribute(`/issues/${issue.slug}`, "href")} class="group block"> <article class="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col"> <!-- Cover Image --> <div class="relative aspect-[3/4] overflow-hidden bg-gray-200"> ${issue.cover_image ? renderTemplate`<img${addAttribute(issue.cover_image, "src")}${addAttribute(issue.title, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">` : renderTemplate`<div class="w-full h-full flex items-center justify-center text-gray-300 bg-primary-900/5"> <span class="text-6xl">📰</span> </div>`} <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div> <div class="absolute bottom-6 left-6 right-6 text-white"> <div class="text-sm font-bold uppercase tracking-widest mb-1 opacity-80">
Vol ${issue.volume} • Issue ${issue.issue_number} </div> <div class="text-xs font-mono opacity-60"> ${format(new Date(issue.published_at), "MMMM yyyy")} </div> </div> </div> <!-- Content --> <div class="p-8 flex-grow flex flex-col"> <h3 class="text-2xl font-heading text-primary-900 uppercase mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors"> ${issue.title} </h3> <p class="text-gray-500 mb-6 line-clamp-3 text-sm flex-grow"> ${issue.description} </p> <div class="flex items-center gap-2 text-primary-500 font-bold uppercase tracking-wide text-sm mt-auto group-hover:gap-4 transition-all">
Read Issue <span>→</span> </div> </div> </article> </a>`)} </div>` : renderTemplate`<div class="text-center py-20"> <div class="text-6xl mb-6">📚</div> <h3 class="text-2xl font-heading text-primary-900 uppercase mb-4">No Issues Published Yet</h3> <p class="text-gray-500">Check back soon for our first edition.</p> </div>`} </div> </section> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/issues/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/issues/index.astro";
const $$url = "/issues";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
