import React, { useState, useMemo, useEffect } from 'react';
import { Mail, Linkedin, MapPin, GraduationCap, Award, ExternalLink, FileText, Github, Download, ArrowRight, X, ArrowUp } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { EXPERIENCES, PROJECTS, SKILL_DATA, TECH_STACK, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';

// Grouped skills for the redesigned section
const SKILL_CATEGORIES = [
  {
    title: 'Product & Strategy',
    icon: '🧭',
    skills: [
      { name: 'Product Management', score: 85 },
      { name: 'User Research', score: 80 },
      { name: 'A/B Testing', score: 75 },
      { name: 'Roadmapping', score: 80 },
      { name: 'RICE Prioritization', score: 85 },
    ]
  },
  {
    title: 'Finance & Analytics',
    icon: '📊',
    skills: [
      { name: 'Credit Risk Analysis', score: 95 },
      { name: 'Financial Modeling', score: 90 },
      { name: 'Portfolio Management', score: 90 },
      { name: 'PowerBI / Dashboards', score: 85 },
      { name: 'Advanced Excel', score: 92 },
    ]
  },
  {
    title: 'Technical & AI',
    icon: '⚡',
    skills: [
      { name: 'AI / LLM Ops', score: 90 },
      { name: 'Python', score: 85 },
      { name: 'SQL / Databases', score: 82 },
      { name: 'Prompt Engineering', score: 88 },
      { name: 'Gemini / Claude APIs', score: 90 },
    ]
  }
];

const TOOLS = [
  { name: 'Python', icon: '🐍' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'Gemini API', icon: '✨' },
  { name: 'Claude', icon: '🤖' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Google Analytics', icon: '📈' },
  { name: 'PowerBI', icon: '📊' },
  { name: 'Excel', icon: '📑' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'Git', icon: '🔀' },
];

// Stat pills for hero
const STATS = [
  { label: '8+ Years', sublabel: 'Experience' },
  { label: '₹500 Cr', sublabel: 'Portfolio Managed' },
  { label: '500 MAU', sublabel: 'AI Platform Users' },
];

function SkillBar({ score, delay }: { score: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="skill-bar">
      <div className="skill-bar-fill" style={{ width: `${width}%` }} />
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const { searchQuery } = useSearch();

  // Escape key handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return PROJECTS;
    const lowerQuery = searchQuery.toLowerCase();
    return PROJECTS.filter(project =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.tech.some(t => t.toLowerCase().includes(lowerQuery)) ||
      project.category.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  return (
    <div className="relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute top-0 left-0 w-full h-[800px] aurora-bg -z-10 opacity-60"></div>

      {/* Animated gradient orb */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full -z-10 animate-gradient-pulse"
        style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }}
      />

      {/* ============ HERO SECTION ============ */}
      <motion.section
        id="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-28 md:py-36 relative"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-dark-surface/60 border border-white/10 rounded-full px-4 py-1.5 mb-8 text-sm text-dark-muted backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            Open to Product Management roles
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl text-dark-text leading-tight tracking-tight mb-6">
            <span className="text-gradient font-bold">Finance Pro</span>{' '}
            turned{' '}
            <span className="text-accent font-bold">Product Manager</span>
          </h1>
          <p className="mt-6 text-xl text-dark-muted max-w-2xl mx-auto leading-relaxed">
            8 years solving complex problems. From managing ₹500 Cr portfolios to building AI tools that cut analysis time by 80%.
          </p>

          {/* Floating Stat Pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                className={`bg-dark-surface/60 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-center ${i === 0 ? 'animate-float' : i === 1 ? 'animate-float-delayed' : 'animate-float-delayed-2'}`}
              >
                <div className="text-xl md:text-2xl font-bold text-accent">{stat.label}</div>
                <div className="text-xs text-dark-muted mt-0.5">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects" className="btn-primary inline-flex items-center justify-center gap-2">
              <ArrowRight size={18} />
              View My Work
            </a>
            <a href="/Gaurav_Mahale_Resume.pdf" download className="btn-download inline-flex items-center justify-center gap-2">
              <Download size={18} />
              Resume
            </a>
          </div>
        </div>
      </motion.section>

      {/* ============ ABOUT SECTION ============ */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-4">About Me</h2>
          <div className="section-divider" />

          <div className="glass-card p-8 md:p-10">
            <div className="space-y-6 text-dark-muted text-lg leading-relaxed">
              <p>
                I've spent 8 years in the trenches of corporate banking, solving complex problems for stressed assets. As a <strong className="text-dark-text">Relationship Manager at Yes Bank</strong>, I didn't just manage a portfolio; I learned what drives value for B2B users.
              </p>
              <p>
                Now, I've pivoted to Product Management. My side projects aren't just code—they're products with users. <strong className="text-dark-text">500+ monthly users on my AI platform</strong>, tools deployed in production, and real problems solved.
              </p>
            </div>

            {/* Why Product - with accent border */}
            <div className="mt-10 rounded-xl p-8 border-l-4 bg-dark-bg/50 border-white/5" style={{ borderLeftColor: 'var(--accent-color)' }}>
              <h3 className="text-xl font-bold text-dark-text mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Why Product?
              </h3>
              <p className="text-dark-muted text-lg leading-relaxed">
                I realized my best moments in banking weren't closing deals—they were <strong className="text-dark-text">fixing broken systems</strong>. When I automated workflows or built internal tools, I felt alive.
              </p>
              <p className="text-dark-muted text-lg leading-relaxed mt-4">
                My finance background is my superpower. I understand enterprise sales, regulatory constraints, and the "value" of a solution.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ============ EXPERIENCE SECTION ============ */}
      <motion.section
        id="experience"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 relative"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-4">Experience</h2>
          <div className="section-divider" />

          {/* Current Roles - 60/40 split */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Yes Bank */}
            <div className="md:w-3/5">
              <div className="card h-full">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className="badge-finance">Finance</span>
                  <span className="text-sm text-dark-muted">{EXPERIENCES[0].period}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-dark-text">{EXPERIENCES[0].role}</h3>
                <p className="text-accent-orange font-medium mt-1">{EXPERIENCES[0].company}</p>
                <ul className="mt-6 space-y-3">
                  {EXPERIENCES[0].description.map((desc, i) => (
                    <li key={i} className="text-dark-muted flex gap-3 text-base">
                      <span className="mt-1.5 text-xs" style={{ color: 'var(--accent-color)' }}>●</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pareto.AI */}
            <div className="md:w-2/5">
              <div className="card h-full border bg-accent-10 border-accent-20">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className="badge-ai">AI</span>
                  <span className="text-xs text-dark-muted">{EXPERIENCES[4].period}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-dark-text">{EXPERIENCES[4].role}</h3>
                <p className="text-accent-purple font-medium mt-1 text-sm">{EXPERIENCES[4].company}</p>
                <ul className="mt-4 space-y-3">
                  {EXPERIENCES[4].description.slice(0, 3).map((desc, i) => (
                    <li key={i} className="text-sm text-dark-muted flex gap-3">
                      <span className="text-accent-purple mt-1.5 text-xs">●</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Previous Experiences */}
          <div className="space-y-6">
            {EXPERIENCES.slice(1, 4).map((exp, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className={`${exp.type === 'AI' ? 'badge-ai' : exp.type === 'Finance' ? 'badge-finance' : 'badge-ops'}`}>
                    {exp.type}
                  </span>
                  <span className="text-sm text-dark-muted">{exp.period}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-dark-text">{exp.role}</h3>
                <p className="text-dark-muted font-medium mt-1" style={{ color: exp.type === 'Finance' ? '#fb923c' : undefined }}>{exp.company}</p>
                <ul className="mt-4 space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-dark-muted flex gap-3 text-base">
                      <span className="mt-1.5 text-xs" style={{ color: 'var(--accent-color)', opacity: 0.6 }}>●</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider between Experience and Education */}
          <div className="mt-16 mb-8 border-t border-white/5" />

          {/* Education & Certifications */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-dark-text flex items-center gap-3 mb-6">
                <GraduationCap className="text-accent" size={24} />
                Education
              </h3>
              <div className="space-y-4">
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-lg bg-dark-bg/30 border border-white/5 hover:border-white/10 transition-colors">
                    <h4 className="font-semibold text-dark-text">{edu.institution}</h4>
                    <p className="text-sm text-dark-muted">{edu.degree}</p>
                    <p className="text-xs text-dark-muted/70 mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-dark-text flex items-center gap-3 mb-6">
                <Award className="text-accent-purple" size={24} />
                Certifications
              </h3>
              <div className="space-y-4">
                {CERTIFICATIONS_DATA.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-lg bg-dark-bg/30 border border-white/5 hover:border-white/10 transition-colors">
                    <h4 className="font-semibold text-dark-text">{cert.name}</h4>
                    <p className="text-sm text-dark-muted">{cert.issuer}</p>
                    <p className="text-xs text-dark-muted/70 mt-1">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ============ PROJECTS SECTION ============ */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-4">Projects & Case Studies</h2>
          <div className="section-divider" />
          <p className="text-dark-muted text-center mb-16 max-w-2xl mx-auto">
            Products I've built and problems I've analyzed. Proof that I can ship.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group cursor-pointer relative overflow-hidden flex flex-col h-full bg-dark-surface/50 hover:bg-dark-surface/80 transition-all duration-300 rounded-xl border hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm ${project.category === 'build'
                    ? 'border-l-4 border-l-accent-blue border-white/5 hover:border-white/10'
                    : 'border-l-4 border-l-accent-purple border-white/5 hover:border-white/10'
                    }`}
                  style={{
                    boxShadow: 'none',
                  }}
                  whileHover={{
                    boxShadow: `0 0 30px ${project.category === 'build' ? 'rgba(96,165,250,0.1)' : 'rgba(192,132,252,0.1)'}`,
                  }}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.category === 'build' ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'}`}>
                        {project.category === 'build' ? '🔨 Build' : '📋 Case Study'}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-dark-text group-hover:text-accent transition-colors mb-2">{project.title}</h3>
                    <p className="text-sm text-dark-muted mb-4">{project.date}</p>

                    <p className="text-dark-muted leading-relaxed line-clamp-3 mb-6 flex-grow">{project.description}</p>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs bg-dark-bg text-dark-muted/80 px-2.5 py-1 rounded border border-white/5">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-xs text-dark-muted/60 px-1 py-1">+ {project.tech.length - 3}</span>
                        )}
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm font-medium text-accent-green">{project.metrics}</span>
                        <span className="text-sm font-medium text-dark-muted group-hover:text-accent transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                          Read more <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-dark-muted text-lg">No projects match your search.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 text-accent hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ============ SKILLS SECTION (Redesigned) ============ */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-dark-surface/30 border-y border-white/5"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-4">Skills & Tools</h2>
          <div className="section-divider" />

          {/* Skill Categories with Progress Bars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {SKILL_CATEGORIES.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-bold text-dark-text mb-6 flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="mb-2">
                        <span className="text-sm text-dark-muted">{skill.name}</span>
                      </div>
                      <SkillBar score={skill.score} delay={200 + catIndex * 300 + skillIndex * 100} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools Grid */}
          <h3 className="text-xl font-bold text-dark-text text-center mb-8">Tools I Use</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {TOOLS.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="bg-dark-surface border border-white/5 rounded-lg p-3 text-center hover:border-accent-20 hover:bg-dark-surface/80 transition-all cursor-default"
              >
                <div className="text-xl mb-1">{tool.icon}</div>
                <span className="font-medium text-dark-text text-xs">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ============ CONTACT SECTION ============ */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-dark-text mb-4">Let's Build Something Together</h2>
          <div className="section-divider" />
          <p className="text-dark-muted mb-4 text-lg">
            Whether it's a role, a project, or just a conversation about AI and finance.
          </p>

          {/* Availability */}
          <div className="inline-flex items-center gap-2 bg-dark-surface/60 border border-white/10 rounded-full px-4 py-1.5 mb-10 text-sm text-dark-muted">
            <MapPin size={14} className="text-accent" />
            Pune, India
            <span className="w-[1px] h-3 bg-white/20 mx-1" />
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            Open to Product roles
          </div>

          <div className="glass-card p-8 max-w-md mx-auto">
            <div className="space-y-2">
              {[
                { href: 'mailto:mahalegauravk@gmail.com', icon: <Mail size={20} />, label: 'mahalegauravk@gmail.com' },
                { href: 'https://www.linkedin.com/in/mahalegauravk', icon: <Linkedin size={20} />, label: 'linkedin.com/in/mahalegauravk', external: true },
                { href: 'https://github.com/gmpro-cr', icon: <Github size={20} />, label: 'github.com/gmpro-cr', external: true },
                { href: 'https://x.com/mahalegauravk', icon: <XIcon size={20} />, label: 'x.com/mahalegauravk', external: true },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4 text-dark-muted hover:text-accent transition-colors p-3 rounded-lg hover:bg-white/5"
                >
                  <span className="text-accent">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ============ PROJECT MODAL ============ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-dark-surface border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${selectedProject.category === 'build' ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'}`}>
                      {selectedProject.category === 'build' ? '🔨 Build' : '📋 Case Study'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-dark-text mt-4">{selectedProject.title}</h2>
                    <p className="text-dark-muted mt-2">{selectedProject.date}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-dark-muted hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-6">
                  <span className="bg-accent-green/10 text-accent-green border border-accent-green/20 px-4 py-2 rounded-full font-medium text-sm inline-block">
                    {selectedProject.metrics}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 py-2 px-4 text-sm"
                    >
                      <ExternalLink size={16} />
                      View Live Project
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-2 py-2 px-4 text-sm"
                    >
                      <Github size={16} />
                      Source Code
                    </a>
                  )}
                </div>

                {/* Case Study Content */}
                <div className="mt-10 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-dark-text mb-3">The Problem</h3>
                    <p className="text-dark-muted leading-relaxed">{selectedProject.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-dark-text mb-3">Approach</h3>
                    <ul className="space-y-3">
                      {selectedProject.approach.map((item, i) => (
                        <li key={i} className="text-dark-muted flex gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-dark-text mb-3">Outcomes</h3>
                    <ul className="space-y-3">
                      {selectedProject.outcomes.map((item, i) => (
                        <li key={i} className="text-dark-muted flex gap-3">
                          <span className="text-accent-green mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-10 pt-8 border-t border-white/5">
                  <h3 className="text-sm font-semibold text-dark-muted uppercase tracking-wide mb-4">Tech Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="bg-dark-bg text-dark-text px-3 py-1 rounded-full text-sm border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {selectedProject.frameworks?.map((fw, i) => (
                      <span key={i} className="bg-dark-bg px-3 py-1 rounded-full text-sm border" style={{ color: 'var(--accent-color)', borderColor: 'color-mix(in srgb, var(--accent-color) 20%, transparent)' }}>
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
