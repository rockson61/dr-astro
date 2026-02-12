import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, ah as unescapeHTML } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { s as supabase } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: guide } = await supabase.from("guides").select("*").eq("slug", slug).single();
  const mockGuide = {
    title: "Ultimate Guide to Digital Workflow",
    description: `Transitioning to a fully digital dental practice can be daunting. This comprehensive 40-page guide breaks down every step of the process, from selecting the right intraoral scanner to implementing 3D printing in-house.

  **What You'll Learn:**
  - ROI analysis of digital equipment
  - Staff training protocols
  - Integration with practice management software
  - Case studies from 10 successful digital clinics`,
    image_url: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=800",
    pages: 42,
    file_size: "4.5 MB"
  };
  const displayGuide = guide || mockGuide;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${displayGuide.title} | DentalReach Guides` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-tuio-bg py-12 min-h-screen"> <div class="container mx-auto px-4 max-w-5xl"> <!-- Breadcrumb --> <div class="mb-8 text-sm text-gray-500"> <a href="/" class="hover:text-tuio-red">Home</a> &gt;
<a href="/guides" class="hover:text-tuio-red">Resources</a> &gt;
<span class="text-tuio-navy font-bold">Guides</span> </div> <div class="bg-white rounded-[40px] shadow-sm overflow-hidden grid md:grid-cols-2"> <!-- Cover Image Side --> <div class="bg-gray-100 relative min-h-[400px]"> <img${addAttribute(displayGuide.image_url, "src")}${addAttribute(displayGuide.title, "alt")} class="absolute inset-0 w-full h-full object-cover"> <div class="absolute inset-0 bg-tuio-navy/10"></div> </div> <!-- Content Side --> <div class="p-12 flex flex-col justify-center"> <span class="text-tuio-red font-bold uppercase tracking-widest text-sm mb-4">Free Resource</span> <h1 class="font-tuio text-4xl md:text-5xl text-tuio-navy mb-6 leading-tight"> ${displayGuide.title} </h1> <div class="flex items-center gap-6 mb-8 text-sm text-gray-500 font-mono"> <span class="flex items-center gap-2">📄 ${displayGuide.pages} Pages</span> <span class="flex items-center gap-2">💾 ${displayGuide.file_size}</span> </div> <div class="prose prose-gray mb-8 text-gray-600 font-light leading-relaxed">${unescapeHTML(displayGuide.description?.replace(
    /\n/g,
    "<br/>"
  ))}</div> <form class="bg-gray-50 p-6 rounded-2xl border border-gray-100"> <h3 class="font-bold text-tuio-navy mb-4">
Download this Guide
</h3> <div class="space-y-4"> <input type="email" placeholder="Enter your business email" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-tuio-red"> <button type="button" class="w-full py-3 bg-tuio-red text-white rounded-lg font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all">
Get Download Link
</button> </div> <p class="text-xs text-gray-400 mt-4 text-center">
We respect your privacy. Unsubscribe at any time.
</p> </form> </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/guides/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/guides/[slug].astro";
const $$url = "/guides/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
