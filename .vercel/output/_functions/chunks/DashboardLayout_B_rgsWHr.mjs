import { e as createAstro, c as createComponent, aj as renderHead, a as renderTemplate, b as addAttribute, r as renderComponent, ai as renderSlot, d as renderScript } from './astro/server_DcquF9um.mjs';
import 'piccolore';
/* empty css                         */
import { a as createSupabaseBrowserClient, c as createSupabaseServerClient } from './supabase_CYzxA37O.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
/* empty css                         */

const supabase = createSupabaseBrowserClient();
function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 3e4);
    return () => clearInterval(interval);
  }, []);
  const fetchUnreadCount = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { count, error } = await supabase.from("notifications").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false);
    if (!error && count !== null) setUnreadCount(count);
  };
  const fetchLatestNotifications = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
      setNotifications(data || []);
    }
    setIsLoading(false);
  };
  const toggleDropdown = () => {
    if (!isOpen) {
      fetchLatestNotifications();
    }
    setIsOpen(!isOpen);
  };
  const markAsRead = async (id, link) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setUnreadCount((prev) => Math.max(0, prev - 1));
    setNotifications(notifications.map((n) => n.id === id ? { ...n, is_read: true } : n));
    if (link) {
      window.location.href = link;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: toggleDropdown,
        className: "relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600",
        children: [
          /* @__PURE__ */ jsx(Bell, { size: 20 }),
          unreadCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white", children: unreadCount > 9 ? "9+" : unreadCount })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 border-b border-gray-50 flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-tuio-navy text-sm", children: "Notifications" }),
        /* @__PURE__ */ jsx("a", { href: "/dashboard/notifications", className: "text-xs text-tuio-red font-bold hover:underline", children: "View All" })
      ] }),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-400 text-xs", children: "Loading..." }) : notifications.length > 0 ? /* @__PURE__ */ jsx("div", { className: "max-h-80 overflow-y-auto", children: notifications.map((notif) => /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => markAsRead(notif.id, notif.link),
          className: `px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${!notif.is_read ? "bg-blue-50/50" : ""}`,
          children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: `mt-1 w-2 h-2 rounded-full shrink-0 ${!notif.is_read ? "bg-tuio-red" : "bg-gray-200"}` }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-800 leading-tight mb-1", children: notif.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 line-clamp-2", children: notif.message }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-1 uppercase tracking-wide", children: new Date(notif.created_at).toLocaleDateString() })
            ] })
          ] })
        },
        notif.id
      )) }) : /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-400 text-sm", children: "No notifications yet." })
    ] })
  ] });
}

const $$Astro = createAstro("https://dentalreach.today");
const $$DashboardLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DashboardLayout;
  const { title } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("role, full_name, avatar_url, specialty, is_verified").eq("id", user.id).single();
  const role = profile?.role || "dentist";
  const isSuperAdmin = role === "super_admin";
  const isAdmin = role === "admin" || isSuperAdmin;
  const isEditor = role === "editor" || isAdmin;
  const isModerator = role === "moderator" || isAdmin;
  const allLinks = [
    {
      section: "Overview",
      roles: ["all"],
      items: [{ label: "Dashboard", href: "/dashboard", icon: "\u{1F4CA}" }]
    },
    {
      section: "Admin Panel",
      roles: ["super_admin", "admin"],
      items: [
        { label: "Overview", href: "/dashboard/admin", icon: "\u{1F9E0}" },
        { label: "Users", href: "/dashboard/admin/users", icon: "\u{1F465}" },
        { label: "System Logs", href: "/dashboard/admin/logs", icon: "\u{1F4DC}" }
      ]
    },
    {
      section: "Editorial Desk",
      roles: ["super_admin", "admin", "editor"],
      items: [
        { label: "All Articles", href: "/dashboard/editor", icon: "\u{1F4F0}" },
        { label: "Issues", href: "/dashboard/issues", icon: "\u{1F4C5}" }
      ]
    },
    {
      section: "Moderation",
      roles: ["super_admin", "admin", "moderator"],
      items: [
        { label: "Comments", href: "/dashboard/moderator", icon: "\u{1F4AC}" },
        {
          label: "Reports",
          href: "/dashboard/moderator/reports",
          icon: "\u{1F6A9}"
        }
      ]
    },
    {
      section: "My Content",
      roles: ["all"],
      // Everyone can create content
      items: [
        {
          label: "My Articles",
          href: "/dashboard/my-articles",
          icon: "\u{1F4DD}"
        },
        {
          label: "My Listings",
          href: "/dashboard/my-listings",
          icon: "\u{1F3E2}"
        },
        { label: "My Jobs", href: "/dashboard/my-jobs", icon: "\u{1F4BC}" },
        { label: "My Events", href: "/dashboard/my-events", icon: "\u{1F4C5}" },
        { label: "My Awards", href: "/dashboard/my-awards", icon: "\u{1F3C6}" }
      ]
    },
    {
      section: "Marketplace",
      roles: ["all"],
      items: [
        {
          label: "My Products",
          href: "/dashboard/my-products",
          icon: "\u{1F4E6}"
        },
        { label: "Inquiries", href: "/dashboard/inquiries", icon: "\u{1F4E9}" }
      ]
    },
    {
      section: "Create",
      roles: ["all"],
      items: [
        {
          label: "New Article",
          href: "/dashboard/articles/new",
          icon: "\u270D\uFE0F"
        },
        {
          label: "New Listing",
          href: "/dashboard/listings/new",
          icon: "\u2795"
        },
        {
          label: "New Job",
          href: "/dashboard/jobs/new",
          icon: "briefcase"
        },
        {
          label: "New Event",
          href: "/dashboard/events/new",
          icon: "calendar-plus"
        }
      ]
    },
    {
      section: "Account",
      roles: ["all"],
      items: [{ label: "Settings", href: "/dashboard/settings", icon: "\u2699\uFE0F" }]
    }
  ];
  allLinks.map((section) => ({
    ...section,
    visible: section.roles.includes("all") || section.roles.some((r) => r === role) || isSuperAdmin && section.roles.includes("super_admin")
  })).filter(
    (s) => s.visible || s.roles.includes("admin") && isAdmin || s.roles.includes("editor") && isEditor || s.roles.includes("moderator") && isModerator
  );
  const visibleSections = allLinks.filter((section) => {
    if (section.roles.includes("all")) return true;
    if (section.roles.includes(role)) return true;
    if (isAdmin && section.roles.includes("admin")) return true;
    if (isSuperAdmin && section.roles.includes("super_admin")) return true;
    if (isEditor && section.roles.includes("editor")) return true;
    if (isModerator && section.roles.includes("moderator")) return true;
    return false;
  });
  return renderTemplate`<html lang="en" class="scroll-smooth" data-astro-cid-kqx5um5x> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/images/logo-mini.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Paytone+One&display=swap" rel="stylesheet"><title>${title} | DR Dashboard</title>${renderHead()}</head> <body class="bg-gray-50 flex h-screen overflow-hidden text-primary-900 font-body" data-astro-cid-kqx5um5x> <!-- Sidebar --> <aside class="w-72 bg-primary-900 flex-shrink-0 flex flex-col hidden md:flex relative overflow-hidden transition-all duration-300" data-astro-cid-kqx5um5x> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" data-astro-cid-kqx5um5x></div> <!-- Logo --> <div class="h-24 flex items-center px-8 border-b border-white/10 relative z-10" data-astro-cid-kqx5um5x> <a href="/" class="flex items-center gap-3 group" data-astro-cid-kqx5um5x> <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary-600/20" data-astro-cid-kqx5um5x> <span class="text-white font-heading text-xl" data-astro-cid-kqx5um5x>D</span> </div> <div data-astro-cid-kqx5um5x> <span class="font-heading text-xl uppercase text-white tracking-wide block leading-none" data-astro-cid-kqx5um5x>Dental</span> <span class="font-heading text-sm uppercase text-primary-300 tracking-widest block leading-none" data-astro-cid-kqx5um5x>Reach</span> </div> </a> </div> <!-- Navigation --> <nav class="flex-grow p-6 space-y-8 overflow-y-auto relative z-10 custom-scrollbar" data-astro-cid-kqx5um5x> ${visibleSections.map((section) => renderTemplate`<div data-astro-cid-kqx5um5x> <div class="text-xs font-bold text-primary-300 uppercase tracking-widest mb-4 px-4 font-heading opacity-80 flex items-center justify-between" data-astro-cid-kqx5um5x> ${section.section} ${section.roles.includes("super_admin") && renderTemplate`<span class="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded" data-astro-cid-kqx5um5x>
ADMIN
</span>`} </div> <div class="space-y-2" data-astro-cid-kqx5um5x> ${section.items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${currentPath === item.href ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 translate-x-2" : "text-white/60 hover:bg-white/10 hover:text-white hover:translate-x-1"}`, "class")} data-astro-cid-kqx5um5x> <span class="text-lg opacity-80 min-w-[24px] text-center" data-astro-cid-kqx5um5x> ${item.icon} </span> ${item.label} </a>`)} </div> </div>`)} </nav> <!-- Footer --> <div class="p-6 border-t border-white/10 relative z-10 bg-primary-900/50 backdrop-blur-sm" data-astro-cid-kqx5um5x> <a href="/" class="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm mb-4 font-bold uppercase tracking-wide" data-astro-cid-kqx5um5x>
← Back to Site
</a> <button id="logout-btn" class="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-bold bg-white/5 px-4 py-3 rounded-xl w-full justify-center hover:bg-white/10 transition-all" data-astro-cid-kqx5um5x> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-kqx5um5x><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-astro-cid-kqx5um5x></path></svg>
Sign Out
</button> </div> </aside> <!-- Main Content --> <main class="flex-grow flex flex-col h-full overflow-hidden relative" data-astro-cid-kqx5um5x> <!-- Header --> <header class="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 shadow-sm z-20" data-astro-cid-kqx5um5x> <div class="flex items-center gap-4" data-astro-cid-kqx5um5x> <button class="md:hidden w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-primary-900" data-astro-cid-kqx5um5x> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-kqx5um5x><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-kqx5um5x></path></svg> </button> <h1 class="text-3xl font-heading uppercase text-primary-900 tracking-tight" data-astro-cid-kqx5um5x> ${title} </h1> </div> <div class="flex items-center gap-6" data-astro-cid-kqx5um5x> <!-- Notifications --> <div class="hidden md:block" data-astro-cid-kqx5um5x> ${renderComponent($$result, "NotificationBell", NotificationBell, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/ui/NotificationBell", "client:component-export": "default", "data-astro-cid-kqx5um5x": true })} </div> <!-- Profile --> <div class="flex items-center gap-3 pl-6 border-l border-gray-100" data-astro-cid-kqx5um5x> <div class="text-right hidden sm:block" data-astro-cid-kqx5um5x> <div class="font-bold text-primary-900 text-sm" data-astro-cid-kqx5um5x> ${profile?.full_name || user.email?.split("@")[0]} </div> <div class="text-[10px] text-primary-600 font-bold uppercase tracking-wider flex items-center justify-end gap-1" data-astro-cid-kqx5um5x> ${isSuperAdmin ? "\u{1F534} SUPER ADMIN" : role.replace("_", " ")} ${profile?.is_verified && "\u2713"} </div> </div> <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-900 to-primary-800 text-white flex items-center justify-center font-heading text-lg shadow-lg shadow-primary-900/20 cursor-pointer hover:scale-105 transition-transform overflow-hidden" data-astro-cid-kqx5um5x> ${profile?.avatar_url ? renderTemplate`<img${addAttribute(profile.avatar_url, "src")} alt="Profile" class="w-full h-full object-cover" data-astro-cid-kqx5um5x>` : renderTemplate`<span data-astro-cid-kqx5um5x> ${profile?.full_name?.[0] || "U"} </span>`} </div> </div> </div> </header> <!-- Content Area --> <div class="flex-grow overflow-y-auto p-6 md:p-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative" data-astro-cid-kqx5um5x> ${renderSlot($$result, $$slots["default"])} </div> </main> ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/layouts/DashboardLayout.astro?astro&type=script&index=0&lang.ts")} </body></html>`;
}, "/Users/rockson61/Downloads/DR Astro/src/layouts/DashboardLayout.astro", void 0);

export { $$DashboardLayout as $ };
