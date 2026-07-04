# Gaurav Mahale — AI Product Portfolio

Personal portfolio for AI Product Management roles: four LLM products designed, built, and shipped end to end, presented as PM case studies (problem, discovery, North Star, roadmap, outcomes, reflection).

**Live:** https://career-portfolio-google.vercel.app

## Stack

- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4 (editorial system: Fraunces display + Geist body, double-bezel cards)
- Framer Motion + CSS keyframes for entrance motion
- React Router (SPA, rewrites configured in `vercel.json`)

## Structure

```
constants.ts            project data, experience, themes (one color identity per project)
pages/Home.tsx          hero, work grid, trajectory, toolkit, contact
pages/ProjectDetail.tsx routes /project/:slug to a bespoke case layout
pages/projects/         per-case pages, shared kit (hero, metrics, roadmap), diagrams
```

Case-study content lives in `constants.ts` and `pages/projects/caseData.ts`; the components are templates over that data.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build to dist/
```

Deployed on Vercel; pushes to `main` auto-deploy.
