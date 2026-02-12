
import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
    const supabase = createSupabaseServerClient({ cookies });

    // Check auth
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    try {
        const body = await request.json();
        const { product_id, seller_id, message } = body;

        if (!product_id || !seller_id || !message) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 },
            );
        }

        // Prevent self-inquiry
        if (seller_id === user.id) {
            return new Response(
                JSON.stringify({ error: "You cannot inquire about your own product" }),
                { status: 400 },
            );
        }

        const { data, error } = await supabase
            .from("inquiries")
            .insert({
                product_id,
                seller_id,
                buyer_id: user.id,
                message,
                status: "new",
            })
            .select()
            .single();

        if (error) throw error;

        return new Response(JSON.stringify({ success: true, inquiry: data }), {
            status: 200,
        });
    } catch (error: any) {
        console.error("Error creating inquiry:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
};
