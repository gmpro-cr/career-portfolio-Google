#!/usr/bin/env node
/**
 * Design audit — the mechanical half of the recurring design review.
 *
 * Checks the code against the committed design system in DESIGN.md and reports
 * a DELTA against the previous run, not a snapshot. A weekly list of the same
 * fifteen findings is noise; "1 new, 0 fixed" is signal.
 *
 * It deliberately does NOT judge taste, hierarchy, or whether a layout reads.
 * Those are not mechanically checkable, and encoding them produces a report
 * that cries wolf. That pass lives in /design-audit.
 *
 * Every finding cites the DESIGN.md section it violates, so a fix can be
 * justified by the committed system rather than by opinion.
 *
 * Usage:
 *   node scripts/design-audit.mjs           report the delta
 *   node scripts/design-audit.mjs --save    accept current findings as baseline
 *   node scripts/design-audit.mjs --strict  exit 1 on a NEW high-severity finding
 */

import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { execFileSync } from 'node:child_process';

const SAVE = process.argv.includes('--save');
const STRICT = process.argv.includes('--strict');

const ROOT = process.cwd();
const STATE_DIR = join(ROOT, 'out', 'design-audit');
const STATE_FILE = join(STATE_DIR, 'state.json');
const DETECTOR = `${process.env.HOME}/.claude/skills/impeccable/scripts/detect.mjs`;

// ---------------------------------------------------------------- design system
// These allowlists mirror DESIGN.md. If you change one, change DESIGN.md too —
// the file is the standard, this is only its executable shadow.

const PALETTE = {
  ink: '#1A1410',
  'ink-muted': '#78716C',
  paper: '#FDFBF7',
  hairline: '#E7E5E4',
  shell: '#FAFAF9',
  white: '#FFFFFF',
};

// Warm stone ramp — off-token but on-system, so not palette drift.
const WARM_NEUTRALS = ['#57534E', '#44403C', '#3A332E', '#F5F5F4', '#E8E3DC'];

// Deliberate one-offs, allowlisted in DESIGN.md.
const OK_TEXT_SIZES = ['10px'];
const OK_TRACKING = ['0.22em'];
const OK_RADII = ['2rem', 'calc(2rem-0.375rem)'];

const SPRING = 'cubic-bezier(0.32,0.72,0,1)';

// ---------------------------------------------------------------- colour maths

const toRgb = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const linearise = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map((v) => linearise(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (fg, bg) => {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
};

// ---------------------------------------------------------------- file loading

const SCAN_DIRS = ['components', 'pages'];
const SCAN_FILES = ['App.tsx', 'index.tsx'];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (['.tsx', '.ts'].includes(extname(full))) out.push(full);
  }
  return out;
}

const sources = [];
for (const d of SCAN_DIRS) if (existsSync(join(ROOT, d))) walk(join(ROOT, d), sources);
for (const f of SCAN_FILES) if (existsSync(join(ROOT, f))) sources.push(join(ROOT, f));

const files = sources.map((f) => ({
  path: relative(ROOT, f),
  text: readFileSync(f, 'utf8'),
}));

const css = existsSync(join(ROOT, 'index.css')) ? readFileSync(join(ROOT, 'index.css'), 'utf8') : '';

// ---------------------------------------------------------------- findings

const findings = [];
const add = (severity, check, rule, file, line, message) =>
  findings.push({ id: `${check}:${file}:${message}`, severity, check, rule, file, line, message });

const lineOf = (text, index) => text.slice(0, index).split('\n').length;

// -- 1. contrast (DESIGN.md §1) ------------------------------------------------
// Only pairs the markup actually uses. Checking every token against every
// surface invents findings for combinations that never render.
const SURFACES = ['white', 'paper', 'shell'];
for (const fgName of ['ink', 'ink-muted']) {
  const used = files.some((f) => f.text.includes(`text-${fgName}`)) || fgName === 'ink';
  if (!used) continue;
  for (const bgName of SURFACES) {
    const ratio = contrast(PALETTE[fgName], PALETTE[bgName]);
    if (ratio < 4.5) {
      add('high', 'contrast', 'DESIGN.md §1 (contrast floor 4.5:1)', 'tailwind.config.ts', 0,
        `${fgName} (${PALETTE[fgName]}) on ${bgName} is ${ratio.toFixed(2)}:1, below the 4.5:1 AA floor`);
    } else if (ratio < 5) {
      add('low', 'contrast-headroom', 'DESIGN.md §1 (contrast floor 4.5:1)', 'tailwind.config.ts', 0,
        `${fgName} on ${bgName} is ${ratio.toFixed(2)}:1 — passes AA with under 0.5 headroom, do not darken surfaces`);
    }
  }
}

// -- per-file checks -----------------------------------------------------------
const known = new Set([...Object.values(PALETTE), ...WARM_NEUTRALS].map((h) => h.toUpperCase()));

for (const { path: file, text } of files) {
  // -- 2. off-palette hex (DESIGN.md §1)
  // A hex written as a data property (color:/bg:/dot: in a plain object) is a
  // CATEGORICAL palette — architecture diagrams, status badges. Those exist to
  // stay mutually distinguishable, so flattening them into the warm ramp would
  // be a regression, not a fix. Collapsed to one informational finding per file.
  const categorical = new Set();
  for (const m of text.matchAll(/#[0-9A-Fa-f]{6}\b/g)) {
    const hex = m[0].toUpperCase();
    if (known.has(hex)) continue;
    const from = text.lastIndexOf('\n', m.index) + 1;
    const to = text.indexOf('\n', m.index);
    const line = text.slice(from, to === -1 ? undefined : to);
    const isData = /\b(color|bg|dot|border|text|fill|stroke):\s*['"]#/.test(line)
      && !/className|style=/.test(line);
    if (isData) { categorical.add(hex); continue; }
    add('medium', 'off-palette', 'DESIGN.md §1 (Soft Structuralism palette)', file, lineOf(text, m.index),
      `${hex} is outside the committed palette`);
  }
  if (categorical.size) {
    add('low', 'categorical-palette', 'DESIGN.md §1 (categorical colour — OPEN DECISION)', file, 0,
      `${categorical.size} categorical diagram/status colours outside the palette — do not auto-fix, needs a human decision`);
  }

  // -- 3. type scale drift (DESIGN.md §2)
  for (const m of text.matchAll(/text-\[([0-9.]+px)\]/g)) {
    if (OK_TEXT_SIZES.includes(m[1])) continue;
    add('low', 'type-scale', 'DESIGN.md §2 (committed size scale)', file, lineOf(text, m.index),
      `text-[${m[1]}] is outside the scale — collapse into text-xs/sm/base or text-[10px]`);
  }

  // -- 4. tracking drift (DESIGN.md §2)
  for (const m of text.matchAll(/tracking-\[([^\]]+)\]/g)) {
    if (OK_TRACKING.includes(m[1])) continue;
    add('low', 'tracking-scale', 'DESIGN.md §2 (committed tracking)', file, lineOf(text, m.index),
      `tracking-[${m[1]}] is outside the committed tracking (tracking-tight / 0.22em)`);
  }

  // -- 5. radius drift (DESIGN.md §3)
  for (const m of text.matchAll(/rounded-\[([^\]]+)\]/g)) {
    const v = m[1].replace(/\s/g, '');
    if (OK_RADII.includes(v)) continue;
    add('low', 'radius-scale', 'DESIGN.md §3 (radius)', file, lineOf(text, m.index),
      `rounded-[${m[1]}] is outside the committed radii (rounded-full, 2rem bezel)`);
  }

  // -- 6. token bypass (DESIGN.md §3, §4)
  for (const m of text.matchAll(/ease-\[cubic-bezier\(([^)]+)\)\]/g)) {
    const v = `cubic-bezier(${m[1].replace(/\s/g, '')})`;
    if (v === SPRING) {
      add('medium', 'token-bypass', 'DESIGN.md §4 (ease-spring token)', file, lineOf(text, m.index),
        `inline ${v} duplicates the ease-spring token — use ease-spring`);
    }
  }
  for (const m of text.matchAll(/shadow-\[([^\]]+)\]/g)) {
    add('low', 'token-bypass', 'DESIGN.md §3 (shadow tokens)', file, lineOf(text, m.index),
      `inline shadow-[${m[1].slice(0, 40)}...] — prefer shadow-lifted / shadow-lifted-sm`);
  }

  // -- 7. focus affordance (DESIGN.md §5)
  // Only a finding when nothing replaces the ring in the same class list.
  for (const m of text.matchAll(/className=[{"'`]([^"'`}]*outline-none[^"'`}]*)/g)) {
    const cls = m[1];
    if (/focus-visible:|ring-|outline-\[|border-ink|focus:ring/.test(cls)) continue;
    add('high', 'focus-affordance', 'DESIGN.md §5 (visible focus)', file, lineOf(text, m.index),
      'outline-none with no replacement focus affordance');
  }

  // -- 8. motion that escapes prefers-reduced-motion (DESIGN.md §4)
  for (const m of text.matchAll(/repeat:\s*Infinity/g)) {
    add('medium', 'reduced-motion', 'DESIGN.md §4 (prefers-reduced-motion)', file, lineOf(text, m.index),
      'infinite Framer Motion loop — JS-driven motion is not stopped by the CSS reduced-motion block');
  }

  // -- 9. flat card where Double-Bezel is the system (DESIGN.md §3)
  // Deliberately narrow. An earlier, looser version (rounded + border + shadow)
  // flagged 40x40 circular icon buttons as cards. A card here means: real
  // padding, a large non-circular radius, an edge, and a shadow.
  for (const m of text.matchAll(/className=[{"'`]([^"'`}]{20,})/g)) {
    const cls = m[1];
    if (cls.includes('bezel') || /\brounded-full\b/.test(cls)) continue;
    const padded = /\bp-([4-9]|1[0-9])\b|\bp-\[/.test(cls);
    const carded = /\brounded-(2xl|3xl)\b|\brounded-\[/.test(cls);
    const edged = /\bborder\b|\bborder-[a-z]|\bring-1\b/.test(cls);
    const shadowed = /\bshadow-(lifted|\[)/.test(cls);
    if (padded && carded && edged && shadowed) {
      add('low', 'flat-card', 'DESIGN.md §3 (Double-Bezel card system)', file, lineOf(text, m.index),
        'padded border + shadow card outside the bezel system');
    }
  }
}

// -- 10. font families (DESIGN.md §2) -----------------------------------------
const fams = new Set();
for (const m of css.matchAll(/font-family:\s*([^;]+);/g)) {
  const first = m[1].split(',')[0].trim().replace(/['"]/g, '');
  if (!/^(ui-|system-|inherit|-apple)/.test(first)) fams.add(first);
}
if (fams.size > 2) {
  add('medium', 'font-count', 'DESIGN.md §2 (two families)', 'index.css', 0,
    `${fams.size} font families in play (${[...fams].join(', ')}) — the system commits to Fraunces + Geist`);
}

// -- 11. impeccable detector, minus its font warnings --------------------------
// Geist and Fraunces are committed identity here, so "overused-font" is noise.
function detectorFindings() {
  if (!existsSync(DETECTOR)) return;
  const targets = ['index.css', ...files.map((f) => f.path)].filter((p) => existsSync(join(ROOT, p)));
  let out = '';
  try {
    out = execFileSync('node', [DETECTOR, ...targets], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) {
    out = e.stdout || '';
  }
  let current = '';
  for (const raw of out.split('\n')) {
    if (!raw.startsWith(' ')) { current = raw.trim(); continue; }
    const m = raw.match(/^\s+line (\d+): \[([a-z-]+)\]\s*(.*)$/);
    if (!m) continue;
    if (m[2] === 'overused-font') continue;
    add('low', `impeccable:${m[2]}`, 'impeccable detector', relative(ROOT, current) || current, Number(m[1]),
      m[3].trim());
  }
}
detectorFindings();

// ---------------------------------------------------------------- delta + report

let previous = [];
if (existsSync(STATE_FILE)) {
  try { previous = JSON.parse(readFileSync(STATE_FILE, 'utf8')).ids || []; } catch { previous = []; }
}

const ids = findings.map((f) => f.id);
const isFirstRun = !existsSync(STATE_FILE);
const fresh = findings.filter((f) => !previous.includes(f.id));
const fixed = previous.filter((id) => !ids.includes(id));

const RANK = { high: 0, medium: 1, low: 2 };
findings.sort((a, b) => RANK[a.severity] - RANK[b.severity] || a.file.localeCompare(b.file) || a.line - b.line);

const count = (s) => findings.filter((f) => f.severity === s).length;

console.log('\nDesign audit — checked against DESIGN.md\n');

if (!findings.length) {
  console.log('  No findings. The code matches the committed system.\n');
} else {
  let lastFile = '';
  for (const f of findings) {
    if (f.file !== lastFile) { console.log(`  ${f.file}`); lastFile = f.file; }
    const isNew = !previous.includes(f.id);
    const flag = isFirstRun ? ' ' : isNew ? '+' : ' ';
    const where = f.line ? `:${f.line}` : '';
    console.log(`  ${flag} [${f.severity}] ${f.check}${where} — ${f.message}`);
    console.log(`        ${f.rule}`);
  }
  console.log('');
}

console.log(`  ${findings.length} findings — ${count('high')} high, ${count('medium')} medium, ${count('low')} low`);

if (isFirstRun) {
  console.log('  First run — this is the baseline. Re-run after changes to see the delta.');
} else {
  console.log(`  Delta since last run: ${fresh.length} new, ${fixed.length} fixed`);
}

if (SAVE) {
  mkdirSync(STATE_DIR, { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify({ savedAt: new Date().toISOString(), ids }, null, 2));
  console.log(`  Baseline saved to ${relative(ROOT, STATE_FILE)}`);
}
console.log('');

const newHigh = fresh.filter((f) => f.severity === 'high').length;
if (STRICT && !isFirstRun && newHigh > 0) {
  console.error(`Design audit failed: ${newHigh} new high-severity finding(s).\n`);
  process.exit(1);
}
