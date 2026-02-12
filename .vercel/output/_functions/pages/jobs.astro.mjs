import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CFYPoMlB.mjs';
import { formatDistanceToNow } from 'date-fns';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let jobs = [];
  try {
    const supabase = createSupabaseServerClient(Astro2);
    const { data } = await supabase.from("jobs").select("*").eq("is_active", true).order("created_at", { ascending: false });
    if (data) jobs = data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
  const displayJobs = jobs;
  const jobTypes = ["Full Time", "Part Time", "Contract", "Locum"];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dental Jobs | Career Opportunities" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-bg py-16 border-b border-gray-200"> <div class="container mx-auto px-4 text-center"> <h1 class="text-4xl md:text-6xl font-tuio uppercase mb-4 text-tuio-navy">
Find Your Next Role
</h1> <p class="text-gray-500 max-w-2xl mx-auto mb-8 text-lg font-light">
Connect with top dental clinics and labs hiring now.
</p> <div class="max-w-4xl mx-auto bg-tuio-navy p-4 rounded-[32px] flex flex-col md:flex-row gap-4 shadow-xl"> <input type="text" placeholder="Job title or keyword" class="flex-grow px-6 py-3 rounded-[24px] bg-white text-tuio-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tuio-red"> <input type="text" placeholder="City or State" class="md:w-1/3 px-6 py-3 rounded-[24px] bg-white text-tuio-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tuio-red"> <button class="px-8 py-3 bg-tuio-red text-white rounded-[24px] font-bold hover:bg-white hover:text-tuio-red transition-all">Search Jobs</button> </div> </div> </section> <div class="bg-tuio-bg min-h-screen container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8"> <!-- Sidebar Filters --> <aside class="w-full lg:w-72 shrink-0 space-y-6"> <div class="bg-white p-8 rounded-[32px] shadow-sm"> <h3 class="font-bold text-xl mb-6 font-tuio uppercase text-tuio-navy">
Job Type
</h3> <div class="space-y-3"> ${jobTypes.map((type) => renderTemplate`<label class="flex items-center gap-3 cursor-pointer group"> <div class="relative flex items-center"> <input type="checkbox" class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow transition-all checked:border-tuio-red checked:bg-tuio-red hover:shadow-md"> <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </span> </div> <span class="text-gray-600 group-hover:text-tuio-red transition-colors"> ${type} </span> </label>`)} </div> </div> </aside> <!-- Main Content --> <div class="flex-grow space-y-4"> ${displayJobs.length === 0 ? renderTemplate`<div class="bg-white p-12 rounded-[32px] text-center shadow-sm"> <div class="text-6xl mb-4">🔍</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2">
No Jobs Found
</h3> <p class="text-gray-500">
Check back later for new opportunities.
</p> </div>` : displayJobs.map((job) => renderTemplate`<div class="bg-white p-8 rounded-[32px] border border-transparent hover:border-tuio-red shadow-sm hover:shadow-lg transition-all group flex flex-col md:flex-row gap-6 items-center"> <div class="w-20 h-20 bg-tuio-bg rounded-2xl flex items-center justify-center text-2xl font-tuio text-tuio-red shrink-0 uppercase"> ${job.company_name.substring(0, 2)} </div> <div class="flex-grow text-center md:text-left"> <h3 class="font-tuio uppercase text-2xl text-tuio-navy group-hover:text-tuio-red transition-colors mb-1"> <a${addAttribute(`/jobs/${job.slug}`, "href")}> ${job.title} </a> </h3> <p class="text-gray-500 font-medium mb-3"> ${job.company_name} • ${job.location} </p> <div class="flex flex-wrap gap-3 justify-center md:justify-start"> ${job.type && renderTemplate`<span class="px-3 py-1 bg-tuio-red/10 text-tuio-red rounded-full text-xs font-bold uppercase tracking-wide"> ${job.type.replace("_", " ")} </span>`} <span class="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase tracking-wider"> ${formatDistanceToNow(
    new Date(job.created_at)
  )}${" "}
ago
</span> </div> </div> <div class="shrink-0"> <a${addAttribute(job.apply_url || `/jobs/${job.slug}`, "href")} class="px-8 py-3 bg-tuio-navy text-white rounded-full font-bold hover:bg-tuio-red transition-all shadow-md whitespace-nowrap">
Apply Now
</a> </div> </div>`)} </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/jobs/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/jobs/index.astro";
const $$url = "/jobs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
