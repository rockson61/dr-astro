import { createClient } from "@supabase/supabase-js";

// Admin Client for Gamification (Bypass RLS)
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
const publicUrl = import.meta.env.PUBLIC_SUPABASE_URL;

let supabaseAdmin: any = null;

if (serviceRoleKey && publicUrl) {
    supabaseAdmin = createClient(publicUrl, serviceRoleKey);
} else {
    console.warn("Gamification: Missing Service Role Key. Points will not be awarded.");
}

export const POINTS = {
    PUBLISH_ARTICLE: 50,
    COMMENT: 5,
    RECEIVE_LIKE: 10, // Author gets this
    LIKE_CONTENT: 1, // User gets this
    COMPLETE_PROFILE: 20
};

export async function awardPoints(userId: string, action: string, points: number, metadata: any = {}) {
    try {
        if (!supabaseAdmin) return;

        // 1. Log the transaction
        const { error: logError } = await supabaseAdmin
            .from('reputation_logs')
            .insert({
                user_id: userId,
                action,
                points,
                metadata
            });

        if (logError) throw logError;

        // 2. Update Profile
        // We use an RPC call or direct increment if concurrency isn't huge.
        // For now, let's fetch current and update. 
        // Ideally: UPDATE profiles SET reputation_points = reputation_points + X WHERE id = Y

        // Supabase/Postgres doesn't support "increment" in simple update via JS client easily without RPC.
        // So we'll read-modify-write or use a custom RPC.
        // Let's use read-modify-write for simplicity in MVP.

        const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('reputation_points, badges')
            .eq('id', userId)
            .single();

        if (profile) {
            const newScore = (profile.reputation_points || 0) + points;
            await supabaseAdmin
                .from('profiles')
                .update({ reputation_points: newScore })
                .eq('id', userId);

            // Check badges
            await checkBadges(userId, newScore, profile.badges || []);
        }

    } catch (error) {
        console.error("Error awarding points:", error);
    }
}

async function checkBadges(userId: string, score: number, currentBadges: any[]) {
    // Example Badge Logic
    const badgesToAdd = [];
    const existingIds = currentBadges.map((b: any) => b.id);

    // 1. Rising Star (100 points)
    if (score >= 100 && !existingIds.includes('rising_star')) {
        badgesToAdd.push({
            id: 'rising_star',
            name: 'Rising Star',
            icon: '🌟',
            awarded_at: new Date().toISOString()
        });
    }

    // 2. Community Pillar (500 points)
    if (score >= 500 && !existingIds.includes('community_pillar')) {
        badgesToAdd.push({
            id: 'community_pillar',
            name: 'Community Pillar',
            icon: '🏛️',
            awarded_at: new Date().toISOString()
        });
    }

    if (badgesToAdd.length > 0) {
        const newBadges = [...currentBadges, ...badgesToAdd];
        await supabaseAdmin
            .from('profiles')
            .update({ badges: newBadges })
            .eq('id', userId);

        // Notify user about badge? (Future improvement)
    }
}
