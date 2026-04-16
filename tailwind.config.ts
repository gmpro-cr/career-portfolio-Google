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
                // Light mode system
                'light-bg': '#F9FAFB',      // Requested light background
                'light-surface': '#FFFFFF', // Elevated white surface
                'light-card': '#FFFFFF',    // Card surface
                'light-text': '#111827',    // Deep dark gray text
                'light-muted': '#6B7280',   // Slate gray for secondary text
                
                // Tech/Cyber aesthetic accents
                'accent': 'var(--accent-color, #38bdf8)', // Default light blue
                'accent-rose': '#f43f5e',
                'accent-purple': '#a855f7',
                'accent-emerald': '#10b981',
                'accent-amber': '#f59e0b',
                'accent-indigo': '#6366f1',
            },
            boxShadow: {
                'glow': '0 0 25px var(--accent-glow)',
                'glow-subtle': '0 0 12px var(--accent-glow-subtle)',
                'card-hover': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px var(--accent-glow-subtle)',
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
