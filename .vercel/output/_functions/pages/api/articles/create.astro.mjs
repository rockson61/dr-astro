import { c as createSupabaseServerClient } from '../../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const formData = await request.json();
    const { title, content, category_id, excerpt, tags, image, doi, references, issue_id, type } = formData;
    if (!title || !content || !category_id) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    const slug = `${slugify(title)}-${Math.random().toString(36).substring(2, 7)}`;
    const { data, error } = await supabase.from("articles").insert({
      title,
      slug,
      category_id,
      content,
      excerpt,
      tags,
      image_url: image,
      // Assuming client handles upload and sends URL, or we need to handle upload here? 
      // In new.astro, it seems image upload wasn't fully implemented in the script provided (it had file input but logic was missing).
      // Let's assume for now the client sends a URL or null.
      doi,
      references,
      issue_id: issue_id || null,
      author_id: user.id,
      status: "published",
      // MVP: Auto-publish
      is_approved: true,
      type: type || "article",
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    }).select().single();
    if (error) throw error;
    try {
      const { awardPoints, POINTS } = await import('../../../chunks/gamification_DLIjRc8c.mjs');
      await awardPoints(user.id, "publish_article", POINTS.PUBLISH_ARTICLE, { article_id: data.id });
    } catch (pointError) {
      console.error("Error awarding points:", pointError);
    }
    return new Response(JSON.stringify({ success: true, article: data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
