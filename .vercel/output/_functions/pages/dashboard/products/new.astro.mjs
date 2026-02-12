import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_DL6NAmdh.mjs';
import { c as createSupabaseServerClient } from '../../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const categories = [
    "Equipment",
    "Instruments",
    "Materials",
    "Software",
    "Services",
    "Other"
  ];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "List New Product" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto animate-fade-in"> <div class="mb-10 flex items-center justify-between"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
List New Product
</h2> <p class="text-gray-500 mt-1">
Add a new item to your marketplace store.
</p> </div> <a href="/dashboard/my-products" class="text-gray-400 font-bold hover:text-tuio-red transition-colors flex items-center gap-2 text-sm uppercase tracking-wide">
← Back to My Products
</a> </div> <form class="space-y-8"> <!-- Basic Info --> <div class="tuio-card"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">📦</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Product Details
</h3> </div> <div class="space-y-6"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Product Name</label> <input type="text" name="name" required class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-bold text-lg focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all placeholder:font-normal" placeholder="e.g. Ultra-Light Curing Light"> </div> <div class="grid md:grid-cols-2 gap-8"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Category</label> <div class="relative"> <select name="category" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none appearance-none cursor-pointer"> ${categories.map((cat) => renderTemplate`<option${addAttribute(cat, "value")}>${cat}</option>`)} </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
▼
</div> </div> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Price ($)</label> <input type="number" name="price" min="0" step="0.01" required class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-bold focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="0.00"> </div> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Description</label> <textarea name="description" rows="5" required class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none resize-none" placeholder="Describe your product features and specifications..."></textarea> </div> </div> </div> <!-- Image Upload (Simple URL for now, could be improved with storage upload) --> <div class="tuio-card"> <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100"> <span class="text-2xl">📸</span> <h3 class="font-tuio text-xl uppercase text-tuio-navy">
Product Image
</h3> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">Image URL</label> <input type="url" name="image_url" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none transition-all" placeholder="https://example.com/image.jpg"> <p class="text-xs text-gray-400 mt-2 pl-1">
For this demo, please provide a direct image URL.
</p> </div> </div> <!-- Actions --> <div class="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-200 md:static md:bg-transparent md:border-none md:p-0 flex justify-end z-40"> <button type="submit" class="px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
Create Product
</button> </div> </form> </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/products/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/products/new.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/products/new.astro";
const $$url = "/dashboard/products/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$New,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
