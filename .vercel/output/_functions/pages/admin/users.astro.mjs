import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
export { renderers } from '../../renderers.mjs';

const $$Users = createComponent(($$result, $$props, $$slots) => {
  const title = "User Management | Admin";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "UserManagement", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/admin/UserManagement", "client:component-export": "default" })} ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/admin/users.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/admin/users.astro";
const $$url = "/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Users,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
