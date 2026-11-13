import React, { useState } from 'react';
import { X, Download, Trash2, Globe, Check, LogIn, LogOut, Cloud } from 'lucide-react';
import { InterfaceLanguage, ReadingPreferences, UserStats, VocabularyEntry, ReadingDocument } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import { getTranslation } from '../i18n/translations';
import { useAuthActions } from '../contexts/AuthContext';

interface SettingsModalProps {
  onClose: () => void;
  preferences: ReadingPreferences;
  onUpdatePreferences: (prefs: Partial<ReadingPreferences>) => void;
  allData: {
    documents: ReadingDocument[];
    vocabulary: VocabularyEntry[];
    stats: UserStats;
  };
  onClearAllData: () => void;
  onOpenLegal: (page: 'privacy' | 'terms' | 'faq') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  preferences,
  onUpdatePreferences,
  allData,
  onClearAllData,
  onOpenLegal,
}) => {
  const t = getTranslation(preferences.uiLang);
  const { user, signIn, signOut } = useAuthActions();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [adsenseSaved, setAdsenseSaved] = useState(false);
  const [adsensePubId, setAdsensePubId] = useState(() => {
    return localStorage.getItem('lingotwice_adsense_pub_id') || '';
  });

  const handleSaveAdsense = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('lingotwice_adsense_pub_id', adsensePubId.trim());
    setAdsenseSaved(true);
    setTimeout(() => setAdsenseSaved(false), 3000);
  };

  const handleExportData = () => {
    const jsonStr = JSON.stringify(allData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lingotwice-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto reader-scrollbar">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/file_000000004eec82468ea111a6735b2471_8524203a.png"
              alt="LingoTwice"
              className="h-6 w-6 object-contain drop-shadow-xs"
            />
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              {t.settingsTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label={t.closeBtn}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-5 text-xs">
          {/* Cloud Account & Sync */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <Cloud className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="truncate">
                    {user ? `${t.signedInAs} ${user.email || user.displayName}` : t.cloudSyncActive}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                  {user ? t.cloudSyncDesc : t.cloudSyncGuestDesc}
                </p>
              </div>
              {user ? (
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 shrink-0 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>{t.signOut}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => signIn()}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 font-semibold text-white hover:bg-amber-700 shrink-0 cursor-pointer"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>{t.signInGoogle}</span>
                </button>
              )}
            </div>
          </div>

          {/* UI Language */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-medium text-slate-700 dark:text-slate-300">
                {t.uiLanguage}
              </label>
              <span className="text-[11px] text-slate-400">
                {SUPPORTED_LANGUAGES.length} {t.languagesCountLabel}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 max-h-60 overflow-y-auto p-0.5 reader-scrollbar">
              {SUPPORTED_LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    const newUiLang = item.code as InterfaceLanguage;
                    const newTargetLang = newUiLang === 'ru'
                      ? (preferences.targetLang && preferences.targetLang !== 'ru' ? preferences.targetLang : 'en')
                      : 'ru';
                    onUpdatePreferences({ uiLang: newUiLang, targetLang: newTargetLang });
                  }}
                  className={`rounded-lg border py-1.5 px-2 text-center font-medium transition-colors flex items-center justify-center gap-1.5 text-[11px] cursor-pointer ${
                    preferences.uiLang === item.code
                      ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold dark:bg-amber-950/60 dark:text-amber-200 ring-1 ring-amber-500/50'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                  title={`${item.name} (${item.nativeName})`}
                >
                  <span className="text-sm leading-none">{item.flag}</span>
                  <span className="truncate">{item.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Line Spacing */}
          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">
              {t.lineHeight}
            </label>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {(['normal', 'relaxed', 'loose'] as const).map((lh) => (
                <button
                  key={lh}
                  onClick={() => onUpdatePreferences({ lineHeight: lh })}
                  className={`rounded-lg border py-2 text-center transition-colors cursor-pointer ${
                    preferences.lineHeight === lh
                      ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold dark:bg-amber-950/60 dark:text-amber-200'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                  }`}
                >
                  {lh === 'normal' && t.lineHeightNormal}
                  {lh === 'relaxed' && t.lineHeightRelaxed}
                  {lh === 'loose' && t.lineHeightLoose}
                </button>
              ))}
            </div>
          </div>

          {/* Data Export & Reset */}
          <div className="border-t border-slate-100 pt-4 dark:border-slate-800 space-y-2">
            <button
              onClick={handleExportData}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-2.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-slate-400" />
                <span>{t.exportData}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">
                {allData.vocabulary.length} {t.wordsCount}
              </span>
            </button>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex w-full items-center justify-between rounded-xl border border-rose-200 p-2.5 font-medium text-rose-700 hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-400 dark:hover:bg-rose-950/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>{t.clearAllData}</span>
                </div>
              </button>
            ) : (
              <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200">
                <p>{t.confirmClearData}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      onClearAllData();
                      setConfirmDelete(false);
                      onClose();
                    }}
                    className="rounded bg-rose-600 px-3 py-1 font-semibold text-white cursor-pointer"
                  >
                    {t.confirmDeleteYes}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="rounded bg-slate-200 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Google AdSense Integration */}
          <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
            <form onSubmit={handleSaveAdsense} className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5 dark:border-amber-900/60 dark:bg-amber-950/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
                <Globe className="h-4 w-4 text-amber-600" />
                <span>{t.adsenseTitle}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {t.adsenseDesc}
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={adsensePubId}
                  onChange={(e) => setAdsensePubId(e.target.value)}
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 cursor-pointer"
                >
                  {t.saveBtn}
                </button>
              </div>
              {adsenseSaved && (
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                  <Check className="h-3.5 w-3.5" />
                  <span>{t.adsenseSaved}</span>
                </div>
              )}
            </form>
          </div>

          {/* Legal Pages & Privacy */}
          <div className="border-t border-slate-100 pt-3 dark:border-slate-800 flex flex-col gap-2 text-[11px] text-slate-500">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onOpenLegal('privacy')}
                className="hover:underline hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                {t.privacyAndTerms}
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal('faq')}
                className="hover:underline hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                {t.dataProcessingFaq}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-slate-50 dark:border-slate-800/60 text-[10px] text-slate-400">
              <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-amber-700 dark:hover:text-amber-400">Privacy Policy</a>
              <span>·</span>
              <a href="/terms.html" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-amber-700 dark:hover:text-amber-400">Terms</a>
              <span>·</span>
              <a href="/about.html" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-amber-700 dark:hover:text-amber-400">About Us</a>
              <span>·</span>
              <a href="/contact.html" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-amber-700 dark:hover:text-amber-400">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
