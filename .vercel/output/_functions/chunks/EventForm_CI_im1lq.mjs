import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Calendar, Video, MapPin, Globe, FileText, Loader2 } from 'lucide-react';
import { a as createSupabaseBrowserClient } from './supabase_woKm2pOd.mjs';
import { G as GlassCard } from './GlassCard_B5fS4Hva.mjs';

const supabase = createSupabaseBrowserClient();
const EVENT_TYPES = [
  { value: "Conference", label: "Conference" },
  { value: "Webinar", label: "Webinar" },
  { value: "Workshop", label: "Workshop" },
  { value: "Seminar", label: "Seminar" },
  { value: "Congress", label: "Congress" }
];
function EventForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    type: initialData?.type || "Conference",
    start_date: initialData?.start_date ? new Date(initialData.start_date).toISOString().slice(0, 16) : "",
    end_date: initialData?.end_date ? new Date(initialData.end_date).toISOString().slice(0, 16) : "",
    location_name: initialData?.location_name || "",
    is_virtual: initialData?.is_virtual || false,
    registration_url: initialData?.registration_url || "",
    description: initialData?.description || ""
  });
  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      let error;
      if (initialData?.id) {
        const { error: updateError } = await supabase.from("events").update({
          title: formData.title,
          type: formData.type,
          start_date: formData.start_date,
          end_date: formData.end_date || null,
          location_name: formData.is_virtual ? "Virtual" : formData.location_name,
          is_virtual: formData.is_virtual,
          registration_url: formData.registration_url,
          description: formData.description,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", initialData.id);
        error = updateError;
      } else {
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).substring(2, 7);
        const { error: insertError } = await supabase.from("events").insert({
          title: formData.title,
          slug,
          type: formData.type,
          start_date: formData.start_date,
          end_date: formData.end_date || null,
          location_name: formData.is_virtual ? "Virtual" : formData.location_name,
          is_virtual: formData.is_virtual,
          registration_url: formData.registration_url,
          description: formData.description,
          organizer_id: user.id,
          status: "upcoming"
        });
        error = insertError;
      }
      if (error) throw error;
      window.location.href = "/dashboard/my-events";
    } catch (error) {
      console.error("Error saving event:", error);
      alert(error.message || "Failed to save event");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(GlassCard, { className: "max-w-4xl mx-auto p-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-tuio-navy mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(Calendar, { className: "w-8 h-8 text-tuio-red" }),
      "Create New Event"
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Event Title *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "title",
                required: true,
                value: formData.title,
                onChange: handleChange,
                placeholder: "e.g. Annual Dental Congress",
                className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Event Type *" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              name: "type",
              required: true,
              value: formData.type,
              onChange: handleChange,
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all bg-white",
              children: EVENT_TYPES.map((type) => /* @__PURE__ */ jsx("option", { value: type.value, children: type.label }, type.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Start Date *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              name: "start_date",
              required: true,
              value: formData.start_date,
              onChange: handleChange,
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "End Date (Optional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              name: "end_date",
              value: formData.end_date,
              onChange: handleChange,
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-gray-50 p-4 rounded-xl", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: "is_virtual",
            name: "is_virtual",
            checked: formData.is_virtual,
            onChange: handleChange,
            className: "w-5 h-5 text-tuio-red rounded focus:ring-tuio-red border-gray-300"
          }
        ),
        /* @__PURE__ */ jsxs("label", { htmlFor: "is_virtual", className: "font-bold text-gray-700 flex items-center gap-2 cursor-pointer select-none", children: [
          /* @__PURE__ */ jsx(Video, { className: "w-5 h-5 text-tuio-red" }),
          "This is a Virtual Event / Webinar"
        ] })
      ] }),
      !formData.is_virtual && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Location / Venue *" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "location_name",
              required: !formData.is_virtual,
              value: formData.location_name,
              onChange: handleChange,
              placeholder: "e.g. Jacob Javits Center, NYC",
              className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Registration Link *" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Globe, { className: "absolute left-3 top-3 h-5 w-5 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              name: "registration_url",
              required: true,
              value: formData.registration_url,
              onChange: handleChange,
              placeholder: "https://...",
              className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Event Details *" }),
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
              placeholder: "Describe the event, speakers, and agenda...",
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
            "creating..."
          ] }) : "Create Event"
        }
      ) })
    ] })
  ] });
}

export { EventForm as E };
