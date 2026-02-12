import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { s as supabase } from '../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let products = [];
  try {
    const { data } = await supabase.from("products").select("*, seller:profiles(full_name, avatar_url)").eq("status", "active").order("created_at", { ascending: false }).limit(50);
    if (data) products = data;
  } catch (e) {
    console.error("DB error", e);
  }
  if (!products || products.length === 0) {
    products = [
      {
        id: 1,
        name: "Intraoral Scanner Pro X5 (Demo)",
        slug: "scanner-pro-x5",
        price: 24999,
        image_url: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Equipment",
        seller: { full_name: "DentalTech Inc." }
      },
      {
        id: 2,
        name: "LED Curing Light Ultra (Demo)",
        slug: "led-curing-light",
        price: 299,
        image_url: "https://images.pexels.com/photos/4226263/pexels-photo-4226263.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Instruments",
        seller: { full_name: "MediDent Supplies" }
      }
    ];
  }
  const categories = [
    "All",
    "Equipment",
    "Instruments",
    "Materials",
    "Sterilization",
    "Implants"
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dental Products | Shop Equipment & Supplies" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-red text-white py-20 relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10 text-center"> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-tight">
Dental<br>Products
</h1> <p class="text-xl text-white/80 max-w-2xl mx-auto font-light">
Shop premium dental equipment, instruments, and supplies from
                verified sellers worldwide.
</p> </div> </section> <div class="bg-tuio-bg min-h-screen py-12"> <div class="container mx-auto px-4"> <!-- Category Filter --> <div class="flex flex-wrap gap-3 mb-10 justify-center"> ${categories.map((cat) => renderTemplate`<a${addAttribute(
    cat === "All" ? "/products" : `/products?category=${cat.toLowerCase()}`,
    "href"
  )}${addAttribute(`px-6 py-2 rounded-full font-bold uppercase tracking-wide text-sm transition-all ${cat === "All" ? "bg-tuio-navy text-white" : "bg-white text-tuio-navy hover:bg-tuio-red hover:text-white"}`, "class")}> ${cat} </a>`)} </div> <!-- Products Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${products.map((product) => renderTemplate`<a${addAttribute(`/products/${product.slug}`, "href")} class="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group block"> <div class="relative h-64 overflow-hidden"> <img${addAttribute(
    Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.image_url || "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
    "src"
  )}${addAttribute(product.name, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"> <span class="absolute top-4 left-4 bg-tuio-navy text-white px-4 py-1 rounded-full text-xs font-bold uppercase"> ${product.category} </span> </div> <div class="p-8"> <p class="text-gray-400 text-sm mb-2 uppercase tracking-widest"> ${product.seller?.full_name || "Seller"} </p> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-4 leading-tight group-hover:text-tuio-red transition-colors"> ${product.name} </h3> <div class="flex items-center justify-between"> <span class="text-2xl font-tuio text-tuio-red">
$${product.price?.toLocaleString()} </span> <span class="w-12 h-12 bg-tuio-bg rounded-full flex items-center justify-center text-tuio-navy group-hover:bg-tuio-red group-hover:text-white transition-all">
🛒
</span> </div> </div> </a>`)} </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/products/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/products/index.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
