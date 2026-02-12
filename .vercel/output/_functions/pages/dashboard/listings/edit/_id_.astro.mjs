import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../../chunks/DashboardLayout_CKsRPMqu.mjs';
import { L as ListingForm } from '../../../../chunks/ListingForm_C6xk94eh.mjs';
import { c as createSupabaseServerClient } from '../../../../chunks/supabase_woKm2pOd.mjs';
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
    return Astro2.redirect("/dashboard/my-listings");
  }
  const { data: listing, error } = await supabase.from("listings").select("*").eq("id", id).eq("owner_id", user.id).single();
  if (error || !listing) {
    console.error("Error fetching listing or unauthorized:", error);
    return Astro2.redirect("/dashboard/my-listings");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `Edit: ${listing.business_name}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in-up"> ${renderComponent($$result2, "ListingForm", ListingForm, { "client:load": true, "initialData": listing, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/dashboard/ListingForm", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/listings/edit/[id].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/listings/edit/[id].astro";
const $$url = "/dashboard/listings/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
