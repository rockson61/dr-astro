import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_B_rgsWHr.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CYzxA37O.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: inquiries } = await supabase.from("inquiries").select(`
        *,
        product:products(name, slug, images),
        buyer:profiles(full_name, email, avatar_url)
    `).eq("seller_id", user.id).order("created_at", { ascending: false });
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Inquiries & Messages" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in max-w-5xl mx-auto"> <div class="mb-10"> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
Inquiries
</h2> <p class="text-gray-500 mt-1">
Messages from potential buyers.
</p> </div> ${inquiries && inquiries.length > 0 ? renderTemplate`<div class="space-y-4"> ${inquiries.map((inquiry) => renderTemplate`<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden"> ${inquiry.status === "new" && renderTemplate`<div class="absolute top-0 right-0 w-3 h-3 bg-tuio-red rounded-full m-4 ring-4 ring-white"></div>`} <div class="flex flex-col md:flex-row gap-6"> <!-- Product Context --> <div class="w-full md:w-64 flex-shrink-0"> <div class="flex items-center gap-3 mb-2"> <img${addAttribute(inquiry.product?.images?.[0] || "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800", "src")}${addAttribute(inquiry.product?.name, "alt")} class="w-12 h-12 rounded-lg object-cover bg-gray-100"> <div> <a${addAttribute(`/products/${inquiry.product?.slug}`, "href")} class="text-sm font-bold text-tuio-navy hover:text-tuio-red line-clamp-1"> ${inquiry.product?.name} </a> <span class="text-xs text-gray-400"> ${formatDate(inquiry.created_at)} </span> </div> </div> <div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50"> <div class="w-8 h-8 rounded-full bg-tuio-bg text-tuio-navy flex items-center justify-center text-xs font-bold uppercase"> ${inquiry.buyer?.full_name?.[0] || "U"} </div> <div class="flex-1 min-w-0"> <p class="text-sm font-bold text-gray-900 truncate"> ${inquiry.buyer?.full_name || "Unknown User"} </p> <a${addAttribute(`mailto:${inquiry.buyer?.email}`, "href")} class="text-xs text-gray-500 hover:text-tuio-red truncate block"> ${inquiry.buyer?.email} </a> </div> </div> </div> <!-- Message Content --> <div class="flex-1 bg-gray-50 rounded-xl p-5 relative"> <div class="absolute left-0 top-6 w-3 h-3 bg-gray-50 transform -translate-x-1.5 rotate-45 border-l border-b border-gray-100 hidden md:block"></div> <p class="text-gray-700 whitespace-pre-wrap leading-relaxed"> ${inquiry.message} </p> <div class="mt-4 flex justify-end gap-3"> <a${addAttribute(`mailto:${inquiry.buyer?.email}?subject=Re: Inquiry about ${inquiry.product?.name}`, "href")} class="px-5 py-2 bg-tuio-navy text-white text-sm font-bold rounded-full hover:bg-tuio-red transition-colors flex items-center gap-2" target="_blank"> <span>Reply via Email</span> <span class="text-xs opacity-70">↗</span> </a> </div> </div> </div> </div>`)} </div>` : renderTemplate`<div class="bg-white rounded-3xl py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/30"> <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm opacity-50">
📬
</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2">
No messages yet
</h3> <p class="text-gray-500 max-w-md">
When interested buyers contact you about your products, their messages will appear here.
</p> </div>`} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/inquiries/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/inquiries/index.astro";
const $$url = "/dashboard/inquiries";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
