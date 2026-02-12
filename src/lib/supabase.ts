import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';

// Client-side Supabase client
export const createSupabaseBrowserClient = () => {
    return createBrowserClient(
        import.meta.env.PUBLIC_SUPABASE_URL!,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY!
    );
};

// Server-side Supabase client (for Astro endpoints/middleware)
export const createSupabaseServerClient = (context: { cookies: any }) => {
    const supabaseUrl = import.meta.env.SSR
        ? (process.env.INTERNAL_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL!)
        : import.meta.env.PUBLIC_SUPABASE_URL!;

    return createServerClient(
        supabaseUrl,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(key) {
                    return context.cookies.get(key)?.value;
                },
                set(key, value, options) {
                    context.cookies.set(key, value, options);
                },
                remove(key, options) {
                    context.cookies.delete(key, options);
                },
            },
        }
    );
};
// Shared client for public data fetching (SSR/Client safe)
import { createClient } from '@supabase/supabase-js';

// Determine URL based on environment
const supabaseUrl = import.meta.env.SSR
    ? (process.env.INTERNAL_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL!)
    : import.meta.env.PUBLIC_SUPABASE_URL!;

export const supabase = createClient(
    supabaseUrl,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY!
);
