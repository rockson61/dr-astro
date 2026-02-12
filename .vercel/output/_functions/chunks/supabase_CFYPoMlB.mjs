import { createServerClient, createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const createSupabaseBrowserClient = () => {
  return createBrowserClient(
    "http://api.db.dentaloffice.io",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc"
  );
};
const createSupabaseServerClient = (context) => {
  const supabaseUrl2 = process.env.INTERNAL_SUPABASE_URL || "http://api.db.dentaloffice.io" ;
  return createServerClient(
    supabaseUrl2,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc",
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
        }
      }
    }
  );
};
const supabaseUrl = process.env.INTERNAL_SUPABASE_URL || "http://api.db.dentaloffice.io" ;
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc"
);

export { createSupabaseBrowserClient as a, createSupabaseServerClient as c, supabase as s };
