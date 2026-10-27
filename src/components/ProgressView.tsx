import React from 'react';
import { Flame, Clock, BookOpen, Brain, TrendingUp, Calendar, Award } from 'lucide-react';
import { InterfaceLanguage, UserStats, VocabularyEntry, ReadingDocument } from '../types';
import { getTranslation } from '../i18n/translations';

interface ProgressViewProps {
  stats: UserStats;
  vocabulary: VocabularyEntry[];
  documents: ReadingDocument[];
  uiLang: InterfaceLanguage;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  stats,
  vocabulary,
  documents,
  uiLang,
}) => {
  const t = getTranslation(uiLang);

  // Group vocabulary by Leitner box
  const boxCounts = [1, 2, 3, 4, 5].map((boxNum) => {
    return vocabulary.filter((v) => (v.box || 1) === boxNum).length;
  });

  // Calculate overall reading progress across library
  const totalLibraryPassages = documents.reduce((acc, doc) => acc + doc.passages.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
          {t.progressTitle}
        </span>
        <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Учебная статистика и динамика
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {t.progressSubtitle}
        </p>
      </div>

      {/* KPI 4-Card Strip */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.statStreak}</span>
            <div className="rounded-lg bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-slate-900 tabular-nums dark:text-white">
            {stats.streakDays}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Дней непрерывного чтения</p>
        </div>

        {/* Minutes Read */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.statMinutes}</span>
            <div className="rounded-lg bg-sky-50 p-2 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-slate-900 tabular-nums dark:text-white">
            {stats.totalReadingMinutes}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Сегодня: {stats.todayReadingMinutes} мин</p>
        </div>

        {/* Words Learned */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.statWords}</span>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Brain className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-slate-900 tabular-nums dark:text-white">
            {vocabulary.length}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">В активном словаре</p>
        </div>

        {/* Passages Read */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.statPassages}</span>
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-slate-900 tabular-nums dark:text-white">
            {stats.totalPassagesRead}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Синхронных фрагментов</p>
        </div>
      </div>

      {/* Spaced Repetition Leitner Hierarchy */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
          Уровни долговременной памяти (Leitner Boxes)
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Распределение сохранённых слов по стадиям интервального запоминания SM-2
        </p>

        <div className="mt-6 grid grid-cols-5 gap-3 text-center">
          {boxCounts.map((count, idx) => {
            const boxLevel = idx + 1;
            const labels = ['Новые', 'Изучение', 'Закрепление', 'Уверенно', 'Освоено'];
            return (
              <div
                key={boxLevel}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="text-[11px] font-medium text-slate-500">{labels[idx]}</div>
                <div className="mt-1 font-mono text-xl font-bold text-slate-900 tabular-nums dark:text-white">
                  {count}
                </div>
                <div className="mt-1 text-[10px] text-slate-400">Уровень {boxLevel}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reading History */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
          {t.recentSessions}
        </h3>
        <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
          {documents.map((doc) => (
            <div key={doc.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">{doc.title}</p>
                <p className="text-[11px] text-slate-400">
                  {new Date(doc.lastReadAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono font-semibold text-amber-700 dark:text-amber-400">
                  {doc.readingProgress}%
                </span>
                <span className="text-slate-400 ml-1">завершено</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
