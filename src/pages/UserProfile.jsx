import React, { useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

// ── Sample resume data for "opening" saved PDFs ────────────────────────────
const RESUME_DATA = [
  {
    title: 'Senior_UX_Designer_2026.pdf',
    time: '2 hours ago',
    role: 'Senior UX Designer',
    company: 'TechNova Solutions',
    summary:
      'Award-winning Senior UX Designer with 8+ years translating complex user needs into elegant, data-driven interfaces for 2M+ global users. Expert in AI-powered design systems and rapid prototype-to-launch delivery.',
    experience: [
      'Led redesign of core product for 2M+ users, increasing NPS by 32%.',
      'Built a multi-platform design system reducing dev handoff time by 35%.',
      'Managed a team of 6 designers across 4 product squads.',
    ],
    skills: ['Figma', 'User Research', 'Design Systems', 'React', 'Framer', 'AI UX'],
  },
  {
    title: 'Google_Cover_Letter.pdf',
    time: 'Yesterday',
    role: 'Staff Product Designer',
    company: 'Google',
    isCoverLetter: true,
    body: [
      'I am writing to express my enthusiastic interest in the Staff Product Designer position at Google. With over 8 years of hands-on experience designing enterprise-grade AI products, I bring a rare combination of systems thinking and pixel-perfect visual craftsmanship.',
      'In my current role at TechNova Solutions, I spearheaded the complete overhaul of the core product experience for over 2 million active users, resulting in a 32% increase in user satisfaction scores and a 35% reduction in design-to-engineering handoff time.',
      'What excites me most about Google is the opportunity to design at planetary scale. I am confident my experience with AI-integrated interfaces, large-scale design systems, and cross-functional leadership makes me an ideal candidate.',
    ],
  },
  {
    title: 'Executive_CV_Draft.pdf',
    time: '3 days ago',
    role: 'VP of Product Design',
    company: 'Open to Opportunities',
    summary:
      'Strategic design executive with 8+ years building product design organizations from the ground up. Proven ability to align design vision with business goals at Series B through public company scale.',
    experience: [
      'Scaled design team from 2 to 18 designers, establishing hiring frameworks and career ladders.',
      'Drove 3x revenue growth through design-led product pivots across B2B and B2C verticals.',
      'Partnered with C-suite to embed design thinking into company OKRs and quarterly strategy.',
    ],
    skills: ['Executive Leadership', 'P&L Management', 'Design Strategy', 'M&A Due Diligence', 'Org Design'],
  },
];

// ── Profile completion checklist ──────────────────────────────────────────
const COMPLETION_ITEMS = [
  { label: 'Profile Photo', done: true },
  { label: 'Full Name & Title', done: true },
  { label: 'Email & Phone', done: true },
  { label: 'Location', done: true },
  { label: 'LinkedIn URL', done: true },
  { label: 'GitHub / Portfolio', done: true },
  { label: 'Professional Summary', done: true },
  { label: 'Work Experience', done: true },
  { label: 'Skills (5+)', done: true },
  { label: 'Education', done: false },
  { label: 'Certifications', done: false },
  { label: 'Profile Visibility set to Public', done: false },
];

const STORAGE_KEY = 'careercraft_user_profile';

export default function UserProfile() {
  // Load from localStorage on mount
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      name: 'Alex Rivera',
      email: 'alex.rivera@design.co',
      phone: '+1 (555) 0123-4567',
      location: 'San Francisco, CA',
      title: 'Senior UX Designer',
      linkedin: 'linkedin.com/in/alexrivera',
      github: 'github.com/arivera-design',
      portfolio: 'alexrivera.design',
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Modals
  const [openResume, setOpenResume] = useState(null);
  const [showProModal, setShowProModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const resumeModalRef = useRef(null);

  const handleProfileChange = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));
    setHasUnsaved(true);
  };

  // Save to localStorage
  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setSavedSuccess(true);
      setHasUnsaved(false);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (_) {
      alert('Unable to save — storage may be full.');
    }
  };

  // Open a social/professional link safely
  const openLink = (url) => {
    if (!url || !url.trim()) return;
    let href = url.trim();
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
      href = 'https://' + href;
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  // Print resume preview as PDF
  const handlePrintResume = () => {
    if (!resumeModalRef.current) return;
    const content = resumeModalRef.current.innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${openResume ? openResume.title : 'Resume'}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; padding: 48px; color: #1a1a2e; font-size: 13px; line-height: 1.6; }
            h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; }
            h2 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6c63ff; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin: 16px 0 8px; }
            .subtitle { color: #6c63ff; font-weight: 700; font-size: 14px; margin: 2px 0; }
            .meta { color: #64748b; font-size: 11px; margin-top: 4px; }
            p { margin-bottom: 8px; }
            ul { list-style: disc; padding-left: 18px; }
            ul li { margin-bottom: 4px; }
            .skills { display: flex; flex-wrap: wrap; gap: 6px; }
            .skill { background: #f0eeff; color: #6c63ff; border-radius: 4px; padding: 3px 10px; font-size: 11px; font-weight: 700; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 400);
  };

  const completedCount = COMPLETION_ITEMS.filter((i) => i.done).length;
  const completionPct = Math.round((completedCount / COMPLETION_ITEMS.length) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-10 max-w-[1200px] mx-auto w-full">
          <div className="space-y-8">

            {/* ── Hero Card ─────────────────────────────────────────── */}
            <section className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

              {/* Avatar */}
              <div className="relative group shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1s9fWWGed0v44DiXl2UhdBHomHuuaK52EIdwdP5_2n0P7l4AaJHv-ItuBam-XoWqTxQQ1e2VCl2UUlxki1oZtK5zm0bObz5ueaVc3ZnfDPHOt289_ikdsQ2vZhi2O8ZTNc7JInoYrmJHu_H-EqOr32zxtMpRfYEI5zVC27KFHV4hzl_2Wzc0WoBMT_60XpaoyC88_yXvt2T2tIpx9DgVH1SWFBf994CoqCkLc84bC9E89k5nxZwAltSvbxOlWSJ0PQ5-Oro5WMZYh"
                    alt="Alex Rivera"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform" title="Change photo">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </button>
              </div>

              {/* Info */}
              <div className="text-center md:text-left space-y-2">
                <h2 className="font-display font-extrabold text-3xl text-on-surface">{profile.name}</h2>
                <p className="text-sm font-medium text-outline">{profile.title} • {profile.location}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
                  <button
                    onClick={() => setShowProModal(true)}
                    className="px-3 py-1 bg-secondary-container/10 text-secondary border border-secondary/20 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-secondary-container/25 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    <span>Pro Subscription Active</span>
                  </button>
                  <button
                    onClick={() => setShowCompletionModal(true)}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold hover:bg-emerald-100 transition-colors"
                  >
                    Profile {completionPct}% Complete
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="md:ml-auto flex flex-col items-end gap-2">
                {hasUnsaved && (
                  <p className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    Unsaved changes
                  </p>
                )}
                <button
                  onClick={handleSave}
                  className={`px-6 py-3 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 ${
                    savedSuccess
                      ? 'bg-emerald-500 text-white'
                      : 'bg-primary text-white hover:bg-primary-container shadow-primary/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {savedSuccess ? 'check_circle' : 'save'}
                  </span>
                  <span>{savedSuccess ? 'Profile Saved!' : 'Save Profile'}</span>
                </button>
              </div>
            </section>

            {/* ── Main Grid ─────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">

                {/* Personal Details */}
                <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 shadow-sm space-y-6">
                  <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">person</span>
                    <span>Personal Details</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', field: 'name', type: 'text' },
                      { label: 'Professional Title', field: 'title', type: 'text' },
                      { label: 'Email Address', field: 'email', type: 'email' },
                      { label: 'Phone Number', field: 'phone', type: 'text' },
                      { label: 'Current Location', field: 'location', type: 'text' },
                    ].map(({ label, field, type }) => (
                      <div key={field}>
                        <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                          {label}
                        </label>
                        <input
                          type={type}
                          value={profile[field]}
                          onChange={(e) => handleProfileChange(field, e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Professional & Social Links */}
                <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 shadow-sm space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">link</span>
                      <span>Professional &amp; Social Links</span>
                    </h3>
                    <p className="text-xs text-outline mt-1">
                      Edit the URL then click the <span className="font-bold">↗ open</span> button to visit it.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { field: 'linkedin', icon: 'public', label: 'LinkedIn Profile URL' },
                      { field: 'github', icon: 'code', label: 'GitHub Profile URL' },
                      { field: 'portfolio', icon: 'language', label: 'Portfolio / Website URL' },
                    ].map(({ field, icon, label }) => (
                      <div key={field}>
                        <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                          {label}
                        </label>
                        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                          <span className="material-symbols-outlined text-primary text-xl shrink-0">{icon}</span>
                          <input
                            type="text"
                            value={profile[field]}
                            onChange={(e) => handleProfileChange(field, e.target.value)}
                            placeholder={`Enter ${label}...`}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-on-surface outline-none"
                          />
                          <button
                            onClick={() => openLink(profile[field])}
                            title={`Open ${label} in new tab`}
                            className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all text-xs font-bold"
                          >
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            <span className="hidden sm:inline">Open</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* ── Right Sidebar ──────────────────────────────────── */}
              <div className="space-y-8">

                {/* Pro Membership Card — clickable */}
                <button
                  onClick={() => setShowProModal(true)}
                  className="w-full text-left bg-gradient-to-br from-primary via-primary-container to-secondary text-white rounded-2xl p-6 shadow-lg space-y-4 hover:opacity-95 transition-opacity"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-display font-bold text-lg">CareerCraft Pro</h4>
                    <span className="px-2.5 py-0.5 bg-white/20 text-white font-extrabold text-[10px] rounded-full uppercase">
                      Active
                    </span>
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">
                    Enjoy unlimited AI resume scans, AI cover letters, and live interview coaching.
                  </p>
                  <div className="text-xs font-semibold opacity-80 pt-2 border-t border-white/20 flex items-center justify-between">
                    <span>Renews automatically on Oct 12, 2026</span>
                    <span className="material-symbols-outlined text-sm opacity-70">arrow_forward</span>
                  </div>
                </button>

                {/* Profile Completion — clickable */}
                <button
                  onClick={() => setShowCompletionModal(true)}
                  className="w-full text-left bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-sm space-y-3 hover:border-primary/30 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-display font-bold text-sm text-on-surface">Profile Completion</h4>
                    <span className="text-emerald-600 font-extrabold text-sm">{completionPct}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">info</span>
                    {COMPLETION_ITEMS.length - completedCount} items remaining — click to view
                  </p>
                </button>

                {/* Saved Resumes */}
                <section className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-sm space-y-4">
                  <h4 className="font-display font-bold text-xs text-outline uppercase tracking-wider">
                    Recent Saved Resumes
                  </h4>
                  <div className="space-y-2">
                    {RESUME_DATA.map((doc, i) => (
                      <button
                        key={i}
                        onClick={() => setOpenResume(doc)}
                        className="w-full p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary/30 border border-transparent rounded-xl flex items-center gap-3 transition-all group"
                      >
                        <span className="material-symbols-outlined text-primary text-xl shrink-0">description</span>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-bold text-xs text-on-surface truncate group-hover:text-primary transition-colors">
                            {doc.title}
                          </p>
                          <p className="text-[10px] text-outline">{doc.time}</p>
                        </div>
                        <span className="material-symbols-outlined text-outline text-sm group-hover:text-primary transition-colors">
                          open_in_new
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MODAL: Resume / Cover Letter Preview
      ════════════════════════════════════════════════════════════════ */}
      {openResume && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpenResume(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl shrink-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-600 text-xl">description</span>
                <div>
                  <p className="font-bold text-sm text-gray-900">{openResume.title}</p>
                  <p className="text-[11px] text-gray-500">Saved {openResume.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintResume}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download PDF
                </button>
                <button
                  onClick={() => setOpenResume(null)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 p-6 bg-gray-50">
              <div
                ref={resumeModalRef}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-5 text-gray-800"
              >
                {/* Document Header */}
                <div className="border-b border-indigo-100 pb-5">
                  <h1 className="font-extrabold text-2xl text-gray-900">{profile.name}</h1>
                  <p className="subtitle font-bold text-indigo-600 text-sm mt-0.5">{openResume.role}</p>
                  <p className="meta text-xs text-gray-500 mt-1">
                    {profile.email} &bull; {profile.phone} &bull; {profile.location}
                  </p>
                </div>

                {openResume.isCoverLetter ? (
                  <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                    <p className="text-xs text-gray-400">
                      {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="font-bold text-gray-800">
                      Dear Hiring Manager at <span className="text-indigo-600">{openResume.company}</span>,
                    </p>
                    {openResume.body.map((para, i) => <p key={i}>{para}</p>)}
                    <div className="pt-4">
                      <p>Sincerely,</p>
                      <p className="font-extrabold text-lg text-indigo-600 italic mt-2">{profile.name}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {openResume.summary && (
                      <div>
                        <h2 className="font-bold text-[10px] text-indigo-600 uppercase tracking-widest border-b border-indigo-100 pb-1 mb-2">
                          Professional Summary
                        </h2>
                        <p className="text-xs text-gray-600 leading-relaxed">{openResume.summary}</p>
                      </div>
                    )}
                    {openResume.experience && (
                      <div>
                        <h2 className="font-bold text-[10px] text-indigo-600 uppercase tracking-widest border-b border-indigo-100 pb-1 mb-3">
                          Work Experience
                        </h2>
                        <div className="flex justify-between items-baseline mb-1">
                          <p className="font-bold text-xs text-gray-800">{openResume.role}</p>
                          <span className="text-[10px] text-gray-400">Jan 2021 – Present</span>
                        </div>
                        <p className="text-xs font-bold text-indigo-500 mb-2">{openResume.company}</p>
                        <ul className="list-disc ml-4 space-y-1">
                          {openResume.experience.map((e, i) => (
                            <li key={i} className="text-xs text-gray-600 leading-relaxed">{e}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {openResume.skills && (
                      <div>
                        <h2 className="font-bold text-[10px] text-indigo-600 uppercase tracking-widest border-b border-indigo-100 pb-1 mb-2">
                          Technical Skills
                        </h2>
                        <div className="flex flex-wrap gap-1.5">
                          {openResume.skills.map((sk, i) => (
                            <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold text-[10px] rounded-md">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MODAL: Pro Subscription Details
      ════════════════════════════════════════════════════════════════ */}
      {showProModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowProModal(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white relative">
              <button
                onClick={() => setShowProModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
              <div className="flex items-center gap-3 mb-1">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                <h3 className="font-display font-extrabold text-xl">CareerCraft Pro</h3>
              </div>
              <p className="text-sm opacity-90">Your active subscription details</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Status', value: '✅ Active', cls: 'text-emerald-600' },
                  { label: 'Plan', value: 'Pro Annual', cls: 'text-on-surface' },
                  { label: 'Next Billing', value: 'Oct 12, 2026', cls: 'text-on-surface' },
                  { label: 'Amount', value: '$99 / year', cls: 'text-primary' },
                ].map(({ label, value, cls }) => (
                  <div key={label} className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-0.5">{label}</p>
                    <p className={`font-bold text-sm ${cls}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-outline uppercase tracking-wider">Included Features</p>
                {[
                  'Unlimited AI Resume Scans',
                  'AI Cover Letter Generator',
                  'Live Interview Coaching',
                  'ATS Score Analyzer (unlimited)',
                  'Priority Support',
                  '50+ Premium Resume Templates',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-on-surface">
                    <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
                    {feat}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 py-2.5 border border-outline-variant/40 text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 py-2.5 bg-red-50 text-red-600 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors">
                  Cancel Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MODAL: Profile Completion Breakdown
      ════════════════════════════════════════════════════════════════ */}
      {showCompletionModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowCompletionModal(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-on-surface">Profile Completion</h3>
                <p className="text-xs text-outline mt-0.5">Complete your profile to improve visibility</p>
              </div>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">Overall</span>
                  <span className="font-extrabold text-emerald-600">{completionPct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {COMPLETION_ITEMS.map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${item.done ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                    <span className={`material-symbols-outlined text-lg ${item.done ? 'text-emerald-500' : 'text-gray-300'}`}>
                      {item.done ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className={`text-xs font-medium flex-1 ${item.done ? 'text-gray-700' : 'text-gray-400'}`}>
                      {item.label}
                    </span>
                    {!item.done && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        To Do
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="w-full py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-colors"
              >
                Got it — I'll complete my profile!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
