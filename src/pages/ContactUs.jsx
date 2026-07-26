import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2500);
  };

  const faqs = [
    {
      q: 'How does the AI builder work?',
      a: 'Our proprietary CareerCraft AI analyzes your existing experience and desired job roles to generate optimized bullet points, skill sections, and professional summaries that bypass modern ATS systems while remaining authentic to your voice.',
    },
    {
      q: 'Is my data secure?',
      a: 'We employ enterprise-grade AES-256 encryption for all stored data. Your professional information is never sold to third parties and is used exclusively to power your resume-building experience within our secure ecosystem.',
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Absolutely. You can cancel your subscription at any time through your dashboard settings. You will maintain access to your premium features until the end of your current billing cycle.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full">
        {/* Hero Banner */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-on-surface tracking-tight">
            Get in Touch
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about our AI-powered career tools? Our support team and career engineers are ready to help you level up your career narrative.
          </p>
        </div>

        {/* Content Grid (Form + Contact Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-8 lg:p-10 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-display font-bold text-2xl text-on-surface">Send us a Message</h2>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
                <h3 className="font-bold text-base">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out. A CareerCraft AI advisor will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your question or requested feature..."
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-xl text-on-surface">Contact Details</h3>

              <div className="space-y-6">
                {[
                  { title: 'Email Us', info: 'support@careercraft.ai', link: 'mailto:support@careercraft.ai', icon: 'mail' },
                  { title: 'Call Support', info: '+1 (555) 012-3456', link: 'tel:+15550123456', icon: 'call' },
                  { title: 'Headquarters', info: '123 AI Boulevard, Innovation District, San Francisco, CA', link: 'https://maps.google.com/?q=San+Francisco,+CA', icon: 'location_on' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-outline uppercase tracking-wider">
                        {item.title}
                      </p>
                      <a 
                        href={item.link} 
                        target={item.title === 'Headquarters' ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-primary hover:text-secondary hover:underline mt-0.5 block transition-colors"
                      >
                        {item.info}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Image Placeholder */}
              <a 
                href="https://maps.google.com/?q=San+Francisco,+CA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative h-44 rounded-xl overflow-hidden border border-outline-variant/20 shadow-inner block group"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSxUZp0py-5oHPtqjrLzvkhxeBprIkFD7ZfVf874OVwc1cpJ0Nkb8qyakg5uNKKiRAIvbjWLsLVo5i6rIznfnuspnI82xeDaME0v7tI30NcIDRgxWE2YYSA0FcTvbbUJSBVABCmvlllZej28WzpuormnDJRVD4h32fP-IiYPPRBhgjNz6jGqgA4k__dQ9FmSZzFyIkpLW5i0pLeC8EE2If58k-qlBApw-vEZgpls41567n2oUnkdSFjjE646CrfQizWYVEoWDVLJIb"
                  alt="Office Map"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                  <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="font-display font-bold text-3xl text-on-surface">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`material-symbols-outlined transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-primary' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
