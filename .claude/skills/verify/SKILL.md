---
name: verify
description: How to build, run, and drive this portfolio site (React/Vite SPA) for runtime verification
---

# Verifying career-portfolio-Google-1

This is a Vite + React 19 + TypeScript SPA (no server, no tests). Verification
means running the dev server and driving the UI in a real browser — `tsc`
and `vite build` are necessary but not sufficient; they don't catch runtime
behavior bugs (e.g. broken animations, state bugs).

## Build & run

```bash
npx tsc --noEmit        # typecheck — note: no @types/react installed in this
                         # repo, so JSX prop-checking is looser than usual;
                         # don't rely on it to catch prop-shape bugs
npm run build            # vite build — fast, catches import/syntax errors
npm run dev               # starts on :3000 (or next free port if busy)
```

## Driving it

Use `claude-in-chrome` tools. `tabs_context_mcp` → `navigate` to
`http://localhost:<port>/` → interact via `computer`/`javascript_tool`.

Prefer **`javascript_tool` with direct DOM `.click()` and state polling**
over screenshot+coordinate clicking for anything stateful — screenshot-based
coordinate clicks are fragile once the page has scrolled or content has
shifted, and screenshots taken immediately after a click can race the
animation, producing misleading "empty" captures. Pattern:

```js
document.getElementById('work').scrollIntoView({behavior:'instant'});
const cards = Array.from(document.querySelectorAll('.work-card'));
cards[0].click();
await new Promise(r=>setTimeout(r, 500));
// then assert on document state (querySelector counts, text content)
```

## Known gotchas

- **`scrollIntoView({behavior:'smooth'})` silently no-ops when the tab is
  backgrounded** (`document.hidden === true`) — a real Chromium behavior,
  not just a test-harness artifact. Any auto-scroll triggered on page load
  (e.g. from a URL param) should use `behavior: 'instant'` instead, since a
  landing-position jump doesn't need to be animated anyway.
- **`framer-motion`'s `AnimatePresence` does not reliably unmount exiting
  children in this app** — confirmed independent of `mode="wait"` and
  independent of what's animated (tested with both `height:'auto'→0` and a
  simple opacity/y fade). The exit animation completes visually (inline
  style reaches its target values) but the component is never removed from
  the DOM. Root cause not fully identified (possibly a framer-motion 12 /
  React 19 interaction); the fix was to avoid `AnimatePresence` for
  conditionally-unmounted content and instead use a manual
  `open/mounted/closing` state pattern with a `setTimeout`-delayed unmount
  and a plain CSS `transition` — matches the codebase's existing convention
  (`kit.tsx`'s `Reveal`, `Home.tsx`'s own `Reveal`/`MaskLines`/`StaggerList`
  all use plain CSS transitions, not framer-motion, for exactly this kind
  of reveal/hide). If re-introducing `AnimatePresence` anywhere, verify the
  unmount actually happens by clicking to close and polling
  `document.querySelectorAll(...)` counts after the transition duration —
  don't trust a visual screenshot alone, since the exit animation completing
  looks identical to a successful unmount in a single frame.
- The dev server auto-picks a free port (3000, 3001, 3002...) if the default
  is busy — check the actual `Local:` URL it prints rather than assuming
  :3000.
- **`requestAnimationFrame` is throttled to near-zero (effectively paused)
  on a backgrounded tab** — same root cause as the smooth-scroll gotcha
  above. A polling loop written as `requestAnimationFrame(tryAgain)` can
  silently never fire again once the tab is backgrounded, even though the
  condition it's polling for (e.g. an element existing after a route
  change) becomes true almost immediately. `setTimeout(tryAgain, ms)`
  keeps firing (throttled, not paused) and is the reliable choice for any
  polling/retry loop that must work regardless of tab focus — e.g.
  Navbar.tsx's cross-page "navigate home then scroll to an anchor" retry.
  Diagnose this by comparing a `setTimeout`-based sampling loop (which
  will show the condition becoming true) against the actual polling code
  (which never proceeds) — if they disagree, suspect rAF throttling.
