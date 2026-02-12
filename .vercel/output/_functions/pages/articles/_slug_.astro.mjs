import { e as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, r as renderComponent, ak as Fragment, a as renderTemplate, d as renderScript, ah as unescapeHTML } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import 'clsx';
import { L as LikeButton } from '../../chunks/LikeButton_ahGK-Lmi.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
import { formatDistanceToNow, format } from 'date-fns';
import { jsxs, jsx, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { F as FollowButton } from '../../chunks/FollowButton_CwqJhlTW.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$4 = createAstro("https://dentalreach.today");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { items, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Breadcrumb"${addAttribute(`flex items-center gap-2 text-sm ${className}`, "class")}> <a href="/" class="text-gray-400 hover:text-tuio-red transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> </a> ${items.map((item, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="text-gray-300">/</span> ${i === items.length - 1 ? renderTemplate`<span class="text-tuio-navy font-medium truncate max-w-[200px]">${item.label}</span>` : renderTemplate`<a${addAttribute(item.href, "href")} class="text-gray-400 hover:text-tuio-red transition-colors truncate max-w-[150px]"> ${item.label} </a>`}` })}`)} </nav>`;
}, "/Users/rockson61/Downloads/DR Astro/src/components/Breadcrumbs.astro", void 0);

const $$Astro$3 = createAstro("https://dentalreach.today");
const $$ShareButtons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ShareButtons;
  const { url, title, class: className = "" } = Astro2.props;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex items-center gap-3 ${className}`, "class")}> <span class="text-sm font-bold text-gray-400 uppercase tracking-wider">Share</span> <!-- Twitter/X --> <a${addAttribute(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "href")} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-tuio-navy text-gray-500 hover:text-white flex items-center justify-center transition-all" aria-label="Share on Twitter">
𝕏
</a> <!-- LinkedIn --> <a${addAttribute(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, "href")} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-[#0077B5] text-gray-500 hover:text-white flex items-center justify-center transition-all" aria-label="Share on LinkedIn">
in
</a> <!-- Facebook --> <a${addAttribute(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "href")} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-[#1877F2] text-gray-500 hover:text-white flex items-center justify-center transition-all" aria-label="Share on Facebook">
f
</a> <!-- WhatsApp --> <a${addAttribute(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "href")} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-[#25D366] text-gray-500 hover:text-white flex items-center justify-center transition-all" aria-label="Share on WhatsApp">
📱
</a> <!-- Copy Link --> <button id="copy-link-btn" class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-tuio-red text-gray-500 hover:text-white flex items-center justify-center transition-all" aria-label="Copy link"${addAttribute(url, "data-url")}>
🔗
</button> </div> ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/components/ShareButtons.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/components/ShareButtons.astro", void 0);

const $$Astro$2 = createAstro("https://dentalreach.today");
const $$CommentSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CommentSection;
  const { articleId } = Astro2.props;
  const supabase = createSupabaseServerClient(Astro2);
  const { data: comments } = await supabase.from("comments").select("*, profile:profiles(full_name, avatar_url)").eq("article_id", articleId).eq("is_approved", true).order("created_at", { ascending: false });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return renderTemplate`${maybeRenderHead()}<div class="bg-gray-50 rounded-[32px] p-8 md:p-12 mb-12" id="comments-section"> <h3 class="font-tuio text-2xl uppercase text-tuio-navy mb-8 flex items-center gap-3">
Comments <span class="text-gray-400 text-lg">(${comments?.length || 0})</span> </h3> <!-- Comment Form --> <div class="mb-12"> ${user ? renderTemplate`<form id="comment-form" class="flex gap-4"> <img${addAttribute(user.user_metadata?.avatar_url || "/images/avatar-placeholder.png", "src")} alt="User" class="w-10 h-10 rounded-full object-cover hidden md:block"> <div class="flex-grow"> <textarea name="content" rows="3" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-tuio-navy focus:ring-4 focus:ring-tuio-red/10 focus:border-tuio-red focus:outline-none resize-none transition-all placeholder:text-gray-400" placeholder="Share your thoughts..." required></textarea> <div class="flex justify-end mt-3"> <button type="submit" class="px-8 py-3 bg-tuio-navy text-white rounded-full font-bold uppercase tracking-wide text-sm hover:bg-tuio-red transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Post Comment
</button> </div> </div> <input type="hidden" name="article_id"${addAttribute(articleId, "value")}> </form>` : renderTemplate`<div class="bg-white rounded-2xl p-6 text-center border border-dashed border-gray-300"> <p class="text-gray-500 mb-4">Please log in to join the conversation.</p> <a href="/login" class="px-6 py-2 bg-tuio-red/10 text-tuio-red rounded-full font-bold uppercase tracking-wide text-sm hover:bg-tuio-red hover:text-white transition-all inline-block">
Log In / Sign Up
</a> </div>`} </div> <!-- Comments List --> <div class="space-y-8"> ${comments && comments.length > 0 ? comments.map((comment) => renderTemplate`<div class="flex gap-4 group"> <div class="shrink-0"> ${comment.profile?.avatar_url ? renderTemplate`<img${addAttribute(comment.profile.avatar_url, "src")}${addAttribute(comment.profile.full_name, "alt")} class="w-10 h-10 rounded-full object-cover">` : renderTemplate`<div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold"> ${comment.profile?.full_name?.charAt(0) || "?"} </div>`} </div> <div class="flex-grow"> <div class="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 group-hover:border-gray-200 transition-colors"> <div class="flex items-center justify-between mb-2"> <span class="font-bold text-tuio-navy"> ${comment.profile?.full_name || "Anonymous"} </span> <span class="text-xs text-gray-400"> ${formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true
  })} </span> </div> <p class="text-gray-600 leading-relaxed text-sm"> ${comment.content} </p> </div> <!-- Future: Reaction buttons or Reply --> </div> </div>`) : renderTemplate`<div class="text-center py-10 opacity-50"> <div class="text-4xl mb-2">💭</div> <p>Be the first to comment!</p> </div>`} </div> </div> ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/components/comments/CommentSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/components/comments/CommentSection.astro", void 0);

function BookmarkButton({
  articleId,
  initialIsSaved
}) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);
  const toggleBookmark = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newState = !isSaved;
      setIsSaved(newState);
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article_id: articleId })
      });
      if (!res.ok) {
        if (res.status === 401) {
          alert("Please log in to save articles.");
          window.location.href = "/login";
          return;
        }
        throw new Error("Failed to update bookmark");
      }
      const data = await res.json();
      if (data.saved !== newState) {
        setIsSaved(data.saved);
      }
    } catch (error) {
      console.error(error);
      setIsSaved(!isSaved);
      alert("Failed to save article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: toggleBookmark,
      disabled: isLoading,
      className: `group flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isSaved ? "bg-tuio-navy text-white hover:bg-tuio-navy/90" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`,
      "aria-label": isSaved ? "Remove from bookmarks" : "Save for later",
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: `w-5 h-5 transition-transform ${isSaved ? "scale-110" : "group-hover:scale-110"}`,
            fill: isSaved ? "currentColor" : "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "font-medium text-sm hidden md:inline", children: isSaved ? "Saved" : "Save" })
      ]
    }
  );
}

const $$Astro$1 = createAstro("https://dentalreach.today");
const $$TableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { headings } = Astro2.props;
  const filteredHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3);
  return renderTemplate`${maybeRenderHead()}<nav class="toc-container sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto hidden lg:block pr-4"> <h3 class="font-tuio text-sm font-bold uppercase text-gray-400 mb-4 tracking-wider">
Table of Contents
</h3> <ul class="space-y-2 text-sm border-l-2 border-gray-100"> ${filteredHeadings.map((heading) => renderTemplate`<li${addAttribute(`pl-4 transition-colors hover:border-l-2 hover:-ml-[2px] ${heading.depth === 3 ? "pl-8 text-xs" : ""}`, "class")}> <a${addAttribute(`#${heading.slug}`, "href")} class="text-gray-500 hover:text-tuio-red block py-1"> ${heading.text} </a> </li>`)} </ul> </nav> ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/components/article/TableOfContents.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/components/article/TableOfContents.astro", void 0);

function CitationModal({ article, isOpen, onClose }) {
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState("APA");
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const date = new Date(article.published_at);
  const year = date.getFullYear();
  const authorName = article.author?.full_name || "DentalReach Team";
  const names = authorName.split(" ");
  const surname = names[names.length - 1];
  const initial = names[0][0];
  const citations = {
    APA: `${surname}, ${initial}. (${year}). ${article.title}. DentalReach. ${url}`,
    MLA: `${surname}, ${names[0]}. "${article.title}." DentalReach, ${format(date, "d MMM. yyyy")}, ${url}.`,
    BibTeX: `@article{dentalreach_${year},
  author = {${authorName}},
  title = {${article.title}},
  journal = {DentalReach},
  year = {${year}},
  url = {${url}}
}`
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(citations[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-6 border-b border-gray-100", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-tuio-navy font-tuio uppercase", children: "Cite This Article" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 mb-4 border-b border-gray-100", children: ["APA", "MLA", "BibTeX"].map((type) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab(type),
          className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === type ? "border-tuio-red text-tuio-red" : "border-transparent text-gray-500 hover:text-gray-700"}`,
          children: type
        },
        type
      )) }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[100px] mb-4 font-mono text-sm text-gray-700 break-words whitespace-pre-wrap", children: citations[activeTab] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: copyToClipboard,
            className: `px-6 py-2 rounded-lg text-white font-bold text-sm transition-all flex items-center gap-2 ${copied ? "bg-emerald-500" : "bg-tuio-navy hover:bg-tuio-red"}`,
            children: copied ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              "Copied!"
            ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" }) }),
              "Copy Citation"
            ] })
          }
        )
      ] })
    ] })
  ] }) });
}

function ArticleActions({ article }) {
  const [isCitationOpen, setIsCitationOpen] = useState(false);
  const handlePrint = () => {
    window.print();
  };
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsCitationOpen(true),
          className: "flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-tuio-navy rounded-full text-xs font-bold uppercase tracking-wider transition-colors",
          title: "Cite this article",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Cite" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handlePrint,
          className: "flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-tuio-navy rounded-full text-xs font-bold uppercase tracking-wider transition-colors",
          title: "Download PDF / Print",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "PDF" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      CitationModal,
      {
        article,
        isOpen: isCitationOpen,
        onClose: () => setIsCitationOpen(false)
      }
    )
  ] });
}

function PremiumLock() {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 flex flex-col items-center justify-center p-12 text-center mt-12 bg-gray-50/90 backdrop-blur-sm rounded-[32px] border border-gray-200 shadow-lg max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-tuio-red/10 rounded-full flex items-center justify-center mb-6 text-3xl", children: "🔒" }),
      /* @__PURE__ */ jsx("h3", { className: "font-tuio text-3xl uppercase text-tuio-navy mb-4", children: "Premium Content" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8 max-w-md", children: "This article is exclusive to Pro members. Upgrade your plan to unlock full access to clinical cases, research, and more." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/dashboard/billing",
          className: "px-8 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1",
          children: "Unlock Access"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-gray-500", children: [
        "Already a member? ",
        /* @__PURE__ */ jsx("a", { href: "/login", className: "text-tuio-red underline", children: "Log in" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "filter blur-md opacity-30 select-none pointer-events-none", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Clinical Case Integration" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." }),
      /* @__PURE__ */ jsx("p", { children: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." })
    ] })
  ] });
}

function AnalyticsTracker({ articleId }) {
  const hasFiredRead = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasFiredRead.current) {
        trackEvent("read");
        hasFiredRead.current = true;
      }
    }, 3e4);
    trackEvent("view");
    return () => clearTimeout(timer);
  }, [articleId]);
  const trackEvent = async (type) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article_id: articleId, type })
      });
    } catch (e) {
      console.error(e);
    }
  };
  return null;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let article = null;
  let relatedArticles = [];
  let likesCount = 0;
  let isLiked = false;
  let isSaved = false;
  let isPro = false;
  try {
    const supabase = createSupabaseServerClient(Astro2);
    const { data } = await supabase.from("articles").select(
      "*, author:profiles(id, full_name, avatar_url, bio, slug), category:categories(name, slug)"
    ).eq("slug", slug).eq("status", "published").single();
    article = data;
    if (article?.is_premium && user) {
      const { data: sub } = await supabase.from("subscriptions").select("status").eq("user_id", user.id).single();
      isPro = sub?.status === "active" || sub?.status === "trialing";
    }
    if (article?.tags && article.tags.length > 0) {
      const { data: relatedByTags } = await supabase.from("articles").select("title, slug, image_url, published_at").eq("status", "published").overlaps("tags", article.tags).neq("slug", slug).limit(3);
      if (relatedByTags && relatedByTags.length > 0) {
        relatedArticles = relatedByTags;
      }
    }
    if (relatedArticles.length < 3 && article?.category?.slug) {
      const needed = 3 - relatedArticles.length;
      const currentSlugs = relatedArticles.map((a) => a.slug);
      currentSlugs.push(slug);
      const { data: relatedByCategory } = await supabase.from("articles").select("title, slug, image_url, published_at").eq("status", "published").eq("category.slug", article.category.slug).not(
        "slug",
        "in",
        `(${currentSlugs.map((s) => `"${s}"`).join(",")})`
      ).limit(needed);
      if (relatedByCategory) {
        relatedArticles = [...relatedArticles, ...relatedByCategory];
      }
    }
    const { count } = await supabase.from("article_likes").select("*", { count: "exact", head: true }).eq("article_id", article.id);
    likesCount = count;
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) {
      const { data: likeData } = await supabase.from("article_likes").select("id").match({ user_id: user.id, article_id: article.id }).single();
      if (likeData) isLiked = true;
      const { data: savedData } = await supabase.from("saved_articles").select("id").match({ user_id: user.id, article_id: article.id }).single();
      if (savedData) isSaved = true;
    }
  } catch (error) {
    console.log("Using mock data - Supabase not configured");
  }
  const mockArticle = {
    title: "The Future of Digital Dentistry",
    excerpt: "Exploring how AI and 3D printing are revolutionizing modern dental practices.",
    content: `<p>Digital dentistry is rapidly transforming how dental professionals diagnose, plan, and execute treatments. From intraoral scanners to AI-powered diagnostics, the landscape of modern dentistry is evolving at an unprecedented pace.</p>
  <h2>The Rise of Intraoral Scanning</h2>
  <p>Intraoral scanners have become increasingly accessible, allowing for precise digital impressions that eliminate the discomfort of traditional methods. These digital workflows improve accuracy and reduce turnaround times for restorations.</p>
  <h2>AI in Diagnosis</h2>
  <p>Artificial intelligence is being integrated into radiograph analysis, helping dentists identify pathologies with greater accuracy. Machine learning algorithms can detect early signs of decay, periodontal disease, and even oral cancers.</p>
  <h2>3D Printing Revolution</h2>
  <p>From surgical guides to temporary crowns, 3D printing is enabling same-day treatments that were previously impossible. This technology is reducing costs and improving patient outcomes.</p>
  <h2>The Connected Practice</h2>
  <p>Cloud-based practice management systems are enabling real-time collaboration between dental professionals across the globe. Teledentistry is expanding access to care in underserved communities.</p>`,
    image_url: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=1200",
    published_at: "2026-01-20T10:00:00Z",
    author: {
      full_name: "Dr. Sarah Chen",
      bio: "Digital dentistry specialist with 15 years of experience in implantology and CAD/CAM technologies.",
      avatar_url: null
    },
    category: { name: "Technology", slug: "technology" },
    is_premium: false
  };
  const displayArticle = article || mockArticle;
  const wordCount = (displayArticle.content || displayArticle.excerpt || "").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const pageUrl = Astro2.url.href;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${displayArticle.title} | DentalReach` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<article> <!-- Hero Image --> <div class="relative h-[50vh] md:h-[60vh] bg-tuio-navy overflow-hidden"> <img${addAttribute(displayArticle.image_url || "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800", "src")}${addAttribute(displayArticle.title, "alt")} class="w-full h-full object-cover opacity-60"> <div class="absolute inset-0 bg-gradient-to-t from-tuio-navy via-tuio-navy/50 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-8 md:p-16"> <div class="container mx-auto"> <!-- Breadcrumbs --> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [
    { label: "Articles", href: "/articles" },
    {
      label: displayArticle.category?.name || "Article",
      href: `/articles?category=${displayArticle.category?.slug}`
    },
    { label: displayArticle.title }
  ], "class": "text-white/60 mb-6" })} <span class="inline-block px-4 py-1 bg-tuio-red text-white rounded-full text-sm font-bold uppercase tracking-wider mb-4"> ${displayArticle.category?.name || "Article"} </span> <h1 class="text-4xl md:text-6xl font-tuio uppercase text-white leading-tight max-w-4xl"> ${displayArticle.title} </h1> <div class="flex flex-wrap items-center gap-4 md:gap-6 mt-6 text-white/80"> <span class="font-medium">${displayArticle.author?.full_name || "DentalReach Team"}</span> <span class="hidden md:inline">•</span> <span>${format(
    new Date(displayArticle.published_at),
    "MMMM d, yyyy"
  )}</span> <span class="hidden md:inline">•</span> <span class="flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ${readingTime} min read
</span> </div> <div class="mt-8 flex gap-4"> ${renderComponent($$result2, "ArticleActions", ArticleActions, { "client:load": true, "article": displayArticle, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/article/ArticleActions", "client:component-export": "default" })} </div> ${article?.id && renderTemplate`${renderComponent($$result2, "AnalyticsTracker", AnalyticsTracker, { "client:load": true, "articleId": article.id, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/analytics/AnalyticsTracker.tsx", "client:component-export": "default" })}`} </div> </div> </div> <!-- Content --> <div class="bg-tuio-bg py-16"> <div class="container mx-auto px-4"> <div class="flex flex-col lg:flex-row gap-12"> <!-- Sidebar (ToC) --> <aside class="hidden lg:block w-64 shrink-0 order-2"> ${renderComponent($$result2, "TableOfContents", $$TableOfContents, { "headings": displayArticle.headings || [] })} </aside> <div class="max-w-4xl mx-auto lg:mx-0 lg:w-full lg:max-w-none order-1"> <!-- Share Buttons (Sticky Sidebar on Desktop) --> <div class="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40"> <div class="flex flex-col items-center gap-3 bg-white rounded-full p-3 shadow-lg"> <span class="text-xs font-bold text-gray-400 uppercase tracking-wider -rotate-90 mb-2 w-16 text-center">Share</span> <a${addAttribute(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(displayArticle.title)}`, "href")} target="_blank" class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-tuio-navy text-gray-500 hover:text-white flex items-center justify-center transition-all text-sm">𝕏</a> <a${addAttribute(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}`, "href")} target="_blank" class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-[#0077B5] text-gray-500 hover:text-white flex items-center justify-center transition-all text-sm">in</a> <a${addAttribute(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, "href")} target="_blank" class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-[#1877F2] text-gray-500 hover:text-white flex items-center justify-center transition-all text-sm">f</a> <button id="copy-link-sidebar"${addAttribute(pageUrl, "data-url")} class="w-10 h-10 rounded-full bg-tuio-bg hover:bg-tuio-red text-gray-500 hover:text-white flex items-center justify-center transition-all">🔗</button> </div> </div> <!-- Article Body --> <div class="bg-white rounded-[32px] p-8 md:p-12 shadow-sm mb-12"> <div class="flex justify-end mb-6 gap-2"> ${renderComponent($$result2, "BookmarkButton", BookmarkButton, { "client:load": true, "articleId": article?.id || 0, "initialIsSaved": isSaved, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/actions/BookmarkButton", "client:component-export": "default" })} ${renderComponent($$result2, "LikeButton", LikeButton, { "client:load": true, "articleId": article?.id || "", "initialLikes": likesCount || 0, "initialIsLiked": isLiked, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/social/LikeButton", "client:component-export": "default" })} </div> ${displayArticle.is_premium && !isPro ? renderTemplate`${renderComponent($$result2, "PremiumLock", PremiumLock, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/monetization/PremiumLock.tsx", "client:component-export": "default" })}` : renderTemplate`<div class="prose prose-lg max-w-none prose-headings:font-tuio prose-headings:uppercase prose-headings:text-tuio-navy prose-a:text-tuio-red prose-img:rounded-2xl">${unescapeHTML(
    displayArticle.content || `<p>${displayArticle.excerpt}</p>`
  )}</div>`} <!-- Mobile Share Buttons --> <div class="lg:hidden mt-12 pt-8 border-t border-gray-100"> ${renderComponent($$result2, "ShareButtons", $$ShareButtons, { "url": pageUrl, "title": displayArticle.title })} </div> </div> <!-- Tags --> ${displayArticle.tags && displayArticle.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-12"> ${displayArticle.tags.map(
    (tag) => renderTemplate`<a${addAttribute(`/articles?tag=${encodeURIComponent(tag)}`, "href")} class="px-4 py-2 bg-tuio-red/10 text-tuio-red rounded-full text-sm font-medium hover:bg-tuio-red hover:text-white transition-colors">
#${tag} </a>`
  )} </div>`} <!-- Author Box --> <div class="bg-white rounded-[32px] p-8 shadow-sm flex flex-col md:flex-row items-center gap-8"> <div class="w-24 h-24 bg-gradient-to-br from-tuio-red to-red-600 rounded-full flex items-center justify-center shrink-0"> ${displayArticle.author?.avatar_url ? renderTemplate`<img${addAttribute(
    displayArticle.author.avatar_url,
    "src"
  )}${addAttribute(
    displayArticle.author.full_name,
    "alt"
  )} class="w-full h-full object-cover rounded-full">` : renderTemplate`<span class="text-4xl text-white">
👩‍⚕️
</span>`} </div> <div class="text-center md:text-left flex-grow"> <span class="text-sm text-tuio-red font-bold uppercase tracking-wider">Written by</span> <h3 class="font-tuio text-2xl uppercase text-tuio-navy mb-2"> ${displayArticle.author?.full_name || "DentalReach Team"} </h3> <p class="text-gray-500 font-light"> ${displayArticle.author?.bio || "Contributing writer at DentalReach."} </p> </div> <div class="flex flex-col gap-2 shrink-0"> <a${addAttribute(`/profile/${displayArticle.author?.slug || displayArticle.author?.id || "1"}`, "href")} class="px-6 py-3 bg-tuio-bg hover:bg-tuio-navy hover:text-white text-tuio-navy rounded-full font-bold transition-all text-center">
View Profile
</a> ${displayArticle.author?.id && renderTemplate`<div class="flex justify-center"> ${renderComponent($$result2, "FollowButton", FollowButton, { "client:load": true, "targetUserId": displayArticle.author.id, "targetUserName": displayArticle.author.full_name, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/social/FollowButton", "client:component-export": "default" })} </div>`} </div> </div> <!-- Comments Section --> ${article?.id && renderTemplate`${renderComponent($$result2, "CommentSection", $$CommentSection, { "articleId": article.id })}`} <!-- References Section --> ${displayArticle.references && displayArticle.references.length > 0 && renderTemplate`<div class="mt-12 pt-8 border-t border-gray-200"> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-4">
References
</h3> <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600"> ${typeof displayArticle.references === "string" ? JSON.parse(
    displayArticle.references
  ).map((ref) => renderTemplate`<li>${ref}</li>`) : Array.isArray(
    displayArticle.references
  ) ? displayArticle.references.map(
    (ref) => renderTemplate`<li> ${typeof ref === "string" ? ref : ref.text || JSON.stringify(
      ref
    )} </li>`
  ) : renderTemplate`<li>
No references available.
</li>`} </ol> </div>`} </div> </div> </div> <!-- Related Articles --> <section class="bg-white py-16"> <div class="container mx-auto px-4"> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-8 text-center">
Related Articles
</h2> <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"> ${(relatedArticles.length > 0 ? relatedArticles : [
    {
      title: "CAD/CAM Workflow Best Practices",
      slug: "cad-cam-workflow",
      image_url: "https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "AI in Dental Diagnostics",
      slug: "ai-dental-diagnostics",
      image_url: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Teledentistry: A Complete Guide",
      slug: "teledentistry-guide",
      image_url: "https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ]).map((related) => renderTemplate`<a${addAttribute(`/articles/${related.slug}`, "href")} class="bg-tuio-bg rounded-[32px] overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all group"> <div class="h-48 overflow-hidden"> <img${addAttribute(
    related.image_url || "/images/pattern.png",
    "src"
  )}${addAttribute(related.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"> </div> <div class="p-6"> <h3 class="font-tuio text-lg uppercase text-tuio-navy group-hover:text-tuio-red transition-colors"> ${related.title} </h3> </div> </a>`)} </div> </div> </section> <!-- Newsletter CTA --> <section class="bg-tuio-navy py-16"> <div class="container mx-auto px-4 text-center"> <h2 class="font-tuio text-3xl md:text-4xl uppercase text-white mb-4">
Enjoyed this article?
</h2> <p class="text-white/70 mb-8 max-w-xl mx-auto">
Subscribe to get more insights like this delivered to
                        your inbox.
</p> <form class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"> <input type="email" placeholder="Your email address" class="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-tuio-red focus:outline-none"> <button type="submit" class="px-8 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all shrink-0">
Subscribe
</button> </form> </div> </section> </div> </article> ${renderScript($$result2, "/Users/rockson61/Downloads/DR Astro/src/pages/articles/[slug].astro?astro&type=script&index=0&lang.ts")} `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template(['  <meta name="citation_title"', '> <meta name="citation_author"', '> <meta name="citation_publication_date"', '> <meta name="citation_journal_title" content="DentalReach Magazine"> <meta name="citation_language" content="en"> ', "", ' <meta name="DC.title"', '> <meta name="DC.creator"', '> <meta name="DC.date"', '> <meta name="DC.publisher" content="DentalReach"> <meta name="DC.identifier"', '> <meta name="DC.language" content="en"> <meta name="DC.type" content="Text"> <meta name="DC.format" content="text/html"> ', "", ' <meta name="prism.publicationName" content="DentalReach Magazine"> <meta name="prism.publicationDate"', "> ", "", "", '<meta name="prism.section"', '> <meta name="prism.url"', ">  ", '<meta name="citation_publisher" content="DentalReach"> <meta name="citation_online_date"', '> <meta name="citation_fulltext_html_url"', '>  <meta property="og:type" content="article"> <meta property="article:published_time"', '> <meta property="article:section"', "> ", ' <script type="application/ld+json">', "<\/script> "])), addAttribute(displayArticle.title, "content"), addAttribute(displayArticle.author?.full_name || "DentalReach Team", "content"), addAttribute(format(
    new Date(displayArticle.published_at),
    "yyyy/MM/dd"
  ), "content"), displayArticle.doi && renderTemplate`<meta name="citation_doi"${addAttribute(displayArticle.doi, "content")}>`, displayArticle.pdf_url && renderTemplate`<meta name="citation_pdf_url"${addAttribute(displayArticle.pdf_url, "content")}>`, addAttribute(displayArticle.title, "content"), addAttribute(displayArticle.author?.full_name || "DentalReach Team", "content"), addAttribute(new Date(displayArticle.published_at).toISOString(), "content"), addAttribute(displayArticle.slug, "content"), displayArticle.excerpt && renderTemplate`<meta name="DC.description"${addAttribute(displayArticle.excerpt, "content")}>`, displayArticle.doi && renderTemplate`<meta name="DC.identifier"${addAttribute(`doi:${displayArticle.doi}`, "content")}>`, addAttribute(format(
    new Date(displayArticle.published_at),
    "yyyy-MM-dd"
  ), "content"), displayArticle.doi && renderTemplate`<meta name="prism.doi"${addAttribute(displayArticle.doi, "content")}>`, displayArticle.issue_number && renderTemplate`<meta name="prism.issueIdentifier"${addAttribute(displayArticle.issue_number, "content")}>`, displayArticle.volume && renderTemplate`<meta name="prism.volume"${addAttribute(displayArticle.volume, "content")}>`, addAttribute(displayArticle.category?.name || "Dentistry", "content"), addAttribute(pageUrl, "content"), displayArticle.excerpt && renderTemplate`<meta name="citation_abstract"${addAttribute(displayArticle.excerpt, "content")}>`, addAttribute(format(
    new Date(displayArticle.published_at),
    "yyyy/MM/dd"
  ), "content"), addAttribute(pageUrl, "content"), addAttribute(new Date(displayArticle.published_at).toISOString(), "content"), addAttribute(displayArticle.category?.name || "Dentistry", "content"), displayArticle.tags?.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: displayArticle.title,
    image: [displayArticle.image_url],
    datePublished: new Date(
      displayArticle.published_at
    ).toISOString(),
    dateModified: new Date(
      displayArticle.updated_at || displayArticle.published_at
    ).toISOString(),
    author: [
      {
        "@type": "Person",
        name: displayArticle.author?.full_name || "DentalReach Team",
        url: new URL(
          `/profile/${displayArticle.author?.slug || displayArticle.author?.id}`,
          Astro2.site
        ).href
      }
    ],
    publisher: {
      "@type": "Organization",
      name: "DentalReach",
      logo: {
        "@type": "ImageObject",
        url: new URL("/images/logo-full.png", Astro2.site).href
      }
    },
    description: displayArticle.excerpt,
    ...displayArticle.doi && {
      identifier: {
        "@type": "PropertyValue",
        propertyID: "doi",
        value: displayArticle.doi
      }
    },
    isPartOf: {
      "@type": "Periodical",
      name: "DentalReach Magazine",
      issn: "XXXX-XXXX"
    },
    articleBody: displayArticle.content?.replace(/<[^>]*>?/gm, "").substring(0, 5e3)
  }))) })}` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/articles/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/articles/[slug].astro";
const $$url = "/articles/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
