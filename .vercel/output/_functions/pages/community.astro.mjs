import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../chunks/supabase_CFYPoMlB.mjs';
import { formatDistanceToNow } from 'date-fns';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const supabase = createSupabaseServerClient(Astro2);
  const categories = [
    { id: "clinical", title: "Clinical Cases", description: "Discuss complex treatments and patient outcomes.", count: 42, icon: "\u{1F9B7}" },
    { id: "tech", title: "Dental Technology", description: "Reviews and tips on scanners, printers, and software.", count: 18, icon: "\u{1F4BB}" },
    { id: "business", title: "Practice Management", description: "Marketing, staffing, and finance strategies.", count: 35, icon: "\u{1F4C8}" },
    { id: "student", title: "Student Corner", description: "Study tips, career advice, and networking.", count: 56, icon: "\u{1F393}" }
  ];
  const { data: threads } = await supabase.from("threads").select("*, profiles(full_name, avatar_url)").order("created_at", { ascending: false }).limit(5);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Community Forums" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-tuio-red py-20 text-center text-white relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-tight">
DentalReach<br>Community
</h1> <p class="text-white/80 max-w-2xl mx-auto mb-10 text-lg font-light">Join the conversation with thousands of dental professionals worldwide.</p> <a href="/community/new" class="px-10 py-4 bg-white text-tuio-red rounded-full font-bold hover:bg-tuio-navy hover:text-white transition-all shadow-xl uppercase tracking-wide">Start New Discussion</a> </div> </section> <div class="bg-tuio-bg min-h-screen container mx-auto px-4 py-12"> <div class="grid lg:grid-cols-3 gap-8"> <!-- Main Content --> <div class="lg:col-span-2 space-y-10"> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-6">Discussion Categories</h2> <div class="grid md:grid-cols-2 gap-6"> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/community/c/${cat.id}`, "href")} class="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-transparent hover:border-tuio-red"> <div class="flex items-start gap-6"> <div class="text-4xl bg-tuio-bg w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"> ${cat.icon} </div> <div> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-2 group-hover:text-tuio-red transition-colors">${cat.title}</h3> <p class="text-sm text-gray-500 mb-3 font-light">${cat.description}</p> <span class="text-xs font-bold text-tuio-red bg-tuio-red/10 px-3 py-1 rounded-full">${cat.count} threads</span> </div> </div> </a>`)} </div> </div> <div> <h2 class="text-3xl font-tuio uppercase text-tuio-navy mb-6">Recent Discussions</h2> <div class="bg-white rounded-[32px] overflow-hidden shadow-sm"> ${threads && threads.length > 0 ? renderTemplate`<div class="divide-y divide-gray-100"> ${threads.map((thread) => renderTemplate`<div class="p-8 hover:bg-tuio-bg transition-colors"> <div class="flex items-start gap-6"> <img${addAttribute(thread.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${thread.profiles?.full_name}&background=FF0180&color=fff`, "src")}${addAttribute(thread.profiles?.full_name, "alt")} class="w-14 h-14 rounded-full bg-gray-200 shrink-0"> <div class="flex-grow"> <h3 class="font-tuio text-xl uppercase text-tuio-navy mb-2"> <a${addAttribute(`/community/t/${thread.slug}`, "href")} class="hover:text-tuio-red transition-colors"> ${thread.title} </a> </h3> <p class="text-gray-500 mb-4 line-clamp-1 font-light">${thread.excerpt || "No preview available."}</p> <div class="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-wider"> <span>By ${thread.profiles?.full_name}</span> <span>• ${formatDistanceToNow(new Date(thread.created_at))} ago</span> <span class="text-tuio-red">• ${thread.category}</span> </div> </div> </div> </div>`)} </div>` : renderTemplate`<div class="p-16 text-center"> <div class="text-6xl mb-6">💬</div> <h3 class="font-tuio text-2xl text-tuio-navy mb-2">No discussions yet</h3> <p class="text-gray-500">Be the first to start a conversation!</p> </div>`} </div> </div> </div> <!-- Sidebar --> <aside class="space-y-8"> <div class="bg-tuio-navy text-white p-8 rounded-[32px]"> <h3 class="font-tuio text-xl uppercase mb-6">Community Rules</h3> <ul class="space-y-4 text-sm text-gray-300 font-light"> <li class="flex items-start gap-3"><span class="text-tuio-red">✓</span> Be respectful to colleagues.</li> <li class="flex items-start gap-3"><span class="text-tuio-red">✓</span> Patient anonymity is mandatory (HIPAA).</li> <li class="flex items-start gap-3"><span class="text-tuio-red">✓</span> No self-promotion in clinical threads.</li> </ul> </div> </aside> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/community/index.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/community/index.astro";
const $$url = "/community";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
