import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  // Load language from localStorage
  const loadLanguage = () => {
    try {
      const saved = localStorage.getItem('careercraft_settings');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.language) {
          setLanguage(p.language);
        }
      }
    } catch (_) {}
  };

  useEffect(() => {
    loadLanguage();

    // Listen for custom event triggered by Settings.jsx saving
    const handleSettingsSaved = () => {
      loadLanguage();
    };

    window.addEventListener('settingsSaved', handleSettingsSaved);
    return () => window.removeEventListener('settingsSaved', handleSettingsSaved);
  }, []);

  // Translation function: t('sidebar.dashboard')
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    return value || key; // Fallback to key if missing
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
