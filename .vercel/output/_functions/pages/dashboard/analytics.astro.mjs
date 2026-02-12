import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

function AnalyticsChart({ data }) {
  if (!data || data.length === 0) return /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm", children: "No data available" });
  const maxViews = Math.max(...data.map((d) => d.views), 1);
  const height = 200;
  const width = 600;
  const padding = 20;
  const xScale = (index) => padding + index / (data.length - 1) * (width - 2 * padding);
  const yScale = (val) => height - padding - val / maxViews * (height - 2 * padding);
  const viewPath = data.map(
    (d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.views)}`
  ).join(" ");
  const readPath = data.map(
    (d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.reads)}`
  ).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: "w-full overflow-x-auto", children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: `0 0 ${width} ${height}`, className: "w-full h-auto min-w-[600px]", children: [
      [0, 0.25, 0.5, 0.75, 1].map((t) => /* @__PURE__ */ jsx(
        "line",
        {
          x1: padding,
          y1: yScale(maxViews * t),
          x2: width - padding,
          y2: yScale(maxViews * t),
          stroke: "#eee",
          strokeWidth: "1",
          strokeDasharray: "4"
        },
        t
      )),
      /* @__PURE__ */ jsx("path", { d: viewPath, fill: "none", stroke: "#002147", strokeWidth: "2" }),
      data.map((d, i) => /* @__PURE__ */ jsx("circle", { cx: xScale(i), cy: yScale(d.views), r: "3", fill: "#002147" }, `v-${i}`)),
      /* @__PURE__ */ jsx("path", { d: readPath, fill: "none", stroke: "#E63946", strokeWidth: "2" }),
      data.map((d, i) => /* @__PURE__ */ jsx("circle", { cx: xScale(i), cy: yScale(d.reads), r: "3", fill: "#E63946" }, `r-${i}`)),
      data.map((d, i) => /* @__PURE__ */ jsx(
        "text",
        {
          x: xScale(i),
          y: height - 5,
          fontSize: "10",
          textAnchor: "middle",
          fill: "#999",
          children: new Date(d.date).getDate()
        },
        i
      ))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center mt-4 text-xs font-bold uppercase tracking-wider", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-tuio-navy", children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-tuio-navy rounded-full" }),
        " Views"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-tuio-red", children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-tuio-red rounded-full" }),
        " Reads"
      ] })
    ] })
  ] });
}

const $$Astro = createAstro("https://dentalreach.today");
const $$Analytics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Analytics;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: articles } = await supabase.from("articles").select("id, title").eq("author_id", user.id);
  const articleIds = articles?.map((a) => a.id) || [];
  let totalViews = 0;
  let totalReads = 0;
  let chartData = [];
  if (articleIds.length > 0) {
    const { data: analytics } = await supabase.from("article_analytics").select("type, created_at").in("article_id", articleIds);
    if (analytics) {
      totalViews = analytics.filter((a) => a.type === "view").length;
      totalReads = analytics.filter((a) => a.type === "read").length;
      const days = 30;
      const dailyStats = /* @__PURE__ */ new Map();
      for (let i = 0; i < days; i++) {
        const date = /* @__PURE__ */ new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        dailyStats.set(dateStr, { views: 0, reads: 0 });
      }
      analytics.forEach((a) => {
        const dateStr = new Date(a.created_at).toISOString().split("T")[0];
        if (dailyStats.has(dateStr)) {
          const stat = dailyStats.get(dateStr);
          if (a.type === "view") stat.views++;
          if (a.type === "read") stat.reads++;
        }
      });
      chartData = Array.from(dailyStats.entries()).map(([date, stats]) => ({ date, ...stats })).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Analytics & Insights" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-heading uppercase text-primary-900 mb-2">
Your Performance
</h1> <p class="text-gray-600">
Track how your articles are performing over the last 30 days.
</p> </div>  <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Total Views</span> <span class="text-4xl font-tuio text-tuio-navy">${totalViews}</span> </div> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Total Reads</span> <span class="text-4xl font-tuio text-tuio-red">${totalReads}</span> </div> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Read Ratio</span> <span class="text-4xl font-tuio text-green-600"> ${totalViews > 0 ? Math.round(totalReads / totalViews * 100) : 0}%
</span> </div> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Total Articles</span> <span class="text-4xl font-tuio text-blue-500">${articles?.length || 0}</span> </div> </div>  <div class="bg-white p-8 rounded-[32px] shadow-sm mb-12 border border-gray-100"> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-6">
Audience Growth
</h3> ${renderComponent($$result2, "AnalyticsChart", AnalyticsChart, { "client:visible": true, "data": chartData, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/dashboard/AnalyticsChart.tsx", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/analytics.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/analytics.astro";
const $$url = "/dashboard/analytics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Analytics,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
