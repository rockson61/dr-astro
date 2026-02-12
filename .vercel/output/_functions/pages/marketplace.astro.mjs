import { e as createAstro, c as createComponent } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return Astro2.redirect("/products", 301);
}, "/Users/rockson61/Downloads/DR Astro/src/pages/marketplace/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/marketplace/index.astro";
const $$url = "/marketplace";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
