import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface pt-16 pb-12 px-6 lg:px-12 border-t border-surface-container-high/20 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Col */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              CareerCraft <span className="text-primary-fixed-dim font-extrabold">AI</span>
            </span>
          </Link>
          <p className="text-sm text-outline-variant max-w-sm leading-relaxed">
            Elevate your professional narrative with instant AI resume tailoring, ATS keyword optimization, cover letter generation, and real-time career co-piloting.
          </p>
          <div className="flex items-center gap-3 mt-2">
            {['globe', 'chat', 'share', 'mail'].map((icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-9 h-9 rounded-full bg-surface-container-highest/10 hover:bg-primary/30 flex items-center justify-center text-inverse-on-surface hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Product Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase">Product</h4>
          <Link to="/resume-builder" className="text-xs text-outline-variant hover:text-white transition-colors">AI Resume Builder</Link>
          <Link to="/cover-letter-builder" className="text-xs text-outline-variant hover:text-white transition-colors">Cover Letter Creator</Link>
          <Link to="/ats-checker" className="text-xs text-outline-variant hover:text-white transition-colors">ATS Resume Checker</Link>
          <Link to="/templates" className="text-xs text-outline-variant hover:text-white transition-colors">Resume Templates</Link>
          <Link to="/ai-assistant" className="text-xs text-outline-variant hover:text-white transition-colors">AI Career Assistant</Link>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase">Platform Hub</h4>
          <Link to="/dashboard" className="text-xs text-outline-variant hover:text-white transition-colors">User Dashboard</Link>
          <Link to="/profile" className="text-xs text-outline-variant hover:text-white transition-colors">Career Profile</Link>
          <Link to="/settings" className="text-xs text-outline-variant hover:text-white transition-colors">Account Settings</Link>
          <Link to="/platform-flow" className="text-xs text-outline-variant hover:text-white transition-colors">Platform Architecture Flow</Link>
          <Link to="/contact" className="text-xs text-outline-variant hover:text-white transition-colors">Contact Support</Link>
        </div>

        {/* Authentication & Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase">Account</h4>
          <Link to="/login" className="text-xs text-outline-variant hover:text-white transition-colors">Sign In</Link>
          <Link to="/signup" className="text-xs text-outline-variant hover:text-white transition-colors">Create Free Account</Link>
          <a href="#" className="text-xs text-outline-variant hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-outline-variant hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-outline-variant hover:text-white transition-colors">Security Overview</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-surface-container-high/10 flex flex-col md:flex-row items-center justify-between text-xs text-outline-variant gap-4">
        <p>© {new Date().getFullYear()} CareerCraft AI Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            All AI Systems Operational
          </span>
          <span className="text-outline-variant">Built with React & Vite</span>
        </div>
      </div>
    </footer>
  );
}
