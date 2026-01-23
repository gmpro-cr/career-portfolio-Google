import React from 'react';
import { SKILL_DATA, TECH_STACK } from '../constants';

export default function About() {
  return (
    <div>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-warm-cream border-4 border-olive/20 overflow-hidden shadow-elevated">
                <img src="/profile.jpeg" alt="Gaurav" className="w-full h-full object-cover" />
              </div>
            </div>

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
