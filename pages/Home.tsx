import React, { useState, useMemo, useEffect } from 'react';
import { Mail, Linkedin, MapPin, GraduationCap, Award, ExternalLink, FileText, Github, Download, ArrowRight, X } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

import { EXPERIENCES, PROJECTS, SKILL_DATA, TECH_STACK, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';

const STATS = [
  { label: '8+ Years', sublabel: 'Banking & Credit' },
  { label: '₹9,000 Cr', sublabel: 'Distressed Assets' },
  { label: '500 MAU', sublabel: 'AI platform built' },
];

const TOOLS = [
  { name: 'Python', icon: '🐍' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'Gemini API', icon: '✨' },
  { name: 'Claude', icon: '🤖' },
  { name: 'Figma', icon: '🎨' },
  { name: 'PowerBI', icon: '📊' },
  { name: 'Excel', icon: '📑' },
  { name: 'Next.js', icon: '▲' },
  { name: 'React', icon: '⚛️' },
  { name: 'Github', icon: '💻' },
];

function SkillBar({ score, delay }: { score: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="h-2 rounded-full overflow-hidden bg-white/5 relative">
      <div 
        className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, background: 'linear-gradient(90deg, var(--accent-color), color-mix(in srgb, var(--accent-color) 40%, #c084fc))' }} 
      />
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const { searchQuery } = useSearch();

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
    <div className="relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full aurora-bg -z-10"></div>
      
      {/* Background glow orb */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full -z-10 blur-[100px] opacity-20 transition-all duration-[6s] animate-pulse"
        style={{ background: 'var(--accent-color)' }}
      />

      {/* HERO SECTION */}
      <motion.section
        id="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-32 md:py-48 relative"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-dark-card border border-white/5 rounded-[2rem] px-5 py-2 mb-8 text-sm font-medium glass-card"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            Open to AI Product Manager roles
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl text-dark-text leading-[1.1] mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">AI Builder &</span><br />
            <span className="text-gradient">Credit Domain Expert</span>
          </h1>
          
          <p className="mt-6 text-xl text-dark-muted max-w-2xl mx-auto font-light leading-relaxed">
            Building AI products. Understanding credit the way most AI builders never will. Fintech Products · LLM Evals · Corporate Lending.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="glass-card px-8 py-4 animate-float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="text-3xl font-display font-bold text-accent">{stat.label}</div>
                <div className="text-sm font-medium text-dark-muted mt-1 tracking-wide uppercase opacity-80">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <a href="#projects" className="btn-primary flex items-center gap-2 w-full sm:w-auto h-14 px-8 text-lg hover:scale-[1.02]">
              View Real Work <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/Gaurav_Mahale_Resume.pdf" download className="btn-outline flex items-center gap-2 w-full sm:w-auto h-14 px-8 text-lg group">
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Download CV
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="py-24 relative"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <FileText size={160} />
            </div>
            
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-accent rounded-full inline-block"></span>
              The Thesis
            </h2>
            
            <div className="space-y-6 text-xl tracking-tight leading-relaxed text-gray-300 relative z-10 w-full md:w-[85%] font-light">
              <p>
                8+ years across Yes Bank, HDFC Bank, and Suraksha ARC — managing <strong className="text-white font-medium">₹500 Cr+ lending portfolios</strong>, resolving distressed assets worth <strong className="text-white font-medium">₹9,000 Cr under IBC</strong>, and sitting across the table from CFOs and credit committees. That domain depth now powers a different kind of work: <span className="text-accent font-medium">building the tools that the industry still lacks.</span>
              </p>
              <p>
                The edge here is not just technical. Credit analysts at 11pm before a credit committee meeting have a very specific set of needs. Relationship managers managing covenant-breaching borrowers face a very specific kind of pressure. 
              </p>
              <p className="border-l-4 border-accent pl-6 py-2 mt-8 italic bg-white/5 rounded-r-xl">
                That elite domain knowledge — combined with the ability to actually build and ship working products — is the unique combination I bring to AI PM roles in fintech, credit-tech, and lending automation.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* EXPERIENCE SECTION */}
      <motion.section id="experience" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-glow">The Journey</h2>
          
          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-6 md:p-8 hover:bg-dark-card/80 flex flex-col md:flex-row gap-6 lg:gap-12"
              >
                <div className="md:w-1/3 flex-shrink-0">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block ${exp.type === 'AI' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                    {exp.type}
                  </span>
                  <p className="text-dark-muted font-medium mb-1 text-sm">{exp.period}</p>
                  <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">{exp.role}</h3>
                  <p className="text-accent mt-2 font-medium">{exp.company}</p>
                </div>
                
                <div className="md:w-2/3">
                  <ul className="space-y-3">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex gap-4 text-gray-400 group">
                        <span className="text-accent opacity-50 relative top-1 group-hover:opacity-100 transition-opacity">●</span>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education & Certs grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-16">
             <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><GraduationCap className="text-accent"/> Education</h3>
                <div className="space-y-6">
                  {EDUCATION_DATA.map(edu => (
                    <div key={edu.id} className="border-l-2 border-white/10 pl-4 hover:border-accent transition-colors">
                      <h4 className="text-lg font-semibold text-white">{edu.institution}</h4>
                      <p className="text-gray-400 mt-1">{edu.degree}</p>
                      <p className="text-sm font-mono text-gray-500 mt-2">{edu.year}</p>
                    </div>
                  ))}
                </div>
             </div>
             <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Award className="text-accent-purple"/> Certifications</h3>
                <div className="space-y-6">
                  {CERTIFICATIONS_DATA.map(cert => (
                    <div key={cert.id} className="border-l-2 border-white/10 pl-4 hover:border-accent-purple transition-colors">
                      <h4 className="text-lg font-semibold text-white">{cert.name}</h4>
                      <p className="text-gray-400 mt-1">{cert.issuer}</p>
                      <p className="text-sm font-mono text-gray-500 mt-2">{cert.year}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS SECTION */}
      <motion.section id="projects" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-glow mb-4">Proof of Work</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">Products I've built and problems I've solved end-to-end.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="glass-card group cursor-pointer h-full flex flex-col"
              >
                <div className="p-8 flex-1 flex flex-col relative z-20">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold tracking-wide uppercase ${project.category === 'build' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                      {project.category === 'build' ? '🚀 Shipped' : '📋 Case Study'}
                    </span>
                    <span className="text-accent font-semibold">{project.metrics}</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-sm font-mono text-gray-500 mb-6">{project.date}</p>
                  
                  <p className="text-gray-400 text-lg leading-relaxed mb-8 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SKILLS SECTION */}
      <motion.section id="skills" className="py-24 border-t border-white/5 bg-[#030303]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">The Armory</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {SKILL_DATA.map((skill, i) => (
              <div key={skill.subject} className="space-y-2">
                <div className="flex justify-between text-sm font-semibold text-white tracking-wide">
                  <span>{skill.subject}</span>
                  <span className="text-accent">{skill.A}%</span>
                </div>
                {/* Custom skill bar for visual wow factor */}
                <SkillBar score={skill.A} delay={i * 200 + 300} />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, borderColor: 'var(--accent-color)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="glass-card px-6 py-4 flex items-center gap-3 w-40 justify-center cursor-default transition-all"
              >
                <span className="text-2xl">{tool.icon}</span>
                <span className="text-sm font-medium text-white">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FOOTER CTA */}
      <footer id="contact" className="py-32 relative text-center">
        <div className="max-w-2xl mx-auto px-4 z-10 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-glow">Ready to collaborate?</h2>
          <p className="text-xl text-gray-400 mb-12">Whether it's a role, scaling an AI product, or navigating complex credits.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="mailto:mahalegauravk@gmail.com" className="btn-primary w-full sm:w-auto h-14 flex justify-center items-center px-8 text-lg">
              mahalegauravk@gmail.com
            </a>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/mahalegauravk" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-xl glass-card flex justify-center items-center hover:bg-white/10 hover:text-accent transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/gmpro-cr" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-xl glass-card flex justify-center items-center hover:bg-white/10 hover:text-accent transition-colors">
                <Github size={24} />
              </a>
              <a href="https://x.com/mahalegauravk" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-xl glass-card flex justify-center items-center hover:bg-white/10 hover:text-accent transition-colors">
                <XIcon size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Backdrop Blur */}
            <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-xl" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border border-white/10 "
            >
              <div className="p-8 md:p-12">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex border border-white/10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="mb-8">
                  <span className="text-accent font-bold tracking-widest text-sm uppercase">{selectedProject.category === 'build' ? 'Shipped Product' : 'Case Study'}</span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-2 mb-4">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-4 items-center">
                    <span className="text-gray-400 font-mono">{selectedProject.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600 truncate hidden sm:block"></span>
                    <span className="bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">{selectedProject.metrics}</span>
                  </div>
                </div>

                <div className="space-y-12">
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span className="text-accent border border-accent/20 bg-accent/10 w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span> The Problem</h3>
                    <p className="text-lg text-gray-300 leading-relaxed font-light">{selectedProject.problem}</p>
                  </section>

                  {selectedProject.approach && selectedProject.approach.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span className="text-accent border border-accent/20 bg-accent/10 w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span> The Approach</h3>
                    <div className="space-y-4">
                      {selectedProject.approach.map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                          <CheckIcon />
                          <p className="text-gray-300 text-lg">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  )}

                  {selectedProject.keyInsights && selectedProject.keyInsights.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span className="text-accent border border-accent/20 bg-accent/10 w-8 h-8 flex items-center justify-center rounded-full text-sm">3</span> Key Insights</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {selectedProject.keyInsights.map((insight, i) => (
                          <div key={i} className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-gray-300 font-light leading-relaxed">
                            {insight}
                          </div>
                        ))}
                      </div>
                  </section>
                  )}

                  {selectedProject.outcomes && selectedProject.outcomes.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span className="text-accent border border-accent/20 bg-accent/10 w-8 h-8 flex items-center justify-center rounded-full text-sm">4</span> Outcomes</h3>
                    <ul className="space-y-3 pl-2">
                       {selectedProject.outcomes.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-gray-300 text-lg">
                             <span className="text-green-400 font-bold mt-1">✓</span>
                             {item}
                          </li>
                       ))}
                    </ul>
                  </section>
                  )}

                  <section className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h4 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">Tech & Frameworks</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t, i) => (
                          <span key={i} className="bg-[#111] text-gray-300 px-3 py-1.5 rounded border border-white/5 text-sm">{t}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noreferrer" className="btn-primary py-2 px-6 flex items-center justify-center gap-2 flex-1">
                          <ExternalLink size={16} /> Live
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="btn-outline py-2 px-6 flex items-center justify-center gap-2 flex-1">
                          <Github size={16} /> Code
                        </a>
                      )}
                    </div>
                  </section>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent flex-shrink-0 mt-0.5">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
