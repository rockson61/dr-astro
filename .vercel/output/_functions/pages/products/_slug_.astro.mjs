import { e as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute, ah as unescapeHTML } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: product } = await supabase.from("products").select("*, seller:profiles(full_name, id)").eq("slug", slug).single();
  const mockProduct = {
    id: "mock-id",
    title: "Dental Chair X3000",
    name: "Dental Chair X3000",
    // Fallback for name/title
    category: "Equipment",
    price: 4500,
    rating: "4.8",
    description: `Experience the future of dental ergonomics...`,
    image_url: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
    seller: { full_name: "Apex Dental Supplies", id: "mock-seller" },
    specs: {
      Weight: "150kg",
      Power: "110V/220V"
    }
  };
  const displayProduct = product || mockProduct;
  const isOwnProduct = user && displayProduct.seller_id === user.id;
  const productName = displayProduct.name || displayProduct.title;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${productName} | DentalReach Marketplace` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gray-50 py-12"> <div class="container mx-auto px-4 max-w-6xl"> <!-- Breadcrumb --> <div class="mb-6 text-sm text-gray-500"> <a href="/" class="hover:text-tuio-red">Home</a> &gt;
<a href="/products" class="hover:text-tuio-red">Marketplace</a> &gt;
<span class="text-tuio-navy font-bold">${productName}</span> </div> <div class="grid md:grid-cols-2 gap-12 bg-white rounded-[32px] p-8 shadow-sm"> <!-- Image Gallery --> <div class="space-y-4"> <div class="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 p-8 flex items-center justify-center relative group"> <img${addAttribute(Array.isArray(displayProduct.images) && displayProduct.images.length > 0 ? displayProduct.images[0] : displayProduct.image_url || "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800", "src")}${addAttribute(productName, "alt")} class="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"> <div class="absolute top-4 left-4 bg-tuio-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"> ${displayProduct.category} </div> </div> </div> <!-- Product Info --> <div> <div class="flex items-center justify-between mb-4"> <div class="flex items-center gap-2 text-yellow-500"> ${"\u2605".repeat(
    Math.round(
      Number(displayProduct.rating || 4.8)
    )
  )} <span class="text-gray-400 text-sm">(${displayProduct.rating || "New"})</span> </div> <span class="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">${displayProduct.status === "draft" ? "Draft" : "In Stock"}</span> </div> <h1 class="font-tuio text-4xl text-tuio-navy mb-4"> ${productName} </h1> <div class="text-3xl font-bold text-tuio-red mb-6">
$${Number(displayProduct.price).toLocaleString()} </div> <div class="prose prose-sm text-gray-600 mb-8">${unescapeHTML(displayProduct.description?.replace(
    /\n/g,
    "<br/>"
  ))}</div> <div class="flex gap-4 mb-8 border-t border-b border-gray-100 py-6"> <div class="flex-1"> <!-- Placeholder for Cart (Future Phase) --> <button class="w-full py-4 bg-tuio-navy text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-red transition-all opacity-50 cursor-not-allowed" disabled title="Cart feature coming soon">
Add to Cart
</button> </div> <div class="flex-1"> ${isOwnProduct ? renderTemplate`<a${addAttribute(`/dashboard/products/edit/${displayProduct.id}`, "href")} class="w-full block text-center py-4 border-2 border-tuio-navy text-tuio-navy rounded-full font-bold uppercase tracking-wide hover:bg-gray-50 transition-all">
Edit Product
</a>` : renderTemplate`<button id="contact-seller-btn" class="w-full py-4 border-2 border-tuio-navy text-tuio-navy rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy hover:text-white transition-all">
Contact Seller
</button>`} </div> </div> <div> <h3 class="font-bold text-tuio-navy mb-3">
Specifications
</h3> <div class="grid grid-cols-2 gap-4 text-sm"> ${displayProduct.specs && Object.entries(displayProduct.specs).map(
    ([key, value]) => renderTemplate`<div class="flex justify-between border-b border-gray-100 pb-2"> <span class="text-gray-500"> ${key} </span> <span class="font-bold text-gray-900"> ${String(value)} </span> </div>`
  )} <div class="flex justify-between border-b border-gray-100 pb-2"> <span class="text-gray-500">Seller</span> <span class="font-bold text-gray-900"> ${displayProduct.seller?.full_name || "Verified Seller"} </span> </div> </div> </div> </div> </div> </div> </div>  <dialog id="contact-modal" class="backdrop:bg-black/50 rounded-3xl p-0 w-full max-w-lg shadow-2xl open:animate-fade-in"> <div class="p-8"> <div class="flex justify-between items-center mb-6"> <h3 class="font-tuio text-2xl uppercase text-tuio-navy">
Contact Seller
</h3> <button id="close-modal-btn" class="text-gray-400 hover:text-tuio-red text-2xl">&times;</button> </div> <form id="inquiry-form" class="space-y-6"> <input type="hidden" name="product_id"${addAttribute(displayProduct.id, "value")}> <input type="hidden" name="seller_id"${addAttribute(displayProduct.seller_id || displayProduct.seller?.id, "value")}> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
Product
</label> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"> <img${addAttribute(Array.isArray(displayProduct.images) && displayProduct.images.length > 0 ? displayProduct.images[0] : displayProduct.image_url || "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800", "src")} class="w-10 h-10 rounded-lg object-cover"> <span class="font-bold text-tuio-navy">${productName}</span> </div> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
Your Message
</label> <textarea name="message" required rows="4" class="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-tuio-navy font-medium focus:ring-4 focus:ring-tuio-red/20 focus:border-tuio-red focus:outline-none resize-none" placeholder="Hi, I'm interested in this item. Is it still available?"></textarea> </div> <div class="pt-2"> <button type="submit" class="w-full py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl transform active:scale-95">
Send Message
</button> </div> </form> </div> </dialog> ` })} ${renderScript($$result, "/Users/rockson61/Downloads/DR Astro/src/pages/products/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/products/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/products/[slug].astro";
const $$url = "/products/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
