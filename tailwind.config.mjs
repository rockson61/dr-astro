/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                'heading': ['"Be Vietnam Pro"', 'sans-serif'],
                'body': ['"Noto Sans"', 'system-ui', 'sans-serif'],
                'sans': ['"Noto Sans"', 'system-ui', 'sans-serif'],
                'serif': ['"Be Vietnam Pro"', 'sans-serif'], // Remap serif to heading font for consistency
            },
            colors: {
                // International Standard Medical Palette (Cyan/Teal)
                primary: {
                    50: '#ECFEFF',
                    100: '#CFFAFE',
                    200: '#A5F3FC',
                    300: '#67E8F9',
                    400: '#22D3EE',
                    500: '#06B6D4',
                    600: '#0891B2', // Brand Primary
                    700: '#0E7490',
                    800: '#155E75',
                    900: '#164E63',
                },
                secondary: {
                    50: '#F0FDFA',
                    100: '#CCFBF1',
                    200: '#99F6E4',
                    300: '#5EEAD4',
                    400: '#2DD4BF',
                    500: '#14B8A6',
                    600: '#0D9488',
                    700: '#0F766E',
                    800: '#115E59',
                    900: '#134E4A',
                },
                accent: '#059669', // Emerald Green for CTA
                'accent-dark': '#047857',
                background: '#ECFEFF',
                surface: '#FFFFFF',
                'text-main': '#164E63', // Deep Cyan for text
                'text-light': '#475569', // Slate for secondary text

                // Legacy Mappings (soft deprecation / remapping)
                tuio: {
                    red: '#0891B2',   // Remapped to Cyan
                    navy: '#164E63',  // Remapped to Deep Cyan
                    blue: '#06B6D4',  // Remapped to Cyan 500
                    bg: '#ECFEFF',    // Remapped to Cyan 50
                },
                dental: {
                    teal: '#0891B2',
                    'teal-dark': '#0E7490',
                    gold: '#059669',  // Remapped Gold to Emerald (Trust signal)
                    'gold-light': '#34D399',
                    navy: '#164E63',
                    slate: '#F0FDFA',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                // Professional Medical Gradient
                'gradient-medical': 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)',
                // Remapped luxury gradients
                'gradient-luxury': 'linear-gradient(135deg, #FFFFFF 0%, #ECFEFF 100%)',
                'gradient-gold': 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.05)',
                'sm': '0 1px 2px rgba(0,0,0,0.05)',
                'md': '0 4px 6px rgba(0,0,0,0.05)', // Softer shadows
                'lg': '0 10px 15px rgba(0,0,0,0.05)',
                'xl': '0 20px 25px rgba(0,0,0,0.1)',
            },
            borderRadius: {
                'xl': '0.75rem', // 12px
                '2xl': '1rem',   // 16px
                '3xl': '1.5rem', // 24px
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
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
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            }
        },
    },
    plugins: [],
};
