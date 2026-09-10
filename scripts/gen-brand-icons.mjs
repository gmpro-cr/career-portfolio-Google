#!/usr/bin/env node
/**
 * Author-time generator for components/BrandIcons.tsx.
 *
 * Pulls official mark geometry and brand colours from simple-icons and inlines
 * them, so the app ships accurate logos with no runtime dependency. Drawing
 * these by hand was the alternative, and an approximated logo reads as a wrong
 * logo -- worse than no logo at all.
 *
 * Usage: node scripts/gen-brand-icons.mjs > components/BrandIcons.tsx
 */
const SVG = (s) => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${s}.svg`;
const DATA = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/data/simple-icons.json';

// component name -> [simple-icons slug, title as it appears in the data file]
const ICONS = {
  NextjsMark:     ['nextdotjs',    'Next.js'],
  ReactMark:      ['react',        'React'],
  TypeScriptMark: ['typescript',   'TypeScript'],
  PythonMark:     ['python',       'Python'],
  FastApiMark:    ['fastapi',      'FastAPI'],
  PostgreSqlMark: ['postgresql',   'PostgreSQL'],
  SupabaseMark:   ['supabase',     'Supabase'],
  GeminiMark:     ['googlegemini', 'Google Gemini'],
  ClaudeMark:     ['claude',       'Claude'],
  WasmMark:       ['webassembly',  'WebAssembly'],
  TailwindMark:   ['tailwindcss',  'Tailwind CSS'],
  VercelMark:     ['vercel',       'Vercel'],
  GithubMark:     ['github',       'GitHub'],
  XBrandMark:     ['x',            'X'],
  LinkedinMark:   ['linkedin',     'LinkedIn'],
};

// simple-icons still publishes the LinkedIn mark but has dropped it from the
// data file, so its official brand blue is supplied here rather than looked up.
const MANUAL_HEX = { LinkedIn: '0A66C2' };

const INK = '#1A1410';
const raw = await (await fetch(DATA)).json();
const list = raw.icons ?? raw;
const hexOf = Object.fromEntries(list.map((i) => [i.title, i.hex]));

const rows = [];
for (const [name, [slug, title]] of Object.entries(ICONS)) {
  const svg = await (await fetch(SVG(slug))).text();
  const d = svg.match(/ d="([^"]+)"/)?.[1];
  const hex = hexOf[title] ?? MANUAL_HEX[title];
  if (!d || !hex) { console.error(`FAILED ${slug}: path=${!!d} hex=${!!hex}`); process.exit(1); }
  // Brands whose official colour is black render in ink instead: visually
  // identical at 14px, and DESIGN.md forbids pure #000 anywhere on this site.
  const lum = parseInt(hex.slice(0,2),16)*0.299 + parseInt(hex.slice(2,4),16)*0.587 + parseInt(hex.slice(4,6),16)*0.114;
  const dark = lum < 40;
  rows.push({ name, title, d, color: dark ? INK : `#${hex.toUpperCase()}`, official: `#${hex.toUpperCase()}`, dark });
  console.error(`  ok ${slug.padEnd(14)} #${hex}${dark ? ' -> ink' : ''}`);
}

const body = rows.map((r) =>
  `/** ${r.title} — official mark. Brand colour ${r.official}${r.dark ? ', rendered in ink (DESIGN.md forbids pure black)' : ''}. */\n` +
  `export const ${r.name} = (p: BrandIconProps) => mark(p, '${r.color}', '${r.d}');`
).join('\n\n');

process.stdout.write(`/* AUTO-GENERATED — do not hand-edit.
   Regenerate with: node scripts/gen-brand-icons.mjs > components/BrandIcons.tsx

   Geometry and brand colours come from simple-icons rather than being drawn by
   hand, because an approximated logo reads as a wrong logo. Marks whose official
   colour is black are rendered in ink instead: indistinguishable at 14px, and
   DESIGN.md rules out pure #000 site-wide. */
import React from 'react';

export type BrandIconProps = { size?: number; className?: string; color?: string };

/* \`color\` overrides the brand colour — used where a mark must inherit
   currentColor to keep an existing hover transition. */
const mark = ({ size = 14, className = '', color }: BrandIconProps, brand: string, d: string) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color ?? brand}
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d={d} />
  </svg>
);

${body}
`);
