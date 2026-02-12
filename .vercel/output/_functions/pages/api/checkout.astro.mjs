import { s as stripe } from '../../chunks/stripe_C0U5A9jd.mjs';
import { c as createSupabaseServerClient } from '../../chunks/supabase_CYzxA37O.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  try {
    const supabase = createSupabaseServerClient({ request, cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401
      });
    }
    if (!stripe) {
      console.error("Stripe is not initialized. Check STRIPE_SECRET_KEY.");
      return new Response(JSON.stringify({ error: "Payment system unavailable" }), {
        status: 503
      });
    }
    const { priceId, successUrl, cancelUrl } = await request.json();
    if (!priceId) {
      return new Response(JSON.stringify({ error: "Missing priceId" }), {
        status: 400
      });
    }
    const { data: subscription } = await supabase.from("subscriptions").select("stripe_customer_id").eq("user_id", user.id).single();
    let customerId = subscription?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id
        }
      });
      customerId = customer.id;
      await supabase.from("subscriptions").insert({
        user_id: user.id,
        stripe_customer_id: customerId,
        status: "incomplete"
        // placeholder
      });
    }
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: successUrl || `${new URL(request.url).origin}/dashboard/billing?success=true`,
      cancel_url: cancelUrl || `${new URL(request.url).origin}/dashboard/billing?canceled=true`,
      metadata: {
        user_id: user.id
      },
      subscription_data: {
        metadata: {
          user_id: user.id
        }
      }
    });
    return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
      status: 200
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
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
