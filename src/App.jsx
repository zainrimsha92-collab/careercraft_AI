import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import CoverLetterBuilder from './pages/CoverLetterBuilder';
import ATSChecker from './pages/ATSChecker';
import ResumeTemplates from './pages/ResumeTemplates';
import AIAssistant from './pages/AIAssistant';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PlatformFlow from './pages/PlatformFlow';

export default function App() {
  
  // Handle Global Theme (Dark Mode)
  useEffect(() => {
    const applyTheme = () => {
      try {
        const saved = localStorage.getItem('careercraft_settings');
        if (saved) {
          const { themeMode } = JSON.parse(saved);
          
          if (themeMode === 'dark') {
            document.documentElement.classList.add('dark');
          } else if (themeMode === 'light') {
            document.documentElement.classList.remove('dark');
          } else {
            // System
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        }
      } catch (_) {}
    };

    applyTheme();

    // Listen for custom save event
    window.addEventListener('settingsSaved', applyTheme);
    return () => window.removeEventListener('settingsSaved', applyTheme);
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<ResumeTemplates />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/platform-flow" element={<PlatformFlow />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/cover-letter-builder" element={<ProtectedRoute><CoverLetterBuilder /></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </LanguageProvider>
    </AuthProvider>
  );
}
