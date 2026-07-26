import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { useLanguage } from '../context/LanguageContext';

export default function Settings() {
  const { t } = useLanguage();

  // ── Default State ──────────────────────────────────────────
  const [themeMode, setThemeMode] = useState('light');
  const [accentColor, setAccentColor] = useState('blue');
  const [language, setLanguage] = useState('en');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [browserNotifs, setBrowserNotifs] = useState(false);
  const [aiDataTraining, setAiDataTraining] = useState(true);
  
  const [savedNotice, setSavedNotice] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // ── Load saved settings on mount ────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem('careercraft_settings');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.themeMode) setThemeMode(p.themeMode);
        if (p.accentColor) setAccentColor(p.accentColor);
        if (p.language) setLanguage(p.language);
        if (typeof p.emailAlerts === 'boolean') setEmailAlerts(p.emailAlerts);
        if (typeof p.browserNotifs === 'boolean') setBrowserNotifs(p.browserNotifs);
        if (typeof p.aiDataTraining === 'boolean') setAiDataTraining(p.aiDataTraining);
      }
    } catch (_) {}
  }, []);

  const handleFieldChange = (setter, value) => {
    setter(value);
    setHasChanges(true);
    setSavedNotice(false);
  };

  // ── Save ──────────────────────────────────────────────────
  const handleSaveSettings = () => {
    const toSave = {
      themeMode,
      accentColor,
      language,
      emailAlerts,
      browserNotifs,
      aiDataTraining
    };
    localStorage.setItem('careercraft_settings', JSON.stringify(toSave));
    
    // Dispatch custom event so App.jsx and LanguageContext reload
    window.dispatchEvent(new Event('settingsSaved'));

    setHasChanges(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-10 max-w-[1200px] mx-auto w-full pb-24">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>Preferences &amp; System Configuration</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-on-surface">
              {t('settings.title')}
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base mt-1">
              {t('settings.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Appearance Section */}
            <section className="lg:col-span-8 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-2xl">palette</span>
                <h3 className="font-display font-bold text-xl text-on-surface">
                  {t('settings.appearance')}
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-3">
                  {t('settings.theme')}
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'light', name: t('settings.light'), bg: 'bg-white' },
                    { id: 'dark', name: t('settings.dark'), bg: 'bg-slate-900 text-white' },
                    { id: 'system', name: t('settings.system'), bg: 'bg-gradient-to-r from-white to-slate-800 text-slate-700' },
                  ].map((thm) => (
                    <button
                      key={thm.id}
                      onClick={() => handleFieldChange(setThemeMode, thm.id)}
                      className={`p-4 rounded-xl text-center border-2 transition-all ${
                        themeMode === thm.id
                          ? 'border-primary ring-4 ring-primary/10 shadow-md'
                          : 'border-outline-variant/30 hover:border-primary/50'
                      }`}
                    >
                      <div className={`h-12 rounded-lg mb-2 shadow-inner ${thm.bg}`}></div>
                      <span className="text-xs font-bold text-on-surface">{thm.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-3">
                  {t('settings.accent')}
                </label>
                <div className="flex gap-3">
                  {[
                    { id: 'blue', color: 'bg-primary' },
                    { id: 'purple', color: 'bg-secondary' },
                    { id: 'amber', color: 'bg-amber-600' },
                    { id: 'emerald', color: 'bg-emerald-600' },
                    { id: 'rose', color: 'bg-rose-600' },
                  ].map((clr) => (
                    <button
                      key={clr.id}
                      onClick={() => handleFieldChange(setAccentColor, clr.id)}
                      className={`w-9 h-9 rounded-full ${clr.color} ring-4 transition-all ${
                        accentColor === clr.id ? 'ring-primary/40 scale-110' : 'ring-transparent hover:ring-outline-variant/30'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </section>

            {/* Language Selection */}
            <section className="lg:col-span-4 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <span className="material-symbols-outlined text-2xl">translate</span>
                  <h3 className="font-display font-bold text-xl text-on-surface">{t('settings.languageTitle')}</h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {t('settings.languageDesc')}
                </p>
              </div>

              <select
                value={language}
                onChange={(e) => handleFieldChange(setLanguage, e.target.value)}
                className="w-full p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="jp">日本語</option>
              </select>
            </section>

            {/* Notifications */}
            <section className="lg:col-span-6 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-2xl">notifications_active</span>
                <h3 className="font-display font-bold text-xl text-on-surface">{t('settings.notifications')}</h3>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div>
                    <span className="font-bold text-xs text-on-surface block">{t('settings.emailAlerts')}</span>
                    <span className="text-[11px] text-outline">{t('settings.emailDesc')}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => handleFieldChange(setEmailAlerts, e.target.checked)}
                    className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div>
                    <span className="font-bold text-xs text-on-surface block">{t('settings.browserNotifs')}</span>
                    <span className="text-[11px] text-outline">{t('settings.browserDesc')}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={browserNotifs}
                    onChange={(e) => handleFieldChange(setBrowserNotifs, e.target.checked)}
                    className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer"
                  />
                </div>
              </div>
            </section>

            {/* Privacy & Security */}
            <section className="lg:col-span-6 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-2xl">shield</span>
                <h3 className="font-display font-bold text-xl text-on-surface">{t('settings.privacy')}</h3>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div>
                    <span className="font-bold text-xs text-on-surface block">{t('settings.aiData')}</span>
                    <span className="text-[11px] text-outline">{t('settings.aiDataDesc')}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiDataTraining}
                    onChange={(e) => handleFieldChange(setAiDataTraining, e.target.checked)}
                    className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div>
                    <span className="font-bold text-xs text-on-surface block">{t('settings.twoFactor')}</span>
                    <span className="text-[11px] text-outline">{t('settings.twoFactorDesc')}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-[10px] rounded-full uppercase">
                    {t('settings.enabled')}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Save Bar */}
          {(hasChanges || savedNotice) && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface-bright/95 backdrop-blur-md px-6 py-3 rounded-2xl border border-outline-variant/30 shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-5">
              <span className={`text-xs font-bold ${savedNotice ? 'text-emerald-500' : 'text-on-surface'}`}>
                {savedNotice ? t('settings.saved') : t('settings.unsaved')}
              </span>
              <button
                onClick={handleSaveSettings}
                className={`px-6 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all ${
                  savedNotice 
                    ? 'bg-surface-container-high text-outline cursor-default' 
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                }`}
                disabled={savedNotice}
              >
                {savedNotice ? t('settings.saved').replace('✓ ', '') : t('settings.saveChanges')}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
