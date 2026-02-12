import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, ah as unescapeHTML } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_C_IiUpen.mjs';
import { formatDistanceToNow } from 'date-fns';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const mockTopic = {
    title: "Best Intraoral Scanner for 2026 practice?",
    author: "Dr. Mark S.",
    author_avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200",
    created_at: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 2).toISOString(),
    // 2 days ago
    content: `I'm looking to upgrade my digital workflow and deciding between the Medit i900 and the 3Shape Trios 5. 

  Our practice is 80% restorative and 20% implants. Speed and software integration are my top priorities. 
  
  Has anyone used both? What are your thoughts on the subscription models vs one-time purchase?`,
    replies: [
      {
        author: "Dr. Sarah J.",
        author_avatar: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200",
        content: "I switched to Trios 5 last month. The scanning speed is incredible, and the patient excitement tools are great for case acceptance.",
        created_at: new Date(
          Date.now() - 1e3 * 60 * 60 * 24
        ).toISOString(),
        likes: 12
      },
      {
        author: "Dr. Patel",
        content: "Medit has no subscription fees, which saves a lot in the long run. The software updates are free too.",
        created_at: new Date(Date.now() - 1e3 * 60 * 60 * 5).toISOString(),
        likes: 8
      }
    ],
    views: 1205,
    category: "Technology"
  };
  const displayTopic = mockTopic;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${displayTopic.title} | DentalReach Community` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gray-50 min-h-screen py-12"> <div class="container mx-auto px-4 max-w-4xl"> <div class="mb-6"> <a href="/community" class="text-gray-500 hover:text-tuio-red font-bold flex items-center gap-2">
← Back to Discussions
</a> </div> <!-- Main Topic --> <div class="bg-white rounded-[24px] p-8 shadow-sm mb-8 border border-gray-200"> <div class="flex gap-4 mb-6"> <img${addAttribute(displayTopic.author_avatar, "src")}${addAttribute(displayTopic.author, "alt")} class="w-12 h-12 rounded-full object-cover border border-gray-100"> <div> <h1 class="font-tuio text-2xl md:text-3xl text-tuio-navy mb-1"> ${displayTopic.title} </h1> <div class="text-sm text-gray-400 flex items-center gap-3"> <span class="font-bold text-gray-700">${displayTopic.author}</span> <span>•</span> <span>${formatDistanceToNow(
    new Date(displayTopic.created_at)
  )} ago</span> <span>•</span> <span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-bold uppercase">${displayTopic.category}</span> </div> </div> </div> <div class="prose prose-lg text-gray-700 max-w-none mb-8 leading-relaxed">${unescapeHTML(displayTopic.content.replace(/\n/g, "<br/>"))}</div> <div class="flex items-center gap-6 border-t border-gray-100 pt-6"> <button class="flex items-center gap-2 text-gray-500 hover:text-tuio-red transition-colors">
👍 Like
</button> <button class="flex items-center gap-2 text-gray-500 hover:text-tuio-red transition-colors">
💬 Reply
</button> <span class="ml-auto text-gray-400 text-sm"> ${displayTopic.views} Views
</span> </div> </div> <!-- Replies --> <h3 class="font-bold text-gray-400 uppercase tracking-widest text-sm mb-4 pl-4"> ${displayTopic.replies.length} Replies
</h3> <div class="space-y-4"> ${displayTopic.replies.map((reply) => renderTemplate`<div class="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 ml-4 md:ml-12"> <div class="flex gap-4 mb-4"> <img${addAttribute(
    reply.author_avatar || "/images/default-avatar.png",
    "src"
  )}${addAttribute(reply.author, "alt")} class="w-10 h-10 rounded-full object-cover border border-gray-100"> <div> <div class="flex items-center gap-2 mb-1"> <span class="font-bold text-gray-900"> ${reply.author} </span> <span class="text-xs text-gray-400"> ${formatDistanceToNow(
    new Date(reply.created_at)
  )}${" "}
ago
</span> </div> <div class="text-gray-600 leading-relaxed"> ${reply.content} </div> </div> </div> <div class="flex items-center gap-4 pl-14"> <button class="text-xs font-bold text-gray-400 hover:text-tuio-red flex items-center gap-1">
▲ ${reply.likes} Helpful
</button> <button class="text-xs font-bold text-gray-400 hover:text-tuio-red">
Reply
</button> </div> </div>`)} </div> <div class="mt-8 ml-4 md:ml-12 bg-gray-100 rounded-[24px] p-6 text-center"> <p class="text-gray-500 mb-4">
Join the conversation to post a reply.
</p> <a href="/login" class="inline-block px-8 py-3 bg-tuio-navy text-white rounded-full font-bold hover:bg-tuio-red transition-all">
Log In to Reply
</a> </div> </div> </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/community/topic/[slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/community/topic/[slug].astro";
const $$url = "/community/topic/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
