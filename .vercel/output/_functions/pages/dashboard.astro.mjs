import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../chunks/DashboardLayout_B_rgsWHr.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CYzxA37O.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function ProfileCompletionWidget({ profile }) {
  const fields = [
    { key: "avatar_url", label: "Profile Picture", weight: 20 },
    { key: "bio", label: "Biography", weight: 30 },
    { key: "specialty", label: "Specialty", weight: 20 },
    { key: "location", label: "Location", weight: 15 },
    { key: "clinic_name", label: "Clinic/Workplace", weight: 15 }
  ];
  const completedFields = fields.filter((f) => profile[f.key] && profile[f.key].length > 0);
  const score = completedFields.reduce((acc, curr) => acc + curr.weight, 0);
  const missingFields = fields.filter((f) => !profile[f.key] || profile[f.key].length === 0);
  if (score === 100) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[24px] p-6 shadow-sm border border-tuio-red/20 mb-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-tuio-red/5 rounded-bl-[100px] -mr-8 -mt-8" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-24 h-24 shrink-0", children: [
        /* @__PURE__ */ jsxs("svg", { className: "w-full h-full transform -rotate-90", children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "48",
              cy: "48",
              r: "40",
              stroke: "currentColor",
              strokeWidth: "8",
              fill: "transparent",
              className: "text-gray-100"
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "48",
              cy: "48",
              r: "40",
              stroke: "currentColor",
              strokeWidth: "8",
              fill: "transparent",
              strokeDasharray: 251.2,
              strokeDashoffset: 251.2 - 251.2 * score / 100,
              className: "text-tuio-red transition-all duration-1000 ease-out"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex items-center justify-center text-xl font-bold text-tuio-navy", children: [
          score,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-tuio uppercase text-tuio-navy mb-2", children: "Complete your profile" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-4", children: "A complete profile increases your visibility and builds trust with patients and peers." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: missingFields.slice(0, 3).map((field) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-bold", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
          " ",
          field.label
        ] }, field.key)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxs("a", { href: "/dashboard/settings", className: "px-6 py-3 bg-tuio-navy text-white rounded-full font-bold text-sm hover:bg-tuio-red transition-colors flex items-center gap-2", children: [
        "Finish Setup ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] })
  ] });
}

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
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: articles, error: articlesError } = await supabase.from("articles").select("id, status, views_count").eq("author_id", user.id);
  const { count: listingsCount, error: listingsError } = await supabase.from("listings").select("*", { count: "exact", head: true }).eq("owner_id", user.id);
  const totalArticles = articles?.length || 0;
  const publishedArticles = articles?.filter((a) => a.status === "published").length || 0;
  const totalViews = articles?.reduce((sum, article) => sum + (article.views_count || 0), 0) || 0;
  const totalListings = listingsCount || 0;
  const stats = [
    {
      label: "Reputation Score",
      value: profile?.reputation_score || 0,
      change: "Lifetime",
      icon: "\u2B50"
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      change: "All Time",
      icon: "chart"
    },
    {
      label: "Articles Published",
      value: publishedArticles.toString(),
      change: `${totalArticles} Total`,
      icon: "document"
    },
    {
      label: "Business Listings",
      value: totalListings.toString(),
      change: "Active",
      icon: "\u{1F3E2}"
    }
  ];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Overview" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProfileCompletionWidget", ProfileCompletionWidget, { "client:load": true, "profile": profile, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/dashboard/ProfileCompletionWidget", "client:component-export": "default" })}  ${maybeRenderHead()}<div class="mb-10 animate-fade-in relative"> <div class="bg-primary-900 rounded-[32px] p-10 text-white relative overflow-hidden shadow-xl"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <!-- Decorative Circle --> <div class="absolute -right-20 -top-20 w-80 h-80 bg-primary-600 rounded-full blur-[100px] opacity-30"></div> <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"> <div> <h2 class="text-4xl font-heading uppercase mb-2 leading-tight">
Welcome back, <span class="text-cyan-400">${profile?.full_name?.split(" ")[0] || "Doctor"}!</span> 👋
</h2> <p class="text-white/70 text-lg font-light max-w-xl">
Your professional dashboard is looking great today.
                        Here's a snapshot of your impact.
</p> </div> <div> <a href="/dashboard/articles/new" class="bg-white text-primary-900 hover:bg-cyan-50 font-bold py-3 px-6 rounded-full transition-all inline-flex items-center gap-2"> <span>Create New +</span> </a> </div> </div> </div> </div>  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"> ${stats.map((stat, index) => renderTemplate`<div${addAttribute(`glass-card group animate-slide-up border border-white/50 bg-white`, "class")}${addAttribute(`animation-delay: ${index * 100}ms`, "style")}> <div class="flex items-center justify-between mb-4"> <span class="text-gray-400 font-bold uppercase tracking-wider text-xs"> ${stat.label} </span> <span${addAttribute(`text-xs font-bold px-3 py-1 rounded-full ${stat.change.startsWith("+") ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`, "class")}> ${stat.change} </span> </div> <div class="flex items-end justify-between"> <div class="text-4xl font-heading text-primary-900 group-hover:scale-110 transition-transform origin-left"> ${stat.value} </div> <div class="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-2xl group-hover:bg-primary-600 group-hover:text-white transition-colors"> ${stat.icon === "chart" ? "\u{1F4C8}" : stat.icon === "document" ? "\u{1F4C4}" : stat.icon} </div> </div> </div>`)} </div>  <div class="grid lg:grid-cols-2 gap-8"> <!-- Quick Actions --> <div class="glass-card bg-white animate-slide-up" style="animation-delay: 300ms"> <div class="flex items-center justify-between mb-8"> <h3 class="font-heading text-2xl uppercase text-primary-900">
Quick Actions
</h3> <span class="text-2xl">⚡</span> </div> <div class="space-y-4"> <a href="/dashboard/articles/new" class="block w-full p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-primary-600 hover:shadow-md transition-all group"> <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
✍️
</div> <div> <span class="font-bold text-primary-900 text-lg block mb-1">Write New Article</span> <span class="text-sm text-gray-500">Share your expertise with the community.</span> </div> </div> </a> <a href="/dashboard/listings/new" class="block w-full p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-primary-600 hover:shadow-md transition-all group"> <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
🏢
</div> <div> <span class="font-bold text-primary-900 text-lg block mb-1">Add Business Listing</span> <span class="text-sm text-gray-500">List your clinic or lab in the directory.</span> </div> </div> </a> </div> </div> <!-- Recent Notifications --> <div class="glass-card bg-white animate-slide-up" style="animation-delay: 400ms"> <div class="flex items-center justify-between mb-8"> <h3 class="font-heading text-2xl uppercase text-primary-900">
Recent Updates
</h3> <span class="text-2xl">🔔</span> </div> <div class="space-y-6"> <!-- Notification Item --> <div class="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"> <div class="relative"> <div class="w-12 h-12 rounded-full bg-primary-900/5 text-primary-900 flex items-center justify-center shrink-0">
ℹ️
</div> <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-600 rounded-full border-2 border-white"></span> </div> <div> <p class="text-gray-800 font-medium mb-1">
Welcome to your new <span class="font-bold text-primary-600">DentalReach Dashboard</span>.
</p> <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">2 hours ago</span> </div> </div> <!-- Notification Item --> <div class="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"> <div class="relative"> <div class="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
✓
</div> </div> <div> <p class="text-gray-800 font-medium mb-1">
Your article <span class="italic">"Digital Dentistry 2026"</span> was successfully published.
</p> <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Yesterday</span> </div> </div> </div> <div class="mt-8 text-center"> <a href="/dashboard/notifications" class="text-primary-600 font-bold uppercase text-sm tracking-widest hover:underline">View All Updates</a> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
