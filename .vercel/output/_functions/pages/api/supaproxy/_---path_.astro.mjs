export { renderers } from '../../../renderers.mjs';

const ALL = async ({ request, params }) => {
  params.path || "";
  {
    return new Response(JSON.stringify({ error: "INTERNAL_SUPABASE_URL not set" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    ALL
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
