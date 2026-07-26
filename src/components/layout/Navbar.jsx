import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: t('sidebar.templates'), path: '/templates' },
    { name: t('sidebar.atsChecker'), path: '/ats-checker' },
    { name: 'Flow Map', path: '/platform-flow' },
  ];

  if (isAuthenticated) {
    navLinks.splice(1, 0, { name: t('sidebar.dashboard'), path: '/dashboard' });
  }

  return (
    <header className="sticky top-0 z-50 bg-surface-bright/90 backdrop-blur-md border-b border-surface-container-high/60 px-4 lg:px-8 py-3 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-container via-primary to-secondary-container flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-on-surface flex items-center gap-1">
              CareerCraft <span className="text-primary font-extrabold">AI</span>
            </span>
            <span className="text-[10px] tracking-wider text-outline uppercase font-semibold -mt-1">
              Professional Suite
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">person</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/10 rounded-full transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 text-xs font-semibold text-on-primary bg-gradient-to-r from-primary-container to-secondary-container hover:opacity-90 rounded-full shadow-md shadow-primary/20 transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-surface-container-high/60 flex flex-col gap-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="material-symbols-outlined text-sm">chevron_right</span>}
              </Link>
            );
          })}
          <div className="mt-3 pt-3 border-t border-surface-container-high flex flex-col gap-2 px-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-primary bg-surface-container-low rounded-xl"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 rounded-xl"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-primary bg-surface-container-low rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-white bg-primary rounded-xl shadow-md"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
