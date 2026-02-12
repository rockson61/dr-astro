import { s as supabase } from '../../chunks/supabase_CYzxA37O.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const subject = formData.get("subject")?.toString();
    const message = formData.get("message")?.toString();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
      status: "new"
    });
    if (error) {
      console.error("Contact error:", error);
      return new Response(JSON.stringify({ error: "Failed to save message" }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true, message: "Message sent successfully" }), {
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
