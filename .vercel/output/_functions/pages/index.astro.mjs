import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderScript } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C_IiUpen.mjs';
import { s as supabase } from '../chunks/supabase_CFYPoMlB.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { Trophy, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { $ as $$Image } from '../chunks/_astro_assets_Cpst5Nv_.mjs';
export { renderers } from '../renderers.mjs';

const Leaderboard = ({ initialLeaders = [] }) => {
  const [leaders, setLeaders] = useState(initialLeaders);
  const [loading, setLoading] = useState(initialLeaders.length === 0);
  useEffect(() => {
    if (initialLeaders.length === 0) {
      fetchLeaderboard();
    }
  }, []);
  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase.from("profile_composite_reputation").select(`
          profile_id,
          reputation,
          profiles:profile_id (
            first_name,
            last_name,
            avatar_url,
            specialty,
            is_verified,
            slug
          )
        `).order("reputation", { ascending: false }).limit(10);
      if (error) {
        console.log("View does not exist, calculating reputation manually...");
        const { data: profiles, error: profilesError } = await supabase.from("profiles").select(`
            id,
            first_name,
            last_name,
            avatar_url,
            specialty,
            is_verified,
            slug
          `).not("full_name", "is", null).limit(50);
        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          return;
        }
        const profilesWithReputation = await Promise.all(
          (profiles || []).map(async (profile) => {
            const { count: articlesCount } = await supabase.from("articles").select("*", { count: "exact", head: true }).eq("user_id", profile.id).eq("is_approved", true);
            const { data: articles } = await supabase.from("articles").select("id").eq("user_id", profile.id).eq("is_approved", true);
            let articleLikes = 0;
            if (articles && articles.length > 0) {
              const articleIds = articles.map((a) => a.id);
              const { count: likesCount } = await supabase.from("article_likes").select("*", { count: "exact", head: true }).in("article_id", articleIds);
              articleLikes = likesCount || 0;
            }
            const { data: ratings } = await supabase.from("profile_ratings").select("rating").eq("profile_id", profile.id);
            const avgRating = ratings && ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
            const reputation = Math.round(
              avgRating * 50 + articleLikes * 2 + (articlesCount || 0) * 1
            );
            return {
              profile_id: profile.id,
              reputation,
              first_name: profile.first_name || "",
              last_name: profile.last_name || "",
              full_name: profile.first_name && profile.last_name ? `${profile.first_name} ${profile.last_name}` : profile.first_name || "Anonymous User",
              avatar_url: profile.avatar_url,
              specialty: profile.specialty,
              is_verified: profile.is_verified,
              slug: profile.slug
            };
          })
        );
        const topTen = profilesWithReputation.sort((a, b) => b.reputation - a.reputation).slice(0, 10);
        if (topTen.length === 0) {
          setLeaders([]);
          return;
        }
        setLeaders(topTen);
        return;
      }
      if (error) {
        console.error("Error fetching leaderboard:", error);
        return;
      }
      const transformedData = (data || []).map((item) => {
        const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
        console.log("Leaderboard Item:", item);
        return {
          profile_id: item.profile_id,
          first_name: profile?.first_name || "",
          last_name: profile?.last_name || "",
          full_name: profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : profile?.first_name || "Anonymous User",
          avatar_url: profile?.avatar_url,
          specialty: profile?.specialty,
          is_verified: profile?.is_verified,
          slug: profile?.slug
        };
      });
      setLeaders(transformedData);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "py-16 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-white/50", children: "Loading leaderboard..." })
    ] });
  }
  if (leaders.length === 0 && !loading) {
    return /* @__PURE__ */ jsxs("section", { className: "py-16 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-heading uppercase text-white mb-4", children: [
        /* @__PURE__ */ jsx(Trophy, { className: "inline-block h-8 w-8 text-primary-500 mr-2" }),
        "Top 10 Reputation Leaders"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 mb-4", children: "No leaderboard data available yet. Start contributing to earn reputation!" })
    ] });
  }
  return /* @__PURE__ */ jsxs("section", { className: "py-20 px-4 bg-primary-900 rounded-3xl overflow-hidden relative my-12 mx-4 md:mx-0 shadow-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "text-center mb-12 relative z-10",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary-300 font-bold uppercase tracking-widest mb-2 block text-sm", children: "Community" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-heading uppercase text-white mb-4", children: [
            "Reputation ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-white", children: "Leaders" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 max-w-5xl mx-auto relative z-10", children: leaders.map((leader, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: index * 0.05 },
        children: /* @__PURE__ */ jsx(
          "a",
          {
            href: `/profile/${leader.slug || leader.profile_id}`,
            className: `
                  block rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 bg-white/5 backdrop-blur-md group
                `,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full shadow-lg ${index < 3 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white" : "bg-white/10 text-white/70"}`, children: /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold", children: [
                "#",
                index + 1
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 relative", children: [
                leader.avatar_url ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: leader.avatar_url,
                    alt: `${leader.first_name} ${leader.last_name}`,
                    className: "w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md group-hover:border-primary-400 transition-colors"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-primary-800 flex items-center justify-center border-2 border-white/20 group-hover:border-primary-400 transition-colors", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: leader.first_name?.charAt(0).toUpperCase() || "U" }) }),
                index < 3 && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-1 border-2 border-primary-900", children: /* @__PURE__ */ jsx(Trophy, { size: 12, fill: "currentColor" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white truncate group-hover:text-primary-300 transition-colors", children: [
                    leader.first_name,
                    " ",
                    leader.last_name
                  ] }),
                  leader.is_verified && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center", title: "Verified", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) })
                ] }),
                leader.specialty && /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-100/60 truncate", children: leader.specialty })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 flex items-center gap-2 bg-primary-800/50 rounded-full px-4 py-2 border border-white/10 group-hover:bg-primary-800 transition-colors", children: [
                /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-yellow-500 fill-yellow-500" }),
                /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white group-hover:text-yellow-400 transition-colors", children: leader.reputation.toLocaleString() }) })
              ] })
            ] })
          }
        )
      },
      leader.profile_id
    )) })
  ] });
};

const Carousel = ({ title, viewAllLink, items, variant = "default" }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      setTimeout(checkScroll, 300);
    }
  };
  const renderCard = (item) => {
    switch (variant) {
      case "event":
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/events/${item.slug}`,
            className: "block w-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full border border-gray-100",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "h-40 overflow-hidden relative", children: [
                item.image && /* @__PURE__ */ jsx("img", { src: item.image, alt: item.title, className: "w-full h-full object-cover" }),
                /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider", children: item.date ? item.date.split(",")[0] : "TBA" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-primary-900 mb-2 line-clamp-1", children: item.title }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-500 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { children: "📍" }),
                  " ",
                  item.location
                ] })
              ] })
            ]
          }
        );
      case "job":
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/jobs/${item.slug}`,
            className: "block w-80 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-2xl", children: "🏥" }),
                /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider", children: item.type })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl text-primary-900 mb-1", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-4", children: item.clinic }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-4 border-t border-gray-100", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest", children: [
                  /* @__PURE__ */ jsx("span", { children: "📍" }),
                  " ",
                  item.location
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-accent font-bold text-sm", children: [
                  /* @__PURE__ */ jsx("span", { children: "💰" }),
                  " ",
                  item.salary
                ] })
              ] })
            ]
          }
        );
      case "forum":
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/community/topic/${item.slug}`,
            className: "block w-80 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-l-primary-500 border border-gray-100",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${item.color || "bg-gray-100 text-gray-600"}`, children: "Hot Topic" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl text-primary-900 mb-2 line-clamp-2 leading-tight", children: item.topic || item.title }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm mb-6", children: [
                "Posted by ",
                item.author
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-gray-500 text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  "💬 ",
                  item.replies,
                  " Replies"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  "👁️ ",
                  item.views
                ] })
              ] })
            ]
          }
        );
      case "product":
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/products/${item.slug}`,
            className: "block w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "h-48 overflow-hidden relative p-4 bg-gray-50 flex items-center justify-center", children: [
                item.image ? /* @__PURE__ */ jsx("img", { src: item.image, alt: item.title, className: "max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" }) : /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "🦷" }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity", children: "🛒" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-1", children: item.category }),
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-primary-900 mb-2 line-clamp-2", children: item.title }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-accent font-bold text-xl", children: item.price }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-yellow-500 flex items-center gap-1", children: [
                    "★ ",
                    item.rating
                  ] })
                ] })
              ] })
            ]
          }
        );
      case "podcast":
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/podcasts/${item.slug}`,
            className: "block w-72 bg-primary-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/10 group relative",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 relative z-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-6", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl overflow-hidden bg-gray-800 border border-gray-700", children: /* @__PURE__ */ jsx("img", { src: item.image || "https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=200", alt: "Cover", className: "w-full h-full object-cover" }) }),
                  /* @__PURE__ */ jsx("span", { className: "w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center pl-1 group-hover:scale-110 transition-transform", children: "▶" })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-primary-200 text-xs font-bold uppercase tracking-widest mb-2 block", children: [
                  "Episode ",
                  item.episode
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl text-white mb-2 line-clamp-2 leading-tight", children: item.title }),
                /* @__PURE__ */ jsxs("p", { className: "text-white/50 text-xs mb-4", children: [
                  "with ",
                  item.guest
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-white/40 text-xs font-mono border-t border-white/10 pt-4", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "⏱ ",
                    item.duration
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsx("span", { children: item.date })
                ] })
              ] })
            ]
          }
        );
      case "guide":
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/guides/${item.slug}`,
            className: "block w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "h-32 bg-primary-50 relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary-600/5" }),
                item.image && /* @__PURE__ */ jsx("img", { src: item.image, className: "absolute right-0 bottom-0 w-32 h-32 object-contain opacity-80 group-hover:scale-110 transition-transform duration-500 delay-75", alt: "" }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsx("span", { className: "bg-white/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-primary-900 border border-white/50", children: "PDF Guide" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-primary-900 mb-2 leading-tight", children: item.title }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm line-clamp-2 mb-4", children: item.description }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center text-primary-600 text-sm font-bold group-hover:gap-2 gap-1 transition-all", children: [
                  "Download ",
                  /* @__PURE__ */ jsx("span", { className: "text-lg", children: "↓" })
                ] })
              ] })
            ]
          }
        );
      case "award":
        return /* @__PURE__ */ jsxs("div", { className: "block w-72 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-1 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-yellow-400/20 transition-colors" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 h-full flex flex-col items-center text-center relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 text-yellow-500 border border-yellow-100 shadow-inner", children: item.icon || "🏆" }),
            /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl text-primary-900 mb-2 uppercase leading-tight", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-4 line-clamp-2", children: item.description }),
            /* @__PURE__ */ jsx("a", { href: "/awards", className: "mt-auto px-6 py-2 bg-primary-900 text-white text-sm rounded-full font-bold hover:bg-primary-600 transition-colors", children: "Nominate" })
          ] })
        ] });
      default:
        return /* @__PURE__ */ jsxs("a", { href: item.link || "#", className: "block w-64 bg-white p-6 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: item.description })
        ] });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "py-8 relative group", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-6 px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-accent font-bold uppercase tracking-widest mb-2 block text-sm", children: "Discover" }),
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl md:text-4xl text-primary-900 uppercase", children: title })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        viewAllLink && /* @__PURE__ */ jsx("a", { href: viewAllLink, className: "text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors mr-4 flex items-center h-10", children: "View All" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scroll("left"),
            disabled: !canScrollLeft,
            className: `w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${canScrollLeft ? "bg-white hover:bg-primary-600 hover:text-white hover:border-primary-600 text-primary-900 cursor-pointer" : "bg-gray-50 text-gray-300 cursor-not-allowed"}`,
            "aria-label": "Scroll left",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scroll("right"),
            disabled: !canScrollRight,
            className: `w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${canScrollRight ? "bg-white hover:bg-primary-600 hover:text-white hover:border-primary-600 text-primary-900 cursor-pointer" : "bg-gray-50 text-gray-300 cursor-not-allowed"}`,
            "aria-label": "Scroll right",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollContainerRef,
        className: "flex overflow-x-auto gap-6 px-4 md:px-8 pb-8 snap-x snap-mandatory scrollbar-hide",
        onScroll: checkScroll,
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        children: items.map((item, index) => /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "snap-start flex-shrink-0",
            children: renderCard(item)
          },
          index
        ))
      }
    )
  ] });
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let articles = [];
  let categories = [];
  let leaderboardData = [];
  try {
    const { data: catData } = await supabase.from("categories").select("name, slug").limit(20);
    if (catData) categories = catData;
    const { data: artData } = await supabase.from("articles").select("*, author:profiles(full_name, avatar_url)").eq("status", "published").order("published_at", { ascending: false }).limit(6);
    if (artData) articles = artData;
    const adminSupabase = createClient(
      "http://api.db.dentaloffice.io",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlzcyI6InN1cGFiYXNlIn0.QD1T3hz_0RBrnt-juLttpON4cdDyl1trbrV0zf7B6Ro"
    );
    const { data: viewData, error: viewError } = await adminSupabase.from("profile_composite_reputation").select(
      `
          profile_id,
          reputation,
          profiles:profile_id (
            first_name, last_name, avatar_url, specialty, is_verified, slug
          )
        `
    ).order("reputation", { ascending: false }).limit(5);
    if (!viewError && viewData) {
      leaderboardData = viewData.map((item) => {
        const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
        return {
          profile_id: item.profile_id,
          reputation: item.reputation,
          first_name: profile?.first_name || "",
          last_name: profile?.last_name || "",
          full_name: profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : profile?.first_name || "Anonymous User",
          avatar_url: profile?.avatar_url,
          specialty: profile?.specialty,
          is_verified: profile?.is_verified,
          slug: profile?.slug
        };
      });
    } else {
      console.log("View failed, falling back to manual fetch");
      const { data: profiles, error: manualError } = await adminSupabase.from("profiles").select("*, slug").limit(50);
      if (manualError) {
        console.error(
          "Manual fetch failed:",
          JSON.stringify(manualError, null, 2)
        );
      }
      if (profiles) {
        leaderboardData = profiles.map((p) => ({
          profile_id: p.id,
          reputation: p.reputation_score || 0,
          first_name: p.first_name || "Dr.",
          last_name: p.last_name || p.full_name?.split(" ").pop() || "User",
          full_name: p.full_name,
          avatar_url: p.avatar_url,
          specialty: p.specialty,
          is_verified: p.is_verified,
          slug: p.slug
        })).sort((a, b) => b.reputation - a.reputation).slice(0, 5);
      }
    }
  } catch (e) {
    console.error("Supabase connection failed", e);
  }
  if (categories.length === 0) {
    categories = [
      { name: "Digital Dentistry", slug: "digital" },
      { name: "Implantology", slug: "implants" },
      { name: "Practice Management", slug: "business" },
      { name: "Orthodontics", slug: "ortho" },
      { name: "Esthetics", slug: "esthetics" },
      { name: "Technology", slug: "tech" }
    ];
  }
  if (articles.length === 0) {
    articles = [
      {
        title: "The Future of Digital Impressioning",
        slug: "future-digital-impressioning",
        excerpt: "How intraoral scanners are revolutionizing the modern dental practice workflow.",
        image_url: "https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=800",
        author: { full_name: "Dr. Sarah Johnson" },
        category: "Technology"
      },
      {
        title: "Sustainable Dentistry: A Practical Guide",
        slug: "sustainable-dentistry",
        excerpt: "Reducing waste and energy consumption in your clinic without compromising care.",
        image_url: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
        author: { full_name: "Dr. Mark Smith" },
        category: "Practice Management"
      },
      {
        title: "Clear Aligners vs. Traditional Braces",
        slug: "aligners-vs-braces",
        excerpt: "A comprehensive comparison of treatment outcomes and patient satisfaction.",
        image_url: "https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg?auto=compress&cs=tinysrgb&w=800",
        author: { full_name: "Dr. Emily Chen" },
        category: "Orthodontics"
      }
    ];
  }
  const features = [
    {
      icon: "📰",
      title: "News & Articles",
      desc: "Stay updated with the latest in dental science and practice."
    },
    {
      icon: "🎓",
      title: "CME Courses",
      desc: "Earn credits with accredited online learning modules."
    },
    {
      icon: "🏢",
      title: "Directory",
      desc: "Find clinics, labs, and suppliers near you."
    },
    {
      icon: "💼",
      title: "Job Board",
      desc: "Connect with top dental employers worldwide."
    },
    {
      icon: "🛒",
      title: "Marketplace",
      desc: "Shop equipment and supplies from verified sellers."
    },
    {
      icon: "🏆",
      title: "Awards",
      desc: "Recognize excellence with our annual awards program."
    }
  ];
  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Prosthodontist, Mumbai",
      quote: "DentalReach has transformed how I stay current with industry trends. The articles are top-notch!",
      avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Dr. James Liu",
      role: "Orthodontist, Singapore",
      quote: "The community here is incredible. I've connected with peers I never would have met otherwise.",
      avatar: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Dr. Sarah Mitchell",
      role: "General Dentist, London",
      quote: "From job listings to CME credits, DentalReach is my one-stop platform for professional growth.",
      avatar: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];
  let eventsData = [];
  let jobsData = [];
  let productsData = [];
  let podcastsData = [];
  let guidesData = [];
  let awardsData = [];
  try {
    const { data: eData } = await supabase.from("events").select("*").limit(6);
    if (eData) eventsData = eData;
    const { data: jData } = await supabase.from("jobs").select("*").limit(6);
    if (jData)
      jobsData = jData.map((j) => ({
        ...j,
        clinic: j.company?.business_name || j.company_name
      }));
    const { data: pData } = await supabase.from("products").select("*").limit(6);
    if (pData)
      productsData = pData.map((p) => ({
        ...p,
        image: p.images?.[0] || p.image || null
      }));
    const { data: podData } = await supabase.from("podcasts").select("*").limit(6);
    if (podData)
      podcastsData = podData.map((p) => ({
        ...p,
        date: p.created_at ? new Date(p.created_at).toLocaleDateString() : "Recent"
      }));
    const { data: aData } = await supabase.from("awards").select("*").limit(6);
    if (aData) awardsData = aData;
    try {
      const { data: gData } = await supabase.from("guides").select("*").limit(3);
      if (gData) guidesData = gData;
    } catch (err) {
      console.warn("Guides table missing or error", err);
    }
  } catch (err) {
    console.error("Error fetching homepage collections", err);
  }
  const events = eventsData.length > 0 ? eventsData.map((e) => ({
    title: e.title,
    date: e.start_date ? new Date(e.start_date).toLocaleDateString() : "TBA",
    location: e.location || "Online",
    image: e.image_url,
    slug: e.slug
  })) : [
    {
      title: "Dental Expo 2026",
      date: "Oct 15, 2026",
      location: "New York, NY",
      image: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "dental-expo-2026"
    }
  ];
  const jobs = jobsData.length > 0 ? jobsData.map((j) => ({
    title: j.title,
    clinic: j.company_name || "Dental Clinic",
    location: j.location,
    type: j.type?.replace("_", " ") || "Full Time",
    salary: j.salary_range || "Competitive",
    slug: j.slug
  })) : [
    {
      title: "Associate Dentist",
      clinic: "Smile Care SEO",
      location: "New York, NY",
      type: "Full-Time",
      salary: "$150k - $200k",
      slug: "associate-dentist-nyc"
    }
  ];
  const products = productsData.length > 0 ? productsData.map((p) => ({
    title: p.name,
    category: p.category || "Equip",
    price: `$${p.price}`,
    rating: "4.8",
    image: p.image,
    slug: p.slug
  })) : [
    {
      title: "Dental Chair X3000",
      category: "Equipment",
      price: "$4,500",
      rating: "4.8",
      image: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "dental-chair-x3000"
    }
  ];
  const podcasts = podcastsData.length > 0 ? podcastsData.map((p) => ({
    title: p.title,
    guest: p.guest_names?.[0] || "DentalReach",
    episode: p.episode_number || "1",
    duration: `${p.duration_minutes || 45} min`,
    date: p.date,
    slug: p.slug,
    image: p.image_url
  })) : [
    {
      title: "Ep 42: The Future of AI in Dentistry",
      guest: "Dr. A. Smith",
      episode: "42",
      duration: "45 min",
      date: "Oct 10",
      slug: "ep-42-ai-dentistry"
    }
  ];
  const guides = guidesData.length > 0 ? guidesData.map((g) => ({
    title: g.title,
    description: g.description,
    slug: g.slug,
    image: g.image_url
  })) : [
    {
      title: "Ultimate Guide to Digital Workflow",
      description: "Learn how to transition your practice.",
      slug: "digital-workflow-guide",
      image: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];
  const awards = awardsData.length > 0 ? awardsData.map((a) => ({
    title: a.title,
    description: a.description || "Excellence in Dentistry",
    icon: "🏆"
  })) : [
    {
      title: "Best Clinical Case",
      description: "Awarded for exceptional clinical skill and documentation.",
      icon: "🦷"
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "DentalReach | The Future of Dentistry" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white min-h-screen font-body"> <!-- HERO SECTION --> <section class="p-4 md:p-8"> <div class="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"> <!-- Trending Topics --> <div class="col-span-1 md:col-span-4 lg:col-span-3 row-span-2 bg-primary-600 rounded-[32px] p-8 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"> <div class="relative z-10"> <h3 class="text-white font-heading text-3xl mb-8 uppercase tracking-wide">
Trending<br>Topics
</h3> <div class="flex flex-wrap gap-3"> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/articles?category=${cat.slug}`, "href")} class="bg-white/20 hover:bg-white hover:text-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 backdrop-blur-sm border border-white/10"> ${cat.name} </a>`)} </div> </div> <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div> </div> <!-- Hero Header --> <div class="col-span-1 md:col-span-8 lg:col-span-9 bg-white rounded-[32px] p-8 md:p-12 flex flex-col justify-center items-start shadow-sm min-h-[400px]"> <span class="text-primary-600 font-bold tracking-widest uppercase mb-4 text-sm animate-pulse">#1 Digital Magazine</span> <h1 class="font-heading text-5xl md:text-7xl lg:text-9xl uppercase leading-[0.9] text-primary-900 mb-8 tracking-tight">
The Future<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent">Of Dentistry</span><br>
Is Here
</h1> <p class="text-xl text-gray-500 max-w-2xl font-light">
Curated insights, clinical breakthroughs, and global
                        trends for the modern dental professional.
</p> </div> <!-- Search Bar --> <div class="col-span-1 md:col-span-12 bg-primary-900 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-lg gap-6"> <form action="/search" class="flex items-center gap-4 w-full md:w-auto flex-grow"> <div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shrink-0">
🔍
</div> <input type="text" name="q" placeholder="Search articles, events, listings..." class="bg-transparent border-none text-2xl font-heading placeholder-gray-500 focus:ring-0 w-full text-white"> </form> <div class="flex gap-4 shrink-0"> <a href="/login" class="px-8 py-3 bg-white text-primary-900 rounded-full font-bold hover:bg-primary-600 hover:text-white transition-all shadow-md">Join Community</a> </div> </div> </div> </section> <!-- DIGITAL REACH STATS (Updated) --> <section class="py-12 bg-primary-900 relative overflow-hidden border-t border-white/10"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <div class="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10"> <div class="text-center text-white px-4"> <div class="text-4xl mb-3 text-accent">👥</div> <div class="text-3xl md:text-5xl font-heading font-bold mb-1">
50K+
</div> <div class="text-white/60 text-xs font-bold uppercase tracking-widest">
Active Professionals
</div> </div> <div class="text-center text-white px-4"> <div class="text-4xl mb-3 text-white">👀</div> <div class="text-3xl md:text-5xl font-heading font-bold mb-1">
2.5M+
</div> <div class="text-white/60 text-xs font-bold uppercase tracking-widest">
Monthly Impressions
</div> </div> <div class="text-center text-white px-4"> <div class="text-4xl mb-3 text-white">📱</div> <div class="text-3xl md:text-5xl font-heading font-bold mb-1">
150K+
</div> <div class="text-white/60 text-xs font-bold uppercase tracking-widest">
Social Followers
</div> </div> <div class="text-center text-white px-4"> <div class="text-4xl mb-3 text-white">📬</div> <div class="text-3xl md:text-5xl font-heading font-bold mb-1">
85K+
</div> <div class="text-white/60 text-xs font-bold uppercase tracking-widest">
Email Subscribers
</div> </div> </div> </div> </section> <!-- AD SPACE (Leaderboard) --> <div class="container mx-auto px-4 py-8 flex justify-center"> <div class="w-full max-w-[728px] h-[90px] bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm font-mono tracking-wider animate-pulse">
AD SPACE (728x90)
</div> </div> <!-- EDITORIAL GLIMPSE (Moved Up) --> <section class="pb-16 px-4 md:px-8"> <div class="max-w-[1400px] mx-auto bg-primary-900 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl"> <div class="absolute inset-0 bg-primary-600/5"></div> <div class="grid md:grid-cols-2 gap-12 items-center relative z-10"> <div> <span class="text-primary-400 font-bold uppercase tracking-widest mb-4 block">Editor's Choice</span> <h2 class="font-heading text-4xl md:text-5xl border-l-4 border-primary-600 pl-6 mb-6">
The Future of AI
</h2> <p class="text-white/80 text-xl mb-8 font-light leading-relaxed">
"Artificial Intelligence isn't just a buzzword in
                            dentistry anymore; it's the invisible assistant in
                            every diagnosis. In this month's special feature, we
                            explore how predictive analytics is reshaping
                            patient care plans."
</p> <div class="flex items-center gap-4 mb-8"> <img src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100" class="w-16 h-16 rounded-full border-2 border-primary-600" alt="Editor"> <div> <h4 class="font-bold">Dr. Nupur Shrirao</h4> <p class="text-white/50 text-sm">
Chief Editor, DentalReach
</p> </div> </div> <a href="/articles/editors-choice" class="inline-block px-8 py-3 bg-primary-600 text-white rounded-full font-bold hover:bg-white hover:text-primary-600 transition-all shadow-md">Read Full Editorial</a> </div> <div class="relative hidden md:block"> <div class="absolute -top-10 -left-10 w-full h-full bg-primary-600/20 rounded-[40px]"></div> <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Editor's Choice" class="relative z-10 rounded-[40px] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"> </div> </div> </div> </section> <!-- ARTICLES SECTION --> <section class="py-16 px-4 md:px-8 bg-gray-50"> <div class="max-w-[1800px] mx-auto"> <div class="flex items-end justify-between mb-12"> <div> <span class="text-primary-600 font-bold uppercase tracking-widest mb-2 block">Latest</span> <h2 class="font-heading text-4xl md:text-5xl uppercase text-primary-900">
Featured Articles
</h2> </div> <a href="/articles" class="hidden md:flex items-center gap-2 text-primary-900 font-bold hover:text-primary-600 transition-colors">View All →</a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${articles.map((article) => renderTemplate`<article class="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"> <div class="relative h-64 overflow-hidden"> ${renderComponent($$result2, "Image", $$Image, { "src": article.image_url || "/images/pattern.png", "alt": article.title, "width": 800, "height": 600, "format": "webp", "class": "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" })} <span class="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"> ${article.category || "News"} </span> </div> <div class="p-8"> <h3 class="font-heading text-2xl text-primary-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors"> <a${addAttribute(`/articles/${article.slug}`, "href")}> ${article.title} </a> </h3> <p class="text-gray-500 line-clamp-2 mb-6"> ${article.excerpt} </p> <div class="flex items-center justify-between border-t border-gray-100 pt-6"> <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">
By${" "} ${article.author?.full_name || "DentalReach"} </span> <a${addAttribute(`/articles/${article.slug}`, "href")} class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-primary-900 group-hover:text-white group-hover:border-primary-900 transition-all">
→
</a> </div> </div> </article>`)} </div> </div> </section> <!-- EVENTS CAROUSEL --> ${renderComponent($$result2, "Carousel", Carousel, { "client:visible": true, "title": "Upcoming Events", "viewAllLink": "/events", "variant": "event", "items": events, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/ui/Carousel", "client:component-export": "default" })} <!-- AD SPACE (Banner) --> <div class="container mx-auto px-4 py-8 flex justify-center bg-gray-50"> <div class="w-full max-w-[970px] h-[120px] bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm font-mono tracking-wider animate-pulse">
AD SPACE (970x120)
</div> </div> <!-- JOBS CAROUSEL --> <div class="bg-gray-50"> ${renderComponent($$result2, "Carousel", Carousel, { "client:visible": true, "title": "Latest Jobs", "viewAllLink": "/jobs", "variant": "job", "items": jobs, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/ui/Carousel", "client:component-export": "default" })} </div> <!-- COMMUNITY & LEADERBOARD --> <section class="bg-primary-50/30 py-16"> <div class="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8"> <div class="lg:col-span-1"> ${renderComponent($$result2, "Leaderboard", Leaderboard, { "client:visible": true, "initialLeaders": leaderboardData, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/home/Leaderboard", "client:component-export": "default" })} </div> <div class="lg:col-span-2 text-primary-900"> ${renderComponent($$result2, "Carousel", Carousel, { "client:visible": true, "title": "Community Buzz", "viewAllLink": "/community", "variant": "forum", "items": [
    {
      topic: "Best Intraoral Scanner for 2026?",
      author: "Dr. Mark S.",
      replies: 45,
      views: "1.2k",
      color: "bg-blue-50 text-blue-600",
      slug: "best-scanner-2026"
    },
    {
      topic: "Handling difficult patient reviews",
      author: "Sarah J. (Practice Mgr)",
      replies: 82,
      views: "3.5k",
      color: "bg-orange-50 text-orange-600",
      slug: "handling-reviews"
    },
    {
      topic: "Clinical case discussion: Implant failure",
      author: "Dr. Patel",
      replies: 23,
      views: "850",
      color: "bg-red-50 text-red-600",
      slug: "implant-failure-case"
    },
    {
      topic: "Marketing strategies for new clinics",
      author: "DentalBiz",
      replies: 156,
      views: "5k+",
      color: "bg-green-50 text-green-600",
      slug: "marketing-strategies"
    }
  ], "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/ui/Carousel", "client:component-export": "default" })} </div> </div> </section> <!-- PRODUCTS CAROUSEL --> <div class="bg-white"> ${renderComponent($$result2, "Carousel", Carousel, { "client:visible": true, "title": "Marketplace", "viewAllLink": "/products", "variant": "product", "items": products, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/ui/Carousel", "client:component-export": "default" })} </div> <!-- AD SPACE (Square/Grid) --> <div class="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="bg-gray-100 border border-gray-200 rounded-lg h-[250px] flex items-center justify-center text-gray-400 text-sm font-mono tracking-wider animate-pulse">
AD SPACE (Medium Rectangle)
</div> <div class="bg-gray-100 border border-gray-200 rounded-lg h-[250px] flex items-center justify-center text-gray-400 text-sm font-mono tracking-wider animate-pulse">
AD SPACE (Medium Rectangle)
</div> </div> <!-- RESOURCES & AWARDS GRID (Podcasts, Guides, Awards) --> <section class="py-16 px-4 md:px-8 bg-tuio-bg"> <div class="max-w-[1800px] mx-auto grid grid-cols-1 gap-16"> <!-- PODCASTS --> ${renderComponent($$result2, "Carousel", Carousel, { "client:visible": true, "title": "DentalReach Podcast", "viewAllLink": "/podcasts", "variant": "podcast", "items": podcasts, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/ui/Carousel", "client:component-export": "default" })} <div class="grid grid-cols-1 lg:grid-cols-2 gap-12"> <!-- GUIDES --> ${renderComponent($$result2, "Carousel", Carousel, { "client:visible": true, "title": "Free Guides", "viewAllLink": "/guides", "variant": "guide", "items": guides, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/ui/Carousel", "client:component-export": "default" })} <!-- AWARDS --> ${renderComponent($$result2, "Carousel", Carousel, { "client:visible": true, "title": "Awards", "viewAllLink": "/awards", "variant": "award", "items": awards, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/ui/Carousel", "client:component-export": "default" })} </div> </div> </section> <!-- FEATURES SECTION --> <section class="py-16 px-4 md:px-8 bg-white"> <div class="max-w-[1400px] mx-auto"> <div class="text-center mb-16"> <span class="text-tuio-red font-bold uppercase tracking-widest mb-2 block">Platform</span> <h2 class="font-tuio text-4xl md:text-5xl uppercase text-tuio-navy mb-4">
Everything You Need
</h2> <p class="text-gray-500 max-w-2xl mx-auto font-light text-lg">
One platform for education, networking, career growth,
                        and commerce.
</p> </div> <div class="grid grid-cols-2 md:grid-cols-3 gap-6"> ${features.map((feature) => renderTemplate`<div class="bg-tuio-bg rounded-[24px] p-8 text-center hover:bg-tuio-navy hover:text-white group transition-all duration-300 cursor-pointer"> <div class="text-5xl mb-6 group-hover:scale-110 transition-transform"> ${feature.icon} </div> <h3 class="font-tuio text-xl uppercase mb-3 text-tuio-navy group-hover:text-white transition-colors"> ${feature.title} </h3> <p class="text-gray-500 group-hover:text-white/70 font-light transition-colors"> ${feature.desc} </p> </div>`)} </div> </div> </section> <!-- TESTIMONIALS SECTION --> <section class="py-20 px-4 md:px-8 bg-gradient-to-br from-tuio-red to-red-600 relative overflow-hidden"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="max-w-[1400px] mx-auto relative z-10"> <div class="text-center mb-16"> <span class="text-white/80 font-bold uppercase tracking-widest mb-2 block">Testimonials</span> <h2 class="font-tuio text-4xl md:text-5xl uppercase text-white">
Loved by Dentists
</h2> </div> <div class="grid md:grid-cols-3 gap-8"> ${testimonials.map((t) => renderTemplate`<div class="bg-white/10 backdrop-blur-sm rounded-[24px] p-8 border border-white/20"> <div class="flex items-center gap-4 mb-6"> <img${addAttribute(t.avatar, "src")}${addAttribute(t.name, "alt")} class="w-14 h-14 rounded-full object-cover border-2 border-white"> <div> <h4 class="font-bold text-white"> ${t.name} </h4> <p class="text-white/70 text-sm"> ${t.role} </p> </div> </div> <p class="text-white/90 font-light italic">
"${t.quote}"
</p> </div>`)} </div> </div> </section> <!-- NEWSLETTER CTA --> <section class="py-20 px-4 md:px-8"> <div class="max-w-4xl mx-auto bg-tuio-navy rounded-[40px] p-12 md:p-16 text-center text-white relative overflow-hidden"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="relative z-10"> <div class="text-5xl mb-6">📬</div> <h2 class="font-tuio text-4xl md:text-5xl uppercase mb-4">
Stay In The Loop
</h2> <p class="text-white/70 mb-10 max-w-xl mx-auto font-light text-lg">
Get weekly insights, event invites, and exclusive
                        content delivered to your inbox.
</p> <form id="newsletter-form" class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"> <input name="email" type="email" required placeholder="Your email address" class="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-tuio-red focus:outline-none"> <button type="submit" class="px-8 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all shrink-0 disabled:opacity-50">Subscribe</button> </form> <div id="newsletter-response" class="mt-4 text-center font-bold text-white hidden"></div> </div> ${renderScript($$result2, "/Users/rockson61/Downloads/DR Astro/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </div> </section> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/index.astro", void 0);
const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
