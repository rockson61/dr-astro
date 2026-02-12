import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/login");
  const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (adminProfile?.role !== "super_admin" && adminProfile?.role !== "admin") {
    return Astro2.redirect("/dashboard");
  }
  const search = Astro2.url.searchParams.get("search") || "";
  const roleFilter = Astro2.url.searchParams.get("role") || "all";
  let query = supabase.from("profiles").select("id, full_name, email, role, created_at, is_verified, avatar_url").order("created_at", { ascending: false });
  if (search) {
    query = query.ilike("full_name", `%${search}%`);
  }
  if (roleFilter !== "all") {
    query = query.eq("role", roleFilter);
  }
  const { data: users } = await query;
  const roles = [
    "all",
    "super_admin",
    "admin",
    "editor",
    "moderator",
    "author",
    "dentist",
    "student",
    "business"
  ];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "User Management" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in space-y-8"> <div class="flex flex-col md:flex-row justify-between items-center gap-4"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-2">
User Management
</h2> <p class="text-gray-500">
Manage roles, verification, and account status.
</p> </div> </div>  <div class="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4"> <form class="flex-grow flex gap-4"> <input type="text" name="search"${addAttribute(search, "value")} placeholder="Search by name..." class="flex-grow px-6 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-tuio-red"> <select name="role" class="px-6 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-tuio-red appearance-none" onchange="this.form.submit()"> ${roles.map((r) => renderTemplate`<option${addAttribute(r, "value")}${addAttribute(r === roleFilter, "selected")}> ${r.replace("_", " ").toUpperCase()} </option>`)} </select> <button type="submit" class="px-8 py-3 bg-tuio-navy text-white rounded-2xl font-bold hover:bg-tuio-red transition-colors">
Filter
</button> </form> </div>  <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"> <div class="overflow-x-auto"> <table class="w-full"> <thead class="bg-gray-50/50 border-b border-gray-100"> <tr> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">User</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Joined</th> <th class="text-right px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th> </tr> </thead> <tbody class="divide-y divide-gray-50"> ${users?.map((u) => renderTemplate`<tr class="hover:bg-gray-50 transition-colors"> <td class="px-8 py-4"> <div class="flex items-center gap-3"> <img${addAttribute(
    u.avatar_url || `https://ui-avatars.com/api/?name=${u.full_name}&background=random`,
    "src"
  )} class="w-10 h-10 rounded-full object-cover"${addAttribute(u.full_name, "alt")}> <div> <div class="font-bold text-tuio-navy"> ${u.full_name} </div> <div class="text-xs text-gray-400"> ${u.email} </div> </div> </div> </td> <td class="px-8 py-4"> <select data-role-select${addAttribute(u.id, "data-user-id")} class="text-xs font-bold uppercase bg-gray-100 border-none rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-200"> ${roles.filter((r) => r !== "all").map((r) => renderTemplate`<option${addAttribute(r, "value")}${addAttribute(r === u.role, "selected")}> ${r} </option>`)} </select> </td> <td class="px-8 py-4"> ${u.is_verified ? renderTemplate`<span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold">
Verified
</span>` : renderTemplate`<span class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-bold">
Unverified
</span>`} </td> <td class="px-8 py-4 text-sm text-gray-500"> ${new Date(
    u.created_at
  ).toLocaleDateString()} </td> <td class="px-8 py-4 text-right"> <button class="text-gray-400 hover:text-tuio-red font-bold text-sm"${addAttribute(`alert('Edit user ${u.full_name}')`, "onclick")} Placeholder for detailed edit modal>
Edit
</button> </td> </tr>`)} </tbody> </table> </div> </div> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/users/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/users/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/admin/users/index.astro";
const $$url = "/dashboard/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
