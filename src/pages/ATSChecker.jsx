import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

export default function ATSChecker() {
  const [jobDesc, setJobDesc] = useState('');
  const [fileName, setFileName] = useState('Senior_Product_Designer_Resume.pdf');
  const [analyzing, setAnalyzing] = useState(false);
  const [score, setScore] = useState(78);
  const [missingKeywords, setMissingKeywords] = useState([
    'Figma Variables',
    'Agile Methodology',
    'Token Engineering',
    'A/B Testing',
  ]);
  const [matchedKeywords, setMatchedKeywords] = useState([
    'User Research',
    'System Design',
    'React',
    'Stakeholder Management',
    'UI/UX Prototyping',
  ]);

  const [showEngineModal, setShowEngineModal] = useState(false);
  const fileInputRef = useRef(null);

  // Analyze based on the current lists and some randomness to feel "real"
  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      // Calculate a base score based on matched vs total keywords
      const total = missingKeywords.length + matchedKeywords.length;
      let calculatedScore = total > 0 ? Math.round((matchedKeywords.length / total) * 100) : 0;
      
      // Add a slight boost if job description is provided
      if (jobDesc.length > 50) {
        calculatedScore = Math.min(100, calculatedScore + 12);
      }
      
      // Ensure score is reasonable
      if (calculatedScore < 30) calculatedScore = 30;
      
      setScore(calculatedScore);
      setAnalyzing(false);
    }, 1500);
  };

  const handleAddKeyword = (kw) => {
    setMissingKeywords(missingKeywords.filter((k) => k !== kw));
    setMatchedKeywords([...matchedKeywords, kw]);
    setScore((prev) => Math.min(100, prev + 5));
  };

  const handleRemoveKeyword = (kw) => {
    setMatchedKeywords(matchedKeywords.filter((k) => k !== kw));
    setMissingKeywords([...missingKeywords, kw]);
    setScore((prev) => Math.max(0, prev - 5));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      // Reset score when new file is uploaded
      setScore(45); // lower score for a fresh, unoptimized resume
      setMissingKeywords([
        'Figma Variables',
        'Agile Methodology',
        'Token Engineering',
        'A/B Testing',
        'Design Systems',
        'Prototyping'
      ]);
      setMatchedKeywords(['User Research', 'React']);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full relative">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => setShowEngineModal(true)}
              className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-secondary mb-2 hover:bg-surface-container-highest transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">fact_check</span>
              <span>Neural Parsing Engine</span>
              <span className="material-symbols-outlined text-[10px] ml-1">info</span>
            </button>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-on-surface">
              ATS Resume Scanner &amp; Match Checker
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base mt-1 max-w-2xl">
              Upload your resume and paste target job requirements to identify keyword gaps and boost your interview call-back rate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs Pane */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
                <h2 className="font-display font-bold text-lg text-on-surface">
                  1. Upload Resume &amp; Input Job Details
                </h2>

                {/* File Dropzone */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".pdf,.docx,.doc" 
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-outline-variant/40 hover:border-primary rounded-2xl p-8 flex flex-col items-center text-center space-y-3 bg-surface-container-low hover:bg-primary/5 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">{fileName}</p>
                    <p className="text-xs text-outline mt-0.5">Click or drag &amp; drop to replace (PDF, DOCX)</p>
                  </div>
                </div>

                {/* Job Description TextArea */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">
                      Target Job Description
                    </label>
                    <button
                      onClick={() =>
                        setJobDesc(
                          'Seeking a Senior Designer proficient in Figma Variables, Agile methodology, token engineering, user research, and A/B testing. Must have experience with React and UI/UX Prototyping. Strong stakeholder management skills required.'
                        )
                      }
                      className="text-xs text-primary font-bold hover:underline"
                    >
                      Insert Sample Job
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Paste job posting text or key responsibilities here..."
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed resize-none"
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className={`material-symbols-outlined text-lg ${analyzing ? 'animate-spin' : ''}`}>
                    {analyzing ? 'sync' : 'analytics'}
                  </span>
                  <span>{analyzing ? 'Scanning Resume ATS Data...' : 'Analyze Match Score'}</span>
                </button>
              </div>

              {/* Past Scans List */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
                <h3 className="font-display font-bold text-sm text-outline uppercase tracking-wider mb-3">
                  Recent Comparisons
                </h3>
                <div className="space-y-2">
                  {[
                    { company: 'Senior Product Designer @ Google', score: 92, status: 'text-emerald-600' },
                    { company: 'Lead UX Researcher @ Meta', score: 78, status: 'text-amber-600' },
                    { company: 'Design Systems Lead @ Stripe', score: 85, status: 'text-emerald-600' },
                  ].map((rec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-bold text-on-surface">{rec.company}</span>
                      <span className={`text-xs font-extrabold ${rec.status}`}>{rec.score}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Analysis Breakdown Pane */}
            <div className="lg:col-span-7 space-y-6">
              {/* Score Overview Card */}
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col sm:flex-row items-center gap-8">
                <div className="relative w-40 h-40 rounded-full border-[10px] border-primary/20 flex items-center justify-center border-t-primary shrink-0 shadow-inner transition-all duration-1000 ease-out" style={{ transform: `rotate(${(score / 100) * 360}deg)` }}>
                  <div className="text-center" style={{ transform: `rotate(-${(score / 100) * 360}deg)` }}>
                    <span className="font-display font-extrabold text-4xl text-on-surface block transition-all duration-1000">
                      {score}
                    </span>
                    <span className="text-xs text-outline font-semibold">/ 100</span>
                  </div>
                </div>

                <div className="space-y-3 text-center sm:text-left">
                  <h3 className="font-display font-bold text-2xl text-on-surface">
                    ATS Match Breakdown
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Your resume has high structural readability. Incorporating missing technical keywords will push your match score above 90%.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                      ✓ Good ATS Formatting
                    </span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary font-bold text-xs rounded-full">
                      {missingKeywords.length} Keyword Gaps
                    </span>
                  </div>
                </div>
              </div>

              {/* Bento Grid Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Missing Keywords Box */}
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-error">
                      <span className="material-symbols-outlined text-xl">warning</span>
                      <h4 className="font-display font-bold text-base">Missing Target Keywords</h4>
                    </div>
                    <span className="text-xs font-bold bg-error/10 text-error px-2 py-0.5 rounded">{missingKeywords.length}</span>
                  </div>
                  <p className="text-xs text-outline">Click a keyword to auto-inject into your draft:</p>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => handleAddKeyword(kw)}
                        className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:-translate-y-0.5 font-bold text-xs rounded-lg transition-all flex items-center gap-1 group shadow-sm"
                      >
                        <span>+ {kw}</span>
                      </button>
                    ))}
                    {missingKeywords.length === 0 && (
                      <span className="text-xs font-bold text-emerald-600">All key terms matched!</span>
                    )}
                  </div>
                </div>

                {/* Successfully Matched Box */}
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <span className="material-symbols-outlined text-xl">check_circle</span>
                      <h4 className="font-display font-bold text-base">Matched Keywords</h4>
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">{matchedKeywords.length}</span>
                  </div>
                  <p className="text-xs text-outline">Click to remove if accidentally matched:</p>
                  <div className="flex flex-wrap gap-2">
                    {matchedKeywords.map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => handleRemoveKeyword(kw)}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:line-through font-bold text-xs rounded-lg border border-emerald-100 transition-colors shadow-sm"
                        title="Remove match"
                      >
                        ✓ {kw}
                      </button>
                    ))}
                    {matchedKeywords.length === 0 && (
                      <span className="text-xs font-bold text-rose-600">No keywords matched yet.</span>
                    )}
                  </div>
                </div>

                {/* Format Suggestions */}
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-xl text-primary">format_paint</span>
                    <h4 className="font-display font-bold text-base">Layout &amp; Structure</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-on-surface-variant">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                      <span>Single-column standard margins parse cleanly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-amber-500 text-sm">lightbulb</span>
                      <span>Ensure section headings use standard labels ("Work Experience").</span>
                    </li>
                  </ul>
                </div>

                {/* AI Tone Optimizer */}
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-secondary">
                    <span className="material-symbols-outlined text-xl">spellcheck</span>
                    <h4 className="font-display font-bold text-base">Impact Verb Suggestions</h4>
                  </div>
                  <div className="p-3 bg-secondary/5 rounded-xl border border-secondary/10">
                    <p className="text-xs text-on-surface-variant">
                      <span className="text-secondary font-bold">AI Suggestion:</span> Change "Helped design mobile app" to{' '}
                      <span className="font-bold text-on-surface italic">
                        "Spearheaded end-to-end UX lifecycle of high-scale mobile app."
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-6 bg-gradient-to-r from-primary via-primary-container to-secondary rounded-2xl text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-lg">Auto-Optimize in Resume Builder</h4>
                  <p className="text-xs opacity-90">Inject missing keywords into your active resume draft instantly.</p>
                </div>
                <Link
                  to="/resume-builder"
                  className="px-6 py-3 bg-white text-primary font-bold text-xs rounded-xl hover:bg-surface-bright transition-all shadow-md shrink-0"
                >
                  Open Builder &amp; Fix
                </Link>
              </div>
            </div>
          </div>

          {/* Neural Parsing Engine Info Modal */}
          {showEngineModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center gap-3 mb-4 text-secondary">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-on-surface">Neural Parsing Engine</h3>
                </div>
                <div className="space-y-4 text-sm text-on-surface-variant mb-6">
                  <p>
                    <strong>What is it?</strong> CareerCraft's ATS scanner goes beyond simple exact-match keyword scanning.
                  </p>
                  <p>
                    It uses advanced Natural Language Processing (NLP) to understand the semantic context of your resume, 
                    identifying related terms, acronyms, and variations of skills (e.g., matching "UX" with "User Experience").
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Semantic Context Matching</li>
                    <li>Acronym Expansion</li>
                    <li>Role-Specific Impact Weighting</li>
                  </ul>
                </div>
                <button
                  onClick={() => setShowEngineModal(false)}
                  className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Understood
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
