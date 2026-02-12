import { s as stripe } from '../../../chunks/stripe_BB53bCh_.mjs';
import '../../../chunks/supabase_CFYPoMlB.mjs';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const supabaseAdmin = createClient(
  "http://api.db.dentaloffice.io",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlzcyI6InN1cGFiYXNlIn0.QD1T3hz_0RBrnt-juLttpON4cdDyl1trbrV0zf7B6Ro"
);
const POST = async ({ request }) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }
  const body = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      undefined                                     
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        await handleCheckoutSessionCompleted(session);
        break;
      case "customer.subscription.updated":
        const subscriptionUpdated = event.data.object;
        await handleSubscriptionUpdated(subscriptionUpdated);
        break;
      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object;
        await handleSubscriptionDeleted(subscriptionDeleted);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Webhook processing error:", error.message);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
  return new Response("Received", { status: 200 });
};
async function handleCheckoutSessionCompleted(session) {
  const userId = session.metadata.user_id;
  const customerId = session.customer;
  const subscriptionId = session.subscription;
  if (!userId) return;
  const { error } = await supabaseAdmin.from("subscriptions").upsert({
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    status: "active",
    // Assumed active immediately on success
    plan_id: null,
    // Will be updated by subscription.updated
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, { onConflict: "user_id" });
  if (error) throw error;
}
async function handleSubscriptionUpdated(subscription) {
  const customerId = subscription.customer;
  const status = subscription.status;
  const priceId = subscription.items.data[0].price.id;
  const currentPeriodEnd = new Date(subscription.current_period_end * 1e3);
  const { data: existingSub } = await supabaseAdmin.from("subscriptions").select("user_id").eq("stripe_customer_id", customerId).single();
  if (existingSub) {
    await supabaseAdmin.from("subscriptions").update({
      status,
      plan_id: priceId,
      current_period_end: currentPeriodEnd,
      stripe_subscription_id: subscription.id,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("stripe_customer_id", customerId);
  }
}
async function handleSubscriptionDeleted(subscription) {
  const customerId = subscription.customer;
  await supabaseAdmin.from("subscriptions").update({
    status: "canceled",
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("stripe_customer_id", customerId);
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
