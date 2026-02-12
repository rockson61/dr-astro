
# 6. Advanced Troubleshooting

## Common Issues & Fixes

### 1. "Failed to fetch" (Mixed Content)
**Cause:** Browser blocks HTTPS site asking for HTTP data.
**Solution:**
We implemented a **Proxy Endpoint** (`/api/supaproxy`).
-   Ensure `PUBLIC_SUPABASE_URL` in Vercel is set to `/api/supaproxy`.
-   Ensure `INTERNAL_SUPABASE_URL` is set to the full HTTP URL.

### 2. "SupabaseUrl is required" (Build Error)
**Cause:** Environment variables missing during build.
**Solution:**
Add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` to Vercel Project Settings.

### 3. "Tenant or user not found" (Database)
**Cause:** Supavisor Connection Pooler requires Tenant ID in username.
**Solution:**
Use format: `postgres.[tenant-id]` as the username.
(Already fixed in your Flashboard connection string).

### 4. Import Errors (e.g. `../../lib/supabase`)
**Cause:** Moving files creates broken relative paths.
**Solution:**
Check the import depth. Use VS Code's "Fix All Imports" or manually adjust `../../`.

### 5. Type Errors (`User role 'super_admin' does not exist`)
**Cause:** Data in DB doesn't match TypeScript types.
**Solution:**
-   Update `supabase/migrations/` to add the enum value.
-   Update `src/lib/supabase.ts` types/interfaces.
