import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C_IiUpen.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useCallback } from 'react';
import { Search, X, Clock, MapPin, ArrowRight, Store, User, Briefcase, Calendar, FileText } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function SearchInterface() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [dateRange, setDateRange] = useState("all");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("dr_recent_searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);
  const saveSearch = (q) => {
    if (!q || q.length < 2) return;
    const newHistory = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    setRecentSearches(newHistory);
    localStorage.setItem("dr_recent_searches", JSON.stringify(newHistory));
  };
  const removeHistoryItem = (e, item) => {
    e.stopPropagation();
    const newHistory = recentSearches.filter((s) => s !== item);
    setRecentSearches(newHistory);
    localStorage.setItem("dr_recent_searches", JSON.stringify(newHistory));
  };
  const performSearch = async (q, type, s, d) => {
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    setHasSearched(true);
    setShowHistory(false);
    saveSearch(q);
    try {
      let startDate = "";
      let endDate = "";
      const now = /* @__PURE__ */ new Date();
      if (d === "30days") {
        const past = /* @__PURE__ */ new Date();
        past.setDate(now.getDate() - 30);
        startDate = past.toISOString();
      } else if (d === "year") {
        const past = /* @__PURE__ */ new Date();
        past.setFullYear(now.getFullYear() - 1);
        startDate = past.toISOString();
      }
      const params = new URLSearchParams({
        q,
        type,
        sort: s,
        ...startDate && { startDate }
      });
      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  const debouncedSearch = useCallback(
    debounce((q, t, s, d) => performSearch(q, t, s, d), 500),
    []
  );
  useEffect(() => {
    if (query.length >= 2) {
      debouncedSearch(query, filter, sort, dateRange);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [query, filter, sort, dateRange]);
  const filters = [
    { id: "all", label: "All" },
    { id: "articles", label: "Articles" },
    { id: "people", label: "People" },
    { id: "events", label: "Events" },
    { id: "directory", label: "Directory" },
    { id: "jobs", label: "Jobs" },
    { id: "products", label: "Products" }
  ];
  const getIcon = (type) => {
    switch (type) {
      case "article":
        return /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-500" });
      case "event":
        return /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-orange-500" });
      case "job":
        return /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-red-500" });
      case "listing":
        return /* @__PURE__ */ jsx(Store, { className: "w-5 h-5 text-green-500" });
      case "profile":
        return /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-red-500" });
      case "product":
        return /* @__PURE__ */ jsx(Store, { className: "w-5 h-5 text-tuio-red" });
      default:
        return /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-gray-400" });
    }
  };
  const getLink = (item) => {
    switch (item.type) {
      case "article":
        return `/articles/${item.slug}`;
      case "event":
        return `/events/${item.slug}`;
      case "job":
        return `/jobs/${item.slug}`;
      case "listing":
        return `/directory/${item.slug}`;
      case "profile":
        return `/profile/${item.slug || "id"}`;
      // fallback if no slug
      case "product":
        return `/products/${item.slug}`;
      default:
        return "#";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-tuio-red/20 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 bg-white rounded-[24px] shadow-lg flex flex-col border border-gray-100 focus-within:ring-4 ring-tuio-red/20 transition-all overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center p-2", children: [
          /* @__PURE__ */ jsx("div", { className: "pl-4 pr-3 text-gray-400", children: /* @__PURE__ */ jsx(Search, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: query,
              onChange: (e) => {
                setQuery(e.target.value);
                if (!e.target.value) setShowHistory(true);
              },
              onFocus: () => setShowHistory(true),
              onBlur: () => setTimeout(() => setShowHistory(false), 200),
              placeholder: "Search articles, dentists, events...",
              className: "flex-grow bg-transparent border-none outline-none text-lg text-gray-700 placeholder:text-gray-400 py-3",
              autoComplete: "off"
            }
          ),
          query && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setQuery("");
                setResults([]);
                setHasSearched(false);
              },
              className: "p-2 text-gray-400 hover:text-gray-600",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
            }
          ),
          isLoading && /* @__PURE__ */ jsx("div", { className: "pr-4", children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-tuio-red border-t-transparent rounded-full animate-spin" }) })
        ] }),
        showHistory && recentSearches.length > 0 && !query && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 bg-gray-50/50 p-2", children: [
          /* @__PURE__ */ jsx("div", { className: "px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Recent Searches" }),
          /* @__PURE__ */ jsx("ul", { children: recentSearches.map((term, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => setQuery(term),
              className: "w-full text-left px-4 py-2 hover:bg-white hover:shadow-sm rounded-lg flex items-center justify-between text-gray-600 group transition-all",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-gray-400" }),
                  term
                ] }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    onClick: (e) => removeHistoryItem(e, term),
                    className: "opacity-0 group-hover:opacity-100 p-1 hover:text-red-500",
                    children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
                  }
                )
              ]
            }
          ) }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 mt-6 items-center justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 justify-center md:justify-start", children: filters.map((f) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter(f.id),
            className: `px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === f.id ? "bg-tuio-navy text-white shadow-md transform scale-105" : "bg-white text-gray-500 hover:bg-gray-100"}`,
            children: f.label
          },
          f.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: dateRange,
              onChange: (e) => setDateRange(e.target.value),
              className: "bg-white border-none py-2 px-4 rounded-full text-sm font-bold text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-0",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "Any Date" }),
                /* @__PURE__ */ jsx("option", { value: "30days", children: "Last 30 Days" }),
                /* @__PURE__ */ jsx("option", { value: "year", children: "Last Year" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: sort,
              onChange: (e) => setSort(e.target.value),
              className: "bg-white border-none py-2 px-4 rounded-full text-sm font-bold text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-0",
              children: [
                /* @__PURE__ */ jsx("option", { value: "relevance", children: "Relevance" }),
                /* @__PURE__ */ jsx("option", { value: "newest", children: "Newest" }),
                /* @__PURE__ */ jsx("option", { value: "oldest", children: "Oldest" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      results.length > 0 ? results.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: getLink(item),
          className: "block bg-white rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group hover:-translate-y-1",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center", children: item.image_url || item.avatar_url ? /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image_url || item.avatar_url,
                alt: item.title || item.full_name || "Image",
                className: "w-full h-full rounded-full object-cover"
              }
            ) : getIcon(item.type) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-grow min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsx("span", { className: `text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500`, children: item.type }),
                item.location && /* @__PURE__ */ jsxs("span", { className: "flex items-center text-xs text-gray-400", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3 mr-1" }),
                  " ",
                  item.location
                ] }),
                item.created_at && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-300", children: new Date(item.created_at).toLocaleDateString() })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-tuio-navy group-hover:text-tuio-red transition-colors truncate", children: item.title || item.full_name || item.business_name }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm line-clamp-2 mt-1", children: item.excerpt || item.description || item.specialty || item.company_name })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "self-center text-gray-300 group-hover:text-tuio-red transition-colors", children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" }) })
          ] })
        },
        `${item.type}-${item.id}`
      )) : hasSearched && !isLoading && query.length >= 2 && /* @__PURE__ */ jsxs("div", { className: "text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "🤔" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-700", children: "No results found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Try adjusting your search terms or filters." })
      ] }),
      !hasSearched && !query && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Start typing to search across the entire platform." }) })
    ] })
  ] });
}

const $$Search = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Search | DentalReach" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-tuio-bg min-h-screen py-20 px-4"> <div class="container mx-auto"> <div class="text-center mb-12"> <h1 class="text-4xl md:text-6xl font-tuio uppercase text-tuio-navy mb-4">
Explore <span class="text-transparent bg-clip-text bg-gradient-to-r from-tuio-red to-red-500">DentalReach</span> </h1> <p class="text-gray-500 text-lg max-w-2xl mx-auto">
Find articles, professionals, events, and career
                    opportunities in one place.
</p> </div> ${renderComponent($$result2, "SearchInterface", SearchInterface, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/search/SearchInterface", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/search.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Search,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
