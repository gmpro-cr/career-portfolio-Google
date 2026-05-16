# High-End Portfolio Redesign — 2026-05-17

Direction: full redesign of `career-portfolio-Google-1` to a high-end / expensive aesthetic per the `high-end-visual-design` taste-skill (Soft Structuralism + editorial luxury accents).

## Aesthetic system

- **Palette**
  - Background: pure white `#FFFFFF`; warm cream `#FDFBF7` for paper sections
  - Text: warm near-black `#1A1410` (not pure black)
  - Muted: stone-500 `#78716C`
  - Hairlines: `stone-200/60`
- **Typography**
  - Display: **Fraunces** (variable serif, free Google Fonts), heavy optical sizing for H1/H2
  - Body: **Geist Sans** (or Plus Jakarta fallback)
  - Numerals: `font-variant-numeric: tabular-nums`
- **Icons**: `@phosphor-icons/react` weight="thin". Remove ALL emojis from constants.ts and components.
- **Cards (Double-Bezel pattern)**: outer shell (`bg-stone-50 ring-1 ring-stone-200/60 p-1.5 rounded-[2rem]`) wrapping inner core (`bg-white rounded-[calc(2rem-0.375rem)]` with inset highlight shadow).
- **Motion**: `cubic-bezier(0.32, 0.72, 0, 1)` 700–900ms. No `linear` / `ease-in-out`. Magnetic hover (`active:scale-[0.98]`, icon translates `+1px x, -1px y`).

## Section flow (replaces current)

1. **Hero** — Editorial Split. Massive serif H1 left, kinetic stat tiles right. Eyebrow pill above H1.
2. **Selected Work** — Asymmetric Bento (6-card masonry). Featured spans `col-span-8 row-span-2`. **Modal killed** → inline accordion expand.
3. **Thesis** — single Double-Bezel card, pull-quote as block-serif statement.
4. **Trajectory** — vertical timeline (logos left rail, role/bullets right). Credentials sub-grid (Education + Certifications) beneath.
5. **Toolkit** — typographic list grouped by Build / Ship / Measure; tool row as monochrome logos.
6. **Contact** — single button-in-button CTA, social row, minimal footer.

## What gets removed

- `ThemePicker.tsx` and its dynamic `--accent-color` variable (sites that commit to one aesthetic feel more confident).
- Project modal (`AnimatePresence` block in Home.tsx) — replaced by inline accordion.
- All emojis from `TOOLS` array and `category` badges (🚀 📋 🐍 etc.).
- `lucide-react` import (replaced by `@phosphor-icons/react`).
- Unused page routes: `pages/About.tsx`, `Contact.tsx`, `Projects.tsx`, `Work.tsx`.

## Build order

1. Foundation: fonts, tokens, icon swap, remove emojis
2. Navbar (fluid island, hamburger morph, no ThemePicker)
3. Hero (Editorial Split)
4. Selected Work (Bento + inline expand)
5. Thesis card
6. Trajectory timeline + Credentials
7. Toolkit
8. Contact
9. Delete dead pages
10. Browser test (dev server + mobile breakpoint) + deploy

## Risks

- **Modal removal** loses case-study real estate → mitigated by inline accordion.
- **Fraunces vs PP Editorial New** — using free Fraunces; paid font can swap later.
- **Tailwind v4 + custom CSS vars** — ThemePicker's `--accent-color` switching gets removed; accent hardcoded as `#1A1410`.

## Pre-output checklist (from high-end-visual-design SKILL)

- [ ] No banned fonts (Inter, Roboto, Arial, Open Sans, Helvetica)
- [ ] No standard Lucide / FontAwesome / Material icons
- [ ] No generic 1px solid gray borders or harsh dark shadows
- [ ] No edge-to-edge sticky navbars
- [ ] No symmetric 3-col Bootstrap grids
- [ ] No `linear` / `ease-in-out` transitions
- [ ] Double-Bezel applied to all major cards
- [ ] Button-in-Button trailing icons on CTAs
- [ ] Section padding minimum `py-24`
- [ ] Scroll entry animations everywhere
- [ ] Mobile: `w-full`, `px-4`, `py-8`, no `h-screen` (use `min-h-[100dvh]`)
- [ ] Animations only via `transform` and `opacity`
- [ ] `backdrop-blur` only on fixed/sticky elements
