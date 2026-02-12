import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Store, MapPin, Phone, Globe, FileText, Check, Loader2 } from 'lucide-react';
import { a as createSupabaseBrowserClient } from './supabase_woKm2pOd.mjs';
import { G as GlassCard } from './GlassCard_B5fS4Hva.mjs';

const supabase = createSupabaseBrowserClient();
const LISTING_TYPES = [
  { value: "clinic", label: "Dental Clinic" },
  { value: "lab", label: "Dental Laboratory" },
  { value: "supplier", label: "Equipment Supplier" },
  { value: "education", label: "Training Institute" },
  { value: "other", label: "Other" }
];
const SERVICES_LIST = [
  "General Dentistry",
  "Orthodontics",
  "Implants",
  "Cosmetic",
  "Pediatric",
  "Oral Surgery",
  "Periodontics",
  "Endodontics",
  "Prosthodontics"
];
function ListingForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: initialData?.business_name || "",
    type: initialData?.type || "clinic",
    city: initialData?.address_json?.city || "",
    address: initialData?.address_json?.full_address || "",
    phone: initialData?.contact_phone || "",
    website: initialData?.website || "",
    description: initialData?.description || "",
    services: initialData?.amenities || [],
    // Assuming amenities column stores services array
    images: initialData?.gallery || []
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleServiceToggle = (service) => {
    const currentServices = formData.services || [];
    const newServices = currentServices.includes(service) ? currentServices.filter((s) => s !== service) : [...currentServices, service];
    setFormData({ ...formData, services: newServices });
  };
  const slugify = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const addressJson = {
        full_address: formData.address,
        city: formData.city,
        country: "India"
      };
      const payload = {
        business_name: formData.business_name,
        type: formData.type,
        description: formData.description,
        contact_phone: formData.phone,
        website: formData.website,
        address_json: addressJson,
        amenities: formData.services,
        gallery: formData.images,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      let error;
      if (initialData?.id) {
        const { error: updateError } = await supabase.from("listings").update(payload).eq("id", initialData.id);
        error = updateError;
      } else {
        const slug = `${slugify(formData.business_name)}-${Math.random().toString(36).substring(2, 7)}`;
        const { error: insertError } = await supabase.from("listings").insert({
          ...payload,
          slug,
          owner_id: user.id,
          is_verified: false,
          rating_avg: 0
        });
        error = insertError;
      }
      if (error) throw error;
      window.location.href = "/dashboard/my-listings";
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save listing");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(GlassCard, { className: "max-w-5xl mx-auto p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-tuio-navy uppercase flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Store, { className: "w-8 h-8 text-tuio-red" }),
          initialData ? "Edit Listing" : "Add New Listing"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: initialData ? "Update your business details." : "List your business in the dental directory." })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/dashboard/my-listings",
          className: "text-gray-400 font-bold hover:text-tuio-red transition-colors flex items-center gap-2 text-sm uppercase tracking-wide",
          children: "← Back"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white/50 p-6 rounded-2xl border border-gray-100", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-tuio-navy mb-4 border-b border-gray-100 pb-2", children: "Business Details" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Business Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "business_name",
                required: true,
                value: formData.business_name,
                onChange: handleChange,
                placeholder: "e.g. Smile Dental Clinic",
                className: "w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Type *" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  name: "type",
                  value: formData.type,
                  onChange: handleChange,
                  className: "w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all",
                  children: LISTING_TYPES.map((type) => /* @__PURE__ */ jsx("option", { value: type.value, children: type.label }, type.value))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "City *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "city",
                  required: true,
                  value: formData.city,
                  onChange: handleChange,
                  placeholder: "e.g. Mumbai",
                  className: "w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/50 p-6 rounded-2xl border border-gray-100", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-tuio-navy mb-4 border-b border-gray-100 pb-2", children: "Contact Information" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Full Address" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "absolute left-3 top-3.5 h-5 w-5 text-gray-400" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "address",
                  rows: 2,
                  value: formData.address,
                  onChange: handleChange,
                  className: "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all",
                  placeholder: "Full street address..."
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Phone" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-3.5 h-5 w-5 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    name: "phone",
                    value: formData.phone,
                    onChange: handleChange,
                    className: "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all",
                    placeholder: "+91..."
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Website" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(Globe, { className: "absolute left-3 top-3.5 h-5 w-5 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "url",
                    name: "website",
                    value: formData.website,
                    onChange: handleChange,
                    className: "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all",
                    placeholder: "https://..."
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/50 p-6 rounded-2xl border border-gray-100", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-tuio-navy mb-4 border-b border-gray-100 pb-2", children: "About & Services" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Description *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(FileText, { className: "absolute left-3 top-3.5 h-5 w-5 text-gray-400" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "description",
                  required: true,
                  rows: 5,
                  value: formData.description,
                  onChange: handleChange,
                  className: "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all",
                  placeholder: "Tell us about your business..."
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4", children: "Services Offered" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: SERVICES_LIST.map((service) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleServiceToggle(service),
                className: `px-4 py-2 rounded-full text-sm font-bold border transition-all flex items-center gap-2 ${formData.services.includes(service) ? "bg-tuio-navy text-white border-tuio-navy shadow-md" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`,
                children: [
                  formData.services.includes(service) && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3" }),
                  service
                ]
              },
              service
            )) })
          ] })
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
            "Saving..."
          ] }) : "Save Listing"
        }
      ) })
    ] })
  ] });
}

export { ListingForm as L };
