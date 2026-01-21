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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-olive/30 transform md:-translate-x-1/2" />

            {EXPERIENCES.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-terracotta border-4 border-warm-white transform -translate-x-1/2 mt-6 z-10" />

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

                <div className="hidden md:block flex-1" />
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
