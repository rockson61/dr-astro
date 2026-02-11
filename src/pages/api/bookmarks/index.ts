export const prerender = false;

import { createSupabaseServerClient } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies }) => {
    const supabase = createSupabaseServerClient({ request, cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify([]), { status: 200 });
    }

    const { data, error } = await supabase
        .from("saved_articles")
        .select("article_id")
        .eq("user_id", user.id);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }

    return new Response(JSON.stringify(data.map((item) => item.article_id)), {
        status: 200,
    });
};

export const POST: APIRoute = async ({ request, cookies }) => {
    const supabase = createSupabaseServerClient({ request, cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    try {
        const { article_id } = await request.json();

        if (!article_id) {
            return new Response(JSON.stringify({ error: "Missing article_id" }), {
                status: 400,
            });
        }

        // Check if already saved
        const { data: existing } = await supabase
            .from("saved_articles")
            .select("id")
            .match({ user_id: user.id, article_id })
            .single();

        if (existing) {
            // Unsave
            await supabase.from("saved_articles").delete().eq("id", existing.id);
            return new Response(JSON.stringify({ saved: false }), { status: 200 });
        } else {
            // Save
            await supabase
                .from("saved_articles")
                .insert({ user_id: user.id, article_id });
            return new Response(JSON.stringify({ saved: true }), { status: 200 });
        }
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
};
