import { c as createSupabaseServerClient } from '../../../chunks/supabase_CYzxA37O.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ cookies });
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400 });
    }
    const { error } = await supabase.from("newsletter_subscribers").upsert({ email, is_active: true });
    if (error) throw error;
    try {
      const { sendNewsletterSubscriptionEmail } = await import('../../../chunks/email_CC-M__I7.mjs');
      await sendNewsletterSubscriptionEmail(email);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
