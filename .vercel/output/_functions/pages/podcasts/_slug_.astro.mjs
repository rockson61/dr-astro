import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, ah as unescapeHTML } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { s as supabase } from '../../chunks/supabase_CYzxA37O.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: podcast } = await supabase.from("podcasts").select("*").eq("slug", slug).single();
  const mockPodcast = {
    title: "Ep 42: The Future of AI in Dentistry",
    guest: "Dr. A. Smith",
    episode: "42",
    duration: "45 min",
    date: "Oct 10, 2026",
    description: `In this episode, we dive deep into the world of Artificial Intelligence and its growing role in modern dental practices. From automated diagnostics to treatment planning and patient communication, AI is here to stay.

  **Topics Discussed:**
  - AI in Radiography
  - Predictive Analytics for Patient Retention
  - Ethical Considerations
  - Future Trends in 2030`,
    image_url: "https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=800",
    spotify_link: "#",
    apple_link: "#"};
  const displayPodcast = podcast || mockPodcast;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${displayPodcast.title} | DentalReach Podcast` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-900 text-white min-h-[400px] relative overflow-hidden"> <div class="absolute inset-0 bg-[#0A0F1C] opacity-90"></div> <div class="container mx-auto px-4 py-16 relative z-10"> <div class="flex flex-col md:flex-row gap-12 items-center"> <!-- Artwork --> <div class="w-64 h-64 md:w-80 md:h-80 rounded-[32px] overflow-hidden shadow-2xl border border-white/10 shrink-0 relative group"> <img${addAttribute(displayPodcast.image_url, "src")}${addAttribute(displayPodcast.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"> <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div class="absolute bottom-4 left-4"> <span class="bg-tuio-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Episode ${displayPodcast.episode}</span> </div> </div> <!-- Info --> <div class="flex-1 text-center md:text-left"> <div class="flex items-center justify-center md:justify-start gap-4 mb-6 text-white/50 text-sm font-mono uppercase tracking-widest"> <span>📅 ${displayPodcast.date}</span> <span>•</span> <span>⏱ ${displayPodcast.duration}</span> </div> <h1 class="font-tuio text-4xl md:text-6xl mb-6 leading-tigher"> ${displayPodcast.title} </h1> <p class="text-xl text-white/70 mb-8 font-light">
Feat. <span class="text-white font-bold">${displayPodcast.guest}</span> </p> <div class="flex flex-wrap justify-center md:justify-start gap-4"> <button class="px-8 py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all flex items-center gap-2"> <span>▶</span> Play Now
</button> <a${addAttribute(displayPodcast.spotify_link, "href")} class="px-8 py-3 bg-[#1DB954] text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-all flex items-center gap-2">
Spotify
</a> <a${addAttribute(displayPodcast.apple_link, "href")} class="px-8 py-3 bg-white text-gray-900 rounded-full font-bold uppercase tracking-wide hover:bg-gray-200 transition-all flex items-center gap-2">
Apple
</a> </div> </div> </div> </div> </div>  <div class="bg-white py-16"> <div class="container mx-auto px-4 max-w-4xl"> <h2 class="font-tuio text-3xl text-tuio-navy mb-8 uppercase">
Show Notes
</h2> <div class="prose prose-lg text-gray-600 max-w-none font-light leading-relaxed">${unescapeHTML(displayPodcast.description?.replace(/\n/g, "<br/>"))}</div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/podcasts/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/podcasts/[slug].astro";
const $$url = "/podcasts/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
