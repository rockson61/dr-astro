
# 3. Database Operations

## Overview
We use a **Self-Hosted Supabase (PostgreSQL)** instance.
-   **Host:** VPS (Traefik Proxy)
-   **Connection:** `postgres.js` (Server) & `supabase-js` (Client/Server)

## Connection Strategy
Due to the Mixed Content issue (HTTPS Vercel -> HTTP VPS), we use a dual-strategy:

1.  **Server-Side (SSR):**
    -   Connects **DIRECTLY** to the HTTP URL (`INTERNAL_SUPABASE_URL`).
    -   Fast, low latency, no SSL overhead.

2.  **Client-Side (Browser):**
    -   Connects via **PROXY** (`PUBLIC_SUPABASE_URL` = `/api/supaproxy`).
    -   Browser calls `https://domain/api/supaproxy/...`.
    -   Astro Endpoint forwards request to HTTP VPS.

## Common Operations

### Seeding Data
We have robust TypeScript scripts in `src/scripts/` to populate the DB.
Run them via `npx tsx`:
```bash
npx tsx src/scripts/seed-database.ts      # General Content
npx tsx src/scripts/seed-verified-users.ts # Test Users
npx tsx src/scripts/create-admin.ts       # Super Admin
```

### Migrations
Supabase migrations are in `supabase/migrations/`.
To apply them manually (if CLI fails):
```bash
npx tsx src/scripts/run-migrations.ts
```

### Accessing Data in Code
```typescript
// Server (Astro Frontmatter)
const { data } = await supabase.from('articles').select('*');

// Client (React)
const supabase = createSupabaseBrowserClient();
const { data } = await supabase.from('articles').select('*');
```
