import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as renderScript } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C_IiUpen.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact Us | DentalReach" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy text-white py-20 relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10 text-center"> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6">
Get In<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">Touch</span> </h1> <p class="text-xl text-gray-400 max-w-2xl mx-auto font-light">
Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
</p> </div> </section> <div class="bg-tuio-bg py-16"> <div class="container mx-auto px-4"> <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"> <!-- Contact Form --> <div class="bg-white rounded-[32px] p-8 shadow-sm"> <h2 class="font-tuio text-2xl uppercase text-tuio-navy mb-6">
Send a Message
</h2> <form id="contact-form" class="space-y-6"> <div> <label class="block text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Your Name</label> <input name="name" type="text" required class="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:outline-none" placeholder="Dr. Jane Doe"> </div> <div> <label class="block text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Email Address</label> <input name="email" type="email" required class="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:outline-none" placeholder="you@example.com"> </div> <div> <label class="block text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Subject</label> <input name="subject" type="text" class="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:outline-none" placeholder="General Inquiry"> </div> <div> <label class="block text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Message</label> <textarea name="message" rows="5" required class="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:outline-none resize-none" placeholder="Your message..."></textarea> </div> <button type="submit" class="w-full py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all disabled:opacity-50">
Send Message
</button> </form> <div id="form-response" class="mt-4 text-center text-sm font-bold hidden"></div> </div> ${renderScript($$result2, "/Users/rockson61/Downloads/DR Astro/src/pages/contact.astro?astro&type=script&index=0&lang.ts")} <!-- Contact Info --> <div class="space-y-8"> <div class="bg-white rounded-[32px] p-8 shadow-sm"> <div class="text-4xl mb-4">📧</div> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-2">
Email Us
</h3> <a href="mailto:hello@dentalreach.today" class="text-tuio-red hover:underline font-medium">hello@dentalreach.today</a> </div> <div class="bg-white rounded-[32px] p-8 shadow-sm"> <div class="text-4xl mb-4">🌐</div> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-2">
Follow Us
</h3> <div class="flex gap-4"> <a href="#" class="w-10 h-10 bg-tuio-bg rounded-full flex items-center justify-center hover:bg-tuio-red hover:text-white transition-colors">𝕏</a> <a href="#" class="w-10 h-10 bg-tuio-bg rounded-full flex items-center justify-center hover:bg-tuio-red hover:text-white transition-colors">in</a> <a href="#" class="w-10 h-10 bg-tuio-bg rounded-full flex items-center justify-center hover:bg-tuio-red hover:text-white transition-colors">fb</a> </div> </div> <div class="bg-tuio-navy rounded-[32px] p-8 text-white"> <div class="text-4xl mb-4">💬</div> <h3 class="font-tuio text-xl uppercase mb-2">
Community Support
</h3> <p class="text-gray-400 font-light mb-4">
Join our community forums for faster responses and
                            peer support.
</p> <a href="/community" class="text-tuio-red font-bold hover:underline">Visit Community →</a> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/contact.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Contact,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
