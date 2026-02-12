import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_C_IiUpen.mjs';
import { s as supabase } from '../../chunks/supabase_CFYPoMlB.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { F as FollowButton } from '../../chunks/FollowButton_CwqJhlTW.mjs';
import { R as ReputationBadge } from '../../chunks/ReputationBadge_DzQywR8E.mjs';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const ProfileReviewForm = ({ profileId, raterId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    if (!rating) {
      setError("Please select a rating.");
      setLoading(false);
      return;
    }
    const { error: error2 } = await supabase.from("profile_ratings").insert({
      profile_id: profileId,
      rater_id: raterId,
      rating,
      comment
    });
    if (error2) {
      setError("Could not submit review.");
    } else {
      setSuccess(true);
      setComment("");
      setRating(0);
      if (onSubmit) onSubmit();
    }
    setLoading(false);
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-[24px] shadow-sm p-6 mb-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2 text-tuio-navy uppercase font-tuio", children: "Leave a Review" }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center mb-4", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setRating(star),
        onMouseEnter: () => setHover(star),
        onMouseLeave: () => setHover(0),
        className: "focus:outline-none",
        "aria-label": `Rate ${star} star${star > 1 ? "s" : ""}`,
        children: /* @__PURE__ */ jsx(
          Star,
          {
            className: `h-7 w-7 ${star <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} transition-colors`
          }
        )
      },
      star
    )) }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        className: "w-full border border-gray-200 rounded-[16px] p-3 mb-3 text-sm focus:ring-2 focus:ring-tuio-red focus:outline-none",
        rows: 3,
        placeholder: "Write a comment (optional)",
        value: comment,
        onChange: (e) => setComment(e.target.value),
        maxLength: 500
      }
    ),
    error && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mb-2", children: error }),
    success && /* @__PURE__ */ jsx("div", { className: "text-green-600 text-sm mb-2", children: "Thank you for your review!" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "bg-tuio-red text-white px-6 py-2 rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-colors disabled:opacity-50",
        disabled: loading,
        children: loading ? "Submitting..." : "Submit Review"
      }
    )
  ] });
};

const ProfileReviewsList = ({ profileId, onRatingDataUpdate, minimal = false, limit, initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(initialReviews.length === 0);
  const [filter, setFilter] = useState("recent");
  useEffect(() => {
    if (initialReviews.length === 0) {
      const fetchReviews = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("profile_ratings").select("*, rater:rater_id(first_name, last_name, avatar_url)").eq("profile_id", profileId).order("created_at", { ascending: false });
        if (!error && data) {
          setReviews(data);
          const avgRating = data.reduce((acc, r) => acc + (r.rating || 0), 0) / data.length;
          if (onRatingDataUpdate) {
            onRatingDataUpdate(avgRating || 0, data.length);
          }
        }
        setLoading(false);
      };
      fetchReviews();
    }
  }, [profileId, onRatingDataUpdate, initialReviews.length]);
  const ratingBreakdown = useMemo(() => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const rating = Math.round(review.rating);
      if (rating >= 1 && rating <= 5) {
        breakdown[rating]++;
      }
    });
    return breakdown;
  }, [reviews]);
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length;
  }, [reviews]);
  const filteredReviews = useMemo(() => {
    const sorted = [...reviews];
    if (filter === "highest") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filter === "lowest") {
      sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }
    if (limit) {
      return sorted.slice(0, limit);
    }
    return sorted;
  }, [reviews, filter, limit]);
  const renderStars = (rating, size = "sm") => {
    const stars = [];
    const sizeClass = size === "lg" ? "w-7 h-7" : "w-4 h-4";
    for (let i = 1; i <= 5; i++) {
      stars.push(
        /* @__PURE__ */ jsx(
          Star,
          {
            className: `${sizeClass} ${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`
          },
          i
        )
      );
    }
    return stars;
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-[24px] shadow-sm p-6 mb-6", children: /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-gray-500", children: "Loading reviews..." }) });
  }
  if (!reviews.length) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[24px] shadow-sm p-6 mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-tuio uppercase text-tuio-navy mb-4", children: "Reviews" }),
      /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-tuio-bg rounded-xl", children: [
        /* @__PURE__ */ jsx(Star, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2 text-lg font-medium", children: "No reviews yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Be the first to leave a review!" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `${minimal ? "" : "bg-white rounded-[24px] shadow-sm p-6 mb-6"}`, children: [
    !minimal && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-tuio uppercase text-tuio-navy mb-6", children: [
        "Reviews (",
        reviews.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-100", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-tuio-navy mb-1", children: averageRating.toFixed(1) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-1 mb-2", children: renderStars(Math.round(averageRating), "lg") }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm", children: [
            "Based on ",
            reviews.length,
            " ",
            reviews.length === 1 ? "review" : "reviews"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: [5, 4, 3, 2, 1].map((star) => {
          const count = ratingBreakdown[star];
          const percentage = reviews.length > 0 ? count / reviews.length * 100 : 0;
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-gray-700 w-12", children: [
              star,
              " stars"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 h-3 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-full bg-yellow-400 transition-all duration-300",
                style: { width: `${percentage}%` }
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600 w-12 text-right", children: count })
          ] }, star);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter("recent"),
            className: `px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors ${filter === "recent" ? "bg-tuio-navy text-white" : "bg-tuio-bg text-tuio-navy hover:bg-gray-200"}`,
            children: "Most Recent"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter("highest"),
            className: `px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors ${filter === "highest" ? "bg-tuio-navy text-white" : "bg-tuio-bg text-tuio-navy hover:bg-gray-200"}`,
            children: "Highest Rated"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter("lowest"),
            className: `px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors ${filter === "lowest" ? "bg-tuio-navy text-white" : "bg-tuio-bg text-tuio-navy hover:bg-gray-200"}`,
            children: "Lowest Rated"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: filteredReviews.map((review) => /* @__PURE__ */ jsx("div", { className: "border-b border-gray-100 last:border-0 pb-6 last:pb-0", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: review.rater?.avatar_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: review.rater.avatar_url,
          alt: `${review.rater.first_name} ${review.rater.last_name}`,
          className: "w-12 h-12 rounded-full object-cover"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-tuio-red flex items-center justify-center text-lg font-bold text-white", children: `${review.rater?.first_name || ""} ${review.rater?.last_name || ""}`.charAt(0) || "?" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-tuio-navy", children: review.rater?.first_name ? `${review.rater.first_name} ${review.rater.last_name}` : "Anonymous User" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: new Date(review.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 mb-3", children: renderStars(review.rating) }),
        review.comment && /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-3", children: review.comment }),
        /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 text-gray-500 hover:text-tuio-red transition-colors", children: [
          /* @__PURE__ */ jsx(ThumbsUp, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Helpful" })
        ] })
      ] })
    ] }) }, review.id)) })
  ] });
};

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const adminSupabase = createClient(
    "http://api.db.dentaloffice.io",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlzcyI6InN1cGFiYXNlIn0.QD1T3hz_0RBrnt-juLttpON4cdDyl1trbrV0zf7B6Ro"
  );
  let profile = null;
  let reviews = [];
  try {
    const { data, error } = await adminSupabase.from("profiles").select("*").eq("slug", slug).single();
    if (error) console.error("Query Error:", error);
    if (data) {
      profile = data;
    }
    if (profile) {
      const { data: reviewData } = await adminSupabase.from("profile_ratings").select("*, rater:rater_id(first_name, last_name, avatar_url)").eq("profile_id", profile.id).order("created_at", { ascending: false });
      if (reviewData) reviews = reviewData;
    }
  } catch (e) {
    console.error("DB error", e);
  }
  if (user && profile) {
    const { data: followData } = await adminSupabase.from("follows").select("id").match({ follower_id: user.id, following_id: profile.id }).single();
  }
  if (!profile) {
    return Astro2.redirect("/404");
  }
  const specializations = profile.specializations ? Array.isArray(profile.specializations) ? profile.specializations : [profile.specializations] : profile.specialty ? [profile.specialty] : [];
  const stats = [
    { label: "Reputation", value: profile.reputation_score || 0, icon: "⭐" },
    { label: "Articles", value: profile.articles_count || 0, icon: "📝" },
    { label: "Followers", value: profile.followers_count || 0, icon: "👥" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${profile.full_name} | DentalReach Profile` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-primary-900 text-white py-16 relative overflow-hidden"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <div class="flex flex-col md:flex-row items-center gap-8"> <!-- Avatar --> <div class="relative"> <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl"> <img${addAttribute(profile.avatar_url || "/images/default-avatar.png", "src")}${addAttribute(profile.full_name, "alt")} class="w-full h-full object-cover"> </div> ${profile.verified && renderTemplate`<span class="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-lg border-4 border-white">
✓
</span>`} </div> <!-- Info --> <div class="text-center md:text-left flex-grow"> <h1 class="text-4xl md:text-5xl font-heading uppercase mb-2"> ${profile.full_name} </h1> <p class="text-cyan-400 font-bold text-lg mb-2"> ${profile.title} </p> <div class="mb-3"> ${renderComponent($$result2, "ReputationBadge", ReputationBadge, { "client:visible": true, "points": profile.reputation_points || 0, "badges": profile.badges || [], "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/gamification/ReputationBadge", "client:component-export": "default" })} </div> <p class="text-gray-400">
📍 ${profile.location || "Location not specified"} </p> </div> <!-- Action --> <div class="shrink-0"> ${renderComponent($$result2, "FollowButton", FollowButton, { "client:load": true, "targetUserId": profile.id, "targetUserName": profile.full_name, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/social/FollowButton", "client:component-export": "default" })} </div> </div> </div> </section>  <div class="bg-primary-600 py-6 -mt-1 shadow-md relative z-20"> <div class="container mx-auto px-4"> <div class="flex justify-center gap-12"> ${stats.map((stat) => renderTemplate`<div class="text-center text-white"> <div class="text-3xl font-heading"> ${stat.value.toLocaleString()} </div> <div class="text-white/80 text-sm uppercase tracking-widest"> ${stat.label} </div> </div>`)} </div> </div> </div> <div class="bg-gray-50 min-h-screen py-12"> <div class="container mx-auto px-4"> <div class="grid lg:grid-cols-3 gap-8"> <!-- Sidebar --> <div class="lg:col-span-1 space-y-6"> <!-- About --> <div class="glass-card bg-white p-6"> <h3 class="font-heading text-lg uppercase text-primary-900 mb-4">
About
</h3> <p class="text-gray-600 font-light"> ${profile.bio || "No bio available."} </p> </div> <!-- Specializations --> ${specializations.length > 0 && renderTemplate`<div class="glass-card bg-white p-6"> <h3 class="font-heading text-lg uppercase text-primary-900 mb-4">
Specializations
</h3> <div class="flex flex-wrap gap-2"> ${specializations.map((spec) => renderTemplate`<span class="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-primary-900"> ${spec} </span>`)} </div> </div>`} </div> <!-- Main Content --> <div class="lg:col-span-2"> <div class="glass-card bg-white p-6 mb-8"> ${user && user.id !== profile.id && renderTemplate`${renderComponent($$result2, "ProfileReviewForm", ProfileReviewForm, { "client:visible": true, "profileId": profile.id, "raterId": user.id, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/profile/ProfileReviewForm", "client:component-export": "default" })}`} ${renderComponent($$result2, "ProfileReviewsList", ProfileReviewsList, { "client:visible": true, "profileId": profile.id, "initialReviews": reviews, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/profile/ProfileReviewsList", "client:component-export": "default" })} </div> </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/profile/[slug].astro", void 0);
const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/profile/[slug].astro";
const $$url = "/profile/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
