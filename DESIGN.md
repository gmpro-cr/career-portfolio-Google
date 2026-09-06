# DESIGN.md — the committed design system

This file is the **standard the design audit checks against**. `AGENTS.md` owns
build/deploy/workflow rules; this file owns *what the site is allowed to look
like*.

Its purpose is to make design drift a **checkable question** ("where does the
code disagree with this file?") rather than a matter of taste on the day. If a
rule here is wrong, change the rule here first, then change the code — not the
other way round.

Anything not listed here is not committed, and the audit will not invent an
opinion about it.

---

## 1. Palette — Soft Structuralism

The only colours in the system. Defined in `tailwind.config.ts`.

| Token        | Hex       | Role                                  |
|--------------|-----------|---------------------------------------|
| `ink`        | `#1A1410` | Warm near-black. Primary text.        |
| `ink-muted`  | `#78716C` | Secondary text, labels, captions.     |
| `paper`      | `#FDFBF7` | Warm cream secondary surface.         |
| `hairline`   | `#E7E5E4` | Borders, rules, dividers.             |
| `shell`      | `#FAFAF9` | Outer bezel shell.                    |
| white        | `#FFFFFF` | Primary surface.                      |

**Rules**

- Never pure `#000000`. `ink` is warm black by design.
- The neutral ramp is **warm** (stone). Cool greys (`#6B7280`, `#9CA3AF`,
  `#D1D5DB`, `#F9FAFB`) are off-system — they read grey-blue next to `paper`.
- Prefer the token (`text-ink-muted`) over the literal (`#78716C`) in TSX.

**Contrast floor: WCAG AA, 4.5:1 for body text.**

Note `ink-muted` measures ~4.8:1 on white and ~4.6:1 on `paper`. It passes, but
with almost no headroom — do not darken surfaces or lighten `ink-muted`
without re-measuring. The audit computes this on every run.

### Categorical colour — OPEN DECISION

Two places use colour *categorically* rather than decoratively:

- `pages/projects/caseData.ts` — architecture-diagram layer accents
  (frontend / API / AI engine / data), 29 colours
- `pages/projects/kit.tsx` — shipped / building / planned status badges

These are Tailwind default blue/violet/emerald/orange, so they sit outside the
warm palette. But they exist to stay **mutually distinguishable**: flattening a
four-layer architecture diagram into one warm ramp destroys the information the
colour is carrying. That is a regression, not a fix.

The audit therefore reports them once per file as informational and **must
never auto-fix them**. Resolve this by either committing a warm-adjusted
categorical ramp here, or exempting categorical colour outright. Until then it
stays open.

---

## 2. Typography

Two families. A third is a defect.

- **Display** — Fraunces (`font-display`). All `h1`–`h4`, set with
  `letter-spacing: -0.02em` and `text-wrap: balance` in `index.css`.
- **Body / UI** — Geist (`font-sans`), `font-feature-settings: 'ss01', 'cv11'`.
- No Inter, Roboto, or generic system sans in new work.

**Committed size scale:** `text-xs` · `text-sm` · `text-base` · `text-lg` ·
`text-xl` · `text-2xl` · `text-3xl` · `text-4xl` · `text-5xl`, plus the single
arbitrary size `text-[10px]` for eyebrow labels.

`text-[9px]`, `text-[11px]`, `text-[13px]`, `text-[15px]` are **drift** — each
appears once or twice and should collapse into the scale.

**Committed tracking:** `tracking-tight` for display, `tracking-[0.22em]` for
eyebrow/uppercase labels.

`tracking-[0.14em]`, `[0.16em]`, `[0.18em]` are drift.
`index.css .eyebrow` currently sets `0.2em` while TSX eyebrows use `0.22em` —
these must converge on one value.

Numerals in tabular contexts use `.tabular`.

---

## 3. Spacing, radius, surface

- **Radius:** `rounded-full` for pills; `rounded-[2rem]` for the bezel outer and
  `rounded-[calc(2rem-0.375rem)]` for the bezel core — these two are deliberate
  and allowlisted. `rounded-[22px]` is drift.
- **Card system: Double-Bezel.** `.bezel` + `.bezel-core` in `index.css`.
  A flat `border + box-shadow` card is a defect — it is the generic pattern the
  bezel system exists to replace.
- **Shadows** come from tokens: `shadow-lifted`, `shadow-lifted-sm`,
  `shadow-bezel-inset`. Inline `shadow-[0_8px_16px_-10px_rgba(...)]` duplicates
  `shadow-lifted-sm` and should use the token.
- Paper grain (`body::before`, opacity `0.028`) is committed identity. It is a
  texture, not an effect — do not raise its opacity.
- The grain **drifts 8px over 30s**, alternating (see §4). Opacity stays
  `0.028`; the drift is what gives the surface life, not additional contrast.

---

## 4. Motion

- **Easing:** `cubic-bezier(0.32, 0.72, 0, 1)`, exposed as the `ease-spring`
  token. Writing the literal `ease-[cubic-bezier(0.32,0.72,0,1)]` bypasses the
  token for no benefit — use `ease-spring`.
- **Duration:** 700ms for surface transitions, 900ms for `fade-up` entrance.
- **Entrance:** the `fade-up` keyframe (opacity + 24px rise + 6px blur).
- **Ambient motion** is limited to the paper grain: `grainDrift`, 8px over 30s,
  `ease-in-out infinite alternate`, driven by `transform: translate3d` so it is
  GPU-composited rather than repainting the viewport. Amplitude is deliberately
  below the threshold of notice — the site should feel like paper, not look
  animated. Raising the amplitude or shortening the period reads as shimmer on
  low-DPI displays and is a defect.
- This is the **only** idle background animation in the system. A second one
  competes with it and needs a human decision first.
- **`prefers-reduced-motion` is mandatory.** `index.css` neutralises animation
  and transition globally; Framer Motion components must not reintroduce motion
  that escapes it.

---

## 5. Accessibility

- Visible focus is non-negotiable. `index.css` sets a global
  `:focus-visible` ring (2px `ink`, 3px offset). `focus:outline-none` without a
  replacement affordance is a **high** finding.
- Body text meets 4.5:1. Decorative and disabled text is exempt.
- Interactive targets: 44px minimum on touch viewports.
- Every page must hold up at **375px** — mobile is a first-class viewport here,
  not a fallback. Bugs have shipped from desktop-only checking before.

---

## 6. Non-goals — directions already rejected

Do not reintroduce these. They are settled, not open questions.

- **No emoji anywhere.** Enforced by `scripts/no-emoji-guard.mjs`.
- **No new `lucide-react`.** Phosphor only for new or modified icons.
- **The June featured-grid / ResultBand redesign was built and reverted.** Do
  not propose or reimplement a card-grid treatment of Featured Projects, or a
  banded results strip. The current single-column editorial layout, modelled on
  prasen.dev, is the committed direction.
- No gradient-heavy hero, no glassmorphism, no drop shadows as decoration.

---

## 7. How this file is used

`npm run design-audit` checks the mechanically checkable parts of sections 1–5
and reports a **delta** against the last run. `/design-audit` runs that, adds a
visual judgment pass at desktop and 375px, then fixes findings on a branch.

**Every fix must cite a rule in this file.** A change that cannot cite one is a
redesign, not an audit, and needs a human decision first.
