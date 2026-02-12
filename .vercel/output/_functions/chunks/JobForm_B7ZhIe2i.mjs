import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Briefcase, Building2, MapPin, DollarSign, Globe, FileText, Loader2 } from 'lucide-react';
import { a as createSupabaseBrowserClient } from './supabase_CYzxA37O.mjs';
import { G as GlassCard } from './GlassCard_B5fS4Hva.mjs';

const supabase = createSupabaseBrowserClient();
const JOB_TYPES = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "locum", label: "Locum" },
  { value: "internship", label: "Internship" }
];
function JobForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    company_name: initialData?.company_name || "",
    location: initialData?.location || "",
    type: initialData?.type || "full_time",
    salary_min: initialData?.salary_min || "",
    salary_max: initialData?.salary_max || "",
    apply_url: initialData?.apply_url || "",
    description: initialData?.description || ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      let error;
      if (initialData?.id) {
        const { error: updateError } = await supabase.from("jobs").update({
          title: formData.title,
          company_name: formData.company_name,
          location: formData.location,
          type: formData.type,
          salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
          salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
          apply_url: formData.apply_url,
          description: formData.description,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", initialData.id);
        error = updateError;
      } else {
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).substring(2, 7);
        const { error: insertError } = await supabase.from("jobs").insert({
          title: formData.title,
          slug,
          company_name: formData.company_name,
          location: formData.location,
          type: formData.type,
          salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
          salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
          apply_url: formData.apply_url,
          description: formData.description,
          user_id: user.id,
          is_active: true
        });
        error = insertError;
      }
      if (error) throw error;
      window.location.href = "/dashboard/my-jobs";
    } catch (error) {
      console.error("Error saving job:", error);
      alert(error.message || "Failed to save job");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(GlassCard, { className: "max-w-4xl mx-auto p-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-tuio-navy mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(Briefcase, { className: "w-8 h-8 text-tuio-red" }),
      "Post a New Job"
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Job Title *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "title",
                required: true,
                value: formData.title,
                onChange: handleChange,
                placeholder: "e.g. Associate Dentist",
                className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Company Name *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Building2, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "company_name",
                required: true,
                value: formData.company_name,
                onChange: handleChange,
                placeholder: "My Dental Clinic",
                className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Location *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "location",
                required: true,
                value: formData.location,
                onChange: handleChange,
                placeholder: "e.g. New York, NY (or Remote)",
                className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Job Type *" }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
            "select",
            {
              name: "type",
              required: true,
              value: formData.type,
              onChange: handleChange,
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all appearance-none bg-white",
              children: JOB_TYPES.map((type) => /* @__PURE__ */ jsx("option", { value: type.value, children: type.label }, type.value))
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Salary Range (Optional)" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "salary_min",
                  value: formData.salary_min,
                  onChange: handleChange,
                  placeholder: "Min",
                  className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("span", { className: "self-center text-gray-400", children: "-" }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "salary_max",
                  value: formData.salary_max,
                  onChange: handleChange,
                  placeholder: "Max",
                  className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red outline-none"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Application Link / Email *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Globe, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "apply_url",
                required: true,
                value: formData.apply_url,
                onChange: handleChange,
                placeholder: "https://... or mailto:...",
                className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Job Description *" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(FileText, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "description",
              required: true,
              value: formData.description,
              onChange: handleChange,
              rows: 6,
              placeholder: "Describe the role, responsibilities, and requirements...",
              className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: "px-8 py-4 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2",
          children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
            "Publishing..."
          ] }) : "Post Job Now"
        }
      ) })
    ] })
  ] });
}

export { JobForm as J };
