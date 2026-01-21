# Portfolio Redesign "Grounded" - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Bloomberg-terminal styled portfolio into a warm, approachable multi-page site with earth tones.

**Architecture:** React Router for multi-page navigation, shared Layout component with Navbar/Footer, page components importing section components. Keep existing data in constants.ts.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router v6, Lucide React icons

---

## Task 1: Install React Router

**Files:**
- Modify: `package.json`

**Step 1: Install react-router-dom**

Run:
```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && npm install react-router-dom
```

**Step 2: Verify installation**

Run:
```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && cat package.json | grep react-router
```
Expected: `"react-router-dom": "^7.x.x"` in dependencies

**Step 3: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add package.json package-lock.json && git commit -m "chore: add react-router-dom for multi-page navigation"
```

---

## Task 2: Update Fonts in index.html

**Files:**
- Modify: `index.html`

**Step 1: Add DM Serif Display font**

Replace the Google Fonts link in index.html:

```html
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet">
```

**Step 2: Update page title**

Change `<title>` to:
```html
<title>Gaurav Mahale | AI Product Manager</title>
```

**Step 3: Verify dev server loads fonts**

Run:
```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && npm run dev
```
Expected: Dev server starts, fonts load in browser

**Step 4: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add index.html && git commit -m "chore: add DM Serif Display font, update title"
```

---

## Task 3: Update Tailwind Config with Earth Tones

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Replace tailwind.config.ts content**

```typescript
import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./App.tsx",
        "./index.tsx",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['DM Serif Display', 'serif'],
            },
            colors: {
                // Earth tone palette
                warm: {
                    white: '#FAF8F5',
                    cream: '#F5F1EB',
                },
                charcoal: '#2D2A26',
                muted: '#6B6560',
                terracotta: {
                    DEFAULT: '#C67D5A',
                    light: '#D4967A',
                    dark: '#A86544',
                },
                olive: {
                    DEFAULT: '#7D8C6E',
                    light: '#9AAA8B',
                    dark: '#5F6B52',
                },
                // Keep some utility colors
                gray: {
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                }
            },
            boxShadow: {
                'soft': '0 2px 8px 0 rgba(45, 42, 38, 0.08)',
                'card': '0 4px 16px 0 rgba(45, 42, 38, 0.1)',
                'elevated': '0 8px 24px 0 rgba(45, 42, 38, 0.12)',
            },
        }
    },
    plugins: [],
} satisfies Config
```

**Step 2: Verify build works**

Run:
```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && npm run build
```
Expected: Build completes without errors

**Step 3: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add tailwind.config.ts && git commit -m "style: update tailwind config with earth tone palette"
```

---

## Task 4: Update Global CSS

**Files:**
- Modify: `index.css`

**Step 1: Replace index.css content**

```css
@import "tailwindcss";

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-warm-white text-charcoal antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-terracotta text-white px-6 py-3 rounded-lg font-medium
           hover:bg-terracotta-dark transition-colors duration-200;
  }

  .btn-outline {
    @apply border-2 border-terracotta text-terracotta px-6 py-3 rounded-lg font-medium
           hover:bg-terracotta hover:text-white transition-colors duration-200;
  }

  .card {
    @apply bg-warm-cream rounded-xl p-6 shadow-soft;
  }

  .badge-ai {
    @apply bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm font-medium;
  }

  .badge-finance {
    @apply bg-olive/10 text-olive px-3 py-1 rounded-full text-sm font-medium;
  }

  .badge-ops {
    @apply bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium;
  }
}
```

**Step 2: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add index.css && git commit -m "style: update global CSS with earth tone utilities"
```

---

## Task 5: Create Layout Components Directory

**Files:**
- Create: `components/layout/` directory

**Step 1: Create layout directory**

Run:
```bash
mkdir -p "/Users/gaurav/Career Portfolio/career-portfolio-Google/components/layout"
```

**Step 2: Verify directory exists**

Run:
```bash
ls "/Users/gaurav/Career Portfolio/career-portfolio-Google/components/layout"
```

---

## Task 6: Create Navbar Component

**Files:**
- Create: `components/layout/Navbar.tsx`

**Step 1: Create Navbar.tsx**

```tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/work', label: 'Work' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-warm-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-serif text-xl text-charcoal hover:text-terracotta transition-colors">
            Gaurav Mahale
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-terracotta'
                    : 'text-muted hover:text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-warm-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-terracotta'
                    : 'text-muted hover:text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
```

**Step 2: Verify file created**

Run:
```bash
ls -la "/Users/gaurav/Career Portfolio/career-portfolio-Google/components/layout/Navbar.tsx"
```

**Step 3: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add components/layout/Navbar.tsx && git commit -m "feat: add Navbar component with responsive mobile menu"
```

---

## Task 7: Create Footer Component

**Files:**
- Create: `components/layout/Footer.tsx`

**Step 1: Create Footer.tsx**

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* CTA */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl text-charcoal">Let's build something together</p>
            <p className="text-muted mt-1">Open to opportunities and collaborations</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:mahalegauravk@gmail.com"
              className="p-3 rounded-full bg-warm-cream text-muted hover:text-terracotta hover:bg-terracotta/10 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://linkedin.com/in/gauravmahale"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-warm-cream text-muted hover:text-terracotta hover:bg-terracotta/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/gauravmahale"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-warm-cream text-muted hover:text-terracotta hover:bg-terracotta/10 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Gaurav Mahale. Built with React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add components/layout/Footer.tsx && git commit -m "feat: add Footer component with social links"
```

---

## Task 8: Create Layout Wrapper Component

**Files:**
- Create: `components/layout/Layout.tsx`

**Step 1: Create Layout.tsx**

```tsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

**Step 2: Create index export file**

Create `components/layout/index.ts`:

```typescript
export { default as Layout } from './Layout';
export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';
```

**Step 3: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add components/layout/ && git commit -m "feat: add Layout wrapper component"
```

---

## Task 9: Create Pages Directory and Home Page

**Files:**
- Create: `pages/` directory
- Create: `pages/Home.tsx`

**Step 1: Create pages directory**

Run:
```bash
mkdir -p "/Users/gaurav/Career Portfolio/career-portfolio-Google/pages"
```

**Step 2: Create Home.tsx**

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Lightbulb, GraduationCap, Users } from 'lucide-react';
import { EXPERIENCES, PROJECTS } from '../constants';

export default function Home() {
  const featuredExperiences = EXPERIENCES.slice(0, 3);
  const featuredProjects = PROJECTS.filter(p => p.category === 'build').slice(0, 2);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
                Building products at the intersection of{' '}
                <span className="text-terracotta">finance</span> and{' '}
                <span className="text-olive">AI</span>
              </h1>
              <p className="mt-6 text-lg text-muted max-w-xl">
                8 years turning complex problems into simple solutions — from ₹500 Cr portfolios to AI tools used by hundreds.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/work" className="btn-primary inline-flex items-center justify-center gap-2">
                  View My Work <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-outline inline-flex items-center justify-center">
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-warm-cream border-4 border-terracotta/20 overflow-hidden shadow-elevated">
                <div className="w-full h-full flex items-center justify-center text-muted">
                  {/* Placeholder - replace with actual photo */}
                  <span className="text-6xl">👨‍💼</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-olive text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-1">
              <Briefcase size={24} className="opacity-80" />
              <span className="text-2xl font-semibold">8+</span>
              <span className="text-sm opacity-80">Years Experience</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">₹</span>
              <span className="text-2xl font-semibold">500 Cr</span>
              <span className="text-sm opacity-80">Portfolios Managed</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Users size={24} className="opacity-80" />
              <span className="text-2xl font-semibold">500</span>
              <span className="text-sm opacity-80">MAU Product</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <GraduationCap size={24} className="opacity-80" />
              <span className="text-2xl font-semibold">IIM</span>
              <span className="text-sm opacity-80">Sirmaur</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl text-charcoal">Where I've Made Impact</h2>
            <Link to="/work" className="text-terracotta hover:text-terracotta-dark font-medium inline-flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredExperiences.map((exp, index) => (
              <div key={index} className="card hover:shadow-card transition-shadow">
                <span className={`${exp.type === 'AI' ? 'badge-ai' : exp.type === 'Finance' ? 'badge-finance' : 'badge-ops'}`}>
                  {exp.type}
                </span>
                <h3 className="mt-4 text-xl font-serif text-charcoal">{exp.role}</h3>
                <p className="text-muted mt-1">{exp.company}</p>
                <p className="text-sm text-muted mt-1">{exp.period}</p>
                <p className="mt-4 text-sm text-muted line-clamp-2">{exp.description[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl text-charcoal">Things I've Built</h2>
            <Link to="/projects" className="text-terracotta hover:text-terracotta-dark font-medium inline-flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-warm-white rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow">
                {/* Project Screenshot Placeholder */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <Lightbulb size={48} className="text-gray-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-serif text-charcoal">{project.title}</h3>
                    <span className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm font-medium">
                      {project.metrics}
                    </span>
                  </div>
                  <p className="mt-2 text-muted">{project.description.slice(0, 120)}...</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 3: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add pages/Home.tsx && git commit -m "feat: add Home page with hero, stats, featured sections"
```

---

## Task 10: Create Work Page

**Files:**
- Create: `pages/Work.tsx`

**Step 1: Create Work.tsx**

```tsx
import React from 'react';
import { EXPERIENCES, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';
import { GraduationCap, Award } from 'lucide-react';

export default function Work() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-warm-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl text-charcoal">My Journey</h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            From engineering foundations to AI product building — a path driven by curiosity and impact.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-olive/30 transform md:-translate-x-1/2" />

            {/* Experience Cards */}
            {EXPERIENCES.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-terracotta border-4 border-warm-white transform -translate-x-1/2 mt-6 z-10" />

                {/* Card */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="card">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <span className={`${exp.type === 'AI' ? 'badge-ai' : exp.type === 'Finance' ? 'badge-finance' : 'badge-ops'}`}>
                        {exp.type}
                      </span>
                      <span className="text-sm text-muted">{exp.period}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-serif text-charcoal">{exp.role}</h3>
                    <p className="text-terracotta font-medium">{exp.company}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-sm text-muted flex gap-2">
                          <span className="text-olive mt-1">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className="text-2xl text-charcoal flex items-center gap-3 mb-6">
                <GraduationCap className="text-olive" size={28} />
                Education
              </h2>
              <div className="space-y-4">
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.id} className="bg-warm-white rounded-xl p-5 shadow-soft">
                    <h3 className="font-serif text-lg text-charcoal">{edu.institution}</h3>
                    <p className="text-muted">{edu.degree}</p>
                    <p className="text-sm text-muted mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-2xl text-charcoal flex items-center gap-3 mb-6">
                <Award className="text-terracotta" size={28} />
                Certifications
              </h2>
              <div className="space-y-4">
                {CERTIFICATIONS_DATA.map((cert) => (
                  <div key={cert.id} className="bg-warm-white rounded-xl p-5 shadow-soft">
                    <h3 className="font-serif text-lg text-charcoal">{cert.name}</h3>
                    <p className="text-muted">{cert.issuer}</p>
                    <p className="text-sm text-muted mt-1">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add pages/Work.tsx && git commit -m "feat: add Work page with timeline and education sections"
```

---

## Task 11: Create Projects Page

**Files:**
- Create: `pages/Projects.tsx`

**Step 1: Create Projects.tsx**

```tsx
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Lightbulb, FileText } from 'lucide-react';

type Tab = 'builds' | 'case-studies';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>('builds');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const builds = PROJECTS.filter(p => p.category === 'build');
  const caseStudies = PROJECTS.filter(p => p.category === 'case-study');
  const displayedProjects = activeTab === 'builds' ? builds : caseStudies;

  return (
    <div>
      {/* Page Header */}
      <section className="bg-warm-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl text-charcoal">Projects & Case Studies</h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Products I've built and problems I've analyzed.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('builds')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'builds'
                  ? 'border-terracotta text-terracotta'
                  : 'border-transparent text-muted hover:text-charcoal'
              }`}
            >
              <span className="flex items-center gap-2">
                <Lightbulb size={18} />
                Builds ({builds.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('case-studies')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'case-studies'
                  ? 'border-terracotta text-terracotta'
                  : 'border-transparent text-muted hover:text-charcoal'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText size={18} />
                Case Studies ({caseStudies.length})
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {displayedProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="bg-warm-cream rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all cursor-pointer group"
              >
                {/* Screenshot Placeholder */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  {activeTab === 'builds' ? (
                    <Lightbulb size={48} className="text-gray-300" />
                  ) : (
                    <FileText size={48} className="text-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-charcoal font-medium transition-opacity">
                      View Details →
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-serif text-charcoal">{project.title}</h3>
                      <p className="text-sm text-muted">{project.date}</p>
                    </div>
                    <span className="flex-shrink-0 bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm font-medium">
                      {project.metrics}
                    </span>
                  </div>
                  <p className="mt-3 text-muted line-clamp-2">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs bg-warm-white text-gray-600 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs text-muted">+{project.tech.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-warm-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif text-charcoal">{selectedProject.title}</h2>
                  <p className="text-muted mt-1">{selectedProject.date}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted hover:text-charcoal text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Metric Badge */}
              <div className="mt-4">
                <span className="bg-terracotta/10 text-terracotta px-4 py-2 rounded-full font-medium">
                  {selectedProject.metrics}
                </span>
              </div>

              {/* Link if exists */}
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark"
                >
                  <ExternalLink size={16} />
                  View Live Project
                </a>
              )}

              {/* Problem */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-charcoal">The Problem</h3>
                <p className="mt-2 text-muted">{selectedProject.problem}</p>
              </div>

              {/* Approach */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Approach</h3>
                <ul className="mt-2 space-y-2">
                  {selectedProject.approach.map((item, i) => (
                    <li key={i} className="text-muted flex gap-2">
                      <span className="text-olive">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Insights */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Key Insights</h3>
                <ul className="mt-2 space-y-2">
                  {selectedProject.keyInsights.map((item, i) => (
                    <li key={i} className="text-muted flex gap-2">
                      <span className="text-terracotta">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Outcomes</h3>
                <ul className="mt-2 space-y-2">
                  {selectedProject.outcomes.map((item, i) => (
                    <li key={i} className="text-muted flex gap-2">
                      <span className="text-olive">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Tech Stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              {selectedProject.frameworks && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Frameworks Used</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.frameworks.map((fw, i) => (
                      <span key={i} className="bg-olive/10 text-olive px-3 py-1 rounded-full text-sm">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add pages/Projects.tsx && git commit -m "feat: add Projects page with tabs and detail modal"
```

---

## Task 12: Create About Page

**Files:**
- Create: `pages/About.tsx`

**Step 1: Create About.tsx**

```tsx
import React from 'react';
import { SKILL_DATA, TECH_STACK } from '../constants';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-warm-cream border-4 border-olive/20 overflow-hidden shadow-elevated">
                <div className="w-full h-full flex items-center justify-center text-muted">
                  <span className="text-6xl">👨‍💼</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl text-charcoal">About Me</h1>
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  I started as an engineer, became fascinated by how businesses make decisions, and found my calling at the intersection of finance and AI.
                </p>
                <p>
                  Over 8 years, I've managed portfolios worth ₹500 Cr, built AI tools that save hours of manual work, and helped companies make better lending decisions. My MBA from IIM Sirmaur gave me the strategic lens; my engineering background gives me the builder's mindset.
                </p>
                <p>
                  Today, I'm most excited about using AI to solve real problems in financial services — not flashy demos, but tools that actually ship and create value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl text-charcoal text-center mb-12">What I Bring</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_DATA.map((skill) => (
              <div key={skill.subject} className="bg-warm-white rounded-xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-charcoal">{skill.subject}</h3>
                  <span className="text-sm text-muted">{skill.A}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.A}%`,
                      background: `linear-gradient(90deg, #7D8C6E 0%, #C67D5A 100%)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl text-charcoal text-center mb-12">Tools & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH_STACK.map((tech) => (
              <div key={tech.id} className="card text-center hover:shadow-card transition-shadow">
                <h3 className="font-medium text-charcoal">{tech.name}</h3>
                <p className="text-sm text-muted mt-1">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-20 bg-olive text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-serif">When I'm not building products...</h2>
          <p className="mt-6 text-lg opacity-90">
            You'll find me exploring the latest AI research, reading about behavioral economics, or figuring out how to explain complex financial concepts to non-finance folks. I believe the best products come from deeply understanding both the technology and the humans who use it.
          </p>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add pages/About.tsx && git commit -m "feat: add About page with skills and tools sections"
```

---

## Task 13: Create Contact Page

**Files:**
- Create: `pages/Contact.tsx`

**Step 1: Create Contact.tsx**

```tsx
import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // For now, just simulate sending
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-warm-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl text-charcoal">Let's Connect</h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Whether it's a role, a project, or just a conversation about AI and finance — I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-warm-white focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-warm-white focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-warm-white focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors resize-none"
                    placeholder="What would you like to discuss?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : status === 'sent' ? (
                    'Message Sent!'
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="card">
                <h3 className="font-serif text-lg text-charcoal mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:mahalegauravk@gmail.com"
                    className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors"
                  >
                    <Mail size={20} />
                    <span>mahalegauravk@gmail.com</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/gauravmahale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>linkedin.com/in/gauravmahale</span>
                  </a>
                  <div className="flex items-center gap-3 text-muted">
                    <MapPin size={20} />
                    <span>Pune, India</span>
                  </div>
                </div>
              </div>

              <div className="card bg-olive/5 border border-olive/20">
                <h3 className="font-serif text-lg text-charcoal mb-2">Open to</h3>
                <ul className="space-y-2 text-muted">
                  <li>• Full-time PM/AI roles</li>
                  <li>• Consulting projects</li>
                  <li>• Speaking opportunities</li>
                  <li>• Coffee chats about AI & Finance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add pages/Contact.tsx && git commit -m "feat: add Contact page with form and info"
```

---

## Task 14: Create Pages Index Export

**Files:**
- Create: `pages/index.ts`

**Step 1: Create pages/index.ts**

```typescript
export { default as Home } from './Home';
export { default as Work } from './Work';
export { default as Projects } from './Projects';
export { default as About } from './About';
export { default as Contact } from './Contact';
```

**Step 2: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add pages/index.ts && git commit -m "chore: add pages index export"
```

---

## Task 15: Update App.tsx with Router

**Files:**
- Modify: `App.tsx`

**Step 1: Replace App.tsx content**

```tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Home, Work, Projects, About, Contact } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
```

**Step 2: Commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add App.tsx && git commit -m "feat: setup React Router with all pages"
```

---

## Task 16: Test the Application

**Step 1: Start dev server**

Run:
```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && npm run dev
```

**Step 2: Verify all pages work**

Test in browser:
- http://localhost:5173/ (Home)
- http://localhost:5173/work (Work)
- http://localhost:5173/projects (Projects)
- http://localhost:5173/about (About)
- http://localhost:5173/contact (Contact)

Expected: All pages render with earth tone styling, navbar works, footer shows on all pages.

**Step 3: Test mobile responsiveness**

Open browser dev tools, toggle mobile view. Verify:
- Hamburger menu appears on mobile
- Cards stack vertically
- Text is readable

---

## Task 17: Build and Verify Production Build

**Step 1: Run production build**

Run:
```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && npm run build
```
Expected: Build completes without errors

**Step 2: Preview production build**

Run:
```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && npm run preview
```
Expected: Preview server starts, all pages work at preview URL

**Step 3: Final commit**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add -A && git commit -m "feat: complete portfolio redesign with earth tone theme"
```

---

## Task 18: Clean Up Old Components (Optional)

**Files:**
- Delete old components no longer needed

**Step 1: Remove old component files**

Run:
```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && rm -rf components/sections components/AcquisitionFooter.tsx components/AnalystChat.tsx components/AssetBreakdown.tsx components/Background.tsx components/CaseStudyModal.tsx components/EducationPanel.tsx components/GeminiComms.tsx components/Header.tsx components/HistoricalPerformance.tsx components/MarketSummary.tsx components/MarketWatch.tsx components/Navigation.tsx components/Navigator.tsx components/ProjectDetailModal.tsx components/TopBar.tsx components/VenturePortfolio.tsx
```

**Step 2: Commit cleanup**

```bash
cd "/Users/gaurav/Career Portfolio/career-portfolio-Google" && git add -A && git commit -m "chore: remove old Bloomberg-themed components"
```

---

## Summary

18 tasks covering:
1. Dependencies (React Router)
2. Fonts (DM Serif Display)
3. Tailwind config (earth tones)
4. Global CSS (utility classes)
5. Layout components (Navbar, Footer, Layout)
6. All 5 pages (Home, Work, Projects, About, Contact)
7. Router setup
8. Testing & cleanup

Total estimated commits: 15-18
