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

            <div className="flex-shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-warm-cream border-4 border-terracotta/20 overflow-hidden shadow-elevated">
                <div className="w-full h-full flex items-center justify-center text-muted">
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
