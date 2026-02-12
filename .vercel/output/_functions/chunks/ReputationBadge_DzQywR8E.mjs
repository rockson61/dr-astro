import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';

function ReputationBadge({ points, badges }) {
  let rank = "Member";
  let color = "bg-gray-100 text-gray-600";
  let icon = "🌱";
  if (points >= 1e3) {
    rank = "Legend";
    color = "bg-purple-100 text-purple-700 border border-purple-200";
    icon = "👑";
  } else if (points >= 500) {
    rank = "Expert";
    color = "bg-yellow-100 text-yellow-700 border border-yellow-200";
    icon = "🏆";
  } else if (points >= 100) {
    rank = "Rising Star";
    color = "bg-blue-100 text-blue-700 border border-blue-200";
    icon = "⭐";
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${color}`, children: [
      /* @__PURE__ */ jsx("span", { children: icon }),
      /* @__PURE__ */ jsx("span", { children: rank }),
      /* @__PURE__ */ jsx("span", { className: "opacity-50", children: "|" }),
      /* @__PURE__ */ jsxs("span", { children: [
        points,
        " pts"
      ] })
    ] }),
    badges && badges.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: badges.map((b, i) => /* @__PURE__ */ jsx("span", { title: b.name, className: "text-lg cursor-help", children: b.icon }, i)) })
  ] });
}

export { ReputationBadge as R };
