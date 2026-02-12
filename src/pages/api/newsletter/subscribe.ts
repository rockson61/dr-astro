export const prerender = false;

import { createSupabaseServerClient } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const supabase = createSupabaseServerClient({ request, cookies });

    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400 });
        }

        // 1. Insert into DB (Supabase handles duplicate PK error if already subbed)
        const { error } = await supabase
            .from('newsletter_subscribers')
            .upsert({ email, is_active: true });

        if (error) throw error;

        // 2. Send Confirmation Email
        // We import dynamically to avoid build issues if env is missing during static build, though this is an API route.
        try {
            const { sendNewsletterSubscriptionEmail } = await import("../../../lib/email");
            await sendNewsletterSubscriptionEmail(email);
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // Don't fail the request if email fails, as subscription succeeded
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error: any) {
        console.error("Newsletter error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
