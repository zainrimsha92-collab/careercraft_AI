import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Show a friendly prompt instead of immediately redirecting, 
    // passing the current location to the login page state.
    return (
      <div className="min-h-screen flex flex-col bg-background text-on-surface">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
            
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            
            <h2 className="font-display font-extrabold text-2xl text-on-surface mb-3">
              Sign In Required
            </h2>
            
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              To access this feature and save your progress, please sign in or create a free account.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                state={{ from: location.pathname }}
                className="w-full py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-container transition-colors shadow-md shadow-primary/20 flex justify-center items-center gap-2"
              >
                <span>Sign In to Continue</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              
              <Link
                to="/signup"
                state={{ from: location.pathname }}
                className="w-full py-3 bg-surface-container text-on-surface font-bold text-sm rounded-xl hover:bg-surface-container-high transition-colors"
              >
                Create a Free Account
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return children;
}
