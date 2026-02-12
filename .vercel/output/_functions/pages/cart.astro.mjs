import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Cart = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cart;
  const supabase = createSupabaseServerClient(Astro2);
  const { data: { user } } = await supabase.auth.getUser();
  const cartItems = [
    { id: 1, name: "Intraoral Scanner Pro X5", price: 24999, qty: 1, image: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { id: 2, name: "LED Curing Light Ultra", price: 299, qty: 2, image: "https://images.pexels.com/photos/4226263/pexels-photo-4226263.jpeg?auto=compress&cs=tinysrgb&w=200" }
  ];
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 0;
  const total = subtotal + shipping;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Shopping Cart | DentalReach" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-tuio-navy text-white py-12"> <div class="container mx-auto px-4"> <h1 class="text-4xl font-tuio uppercase">Shopping Cart</h1> </div> </section> <div class="bg-tuio-bg min-h-screen py-12"> <div class="container mx-auto px-4"> ${cartItems.length > 0 ? renderTemplate`<div class="grid lg:grid-cols-3 gap-8"> <!-- Cart Items --> <div class="lg:col-span-2 space-y-4"> ${cartItems.map((item) => renderTemplate`<div class="bg-white rounded-[24px] p-6 flex items-center gap-6 shadow-sm"> <div class="w-24 h-24 rounded-[16px] overflow-hidden shrink-0"> <img${addAttribute(item.image, "src")}${addAttribute(item.name, "alt")} class="w-full h-full object-cover"> </div> <div class="flex-grow"> <h3 class="font-tuio text-lg uppercase text-tuio-navy mb-1">${item.name}</h3> <p class="text-tuio-red font-bold">$${item.price.toLocaleString()}</p> </div> <div class="flex items-center gap-3"> <button class="w-8 h-8 bg-tuio-bg rounded-full flex items-center justify-center text-tuio-navy hover:bg-tuio-red hover:text-white transition-all">-</button> <span class="font-bold w-8 text-center">${item.qty}</span> <button class="w-8 h-8 bg-tuio-bg rounded-full flex items-center justify-center text-tuio-navy hover:bg-tuio-red hover:text-white transition-all">+</button> </div> <div class="font-tuio text-xl text-tuio-navy w-28 text-right">
$${(item.price * item.qty).toLocaleString()} </div> <button class="text-gray-400 hover:text-red-500 transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> </button> </div>`)} </div> <!-- Order Summary --> <div class="lg:col-span-1"> <div class="bg-white rounded-[24px] p-8 shadow-sm sticky top-8"> <h2 class="font-tuio text-xl uppercase text-tuio-navy mb-6">Order Summary</h2> <div class="space-y-4 mb-6"> <div class="flex justify-between text-gray-600"> <span>Subtotal</span> <span>$${subtotal.toLocaleString()}</span> </div> <div class="flex justify-between text-gray-600"> <span>Shipping</span> <span class="text-green-600 font-medium">FREE</span> </div> <div class="border-t border-gray-100 pt-4 flex justify-between font-tuio text-xl text-tuio-navy"> <span>Total</span> <span>$${total.toLocaleString()}</span> </div> </div> <button class="w-full py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all mb-4">
Proceed to Checkout
</button> <a href="/products" class="block text-center text-gray-500 hover:text-tuio-red transition-colors">
← Continue Shopping
</a> </div> </div> </div>` : renderTemplate`<div class="bg-white rounded-[32px] p-16 text-center shadow-sm max-w-2xl mx-auto"> <div class="text-6xl mb-6">🛒</div> <h2 class="font-tuio text-3xl uppercase text-tuio-navy mb-4">Your cart is empty</h2> <p class="text-gray-500 mb-8">Browse our marketplace to find premium dental products.</p> <a href="/products" class="inline-block px-10 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all">
Browse Products
</a> </div>`} </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/cart.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/cart.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Cart,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
