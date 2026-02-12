import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
import { Bell, CheckCheck, MessageCircle, User, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Notifications = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Notifications;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: notifications, error } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(50);
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Notifications" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"> <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"> <h2 class="font-tuio uppercase text-lg text-tuio-navy flex items-center gap-2"> ${renderComponent($$result2, "Bell", Bell, { "className": "text-tuio-red" })} All Notifications
</h2> <button class="text-sm font-bold text-gray-500 hover:text-tuio-navy flex items-center gap-2"> ${renderComponent($$result2, "CheckCheck", CheckCheck, { "size": 16 })} Mark all as read
</button> </div> <div class="divide-y divide-gray-50"> ${notifications && notifications.length > 0 ? notifications.map((notif) => renderTemplate`<div${addAttribute(`p-6 hover:bg-gray-50 transition-colors flex gap-4 ${!notif.is_read ? "bg-blue-50/30" : ""}`, "class")}> <div${addAttribute(`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!notif.is_read ? "bg-tuio-red text-white" : "bg-gray-100 text-gray-400"}`, "class")}> ${notif.type === "comment" && renderTemplate`${renderComponent($$result2, "MessageCircle", MessageCircle, { "size": 18 })}`} ${notif.type === "follow" && renderTemplate`${renderComponent($$result2, "User", User, { "size": 18 })}`} ${notif.type === "achievement" && renderTemplate`${renderComponent($$result2, "Star", Star, { "size": 18 })}`} ${!["comment", "follow", "achievement"].includes(
    notif.type
  ) && renderTemplate`${renderComponent($$result2, "Bell", Bell, { "size": 18 })}`} </div> <div class="flex-grow"> <div class="flex justify-between items-start mb-1"> <h3 class="font-bold text-tuio-navy text-sm md:text-base"> ${notif.title} </h3> <span class="text-xs text-gray-400 whitespace-nowrap ml-2"> ${formatDistanceToNow(
    new Date(notif.created_at),
    { addSuffix: true }
  )} </span> </div> <p class="text-gray-600 text-sm mb-2"> ${notif.message} </p> ${notif.link && renderTemplate`<a${addAttribute(notif.link, "href")} class="text-tuio-red font-bold text-xs uppercase tracking-wide hover:underline">
View Details →
</a>`} </div> </div>`) : renderTemplate`<div class="p-12 text-center text-gray-400"> <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Bell", Bell, { "size": 32, "className": "opacity-30" })} </div> <p>You're all caught up! No new notifications.</p> </div>`} </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/notifications.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/notifications.astro";
const $$url = "/dashboard/notifications";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Notifications,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
