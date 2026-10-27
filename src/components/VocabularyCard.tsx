import React from 'react';
import { Volume2, Bookmark, Check, X, BookOpen, Layers, Sparkles } from 'lucide-react';
import { WordLookupResponse, InterfaceLanguage } from '../types';
import { getTranslation } from '../i18n/translations';
import { speechService } from '../services/speech';

interface VocabularyCardProps {
  lookup: WordLookupResponse | null;
  isLoading: boolean;
  onClose: () => void;
  onSaveWord: (lookup: WordLookupResponse) => void;
  isSaved: boolean;
  uiLang: InterfaceLanguage;
  sourceLang: string;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  lookup,
  isLoading,
  onClose,
  onSaveWord,
  isSaved,
  uiLang,
  sourceLang,
}) => {
  const t = getTranslation(uiLang);

  if (!lookup && !isLoading) return null;

  const handlePlayAudio = () => {
    if (lookup?.word) {
      speechService.speak(lookup.word, sourceLang);
    }
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl transition-all sm:bottom-6 dark:border-slate-800 dark:bg-slate-900">
      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-sm text-slate-600 dark:text-slate-300">
          <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
          <span className="font-medium">Лингвистический анализ ИИ...</span>
        </div>
      ) : lookup ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 -mt-1 mb-2 px-1">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              {t.vocabularyCardTitle || 'AI-АНАЛИЗ КОНТЕКСТА'}
            </span>
          </div>
          {/* Header Row: Word, phonetic, audio, close */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  {lookup.word}
                </h3>
                <button
                  onClick={handlePlayAudio}
                  title={t.listenSource}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-700 transition-colors hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {lookup.phonetic && (
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                  {lookup.phonetic}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onSaveWord(lookup)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSaved
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>{t.savedInVocabulary}</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>{t.addToVocabulary}</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Translation & Contextual meaning */}
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-50 leading-tight">
              {lookup.translation}
            </div>
            {lookup.contextualMeaning && (
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {lookup.contextualMeaning}
              </p>
            )}
          </div>

          {/* Grammar Metadata */}
          {lookup.grammar && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              {lookup.grammar.partOfSpeech && (
                <span>{lookup.grammar.partOfSpeech}</span>
              )}
              {lookup.grammar.gender && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{t.gender}: <strong className="font-medium text-slate-700 dark:text-slate-300">{lookup.grammar.gender}</strong></span>
                </>
              )}
              {lookup.grammar.plural && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Pl: <span className="font-serif italic">{lookup.grammar.plural}</span></span>
                </>
              )}
              {lookup.grammar.verbForms && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-serif italic">{lookup.grammar.verbForms}</span>
                </>
              )}
              {lookup.grammar.cefrLevel && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-semibold text-amber-700 dark:text-amber-400">
                    {lookup.grammar.cefrLevel}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Examples */}
          {lookup.examples && lookup.examples.length > 0 && (
            <div className="rounded-lg bg-slate-50 p-2.5 text-xs dark:bg-slate-800/60">
              <div className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.examplesHeader}:
              </div>
              <div className="space-y-1 text-slate-600 dark:text-slate-400">
                {lookup.examples.map((ex, idx) => (
                  <div key={idx} className="font-serif italic">
                    «{ex.source}» — <span className="not-italic text-slate-500">{ex.target}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
