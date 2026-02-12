import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$MyEvents = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyEvents;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: events } = await supabase.from("events").select("id, title, slug, status, start_date, location_name, is_virtual").eq("organizer_id", user.id).order("start_date", { ascending: true });
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "My Events" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
My Events
</h2> <p class="text-gray-500 mt-1">
Manage your upcoming webinars and conferences.
</p> </div> <a href="/dashboard/events/new" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"> <span>+ Create Event</span> </a> </div> ${events && events.length > 0 ? renderTemplate`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> ${events.map((event) => renderTemplate`<div class="tuio-card group !p-6 hover:border-tuio-red/50 border border-transparent transition-all flex flex-col h-full"> <div class="flex justify-between items-start mb-4"> <span${addAttribute(`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${event.status === "upcoming" ? "bg-green-100 text-green-700" : event.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"}`, "class")}> ${event.status} </span> <span class="text-xs font-bold text-gray-400 uppercase tracking-wider"> ${event.is_virtual ? "Virtual" : "In-Person"} </span> </div> <h3 class="text-xl font-bold text-tuio-navy mb-2 group-hover:text-tuio-red transition-colors"> <a${addAttribute(`/events/${event.slug}`, "href")}> ${event.title} </a> </h3> <div class="text-sm text-gray-500 font-medium mb-auto"> <div class="flex items-center gap-2 mb-1">
📅${" "} ${new Date(
    event.start_date
  ).toLocaleDateString()} </div> <div class="flex items-center gap-2">
📍 ${event.location_name || "TBA"} </div> </div> <div class="grid grid-cols-2 gap-3 mt-6"> <a${addAttribute(`/events/${event.slug}`, "href")} class="text-center py-3 border border-gray-200 rounded-xl text-gray-600 hover:border-tuio-red hover:text-tuio-red transition-all text-sm font-bold uppercase tracking-wide">
View
</a> <a${addAttribute(`/dashboard/events/edit/${event.id}`, "href")} class="text-center py-3 bg-gray-50 rounded-xl text-tuio-navy hover:bg-tuio-navy hover:text-white transition-all text-sm font-bold uppercase tracking-wide">
Edit
</a> </div> </div>`)} </div>` : renderTemplate`<div class="tuio-card py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/30"> <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
📅
</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2">
No events found
</h3> <p class="text-gray-500 max-w-md mb-8">
Organizing a dental conference or webinar? Create an
                        event to reach our community.
</p> <a href="/dashboard/events/new" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Create Your First Event
</a> </div>`} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-events.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-events.astro";
const $$url = "/dashboard/my-events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MyEvents,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
