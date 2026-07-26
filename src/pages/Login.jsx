import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ name: 'Alex Morgan', email });
      setLoading(false);
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center px-6 py-16 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-[460px] bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 lg:p-10 shadow-xl relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-on-surface mb-2">
              Log in to your account
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Elevate your professional narrative with CareerCraft AI.
            </p>
          </div>

          {/* Social Sign in */}
          <button
            onClick={() => {
              login({ name: 'Alex Morgan', email: 'alex@gmail.com' });
              navigate(from, { replace: true });
            }}
            className="w-full py-3 px-4 bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 rounded-xl font-bold text-xs text-on-surface flex items-center justify-center gap-3 transition-colors mb-6 shadow-xs"
          >
            <svg height="18" viewBox="0 0 24 24" width="18">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-outline-variant/30"></div>
            <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
              Or email login
            </span>
            <div className="h-px flex-1 bg-outline-variant/30"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-primary font-bold hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded text-primary focus:ring-primary" defaultChecked />
              <label htmlFor="remember" className="text-xs text-on-surface-variant cursor-pointer font-medium">
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-on-surface-variant">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-extrabold hover:underline">
              Create Account Free
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
