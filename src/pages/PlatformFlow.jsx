import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function PlatformFlow() {
  const routes = [
    {
      path: '/',
      title: 'Landing Page',
      category: 'Public Showcase',
      desc: 'Hero banner, feature highlights, templates preview, testimonials, pricing, and FAQ.',
      icon: 'home',
      badge: 'Public',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      path: '/dashboard',
      title: 'User Dashboard',
      category: 'Core Workspace',
      desc: 'ATS score stats, recent activity log, optimization trend charts, and AI insight cards.',
      icon: 'dashboard',
      badge: 'App Hub',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      path: '/resume-builder',
      title: 'AI Resume Builder',
      category: 'Creation Suite',
      desc: 'Step-by-step editor form with AI bullet enhancer & live paper preview.',
      icon: 'edit_document',
      badge: 'Core Feature',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      path: '/cover-letter-builder',
      title: 'AI Cover Letter Builder',
      category: 'Creation Suite',
      desc: 'Tailored cover letter generator with company name, job title, and skills matching.',
      icon: 'mail',
      badge: 'Core Feature',
      color: 'from-amber-500 to-orange-600',
    },
    {
      path: '/ats-checker',
      title: 'ATS Resume Scanner',
      category: 'Optimization Engine',
      desc: 'Neural parsing engine, ATS match score gauge, and missing keyword injection.',
      icon: 'fact_check',
      badge: 'Optimization',
      color: 'from-rose-500 to-pink-600',
    },
    {
      path: '/templates',
      title: 'Resume Templates Gallery',
      category: 'Design Library',
      desc: 'Filterable gallery of Executive, Modern, Creative, Academic, Tech & Portfolio templates.',
      icon: 'grid_view',
      badge: 'Design Library',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      path: '/ai-assistant',
      title: 'AI Career Assistant',
      category: 'Interactive Copilot',
      desc: '24/7 AI chat copilot for resume audits, summaries, and interview preparation.',
      icon: 'psychology',
      badge: 'AI Copilot',
      color: 'from-violet-500 to-purple-600',
    },
    {
      path: '/profile',
      title: 'User Profile & Bio',
      category: 'Account',
      desc: 'User avatar, career information, social profile links, and saved document list.',
      icon: 'person',
      badge: 'Account',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      path: '/settings',
      title: 'Account Settings',
      category: 'Configuration',
      desc: 'Theme mode customization, accent colors, notifications, 2FA, and language options.',
      icon: 'settings',
      badge: 'Preferences',
      color: 'from-slate-600 to-slate-800',
    },
    {
      path: '/contact',
      title: 'Contact Support',
      category: 'Public Support',
      desc: 'Inquiry contact form, map location placeholder, and help center FAQ.',
      icon: 'contact_support',
      badge: 'Support',
      color: 'from-sky-500 to-blue-600',
    },
    {
      path: '/login',
      title: 'Login Page',
      category: 'Authentication',
      desc: 'Google OAuth, email sign in, password visibility toggle, and remember me check.',
      icon: 'login',
      badge: 'Auth',
      color: 'from-indigo-600 to-blue-700',
    },
    {
      path: '/signup',
      title: 'Sign Up Page',
      category: 'Authentication',
      desc: 'New user registration form, Google sign up, and terms of service agreement.',
      icon: 'person_add',
      badge: 'Auth',
      color: 'from-purple-600 to-indigo-700',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-secondary font-bold text-xs">
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>Platform Architecture Flow</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-on-surface">
            CareerCraft AI Flow Map
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto">
            All 12 Stitch screens are fully integrated into this single React + Vite SPA with instant navigation and responsive layouts.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((rt, idx) => (
            <Link
              key={idx}
              to={rt.path}
              className="group bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${rt.color} text-white flex items-center justify-center shadow-md`}>
                    <span className="material-symbols-outlined text-2xl">{rt.icon}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-surface-container text-primary text-[10px] font-extrabold uppercase rounded-full">
                    {rt.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-on-surface group-hover:text-primary transition-colors mb-1">
                  {rt.title}
                </h3>
                <p className="text-xs font-bold text-secondary mb-2">{rt.category}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{rt.desc}</p>
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs font-bold text-primary group-hover:gap-2 transition-all">
                <span>Navigate to Screen</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
