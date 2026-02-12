import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$MyJobs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyJobs;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: jobs } = await supabase.from("jobs").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "My Jobs" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
My Job Listings
</h2> <p class="text-gray-500 mt-1">
Manage your job posts and track applicants.
</p> </div> <a href="/dashboard/jobs/new" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"> <span>+ Post New Job</span> </a> </div> ${jobs && jobs.length > 0 ? renderTemplate`<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"> <div class="overflow-x-auto"> <table class="w-full"> <thead class="bg-gray-50/50 border-b border-gray-100"> <tr> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Job Title
</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Location
</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Status
</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Posted
</th> <th class="text-right px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Actions
</th> </tr> </thead> <tbody class="divide-y divide-gray-50"> ${jobs.map((job) => renderTemplate`<tr class="hover:bg-gray-50 transition-colors group"> <td class="px-8 py-5"> <a${addAttribute(`/jobs/${job.slug}`, "href")} class="font-bold text-lg text-tuio-navy group-hover:text-tuio-red transition-colors block"> ${job.title} </a> <span class="text-xs text-gray-500 font-medium"> ${job.company_name} </span> </td> <td class="px-8 py-5"> <span class="text-sm text-gray-600 flex items-center gap-1">
📍 ${job.location} </span> <span${addAttribute(`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${job.type === "full_time" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`, "class")}> ${job.type?.replace("_", " ")} </span> </td> <td class="px-8 py-5"> <span${addAttribute(`text-xs font-bold uppercase px-3 py-1.5 rounded-full tracking-wide ${job.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`, "class")}> ${job.is_active ? "Active" : "Closed"} </span> </td> <td class="px-8 py-5 text-sm text-gray-500"> ${new Date(
    job.created_at
  ).toLocaleDateString()} </td> <td class="px-8 py-5 text-right"> <div class="flex justify-end gap-2"> <button data-toggle-btn${addAttribute(job.id, "data-id")}${addAttribute(String(
    job.is_active
  ), "data-active")} class="px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all bg-white"${addAttribute(
    job.is_active ? "Close Job" : "Reopen Job",
    "title"
  )}> ${job.is_active ? "Close" : "Reopen"} </button> <a${addAttribute(`/dashboard/jobs/edit/${job.id}`, "href")} class="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-tuio-red hover:text-tuio-red transition-all bg-white">
Edit
</a> <button data-delete-btn${addAttribute(job.id, "data-id")} class="px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-red-400 hover:bg-red-50 hover:border-red-200 transition-all bg-white">
✕
</button> </div> </td> </tr>`)} </tbody> </table> </div> </div>` : renderTemplate`<div class="bg-white rounded-3xl py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/30"> <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
💼
</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2">
No jobs posted
</h3> <p class="text-gray-500 max-w-md mb-8">
You haven't posted any job openings yet. Find the
                        perfect candidate for your practice.
</p> <a href="/dashboard/jobs/new" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Post Your First Job
</a> </div>`} </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-jobs.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-jobs.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-jobs.astro";
const $$url = "/dashboard/my-jobs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MyJobs,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
