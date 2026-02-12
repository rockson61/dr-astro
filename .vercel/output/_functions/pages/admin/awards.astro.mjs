import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C_IiUpen.mjs';
export { renderers } from '../../renderers.mjs';

const $$Awards = createComponent(($$result, $$props, $$slots) => {
  const title = "Award Management | Admin";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "AwardManagement", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/admin/AwardManagement", "client:component-export": "default" })} ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/admin/awards.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/admin/awards.astro";
const $$url = "/admin/awards";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Awards,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
