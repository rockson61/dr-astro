export const prerender = false;

import { stripe } from "../../../lib/stripe";
import { createSupabaseServerClient } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const supabase = createSupabaseServerClient({ request, cookies });

        // 1. Get User
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        // 2. Get Request Data
        const { priceId, successUrl, cancelUrl } = await request.json();

        if (!priceId) {
            return new Response(JSON.stringify({ error: "Missing priceId" }), {
                status: 400,
            });
        }

        // 3. Get or Create Stripe Customer
        // Check if user already has a stripe_customer_id in subscriptions table
        const { data: subscription } = await supabase
            .from("subscriptions")
            .select("stripe_customer_id")
            .eq("user_id", user.id)
            .single();

        let customerId = subscription?.stripe_customer_id;

        if (!customerId) {
            // Create new customer
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: {
                    user_id: user.id
                }
            });
            customerId = customer.id;

            // Save to DB immediately to avoid duplicates (though webhook also handles this)
            await supabase.from("subscriptions").insert({
                user_id: user.id,
                stripe_customer_id: customerId,
                status: 'incomplete' // placeholder
            });
        }

        // 4. Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: successUrl || `${new URL(request.url).origin}/dashboard/billing?success=true`,
            cancel_url: cancelUrl || `${new URL(request.url).origin}/dashboard/billing?canceled=true`,
            metadata: {
                user_id: user.id,
            },
            subscription_data: {
                metadata: {
                    user_id: user.id
                }
            }
        });

        return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
            status: 200,
        });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
};
