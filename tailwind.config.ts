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
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                // Minimalist mode system
                'light-bg': '#FFFFFF',      // Absolute white background
                'light-surface': '#FAFAFA', // Subtle gray surface
                'light-card': '#FFFFFF',    // Card surface
                'light-text': '#0A0A0A',    // Very dark text
                'light-muted': '#737373',   // Crisp secondary text
                
                // Tech/Cyber aesthetic accents
                'accent': 'var(--accent-color, #000000)', // Default stark black
                'accent-rose': '#f43f5e',
                'accent-purple': '#a855f7',
                'accent-emerald': '#10b981',
                'accent-amber': '#f59e0b',
                'accent-indigo': '#6366f1',
            },
            boxShadow: {
                'glow': 'none',
                'glow-subtle': 'none',
                'card-hover': '0 4px 12px rgba(0, 0, 0, 0.05)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, var(--accent-color) 0deg, transparent 180deg, var(--accent-color) 360deg)',
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
            }
        }
    },
    plugins: [],
} satisfies Config
