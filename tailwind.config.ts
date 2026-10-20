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
                // One family site-wide (owner's call, Oct 2026): Book Antiqua. It is a
                // licensed Microsoft font that cannot be served, so the stack falls back
                // to its near-identical Palatino (Windows, macOS, iOS), then to Lora, a
                // free web font loaded in index.html for devices with neither (Android).
                // `sans` keeps its name so existing font-sans classes still resolve.
                sans: ['Book Antiqua', 'Palatino Linotype', 'Palatino', 'Lora', 'Georgia', 'serif'],
                display: ['Book Antiqua', 'Palatino Linotype', 'Palatino', 'Lora', 'Georgia', 'serif'],
            },
            colors: {
                // Soft Structuralism palette (warm whites + espresso accent)
                'paper': '#FDFBF7',     // warm cream secondary surface
                'ink': '#1A1410',       // warm near-black, never pure #000
                'ink-muted': '#78716C', // stone-500
                'hairline': '#E7E5E4',  // stone-200
                'shell': '#FAFAF9',     // outer bezel shell
            },
            boxShadow: {
                'bezel-inset': 'inset 0 1px 1px rgba(255, 255, 255, 0.6)',
                'lifted': '0 24px 48px -24px rgba(26, 20, 16, 0.18)',
                'lifted-sm': '0 12px 24px -16px rgba(26, 20, 16, 0.15)',
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
            },
            animation: {
                'fade-up': 'fadeUp 900ms cubic-bezier(0.32, 0.72, 0, 1) both',
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(24px)', filter: 'blur(6px)' },
                    to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
                },
            },
        }
    },
    plugins: [],
} satisfies Config
