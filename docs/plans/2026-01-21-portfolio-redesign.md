# Portfolio Redesign: "Grounded"

## Overview

Fresh design for Gaurav Mahale's career portfolio with a warm, approachable aesthetic replacing the current Bloomberg terminal/stock market theme.

## Design Goals

- Land PM roles
- Attract freelance/consulting clients
- Build personal brand
- Showcase side projects

## Design Decisions

### Navigation
- Multi-page with persistent navbar
- Pages: Home, Work, Projects, About, Contact
- Fixed top navbar with name (left) and nav links (right)
- Mobile: Hamburger menu with slide-out drawer

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Warm white | `#FAF8F5` |
| Text primary | Charcoal | `#2D2A26` |
| Text secondary | Warm gray | `#6B6560` |
| Accent primary | Terracotta | `#C67D5A` |
| Accent secondary | Olive | `#7D8C6E` |
| Card background | Cream | `#F5F1EB` |

### Typography
- Headings: DM Serif Display (warm, editorial)
- Body: Inter (clean, readable)

### Visual Style
- Photo-forward with real project screenshots
- Cream card backgrounds with subtle shadows
- Rounded corners throughout
- Earth-toned badges for categorization

### Tone
- Confident but humble
- Achievement-focused without being boastful
- Example: "8 years turning complex problems into simple solutions"

---

## Page Designs

### Home

**Hero Section:**
- Split layout: Text left, professional photo right
- Headline: "Building products at the intersection of finance and AI"
- Subtext: "8 years turning complex problems into simple solutions — from ₹500 Cr portfolios to AI tools used by hundreds"
- CTAs: `View My Work` (solid terracotta) + `Get In Touch` (outline)

**Quick Stats Bar:**
- Olive background strip with 4 metrics
- "8+ Years Experience" | "₹500 Cr Managed" | "500 MAU Product" | "IIM Sirmaur"

**Featured Work Preview:**
- Heading: "Where I've Made Impact"
- 3 cards: Pareto.AI, Yes Bank, HDFC Bank
- Each: Company, role, one-line impact, arrow link

**Featured Projects Preview:**
- Heading: "Things I've Built"
- 2 larger cards: Credit Memo AI, AI Persona Platform
- Each: Title, description, metric badge, screenshot

**Footer:**
- Warm gray background
- "Let's build something together" + social links
- © 2025 Gaurav Mahale

---

### Work

**Page Header:**
- Cream banner with headline "My Journey"
- Subtext about the career path

**Timeline:**
- Vertical timeline, alternating left/right cards (desktop)
- Single column with left timeline (mobile)
- Olive line with terracotta node dots

**Experience Cards:**
- Role title (DM Serif)
- Company + type badge (AI/Finance/Operations)
- Period
- 3-4 impact bullets
- Cream background, subtle border

**Type Badges:**
- AI: Terracotta
- Finance: Olive
- Operations: Warm gray

**Education & Certifications:**
- Two-column below timeline
- Left: Education cards (IIM Sirmaur, Pune University)
- Right: Certification cards (IBM, HelloPM, Figma)

---

### Projects

**Page Header:**
- Headline: "Projects & Case Studies"
- Subtext: "Products I've built and problems I've analyzed"

**Tab Navigation:**
- Two tabs: `Builds` | `Case Studies`
- Active: Terracotta underline

**Project Cards (2-column grid):**
- Screenshot/mockup (16:9)
- Title + date
- One-line description
- Tech tags as pills
- Metric badge in corner
- Hover: lift + "View Details →"

**Project Detail View:**
- Problem → Approach → Key Insights → Outcomes
- Screenshots/mockups
- Framework tags
- Back link

---

### About

**Hero:**
- Larger photo + "About Me" headline
- 2-3 paragraph narrative

**Skills Section:**
- "What I Bring" heading
- 2x3 grid with progress bars
- AI/LLM Ops, Credit Risk, Product Mgmt, Python/SQL, Financial Modeling, UI/UX

**Tools & Tech:**
- Icon grid: Python, SQL, Gemini API, Claude, Figma, GA, PowerBI, Excel

**Personal Touch (optional):**
- "When I'm not building products..." section

---

### Contact

- Centered layout
- Headline: "Let's Connect"
- Subtext about what you're open to
- Form: Name, Email, Message, Submit (terracotta)
- Direct email + LinkedIn + location below

---

## Technical Implementation

### Stack (unchanged)
- React + TypeScript
- Vite
- Tailwind CSS

### New Dependencies
- React Router (for multi-page navigation)
- DM Serif Display + Inter fonts (Google Fonts)

### File Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── StatsBar.tsx
│   │   ├── FeaturedWork.tsx
│   │   └── FeaturedProjects.tsx
│   ├── work/
│   │   ├── Timeline.tsx
│   │   ├── ExperienceCard.tsx
│   │   └── EducationSection.tsx
│   ├── projects/
│   │   ├── ProjectTabs.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ProjectDetail.tsx
│   ├── about/
│   │   ├── AboutHero.tsx
│   │   ├── Skills.tsx
│   │   └── Tools.tsx
│   └── contact/
│       └── ContactForm.tsx
├── pages/
│   ├── Home.tsx
│   ├── Work.tsx
│   ├── Projects.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── App.tsx (router setup)
├── constants.ts (keep existing data)
└── types.ts (keep existing types)
```

### Tailwind Config Updates
- Add custom colors (warm-white, charcoal, terracotta, olive, cream)
- Add DM Serif Display font family
- Extend with custom shadows

---

## Migration Notes

- Keep all existing data in constants.ts
- Keep existing types
- Replace all components with new design
- Remove: Background, Navigator, TopBar (spatial nav components)
- Remove: Stock ticker, market watch, acquisition footer metaphors
