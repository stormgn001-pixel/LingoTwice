import React, { useState, useMemo } from 'react';
import { X, Download, Trash2, LogIn, LogOut, Cloud, Sun, Moon, Coffee, Columns2, Rows2, Volume2, Target } from 'lucide-react';
import { InterfaceLanguage, ReadingPreferences, UserStats, VocabularyEntry, ReadingDocument } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import { getTranslation } from '../i18n/translations';
import { useAuthActions } from '../contexts/AuthContext';
import { speechService } from '../services/speech';

interface SettingsModalProps {
  onClose: () => void;
  preferences: ReadingPreferences;
  onUpdatePreferences: (prefs: Partial<ReadingPreferences>) => void;
  stats?: UserStats;
  onUpdateStats?: (partial: Partial<UserStats>) => void;
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
  stats,
  onUpdateStats,
  allData,
  onClearAllData,
  onOpenLegal,
}) => {
  const t = getTranslation(preferences.uiLang);
  const { user, signIn, signOut } = useAuthActions();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const availableVoices = useMemo(() => {
    return speechService.getAvailableVoicesForLocale(preferences.sourceLang || 'en');
  }, [preferences.sourceLang]);

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

          {/* Reading Theme & Split Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-slate-700 dark:text-slate-300">
                {t.readingThemeLabel}
              </label>
              <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                {([
                  { id: 'light', label: t.themeLight, Icon: Sun },
                  { id: 'sepia', label: t.themeSepia, Icon: Coffee },
                  { id: 'dark', label: t.themeDark, Icon: Moon },
                ] as const).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onUpdatePreferences({ theme: id })}
                    className={`flex items-center justify-center gap-1 rounded-lg border py-2 px-1.5 transition-colors cursor-pointer ${
                      preferences.theme === id
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold dark:bg-amber-950/60 dark:text-amber-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate text-[11px]">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium text-slate-700 dark:text-slate-300">
                {t.splitViewLabel}
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => onUpdatePreferences({ splitOrientation: 'horizontal' })}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 px-2 transition-colors cursor-pointer ${
                    preferences.splitOrientation === 'horizontal'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold dark:bg-amber-950/60 dark:text-amber-200'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                  }`}
                >
                  <Columns2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate text-[11px]">{t.splitHorizontal}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onUpdatePreferences({ splitOrientation: 'vertical' })}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 px-2 transition-colors cursor-pointer ${
                    preferences.splitOrientation === 'vertical'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold dark:bg-amber-950/60 dark:text-amber-200'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300'
                  }`}
                >
                  <Rows2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate text-[11px]">{t.splitVertical}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Speech Rate & Voice */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/30 space-y-3">
            <div>
              <label className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <Volume2 className="h-3.5 w-3.5 text-amber-600" />
                <span>{t.speechRateLabel}</span>
              </label>
              <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                {[0.75, 1.0, 1.15, 1.35].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => onUpdatePreferences({ speechRate: rate })}
                    className={`rounded-lg border py-1.5 text-center font-mono text-[11px] transition-colors cursor-pointer ${
                      Math.abs((preferences.speechRate || 1.0) - rate) < 0.05
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold dark:bg-amber-950/60 dark:text-amber-200'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {availableVoices.length > 0 && (
              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  {t.voiceSelectLabel}
                </label>
                <select
                  value={preferences.preferredVoice || ''}
                  onChange={(e) => onUpdatePreferences({ preferredVoice: e.target.value || undefined })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 cursor-pointer"
                >
                  <option value="">{t.defaultVoiceOption}</option>
                  {availableVoices.map((v) => (
                    <option key={`${v.name}-${v.lang}`} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Daily Learning Goals */}
          {stats && onUpdateStats && (
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/30">
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Target className="h-3.5 w-3.5 text-amber-600" />
                <span>{t.dailyGoal}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">{t.dailyGoalMinutesLabel}</label>
                  <input
                    type="number"
                    min={5}
                    max={240}
                    step={5}
                    value={stats.dailyGoalMinutes}
                    onChange={(e) => onUpdateStats({ dailyGoalMinutes: Math.max(5, Math.min(240, Number(e.target.value) || 20)) })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">{t.dailyGoalWordsLabel}</label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    step={1}
                    value={stats.dailyGoalWords}
                    onChange={(e) => onUpdateStats({ dailyGoalWords: Math.max(1, Math.min(200, Number(e.target.value) || 10)) })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

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
