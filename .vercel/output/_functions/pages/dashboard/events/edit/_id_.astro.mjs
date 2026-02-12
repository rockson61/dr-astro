import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { E as EventForm } from '../../../../chunks/EventForm_BzOZPySd.mjs';
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
    return Astro2.redirect("/dashboard/my-events");
  }
  const { data: event, error } = await supabase.from("events").select("*").eq("id", id).eq("organizer_id", user.id).single();
  if (error || !event) {
    console.error("Error fetching event or unauthorized:", error);
    return Astro2.redirect("/dashboard/my-events");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `Edit Event: ${event.title}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in-up">  ${renderComponent($$result2, "EventForm", EventForm, { "client:load": true, "initialData": event, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/dashboard/EventForm", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/events/edit/[id].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/events/edit/[id].astro";
const $$url = "/dashboard/events/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
