export const prerender = false;

import { createSupabaseServerClient } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const supabase = createSupabaseServerClient({ request, cookies });

    // Check authentication
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    try {
        const formData = await request.json();
        const { article_id, content, parent_id } = formData;

        if (!article_id || !content) {
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
            });
        }

        const { data, error } = await supabase
            .from("comments")
            .insert({
                article_id,
                user_id: user.id,
                content,
                parent_id: parent_id || null,
                is_approved: true, // Auto-approve for MVP
            })
            .select()
            .single();

        if (error) throw error;

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
};
