# Harness Workflow for AI-Generated Changes

This project uses a minimal but effective **harness** (defined primarily in `AGENTS.md`).

## Daily Operating Procedure (for Claude Code, Cursor, etc.)

1. **Start the session correctly**
   ```
   Read the full AGENTS.md at the project root. 
   You are now operating inside this harness. 
   Confirm you have internalized the non-negotiables, PEV loop, and deployment rules.
   ```

2. **For any task larger than a one-line fix, follow PEV**

   **P — Plan**
   - Restate goal
   - List files touched
   - Call out deploy impact (new routes, env, heavy deps, vercel.json)
   - List exact verification steps you will run

   **E — Execute** the code changes

   **V — Verify** (do not stop until green)
   - `npm run verify` (typecheck + build)
   - If UI changed: `npm run preview` (or push branch for real Vercel preview URL)
   - Manually walk the pages on desktop + narrow mobile (375px)
   - Check browser console on the preview
   - Run the explicit checklist in AGENTS.md §5

3. **Deployment flow (recommended for agents)**

   - Make changes on a feature branch
   - Commit + push
   - Vercel automatically creates a **preview deployment**
   - Instruct the agent (or do it yourself): "Open the Vercel preview URL and perform visual + functional verification"
   - Only after preview is clean: merge to `main` (triggers production deploy)
   - For hotfixes on main: still run `npm run verify` locally first

4. **When an agent makes a repeated mistake**

   - Add a new rule or clarification to `AGENTS.md`
   - Improve error messages or add a script that gives the agent better feedback
   - Commit the improvement so every future session benefits

## Useful Commands (Harness Surface)

```bash
npm run dev              # local development
npm run verify           # typecheck + full build (primary gate)
npm run typecheck        # strict TS only
npm run build            # production build
npm run preview          # serve the built dist locally
```

## Vercel Integration Tips

- Every push to a branch gives you a shareable preview URL. Use it as the agent's "staging" environment.
- Preview URLs are immutable and perfect for the Verify step.
- After merge to main you get a prod URL + instant rollback available in the Vercel dashboard.

## Evolving the Harness

The harness is a living artifact. Good additions:
- New deterministic checks (e.g., a script that greps for emojis in src/)
- Stronger rules after a painful prod incident
- Explicit taste guidelines pulled from high-end visual design skills

Current version: v1 (focused on design system fidelity + reliable Vercel deploys for AI-generated work).

---

Use this workflow every time. It is the difference between fast demos and sites you can confidently ship.