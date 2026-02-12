export const prerender = false;

import { createSupabaseServerClient } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
    const supabase = createSupabaseServerClient({ request, cookies });

    try {
        const { article_id, type } = await request.json();

        if (!article_id || !type) {
            return new Response("Missing fields", { status: 400 });
        }

        // Simple IP Hashing for Anonymity check (In prod use a library or salt)
        // Here we just use the raw IP for the check, but store a hash if needed. 
        // For privacy, let's just use a simple hash of IP + UserAgent + Date (Day) to dedup.
        const userAgent = request.headers.get("user-agent") || "";
        const ip = clientAddress;

        // Get User (optional)
        const { data: { user } } = await supabase.auth.getUser();

        // Check if event exists for this IP/User today to prevent spam
        const today = new Date().toISOString().split('T')[0];

        // This is a naive check. Ideally use Redis or a specific table for dedup.
        // For MVP, we insert and let the analysis query handle unique counting if we store all.
        // But to save space, let's check strict uniqueness for 'view' per session/day.
        // Actually, let's just insert everything for now and COUNT(DISTINCT ip_hash) in queries.

        await supabase.from("article_analytics").insert({
            article_id,
            user_id: user?.id || null,
            type,
            ip_hash: `${ip}-${userAgent}`, // Simplistic
            metadata: { user_agent: userAgent, ip: ip } // Remove IP from metadata in real prod for GDPR
        });

        return new Response("Tracked", { status: 200 });

    } catch (error) {
        return new Response("Error", { status: 500 });
    }
};
