
# 2. Project Conventions

## Code Style
-   **Formatting:** Prettier with Tailwind plugin.
-   **Components:** PascalCase (e.g., `ArticleCard.astro`, `JobForm.tsx`).
-   **Functions:** camelCase (e.g., `fetchArticles`, `formatDate`).
-   **Variables:** camelCase, descriptive naming.

## Architecture Patterns

### 1. Astro "Islands" Architecture
We use Astro for static content (Headers, Footers, Articles) and React only where interactivity is needed (Forms, Search, Likes).
-   **Default:** Server-rendered HTML (Zero JS).
-   **Interactive:** `client:load` or `client:visible` directive.

### 2. Data Fetching
-   **Server-Side:** Fetch data directly in Astro frontmatter (`---`) using `supabase-js` or direct SQL.
-   **Client-Side:** Use `useEffect` or `SWR` pattern with `createSupabaseBrowserClient`.

### 3. File Organization
-   `/pages/dashboard/[section]`: Authenticated routes.
-   `/pages/api/*`: Server-side API endpoints.
-   `/lib/supabase.ts`: The central Supabase client configuration.

## Directory Structure
```
src/
├── components/   # UI Components
│   ├── ui/       # Generic atoms (Button, Card)
│   ├── dashboard/# Admin/User Dashboard components
├── layouts/      # Page Wrappers
├── lib/          # Utilities
├── pages/        # Routes
│   ├── api/      # API Endpoints
│   ├── dashboard/# Protected Dashboard
├── scripts/      # Maintenance Scripts (Seeding)
├── styles/       # Global CSS
```
