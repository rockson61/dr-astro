import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_C3fZcJHY.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$MyProducts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyProducts;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: products } = await supabase.from("products").select("*").eq("seller_id", user.id).order("created_at", { ascending: false });
  const statusColors = {
    active: "bg-green-100 text-green-700",
    draft: "bg-yellow-100 text-yellow-700",
    archived: "bg-gray-100 text-gray-700"
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "My Products" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy">
My Products
</h2> <p class="text-gray-500 mt-1">
Manage your marketplace listings and inventory.
</p> </div> <a href="/dashboard/products/new" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"> <span>+ List new item</span> </a> </div> ${products && products.length > 0 ? renderTemplate`<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"> <div class="overflow-x-auto"> <table class="w-full"> <thead class="bg-gray-50/50 border-b border-gray-100"> <tr> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Product
</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Category
</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Price
</th> <th class="text-left px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Status
</th> <th class="text-right px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
Actions
</th> </tr> </thead> <tbody class="divide-y divide-gray-50"> ${products.map((product) => renderTemplate`<tr class="hover:bg-gray-50 transition-colors group"> <td class="px-8 py-5"> <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0"> <img${addAttribute(
    product.images && product.images[0] || "/images/pattern.png",
    "src"
  )}${addAttribute(product.name, "alt")} class="w-full h-full object-cover"> </div> <div> <a${addAttribute(`/products/${product.slug}`, "href")} class="font-bold text-lg text-tuio-navy group-hover:text-tuio-red transition-colors block"> ${product.name} </a> <span class="text-xs text-gray-400">
Added${" "} ${new Date(
    product.created_at
  ).toLocaleDateString()} </span> </div> </div> </td> <td class="px-8 py-5"> <span class="text-sm font-medium text-gray-600"> ${product.category} </span> </td> <td class="px-8 py-5"> <span class="text-sm font-bold text-tuio-navy">
$
${product.price?.toLocaleString()} </span> </td> <td class="px-8 py-5"> <span${addAttribute(`text-xs font-bold uppercase px-3 py-1.5 rounded-full tracking-wide ${statusColors[product.status] || "bg-gray-100 text-gray-700"}`, "class")}> ${product.status} </span> </td> <td class="px-8 py-5 text-right"> <div class="flex justify-end gap-2"> <a${addAttribute(`/dashboard/products/edit/${product.id}`, "href")} class="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-tuio-red hover:text-tuio-red transition-all bg-white">
Edit
</a> <button data-delete-btn${addAttribute(product.id, "data-id")} class="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-red-400 hover:bg-red-50 hover:border-red-200 transition-all bg-white">
Delete
</button> </div> </td> </tr>`)} </tbody> </table> </div> </div>` : renderTemplate`<div class="bg-white rounded-3xl py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/30"> <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
🛍️
</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2">
No products listed
</h3> <p class="text-gray-500 max-w-md mb-8">
You haven't listed any products yet. Start selling your
                        equipment and supplies today.
</p> <a href="/dashboard/products/new" class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
List Your First Item
</a> </div>`} </div> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-products.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-products.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/my-products.astro";
const $$url = "/dashboard/my-products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MyProducts,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
