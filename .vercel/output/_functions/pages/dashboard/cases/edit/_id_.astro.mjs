import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { C as CaseStudyForm } from '../../../../chunks/CaseStudyForm_Hv0_neKp.mjs';
import { c as createSupabaseServerClient } from '../../../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  if (!id) {
    return Astro2.redirect("/dashboard/my-articles");
  }
  const { data: caseStudy, error } = await supabase.from("clinical_cases").select("*").eq("id", id).eq("author_id", user.id).single();
  if (error || !caseStudy) {
    console.error("Error fetching case or unauthorized:", error);
    return Astro2.redirect("/dashboard/my-articles");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `Edit Case: ${caseStudy.title}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in-up"> ${renderComponent($$result2, "CaseStudyForm", CaseStudyForm, { "client:load": true, "initialData": caseStudy, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/dashboard/CaseStudyForm", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/cases/edit/[id].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/cases/edit/[id].astro";
const $$url = "/dashboard/cases/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
