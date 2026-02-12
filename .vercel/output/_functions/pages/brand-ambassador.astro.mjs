import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
export { renderers } from '../renderers.mjs';

const $$BrandAmbassador = createComponent(($$result, $$props, $$slots) => {
  const benefits = [
    { icon: "\u{1F3AF}", title: "Exclusive Access", desc: "Get early access to new features, events, and content before anyone else." },
    { icon: "\u{1F4B0}", title: "Revenue Share", desc: "Earn commission on referrals and sponsored content opportunities." },
    { icon: "\u{1F3C6}", title: "Recognition", desc: "Featured profile badge and spotlight in our community." },
    { icon: "\u{1F381}", title: "Premium Perks", desc: "Free premium membership, swag, and exclusive networking events." }
  ];
  const requirements = [
    "Active dental professional with verified credentials",
    "Minimum 1,000 followers on social media OR 50+ approved articles on DentalReach",
    "Commitment to ethical promotion and community guidelines",
    "Regular engagement with the community (minimum 4 posts/month)"
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Brand Ambassador Program | DentalReach" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy text-white py-24 relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <div class="max-w-4xl mx-auto text-center"> <span class="inline-block px-6 py-2 bg-tuio-red rounded-full text-sm font-bold uppercase tracking-widest mb-6">Now Accepting Applications</span> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-[0.9]">
Become a<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Brand Ambassador</span> </h1> <p class="text-xl text-gray-300 font-light mb-10">
Join our elite network of dental influencers and thought leaders. Represent DentalReach, grow your personal brand, and earn exclusive rewards.
</p> <a href="#apply" class="inline-block px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all shadow-xl">
Apply Now
</a> </div> </div> </section> <div class="bg-tuio-bg py-20"> <div class="container mx-auto px-4"> <!-- Benefits --> <div class="text-center mb-16"> <h2 class="text-4xl font-tuio uppercase text-tuio-navy mb-4">Ambassador Benefits</h2> <div class="w-24 h-1 bg-tuio-red mx-auto"></div> </div> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"> ${benefits.map((benefit) => renderTemplate`<div class="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"> <div class="text-5xl mb-6 group-hover:scale-110 transition-transform">${benefit.icon}</div> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-4">${benefit.title}</h3> <p class="text-gray-500 font-light">${benefit.desc}</p> </div>`)} </div> <!-- Requirements --> <div class="max-w-3xl mx-auto"> <div class="text-center mb-12"> <h2 class="text-4xl font-tuio uppercase text-tuio-navy mb-4">Requirements</h2> <div class="w-24 h-1 bg-tuio-red mx-auto"></div> </div> <div class="bg-white rounded-[32px] p-8 shadow-sm"> <ul class="space-y-4"> ${requirements.map((req) => renderTemplate`<li class="flex items-start gap-4"> <span class="w-6 h-6 bg-tuio-red rounded-full flex items-center justify-center shrink-0 mt-1"> <span class="text-white text-sm">✓</span> </span> <span class="text-gray-600">${req}</span> </li>`)} </ul> </div> </div> </div> </div>  <section id="apply" class="bg-tuio-navy text-white py-20 rounded-t-[40px]"> <div class="container mx-auto px-4"> <div class="max-w-2xl mx-auto"> <div class="text-center mb-12"> <h2 class="text-4xl font-tuio uppercase mb-4">Apply Now</h2> <p class="text-gray-400 font-light">Fill out the form below and we'll review your application within 5 business days.</p> </div> <form class="space-y-6"> <div class="grid md:grid-cols-2 gap-6"> <div> <label class="block text-sm font-bold uppercase tracking-wide mb-2 text-gray-300">Full Name</label> <input type="text" class="w-full px-4 py-3 rounded-[16px] bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-tuio-red focus:outline-none" placeholder="Dr. Jane Doe"> </div> <div> <label class="block text-sm font-bold uppercase tracking-wide mb-2 text-gray-300">Email</label> <input type="email" class="w-full px-4 py-3 rounded-[16px] bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-tuio-red focus:outline-none" placeholder="you@example.com"> </div> </div> <div> <label class="block text-sm font-bold uppercase tracking-wide mb-2 text-gray-300">Social Media Links</label> <input type="text" class="w-full px-4 py-3 rounded-[16px] bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-tuio-red focus:outline-none" placeholder="Instagram, LinkedIn, Twitter..."> </div> <div> <label class="block text-sm font-bold uppercase tracking-wide mb-2 text-gray-300">Why do you want to be an ambassador?</label> <textarea rows="4" class="w-full px-4 py-3 rounded-[16px] bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-tuio-red focus:outline-none resize-none" placeholder="Tell us about yourself..."></textarea> </div> <button type="submit" class="w-full py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all">
Submit Application
</button> </form> </div> </div> </section> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/brand-ambassador.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/brand-ambassador.astro";
const $$url = "/brand-ambassador";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$BrandAmbassador,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
