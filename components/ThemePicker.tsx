import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

const themes = [
    { name: 'Blue', color: '#60a5fa', glow: 'rgba(96, 165, 250, 0.5)' },
    { name: 'Purple', color: '#c084fc', glow: 'rgba(192, 132, 252, 0.5)' },
    { name: 'Green', color: '#4ade80', glow: 'rgba(74, 222, 128, 0.5)' },
    { name: 'Orange', color: '#fb923c', glow: 'rgba(251, 146, 60, 0.5)' },
    { name: 'Rose', color: '#fb7185', glow: 'rgba(251, 113, 133, 0.5)' },
];

export default function ThemePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState(themes[0]);

    const applyTheme = (theme: typeof themes[0]) => {
        setActiveTheme(theme);
        document.documentElement.style.setProperty('--accent-color', theme.color);
        document.documentElement.style.setProperty('--accent-glow', theme.glow);

        // Update Tailwind custom properties if needed, but CSS variables handle most
        // We update the class to trigger re-renders if necessary, but CSS vars are reactive
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-dark-muted hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                aria-label="Change Theme"
            >
                <Palette size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-surface border border-white/10 rounded-xl shadow-xl p-2 animate-fade-in z-50 backdrop-blur-md">
                    <div className="text-xs font-medium text-dark-muted px-2 py-1 mb-1 uppercase tracking-wider">
                        Select Accent
                    </div>
                    <div className="space-y-1">
                        {themes.map((theme) => (
                            <button
                                key={theme.name}
                                onClick={() => {
                                    applyTheme(theme);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTheme.name === theme.name
                                        ? 'bg-white/10 text-white'
                                        : 'text-dark-muted hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span
                                    className="w-3 h-3 rounded-full shadow-glow-subtle"
                                    style={{ backgroundColor: theme.color, boxShadow: `0 0 8px ${theme.color}` }}
                                />
                                {theme.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Click outside listener could be added here for polish */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
