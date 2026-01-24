import React from 'react';
import { EXPERIENCES, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';
import { GraduationCap, Award } from 'lucide-react';

export default function Work() {
  return (
    <div>
      <section className="bg-warm-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl text-charcoal">My Journey</h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            From engineering foundations to AI product building — a path driven by curiosity and impact.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Current Roles - Yes Bank + Pareto.AI side by side */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Yes Bank - 75% */}
            <div className="md:w-3/4">
              <div className="card h-full">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className="badge-finance">Finance</span>
                  <span className="text-sm text-muted">{EXPERIENCES[0].period}</span>
                </div>
                <h3 className="mt-3 text-xl font-serif text-charcoal">{EXPERIENCES[0].role}</h3>
                <p className="text-terracotta font-medium">{EXPERIENCES[0].company}</p>
                <ul className="mt-4 space-y-2">
                  {EXPERIENCES[0].description.map((desc, i) => (
                    <li key={i} className="text-sm text-muted flex gap-2">
                      <span className="text-olive mt-1">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pareto.AI - 25% */}
            <div className="md:w-1/4">
              <div className="card h-full bg-olive/5 border border-olive/20">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className="badge-ai">AI</span>
                  <span className="text-xs text-muted">Part-Time</span>
                </div>
                <h3 className="mt-3 text-lg font-serif text-charcoal">{EXPERIENCES[4].role}</h3>
                <p className="text-terracotta font-medium text-sm">{EXPERIENCES[4].company}</p>
                <p className="text-xs text-muted mt-1">{EXPERIENCES[4].period}</p>
                <ul className="mt-3 space-y-2">
                  {EXPERIENCES[4].description.slice(0, 2).map((desc, i) => (
                    <li key={i} className="text-xs text-muted flex gap-2">
                      <span className="text-olive mt-0.5">•</span>
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
              <div key={index} className="card">
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
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
