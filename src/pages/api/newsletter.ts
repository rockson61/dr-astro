
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const email = formData.get('email')?.toString();

        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Invalid email address' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check if already subscribed
        const { data: existing } = await supabase
            .from('newsletter_subscribers')
            .select('id')
            .eq('email', email)
            .single();

        if (existing) {
            return new Response(JSON.stringify({ success: true, message: 'Already subscribed!' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { error } = await supabase.from('newsletter_subscribers').insert({
            email,
            is_active: true
        });

        if (error) {
            console.error('Newsletter error:', error);
            return new Response(JSON.stringify({ error: 'Failed to subscribe' }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
