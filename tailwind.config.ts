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
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
                serif: ['"Book Antiqua"', 'Palatino', '"Palatino Linotype"', 'Georgia', 'serif'],
            },
            colors: {
                // Dark Mode System
                'dark-bg': '#0a0a0a',      // Primary background
                'dark-surface': '#171717',  // Cards/elevated surfaces
                'dark-text': '#fafafa',     // Primary text
                'dark-muted': '#a3a3a3',    // Secondary text

                // Theme accent options
                'accent-rose': '#fb7185',
                'accent-blue': '#60a5fa',
                'accent-green': '#4ade80',
                'accent-orange': '#fb923c',
                'accent-purple': '#c084fc',
                'accent-gray': '#6b7280',

                // Specific brand colors (mapped to new system references or kept for backward compat)
                'terracotta': '#fb923c', // Temporarily mapping old brand color to new accent-orange
                'warm-cream': '#171717', // Temporarily mapping old bg to new surface
                'charcoal': '#fafafa',   // Temporarily mapping old text to new light text
            },
            boxShadow: {
                'glow': '0 0 20px rgba(96, 165, 250, 0.5)',
                'glow-subtle': '0 0 10px rgba(96, 165, 250, 0.2)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
        }
    },
    plugins: [],
} satisfies Config
