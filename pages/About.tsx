import React from 'react';
import { SKILL_DATA, TECH_STACK } from '../constants';

export default function About() {
  return (
    <div>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-warm-cream border-4 border-terracotta/20 overflow-hidden shadow-elevated">
                <img src="/profile.jpeg" alt="Gaurav" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl text-charcoal">About Me</h1>
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  I'm a <strong>Relationship Manager at Yes Bank</strong> with 8 years of experience in corporate banking, credit risk, and portfolio management. I'm now actively transitioning into Product Management.
                </p>
                <p>
                  My banking career taught me to deeply understand user pain points — whether it's a CFO needing faster credit decisions or a business owner struggling with documentation. This user-first thinking now drives my product work.
                </p>
                <p>
                  On the side, I've built AI tools that solve real problems I've seen at work: a credit memo generator that cuts analysis time by 80%, and an AI persona platform with 500 monthly users. These projects prove I can ship products, not just talk about them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Product Section */}
      <section className="py-16 bg-terracotta/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl text-charcoal text-center mb-8">Why Product?</h2>
          <div className="bg-warm-white rounded-xl p-8 shadow-soft">
            <p className="text-muted text-lg leading-relaxed">
              After 8 years in banking, I realized the moments I was most energized weren't when I closed a deal — they were when I <strong>solved a problem</strong>. When I automated a tedious credit analysis process. When I redesigned a client onboarding flow that reduced drop-offs. When I built an internal tool that my colleagues actually wanted to use.
            </p>
            <p className="text-muted text-lg leading-relaxed mt-4">
              Product Management lets me do this full-time: understand users deeply, define problems clearly, and ship solutions that create real value. My finance background isn't a detour — it's my unfair advantage. I understand B2B users, enterprise sales cycles, regulatory constraints, and what "value" means when real money is on the line.
            </p>
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

      <section className="py-20 bg-terracotta text-white">
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
