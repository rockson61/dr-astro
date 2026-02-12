import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BrSpvVaz.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
import { format } from 'date-fns';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const supabase = createSupabaseServerClient(Astro2);
  const { data: issue } = await supabase.from("issues").select("*").eq("slug", slug).single();
  if (!issue) {
    return Astro2.redirect("/404");
  }
  const { data: articles } = await supabase.from("articles").select(
    `
        *,
        author:profiles(full_name, avatar_url),
        category:categories(name, slug)
    `
  ).eq("issue_id", issue.id).eq("status", "published").order("created_at", { ascending: true });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${issue.title} | Dental Reach` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="relative bg-tuio-navy text-white overflow-hidden"> <div class="absolute inset-0 z-0"> <!-- Background Image Blur --> ${issue.cover_image && renderTemplate`<img${addAttribute(issue.cover_image, "src")} class="w-full h-full object-cover opacity-20 blur-xl scale-110">`} <div class="absolute inset-0 bg-gradient-to-r from-tuio-navy via-tuio-navy/90 to-transparent"></div> </div> <div class="container mx-auto px-4 py-20 md:py-32 relative z-10"> <div class="flex flex-col md:flex-row gap-12 items-center md:items-start"> <!-- Cover Image --> <div class="w-full max-w-xs md:max-w-sm shrink-0"> <div class="aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden border-4 border-white/10 relative group"> ${issue.cover_image ? renderTemplate`<img${addAttribute(issue.cover_image, "src")}${addAttribute(issue.title, "alt")} class="w-full h-full object-cover">` : renderTemplate`<div class="w-full h-full bg-tuio-navy/50 flex items-center justify-center text-6xl">
📰
</div>`} </div> </div> <!-- Info --> <div class="flex-grow text-center md:text-left"> <div class="flex items-center gap-4 justify-center md:justify-start mb-6 text-tuio-red font-mono text-sm uppercase tracking-widest"> <span>Vol ${issue.volume}</span> <span>•</span> <span>Issue ${issue.issue_number}</span> <span>•</span> <span>${format(
    new Date(issue.published_at),
    "MMMM yyyy"
  )}</span> </div> <h1 class="text-4xl md:text-6xl font-tuio uppercase leading-tight mb-6"> ${issue.title} </h1> <p class="text-lg text-gray-300 leading-relaxed max-w-2xl mb-10"> ${issue.description} </p> <div class="flex flex-wrap gap-4 justify-center md:justify-start"> ${issue.pdf_url && renderTemplate`<a${addAttribute(issue.pdf_url, "href")} target="_blank" class="px-8 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"> <span>Download PDF</span> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path> </svg> </a>`} <a href="#contents" class="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-wide hover:bg-white/10 transition-all flex items-center gap-2"> <span>Read Online</span> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path> </svg> </a> </div> </div> </div> </div> </header>  <section id="contents" class="py-20 bg-gray-50 min-h-screen"> <div class="container mx-auto px-4 max-w-5xl"> <div class="text-center mb-16"> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-4">
In This Issue
</h2> <div class="w-24 h-1 bg-tuio-red mx-auto"></div> </div> <div class="space-y-6"> ${articles?.map((article, index) => renderTemplate`<article class="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-lg transition-all group flex flex-col md:flex-row gap-8 items-start"> <div class="flex-shrink-0 w-16 h-16 rounded-full bg-tuio-bg flex items-center justify-center font-tuio text-2xl text-tuio-navy group-hover:bg-tuio-red group-hover:text-white transition-colors"> ${index + 1} </div> <div class="flex-grow"> <div class="flex items-center gap-3 mb-2"> <span class="text-xs font-bold uppercase tracking-wider text-tuio-red"> ${article.category?.name || "Article"} </span> ${article.doi && renderTemplate`<span class="text-xs font-mono text-gray-400 border border-gray-100 px-2 py-0.5 rounded">
DOI: ${article.doi} </span>`} </div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-3 group-hover:text-tuio-red transition-colors"> <a${addAttribute(`/articles/${article.slug}`, "href")}> ${article.title} </a> </h3> <p class="text-gray-500 mb-4 line-clamp-2"> ${article.excerpt} </p> <div class="flex items-center gap-3"> ${article.author?.avatar_url ? renderTemplate`<img${addAttribute(article.author.avatar_url, "src")} class="w-8 h-8 rounded-full object-cover">` : renderTemplate`<div class="w-8 h-8 rounded-full bg-gray-200"></div>`} <span class="text-sm font-bold text-gray-700"> ${article.author?.full_name || "Unknown Author"} </span> </div> </div> <div class="flex-shrink-0 self-center md:self-start mt-4 md:mt-0"> <a${addAttribute(`/articles/${article.slug}`, "href")} class="px-6 py-3 bg-gray-50 text-tuio-navy rounded-full font-bold uppercase text-xs tracking-wide hover:bg-tuio-navy hover:text-white transition-all whitespace-nowrap">
Read Article
</a> </div> </article>`)} ${(!articles || articles.length === 0) && renderTemplate`<div class="text-center py-12 text-gray-400"> <p>No articles found for this issue.</p> </div>`} </div> </div> </section> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/issues/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/issues/[slug].astro";
const $$url = "/issues/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
