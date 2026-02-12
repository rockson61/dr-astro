import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dxh0pRbF.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
import { jsx } from 'react/jsx-runtime';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { L as LikeButton } from '../../chunks/LikeButton_ahGK-Lmi.mjs';
export { renderers } from '../../renderers.mjs';

function RichTextRenderer({ content }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true
      }),
      Link.configure({
        openOnClick: true,
        autolink: true
      })
    ],
    content,
    editable: false,
    // Read-only mode
    editorProps: {
      attributes: {
        class: "prose prose-lg dark:prose-invert max-w-none focus:outline-none"
      }
    }
  });
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ jsx(EditorContent, { editor });
}

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const supabase = createSupabaseServerClient(Astro2);
  if (!slug) {
    return Astro2.redirect("/404");
  }
  const { data: article, error } = await supabase.from("articles").select(
    `
    *,
    profiles:author_id (
      full_name,
      avatar_url,
      specialty,
      role
    ),
    categories:category_id (
      name,
      slug
    )
  `
  ).eq("slug", slug).single();
  if (error || !article) {
    console.error("Article fetch error:", error);
    return Astro2.redirect("/404");
  }
  const typedArticle = article;
  const isScholarly = typedArticle.is_scholarly;
  const title = typedArticle.meta_title || typedArticle.title;
  const description = typedArticle.meta_description || typedArticle.excerpt;
  const image = typedArticle.image_url;
  const { count: likesCount } = await supabase.from("article_likes").select("id", { count: "exact" }).eq("article_id", typedArticle.id);
  let isLiked = false;
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) {
    const { data: likeData } = await supabase.from("article_likes").select("id").match({ user_id: user.id, article_id: typedArticle.id }).single();
    if (likeData) isLiked = true;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "image": image }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="bg-neutral-50 dark:bg-neutral-900 min-h-screen pb-20"> <!-- Hero Section --> <div class="relative w-full h-[50vh] min-h-[400px]"> ${typedArticle.image_url && renderTemplate`<div class="absolute inset-0"> <img${addAttribute(typedArticle.image_url, "src")}${addAttribute(typedArticle.title, "alt")} class="w-full h-full object-cover"> <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent"></div> </div>`} <div class="container mx-auto px-4 relative h-full flex items-end pb-12 z-10"> <div class="max-w-4xl"> ${typedArticle.categories && renderTemplate`<span class="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-primary-600 text-white rounded-full"> ${typedArticle.categories.name} </span>`} <h1 class="text-4xl md:text-6xl text-white font-serif font-bold mb-4 leading-tight"> ${typedArticle.title} </h1> <div class="flex items-center gap-4 text-gray-300 mb-6"> ${typedArticle.profiles && renderTemplate`<div class="flex items-center gap-2"> ${typedArticle.profiles.avatar_url && renderTemplate`<img${addAttribute(
    typedArticle.profiles.avatar_url,
    "src"
  )}${addAttribute(
    typedArticle.profiles.full_name,
    "alt"
  )} class="w-10 h-10 rounded-full border border-white/20">`} <div> <span class="block font-medium text-white"> ${typedArticle.profiles.full_name} </span> <span class="text-xs opacity-75"> ${typedArticle.profiles.specialty} </span> </div> </div>`} ${renderComponent($$result2, "LikeButton", LikeButton, { "client:load": true, "articleId": typedArticle.id.toString(), "initialLikes": likesCount || 0, "initialIsLiked": isLiked, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/social/LikeButton", "client:component-export": "default" })} <div class="w-px h-8 bg-white/20"></div> <div> <span class="block text-sm">${format(
    new Date(typedArticle.created_at),
    "MMMM d, yyyy"
  )}</span> <span class="text-xs opacity-75">5 min read</span> </div> </div> </div> </div> </div> <div class="container mx-auto px-4 -mt-10 relative z-20"> <div class="flex flex-col lg:flex-row gap-8"> <!-- Sidebar (Metadata & Actions) --> <aside class="hidden lg:block w-64 shrink-0 space-y-6"> ${isScholarly && renderTemplate`<div class="glass-card p-6 rounded-lg sticky top-24"> <h3 class="font-bold text-primary-600 mb-4 uppercase text-xs tracking-wider">
Citation
</h3> ${typedArticle.doi && renderTemplate`<p class="text-xs text-gray-500 mb-3">
DOI: ${typedArticle.doi} </p>`} <button class="w-full btn-primary text-xs py-2 mb-2">
Cite Article
</button> <button class="w-full btn-primary bg-neutral-900 text-xs py-2">
Download PDF
</button> </div>`} <div class="glass-card p-6 rounded-lg"> <h3 class="font-bold text-gray-900 dark:text-white mb-2 text-sm">
Review Status
</h3> <div class="flex items-center gap-2"> <span class="w-2 h-2 bg-green-500 rounded-full"></span> <span class="text-sm">Peer Reviewed</span> </div> </div> </aside> <!-- Main Content --> <div class="flex-grow max-w-4xl bg-white dark:bg-black/50 rounded-lg shadow-xl p-8 md:p-12"> ${isScholarly && typedArticle.excerpt && renderTemplate`<div class="bg-neutral-50 dark:bg-white/5 p-6 rounded-lg border-l-4 border-accent mb-8 italic text-lg text-gray-700 dark:text-gray-300"> <strong>Abstract:</strong>${" "} ${typedArticle.excerpt} </div>`} <div class="rich-text-content"> ${renderComponent($$result2, "RichTextRenderer", RichTextRenderer, { "content": typedArticle.content, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/features/RichTextRenderer", "client:component-export": "default" })} </div>  ${isScholarly && typedArticle.references && renderTemplate`<div class="mt-12 pt-8 border-t border-gray-200 dark:border-white/10"> <h2 class="text-2xl font-serif font-bold mb-4">
References
</h2> <ol class="list-decimal pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400"> ${Array.isArray(typedArticle.references) && typedArticle.references.map(
    (ref, index) => renderTemplate`<li> ${ref.url ? renderTemplate`<a${addAttribute(ref.url, "href")} target="_blank" class="hover:underline"> ${ref.title} </a>` : ref.title} ${ref.year && renderTemplate`<span class="ml-1 text-gray-400">
(${ref.year})
</span>`} </li>`
  )} </ol> </div>`} </div> <!-- Right Column (Ads/Related) --> <div class="hidden xl:block w-72 shrink-0"> <div class="sticky top-24 space-y-6"> <div class="bg-gray-100 dark:bg-white/5 h-[300px] flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10"> <span class="text-xs uppercase tracking-widest text-gray-400">Ad Placement</span> </div> </div> </div> </div> </div> </article> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/articles/[...slug].astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/articles/[...slug].astro";
const $$url = "/articles/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
