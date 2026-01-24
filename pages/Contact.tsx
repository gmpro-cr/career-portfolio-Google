import React from 'react';
import { Mail, Linkedin, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div>
      <section className="bg-warm-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl text-charcoal">Let's Connect</h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Whether it's a role, a project, or just a conversation about AI and finance — I'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-serif text-lg text-charcoal mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <a
                  href="tel:+919923540336"
                  className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors"
                >
                  <Phone size={20} />
                  <span>+91 9923540336</span>
                </a>
                <a
                  href="mailto:mahalegauravk@gmail.com"
                  className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors"
                >
                  <Mail size={20} />
                  <span>mahalegauravk@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mahalegauravk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors"
                >
                  <Linkedin size={20} />
                  <span>linkedin.com/in/mahalegauravk</span>
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
      </section>
    </div>
  );
}
