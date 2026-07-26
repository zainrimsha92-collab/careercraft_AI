import React, { useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

export default function CoverLetterBuilder() {
  const [companyName, setCompanyName] = useState('Innovate Tech Corp');
  const [jobTitle, setJobTitle] = useState('Senior Product Designer');
  const [yearsExp, setYearsExp] = useState('5-10 years');
  const [skills, setSkills] = useState(['UI/UX Design', 'Figma', 'Design Systems']);
  const [newSkill, setNewSkill] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const letterRef = useRef(null);

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((sk) => sk !== skillToRemove));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    if (letterRef.current) {
      const text = letterRef.current.innerText;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {
        // Fallback for browsers without clipboard API
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleDownloadPDF = () => {
    if (!letterRef.current) return;
    const printStyles = `
      <style>
        @media print {
          body > *:not(#print-cover-letter) { display: none !important; }
          #print-cover-letter { display: block !important; }
        }
        body { margin: 0; font-family: 'Inter', sans-serif; }
        #print-cover-letter { padding: 60px; max-width: 800px; margin: 0 auto; }
      </style>
    `;
    const printContent = letterRef.current.outerHTML;
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter – ${companyName}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
          ${printStyles}
        </head>
        <body>
          <div id="print-cover-letter">${printContent}</div>
          <script>window.onload = function() { window.print(); window.close(); }<\/script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-65px)]">
            {/* Left Form Pane */}
            <section className="w-full lg:w-[450px] p-6 lg:p-8 bg-surface-bright border-r border-outline-variant/10 overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                <h2 className="font-display font-extrabold text-xl text-on-surface">
                  Cover Letter Generator
                </h2>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Target Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Innovate Tech Corp"
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                      Target Job Title
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior UX Designer"
                      className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                      Years of Experience
                    </label>
                    <select
                      value={yearsExp}
                      onChange={(e) => setYearsExp(e.target.value)}
                      className="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option>0-2 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">
                      Key Highlights &amp; Skills
                    </label>
                    <span className="text-[10px] font-bold text-primary">Press Enter to Add</span>
                  </div>
                  <div className="flex flex-wrap gap-2 p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl min-h-[80px]">
                    {skills.map((sk, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1"
                      >
                        <span>{sk}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(sk)}
                          className="hover:text-error"
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
                      placeholder="Add skill..."
                      className="bg-transparent border-none focus:ring-0 text-xs text-on-surface outline-none w-28"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Job Description (Optional Context)
                  </label>
                  <textarea
                    rows={5}
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Paste job posting key requirements for AI adaptation..."
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3.5 bg-gradient-to-r from-primary via-primary-container to-secondary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    {isGenerating ? 'sync' : 'auto_awesome'}
                  </span>
                  <span>{isGenerating ? 'Generating Narrative...' : 'Generate Cover Letter'}</span>
                </button>
              </form>
            </section>

            {/* Right Preview Pane */}
            <section className="flex-1 p-6 lg:p-10 bg-surface-container-low overflow-y-auto flex flex-col items-center">
              {/* Document Actions Bar */}
              <div className="w-full max-w-[800px] flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">
                    AI Letter Output
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-outline-variant/30 text-on-surface font-bold text-xs rounded-xl shadow-xs hover:bg-surface-container transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl shadow-md hover:bg-primary-container transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Cover Letter Paper */}
              <div
                ref={letterRef}
                className={`w-full max-w-[800px] min-h-[900px] bg-white rounded-2xl shadow-xl border border-outline-variant/20 p-8 lg:p-14 relative transition-all duration-300 ${
                  isGenerating ? 'opacity-50 scale-98' : 'opacity-100 scale-100'
                }`}
              >
                {/* AI Badge */}
                <div className="absolute top-6 right-8 px-3.5 py-1 bg-surface-container-low border border-primary/20 rounded-full flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    AI Precision Mode
                  </span>
                </div>

                <div className="space-y-6 text-on-surface">
                  {/* Sender Header */}
                  <div className="border-b border-outline-variant/15 pb-6">
                    <h1 className="font-display font-extrabold text-3xl text-primary mb-1">
                      Alex Rivera
                    </h1>
                    <p className="text-xs text-outline font-medium">
                      alex.rivera@example.com • +1 555-0123 • San Francisco, CA
                    </p>
                  </div>

                  {/* Date & Addressee */}
                  <div className="pt-2">
                    <p className="text-xs text-outline mb-4">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="font-bold text-sm text-on-surface">
                      Dear Hiring Manager at <span className="text-primary">{companyName || '[Company Name]'}</span>,
                    </p>
                  </div>

                  {/* Body Paragraphs */}
                  <div className="space-y-4 text-sm leading-relaxed text-on-surface-variant font-sans">
                    <p>
                      I am writing to express my enthusiastic interest in the{' '}
                      <span className="font-bold text-primary">{jobTitle || '[Job Title]'}</span> position at{' '}
                      <span className="font-bold text-on-surface">{companyName || '[Company Name]'}</span>. With over{' '}
                      <span className="font-bold">{yearsExp}</span> of hands-on experience in high-growth environments, I have developed deep mastery in{' '}
                      <span className="font-bold text-secondary">{skills.join(', ') || 'modern industry workflows'}</span>.
                    </p>

                    <p>
                      In my previous role as a Lead Designer, I spearheaded cross-functional product redesigns that boosted user acquisition by 40% and improved design system developer hand-off efficiency by 30%. My methodology combines data-backed user research with high-fidelity visual craftsmanship, ensuring scalable and engaging digital products.
                    </p>

                    <p>
                      What excites me most about <span className="font-bold text-primary">{companyName}</span> is your commitment to delivering world-class software solutions. I am confident that my background in {skills[0] || 'design'} and collaborative problem-solving will allow me to make an immediate positive impact on your product roadmap.
                    </p>

                    <p>
                      Thank you for your time and consideration. I welcome the opportunity to discuss how my experience and skills align with your upcoming goals for the {jobTitle} role.
                    </p>
                  </div>

                  {/* Sign Off */}
                  <div className="pt-6">
                    <p className="text-sm">Sincerely,</p>
                    <p className="font-display font-bold text-lg text-primary mt-3 italic">
                      Alex Rivera
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
