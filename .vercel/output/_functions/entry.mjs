import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DMPJjtfN.mjs';
import { manifest } from './manifest_BEQgS58U.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/account-banned.astro.mjs');
const _page4 = () => import('./pages/admin/articles.astro.mjs');
const _page5 = () => import('./pages/admin/awards.astro.mjs');
const _page6 = () => import('./pages/admin/events.astro.mjs');
const _page7 = () => import('./pages/admin/jobs.astro.mjs');
const _page8 = () => import('./pages/admin/listings.astro.mjs');
const _page9 = () => import('./pages/admin/users.astro.mjs');
const _page10 = () => import('./pages/admin.astro.mjs');
const _page11 = () => import('./pages/api/analytics/track.astro.mjs');
const _page12 = () => import('./pages/api/articles/create.astro.mjs');
const _page13 = () => import('./pages/api/articles.astro.mjs');
const _page14 = () => import('./pages/api/awards/automate.astro.mjs');
const _page15 = () => import('./pages/api/awards/recalculate.astro.mjs');
const _page16 = () => import('./pages/api/bookmarks.astro.mjs');
const _page17 = () => import('./pages/api/checkout.astro.mjs');
const _page18 = () => import('./pages/api/comments.astro.mjs');
const _page19 = () => import('./pages/api/contact.astro.mjs');
const _page20 = () => import('./pages/api/cron/generate-sitemaps.astro.mjs');
const _page21 = () => import('./pages/api/inquiries.astro.mjs');
const _page22 = () => import('./pages/api/newsletter/subscribe.astro.mjs');
const _page23 = () => import('./pages/api/newsletter.astro.mjs');
const _page24 = () => import('./pages/api/search.astro.mjs');
const _page25 = () => import('./pages/api/sitemap/regenerate.astro.mjs');
const _page26 = () => import('./pages/api/social/follow.astro.mjs');
const _page27 = () => import('./pages/api/social/like.astro.mjs');
const _page28 = () => import('./pages/api/supaproxy/_---path_.astro.mjs');
const _page29 = () => import('./pages/api/webhooks/stripe.astro.mjs');
const _page30 = () => import('./pages/articles/_slug_.astro.mjs');
const _page31 = () => import('./pages/articles.astro.mjs');
const _page32 = () => import('./pages/articles/_---slug_.astro.mjs');
const _page33 = () => import('./pages/articles-feed.xml.astro.mjs');
const _page34 = () => import('./pages/awards/nominate.astro.mjs');
const _page35 = () => import('./pages/awards/past-winners.astro.mjs');
const _page36 = () => import('./pages/awards/_slug_.astro.mjs');
const _page37 = () => import('./pages/awards.astro.mjs');
const _page38 = () => import('./pages/become-seller.astro.mjs');
const _page39 = () => import('./pages/brand-ambassador.astro.mjs');
const _page40 = () => import('./pages/cart.astro.mjs');
const _page41 = () => import('./pages/cases/_slug_.astro.mjs');
const _page42 = () => import('./pages/community/new.astro.mjs');
const _page43 = () => import('./pages/community/topic/_slug_.astro.mjs');
const _page44 = () => import('./pages/community.astro.mjs');
const _page45 = () => import('./pages/contact.astro.mjs');
const _page46 = () => import('./pages/dashboard/admin/logs.astro.mjs');
const _page47 = () => import('./pages/dashboard/admin/settings.astro.mjs');
const _page48 = () => import('./pages/dashboard/admin/users.astro.mjs');
const _page49 = () => import('./pages/dashboard/admin.astro.mjs');
const _page50 = () => import('./pages/dashboard/analytics.astro.mjs');
const _page51 = () => import('./pages/dashboard/articles/edit/_id_.astro.mjs');
const _page52 = () => import('./pages/dashboard/articles/new.astro.mjs');
const _page53 = () => import('./pages/dashboard/billing.astro.mjs');
const _page54 = () => import('./pages/dashboard/cases/edit/_id_.astro.mjs');
const _page55 = () => import('./pages/dashboard/cases/new.astro.mjs');
const _page56 = () => import('./pages/dashboard/editor.astro.mjs');
const _page57 = () => import('./pages/dashboard/events/edit/_id_.astro.mjs');
const _page58 = () => import('./pages/dashboard/events/new.astro.mjs');
const _page59 = () => import('./pages/dashboard/inquiries.astro.mjs');
const _page60 = () => import('./pages/dashboard/issues/edit/_id_.astro.mjs');
const _page61 = () => import('./pages/dashboard/issues/new.astro.mjs');
const _page62 = () => import('./pages/dashboard/issues.astro.mjs');
const _page63 = () => import('./pages/dashboard/jobs/edit/_id_.astro.mjs');
const _page64 = () => import('./pages/dashboard/jobs/new.astro.mjs');
const _page65 = () => import('./pages/dashboard/listings/edit/_id_.astro.mjs');
const _page66 = () => import('./pages/dashboard/listings/new.astro.mjs');
const _page67 = () => import('./pages/dashboard/moderator.astro.mjs');
const _page68 = () => import('./pages/dashboard/my-articles.astro.mjs');
const _page69 = () => import('./pages/dashboard/my-awards.astro.mjs');
const _page70 = () => import('./pages/dashboard/my-ce.astro.mjs');
const _page71 = () => import('./pages/dashboard/my-events.astro.mjs');
const _page72 = () => import('./pages/dashboard/my-jobs.astro.mjs');
const _page73 = () => import('./pages/dashboard/my-listings.astro.mjs');
const _page74 = () => import('./pages/dashboard/my-products.astro.mjs');
const _page75 = () => import('./pages/dashboard/notifications.astro.mjs');
const _page76 = () => import('./pages/dashboard/products/edit/_id_.astro.mjs');
const _page77 = () => import('./pages/dashboard/products/new.astro.mjs');
const _page78 = () => import('./pages/dashboard/quizzes/new.astro.mjs');
const _page79 = () => import('./pages/dashboard/saved-articles.astro.mjs');
const _page80 = () => import('./pages/dashboard/settings.astro.mjs');
const _page81 = () => import('./pages/dashboard.astro.mjs');
const _page82 = () => import('./pages/directory/_slug_.astro.mjs');
const _page83 = () => import('./pages/directory.astro.mjs');
const _page84 = () => import('./pages/directory/_---slug_.astro.mjs');
const _page85 = () => import('./pages/events/_slug_.astro.mjs');
const _page86 = () => import('./pages/events.astro.mjs');
const _page87 = () => import('./pages/faq.astro.mjs');
const _page88 = () => import('./pages/guides/_slug_.astro.mjs');
const _page89 = () => import('./pages/guides.astro.mjs');
const _page90 = () => import('./pages/issues/_slug_.astro.mjs');
const _page91 = () => import('./pages/issues.astro.mjs');
const _page92 = () => import('./pages/jobs/_slug_.astro.mjs');
const _page93 = () => import('./pages/jobs.astro.mjs');
const _page94 = () => import('./pages/leaderboard.astro.mjs');
const _page95 = () => import('./pages/login.astro.mjs');
const _page96 = () => import('./pages/marketplace.astro.mjs');
const _page97 = () => import('./pages/news.astro.mjs');
const _page98 = () => import('./pages/news-sitemap.xml.astro.mjs');
const _page99 = () => import('./pages/podcasts/_slug_.astro.mjs');
const _page100 = () => import('./pages/podcasts.astro.mjs');
const _page101 = () => import('./pages/pricing.astro.mjs');
const _page102 = () => import('./pages/privacy.astro.mjs');
const _page103 = () => import('./pages/products/_slug_.astro.mjs');
const _page104 = () => import('./pages/products.astro.mjs');
const _page105 = () => import('./pages/profile/_slug_.astro.mjs');
const _page106 = () => import('./pages/register.astro.mjs');
const _page107 = () => import('./pages/rss.xml.astro.mjs');
const _page108 = () => import('./pages/search.astro.mjs');
const _page109 = () => import('./pages/terms.astro.mjs');
const _page110 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/account-banned.astro", _page3],
    ["src/pages/admin/articles.astro", _page4],
    ["src/pages/admin/awards.astro", _page5],
    ["src/pages/admin/events.astro", _page6],
    ["src/pages/admin/jobs.astro", _page7],
    ["src/pages/admin/listings.astro", _page8],
    ["src/pages/admin/users.astro", _page9],
    ["src/pages/admin/index.astro", _page10],
    ["src/pages/api/analytics/track.ts", _page11],
    ["src/pages/api/articles/create.ts", _page12],
    ["src/pages/api/articles/index.ts", _page13],
    ["src/pages/api/awards/automate.ts", _page14],
    ["src/pages/api/awards/recalculate.ts", _page15],
    ["src/pages/api/bookmarks/index.ts", _page16],
    ["src/pages/api/checkout/index.ts", _page17],
    ["src/pages/api/comments/index.ts", _page18],
    ["src/pages/api/contact.ts", _page19],
    ["src/pages/api/cron/generate-sitemaps.ts", _page20],
    ["src/pages/api/inquiries/index.ts", _page21],
    ["src/pages/api/newsletter/subscribe.ts", _page22],
    ["src/pages/api/newsletter.ts", _page23],
    ["src/pages/api/search.ts", _page24],
    ["src/pages/api/sitemap/regenerate.ts", _page25],
    ["src/pages/api/social/follow.ts", _page26],
    ["src/pages/api/social/like.ts", _page27],
    ["src/pages/api/supaproxy/[...path].ts", _page28],
    ["src/pages/api/webhooks/stripe.ts", _page29],
    ["src/pages/articles/[slug].astro", _page30],
    ["src/pages/articles/index.astro", _page31],
    ["src/pages/articles/[...slug].astro", _page32],
    ["src/pages/articles-feed.xml.js", _page33],
    ["src/pages/awards/nominate.astro", _page34],
    ["src/pages/awards/past-winners.astro", _page35],
    ["src/pages/awards/[slug].astro", _page36],
    ["src/pages/awards/index.astro", _page37],
    ["src/pages/become-seller.astro", _page38],
    ["src/pages/brand-ambassador.astro", _page39],
    ["src/pages/cart.astro", _page40],
    ["src/pages/cases/[slug].astro", _page41],
    ["src/pages/community/new.astro", _page42],
    ["src/pages/community/topic/[slug].astro", _page43],
    ["src/pages/community/index.astro", _page44],
    ["src/pages/contact.astro", _page45],
    ["src/pages/dashboard/admin/logs.astro", _page46],
    ["src/pages/dashboard/admin/settings.astro", _page47],
    ["src/pages/dashboard/admin/users/index.astro", _page48],
    ["src/pages/dashboard/admin/index.astro", _page49],
    ["src/pages/dashboard/analytics.astro", _page50],
    ["src/pages/dashboard/articles/edit/[id].astro", _page51],
    ["src/pages/dashboard/articles/new.astro", _page52],
    ["src/pages/dashboard/billing.astro", _page53],
    ["src/pages/dashboard/cases/edit/[id].astro", _page54],
    ["src/pages/dashboard/cases/new.astro", _page55],
    ["src/pages/dashboard/editor/index.astro", _page56],
    ["src/pages/dashboard/events/edit/[id].astro", _page57],
    ["src/pages/dashboard/events/new.astro", _page58],
    ["src/pages/dashboard/inquiries/index.astro", _page59],
    ["src/pages/dashboard/issues/edit/[id].astro", _page60],
    ["src/pages/dashboard/issues/new.astro", _page61],
    ["src/pages/dashboard/issues/index.astro", _page62],
    ["src/pages/dashboard/jobs/edit/[id].astro", _page63],
    ["src/pages/dashboard/jobs/new.astro", _page64],
    ["src/pages/dashboard/listings/edit/[id].astro", _page65],
    ["src/pages/dashboard/listings/new.astro", _page66],
    ["src/pages/dashboard/moderator/index.astro", _page67],
    ["src/pages/dashboard/my-articles.astro", _page68],
    ["src/pages/dashboard/my-awards.astro", _page69],
    ["src/pages/dashboard/my-ce.astro", _page70],
    ["src/pages/dashboard/my-events.astro", _page71],
    ["src/pages/dashboard/my-jobs.astro", _page72],
    ["src/pages/dashboard/my-listings.astro", _page73],
    ["src/pages/dashboard/my-products.astro", _page74],
    ["src/pages/dashboard/notifications.astro", _page75],
    ["src/pages/dashboard/products/edit/[id].astro", _page76],
    ["src/pages/dashboard/products/new.astro", _page77],
    ["src/pages/dashboard/quizzes/new.astro", _page78],
    ["src/pages/dashboard/saved-articles.astro", _page79],
    ["src/pages/dashboard/settings.astro", _page80],
    ["src/pages/dashboard/index.astro", _page81],
    ["src/pages/directory/[slug].astro", _page82],
    ["src/pages/directory/index.astro", _page83],
    ["src/pages/directory/[...slug].astro", _page84],
    ["src/pages/events/[slug].astro", _page85],
    ["src/pages/events/index.astro", _page86],
    ["src/pages/faq.astro", _page87],
    ["src/pages/guides/[slug].astro", _page88],
    ["src/pages/guides/index.astro", _page89],
    ["src/pages/issues/[slug].astro", _page90],
    ["src/pages/issues/index.astro", _page91],
    ["src/pages/jobs/[slug].astro", _page92],
    ["src/pages/jobs/index.astro", _page93],
    ["src/pages/leaderboard.astro", _page94],
    ["src/pages/login.astro", _page95],
    ["src/pages/marketplace/index.astro", _page96],
    ["src/pages/news/index.astro", _page97],
    ["src/pages/news-sitemap.xml.js", _page98],
    ["src/pages/podcasts/[slug].astro", _page99],
    ["src/pages/podcasts/index.astro", _page100],
    ["src/pages/pricing.astro", _page101],
    ["src/pages/privacy.astro", _page102],
    ["src/pages/products/[slug].astro", _page103],
    ["src/pages/products/index.astro", _page104],
    ["src/pages/profile/[slug].astro", _page105],
    ["src/pages/register.astro", _page106],
    ["src/pages/rss.xml.js", _page107],
    ["src/pages/search.astro", _page108],
    ["src/pages/terms.astro", _page109],
    ["src/pages/index.astro", _page110]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "ebaaa806-7a97-44ea-9107-28274d0fdee4",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
