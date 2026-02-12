import { s as supabase } from '../../../chunks/supabase_CYzxA37O.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { article_id, action } = await request.json();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    if (!article_id) {
      return new Response(JSON.stringify({ error: "Missing article_id" }), { status: 400 });
    }
    if (action === "like") {
      const { error } = await supabase.from("article_likes").insert({ user_id: user.id, article_id });
      if (error) throw error;
    } else if (action === "unlike") {
      const { error } = await supabase.from("article_likes").delete().match({ user_id: user.id, article_id });
      if (error) throw error;
    } else {
      return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || "Server error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
