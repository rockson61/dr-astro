import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
export { renderers } from '../../renderers.mjs';

const $$Jobs = createComponent(($$result, $$props, $$slots) => {
  const title = "Job Management | Admin";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "JobManagement", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/admin/JobManagement", "client:component-export": "default" })} ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/admin/jobs.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/admin/jobs.astro";
const $$url = "/admin/jobs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Jobs,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
