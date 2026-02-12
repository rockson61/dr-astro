import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C_IiUpen.mjs';
export { renderers } from '../../renderers.mjs';

const $$PastWinners = createComponent(($$result, $$props, $$slots) => {
  const pastWinners = [
    {
      year: 2025,
      winners: [
        {
          name: "Dr. Priya Sharma",
          category: "Clinical Excellence",
          location: "Mumbai, India",
          image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300"
        },
        {
          name: "Dr. Michael Chen",
          category: "Young Dentist of the Year",
          location: "Singapore",
          image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300"
        },
        {
          name: "Precision Dental Labs",
          category: "Best Dental Laboratory",
          location: "Dubai, UAE",
          image: null
        },
        {
          name: "Dr. Sarah Johnson",
          category: "Innovative Technology Award",
          location: "New York, USA",
          image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300"
        }
      ]
    },
    {
      year: 2024,
      winners: [
        {
          name: "Dr. Raj Patel",
          category: "Clinical Excellence",
          location: "London, UK",
          image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=300"
        },
        {
          name: "Dr. Emily Watson",
          category: "Young Dentist of the Year",
          location: "Sydney, Australia",
          image: "https://images.pexels.com/photos/5407117/pexels-photo-5407117.jpeg?auto=compress&cs=tinysrgb&w=300"
        },
        {
          name: "SmileTech Labs",
          category: "Best Dental Laboratory",
          location: "Berlin, Germany",
          image: null
        },
        {
          name: "Dr. James Liu",
          category: "Innovative Technology Award",
          location: "Hong Kong",
          image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300"
        }
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Past Winners | DentalReach Awards" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy py-16 text-center text-white relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <span class="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-[0.2em] uppercase border border-tuio-red text-tuio-red rounded-full bg-tuio-red/10">Hall of Fame</span> <h1 class="text-4xl md:text-6xl font-tuio uppercase mb-4">
Past<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Winners</span> </h1> <p class="text-gray-400 max-w-2xl mx-auto">
Celebrating the distinguished professionals who have shaped
                dentistry through excellence and innovation.
</p> </div> </section> <div class="bg-tuio-bg min-h-screen"> <div class="container mx-auto px-4 py-12"> ${pastWinners.map((yearData) => renderTemplate`<div class="mb-16"> <div class="text-center mb-10"> <span class="inline-block px-6 py-2 bg-tuio-navy text-white rounded-full font-tuio text-2xl uppercase"> ${yearData.year} </span> </div> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> ${yearData.winners.map((winner) => renderTemplate`<div class="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group border border-transparent hover:border-tuio-red text-center"> <div class="h-48 bg-gradient-to-br from-tuio-navy to-gray-900 relative overflow-hidden flex items-center justify-center"> ${winner.image ? renderTemplate`<img${addAttribute(winner.image, "src")}${addAttribute(winner.name, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">` : renderTemplate`<div class="text-6xl">🏆</div>`} <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div class="absolute bottom-4 left-4 right-4"> <span class="bg-tuio-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"> ${winner.category} </span> </div> </div> <div class="p-6"> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-2 group-hover:text-tuio-red transition-colors"> ${winner.name} </h3> <p class="text-sm text-gray-500"> ${winner.location} </p> </div> </div>`)} </div> </div>`)} <div class="text-center mt-16"> <a href="/awards/nominate" class="inline-block px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Nominate for 2026
</a> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/awards/past-winners.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/awards/past-winners.astro";
const $$url = "/awards/past-winners";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$PastWinners,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
