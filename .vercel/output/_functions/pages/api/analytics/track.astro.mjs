import { c as createSupabaseServerClient } from '../../../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies, clientAddress }) => {
  const supabase = createSupabaseServerClient({ cookies });
  try {
    const { article_id, type } = await request.json();
    if (!article_id || !type) {
      return new Response("Missing fields", { status: 400 });
    }
    const userAgent = request.headers.get("user-agent") || "";
    const ip = clientAddress;
    const { data: { user } } = await supabase.auth.getUser();
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    await supabase.from("article_analytics").insert({
      article_id,
      user_id: user?.id || null,
      type,
      ip_hash: `${ip}-${userAgent}`,
      // Simplistic
      metadata: { user_agent: userAgent, ip }
      // Remove IP from metadata in real prod for GDPR
    });
    return new Response("Tracked", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
