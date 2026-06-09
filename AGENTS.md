# Career Portfolio — Agent Harness (Vercel + React/Vite)

**Agent = Model + Harness.**  
This file is the primary feedforward contract for any coding agent (Claude Code, Cursor, Groq, etc.) working in this repository. It survives across sessions and is the single source of truth for how to build, verify, and deploy.

Humans provide intent and taste. Agents execute inside these guardrails.

## 1. Non-Negotiables (Hard Constraints)

- **No emojis** in any UI, copy, alt text, or comments that surface to users.
- **Icon policy**: Use `@phosphor-icons/react` exclusively for new or modified icons. Do not introduce or expand usage of `lucide-react` in new work. Existing Lucide usage may be left or migrated only when touching the component.
- **Typography**: 
  - Body / UI: `font-sans` → Geist
  - Display / headlines: `font-display` → Fraunces
- **Design system fidelity**: Double-Bezel card system, soft structuralism palette (`paper`, `ink`, `ink-muted`, `hairline`, `shell`), lifted shadows, spring timing. Match existing components exactly unless explicitly changing the system.
- **No Inter, Roboto, or generic sans** in new design work.
- All changes must be TypeScript-strict and pass `npm run build`.

## 2. Stack & Environment

- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- Framer Motion for motion
- React Router v7 (SPA)
- Deploy target: Vercel (SPA rewrite already configured)
- Package manager: npm (use `npm install --legacy-peer-deps` when needed for Vercel)

Key files to respect:
- `vite.config.ts`
- `tailwind.config.ts` (colors, fonts, bezel utilities, animations)
- `tsconfig.json`
- `vercel.json`

## 3. Mandatory Workflow: Plan → Execute → Verify (PEV)

Never do "generate and hope". Always follow this loop for any non-trivial change:

1. **Plan** (output explicitly)
   - Restate the user intent in your own words.
   - List files that will be created/modified.
   - Identify affected routes/components.
   - Note any deployment impact (new env vars, route changes, bundle size risk, etc.).
   - Propose verification steps.

2. **Execute** the changes.

3. **Verify** (do not declare done until this passes):
   - Run `npm run build` locally — must succeed with zero errors/warnings that affect output.
   - Run TypeScript check: `npx tsc --noEmit`
   - If adding UI: open `npm run preview` or (preferred) push to a branch and inspect the Vercel preview URL.
   - Walk the affected pages on desktop + mobile (use browser devtools or real device).
   - Check console for errors in preview.
   - Confirm no new console.log / debugger statements left in committed code.
   - For visual/taste changes: explicitly compare against existing high-end editorial standard (Fraunces + Geist, generous spacing, bezel cards, refined micro-interactions).

If any gate fails, fix it before moving on. Use the error output as structured feedback to self-correct.

## 4. Deployment Harness (Vercel-Specific)

Vercel previews + immutable deployments are part of the harness. Treat them as first-class verification surfaces.

### Rules for Deployment
- **Never hardcode secrets or API keys** in source. Use Vercel environment variables (or `.env.local` for local only).
- **SPA routing**: All routes must fall back to `/index.html`. The current `vercel.json` rewrite is intentional — do not remove or weaken it.
- **Build must be deterministic**: `npm run build` must produce the same result in CI and locally.
- **Bundle discipline**: Large dependencies (recharts, heavy framer-motion usage, etc.) must be justified. Prefer code-splitting for route-level chunks when adding heavy pages.
- **Preview before prod**: For anything beyond tiny text fixes, create a branch, let Vercel generate a preview URL, verify on that URL, then merge to main (which triggers prod deploy).
- **vercel.json** changes require explicit review in the plan phase.
- After any deploy-affecting change, the agent should note the preview URL in its final summary so a human can also spot-check if desired.

### Recommended Vercel Settings (keep in sync)
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install --legacy-peer-deps` (already in vercel.json)
- Node version: match the one that builds cleanly locally (usually 20.x or 22.x)

## 5. Quality Gates & Sensors (Feedback)

### Deterministic / Computational (run on every change)
- TypeScript: `npx tsc --noEmit` (strict)
- Build: `npm run build`
- (Future) Add ESLint + Prettier if not present; run as part of verify.

### Agent Self-Review Checklist (must mentally or explicitly run)
- [ ] Matches the documented design system (fonts, colors, bezels, motion)
- [ ] No emojis
- [ ] Correct icon library used
- [ ] Responsive (mobile-first, no horizontal scroll on 375px)
- [ ] No layout shift on load where avoidable
- [ ] Keyboard accessible where interactive
- [ ] No new runtime errors in console on preview
- [ ] Environment variables handled correctly (no leaks)
- [ ] Route works on direct deep link (SPA)

### Continuous / Drift Sensors (run periodically or on PR)
- Build size growth — flag if a single change adds >15-20% to main bundle without justification.
- Dead code / unused imports (can be agent-assisted).
- Visual regression on key pages (manual or Playwright when set up).

## 6. Common AI Failure Modes & How This Harness Prevents Them

- Inconsistent design system → Explicit palette + font rules + "match existing components" directive
- Broken production deploys → Mandatory `build` gate + preview verification step
- Hardcoded secrets / wrong env handling → Explicit rule + plan phase callout
- Emoji or wrong icon creep → Hard ban + preferred library
- Over-engineering or feature creep → Plan phase requires restating intent; reviewer-style self-check
- SPA routing breakage → vercel.json rule + deep-link test in verify

## 7. How to Load This Harness

When starting a session with any coding agent:

> "You are operating inside the harness defined in AGENTS.md at the project root. Read it fully before making changes. Follow the PEV workflow and all hard constraints."

For large tasks, also load relevant high-level skills if available in your environment:
- taste-skill / frontend-design / impeccable / design-taste-frontend for UI quality
- webapp-testing for verification
- Any project-specific docs in `/docs`

## 8. Steering the Harness (Human + Agent Loop)

Whenever the same class of mistake happens twice:
1. Add or tighten a rule in this file (feedforward).
2. Improve an error message or add a deterministic check that gives the agent actionable feedback (sensor).
3. Update this file and commit it so future sessions inherit the improvement.

This is the core of harness engineering: turn every failure into a permanent, cheaper-to-enforce constraint.

---

**Current status**: This is v1 of the project harness. It will evolve. When you (the agent) discover a new failure mode that isn't covered, propose an addition to this file.

Start every non-trivial task by acknowledging you have read and will follow AGENTS.md.