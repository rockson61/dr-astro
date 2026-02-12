import { s as supabase } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: existing } = await supabase.from("newsletter_subscribers").select("id").eq("email", email).single();
    if (existing) {
      return new Response(JSON.stringify({ success: true, message: "Already subscribed!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      is_active: true
    });
    if (error) {
      console.error("Newsletter error:", error);
      return new Response(JSON.stringify({ error: "Failed to subscribe" }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true, message: "Subscribed successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
