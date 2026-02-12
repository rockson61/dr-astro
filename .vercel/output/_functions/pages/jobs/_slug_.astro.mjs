import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, ah as unescapeHTML } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { s as supabase } from '../../chunks/supabase_woKm2pOd.mjs';
import { format } from 'date-fns';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: job } = await supabase.from("jobs").select("*").eq("slug", slug).single();
  const mockJob = {
    title: "Senior Prosthodontist",
    company: {
      business_name: "Apollo Dental Care",
      logo_url: "https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?auto=compress&cs=tinysrgb&w=200"},
    location: "Mumbai, India",
    type: "full-time",
    salary_min: 15e4,
    salary_max: 2e5,
    salary_currency: "INR",
    experience_years: 5,
    description: `We are looking for an experienced Prosthodontist to join our growing team at Apollo Dental Care.

**Responsibilities:**
- Perform complex prosthodontic procedures including crowns, bridges, dentures, and implants
- Collaborate with other specialists for comprehensive patient care
- Mentor junior dentists and dental students
- Stay updated with latest techniques and technologies

**Requirements:**
- MDS in Prosthodontics from a recognized institution
- Minimum 5 years of clinical experience
- Strong communication and patient management skills
- Proficiency in CAD/CAM systems preferred

**We Offer:**
- Competitive salary with performance bonuses
- Health insurance for you and family
- Continuing education allowance
- Modern, well-equipped clinic
- Supportive team environment`,
    created_at: "2026-01-20T10:00:00Z",
    is_remote: false,
    benefits: [
      "Health Insurance",
      "Dental Coverage",
      "CME Allowance",
      "Performance Bonus"
    ]
  };
  const displayJob = job ? {
    ...job,
    company: {
      business_name: job.company_name,
      logo_url: job.logo_url,
      city: job.location?.split(",")[0]
    }
  } : mockJob;
  const postedDate = new Date(displayJob.created_at);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${displayJob.title} at ${displayJob.company?.business_name} | DentalReach Jobs` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-tuio-navy text-white py-12"> <div class="container mx-auto px-4"> <div class="flex flex-col md:flex-row items-center gap-6"> <div class="w-20 h-20 bg-white rounded-[16px] overflow-hidden shrink-0"> <img${addAttribute(displayJob.company?.logo_url || "/images/company-placeholder.png", "src")}${addAttribute(displayJob.company?.business_name, "alt")} class="w-full h-full object-cover"> </div> <div class="text-center md:text-left flex-grow"> <h1 class="text-3xl md:text-4xl font-tuio uppercase mb-2"> ${displayJob.title} </h1> <p class="text-tuio-red font-bold text-lg"> ${displayJob.company?.business_name} </p> <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-gray-400"> <span>📍 ${displayJob.location}</span> <span>💼 ${displayJob.type?.replace("-", " ").replace(
    /\b\w/g,
    (c) => c.toUpperCase()
  )}</span> ${displayJob.is_remote && renderTemplate`<span>🏠 Remote Available</span>`} </div> </div> <div class="shrink-0"> <a${addAttribute(`mailto:${displayJob.email || "careers@dentalreach.com"}?subject=Application for ${displayJob.title}&body=Dear Hiring Manager,%0D%0A%0D%0AI am writing to express my interest in the ${displayJob.title} position at ${displayJob.company?.business_name}.%0D%0A%0D%0A[Please attach your CV and cover letter]%0D%0A%0D%0ABest regards`, "href")} class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all inline-block">
Apply Now
</a> </div> </div> </div> </section> <div class="bg-tuio-bg py-12"> <div class="container mx-auto px-4"> <div class="grid lg:grid-cols-3 gap-8"> <!-- Main Content --> <div class="lg:col-span-2"> <div class="bg-white rounded-[32px] p-8 shadow-sm mb-8"> <h2 class="font-tuio text-2xl uppercase text-tuio-navy mb-6">
Job Description
</h2> <div class="prose prose-lg max-w-none text-gray-600 font-light">${unescapeHTML(displayJob.description?.replace(
    /\n/g,
    "<br/>"
  ))}</div> </div> </div> <!-- Sidebar --> <div class="lg:col-span-1 space-y-6"> <!-- Salary --> <div class="bg-white rounded-[32px] p-8 shadow-sm"> <h3 class="font-tuio text-lg uppercase text-tuio-navy mb-4">
Compensation
</h3> <div class="text-3xl font-tuio text-tuio-red mb-2"> ${displayJob.salary_currency} ${displayJob.salary_min?.toLocaleString()} - ${displayJob.salary_max?.toLocaleString()} </div> <p class="text-gray-500 text-sm">per month</p> </div> <!-- Details --> <div class="bg-white rounded-[32px] p-8 shadow-sm"> <h3 class="font-tuio text-lg uppercase text-tuio-navy mb-4">
Job Details
</h3> <div class="space-y-4 text-sm"> <div class="flex justify-between"> <span class="text-gray-500">Experience</span> <span class="font-bold text-tuio-navy">${displayJob.experience_years}+ years</span> </div> <div class="flex justify-between"> <span class="text-gray-500">Job Type</span> <span class="font-bold text-tuio-navy capitalize">${displayJob.type?.replace("-", " ")}</span> </div> <div class="flex justify-between"> <span class="text-gray-500">Posted</span> <span class="font-bold text-tuio-navy">${format(postedDate, "MMM d, yyyy")}</span> </div> </div> </div> <!-- Benefits --> ${displayJob.benefits && displayJob.benefits.length > 0 && renderTemplate`<div class="bg-white rounded-[32px] p-8 shadow-sm"> <h3 class="font-tuio text-lg uppercase text-tuio-navy mb-4">
Benefits
</h3> <div class="flex flex-wrap gap-2"> ${displayJob.benefits.map(
    (benefit) => renderTemplate`<span class="px-4 py-2 bg-tuio-bg rounded-full text-sm font-medium text-tuio-navy"> ${benefit} </span>`
  )} </div> </div>`} <!-- Apply CTA --> <div class="bg-tuio-navy rounded-[32px] p-8 text-center text-white"> <h3 class="font-tuio text-xl uppercase mb-4">
Ready to Apply?
</h3> <p class="text-gray-400 mb-6 text-sm">
Submit your application and we'll be in touch.
</p> <a${addAttribute(`mailto:${displayJob.email || "careers@dentalreach.com"}?subject=Application for ${displayJob.title}&body=Dear Hiring Manager,%0D%0A%0D%0AI am writing to express my interest in the ${displayJob.title} position at ${displayJob.company?.business_name}.%0D%0A%0D%0A[Please attach your CV and cover letter]%0D%0A%0D%0ABest regards`, "href")} class="w-full py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all block text-center">
Apply Now
</a> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/jobs/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/jobs/[slug].astro";
const $$url = "/jobs/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
