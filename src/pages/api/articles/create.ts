export const prerender = false;

import { createSupabaseServerClient } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const supabase = createSupabaseServerClient({ request, cookies });

    // Check Auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const formData = await request.json();
        const { title, content, category_id, excerpt, tags, image, doi, references, issue_id, type } = formData;

        if (!title || !content || !category_id) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        const slug = `${slugify(title)}-${Math.random().toString(36).substring(2, 7)}`;

        const { data, error } = await supabase.from("articles").insert({
            title,
            slug,
            category_id,
            content,
            excerpt,
            tags,
            image_url: image, // Assuming client handles upload and sends URL, or we need to handle upload here? 
            // In new.astro, it seems image upload wasn't fully implemented in the script provided (it had file input but logic was missing).
            // Let's assume for now the client sends a URL or null.
            doi,
            references,
            issue_id: issue_id || null,
            author_id: user.id,
            status: "published", // MVP: Auto-publish
            is_approved: true,
            type: type || 'article',
            created_at: new Date().toISOString(),
        }).select().single();

        if (error) throw error;

        // Award Points
        try {
            const { awardPoints, POINTS } = await import("../../../lib/gamification");
            await awardPoints(user.id, 'publish_article', POINTS.PUBLISH_ARTICLE, { article_id: data.id });
        } catch (pointError) {
            console.error("Error awarding points:", pointError);
        }

        return new Response(JSON.stringify({ success: true, article: data }), { status: 200 });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
