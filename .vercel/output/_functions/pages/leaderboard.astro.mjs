import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BrSpvVaz.mjs';
import { R as ReputationBadge } from '../chunks/ReputationBadge_DzQywR8E.mjs';
import { F as FollowButton } from '../chunks/FollowButton_CwqJhlTW.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Leaderboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Leaderboard;
  const supabase = createSupabaseServerClient(Astro2);
  const { data: topUsers } = await supabase.from("profiles").select("id, full_name, avatar_url, reputation_points, badges, slug").order("reputation_points", { ascending: false }).limit(10);
  const { data: { user } } = await supabase.auth.getUser();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Community Leaderboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-tuio-navy py-20 text-white relative overflow-hidden"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="max-w-7xl mx-auto px-6 relative z-10 text-center"> <span class="text-tuio-red font-bold tracking-widest uppercase mb-4 block animate-fade-in-up">Community Legends</span> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 animate-fade-in-up delay-100">Leaderboard</h1> <p class="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-200">
Recognizing the top contributors who are shaping the future of dentistry.
</p> </div> </div> <div class="max-w-4xl mx-auto px-6 py-12 -mt-10 relative z-20"> <div class="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden"> ${topUsers && topUsers.length > 0 ? renderTemplate`<div class="divide-y divide-gray-100"> ${topUsers.map((profile, index) => renderTemplate`<div class="p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors group"> <div class="font-tuio text-3xl text-gray-300 w-8 text-center"> ${index + 1} </div> <a${addAttribute(`/profile/${profile.slug || profile.id}`, "href")} class="shrink-0"> <img${addAttribute(profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name}&background=random`, "src")}${addAttribute(profile.full_name, "alt")} class="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"> </a> <div class="flex-grow"> <h3 class="font-bold text-lg text-tuio-navy mb-1"> <a${addAttribute(`/profile/${profile.slug || profile.id}`, "href")} class="hover:text-tuio-red transition-colors"> ${profile.full_name} </a> </h3> ${renderComponent($$result2, "ReputationBadge", ReputationBadge, { "client:visible": true, "points": profile.reputation_points || 0, "badges": profile.badges || [], "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/gamification/ReputationBadge", "client:component-export": "default" })} </div> <div class="hidden md:block"> ${user && user.id !== profile.id && renderTemplate`${renderComponent($$result2, "FollowButton", FollowButton, { "client:visible": true, "targetUserId": profile.id, "targetUserName": profile.full_name, "initialIsFollowing": false, "Would": true, "need": true, "to": true, "fetch": true, "real": true, "status,": true, "implemented": true, "simplified": true, "for": true, "now": true, "client:component-hydration": "visible", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/social/FollowButton", "client:component-export": "default" })}`} </div> </div>`)} </div>` : renderTemplate`<div class="p-10 text-center text-gray-400">
No active users yet. Be the first!
</div>`} </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/leaderboard.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/leaderboard.astro";
const $$url = "/leaderboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Leaderboard,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
