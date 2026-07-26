import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const STEPS = [
  { id: 1, name: 'Personal' },
  { id: 2, name: 'Education' },
  { id: 3, name: 'Experience' },
  { id: 4, name: 'Projects' },
  { id: 5, name: 'Skills' },
];

export default function ResumeBuilder() {
  const [activeStep, setActiveStep] = useState(1);
  const [aiGenerating, setAiGenerating] = useState(false);
  const previewRef = useRef(null);

  // ── Template from Gallery ────────────────────────────────────
  const [appliedTemplate, setAppliedTemplate] = useState(null);
  const [showTemplateBanner, setShowTemplateBanner] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedTemplate');
      if (saved) {
        const tpl = JSON.parse(saved);
        setAppliedTemplate(tpl);
        setShowTemplateBanner(true);
        localStorage.removeItem('selectedTemplate'); // consume it
      }
    } catch (_) {}
  }, []);

  const accentColor = appliedTemplate?.accentColor || null;

  // ── Form State ──────────────────────────────────────────────
  const [personal, setPersonal] = useState({
    name: 'Jane Doe',
    jobTitle: 'Senior Product Designer',
    email: 'jane.doe@email.com',
    phone: '+1 234 567 890',
    city: 'San Francisco, CA',
    website: 'janedoe.design',
    summary:
      'Visionary product designer with 8+ years of experience building scalable digital products. Specialized in AI-driven interfaces and systematic design languages.',
  });

  const [education, setEducation] = useState({
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    year: '2016',
    gpa: '3.8 / 4.0',
    honors: 'Magna Cum Laude',
  });

  const [experience, setExperience] = useState({
    jobTitle: 'Senior Product Designer',
    employer: 'TechNova Solutions',
    city: 'San Francisco, CA',
    startMonth: 'Jan',
    startYear: '2021',
    isCurrent: true,
    description: `Led the design team in reimagining the core product experience for over 2 million active users.
Established a comprehensive design system that reduced development time by 30%.
Collaborated with cross-functional teams to launch five major feature updates in one year.`,
  });

  const [projects, setProjects] = useState([
    {
      name: 'AI Resume Optimizer',
      tech: 'React, Node.js, OpenAI API',
      description:
        'Built a full-stack tool that uses GPT-4 to analyze resumes and suggest targeted improvements, increasing ATS pass rates by 62%.',
      link: 'github.com/janedoe/ai-resume',
    },
  ]);

  const [skills, setSkills] = useState([
    'Product Design',
    'Figma',
    'UI/UX',
    'Strategy',
    'Design Systems',
    'AI Interfaces',
    'React',
    'TypeScript',
  ]);
  const [newSkill, setNewSkill] = useState('');

  // ── AI Enhance handlers per step ─────────────────────────────
  const handleAiImprove = () => {
    setAiGenerating(true);
    setTimeout(() => {
      if (activeStep === 1) {
        setPersonal((p) => ({
          ...p,
          summary:
            'Award-winning Senior Product Designer with 8+ years translating complex user needs into elegant, data-driven interfaces for 2M+ global users. Expert in AI-powered design systems, cross-functional leadership, and rapid prototype-to-launch delivery.',
        }));
      } else if (activeStep === 3) {
        setExperience((p) => ({
          ...p,
          description: `Architected and scaled core AI product interfaces for 2M+ active global users, driving 45% increase in engagement.
Designed and deployed a modern multi-platform design system, accelerating sprint velocity by 35%.
Spearheaded cross-functional AI integration projects, reducing user drop-off by 28%.`,
        }));
      } else if (activeStep === 4) {
        setProjects([
          {
            name: 'AI Resume Optimizer',
            tech: 'React, Node.js, OpenAI GPT-4',
            description:
              'Full-stack SaaS platform leveraging GPT-4 to auto-analyze and rewrite resumes, achieving 62% improvement in ATS keyword matching and 3x user interview call-back rate.',
            link: 'github.com/janedoe/ai-resume',
          },
        ]);
      }
      setAiGenerating(false);
    }, 1000);
  };

  // ── PDF Download ─────────────────────────────────────────────
  const handleDownloadPDF = () => {
    const printContent = previewRef.current;
    if (!printContent) return;
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = printContent.outerHTML;
    window.print();
    document.body.innerHTML = originalBody;
    window.location.reload();
  };

  // ── Skills helpers ───────────────────────────────────────────
  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  const handleRemoveSkill = (sk) => setSkills(skills.filter((s) => s !== sk));

  // ── Step Form Renderer ───────────────────────────────────────
  const renderForm = () => {
    switch (activeStep) {
      // ── Step 1: Personal ────────────────────────────────────
      case 1:
        return (
          <>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-on-surface">
                  Personal Information
                </h1>
                <p className="text-on-surface-variant text-xs sm:text-sm mt-1">
                  Your contact details and professional summary.
                </p>
              </div>
              <button
                onClick={handleAiImprove}
                disabled={aiGenerating}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-secondary-container/10 text-secondary font-bold text-xs rounded-xl hover:bg-secondary-container/20 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>{aiGenerating ? 'Enhancing...' : 'AI Enhance'}</span>
              </button>
            </div>
            <div className="space-y-5 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', key: 'name', span: true },
                  { label: 'Professional Title', key: 'jobTitle', span: true },
                  { label: 'Email Address', key: 'email' },
                  { label: 'Phone Number', key: 'phone' },
                  { label: 'City / Location', key: 'city' },
                  { label: 'Website / LinkedIn', key: 'website' },
                ].map(({ label, key, span }) => (
                  <div key={key} className={span ? 'sm:col-span-2' : ''}>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={personal[key]}
                      onChange={(e) => setPersonal({ ...personal, [key]: e.target.value })}
                      className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-outline uppercase tracking-wider">
                      Professional Summary
                    </label>
                    <button
                      onClick={handleAiImprove}
                      disabled={aiGenerating}
                      className="text-primary font-bold text-xs flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {aiGenerating ? 'sync' : 'auto_awesome'}
                      </span>
                      <span>{aiGenerating ? 'Improving...' : 'Improve with AI'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={5}
                    value={personal.summary}
                    onChange={(e) => setPersonal({ ...personal, summary: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </>
        );

      // ── Step 2: Education ────────────────────────────────────
      case 2:
        return (
          <>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-on-surface">
                  Education
                </h1>
                <p className="text-on-surface-variant text-xs sm:text-sm mt-1">
                  Your academic background and qualifications.
                </p>
              </div>
            </div>
            <div className="space-y-5 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Degree / Qualification
                  </label>
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => setEducation({ ...education, institution: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={education.year}
                    onChange={(e) => setEducation({ ...education, year: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={education.gpa}
                    onChange={(e) => setEducation({ ...education, gpa: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Honors / Awards (Optional)
                  </label>
                  <input
                    type="text"
                    value={education.honors}
                    onChange={(e) => setEducation({ ...education, honors: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </>
        );

      // ── Step 3: Experience ───────────────────────────────────
      case 3:
        return (
          <>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-on-surface">
                  Work Experience
                </h1>
                <p className="text-on-surface-variant text-xs sm:text-sm mt-1">
                  Detail your key achievements using AI bullet suggestions.
                </p>
              </div>
              <button
                onClick={handleAiImprove}
                disabled={aiGenerating}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-secondary-container/10 text-secondary font-bold text-xs rounded-xl hover:bg-secondary-container/20 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>{aiGenerating ? 'Enhancing...' : 'AI Enhance'}</span>
              </button>
            </div>
            <div className="space-y-5 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={experience.jobTitle}
                    onChange={(e) => setExperience({ ...experience, jobTitle: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Employer / Company
                  </label>
                  <input
                    type="text"
                    value={experience.employer}
                    onChange={(e) => setExperience({ ...experience, employer: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={experience.city}
                    onChange={(e) => setExperience({ ...experience, city: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Start Month
                  </label>
                  <select
                    value={experience.startMonth}
                    onChange={(e) => setExperience({ ...experience, startMonth: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={experience.startYear}
                    onChange={(e) => setExperience({ ...experience, startYear: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2 mt-1">
                  <input
                    id="isCurrent"
                    type="checkbox"
                    checked={experience.isCurrent}
                    onChange={(e) => setExperience({ ...experience, isCurrent: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="isCurrent" className="text-sm font-medium text-on-surface-variant">
                    I currently work here
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-outline uppercase tracking-wider">
                      Key Achievements &amp; Bullet Points
                    </label>
                    <button
                      onClick={handleAiImprove}
                      disabled={aiGenerating}
                      className="text-primary font-bold text-xs flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {aiGenerating ? 'sync' : 'auto_awesome'}
                      </span>
                      <span>{aiGenerating ? 'Improving...' : 'Improve with AI'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={experience.description}
                    onChange={(e) => setExperience({ ...experience, description: e.target.value })}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </>
        );

      // ── Step 4: Projects ─────────────────────────────────────
      case 4:
        return (
          <>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-on-surface">
                  Projects
                </h1>
                <p className="text-on-surface-variant text-xs sm:text-sm mt-1">
                  Showcase your notable personal or professional projects.
                </p>
              </div>
              <button
                onClick={handleAiImprove}
                disabled={aiGenerating}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-secondary-container/10 text-secondary font-bold text-xs rounded-xl hover:bg-secondary-container/20 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>{aiGenerating ? 'Enhancing...' : 'AI Enhance'}</span>
              </button>
            </div>
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-4 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">
                    Project #{idx + 1}
                  </span>
                  {projects.length > 1 && (
                    <button
                      onClick={() => setProjects(projects.filter((_, i) => i !== idx))}
                      className="text-xs text-error font-bold flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>Remove
                    </button>
                  )}
                </div>
                {[
                  { label: 'Project Name', key: 'name' },
                  { label: 'Technologies Used', key: 'tech' },
                  { label: 'Project Link (Optional)', key: 'link' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={proj[key]}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx] = { ...updated[idx], [key]: e.target.value };
                        setProjects(updated);
                      }}
                      className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-1.5">
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    value={proj.description}
                    onChange={(e) => {
                      const updated = [...projects];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      setProjects(updated);
                    }}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                setProjects([...projects, { name: '', tech: '', description: '', link: '' }])
              }
              className="w-full py-3 border-2 border-dashed border-outline-variant/40 text-outline font-bold text-xs rounded-xl hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Add Another Project
            </button>
          </>
        );

      // ── Step 5: Skills ───────────────────────────────────────
      case 5:
        return (
          <>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-on-surface">
                  Skills
                </h1>
                <p className="text-on-surface-variant text-xs sm:text-sm mt-1">
                  Add your technical and professional skills.
                </p>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold text-outline uppercase tracking-wider">
                    Your Skills
                  </label>
                  <span className="text-[10px] font-bold text-primary">Press Enter to Add</span>
                </div>
                <div className="flex flex-wrap gap-2 p-3 bg-white border border-outline-variant/30 rounded-xl min-h-[100px]">
                  {skills.map((sk, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1"
                    >
                      <span>{sk}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(sk)}
                        className="hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="Type a skill and press Enter..."
                    className="bg-transparent border-none focus:ring-0 text-sm text-on-surface outline-none flex-1 min-w-[200px] px-2"
                  />
                </div>
              </div>
              <p className="text-xs text-outline">
                💡 Tip: Add skills that match the job description to improve ATS scores.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        {/* Builder Workspace Area */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-140px)]">
            {/* Left Column: Form Editor */}
            <section className="w-full lg:w-1/2 p-6 lg:p-10 overflow-y-auto bg-surface-container-lowest border-r border-outline-variant/10">
              <div className="max-w-xl mx-auto space-y-8">
                {/* Step Progress Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-outline-variant/10">
                  {STEPS.map((step) => {
                    const isPassed = step.id < activeStep;
                    const isActive = step.id === activeStep;
                    return (
                      <React.Fragment key={step.id}>
                        <button
                          onClick={() => setActiveStep(step.id)}
                          className="flex flex-col items-center gap-1 min-w-[60px] group"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isActive
                                ? 'bg-primary text-on-primary shadow-md shadow-primary/30 ring-4 ring-primary/10'
                                : isPassed
                                ? 'bg-emerald-500 text-white'
                                : 'border-2 border-outline-variant text-outline group-hover:border-primary'
                            }`}
                          >
                            {isPassed ? (
                              <span className="material-symbols-outlined text-sm">check</span>
                            ) : (
                              step.id
                            )}
                          </div>
                          <span
                            className={`text-[11px] font-bold ${
                              isActive ? 'text-primary' : 'text-outline'
                            }`}
                          >
                            {step.name}
                          </span>
                        </button>
                        {step.id < 5 && (
                          <div
                            className={`h-0.5 flex-1 min-w-[20px] rounded ${
                              step.id < activeStep ? 'bg-emerald-500' : 'bg-outline-variant/30'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Dynamic Step Form */}
                {renderForm()}
              </div>
            </section>

            {/* Right Column: Live Paper Preview */}
            <section className="w-full lg:w-1/2 bg-surface-container-low p-6 lg:p-10 flex flex-col items-center justify-start relative overflow-y-auto">
              <div className="text-xs font-bold text-outline uppercase tracking-wider mb-3 flex items-center gap-2 self-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Interactive Preview</span>
              </div>

              {/* Resume Paper */}
              <div
                ref={previewRef}
                className="w-full max-w-[550px] bg-white rounded-xl shadow-2xl border border-outline-variant/20 p-8 flex flex-col gap-5 text-on-surface transition-all"
              >
                {/* Header */}
                <div className="border-b border-primary/20 pb-4 flex justify-between items-start">
                  <div>
                    <h2 className="font-display font-extrabold text-3xl text-on-surface tracking-tight">
                      {personal.name}
                    </h2>
                    <p className="text-primary font-bold text-base mt-0.5">{personal.jobTitle}</p>
                  </div>
                  <div className="text-right text-[11px] text-outline font-medium space-y-0.5">
                    <p>{personal.email}</p>
                    <p>{personal.phone}</p>
                    <p>{personal.city}</p>
                    {personal.website && <p>{personal.website}</p>}
                  </div>
                </div>

                {/* Summary */}
                {personal.summary && (
                  <div>
                    <h3 className="font-display font-bold text-xs text-primary uppercase tracking-wider border-b border-primary/20 pb-1 mb-2">
                      Professional Summary
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{personal.summary}</p>
                  </div>
                )}

                {/* Education */}
                {(education.degree || education.institution) && (
                  <div>
                    <h3 className="font-display font-bold text-xs text-primary uppercase tracking-wider border-b border-primary/20 pb-1 mb-2">
                      Education
                    </h3>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <p className="font-bold text-xs text-on-surface">{education.degree}</p>
                        <p className="text-xs text-secondary font-semibold">{education.institution}</p>
                        {education.honors && (
                          <p className="text-[10px] text-outline">{education.honors}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-outline font-semibold">{education.year}</span>
                        {education.gpa && (
                          <p className="text-[10px] text-outline">GPA: {education.gpa}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience */}
                {(experience.jobTitle || experience.employer) && (
                  <div>
                    <h3 className="font-display font-bold text-xs text-primary uppercase tracking-wider border-b border-primary/20 pb-1 mb-3">
                      Work Experience
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-xs text-on-surface">{experience.jobTitle}</h4>
                        <span className="text-[10px] text-outline font-semibold">
                          {experience.startMonth} {experience.startYear} –{' '}
                          {experience.isCurrent ? 'Present' : ''}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-secondary">{experience.employer}</p>
                      <ul className="list-disc ml-4 space-y-1 text-xs text-on-surface-variant leading-relaxed">
                        {experience.description
                          .split('\n')
                          .filter((line) => line.trim())
                          .map((line, idx) => (
                            <li key={idx}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects.some((p) => p.name) && (
                  <div>
                    <h3 className="font-display font-bold text-xs text-primary uppercase tracking-wider border-b border-primary/20 pb-1 mb-2">
                      Projects
                    </h3>
                    {projects
                      .filter((p) => p.name)
                      .map((proj, i) => (
                        <div key={i} className="mb-2">
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold text-xs text-on-surface">{proj.name}</p>
                            {proj.link && (
                              <span className="text-[10px] text-primary">{proj.link}</span>
                            )}
                          </div>
                          {proj.tech && (
                            <p className="text-[10px] text-secondary font-semibold mb-0.5">
                              {proj.tech}
                            </p>
                          )}
                          <p className="text-xs text-on-surface-variant leading-relaxed">
                            {proj.description}
                          </p>
                        </div>
                      ))}
                  </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <div>
                    <h3 className="font-display font-bold text-xs text-primary uppercase tracking-wider border-b border-primary/20 pb-1 mb-2">
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((sk, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-surface-container text-primary font-bold text-[10px] rounded-md"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Builder Action Toolbar */}
          <footer className="h-16 bg-surface-bright border-t border-surface-container-high px-6 lg:px-12 flex items-center justify-between z-40">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
                className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors flex items-center gap-1 disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Previous</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              {activeStep === 3 && (
                <button
                  onClick={handleAiImprove}
                  disabled={aiGenerating}
                  className="px-5 py-2.5 bg-gradient-to-r from-secondary-container to-secondary text-white font-bold text-xs rounded-xl shadow-md hover:opacity-90 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  <span>{aiGenerating ? 'Enhancing...' : 'Enhance Bullets'}</span>
                </button>
              )}
              <button
                onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
                disabled={activeStep === 5}
                className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md hover:bg-primary-container transition-all flex items-center gap-1.5 disabled:opacity-40"
              >
                <span>Next Step</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="p-2.5 bg-surface-container-high text-primary hover:bg-primary/10 rounded-xl transition-colors"
                title="Download PDF"
              >
                <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
