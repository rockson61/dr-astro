
# 1. Astro App Overview

## Introduction
Dr. Astro is a modern, high-performance digital magazine and platform for dental professionals. It is built using **Astro**, a next-gen web framework optimized for content-rich websites, combined with **React** for interactive islands.

## Technology Stack
-   **Framework:** Astro 5.0 (Server-Side Rendering & Static Generation)
-   **UI Library:** React 19 (Interactive Components)
-   **Styling:** Tailwind CSS 4.0 (Utility-first styling)
-   **Database:** PostgreSQL (Self-Hosted Supabase)
-   **Auth:** Supabase Auth
-   **Deployment:** Vercel (Serverless Functions)

## "Batteries Included" Strategy
While Astro is minimal by default, we have integrated a full suite of "batteries" to make it a robust application:

1.  **Auth System:** Full user management, roles (Super Admin, Dentist, etc.), and protected routes.
2.  **Database ORM:** Direct SQL access via `postgres.js` for speed, and `supabase-js` for client-side interactions.
3.  **Admin Dashboard:** A complete CMS for managing articles, jobs, events, and users.
4.  **API Proxy:** A custom-built Astro API Endpoint (`/api/supaproxy`) to handle secure communication with our self-hosted database, solving Mixed Content issues.
5.  **SEO & Performance:** Automatic sitemap generation, image optimization, and partial hydration.

## Core Structure
-   `src/pages`: File-based routing (URLs).
-   `src/layouts`: wrappers for pages (Base, Dashboard).
-   `src/components`: UI blocks (React & Astro).
-   `src/lib`: Shared utilities (Supabase client, helpers).
-   `src/scripts`: Database seeding and maintenance tools.
