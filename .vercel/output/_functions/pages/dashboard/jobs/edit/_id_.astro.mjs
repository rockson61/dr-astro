import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { J as JobForm } from '../../../../chunks/JobForm_CsKTfUBm.mjs';
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
  const { data: job, error } = await supabase.from("jobs").select("*").eq("id", id).single();
  if (error || !job) {
    return Astro2.redirect("/dashboard/my-jobs");
  }
  if (job.user_id !== user.id) {
    return Astro2.redirect("/dashboard/my-jobs");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `Edit Job: ${job.title}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in-up"> ${renderComponent($$result2, "JobForm", JobForm, { "client:load": true, "initialData": job, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/dashboard/JobForm", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/jobs/edit/[id].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/jobs/edit/[id].astro";
const $$url = "/dashboard/jobs/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
