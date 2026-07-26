import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full">
          {/* Welcome Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-on-surface mb-1">
                Welcome back, Alex! 👋
              </h1>
              <p className="text-on-surface-variant text-sm sm:text-base">
                Your career journey is looking strong. You've improved your resume ATS match score by 12% this month.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/resume-builder"
                className="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-md shadow-primary/20 hover:bg-primary-container transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>New Resume</span>
              </Link>
              <Link
                to="/ats-checker"
                className="px-5 py-2.5 bg-surface-container-high text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container-highest transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm text-secondary">fact_check</span>
                <span>Scan ATS</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">analytics</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  +5% vs last week
                </span>
              </div>
              <p className="text-outline font-semibold text-xs mb-1">Resume Score</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl text-on-surface">85</span>
                <span className="text-outline text-xs">/ 100</span>
              </div>
              <div className="mt-4 h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[85%]"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <span className="material-symbols-outlined text-2xl">file_copy</span>
              </div>
              <p className="text-outline font-semibold text-xs mb-1">Total Resumes</p>
              <span className="font-display font-extrabold text-3xl text-on-surface">12</span>
              <p className="text-xs text-outline mt-2">3 optimized for Software Tech</p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary mb-4">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <p className="text-outline font-semibold text-xs mb-1">Cover Letters</p>
              <span className="font-display font-extrabold text-3xl text-on-surface">08</span>
              <p className="text-xs text-outline mt-2">85% recruiter response rate</p>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <span className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                </span>
              </div>
              <p className="text-outline font-semibold text-xs mb-1">ATS Avg. Score</p>
              <span className="font-display font-extrabold text-3xl text-on-surface">92%</span>
              <p className="text-xs text-outline mt-2">Outperforming 88% of peers</p>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              to="/resume-builder"
              className="flex items-center gap-2 px-5 py-3 bg-primary text-on-primary font-bold text-xs rounded-xl hover:shadow-lg transition-all active:scale-95 shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Create Resume</span>
            </Link>
            <Link
              to="/cover-letter-builder"
              className="flex items-center gap-2 px-5 py-3 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-secondary">auto_awesome</span>
              <span>Generate Cover Letter</span>
            </Link>
            <Link
              to="/ats-checker"
              className="flex items-center gap-2 px-5 py-3 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-primary">search_check</span>
              <span>Analyze ATS Match</span>
            </Link>
            <Link
              to="/templates"
              className="flex items-center gap-2 px-5 py-3 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-tertiary">grid_view</span>
              <span>Explore Templates</span>
            </Link>
          </div>

          {/* Grid Layout (2 cols + 1 col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Iteration Trend Chart Visual */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-on-surface">
                      Resume Optimization Trends
                    </h3>
                    <p className="text-xs text-outline">ATS Match score progression over last 6 iterations</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-surface-container-high rounded-lg text-on-surface-variant">
                    Last 30 Days
                  </span>
                </div>
                <div className="h-56 w-full flex items-end justify-between gap-3 pt-8 px-2">
                  {[
                    { label: 'V1', val: '62%' },
                    { label: 'V2', val: '68%' },
                    { label: 'V3', val: '72%' },
                    { label: 'V4', val: '81%' },
                    { label: 'V5', val: '85%' },
                    { label: 'Latest', val: '92%', active: true },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-bold text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.val}
                      </span>
                      <div
                        style={{ height: bar.val }}
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          bar.active
                            ? 'bg-gradient-to-t from-primary to-secondary opacity-100 shadow-md shadow-primary/30'
                            : 'bg-primary/20 hover:bg-primary/40'
                        }`}
                      ></div>
                      <span className={`text-[11px] font-semibold ${bar.active ? 'text-primary font-bold' : 'text-outline'}`}>
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Resumes Table */}
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                  <h3 className="font-display font-bold text-lg text-on-surface">Recent Resumes</h3>
                  <Link to="/templates" className="text-primary font-bold text-xs hover:underline">
                    View All
                  </Link>
                </div>
                <div className="divide-y divide-outline-variant/10">
                  {[
                    { title: 'Senior Product Designer - Google', updated: '2 hours ago', size: '2.4 MB', tag: 'Optimized', score: 92, tagBg: 'bg-emerald-50 text-emerald-700' },
                    { title: 'Creative Lead - Meta', updated: 'Yesterday', size: '1.8 MB', tag: 'Completed', score: 78, tagBg: 'bg-blue-50 text-blue-700' },
                    { title: 'General Tech Template', updated: '3 days ago', size: '1.2 MB', tag: 'Draft', score: 54, tagBg: 'bg-amber-50 text-amber-700' },
                  ].map((res, i) => (
                    <div key={i} className="p-5 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
                      <div className="w-10 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <span className="material-symbols-outlined text-2xl">description</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-on-surface truncate group-hover:text-primary transition-colors">
                          {res.title}
                        </h4>
                        <p className="text-xs text-outline">{res.updated} • {res.size}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${res.tagBg}`}>
                          {res.tag}
                        </span>
                        <div className="flex items-center gap-1 font-bold text-sm text-on-surface">
                          <span className="material-symbols-outlined text-amber-500 text-sm">star</span>
                          <span>{res.score}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Right Column */}
            <div className="space-y-8">
              {/* Activity Timeline */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
                <h3 className="font-display font-bold text-lg text-on-surface mb-6">Recent Activity</h3>
                <div className="space-y-6 relative">
                  <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-outline-variant/20"></div>
                  {[
                    { title: 'Resume optimized for Google', time: '2 hours ago', icon: 'auto_awesome', color: 'bg-primary/10 text-primary' },
                    { title: 'New cover letter generated', time: 'Yesterday, 4:15 PM', icon: 'edit_note', color: 'bg-secondary/10 text-secondary' },
                    { title: 'ATS score hit 92%', time: '3 days ago', icon: 'check_circle', color: 'bg-emerald-100 text-emerald-700' },
                    { title: 'Exported Senior_Dev_V2.pdf', time: 'May 24, 11:30 AM', icon: 'download', color: 'bg-amber-100 text-amber-700' },
                  ].map((act, i) => (
                    <div key={i} className="relative pl-9 flex flex-col">
                      <div className={`absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white ${act.color}`}>
                        <span className="material-symbols-outlined text-xs">{act.icon}</span>
                      </div>
                      <p className="text-xs font-bold text-on-surface leading-snug">{act.title}</p>
                      <span className="text-[10px] text-outline mt-0.5">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Career Assistant Insights Box */}
              <div className="bg-gradient-to-br from-primary via-primary-container to-secondary p-0.5 rounded-2xl shadow-lg">
                <div className="bg-surface-bright p-6 rounded-[14px]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-secondary">
                      AI Copilot Insight
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    "Based on your latest job scans, you match strongly for <span className="font-bold text-on-surface">Senior Systems Architect</span> roles. Highlight your Cloud Native Kubernetes achievements to boost ATS rank."
                  </p>
                  <Link
                    to="/ai-assistant"
                    className="text-xs font-bold text-primary hover:text-primary-container flex items-center gap-1 group"
                  >
                    <span>Ask AI Copilot</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
