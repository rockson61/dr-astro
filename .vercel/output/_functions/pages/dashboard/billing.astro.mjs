import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    features: ["Access to free articles", "Community access", "Weekly newsletter"],
    cta: "Current Plan",
    current: true
    // simplified logic for now
  },
  {
    id: "pro",
    // This should be replaced with your actual Stripe Price ID
    stripePriceId: "price_1Q...",
    // Placeholder
    name: "Pro Member",
    price: "$19/mo",
    features: ["Unlimited premium articles", "Exclusive clinical cases", "CE Credits included", "Priority support"],
    cta: "Upgrade to Pro",
    popular: true
  }
];
function PricingTable({ user, subscription }) {
  const [loading, setLoading] = useState(null);
  const handleSubscribe = async (priceId) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setLoading(priceId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error initiating checkout: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(null);
    }
  };
  const isPro = subscription?.status === "active";
  return /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-tuio text-2xl uppercase text-tuio-navy mb-2", children: "Free" }),
      /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold text-tuio-navy mb-6", children: [
        "$0",
        /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-400 font-normal", children: "/mo" })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-8 flex-grow", children: plans[0].features.map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx("span", { className: "text-green-500", children: "✓" }),
        " ",
        f
      ] })) }),
      /* @__PURE__ */ jsx("button", { className: "w-full py-3 rounded-full font-bold uppercase tracking-wide border-2 border-gray-200 text-gray-400 cursor-not-allowed", children: isPro ? "Downgrade" : "Current Plan" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-tuio-navy rounded-[32px] p-8 shadow-xl border border-tuio-navy flex flex-col relative overflow-hidden text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bg-tuio-red text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider", children: "Popular" }),
      /* @__PURE__ */ jsx("h3", { className: "font-tuio text-2xl uppercase mb-2", children: "Pro Member" }),
      /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold mb-6", children: [
        "$19",
        /* @__PURE__ */ jsx("span", { className: "text-lg text-white/60 font-normal", children: "/mo" })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-8 flex-grow", children: plans[1].features.map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-white/90", children: [
        /* @__PURE__ */ jsx("span", { className: "text-tuio-red bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold", children: "✓" }),
        " ",
        f
      ] })) }),
      isPro ? /* @__PURE__ */ jsx("div", { className: "w-full py-3 bg-green-500 text-white rounded-full font-bold uppercase tracking-wide text-center", children: "Active" }) : /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleSubscribe(plans[1].stripePriceId),
          disabled: !!loading,
          className: "w-full py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all",
          children: loading ? "Processing..." : "Upgrade Now"
        }
      )
    ] })
  ] });
}

const $$Astro = createAstro("https://dentalreach.today");
const $$Billing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Billing;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  let subscription = null;
  const { data: subData } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single();
  if (subData) {
    subscription = subData;
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Billing & Subscription" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto"> <div class="mb-12 text-center"> <h2 class="text-3xl font-heading uppercase text-primary-900 mb-4">
Manage Subscription
</h2> <p class="text-gray-600">
Upgrade to access premium content and features.
</p> </div> ${subscription && subscription.status === "active" && renderTemplate`<div class="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 flex items-center justify-between"> <div> <h3 class="text-green-800 font-bold text-lg mb-1">
Pro Membership Active
</h3> <p class="text-green-600 text-sm">
Renews on${" "} ${new Date(
    subscription.current_period_end
  ).toLocaleDateString()} </p> </div> <button class="text-green-700 font-bold underline text-sm hover:text-green-900">
Manage on Stripe
</button> </div>`} ${renderComponent($$result2, "PricingTable", PricingTable, { "client:load": true, "user": user, "subscription": subscription, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/monetization/PricingTable.tsx", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/billing.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/billing.astro";
const $$url = "/dashboard/billing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Billing,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
