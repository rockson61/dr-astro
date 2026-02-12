import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "DentalReach Awards 2026 | Celebrating Excellence" }, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<section class="bg-tuio-navy text-white min-h-[60vh] flex items-center relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="absolute -right-20 top-20 w-96 h-96 bg-tuio-red/30 rounded-full blur-3xl animate-pulse"></div> <div class="container mx-auto px-4 relative z-10 text-center"> <span class="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-[0.2em] uppercase border border-tuio-red text-tuio-red rounded-full bg-tuio-red/10">Coming Soon</span> <h1 class="text-5xl md:text-8xl font-tuio uppercase mb-6 leading-[0.9]">
DentalReach<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Awards 2026</span> </h1> <p class="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 font-light">
Recognizing the luminaries, innovators, and future leaders
                shaping global dentistry.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/awards/nominate" class="px-10 py-4 text-lg bg-tuio-red rounded-full font-bold hover:bg-white hover:text-tuio-red transition-all">Nominate Now</a> <a href="/awards/past-winners" class="px-10 py-4 text-lg border border-white/20 rounded-full hover:bg-white/10 transition-colors">Past Winners</a> </div> </div> </section>  <section class="py-20 bg-neutral-50 dark:bg-black"> <div class="container mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-3xl font-serif font-bold mb-4 dark:text-white">
Award Categories
</h2> <div class="w-20 h-1 bg-accent mx-auto"></div> </div> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8"> ${[
    "Clinical Excellence",
    "Young Dentist of the Year",
    "Best Dental Lab",
    "Innovative Tech"
  ].map((cat, i) => renderTemplate`<div class="bg-white p-8 rounded-[32px] text-center hover:-translate-y-2 transition-transform duration-500 border-t-8 border-tuio-red shadow-sm"> <div class="text-4xl mb-6">🏆</div> <h3 class="text-xl font-bold mb-3 font-tuio uppercase text-tuio-navy"> ${cat} </h3> <p class="text-sm text-gray-500">
Celebrating outstanding achievements and
                                contributions in ${cat.toLowerCase()}.
</p> </div>`)} </div> </div> </section>  <section class="py-20"> <div class="container mx-auto px-4"> <div class="max-w-4xl mx-auto glass-card p-10 rounded-2xl relative overflow-hidden"> <div class="absolute top-0 left-0 w-full h-1 bg-primary-600"></div> <h2 class="text-2xl font-bold mb-8 text-center dark:text-white">
Important Dates
</h2> <div class="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:h-full before:w-px before:bg-gray-200 dark:before:bg-white/10"> ${[
    {
      date: "Aug 1, 2025",
      title: "Nominations Open",
      desc: "Submit your entries online."
    },
    {
      date: "Oct 15, 2025",
      title: "Voting Begins",
      desc: "Community voting period starts."
    },
    {
      date: "Dec 1, 2025",
      title: "Gala Night",
      desc: "Winners announced live."
    }
  ].map((item, i) => renderTemplate`<div${addAttribute(`flex flex-col md:flex-row items-center gap-8 relative z-10 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`, "class")}> <div class="w-full md:w-1/2 text-left md:text-right px-4"> <h3${addAttribute(`text-xl font-bold ${i % 2 === 0 ? "md:text-right" : "md:text-left"} text-primary-600`, "class")}> ${item.date} </h3> </div> <div class="w-8 h-8 rounded-full bg-neutral-900 border-4 border-accent shrink-0"></div> <div class="w-full md:w-1/2 px-4"> <h4 class="font-bold text-lg dark:text-white"> ${item.title} </h4> <p class="text-gray-500 text-sm"> ${item.desc} </p> </div> </div>`)} </div> </div> </div> </section> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/awards/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/awards/index.astro";
const $$url = "/awards";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
