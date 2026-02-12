import { c as createSupabaseServerClient } from '../../chunks/supabase_CYzxA37O.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401
    });
  }
  try {
    const formData = await request.json();
    const { article_id, content, parent_id } = formData;
    if (!article_id || !content) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400
      });
    }
    const { data, error } = await supabase.from("comments").insert({
      article_id,
      user_id: user.id,
      content,
      parent_id: parent_id || null,
      is_approved: true
      // Auto-approve for MVP
    }).select().single();
    if (error) throw error;
    try {
      const { awardPoints, POINTS } = await import('../../chunks/gamification_CjAkfkU_.mjs');
      await awardPoints(user.id, "comment", POINTS.COMMENT, { article_id, comment_id: data.id });
    } catch (pointError) {
      console.error("Error awarding points:", pointError);
    }
    try {
      const { data: articleData } = await supabase.from("articles").select("author_id, title, slug").eq("id", article_id).single();
      if (articleData && articleData.author_id !== user.id) {
        await supabase.from("notifications").insert({
          user_id: articleData.author_id,
          type: "comment",
          title: "New Comment",
          message: `Someone commented on your article: "${articleData.title}"`,
          link: `/articles/${articleData.slug}#comments-section`,
          is_read: false,
          metadata: { comment_id: data.id, actor_id: user.id }
        });
      }
    } catch (notifError) {
      console.error("Notification Error:", notifError);
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
