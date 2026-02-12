import '../../../chunks/stripe_C0U5A9jd.mjs';
import '../../../chunks/supabase_CYzxA37O.mjs';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
createClient(
  "http://api.db.dentaloffice.io",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlzcyI6InN1cGFiYXNlIn0.QD1T3hz_0RBrnt-juLttpON4cdDyl1trbrV0zf7B6Ro"
);
const POST = async ({ request }) => {
  request.headers.get("stripe-signature");
  {
    return new Response("Stripe not configured", { status: 503 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
