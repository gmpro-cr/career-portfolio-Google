#!/usr/bin/env node
/**
 * Simple deterministic harness sensor.
 * Scans source for emojis (common ranges) and fails the build if found.
 * This turns the "no emojis" rule into an enforceable CI gate.
 *
 * Usage: node scripts/no-emoji-guard.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Only scan production user-facing source + key config.
// Docs/plans and legacy static files are lower priority for now.
const TARGET_DIRS = ['components', 'pages', 'services', 'App.tsx', 'index.tsx', 'index.html', 'public'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.html'];

const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;

let violations = [];

function scan(target) {
  if (!target) return;
  const fullTarget = join(process.cwd(), target);
  if (!statSync(fullTarget, { throwIfNoEntry: false })) return;

  const stat = statSync(fullTarget);
  if (stat.isDirectory()) {
    const entries = readdirSync(fullTarget);
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
      scan(join(target, entry));
    }
  } else {
    if (EXTENSIONS.includes(extname(target))) {
      const content = readFileSync(fullTarget, 'utf8');
      const matches = content.match(EMOJI_REGEX);
      if (matches) {
        violations.push({ 
          file: target, 
          count: matches.length, 
          samples: [...new Set(matches)].slice(0, 3) 
        });
      }
    }
  }
}

TARGET_DIRS.forEach(t => scan(t));

if (violations.length > 0) {
  console.error('\n❌ Emoji guard failed — harness violation');
  violations.forEach(v => {
    console.error(`  ${v.file}: ${v.count} emoji(s) — e.g. ${v.samples.join(' ')}`);
  });
  console.error('\nRemove all emojis from UI/copy. This is a hard rule in AGENTS.md.\n');
  process.exit(1);
}

console.log('✅ No emojis found in source (emoji guard passed)');
