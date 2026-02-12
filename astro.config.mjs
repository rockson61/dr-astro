import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { VitePWA } from 'vite-plugin-pwa';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // User can update this before deploy
  site: 'https://dentalreach.today',

  image: {
    domains: ['images.pexels.com', 'res.cloudinary.com', 'ui-avatars.com'],
    remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }],
  },



  vite: {
    plugins: [
      tailwind(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'DentalReach',
          short_name: 'DentalReach',
          description: 'The Leading Digital Magazine for Dental Professionals',
          theme_color: '#0F172A',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/icons/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icons/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: '/icons/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          navigateFallback: '/',
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
        },
        devOptions: {
          enabled: true
        }
      })
    ],
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