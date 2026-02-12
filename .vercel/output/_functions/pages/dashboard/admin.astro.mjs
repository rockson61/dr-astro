import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "super_admin" && profile?.role !== "admin") {
    return Astro2.redirect("/dashboard");
  }
  const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: articleCount } = await supabase.from("articles").select("*", { count: "exact", head: true });
  const { count: pendingArticles } = await supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "under_review");
  const { count: reportCount } = await supabase.from("comments").select("*", { count: "exact", head: true }).eq("is_flagged", true);
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Admin Overview" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in space-y-8"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-2">
System Overview
</h2> <p class="text-gray-500">
Welcome back, Admin. Here's what's happening on DentalReach.
</p> </div>  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <div class="flex items-center justify-between mb-4"> <span class="text-gray-400 font-bold uppercase text-xs tracking-wider">Total Users</span> <span class="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">👥</span> </div> <div class="text-3xl font-tuio text-tuio-navy"> ${userCount || 0} </div> <div class="text-xs text-green-500 font-bold mt-2">
Active Community
</div> </div> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <div class="flex items-center justify-between mb-4"> <span class="text-gray-400 font-bold uppercase text-xs tracking-wider">Total Articles</span> <span class="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">📰</span> </div> <div class="text-3xl font-tuio text-tuio-navy"> ${articleCount || 0} </div> <div class="text-xs text-gray-400 font-bold mt-2">
Across all categories
</div> </div> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <div class="flex items-center justify-between mb-4"> <span class="text-gray-400 font-bold uppercase text-xs tracking-wider">Pending Review</span> <span class="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">⏳</span> </div> <div class="text-3xl font-tuio text-tuio-navy"> ${pendingArticles || 0} </div> <div class="text-xs text-orange-500 font-bold mt-2"> <a href="/dashboard/editor" class="hover:underline">View Editorial Queue →</a> </div> </div> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <div class="flex items-center justify-between mb-4"> <span class="text-gray-400 font-bold uppercase text-xs tracking-wider">Flagged Content</span> <span class="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">🚩</span> </div> <div class="text-3xl font-tuio text-tuio-navy"> ${reportCount || 0} </div> <div class="text-xs text-red-500 font-bold mt-2"> <a href="/dashboard/moderator" class="hover:underline">View Reports →</a> </div> </div> </div>  <div class="grid md:grid-cols-2 gap-8"> <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"> <h3 class="font-tuio text-xl text-tuio-navy mb-6 uppercase">
Administrative Tools
</h3> <div class="grid grid-cols-2 gap-4"> <a href="/dashboard/admin/users" class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-tuio-navy hover:text-white transition-all group"> <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">👥</span> <span class="font-bold text-sm">Manage Users</span> </a> <a href="/dashboard/admin/settings" class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-tuio-navy hover:text-white transition-all group"> <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">⚙️</span> <span class="font-bold text-sm">System Settings</span> </a> <a href="/dashboard/admin/logs" class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-tuio-navy hover:text-white transition-all group"> <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">📜</span> <span class="font-bold text-sm">Audit Logs</span> </a> <a href="/dashboard/admin/newsletter" class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-tuio-navy hover:text-white transition-all group"> <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">📧</span> <span class="font-bold text-sm">Newsletter</span> </a> </div> </div> <div class="bg-tuio-navy rounded-3xl p-8 shadow-lg text-white relative overflow-hidden"> <div class="relative z-10"> <h3 class="font-tuio text-xl mb-2 uppercase">
System Health
</h3> <div class="space-y-4 mt-6"> <div class="flex justify-between items-center border-b border-white/10 pb-2"> <span class="text-white/60 text-sm">Database Connection</span> <span class="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-1 rounded">HEALTHY</span> </div> <div class="flex justify-between items-center border-b border-white/10 pb-2"> <span class="text-white/60 text-sm">Storage Usage</span> <span class="font-bold text-sm">24%</span> </div> <div class="flex justify-between items-center border-b border-white/10 pb-2"> <span class="text-white/60 text-sm">Last Backup</span> <span class="font-bold text-sm">2 hours ago</span> </div> <div class="flex justify-between items-center border-b border-white/10 pb-2"> <span class="text-white/60 text-sm">Server Time</span> <span class="font-bold text-sm">${(/* @__PURE__ */ new Date()).toLocaleTimeString()}</span> </div> </div> </div> <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-tuio-red rounded-full opacity-20 filter blur-3xl"></div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/index.astro";
const $$url = "/dashboard/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
