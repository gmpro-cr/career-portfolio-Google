---
description: Audit the portfolio UI against DESIGN.md, then fix the findings on a branch
---

# Design audit

Run a full design review of this portfolio and **fix what you find**, working on
a branch so nothing lands on `main` without the user looking at it.

`DESIGN.md` is the standard. `AGENTS.md` still governs build and deploy.

## The one rule that matters

**Every fix must cite a rule in `DESIGN.md`.**

A change that cannot cite one is a redesign, not an audit. Redesigns need a
human decision first — surface them as a proposal at the end and leave the code
alone. The June featured-grid / ResultBand redesign was built and reverted; do
not recreate that situation.

Corollary: if you think `DESIGN.md` itself is wrong, say so and stop. Changing
the standard is the user's call, and it is a separate conversation from fixing
code that drifted from it.

## Steps

**1. Read the standard.** Read `DESIGN.md` in full before looking at any code.

**2. Mechanical pass.**

```
npm run design-audit
```

Findings marked `categorical-palette`, and any rule flagged `OPEN DECISION`, are
**reportable but not fixable** — they need a human decision. Do not touch them.

**3. Judgment pass.** Load the `impeccable` skill. Start the dev server
(`npm run dev`) and look at the actual rendered site with Chrome:

- Home, and at least two case-study pages
- At **desktop width and 375px** — mobile is first-class here, and bugs have
  shipped before from desktop-only checking

Judge what the script cannot: hierarchy, rhythm, whether sections read, whether
spacing is doing work, whether motion earns its place. Tie each observation
back to a `DESIGN.md` rule, or hold it as a proposal.

**4. Rank.** Merge both passes into one list ordered by severity. For each:
the finding, the `DESIGN.md` rule it violates, and the fix.

**5. Fix.** On a fresh branch:

```
git checkout -b design-audit/$(date +%Y-%m-%d)
```

Apply every fixable finding. Prefer the smallest change that satisfies the
rule — replacing `ease-[cubic-bezier(0.32,0.72,0,1)]` with `ease-spring` is the
shape of a good fix. Do not restyle adjacent code because you happen to be in
the file.

**6. Verify.**

```
npm run verify
npm run design-audit
```

`verify` must pass. The second audit run shows the delta — it should report the
findings you fixed as fixed. Re-check the changed pages in the browser at both
widths; a green typecheck does not prove the page still looks right.

**7. Stop at the branch.** Do not push it, do not merge it, and do not deploy.
Leave the branch for the user to review and merge.

Report: what changed, what the delta was, what you deliberately did not touch
and why, and any proposals that needed a human decision.

## Baseline

After the user accepts a run, `npm run design-audit -- --save` sets the new
baseline so the next run reports a true delta.
