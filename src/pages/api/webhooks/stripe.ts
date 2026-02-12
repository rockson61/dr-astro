export const prerender = false;

import { stripe } from "../../../lib/stripe";
import { createSupabaseServerClient } from "../../../lib/supabase"; // Use server client for admin actions if configured with service role, but here we might need a direct admin client
import { createClient } from "@supabase/supabase-js";
import type { APIRoute } from "astro";

// Admin Client for Webhooks (Bypass RLS)
const supabaseAdmin = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

export const POST: APIRoute = async ({ request }) => {
    const signature = request.headers.get("stripe-signature");

    if (!stripe) {
        return new Response("Stripe not configured", { status: 503 });
    }
    if (!signature) {
        return new Response("Missing signature", { status: 400 });
    }

    const body = await request.text();
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            import.meta.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err: any) {
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
    } catch (error: any) {
        console.error("Webhook processing error:", error.message);
        return new Response(`Error: ${error.message}`, { status: 500 });
    }

    return new Response("Received", { status: 200 });
};

async function handleCheckoutSessionCompleted(session: any) {
    const userId = session.metadata.user_id;
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    if (!userId) return;

    // Update or Insert Subscription
    const { error } = await supabaseAdmin
        .from("subscriptions")
        .upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: "active", // Assumed active immediately on success
            plan_id: null, // Will be updated by subscription.updated
            updated_at: new Date().toISOString()
        }, { onConflict: "user_id" });

    if (error) throw error;
}

async function handleSubscriptionUpdated(subscription: any) {
    const customerId = subscription.customer;
    const status = subscription.status;
    const priceId = subscription.items.data[0].price.id;
    const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

    // Find the user by stripe_customer_id
    const { data: existingSub } = await supabaseAdmin
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", customerId)
        .single();

    if (existingSub) {
        await supabaseAdmin
            .from("subscriptions")
            .update({
                status: status,
                plan_id: priceId,
                current_period_end: currentPeriodEnd,
                stripe_subscription_id: subscription.id,
                updated_at: new Date().toISOString()
            })
            .eq("stripe_customer_id", customerId);
    }
}

async function handleSubscriptionDeleted(subscription: any) {
    const customerId = subscription.customer;

    await supabaseAdmin
        .from("subscriptions")
        .update({
            status: 'canceled',
            updated_at: new Date().toISOString()
        })
        .eq("stripe_customer_id", customerId);
}
