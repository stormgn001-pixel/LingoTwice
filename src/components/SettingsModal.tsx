import React, { useState } from 'react';
import { X, Download, Trash2, Globe, Shield, FileText } from 'lucide-react';
import { InterfaceLanguage, ReadingPreferences, UserStats, VocabularyEntry, ReadingDocument } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import { getTranslation } from '../i18n/translations';

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
  const [confirmDelete, setConfirmDelete] = useState(false);

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
          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
            {t.settingsTitle}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-5 text-xs">
          {/* UI Language */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-medium text-slate-700 dark:text-slate-300">
                {t.uiLanguage}
              </label>
              <span className="text-[11px] text-slate-400">
                {SUPPORTED_LANGUAGES.length} языков
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 max-h-60 overflow-y-auto p-0.5 reader-scrollbar">
              {SUPPORTED_LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => onUpdatePreferences({ uiLang: item.code as InterfaceLanguage, targetLang: item.code })}
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
                  className={`rounded-lg border py-2 text-center transition-colors ${
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
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-2.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-slate-400" />
                <span>{t.exportData}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">
                {allData.vocabulary.length} слов
              </span>
            </button>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex w-full items-center justify-between rounded-xl border border-rose-200 p-2.5 font-medium text-rose-700 hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-400 dark:hover:bg-rose-950/40"
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
                    className="rounded bg-rose-600 px-3 py-1 font-semibold text-white"
                  >
                    Да, удалить
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="rounded bg-slate-200 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Legal Pages & Privacy */}
          <div className="border-t border-slate-100 pt-3 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:underline hover:text-slate-800 dark:hover:text-slate-200"
            >
              {t.privacyAndTerms}
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('faq')}
              className="hover:underline hover:text-slate-800 dark:hover:text-slate-200"
            >
              {t.dataProcessingFaq}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
