import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify([]), { status: 200 });
  }
  const { data, error } = await supabase.from("saved_articles").select("article_id").eq("user_id", user.id);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
  return new Response(JSON.stringify(data.map((item) => item.article_id)), {
    status: 200
  });
};
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
    const { article_id } = await request.json();
    if (!article_id) {
      return new Response(JSON.stringify({ error: "Missing article_id" }), {
        status: 400
      });
    }
    const { data: existing } = await supabase.from("saved_articles").select("id").match({ user_id: user.id, article_id }).single();
    if (existing) {
      await supabase.from("saved_articles").delete().eq("id", existing.id);
      return new Response(JSON.stringify({ saved: false }), { status: 200 });
    } else {
      await supabase.from("saved_articles").insert({ user_id: user.id, article_id });
      return new Response(JSON.stringify({ saved: true }), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
