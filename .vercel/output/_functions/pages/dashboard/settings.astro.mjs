import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Settings;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Settings" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto animate-fade-in"> <div class="mb-10 flex items-center justify-between"> <div> <h2 class="text-3xl font-heading uppercase text-primary-900">
Account Settings
</h2> <p class="text-gray-500 mt-1">
Manage your profile and preferences.
</p> </div> <!-- Save Button Top (optional redundancy or main action) --> </div> <form class="space-y-8"> <!-- Profile Info --> <div class="glass-card bg-white"> <div class="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100"> <span class="text-2xl">👤</span> <h3 class="font-heading text-xl uppercase text-primary-900">
Profile Information
</h3> </div> <!-- Avatar --> <div class="flex items-center gap-8 mb-8"> <div class="relative group cursor-pointer"> <div class="w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-3xl shrink-0 overflow-hidden shadow-lg border-4 border-white"> ${profile?.avatar_url ? renderTemplate`<img${addAttribute(profile.avatar_url, "src")} alt="Avatar" class="w-full h-full object-cover">` : renderTemplate`<span>DR</span>`} </div> <div class="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold uppercase tracking-widest">
Change
</div> </div> <div> <h4 class="font-bold text-primary-900 text-lg"> ${profile?.full_name || "User"} </h4> <p class="text-xs text-gray-400 mb-3">
JPG, PNG up to 2MB
</p> <button type="button" class="px-5 py-2 text-sm bg-gray-100 text-primary-900 rounded-xl font-bold uppercase tracking-wide hover:bg-primary-600 hover:text-white transition-all shadow-sm">
Upload New Photo
</button> </div> </div> <div class="grid md:grid-cols-2 gap-8"> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label> <input type="text" name="full_name"${addAttribute(profile?.full_name || "", "value")} class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none transition-all"> </div> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Professional Title</label> <input type="text" name="title"${addAttribute(profile?.title || "", "value")} placeholder="e.g. General Dentist" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none transition-all"> </div> </div> <div class="mt-8 space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Bio</label> <textarea name="bio" rows="4" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none resize-none" placeholder="Tell the community about yourself...">${profile?.bio || ""}</textarea> </div> </div> <!-- Contact --> <div class="glass-card bg-white"> <div class="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100"> <span class="text-2xl">📞</span> <h3 class="font-heading text-xl uppercase text-primary-900">
Contact Information
</h3> </div> <div class="grid md:grid-cols-2 gap-8"> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label> <input type="email"${addAttribute(user.email, "value")} disabled class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed font-medium"> <p class="text-xs text-red-500 pl-1">
* Contact support to change email
</p> </div> <div class="space-y-2"> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Location</label> <input type="text" name="location"${addAttribute(profile?.location || "", "value")} placeholder="City, Country" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-primary-900 font-medium focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 focus:outline-none transition-all"> </div> </div> </div> <!-- Notifications --> <div class="glass-card bg-white"> <div class="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100"> <span class="text-2xl">🔔</span> <h3 class="font-heading text-xl uppercase text-primary-900">
Notifications
</h3> </div> <div class="space-y-4"> <label class="flex items-center justify-between p-5 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"> <div> <span class="font-bold text-primary-900 block text-lg">Email Notifications</span> <p class="text-sm text-gray-500">
Receive updates about your articles and listings
</p> </div> <div class="relative"> <input type="checkbox" name="email_notifications" checked class="peer sr-only"> <div class="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-primary-600"></div> </div> </label> <label class="flex items-center justify-between p-5 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"> <div> <span class="font-bold text-primary-900 block text-lg">Marketing Emails</span> <p class="text-sm text-gray-500">
Receive news about events and promotions
</p> </div> <div class="relative"> <input type="checkbox" name="marketing_emails" class="peer sr-only"> <div class="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-primary-600"></div> </div> </label> </div> </div> <!-- Actions --> <div class="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-200 md:static md:bg-transparent md:border-none md:p-0 flex justify-end z-40"> <button type="submit" class="w-full md:w-auto px-10 py-4 bg-primary-600 text-white rounded-full font-bold uppercase tracking-wide hover:bg-primary-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Save Changes
</button> </div> </form> <div class="mt-12 bg-red-50 rounded-[32px] p-8 border border-red-100"> <h3 class="font-heading text-xl uppercase text-red-600 mb-2">
Danger Zone
</h3> <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"> <p class="text-red-800/70 text-sm max-w-xl">
Once you delete your account, there is no going back. All
                    your data including articles, listings, and awards will be
                    permanently removed.
</p> <button type="button" class="px-6 py-3 border-2 border-red-200 text-red-500 rounded-xl font-bold uppercase text-sm tracking-wide hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
Delete Account
</button> </div> </div> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/settings.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/settings.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/settings.astro";
const $$url = "/dashboard/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Settings,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
