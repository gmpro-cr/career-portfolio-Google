import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-warm-white focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-warm-white focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-warm-white focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors resize-none"
                    placeholder="What would you like to discuss?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : status === 'sent' ? (
                    'Message Sent!'
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="card">
                <h3 className="font-serif text-lg text-charcoal mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:mahalegauravk@gmail.com"
                    className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors"
                  >
                    <Mail size={20} />
                    <span>mahalegauravk@gmail.com</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/gauravmahale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted hover:text-terracotta transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>linkedin.com/in/gauravmahale</span>
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
        </div>
      </section>
    </div>
  );
}
