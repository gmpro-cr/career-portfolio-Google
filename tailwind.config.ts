import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./App.tsx",
        "./index.tsx",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Book Antiqua"', 'Palatino', '"Palatino Linotype"', 'Georgia', 'serif'],
                serif: ['"Book Antiqua"', 'Palatino', '"Palatino Linotype"', 'Georgia', 'serif'],
            },
            colors: {
                // Earth tone palette
                warm: {
                    white: '#FAF8F5',
                    cream: '#F5F1EB',
                },
                charcoal: '#2D2A26',
                muted: '#6B6560',
                terracotta: {
                    DEFAULT: '#C67D5A',
                    light: '#D4967A',
                    dark: '#A86544',
                },
                olive: {
                    DEFAULT: '#7D8C6E',
                    light: '#9AAA8B',
                    dark: '#5F6B52',
                },
                // Keep some utility colors
                gray: {
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                }
            },
            boxShadow: {
                'soft': '0 2px 8px 0 rgba(45, 42, 38, 0.08)',
                'card': '0 4px 16px 0 rgba(45, 42, 38, 0.1)',
                'elevated': '0 8px 24px 0 rgba(45, 42, 38, 0.12)',
            },
        }
    },
    plugins: [],
} satisfies Config
