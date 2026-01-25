/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                'heading': ['Playfair Display', 'Georgia', 'serif'],
                'body': ['Lato', 'system-ui', 'sans-serif'],
                'sans': ['Lato', 'system-ui', 'sans-serif'], // Fallback for default sans
                'serif': ['Playfair Display', 'serif'],
            },
            colors: {
                // Tuio Trends Palette
                tuio: {
                    pink: '#FF0180',
                    navy: '#1A1A1A', // Deep black/navy
                    blue: '#0055FF', // Action blue
                    bg: '#F5F5F7',   // Light gray bg often used in modern grids
                },
                // Legacy Palette (kept for sub-pages)
                primary: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    200: '#FECACA',
                    300: '#FCA5A5',
                    400: '#F87171',
                    500: '#D7263D',  // Brand red from logo
                    600: '#B91D33',
                    700: '#991B1B',
                    800: '#7F1D1D',
                    900: '#5F1515',
                },
                accent: '#D7263D',
                'accent-dark': '#B91D33',
                background: '#FFFFFF',
                surface: '#FFFFFF',
                'text-main': '#000000',
                'text-light': '#6B7280',

                // Mappings for existing components to avoid breaking them completely
                dental: {
                    teal: '#D7263D', // Remap Teal to Red
                    'teal-dark': '#B91D33',
                    gold: '#1F2937', // Remap Gold to Dark Gray/Black for cleaner look
                    'gold-light': '#374151',
                    navy: '#FFFFFF', // Remap Dark BG to White
                    slate: '#F9FAFB',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': "url('https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=1600')",
                // Remap luxury gradients to cleaner ones or remove
                'gradient-luxury': 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                'gradient-gold': 'linear-gradient(135deg, #D7263D 0%, #B91D33 100%)',
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out forwards',
                'slide-up': 'slideUp 0.5s ease-in-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            }
        },
    },
    plugins: [],
};
