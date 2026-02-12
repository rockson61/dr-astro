import { c as createSupabaseServerClient } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

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
    const body = await request.json();
    const { product_id, seller_id, message } = body;
    if (!product_id || !seller_id || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }
    if (seller_id === user.id) {
      return new Response(
        JSON.stringify({ error: "You cannot inquire about your own product" }),
        { status: 400 }
      );
    }
    const { data, error } = await supabase.from("inquiries").insert({
      product_id,
      seller_id,
      buyer_id: user.id,
      message,
      status: "new"
    }).select().single();
    if (error) throw error;
    return new Response(JSON.stringify({ success: true, inquiry: data }), {
      status: 200
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
