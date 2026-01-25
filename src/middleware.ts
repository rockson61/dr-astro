import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
    // Create a server-side Supabase client for this request
    const supabase = createSupabaseServerClient(context);

    // Check if we have an authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    // If user is logged in, check their ban status
    if (user) {
        // Only check DB if we are not already on the banned page to avoid loops
        if (context.url.pathname !== '/account-banned' && !context.url.pathname.startsWith('/api/')) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('account_status, role')
                .eq('id', user.id)
                .single();

            const isBanned = profile?.account_status === 'suspended' || profile?.account_status === 'banned';
            const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';

            // Admins are exempt from bans to prevent lockout
            if (isBanned && !isAdmin) {
                return context.redirect('/account-banned');
            }
        }
    }

    // If on banned page but NOT banned (or not logged in), redirect to home
    if (context.url.pathname === '/account-banned') {
        if (!user) {
            return context.redirect('/login');
        }
        const { data: profile } = await supabase.from('profiles').select('account_status').eq('id', user.id).single();
        const isBanned = profile?.account_status === 'suspended' || profile?.account_status === 'banned';

        if (!isBanned) {
            return context.redirect('/');
        }
    }

    return next();
});
