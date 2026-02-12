import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_woKm2pOd.mjs';
import { User, Activity, FileText, CheckCircle } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const supabase = createSupabaseServerClient(Astro2);
  const { data: caseStudy, error } = await supabase.from("clinical_cases").select("*, author:profiles(full_name, avatar_url, job_title)").eq("slug", slug).single();
  if (error || !caseStudy) {
    return Astro2.redirect("/404");
  }
  const steps = [
    {
      title: "Chief Complaint",
      icon: User,
      content: caseStudy.chief_complaint
    },
    { title: "Diagnosis", icon: Activity, content: caseStudy.diagnosis },
    {
      title: "Treatment Plan",
      icon: FileText,
      content: caseStudy.treatment_plan
    },
    {
      title: "Execution",
      icon: CheckCircle,
      content: caseStudy.procedure_details
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${caseStudy.title} | Clinical Case` }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="bg-tuio-navy text-white pt-32 pb-20 relative overflow-hidden"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <span class="bg-tuio-red text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
Clinical Case Study
</span> <h1 class="text-3xl md:text-5xl font-tuio uppercase mb-6 leading-tight max-w-4xl"> ${caseStudy.title} </h1> <div class="flex items-center gap-6 mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-2xl"> <img${addAttribute(caseStudy.author?.avatar_url || `https://ui-avatars.com/api/?name=${caseStudy.author?.full_name}&background=random`, "src")} class="w-16 h-16 rounded-full border-2 border-tuio-red"> <div> <div class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
Presented By
</div> <div class="font-tuio text-xl"> ${caseStudy.author?.full_name} </div> <div class="text-sm text-gray-300"> ${caseStudy.author?.job_title || "Dental Professional"} </div> </div> </div> </div> </div> <div class="bg-gray-50 min-h-screen py-12"> <div class="container mx-auto px-4"> <div class="grid lg:grid-cols-12 gap-12">  <div class="hidden lg:block lg:col-span-3"> <div class="sticky top-32 space-y-4"> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"> <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-4">
Case Overview
</h3>  <div class="space-y-3 text-sm"> <div class="flex justify-between border-b border-gray-50 pb-2"> <span class="text-gray-500">Age</span> <span class="font-bold text-tuio-navy">${caseStudy.patient_age}</span> </div> <div class="flex justify-between border-b border-gray-50 pb-2"> <span class="text-gray-500">Gender</span> <span class="font-bold text-tuio-navy">${caseStudy.gender}</span> </div> </div> </div> </div> </div>  <div class="lg:col-span-9 space-y-12">  ${caseStudy.pre_op_images?.length > 0 && renderTemplate`<section> <h2 class="text-2xl font-tuio uppercase text-tuio-navy mb-6 flex items-center gap-3"> <span class="w-8 h-8 rounded-full bg-tuio-red text-white flex items-center justify-center text-sm font-bold">
1
</span>
Pre-Operative Assessment
</h2> <div class="grid md:grid-cols-2 gap-4"> ${caseStudy.pre_op_images.map(
    (img) => renderTemplate`<img${addAttribute(img, "src")} class="rounded-2xl shadow-md w-full h-64 object-cover hover:scale-[1.02] transition-transform">`
  )} </div> </section>`}  <div class="space-y-8"> ${steps.map(
    (step, index) => step.content && renderTemplate`<div class="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 relative overflow-hidden group hover:border-tuio-red/30 transition-colors"> <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">  </div> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-4 flex items-center gap-3"> ${renderComponent($$result2, "step.icon", step.icon, { "className": "w-6 h-6 text-tuio-red" })} ${step.title} </h3> <div class="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line"> ${step.content} </div> </div>`
  )} </div>  ${caseStudy.post_op_images?.length > 0 && renderTemplate`<section> <h2 class="text-2xl font-tuio uppercase text-tuio-navy mb-6 flex items-center gap-3"> <span class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
✓
</span>
Final Result
</h2> <div class="grid md:grid-cols-2 gap-4"> ${caseStudy.post_op_images.map(
    (img) => renderTemplate`<img${addAttribute(img, "src")} class="rounded-2xl shadow-md w-full h-64 object-cover hover:scale-[1.02] transition-transform">`
  )} </div> </section>`}  ${caseStudy.conclusion && renderTemplate`<div class="bg-tuio-navy text-white p-8 rounded-[32px] shadow-lg"> <h3 class="font-tuio text-xl uppercase mb-4">
Conclusion & Discussion
</h3> <p class="leading-relaxed opacity-90"> ${caseStudy.conclusion} </p> </div>`} </div> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/cases/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/cases/[slug].astro";
const $$url = "/cases/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
