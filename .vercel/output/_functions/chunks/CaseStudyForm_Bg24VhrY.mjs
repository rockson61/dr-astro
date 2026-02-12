import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { Activity, Plus, Trash2, Loader2, Save } from 'lucide-react';
import { a as createSupabaseBrowserClient } from './supabase_woKm2pOd.mjs';
import { G as GlassCard } from './GlassCard_B5fS4Hva.mjs';

const supabase = createSupabaseBrowserClient();
function CaseStudyForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    patient_age: initialData?.patient_age || "",
    gender: initialData?.gender || "Male",
    chief_complaint: initialData?.chief_complaint || "",
    medical_history: initialData?.medical_history || "",
    diagnosis: initialData?.diagnosis || "",
    treatment_plan: initialData?.treatment_plan || "",
    procedure_details: initialData?.procedure_details || "",
    conclusion: initialData?.conclusion || "",
    pre_op_images: initialData?.pre_op_images || [],
    post_op_images: initialData?.post_op_images || []
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addImage = (type) => {
    const url = prompt("Enter Image URL:");
    if (url) {
      setFormData({ ...formData, [type]: [...formData[type], url] });
    }
  };
  const removeImage = (type, index) => {
    const newImages = [...formData[type]];
    newImages.splice(index, 1);
    setFormData({ ...formData, [type]: newImages });
  };
  const slugify = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).substring(2, 7);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const payload = {
        ...formData,
        patient_age: parseInt(formData.patient_age) || 0,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      let error;
      if (initialData?.id) {
        const { error: updateError } = await supabase.from("clinical_cases").update(payload).eq("id", initialData.id);
        error = updateError;
      } else {
        const slug = slugify(formData.title);
        const { error: insertError } = await supabase.from("clinical_cases").insert({
          ...payload,
          slug,
          author_id: user.id,
          status: "draft"
        });
        error = insertError;
      }
      if (error) throw error;
      window.location.href = "/dashboard/my-articles";
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(GlassCard, { className: "max-w-4xl mx-auto p-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-tuio-navy mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Activity, { className: "text-tuio-red" }),
      initialData ? "Edit Clinical Case" : "Submit New Case Study"
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-400 uppercase text-xs tracking-widest border-b pb-2", children: "Case Information" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Case Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "title",
              required: true,
              value: formData.title,
              onChange: handleChange,
              className: "w-full px-4 py-3 rounded-xl border border-gray-200",
              placeholder: "e.g. Full Mouth Rehabilitation of a 60-year-old Patient"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-400 uppercase text-xs tracking-widest border-b pb-2", children: "Patient Details (Anonymized)" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Age" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "patient_age",
                value: formData.patient_age,
                onChange: handleChange,
                className: "w-full px-4 py-3 rounded-xl border border-gray-200"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Gender" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                name: "gender",
                value: formData.gender,
                onChange: handleChange,
                className: "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white",
                children: [
                  /* @__PURE__ */ jsx("option", { children: "Male" }),
                  /* @__PURE__ */ jsx("option", { children: "Female" }),
                  /* @__PURE__ */ jsx("option", { children: "Other" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Chief Complaint" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "chief_complaint",
              rows: 2,
              value: formData.chief_complaint,
              onChange: handleChange,
              className: "w-full px-4 py-3 rounded-xl border border-gray-200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Medical History" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "medical_history",
              rows: 2,
              value: formData.medical_history,
              onChange: handleChange,
              className: "w-full px-4 py-3 rounded-xl border border-gray-200"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-400 uppercase text-xs tracking-widest border-b pb-2", children: "Clinical Workflow" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Diagnosis" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "diagnosis",
              rows: 3,
              value: formData.diagnosis,
              onChange: handleChange,
              className: "w-full px-4 py-3 rounded-xl border border-gray-200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Treatment Plan" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "treatment_plan",
              rows: 3,
              value: formData.treatment_plan,
              onChange: handleChange,
              className: "w-full px-4 py-3 rounded-xl border border-gray-200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Procedure Details" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "procedure_details",
              rows: 5,
              value: formData.procedure_details,
              onChange: handleChange,
              className: "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-mono text-sm",
              placeholder: "Detailed step-by-step description..."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-400 uppercase text-xs tracking-widest border-b pb-2", children: "Clinical Images" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700", children: "Pre-Op Images" }),
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => addImage("pre_op_images"), className: "text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Plus, { size: 12 }),
                " Add URL"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              formData.pre_op_images.map((img, i) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("img", { src: img, className: "w-full h-32 object-cover rounded-lg border border-gray-200" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeImage("pre_op_images", i),
                    className: "absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 12 })
                  }
                )
              ] }, i)),
              formData.pre_op_images.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-8 bg-gray-50 rounded-lg text-gray-400 text-sm", children: "No images added" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700", children: "Post-Op Images" }),
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => addImage("post_op_images"), className: "text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Plus, { size: 12 }),
                " Add URL"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              formData.post_op_images.map((img, i) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("img", { src: img, className: "w-full h-32 object-cover rounded-lg border border-gray-200" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeImage("post_op_images", i),
                    className: "absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 12 })
                  }
                )
              ] }, i)),
              formData.post_op_images.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-8 bg-gray-50 rounded-lg text-gray-400 text-sm", children: "No images added" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-6 border-t border-gray-100", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: "px-8 py-4 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all flex items-center gap-2",
          children: [
            isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "w-5 h-5" }),
            "Save Case Study"
          ]
        }
      ) })
    ] })
  ] });
}

export { CaseStudyForm as C };
