import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Phone, GraduationCap, Award, ExternalLink, Lightbulb, FileText } from 'lucide-react';

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { EXPERIENCES, PROJECTS, SKILL_DATA, TECH_STACK, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
                <span className="text-terracotta">Finance professional</span>{' '}
                transitioning to{' '}
                <span className="text-terracotta">Product Management</span>
              </h1>
              <p className="mt-6 text-lg text-muted max-w-xl">
                8 years in banking taught me to understand users and solve complex problems. Now I'm channeling that into building AI-powered products.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#experience" className="btn-primary inline-flex items-center justify-center gap-2">
                  View My Work
                </a>
                <a href="#contact" className="btn-outline inline-flex items-center justify-center">
                  Get In Touch
                </a>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-warm-cream border-4 border-terracotta/20 overflow-hidden shadow-elevated">
                <img src="/profile.jpeg" alt="Gaurav" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl text-charcoal text-center mb-8">About Me</h2>
          <div className="space-y-4 text-muted text-lg">
            <p>
              I'm a <strong>Relationship Manager at Yes Bank</strong> with 8 years of experience in corporate banking, credit risk, and portfolio management. I'm now actively transitioning into Product Management.
            </p>
            <p>
              My banking career taught me to deeply understand user pain points — whether it's a CFO needing faster credit decisions or a business owner struggling with documentation. This user-first thinking now drives my product work.
            </p>
          </div>

          {/* Why Product */}
          <div className="mt-12 bg-terracotta/10 rounded-xl p-8">
            <h3 className="text-2xl text-charcoal mb-4">Why Product?</h3>
            <p className="text-muted text-lg leading-relaxed">
              After 8 years in banking, I realized the moments I was most energized weren't when I closed a deal — they were when I <strong>solved a problem</strong>. When I automated a tedious credit analysis process. When I redesigned a client onboarding flow. When I built an internal tool that my colleagues actually wanted to use.
            </p>
            <p className="text-muted text-lg leading-relaxed mt-4">
              Product Management lets me do this full-time. My finance background isn't a detour — it's my unfair advantage. I understand B2B users, enterprise sales cycles, regulatory constraints, and what "value" means when real money is on the line.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-warm-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl text-charcoal text-center mb-12">Experience</h2>

          {/* Current Roles - Yes Bank + Pareto.AI side by side */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Yes Bank - 75% */}
            <div className="md:w-3/4">
              <div className="bg-warm-white rounded-xl p-6 shadow-soft h-full">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className="badge-finance">Finance</span>
                  <span className="text-sm text-muted">{EXPERIENCES[0].period}</span>
                </div>
                <h3 className="mt-3 text-xl font-serif text-charcoal">{EXPERIENCES[0].role}</h3>
                <p className="text-terracotta font-medium">{EXPERIENCES[0].company}</p>
                <ul className="mt-4 space-y-2">
                  {EXPERIENCES[0].description.map((desc, i) => (
                    <li key={i} className="text-sm text-muted flex gap-2">
                      <span className="text-terracotta mt-1">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pareto.AI - 25% */}
            <div className="md:w-1/4">
              <div className="bg-warm-white rounded-xl p-6 shadow-soft h-full border-2 border-terracotta/20">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className="badge-ai">AI</span>
                  <span className="text-xs text-muted">{EXPERIENCES[4].period}</span>
                </div>
                <h3 className="mt-3 text-lg font-serif text-charcoal">{EXPERIENCES[4].role}</h3>
                <p className="text-terracotta font-medium text-sm">{EXPERIENCES[4].company}</p>
                <ul className="mt-3 space-y-2">
                  {EXPERIENCES[4].description.slice(0, 2).map((desc, i) => (
                    <li key={i} className="text-xs text-muted flex gap-2">
                      <span className="text-terracotta mt-0.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Previous Experiences - Stacked vertically */}
          <div className="space-y-6">
            {EXPERIENCES.slice(1, 4).map((exp, index) => (
              <div key={index} className="bg-warm-white rounded-xl p-6 shadow-soft">
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
                      <span className="text-terracotta mt-1">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education & Certifications */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-xl text-charcoal flex items-center gap-3 mb-4">
                <GraduationCap className="text-terracotta" size={24} />
                Education
              </h3>
              <div className="space-y-3">
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.id} className="bg-warm-white rounded-lg p-4 shadow-soft">
                    <h4 className="font-serif text-charcoal">{edu.institution}</h4>
                    <p className="text-sm text-muted">{edu.degree}</p>
                    <p className="text-xs text-muted mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl text-charcoal flex items-center gap-3 mb-4">
                <Award className="text-terracotta" size={24} />
                Certifications
              </h3>
              <div className="space-y-3">
                {CERTIFICATIONS_DATA.map((cert) => (
                  <div key={cert.id} className="bg-warm-white rounded-lg p-4 shadow-soft">
                    <h4 className="font-serif text-charcoal">{cert.name}</h4>
                    <p className="text-sm text-muted">{cert.issuer}</p>
                    <p className="text-xs text-muted mt-1">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl text-charcoal text-center mb-4">Projects & Case Studies</h2>
          <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
            Products I've built and problems I've analyzed — proof that I can ship, not just talk.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="bg-warm-cream rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all cursor-pointer group"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : project.category === 'build' ? (
                    <Lightbulb size={48} className="text-gray-300" />
                  ) : (
                    <FileText size={48} className="text-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-charcoal font-medium transition-opacity bg-white/80 px-4 py-2 rounded-lg">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${project.category === 'build' ? 'bg-terracotta/10 text-terracotta' : 'bg-gray-200 text-gray-600'}`}>
                      {project.category === 'build' ? 'Build' : 'Case Study'}
                    </span>
                    <span className="text-xs text-muted">{project.date}</span>
                  </div>
                  <h3 className="text-xl font-serif text-charcoal">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs bg-warm-white text-gray-600 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-terracotta font-medium text-sm">{project.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-warm-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl text-charcoal text-center mb-12">Skills & Tools</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {SKILL_DATA.map((skill) => (
              <div key={skill.subject} className="bg-warm-white rounded-lg shadow-soft text-center hover:shadow-card transition-shadow h-20 flex items-center justify-center px-3">
                <span className="font-medium text-charcoal text-sm">{skill.subject}</span>
              </div>
            ))}
            {TECH_STACK.map((tech) => (
              <div key={tech.id} className="bg-warm-white rounded-lg shadow-soft text-center hover:shadow-card transition-shadow h-20 flex items-center justify-center px-3">
                <span className="font-medium text-charcoal text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl text-charcoal mb-4">Let's Connect</h2>
          <p className="text-muted mb-8">
            Whether it's a role, a project, or just a conversation about AI and finance — I'd love to hear from you.
          </p>

          <div className="bg-warm-cream rounded-xl p-6 shadow-soft max-w-md mx-auto">
            <div className="space-y-3">
              <a href="tel:+919923540336" className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors">
                <Phone size={18} />
                <span>+91 9923540336</span>
              </a>
              <a href="mailto:mahalegauravk@gmail.com" className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors">
                <Mail size={18} />
                <span>mahalegauravk@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/mahalegauravk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors">
                <Linkedin size={18} />
                <span>linkedin.com/in/mahalegauravk</span>
              </a>
              <a href="https://x.com/mahalegauravk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors">
                <XIcon size={18} />
                <span>x.com/mahalegauravk</span>
              </a>
              <div className="flex items-center gap-3 text-muted">
                <MapPin size={18} />
                <span>Pune, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${selectedProject.category === 'build' ? 'bg-terracotta/10 text-terracotta' : 'bg-gray-200 text-gray-600'}`}>
                    {selectedProject.category === 'build' ? 'Build' : 'Case Study'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif text-charcoal mt-2">{selectedProject.title}</h2>
                  <p className="text-muted mt-1">{selectedProject.date}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted hover:text-charcoal text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mt-4">
                <span className="bg-terracotta/10 text-terracotta px-4 py-2 rounded-full font-medium">
                  {selectedProject.metrics}
                </span>
              </div>

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

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-charcoal">The Problem</h3>
                <p className="mt-2 text-muted">{selectedProject.problem}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Approach</h3>
                <ul className="mt-2 space-y-2">
                  {selectedProject.approach.map((item, i) => (
                    <li key={i} className="text-muted flex gap-2">
                      <span className="text-terracotta">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

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

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Outcomes</h3>
                <ul className="mt-2 space-y-2">
                  {selectedProject.outcomes.map((item, i) => (
                    <li key={i} className="text-muted flex gap-2">
                      <span className="text-terracotta">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

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

              {selectedProject.frameworks && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Frameworks Used</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.frameworks.map((fw, i) => (
                      <span key={i} className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Study Analysis Sections */}
              {selectedProject.caseStudyAnalysis && (
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-8">
                  {/* Company Mission & Revenue */}
                  <div className="bg-warm-cream rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Company Overview</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-terracotta">Mission:</span>
                        <p className="text-muted mt-1">{selectedProject.caseStudyAnalysis.companyMission}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-terracotta">Primary Revenue:</span>
                        <p className="text-muted mt-1">{selectedProject.caseStudyAnalysis.primaryRevenue}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-terracotta">Secondary Revenue:</span>
                        <p className="text-muted mt-1">{selectedProject.caseStudyAnalysis.secondaryRevenue}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Segments */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">User Segmentation</h3>
                    <div className="space-y-4">
                      {selectedProject.caseStudyAnalysis.userSegments.map((segment, i) => (
                        <div key={i} className="bg-warm-cream rounded-lg p-4">
                          <h4 className="font-medium text-charcoal mb-3">{segment.segment}</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-xs font-medium text-terracotta uppercase">Needs</span>
                              <ul className="mt-2 space-y-1">
                                {segment.needs.map((need, j) => (
                                  <li key={j} className="text-sm text-muted flex gap-2">
                                    <span className="text-terracotta">•</span>
                                    <span>{need}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-terracotta uppercase">How Product Addresses</span>
                              <ul className="mt-2 space-y-1">
                                {segment.addressed.map((addr, j) => (
                                  <li key={j} className="text-sm text-muted flex gap-2">
                                    <span className="text-terracotta">✓</span>
                                    <span>{addr}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Key Feature Breakdown</h3>
                    <div className="space-y-4">
                      {selectedProject.caseStudyAnalysis.featureBreakdown.map((feature, i) => (
                        <div key={i} className="bg-warm-cream rounded-lg p-4">
                          <h4 className="font-medium text-charcoal">{feature.feature}</h4>
                          <div className="mt-2 space-y-2">
                            <p className="text-sm text-muted">
                              <span className="font-medium text-terracotta">Problem:</span> {feature.problem}
                            </p>
                            <p className="text-sm text-muted">
                              <span className="font-medium text-terracotta">Why It Works:</span> {feature.whyItWorks}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Competitive Analysis */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Competitive Analysis</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 text-charcoal font-medium">Platform</th>
                            <th className="text-left py-2 px-3 text-charcoal font-medium">Strengths</th>
                            <th className="text-left py-2 px-3 text-charcoal font-medium">Weaknesses</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProject.caseStudyAnalysis.competitiveAnalysis.map((comp, i) => (
                            <tr key={i} className="border-b border-gray-100">
                              <td className="py-3 px-3 font-medium text-charcoal">{comp.platform}</td>
                              <td className="py-3 px-3 text-muted">
                                <ul className="space-y-1">
                                  {comp.strengths.map((s, j) => (
                                    <li key={j} className="flex gap-1">
                                      <span className="text-green-600">✓</span> {s}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td className="py-3 px-3 text-muted">
                                <ul className="space-y-1">
                                  {comp.weaknesses.map((w, j) => (
                                    <li key={j} className="flex gap-1">
                                      <span className="text-red-500">✗</span> {w}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Improvement Opportunity */}
                  <div className="bg-terracotta/10 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Proposed Improvement</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-terracotta">Identified Problem:</span>
                        <p className="text-muted mt-1">{selectedProject.caseStudyAnalysis.improvement.problem}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-terracotta">Why This Is Impactful:</span>
                        <p className="text-muted mt-1">{selectedProject.caseStudyAnalysis.improvement.impact}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-terracotta">Proposed Solution:</span>
                        <p className="text-muted mt-1">{selectedProject.caseStudyAnalysis.improvement.solution}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-terracotta">Why It Will Work:</span>
                        <p className="text-muted mt-1">{selectedProject.caseStudyAnalysis.improvement.whyItWorks}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Key Takeaways</h3>
                    <ul className="space-y-2">
                      {selectedProject.caseStudyAnalysis.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="text-muted flex gap-3 items-start">
                          <span className="text-terracotta text-lg">📌</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
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
