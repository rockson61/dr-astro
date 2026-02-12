import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { c as createSupabaseServerClient } from '../../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Logs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logs;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "super_admin" && profile?.role !== "admin") {
    return Astro2.redirect("/dashboard");
  }
  const logs = [
    {
      id: 1,
      action: "User Login",
      details: "Dr. Smith logged in",
      time: /* @__PURE__ */ new Date(),
      ip: "192.168.1.1"
    },
    {
      id: 2,
      action: "Article Approved",
      details: "Editor Jane approved 'Dental Implants 101'",
      time: new Date(Date.now() - 36e5),
      ip: "10.0.0.1"
    },
    {
      id: 3,
      action: "System Backup",
      details: "Daily backup completed successfully",
      time: new Date(Date.now() - 72e5),
      ip: "System"
    },
    {
      id: 4,
      action: "User Reported",
      details: "Comment #1234 flagged",
      time: new Date(Date.now() - 8e6),
      ip: "192.168.1.5"
    }
  ];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Audit Logs" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in space-y-8"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-2">
System Logs
</h2> <p class="text-gray-500">
Audit trail of recent system activities.
</p> </div> <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"> <table class="w-full text-sm"> <thead class="bg-gray-50 text-left"> <tr> <th class="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-xs">Timestamp</th> <th class="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-xs">Action</th> <th class="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-xs">Details</th> <th class="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-xs">IP Address</th> </tr> </thead> <tbody class="divide-y divide-gray-50"> ${logs.map((log) => renderTemplate`<tr class="hover:bg-gray-50 transition-colors"> <td class="px-6 py-4 text-gray-500 whitespace-nowrap"> ${log.time.toLocaleString()} </td> <td class="px-6 py-4 font-bold text-tuio-navy"> ${log.action} </td> <td class="px-6 py-4 text-gray-600"> ${log.details} </td> <td class="px-6 py-4 font-mono text-xs text-gray-400"> ${log.ip} </td> </tr>`)} </tbody> </table> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/logs.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/logs.astro";
const $$url = "/dashboard/admin/logs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Logs,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
