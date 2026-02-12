import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Settings;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "super_admin" && profile?.role !== "admin") {
    return Astro2.redirect("/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "System Settings" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in space-y-8"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-2">
System Settings
</h2> <p class="text-gray-500">Configure global platform settings.</p> </div> <div class="grid md:grid-cols-2 gap-8"> <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"> <h3 class="font-tuio text-xl text-tuio-navy mb-4">
General Information
</h3> <div class="space-y-4"> <div class="flex justify-between py-2 border-b border-gray-50"> <span class="text-gray-500">Site Name</span> <span class="font-bold">DentalReach Magazine</span> </div> <div class="flex justify-between py-2 border-b border-gray-50"> <span class="text-gray-500">Environment</span> <span class="font-bold text-green-500">Production</span> </div> <div class="flex justify-between py-2 border-b border-gray-50"> <span class="text-gray-500">Version</span> <span class="font-bold">2.4.0</span> </div> </div> </div> <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"> <h3 class="font-tuio text-xl text-tuio-navy mb-4">
Feature Flags
</h3> <div class="space-y-4"> <div class="flex justify-between items-center py-2 border-b border-gray-50"> <span class="text-gray-500">New Marketplace</span> <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Enabled</span> </div> <div class="flex justify-between items-center py-2 border-b border-gray-50"> <span class="text-gray-500">User Registration</span> <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Open</span> </div> <div class="flex justify-between items-center py-2 border-b border-gray-50"> <span class="text-gray-500">Maintenance Mode</span> <span class="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">Disabled</span> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/settings.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/settings.astro";
const $$url = "/dashboard/admin/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Settings,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
