import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { name: t('sidebar.dashboard'), path: '/dashboard', icon: 'dashboard' },
    { name: t('sidebar.resumeBuilder'), path: '/resume-builder', icon: 'edit_document' },
    { name: t('sidebar.coverLetter'), path: '/cover-letter-builder', icon: 'mail' },
    { name: t('sidebar.atsChecker'), path: '/ats-checker', icon: 'fact_check' },
    { name: t('sidebar.templates'), path: '/templates', icon: 'grid_view' },
    { name: t('sidebar.aiAssistant'), path: '/ai-assistant', icon: 'psychology' },
    { name: t('sidebar.profile'), path: '/profile', icon: 'person' },
    { name: t('sidebar.settings'), path: '/settings', icon: 'settings' },
  ];

  return (
    <aside className="w-64 bg-surface-bright border-r border-surface-container-high/60 hidden md:flex flex-col shrink-0 min-h-[calc(100vh-65px)]">
      {/* User Profile Mini Badge */}
      <div className="p-4 border-b border-surface-container-high/40">
        <Link to="/profile" className="flex items-center gap-3 p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group">
          <div className="relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1s9fWWGed0v44DiXl2UhdBHomHuuaK52EIdwdP5_2n0P7l4AaJHv-ItuBam-XoWqTxQQ1e2VCl2UUlxki1oZtK5zm0bObz5ueaVc3ZnfDPHOt289_ikdsQ2vZhi2O8ZTNc7JInoYrmJHu_H-EqOr32zxtMpRfYEI5zVC27KFHV4hzl_2Wzc0WoBMT_60XpaoyC88_yXvt2T2tIpx9DgVH1SWFBf994CoqCkLc84bC9E89k5nxZwAltSvbxOlWSJ0PQ5-Oro5WMZYh"
              alt="Alex Morgan"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
              Alex Morgan
            </span>
            <span className="text-[11px] text-outline truncate">Senior Engineer</span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold text-outline uppercase tracking-wider">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className={`material-symbols-outlined text-lg ${isActive ? 'text-white' : 'text-primary'}`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* AI Token Pro Badge */}
      <div className="p-4 m-3 bg-gradient-to-br from-primary/10 via-secondary/10 to-surface-container-low rounded-2xl border border-primary/20">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="material-symbols-outlined text-primary text-lg">bolt</span>
          <span className="text-xs font-bold text-on-surface">Pro AI Active</span>
        </div>
        <p className="text-[11px] text-on-surface-variant mb-3 leading-relaxed">
          8,450 / 10,000 monthly AI optimization tokens remaining.
        </p>
        <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-3 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full w-[84%]"></div>
        </div>
        <Link
          to="/settings"
          className="block w-full text-center py-1.5 text-[11px] font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          Manage Subscription
        </Link>
      </div>
    </aside>
  );
}
