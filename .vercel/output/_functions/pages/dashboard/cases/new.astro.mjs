import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_CKsRPMqu.mjs';
import { C as CaseStudyForm } from '../../../chunks/CaseStudyForm_Bg24VhrY.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const $$New = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Submit Clinical Case" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in-up"> ${renderComponent($$result2, "CaseStudyForm", CaseStudyForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/dashboard/CaseStudyForm", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/cases/new.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/cases/new.astro";
const $$url = "/dashboard/cases/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$New,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
