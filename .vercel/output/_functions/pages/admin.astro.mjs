import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C_IiUpen.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin" && profile?.role !== "super_admin") {
    return Astro2.redirect("/dashboard");
  }
  const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: articlesCount } = await supabase.from("articles").select("*", { count: "exact", head: true });
  const { count: listingsCount } = await supabase.from("listings").select("*", { count: "exact", head: true });
  const { count: eventsCount } = await supabase.from("events").select("*", { count: "exact", head: true });
  const { count: pendingArticles } = await supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "pending");
  const { count: pendingListings } = await supabase.from("listings").select("*", { count: "exact", head: true }).eq("is_verified", false);
  const stats = [
    {
      label: "Total Users",
      value: usersCount?.toLocaleString() || "0",
      icon: "\u{1F465}",
      change: "Registered Users"
    },
    {
      label: "Articles",
      value: articlesCount?.toLocaleString() || "0",
      icon: "\u{1F4DD}",
      change: `${pendingArticles || 0} pending review`
    },
    {
      label: "Listings",
      value: listingsCount?.toLocaleString() || "0",
      icon: "\u{1F3E2}",
      change: `${pendingListings || 0} unverified`
    },
    {
      label: "Events",
      value: eventsCount?.toLocaleString() || "0",
      icon: "\u{1F4C5}",
      change: "Total Events"
    }
  ];
  const quickLinks = [
    {
      title: "Manage Users",
      href: "/admin/users",
      icon: "\u{1F465}",
      desc: "View and moderate user accounts"
    },
    {
      title: "Content Moderation",
      href: "/admin/articles",
      icon: "\u{1F4DD}",
      desc: "Review pending articles"
    },
    {
      title: "Verify Listings",
      href: "/admin/listings",
      icon: "\u2713",
      desc: "Approve directory listings"
    },
    {
      title: "Awards Management",
      href: "/admin/awards",
      icon: "\u{1F3C6}",
      desc: "Manage award nominations"
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin Dashboard | DentalReach" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-tuio-navy text-white py-8"> <div class="container mx-auto px-4"> <div class="flex items-center justify-between"> <div> <h1 class="text-3xl font-tuio uppercase">
Admin Dashboard
</h1> <p class="text-gray-400">
Manage your DentalReach platform
</p> </div> <a href="/dashboard" class="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
← Back to Dashboard
</a> </div> </div> </div> <div class="bg-tuio-bg min-h-screen py-8"> <div class="container mx-auto px-4"> <!-- Stats Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> ${stats.map((stat) => renderTemplate`<div class="bg-white rounded-[24px] p-6 shadow-sm"> <div class="flex items-center justify-between mb-4"> <span class="text-3xl">${stat.icon}</span> <span class="text-xs text-gray-400"> ${stat.change} </span> </div> <div class="text-3xl font-tuio text-tuio-navy mb-1"> ${stat.value} </div> <div class="text-gray-500 text-sm"> ${stat.label} </div> </div>`)} </div> <!-- Quick Actions --> <h2 class="text-2xl font-tuio uppercase text-tuio-navy mb-6">
Quick Actions
</h2> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> ${quickLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="bg-white rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-transparent hover:border-tuio-red"> <div class="text-4xl mb-4 group-hover:scale-110 transition-transform"> ${link.icon} </div> <h3 class="font-tuio text-lg uppercase text-tuio-navy mb-2 group-hover:text-tuio-red transition-colors"> ${link.title} </h3> <p class="text-gray-500 text-sm font-light"> ${link.desc} </p> </a>`)} </div> <!-- Recent Activity --> <div class="grid lg:grid-cols-2 gap-8"> <div class="bg-white rounded-[24px] p-6 shadow-sm"> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-6">
Pending Reviews
</h3> <div class="space-y-4"> <div class="flex items-center gap-4 p-4 bg-tuio-bg rounded-xl"> <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
📝
</div> <div class="flex-grow"> <p class="font-medium text-tuio-navy">
New article: "AI in Implantology"
</p> <p class="text-sm text-gray-400">
Submitted 2 hours ago
</p> </div> <button class="px-4 py-2 bg-tuio-red text-white rounded-full text-sm font-bold">Review</button> </div> <div class="flex items-center gap-4 p-4 bg-tuio-bg rounded-xl"> <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
🏢
</div> <div class="flex-grow"> <p class="font-medium text-tuio-navy">
Listing: "Smile Dental Clinic"
</p> <p class="text-sm text-gray-400">
Awaiting verification
</p> </div> <button class="px-4 py-2 bg-tuio-navy text-white rounded-full text-sm font-bold">Verify</button> </div> </div> </div> <div class="bg-white rounded-[24px] p-6 shadow-sm"> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-6">
System Status
</h3> <div class="space-y-4"> <div class="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200"> <div class="flex items-center gap-3"> <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> <span class="font-medium text-green-700">Database</span> </div> <span class="text-green-600 text-sm">Operational</span> </div> <div class="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200"> <div class="flex items-center gap-3"> <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> <span class="font-medium text-green-700">Auth Service</span> </div> <span class="text-green-600 text-sm">Operational</span> </div> <div class="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200"> <div class="flex items-center gap-3"> <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> <span class="font-medium text-green-700">Storage</span> </div> <span class="text-green-600 text-sm">Operational</span> </div> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/admin/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
