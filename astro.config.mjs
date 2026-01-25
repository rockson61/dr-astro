import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // User can update this before deploy
  site: 'https://dentalreach.today',

  vite: {
    plugins: [tailwind()],
  },

  integrations: [
    react(),
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    })
  ],

  // SSR Mode for Supabase
  output: 'server',

  prefetch: true,

  adapter: node({
    mode: 'standalone',
  }),
});