
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { target_id, action } = await request.json();

        // Get current user (Auth check)
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        if (!target_id) {
            return new Response(JSON.stringify({ error: 'Missing target_id' }), { status: 400 });
        }

        if (action === 'follow') {
            const { error } = await supabase
                .from('follows')
                .insert({ follower_id: user.id, following_id: target_id });

            if (error) throw error;
        } else if (action === 'unfollow') {
            const { error } = await supabase
                .from('follows')
                .delete()
                .match({ follower_id: user.id, following_id: target_id });

            if (error) throw error;
        } else {
            return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message || 'Server error' }), { status: 500 });
    }
};
