import React, { useState } from 'react';
import { Volume2, RotateCcw, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { InterfaceLanguage, VocabularyEntry } from '../types';
import { getTranslation } from '../i18n/translations';
import { calculateNextReview, ReviewGrade } from '../services/srs';
import { speechService } from '../services/speech';

interface ReviewViewProps {
  dueCards: VocabularyEntry[];
  onCompleteReview: (updatedEntry: VocabularyEntry) => void;
  onFinishSession: () => void;
  uiLang: InterfaceLanguage;
}

export const ReviewView: React.FC<ReviewViewProps> = ({
  dueCards,
  onCompleteReview,
  onFinishSession,
  uiLang,
}) => {
  const t = getTranslation(uiLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionReviewedCount, setSessionReviewedCount] = useState(0);

  const currentCard = dueCards[currentIndex];

  const handleGrade = (grade: ReviewGrade) => {
    if (!currentCard) return;

    const updates = calculateNextReview(currentCard, grade);
    const updatedEntry: VocabularyEntry = {
      ...currentCard,
      ...updates,
    } as VocabularyEntry;

    onCompleteReview(updatedEntry);
    setSessionReviewedCount((prev) => prev + 1);
    setIsFlipped(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const playAudio = () => {
    if (currentCard) {
      speechService.speak(currentCard.word, currentCard.sourceLang);
    }
  };

  // If session is complete or no cards due
  if (!currentCard || currentIndex >= dueCards.length) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h2 className="mt-4 font-serif text-2xl font-bold text-slate-900 dark:text-white">
            {t.reviewComplete}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {sessionReviewedCount > 0
              ? `Вы успешно закрепили ${sessionReviewedCount} ${t.wordsCount} по алгоритму интервального повторения SM-2.`
              : t.noCardsToReview}
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={onFinishSession}
              className="flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700"
            >
              <span>{t.continueReading}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPct = Math.round(((currentIndex + 1) / dueCards.length) * 100);

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      {/* Session Progress Header */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3">
        <span>Карточка {currentIndex + 1} из {dueCards.length}</span>
        <span className="font-mono tabular-nums">{progressPct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800 mb-6">
        <div
          className="h-full rounded-full bg-amber-600 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        ></div>
      </div>

      {/* Main Flashcard Container */}
      <div className="min-h-[340px] rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
        <div>
          {/* Card Top: Level & Audio */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-400">
              Уровень повторения: {currentCard.box || 1} / 5
            </span>
            <button
              onClick={playAudio}
              className="rounded-full bg-amber-50 p-2 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400"
              title="Прослушать"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>

          {/* Front of Card: Word & Context */}
          <div className="py-6 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentCard.word}
            </h2>

            {currentCard.grammar?.phonetic && (
              <p className="mt-1 font-mono text-xs text-slate-400">
                {currentCard.grammar.phonetic}
              </p>
            )}

            {currentCard.contextSentence && (
              <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs font-serif italic text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                «{currentCard.contextSentence}»
              </div>
            )}
          </div>

          {/* Back of Card: Translation & Grammar (when revealed) */}
          {isFlipped && (
            <div className="border-t border-slate-100 pt-4 text-center dark:border-slate-800 space-y-2 animate-in fade-in duration-200">
              <div className="font-serif text-xl font-bold text-amber-700 dark:text-amber-400">
                {currentCard.translation}
              </div>

              {currentCard.grammar && (
                <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-slate-500">
                  {currentCard.grammar.gender && <span>Род: {currentCard.grammar.gender}</span>}
                  {currentCard.grammar.plural && <span>Pl: {currentCard.grammar.plural}</span>}
                  {currentCard.grammar.cefrLevel && (
                    <span className="font-mono font-semibold text-amber-600">
                      {currentCard.grammar.cefrLevel}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-6">
          {!isFlipped ? (
            <button
              onClick={() => setIsFlipped(true)}
              className="w-full rounded-xl bg-slate-900 py-3 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700"
            >
              {t.showAnswer}
            </button>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleGrade('again')}
                className="rounded-xl border border-rose-200 bg-rose-50/70 py-2.5 text-xs font-medium text-rose-800 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
              >
                {t.ratingAgain}
              </button>
              <button
                onClick={() => handleGrade('hard')}
                className="rounded-xl border border-amber-200 bg-amber-50/70 py-2.5 text-xs font-medium text-amber-800 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300"
              >
                {t.ratingHard}
              </button>
              <button
                onClick={() => handleGrade('good')}
                className="rounded-xl border border-sky-200 bg-sky-50/70 py-2.5 text-xs font-medium text-sky-800 hover:bg-sky-100 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300"
              >
                {t.ratingGood}
              </button>
              <button
                onClick={() => handleGrade('easy')}
                className="rounded-xl border border-emerald-200 bg-emerald-50/70 py-2.5 text-xs font-medium text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
              >
                {t.ratingEasy}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
