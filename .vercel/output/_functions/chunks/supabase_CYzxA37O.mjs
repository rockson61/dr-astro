import { createServerClient, createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const createSupabaseBrowserClient = () => {
  const supabaseUrl2 = "http://api.db.dentaloffice.io";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc";
  return createBrowserClient(
    supabaseUrl2,
    supabaseKey
  );
};
const createSupabaseServerClient = (context) => {
  const supabaseUrl2 = process.env.INTERNAL_SUPABASE_URL || "http://api.db.dentaloffice.io" ;
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc";
  return createServerClient(
    supabaseUrl2,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return context.cookies.entries();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            context.cookies.set(name, value, options);
          });
        }
      }
    }
  );
};
const supabaseUrl = process.env.INTERNAL_SUPABASE_URL || "http://api.db.dentaloffice.io" ;
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc";
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export { createSupabaseBrowserClient as a, createSupabaseServerClient as c, supabase as s };
