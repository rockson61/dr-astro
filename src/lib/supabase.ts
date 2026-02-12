import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';

// Client-side Supabase client
export const createSupabaseBrowserClient = () => {
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

    return createBrowserClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseKey || 'placeholder'
    );
};

// Server-side Supabase client (for Astro endpoints/middleware)
export const createSupabaseServerClient = (context: { cookies: any }) => {
    const supabaseUrl = import.meta.env.SSR
        ? (process.env.INTERNAL_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL)
        : import.meta.env.PUBLIC_SUPABASE_URL;

    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

    // Guard against missing vars
    if ((!supabaseUrl || !supabaseKey) && import.meta.env.PROD) {
        console.warn("Supabase credentials missing in Server Client initialization.");
    }

    return createServerClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseKey || 'placeholder',
        {
            cookies: {
                getAll() {
                    return context.cookies.entries();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        context.cookies.set(name, value, options);
                    });
                },
            },
        }
    );
};
// Shared client for public data fetching (SSR/Client safe)
import { createClient } from '@supabase/supabase-js';

// Determine URL based on environment
const supabaseUrl = import.meta.env.SSR
    ? (process.env.INTERNAL_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL)
    : import.meta.env.PUBLIC_SUPABASE_URL;

const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Fail gracefully if env vars are missing (logging error instead of crashing)
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase Environment Variables Missing! Check your Vercel project settings.');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);
