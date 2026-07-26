import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const SUGGESTIONS = [
  { title: 'Audit My Resume', desc: 'Scan for structural gaps & ATS keywords', icon: 'edit_document', color: 'text-primary' },
  { title: 'Generate Summary', desc: 'Punchy 3-line executive overview', icon: 'person_search', color: 'text-secondary' },
  { title: 'Rewrite Bullet Points', desc: 'Convert tasks to quantified achievements', icon: 'history_edu', color: 'text-tertiary' },
  { title: 'ATS Keyword Match', desc: 'Suggest high-impact skills for Tech', icon: 'psychology', color: 'text-primary' },
  { title: 'Interview Questions', desc: 'Practice top 5 questions for senior role', icon: 'quiz', color: 'text-secondary' },
  { title: 'Salary Negotiation', desc: 'Tips for offer benchmarking', icon: 'payments', color: 'text-emerald-600' },
];

const AI_RESPONSES = {
  'Audit My Resume': `Great, I've audited your resume! Here are the key findings:\n\n✅ Strong job title and summary\n⚠️ Missing quantified achievements in work experience\n⚠️ Skills section lacks industry-specific ATS keywords\n❌ No LinkedIn or portfolio URL found\n\n💡 Recommendation: Add metrics to your bullet points (e.g., "increased engagement by 45%") and include relevant tools like Figma, React, or Jira.`,
  'Generate Summary': `Here is a tailored executive summary for your profile:\n\n"Innovative Senior Product Designer with 8+ years translating complex user needs into elegant, data-driven interfaces for 2M+ global users. Expert in AI-powered design systems, cross-functional leadership, and rapid prototype-to-launch delivery. Proven track record of boosting engagement metrics by 40%+ across enterprise-scale products."`,
  'Rewrite Bullet Points': `Here are AI-enhanced bullet points with quantified impact:\n\n• Architected and scaled core AI product interfaces for 2M+ active global users, driving 45% increase in engagement\n• Designed and deployed a modern multi-platform design system, accelerating sprint velocity by 35%\n• Spearheaded cross-functional AI integration projects, reducing user drop-off by 28%\n• Launched 5 major product features in 12 months, each achieving 90%+ user satisfaction scores`,
  'ATS Keyword Match': `For a Senior Product Designer role in Tech, here are high-impact ATS keywords to add:\n\n🎯 Core Skills: Figma, Sketch, Adobe XD, Framer\n🎯 Methodologies: Design Thinking, Agile/Scrum, User Research\n🎯 Technical: Prototyping, Wireframing, Design Systems, CSS/HTML basics\n🎯 Leadership: Cross-functional collaboration, Stakeholder management\n\nYour current match score: 68% → Target: 85%+`,
  'Interview Questions': `Here are top 5 interview questions for a Senior Product Designer role:\n\n1. "Walk me through your design process for a complex product feature."\n2. "How do you balance user needs with business constraints?"\n3. "Tell me about a time you disagreed with a stakeholder's design decision."\n4. "How have you used data to validate design decisions?"\n5. "How do you ensure consistency across a large design system?"\n\nWould you like AI-generated answers for any of these?`,
  'Salary Negotiation': `Here's a salary benchmarking guide for your role:\n\n💼 Senior Product Designer – San Francisco, CA\n📊 Market Range: $130,000 – $185,000\n🎯 Your Target (8 yrs exp): $155,000 – $170,000\n\n✅ Negotiation Tips:\n• Always negotiate – 85% of offers have room\n• Lead with market data, not personal need\n• Request 10–15% above your target\n• Consider total comp: equity, bonuses, benefits\n• Get the offer in writing before resigning`,
};

const getAIResponse = (text) => {
  const found = Object.keys(AI_RESPONSES).find((key) =>
    text.toLowerCase().includes(key.toLowerCase())
  );
  if (found) return AI_RESPONSES[found];
  if (text.toLowerCase().includes('summary')) return AI_RESPONSES['Generate Summary'];
  if (text.toLowerCase().includes('bullet') || text.toLowerCase().includes('rewrite'))
    return AI_RESPONSES['Rewrite Bullet Points'];
  if (text.toLowerCase().includes('ats') || text.toLowerCase().includes('keyword'))
    return AI_RESPONSES['ATS Keyword Match'];
  if (text.toLowerCase().includes('interview'))
    return AI_RESPONSES['Interview Questions'];
  if (text.toLowerCase().includes('salary') || text.toLowerCase().includes('negotiat'))
    return AI_RESPONSES['Salary Negotiation'];
  return `I've analyzed your request! Here's an optimized suggestion:\n\n• Spearheaded cross-functional AI product features, boosting user retention by 28% and driving $1.2M in annual recurring revenue.\n\nWould you like me to help with your summary, bullet points, ATS keywords, or interview prep?`;
};

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm your AI Career Copilot 🚀\n\nI can help you:\n• Audit and improve your resume\n• Generate professional summaries\n• Rewrite bullet points with measurable impact\n• Match ATS keywords for your target role\n• Prepare for interviews\n\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const now = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSend = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg = { sender: 'user', text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setIsTyping(true);
    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: response, time: now() },
      ]);
      setIsTyping(false);
    }, delay);

    // refocus input
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length < 3;

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 h-[calc(100vh-65px)] relative">
          {/* Top Banner */}
          <div className="px-6 py-4 border-b border-surface-container-high/60 bg-surface-bright flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
              <div>
                <h1 className="font-display font-extrabold text-lg text-on-surface">
                  AI Career Copilot
                </h1>
                <p className="text-xs text-outline">
                  Interactive Resume &amp; Interview Coaching Engine
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Model Online
              </span>
              <button
                onClick={() => {
                  setMessages([
                    {
                      sender: 'ai',
                      text: "Hello! I'm your AI Career Copilot 🚀\n\nHow can I help you today?",
                      time: now(),
                    },
                  ]);
                }}
                className="p-2 text-outline hover:text-on-surface hover:bg-surface-container rounded-xl transition-all"
                title="Clear conversation"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 max-w-4xl mx-auto w-full">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shrink-0 shadow-md mt-1">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  </div>
                )}
                <div
                  className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-surface-container-lowest border border-outline-variant/20 text-on-surface rounded-bl-none'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[10px] mt-2 font-medium ${
                      msg.sender === 'user' ? 'text-white/80 text-right' : 'text-outline'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <span className="material-symbols-outlined text-sm">person</span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/20 px-5 py-3.5 rounded-2xl text-xs text-outline font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1">AI Copilot is thinking...</span>
                </div>
              </div>
            )}

            {/* Quick Prompts */}
            {showSuggestions && !isTyping && (
              <div className="pt-6 border-t border-outline-variant/10">
                <p className="text-xs font-bold text-outline uppercase tracking-wider mb-4">
                  Quick Prompts &amp; Workflows
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug.title)}
                      className="p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-left hover:border-primary hover:shadow-md transition-all group"
                    >
                      <span
                        className={`material-symbols-outlined text-2xl ${sug.color} mb-2 block group-hover:scale-110 transition-transform`}
                      >
                        {sug.icon}
                      </span>
                      <h4 className="font-bold text-xs text-on-surface mb-0.5">{sug.title}</h4>
                      <p className="text-[11px] text-outline">{sug.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 lg:p-6 border-t border-surface-container-high/60 bg-surface-bright shrink-0">
            <div className="max-w-4xl mx-auto flex items-center gap-3 bg-surface-container-low p-2 rounded-2xl border border-outline-variant/30 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Career Copilot anything about your resume, cover letter, or career..."
                className="flex-1 bg-transparent px-4 py-2 text-sm text-on-surface focus:outline-none placeholder:text-outline/70"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isTyping}
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs rounded-xl shadow-md hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Send</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
            <p className="text-center text-[10px] text-outline mt-2">
              AI responses are suggestions. Always review before using on a real resume.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
