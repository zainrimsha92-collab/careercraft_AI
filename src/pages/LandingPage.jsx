import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does the AI write my resume?',
      a: 'We use advanced language models trained on millions of successful resumes and job descriptions. The AI analyzes your background and rephrases your experience to highlight your achievements using high-impact industry keywords.',
    },
    {
      q: 'Is the resume truly ATS-friendly?',
      a: 'Absolutely. Our templates and AI output are specifically designed to be readable by all major Applicant Tracking Systems (ATS), ensuring your resume doesn\'t get rejected for formatting errors.',
    },
    {
      q: 'Can I export my resume as a PDF?',
      a: 'Yes, all users can export their resumes in professional PDF format. We also support Microsoft Word exports for certain templates if you prefer manual editing.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-gradient-to-br from-surface-container-low via-background to-surface-container-high/30 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full shadow-sm">
                <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
                <span className="text-secondary font-semibold text-xs uppercase tracking-wider">
                  AI-Powered Career Success
                </span>
              </div>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-on-surface tracking-tight">
                Build Professional <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Resumes &amp; Cover Letters</span> with AI
              </h1>
              <p className="text-on-surface-variant text-base sm:text-lg max-w-xl leading-relaxed">
                Our AI-powered platform helps you craft ATS-friendly resumes and tailored cover letters in minutes. Stand out to recruiters with precision-engineered professional narratives.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/resume-builder"
                  className="bg-primary hover:bg-primary-container text-on-primary px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 active:scale-95 flex items-center gap-2"
                >
                  <span>Get Started Free</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link
                  to="/platform-flow"
                  className="bg-white/80 backdrop-blur-md border border-outline-variant/40 text-on-surface px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-white transition-all shadow-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-xl">account_tree</span>
                  <span>Explore Flow Map</span>
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAK-hai7AsAPVbDoOyjjP928M3aLZZTQT-X4bCkdOnvVLQdaXH4xcWUfX4jCKleoAcFYNQxN-sAXxo_nbdL4lzAyFUJGUhjdimfoI9gu7dSnTOwLqEvRXsfSWL7jCXOU0hhTpJp5lxwy4wp9TsxIlmxecHx7-vgO1ZyZo-zRMLoyFHk_7_fkco886Kp7Jm5cknecrj8uQfLSfwWyi97D_l8GdNsJFJqHwfnjRVKwAW5W6om_2qNhQoOgYEKjNPz7HwDYrDKqIi20Oj"
                    alt="User"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxitCf5nud5Emp9x2Zv0YKZo579urD7Q8p_CH4_hKVI5-opuusTRXox3pVCQMrFNXSHvn7WSKIJwq5joJeAPzlI09L8xiss79fX-iDGRHV8KJeiNksJWjtx66tWlwGB8ZupVsiW6mcgWx4eZzxVsDehfRkSk-HFoY0MBWFVULW152uH3Ugu9KkPCZEvYjyhNTU4d7mh5e814Obw6V49XT5Xl_A22UJoldH_TZr2cbeGZODBjsHvj8tTKiqN_9wU4FiuzCIYIOV-Quo"
                    alt="User"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgP_PKMYxZdD7ZcoaxFSM8MGG-bnfP8pPEpvLACB_SndYHMvL6HsfSHtU_oI9HTIPPs91vqvRg5AYbt6YWYbcFwLutytsNUvI7nkRjENB4uNDOt7aY8RE_p-GIoOsinaAcMXud-TYXkUj8hN2sZ39vXYEbU83-oN0hQP5kUjXlWYB6cZbyexCQLIL7-nP7KLpusatzyS0UPoe4_FdSLOimz3pLDCbFXq8FxrwpCVzgsScATY7Y2qBphYmdQwVWYbviAR1VXRfr7XmX"
                    alt="User"
                  />
                </div>
                <p className="text-on-surface-variant text-sm font-medium">
                  <span className="font-extrabold text-on-surface">10,000+</span> professionals already hired
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
              <img
                alt="AI Resume Builder Interface"
                className="relative z-10 w-full h-auto drop-shadow-2xl rounded-2xl border border-white/40 shadow-2xl hover:scale-[1.01] transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-DX2wEbndv1N69J0hNgRjlBN89fBPxNSmGcczEZ3nnwNM9AfvvSS-0ulu3Sn4hZOA3kXyoaWtURXRDjiKF3fc66sD0XBD7tOcnitfNfTdoudM-XGS1aK66R7IvRpZHu_LczRpHWDgjLi6GS8h9F3PxK7o4rcpj7qWcO85OFbDj6rA79xoYY-RIjYN01OCsU-c_fCZ9Q9czmXGxXAdSRMwxuVDoS2dmvrtOVb4hQJ6YFQCXfwpsMf15Q1kyYDsmk7_v5NdcGG-gPbH"
              />
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 space-y-3">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-on-surface">
                Powerful AI Tools for Your Next Move
              </h2>
              <p className="text-on-surface-variant text-base max-w-2xl mx-auto">
                Everything you need to navigate the modern job market, powered by cutting-edge language models tailored for career success.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: 'description',
                  color: 'bg-primary/10 text-primary',
                  title: 'AI Resume Builder',
                  desc: 'Generate high-impact bullet points and summaries that catch the eye of hiring managers instantly.',
                  link: '/resume-builder',
                },
                {
                  icon: 'mail',
                  color: 'bg-secondary/10 text-secondary',
                  title: 'AI Cover Letter Generator',
                  desc: 'Create hyper-personalized cover letters for every application based on the specific job description.',
                  link: '/cover-letter-builder',
                },
                {
                  icon: 'fact_check',
                  color: 'bg-tertiary-container/10 text-tertiary',
                  title: 'ATS Resume Checker',
                  desc: 'Score your resume against applicant tracking systems to ensure you never get filtered out prematurely.',
                  link: '/ats-checker',
                },
                {
                  icon: 'dashboard_customize',
                  color: 'bg-primary/10 text-primary',
                  title: 'Resume Templates',
                  desc: 'Choose from dozens of designer-crafted templates that are both beautiful and functionally superior.',
                  link: '/templates',
                },
                {
                  icon: 'psychology',
                  color: 'bg-secondary/10 text-secondary',
                  title: 'AI Career Assistant',
                  desc: 'Get 24/7 advice on interview preparation, salary negotiation, and career pathing from our specialized AI.',
                  link: '/ai-assistant',
                },
                {
                  icon: 'picture_as_pdf',
                  color: 'bg-tertiary-container/10 text-tertiary',
                  title: 'Instant PDF Export',
                  desc: 'Export your documents in pixel-perfect PDF format, optimized for both human readers and digital scanners.',
                  link: '/resume-builder',
                },
              ].map((feat, i) => (
                <Link
                  key={i}
                  to={feat.link}
                  className="p-8 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feat.color}`}>
                      <span className="material-symbols-outlined text-2xl">{feat.icon}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 text-on-surface group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold text-primary gap-1 group-hover:gap-2 transition-all">
                    <span>Explore Feature</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Template Preview Section */}
        <section className="py-20 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  alt="Resume Template Gallery"
                  className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4AL4g4A0CVkba9-EJMjp7kz-z-1Fun1KWOMC2Cr8bayLjGb0L72R373A48qXCBIfRmCrgYHvYnv1ryVPEiK5JuW3XYxRzRTOneFJ1Jvs-QlmvjEUxK2NA76beQRxZ6m2xcCjJyhYIkJEC5J39gcCDSVRxzWYXX_f-PaBI6IvT2E6CpySSnt_8LEzHovP5t7ytsT4vMUgyHYf_ulsmJI1yjP-Jm2M1LGaWDJLsVFHkeTotDBJU1YZXbnVJvQDQ4WfECZos09rheNsy"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
                  Expertly Designed <br />
                  <span className="text-primary">Templates for Every Industry</span>
                </h2>
                <p className="text-on-surface-variant text-base sm:text-lg">
                  Whether you're a software engineer, a creative director, or an executive, we have a template that matches your professional tone.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {[
                    { title: 'Classic', icon: 'article', bg: 'bg-slate-100', color: 'text-primary' },
                    { title: 'Creative', icon: 'palette', bg: 'bg-indigo-100', color: 'text-secondary' },
                    { title: 'Modern', icon: 'save_as', bg: 'bg-sky-100', color: 'text-primary' },
                    { title: 'Professional', icon: 'work', bg: 'bg-slate-200', color: 'text-on-surface' },
                  ].map((tpl, i) => (
                    <Link
                      key={i}
                      to="/templates"
                      className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/20 hover:scale-105 hover:shadow-md transition-all text-center block group"
                    >
                      <div className={`h-24 rounded-lg ${tpl.bg} flex items-center justify-center mb-2`}>
                        <span className={`material-symbols-outlined text-3xl ${tpl.color}`}>{tpl.icon}</span>
                      </div>
                      <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        {tpl.title}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="pt-4">
                  <Link
                    to="/templates"
                    className="inline-flex items-center gap-2 font-bold text-sm text-primary hover:underline"
                  >
                    <span>Browse All Templates</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-on-surface mb-2">How It Works</h2>
              <p className="text-on-surface-variant text-base">Get your dream job in four simple steps.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
              {[
                { step: '1', title: 'Create Account', desc: 'Sign up for free and set your career goals.' },
                { step: '2', title: 'Enter Details', desc: 'Input your work history or upload your existing resume.' },
                { step: '3', title: 'AI Tailors', desc: 'Our AI crafts a professional ATS-optimized narrative.' },
                { step: '4', title: 'Download & Apply', desc: 'Get pixel-perfect PDF & DOCX exports instantly.' },
              ].map((st, i) => (
                <div key={i} className="text-center space-y-4 group">
                  <div className="w-16 h-16 bg-white border-2 border-primary rounded-full flex items-center justify-center mx-auto text-primary font-display font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-all shadow-md">
                    {st.step}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-on-surface">{st.title}</h4>
                    <p className="text-on-surface-variant text-sm mt-1">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-on-surface">
                Trusted by Top Professionals
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    '"CareerCraft AI completely transformed my application process. I landed three interviews in the first week after updating my resume!"',
                  name: 'Sarah Johnson',
                  role: 'Product Manager',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS6-idnVQ0GneaX2AtynGDneeupdpxcxvQvtbnTFhZiKodnT7xv0xRH_NoAwT80WWvtfoq8mMXkle9cgM1YxW8EHHZomGhFD8BU4aahWXpi2NnxcXauPBm2NYa-QoNuPBKlAf2Rvjiy9SZs9OohaOSvdlBcCNwTzW8GA1___-nxFhHQQEbTPT_bsU0vGXMEk5K2TkHuWJEdiGn_dIfRFVXSQy6fULUUl_AF29N5Ps47GneVK8YBZaYAb9zUCb_rLtbfCjGooUPZWO5',
                },
                {
                  quote:
                    '"The AI cover letter generator is a game changer. It saved me hours of work and the letters sound exactly like me, just more polished."',
                  name: 'Mark Davies',
                  role: 'Marketing Director',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO7KSKtLX3X2bzeI_c5Rdn7URza9YD3-B58qP-3KQjAu_Him21cn0A7rFjUlIg7mHmIc0cEP8ppSSuGnDpfSaTD4R2c7T9UCPughohxvqMANzmtUqIN0_A5KXXpglasmsAmtAZ5RffdRdNdW1PWV_-OrM0M5xOhmG6MqxHBkGgEyi44xg35pgviwgX0v2aH1F_fQVotPGai8jFANTn7P757RqotzVhX9z1WwTqyzzRe_3mGbmkJAj8CYkq31LkIxCpT8BS5msL6UKU',
                },
                {
                  quote:
                    '"I was skeptical of AI, but the ATS checker is incredibly accurate. I finally feel confident that my applications are actually being seen."',
                  name: 'Anita Chen',
                  role: 'Senior Developer',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFBOsvdcRFoP1BXKi__nEYlEBz_x0YfAcnMK1EagMAC4urQ5O0fZUJhwdqfFNp1j1qFnk7pYbuYVF5SPGfmsM-LJY0CaSb7OzipQV8XJe4sHBgCX6zc_jkULblHkc4TQP-ECyFTXp-iLSaukVgtVxZ7IYCNV1eLSWhxxxxbaZGaprDfubAcVshcyzwdIFtmhuPNPvDx8Ycj_2qS96I6g-A3OuDZM6mxip4qnxrdh3aqhKhEPo2z8SOPGPVam5Dladb4dKXi0Y5YMX8',
                },
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
                  <p className="italic text-on-surface-variant text-base leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-3 pt-6 mt-4 border-t border-surface-container-high/40">
                    <img className="w-12 h-12 rounded-full object-cover shadow-sm" src={t.img} alt={t.name} />
                    <div>
                      <p className="font-bold text-sm text-on-surface">{t.name}</p>
                      <p className="text-xs text-outline font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-on-surface">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-bold text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`material-symbols-outlined transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-primary' : ''}`}>
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
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary via-primary-container to-secondary rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl mb-4 tracking-tight">
              Start Building Your Resume Today
            </h2>
            <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Join thousands of professionals who have used CareerCraft AI to level up their careers. Get started for free.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-surface-bright transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Get Started Now</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
