import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Phone, GraduationCap, Award, ExternalLink, Lightbulb, FileText, Github, Download } from 'lucide-react';

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { EXPERIENCES, PROJECTS, SKILL_DATA, TECH_STACK, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute top-0 left-0 w-full h-[800px] aurora-bg -z-10 opacity-60"></div>

      {/* Hero Section */}
      <section id="hero" className="py-24 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-dark-text leading-tight tracking-tight mb-6">
            <span className="text-gradient font-bold">Finance Pro</span>{' '}
            turned{' '}
            <span className="text-accent-blue">Product Manager</span>
          </h1>
          <p className="mt-6 text-xl text-dark-muted max-w-2xl mx-auto leading-relaxed">
            8 years solving complex problems. From managing ₹500 Cr portfolios to building AI tools that cut analysis time by 80%.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects" className="btn-primary inline-flex items-center justify-center gap-2 shadow-glow">
              View Work
            </a>
            <a href="/Gaurav_Mahale_Resume.pdf" download className="btn-download inline-flex items-center justify-center gap-2">
              <Download size={18} />
              Resume
            </a>
            <a href="#contact" className="btn-outline inline-flex items-center justify-center">
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-12">About Me</h2>

          <div className="glass-card p-8 md:p-10">
            <div className="space-y-6 text-dark-muted text-lg leading-relaxed">
              <p>
                I've spent 8 years in the trenches of corporate banking, solving complex problems for stressed assets. As a <strong>Relationship Manager at Yes Bank</strong>, I didn't just manage a portfolio; I learned what drives value for B2B users.
              </p>
              <p>
                Now, I've pivoted to Product Management. My side projects aren't just code—they're products with users. <strong>500+ monthly users on my AI platform</strong>, tools deployed in production, and real problems solved.
              </p>
            </div>

            {/* Why Product */}
            <div className="mt-10 bg-dark-bg/50 rounded-xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-dark-text mb-4 text-accent-blue">Why Product?</h3>
              <p className="text-dark-muted text-lg leading-relaxed">
                I realized my best moments in banking weren't closing deals—they were <strong>fixing broken systems</strong>. When I automated workflows or built internal tools, I felt alive.
              </p>
              <p className="text-dark-muted text-lg leading-relaxed mt-4">
                My finance background is my superpower. I understand enterprise sales, regulatory constraints, and the "value" of a solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-16">Experience</h2>

          {/* Current Roles */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Yes Bank */}
            <div className="md:w-3/4">
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
                      <span className="text-accent-orange mt-1.5 text-xs">●</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pareto.AI */}
            <div className="md:w-1/4">
              <div className="card h-full border border-accent-blue/20 bg-accent-blue/5">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className="badge-ai">AI</span>
                  <span className="text-xs text-dark-muted">{EXPERIENCES[4].period}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-dark-text">{EXPERIENCES[4].role}</h3>
                <p className="text-accent-blue font-medium mt-1 text-sm">{EXPERIENCES[4].company}</p>
                <ul className="mt-4 space-y-3">
                  {EXPERIENCES[4].description.slice(0, 3).map((desc, i) => (
                    <li key={i} className="text-sm text-dark-muted flex gap-3">
                      <span className="text-accent-blue mt-1.5 text-xs">●</span>
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
                <p className="text-accent-gray font-medium mt-1">{exp.company}</p>
                <ul className="mt-4 space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-dark-muted flex gap-3 text-base">
                      <span className="text-dark-muted/50 mt-1.5 text-xs">●</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education & Certifications */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-dark-text flex items-center gap-3 mb-6">
                <GraduationCap className="text-accent-blue" size={24} />
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
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-4">Projects & Case Studies</h2>
          <p className="text-dark-muted text-center mb-16 max-w-2xl mx-auto">
            Products I've built and problems I've analyzed. Proof that I can ship.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="card group cursor-pointer border-transparent hover:border-accent-blue/30 relative overflow-hidden"
              >
                {/* Image/Icon Area */}
                <div className="aspect-video bg-dark-bg/50 rounded-lg flex items-center justify-center relative overflow-hidden mb-6 border border-white/5">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : project.category === 'build' ? (
                    <Lightbulb size={48} className="text-dark-muted/30 group-hover:text-accent-blue transition-colors duration-300" />
                  ) : (
                    <FileText size={48} className="text-dark-muted/30 group-hover:text-accent-purple transition-colors duration-300" />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-dark-text font-medium bg-dark-surface border border-white/10 px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.category === 'build' ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'}`}>
                      {project.category === 'build' ? 'Build' : 'Case Study'}
                    </span>
                    <span className="text-xs text-dark-muted">{project.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-dark-text group-hover:text-accent-blue transition-colors">{project.title}</h3>
                  <p className="mt-3 text-sm text-dark-muted line-clamp-2 leading-relaxed">{project.description}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs bg-dark-bg text-dark-muted/80 px-2 py-1 rounded border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.category === 'build' && (
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dark-muted hover:text-white transition-colors"
                            title="View Source Code"
                          >
                            <Github size={18} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-dark-surface/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-16">Skills & Tools</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SKILL_DATA.map((skill) => (
              <div key={skill.subject} className="bg-dark-surface border border-white/5 rounded-lg p-4 text-center hover:border-accent-blue/30 hover:bg-dark-surface/80 transition-all cursor-default h-24 flex items-center justify-center">
                <span className="font-medium text-dark-text text-sm">{skill.subject}</span>
              </div>
            ))}
            {TECH_STACK.map((tech) => (
              <div key={tech.id} className="bg-dark-surface border border-white/5 rounded-lg p-4 text-center hover:border-accent-blue/30 hover:bg-dark-surface/80 transition-all cursor-default h-24 flex items-center justify-center">
                <span className="font-medium text-dark-text text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-dark-text mb-6">Let's Connect</h2>
          <p className="text-dark-muted mb-10 text-lg">
            Whether it's a role, a project, or just a conversation about AI and finance.
          </p>

          <div className="glass-card p-8 max-w-md mx-auto">
            <div className="space-y-5">
              <a href="mailto:mahalegauravk@gmail.com" className="flex items-center gap-4 text-dark-muted hover:text-accent-blue transition-colors p-3 rounded-lg hover:bg-white/5">
                <Mail size={20} className="text-accent-blue" />
                <span className="font-medium">mahalegauravk@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/mahalegauravk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-dark-muted hover:text-accent-blue transition-colors p-3 rounded-lg hover:bg-white/5">
                <Linkedin size={20} className="text-accent-blue" />
                <span className="font-medium">linkedin.com/in/mahalegauravk</span>
              </a>
              <a href="https://github.com/gmpro-cr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-dark-muted hover:text-accent-blue transition-colors p-3 rounded-lg hover:bg-white/5">
                <Github size={20} className="text-accent-blue" />
                <span className="font-medium">github.com/gmpro-cr</span>
              </a>
              <a href="https://x.com/mahalegauravk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-dark-muted hover:text-accent-blue transition-colors p-3 rounded-lg hover:bg-white/5">
                <XIcon size={20} />
                <span className="font-medium">x.com/mahalegauravk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal - Dark Mode */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-dark-surface border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${selectedProject.category === 'build' ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'}`}>
                    {selectedProject.category === 'build' ? 'Build' : 'Case Study'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-dark-text mt-4">{selectedProject.title}</h2>
                  <p className="text-dark-muted mt-2">{selectedProject.date}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-dark-muted hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
                >
                  <XIcon size={20} />
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
                        <span className="text-accent-blue mt-1">•</span>
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
                    <span key={i} className="bg-dark-bg text-accent-blue px-3 py-1 rounded-full text-sm border border-accent-blue/20">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
