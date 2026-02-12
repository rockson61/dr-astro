
# 8. Deployment Guide

## 1. Prerequisites
-   **Vercel Account** (connected to GitHub).
-   **Supabase Credentials** (URL, Anon Key).
-   **Service Role Key** (for Admin scripts, optional for app runtime).

## 2. Vercel Configuration
We use the `@astrojs/vercel` adapter in `serverless` mode.

### Environment Variables
You MUST set these in Vercel Dashboard:

| Key | Value | Purpose |
| :--- | :--- | :--- |
| `PUBLIC_SUPABASE_URL` | `/api/supaproxy` | Points client to our internal proxy. |
| `PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Public key for Supabase. |
| `INTERNAL_SUPABASE_URL` | `http://database-supabase...` | The REAL HTTP URL of your VPS DB. |

## 3. The Proxy Mechanism
To allow our HTTPS Vercel app to talk to your insecure HTTP VPS:
1.  We created `src/pages/api/supaproxy/[...path].ts`.
2.  Frontend calls `/api/supaproxy/rest/v1/articles`.
3.  Astro Proxy receives request.
4.  Astro Proxy rewrites headers (fixes Host header).
5.  Astro Proxy fetches from `INTERNAL_SUPABASE_URL/rest/v1/articles` (over HTTP).
6.  Astro Proxy returns data to Frontend.

## 4. Updates & Maintenance
-   **Push to Deploy:** Just `git push origin main`.
-   **Database Updates:** Run migrations locally or use the SQL Editor in Dashboard.
