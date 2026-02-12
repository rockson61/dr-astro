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

        // Award Points
        try {
            const { awardPoints, POINTS } = await import("../../../lib/gamification");
            // Dynamic import to avoid cycles or context issues if any
            await awardPoints(user.id, 'comment', POINTS.COMMENT, { article_id, comment_id: data.id });
        } catch (pointError) {
            console.error("Error awarding points:", pointError);
        }

        // Trigger Notification
        try {
            const { data: articleData } = await supabase
                .from("articles")
                .select("author_id, title, slug")
                .eq("id", article_id)
                .single();

            if (articleData && articleData.author_id !== user.id) {
                await supabase.from("notifications").insert({
                    user_id: articleData.author_id,
                    type: "comment",
                    title: "New Comment",
                    message: `Someone commented on your article: "${articleData.title}"`,
                    link: `/articles/${articleData.slug}#comments-section`,
                    is_read: false,
                    metadata: { comment_id: data.id, actor_id: user.id }
                });
            }
        } catch (notifError) {
            console.error("Notification Error:", notifError);
            // Don't fail the request if notification fails
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
};
