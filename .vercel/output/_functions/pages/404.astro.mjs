import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Page Not Found | DentalReach" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[80vh] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden bg-gradient-to-br from-primary-900 to-neutral-900 text-white"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="relative z-10 max-w-2xl"> <h1 class="text-9xl font-heading font-bold text-primary-500 mb-4 animate-bounce">
404
</h1> <h2 class="text-4xl font-heading uppercase mb-6">Page Not Found</h2> <p class="text-xl text-primary-100/80 mb-8">
Oops! It seems like the tooth fairy took this page. Why not
                search for something else or head back home?
</p> <form action="/search" class="mb-8 max-w-md mx-auto relative"> <input type="text" name="q" placeholder="Search for articles, events..." class="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"> <button type="submit" class="absolute right-2 top-2 bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-primary-600 transition-colors">
→
</button> </form> <div class="flex flex-wrap justify-center gap-4"> <a href="/" class="px-8 py-3 bg-primary-600 rounded-full font-bold hover:bg-white hover:text-primary-600 transition-all border border-white/20">
Back to Home
</a> <a href="/articles" class="px-8 py-3 bg-transparent border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all">
Browse Articles
</a> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/404.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
