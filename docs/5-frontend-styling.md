
# 5. Frontend Styling

## Tailwind CSS 4.0
We use the latest **Tailwind CSS v4** with the Vite plugin.
-   **Config:** `astro.config.mjs` (via `@tailwindcss/vite`).
-   **Global Styles:** `src/styles/global.css`.

## Design System ("Tuio Gold")
We follow a distinct "Luxury Gold & Navy" theme.
-   **Colors:**
    -   `tuio-gold`: `#D4AF37` (Main Accent)
    -   `tuio-navy`: `#0F172A` (Background/Text)
    -   `tuio-red`: `#E11D48` (Actions/Alerts)

## Typography
-   **Headings:** `font-heading` (Serif/Display)
-   **Body:** `font-body` (Sans-Serif/Inter)

## Component Styling
We use utility classes directly in markup for speed and consistency.
```tsx
<button class="bg-tuio-gold text-tuio-navy font-bold px-6 py-2 rounded-full hover:bg-white transition-colors">
  Click Me
</button>
```

## Responsive Design
-   All layouts are mobile-first.
-   Use `md:`, `lg:`, `xl:` prefixes for larger screens.
-   Sidebar layout on Dashboard adapts to mobile drawer.
