import { e as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, d as renderScript, r as renderComponent, ai as renderSlot, aj as renderHead } from './astro/server_DcquF9um.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { CheckCircle, Send, AlertCircle, Download, X } from 'lucide-react';
/* empty css                         */

const $$Astro$1 = createAstro("https://dentalreach.today");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const { currentPath = Astro2.url.pathname } = Astro2.props;
  const navLinks = [
    {
      label: "Explore",
      href: "#",
      megaMenu: [
        {
          section: "Content",
          items: [
            {
              label: "News",
              href: "/news",
              icon: "\u{1F4F0}",
              desc: "Latest industry updates"
            },
            {
              label: "Articles",
              href: "/articles",
              icon: "\u{1F4DD}",
              desc: "Clinical insights & research"
            },
            {
              label: "Guides",
              href: "/guides",
              icon: "\u{1F4DA}",
              desc: "How-to resources"
            },
            {
              label: "Podcasts",
              href: "/podcasts",
              icon: "\u{1F399}\uFE0F",
              desc: "Audio conversations"
            }
          ]
        },
        {
          section: "Community",
          items: [
            {
              label: "Directory",
              href: "/directory",
              icon: "\u{1F3E2}",
              desc: "Find clinics & labs"
            },
            {
              label: "Community",
              href: "/community",
              icon: "\u{1F465}",
              desc: "Connect with peers"
            },
            {
              label: "Events",
              href: "/events",
              icon: "\u{1F4C5}",
              desc: "Conferences & webinars"
            },
            {
              label: "Awards",
              href: "/awards",
              icon: "\u{1F3C6}",
              desc: "Recognition program"
            }
          ]
        }
      ]
    },
    { label: "Jobs", href: "/jobs" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="main-header"> <div class="glass-nav"> <div class="container mx-auto px-4"> <div class="h-20 flex items-center justify-between"> <!-- Logo --> <a href="/" class="flex items-center gap-3 group"> <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md"> <span class="text-white font-heading font-bold text-xl">D</span> </div> <span class="font-heading font-bold text-xl uppercase text-primary-900 hidden sm:block tracking-tight">DentalReach</span> </a> <!-- Desktop Navigation --> <nav class="hidden lg:flex items-center gap-2"> ${navLinks.map((link) => renderTemplate`<div class="relative group"> <a${addAttribute(link.href, "href")}${addAttribute(`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${currentPath === link.href ? "bg-primary-100 text-primary-700 font-bold" : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"}`, "class")}> ${link.label} ${link.megaMenu && renderTemplate`<svg class="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg>`} </a> ${link.megaMenu && renderTemplate`<div class="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2"> <div class="glass-card p-6 min-w-[480px] grid grid-cols-2 gap-6 border border-gray-100"> ${link.megaMenu.map((section) => renderTemplate`<div> <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4"> ${section.section} </h4> <div class="space-y-2"> ${section.items.map(
    (item) => renderTemplate`<a${addAttribute(
      item.href,
      "href"
    )} class="flex items-start gap-3 p-3 rounded-xl hover:bg-primary-50 transition-colors group/item"> <span class="text-xl"> ${item.icon} </span> <div> <span class="font-bold text-gray-700 group-hover/item:text-primary-600 transition-colors"> ${item.label} </span> <p class="text-xs text-gray-500"> ${item.desc} </p> </div> </a>`
  )} </div> </div>`)} </div> </div>`} </div>`)} </nav> <!-- Right Side --> <div class="flex items-center gap-3"> <!-- Search --> <a href="/search" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </a> <!-- Login/Dashboard --> <a href="/login" class="hidden sm:flex btn-primary uppercase tracking-wide text-sm font-bold shadow-none hover:shadow-md">
Login
</a> <!-- Mobile Menu Toggle --> <button id="mobile-menu-toggle" class="lg:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24" id="menu-icon"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <svg class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="close-icon"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> </div> </div> <!-- Mobile Menu -->
/* Wait, I already did this in Footer above, but this seems to be Header? No,
    this is Footer context? */ /* Ah, I am replacing multiple files. */ /* Header
    mobile menu */
<div id="mobile-menu" class="lg:hidden hidden bg-white border-t border-gray-100 h-screen"> <div class="container mx-auto px-4 py-6 space-y-4"> ${navLinks.map((link) => renderTemplate`<div> ${link.megaMenu ? renderTemplate`<div class="space-y-2"> <span class="text-gray-400 text-sm font-bold uppercase tracking-widest"> ${link.label} </span> <div class="grid grid-cols-2 gap-2"> ${link.megaMenu.map(
    (section) => section.items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-colors"> <span>${item.icon}</span> <span class="text-sm font-medium"> ${item.label} </span> </a>`)
  )} </div> </div>` : renderTemplate`<a${addAttribute(link.href, "href")} class="block py-3 text-gray-700 font-medium hover:text-primary-600 transition-colors"> ${link.label} </a>`} </div>`)} <a href="/login" class="block w-full text-center py-3 rounded-full btn-primary uppercase tracking-wide">
Login
</a> </div> </div> </header> <!-- Spacer for fixed header --> <div class="h-20"></div> ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/components/Header.astro", void 0);

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Subscription failed");
      setStatus("success");
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          placeholder: "Enter your email",
          required: true,
          disabled: status === "loading" || status === "success",
          className: "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: status === "loading" || status === "success",
          className: "absolute right-1 top-1 bottom-1 bg-primary-500 text-white px-3 rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center",
          children: status === "loading" ? /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-tuio-navy border-t-transparent rounded-full animate-spin" }) : status === "success" ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
        }
      )
    ] }),
    status === "error" && /* @__PURE__ */ jsxs("p", { className: "text-xs text-red-400 flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
      " ",
      message
    ] }),
    status === "success" && /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-400 flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
      " ",
      message
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Join 10,000+ dental professionals. No spam, ever." })
  ] });
}

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "News", href: "/news" },
        { label: "Articles", href: "/articles" },
        { label: "Guides", href: "/guides" },
        { label: "Podcasts", href: "/podcasts" },
        { label: "Events", href: "/events" }
      ]
    },
    {
      title: "Community",
      links: [
        { label: "Directory", href: "/directory" },
        { label: "Forums", href: "/community" },
        { label: "Awards", href: "/awards" },
        { label: "Jobs", href: "/jobs" },
        { label: "Leaderboard", href: "/community#leaderboard" }
      ]
    },
    {
      title: "Marketplace",
      links: [
        { label: "Products", href: "/products" },
        { label: "Become a Seller", href: "/become-seller" },
        { label: "Brand Ambassadors", href: "/brand-ambassador" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" }
      ]
    }
  ];
  const socialLinks = [
    { label: "Twitter", href: "#", icon: "\u{1D54F}" },
    { label: "LinkedIn", href: "#", icon: "in" },
    { label: "Instagram", href: "#", icon: "\u{1F4F7}" },
    { label: "YouTube", href: "#", icon: "\u25B6\uFE0F" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-primary-900 text-white relative overflow-hidden font-body"> <!-- Wave Pattern --> <div class="absolute top-0 left-0 right-0 h-24 bg-primary-50" style="clip-path: ellipse(70% 100% at 50% 0%);"></div> <div class="container mx-auto px-4 pt-32 pb-12 relative z-10"> <!-- Main Footer --> <div class="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16"> <!-- Brand Section --> <div class="lg:col-span-2"> <a href="/" class="flex items-center gap-3 mb-6"> <div class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg"> <span class="text-white font-heading font-bold text-2xl">D</span> </div> <span class="font-heading font-bold text-2xl uppercase tracking-tight">DentalReach</span> </a> <p class="text-primary-100/80 font-light mb-6 leading-relaxed">
Empowering dental professionals worldwide with education,
                    community, and innovation.
</p> <!-- Newsletter --> <div class="bg-white/5 rounded-[24px] p-6 border border-white/10 backdrop-blur-sm"> <h4 class="font-heading font-bold text-lg uppercase mb-4 text-primary-200">
Stay Updated
</h4> ${renderComponent($$result, "NewsletterForm", NewsletterForm, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/newsletter/NewsletterForm", "client:component-export": "default" })} </div> </div> <!-- Link Sections --> ${footerSections.map((section) => renderTemplate`<div> <h4 class="font-heading font-bold text-sm uppercase tracking-widest text-primary-300 mb-6"> ${section.title} </h4> <ul class="space-y-3"> ${section.links.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-primary-100/70 hover:text-white hover:translate-x-1 transition-all inline-block"> ${link.label} </a> </li>`)} </ul> </div>`)} </div> <!-- Divider --> <div class="h-px bg-gradient-to-r from-transparent via-primary-800 to-transparent mb-8"></div> <!-- Bottom Bar --> <div class="flex flex-col md:flex-row items-center justify-between gap-6"> <!-- Copyright --> <p class="text-primary-100/50 text-sm text-center md:text-left">
© ${currentYear} DentalReach. All rights reserved. Made with ❤️ for
                dentists worldwide.
</p> <!-- Social Links --> <div class="flex items-center gap-4"> ${socialLinks.map((social) => renderTemplate`<a${addAttribute(social.href, "href")}${addAttribute(social.label, "title")} class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-200 hover:bg-primary-600 hover:text-white hover:scale-110 transition-all border border-white/5"> ${social.icon} </a>`)} </div> </div> </div> <!-- Floating Decorations --> <div class="absolute bottom-20 left-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div> <div class="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div> </footer>`;
}, "/Users/rockson61/Downloads/DR Astro/src/components/Footer.astro", void 0);

const $$BackToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="back-to-top" class="fixed bottom-8 right-8 w-14 h-14 bg-tuio-red text-white rounded-full shadow-lg hover:bg-tuio-navy hover:shadow-xl transition-all duration-300 flex items-center justify-center opacity-0 pointer-events-none z-50 transform translate-y-4" aria-label="Back to top" data-astro-cid-wlspcwf4> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-wlspcwf4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" data-astro-cid-wlspcwf4></path> </svg> </button>  ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/components/BackToTop.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/components/BackToTop.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Toast = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<div id="toast-container" class="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none"></div> <script>
    window.showToast = function(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        
        // Color schemes
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-amber-500',
            info: 'bg-tuio-navy'
        };
        
        const icons = {
            success: '\u2713',
            error: '\u2715',
            warning: '\u26A0',
            info: '\u2139'
        };
        
        toast.className = \`\${colors[type] || colors.info} text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 transform translate-x-full opacity-0 transition-all duration-300 pointer-events-auto max-w-sm\`;
        toast.innerHTML = \`
            <span class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold">\${icons[type] || icons.info}</span>
            <span class="font-medium">\${message}</span>
        \`;
        
        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
        });
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    };
<\/script>`], ["", `<div id="toast-container" class="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none"></div> <script>
    window.showToast = function(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        
        // Color schemes
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-amber-500',
            info: 'bg-tuio-navy'
        };
        
        const icons = {
            success: '\u2713',
            error: '\u2715',
            warning: '\u26A0',
            info: '\u2139'
        };
        
        toast.className = \\\`\\\${colors[type] || colors.info} text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 transform translate-x-full opacity-0 transition-all duration-300 pointer-events-auto max-w-sm\\\`;
        toast.innerHTML = \\\`
            <span class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold">\\\${icons[type] || icons.info}</span>
            <span class="font-medium">\\\${message}</span>
        \\\`;
        
        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
        });
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    };
<\/script>`])), maybeRenderHead());
}, "/Users/rockson61/Downloads/DR Astro/src/components/Toast.astro", void 0);

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-primary-900 text-white p-4 rounded-xl shadow-2xl z-50 flex items-center gap-4 animate-fade-in-up border border-primary-500/20", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white/10 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Download, { className: "w-6 h-6 text-primary-500" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm", children: "Install DentalReach" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-300", children: "Add to home screen for faster access." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleInstall,
          className: "px-3 py-1.5 bg-primary-500 text-white text-xs font-bold rounded-lg hover:bg-primary-600 transition-colors",
          children: "Install"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsVisible(false),
          className: "p-1 hover:bg-white/10 rounded-full transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
}

const $$Astro = createAstro("https://dentalreach.today");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "DentalReach - Connecting Dentistry Globally",
    image = "/images/logo-full.png"
  } = Astro2.props;
  new URL(Astro2.url.pathname, Astro2.site);
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/images/logo-mini.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#0F172A"><link rel="apple-touch-icon" href="/icons/pwa-192x192.png"><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Feed Autodiscovery --><link rel="alternate" type="application/rss+xml" title="DentalReach Magazine RSS" href="/rss.xml"><link rel="alternate" type="application/xml" title="DentalReach Articles Feed (JATS)" href="/articles-feed.xml"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}><title>${title}</title>${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="flex flex-col min-h-screen bg-white text-neutral-900 font-body"> <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-md font-bold shadow-lg">
Skip to content
</a> ${renderComponent($$result, "Header", $$Header, { "currentPath": Astro2.url.pathname })} <main id="main-content" class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderComponent($$result, "BackToTop", $$BackToTop, {})} ${renderComponent($$result, "Toast", $$Toast, {})} ${renderComponent($$result, "InstallPrompt", InstallPrompt, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/pwa/InstallPrompt", "client:component-export": "default" })} </body></html>`;
}, "/Users/rockson61/Downloads/DR Astro/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
