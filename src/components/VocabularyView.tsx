import React, { useState } from 'react';
import { Search, Volume2, Trash2, ArrowRight, BookOpen, Download, Copy, Check, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { InterfaceLanguage, VocabularyEntry } from '../types';
import { getTranslation } from '../i18n/translations';
import { speechService } from '../services/speech';

interface VocabularyViewProps {
  vocabulary: VocabularyEntry[];
  onDeleteWord: (id: string) => void;
  onStartReview: () => void;
  uiLang: InterfaceLanguage;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  vocabulary,
  onDeleteWord,
  onStartReview,
  uiLang,
}) => {
  const t = getTranslation(uiLang);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBoxFilter, setSelectedBoxFilter] = useState<number | 'all'>('all');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const filteredWords = vocabulary.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBox = selectedBoxFilter === 'all' || item.box === selectedBoxFilter;
    return matchesSearch && matchesBox;
  });

  const dueCount = vocabulary.filter(
    (item) => !item.nextReviewDate || item.nextReviewDate <= Date.now()
  ).length;

  const handlePlay = (word: string, lang: string) => {
    speechService.speak(word, lang);
  };

  const exportToAnkiCSV = () => {
    if (vocabulary.length === 0) return;
    const rows = vocabulary.map((entry) => {
      const front = entry.word.replace(/"/g, '""');
      const back = entry.translation.replace(/"/g, '""');
      const context = (entry.contextSentence || '').replace(/"/g, '""');
      const grammar = [
        entry.grammar?.partOfSpeech ? `[${entry.grammar.partOfSpeech}]` : '',
        entry.grammar?.gender ? `Род: ${entry.grammar.gender}` : '',
        entry.grammar?.cefrLevel ? `Уровень: ${entry.grammar.cefrLevel}` : '',
        entry.grammar?.plural ? `Pl: ${entry.grammar.plural}` : '',
      ].filter(Boolean).join(' ');

      return `"${front}","${back}","${context}","${grammar}"`;
    });

    const csvContent = '\uFEFF' + 'Слово,Перевод,Контекст,Грамматика\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lingotwice-anki-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const copyToQuizlet = async () => {
    if (vocabulary.length === 0) return;
    const text = vocabulary.map((e) => `${e.word}\t${e.translation}${e.contextSentence ? ` (Контекст: ${e.contextSentence})` : ''}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 3000);
      setShowExportMenu(false);
    } catch {}
  };

  const exportToJson = () => {
    if (vocabulary.length === 0) return;
    const jsonStr = JSON.stringify(vocabulary, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lingotwice-vocab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
            {t.navVocabulary}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Личный словарный запас
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Сохранённые слова с грамматическими пояснениями и контекстом
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Export Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={vocabulary.length === 0}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>Экспорт слов</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-56 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-800 dark:bg-slate-900 z-20">
                <button
                  onClick={exportToAnkiCSV}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Экспорт в Anki (.csv)</div>
                    <div className="text-[10px] text-slate-400">С контекстом и грамматикой</div>
                  </div>
                </button>
                <button
                  onClick={copyToQuizlet}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Copy className="h-4 w-4 text-sky-600" />
                  <div>
                    <div className="font-semibold">Копировать для Quizlet</div>
                    <div className="text-[10px] text-slate-400">Вставка текста с табуляцией</div>
                  </div>
                </button>
                <button
                  onClick={exportToJson}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Download className="h-4 w-4 text-amber-600" />
                  <div>
                    <div className="font-semibold">Резервная копия (.json)</div>
                    <div className="text-[10px] text-slate-400">Полный дамп карточек</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {dueCount > 0 && (
            <button
              onClick={onStartReview}
              className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-700 shadow-sm shrink-0 cursor-pointer"
            >
              <span>Повторить слова ({dueCount})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {copiedNotice && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-medium text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>Слова скопированы в буфер обмена! Теперь откройте Quizlet → Создать модуль → Импорт и нажмите Ctrl+V.</span>
        </div>
      )}

      {/* Search & Leitner Box Filter */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по слову или переводу..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs focus:border-amber-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-900"
          />
        </div>

        {/* Leitner Box filter */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setSelectedBoxFilter('all')}
            className={`rounded-lg px-2.5 py-1.5 transition-colors whitespace-nowrap ${
              selectedBoxFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Все ({vocabulary.length})
          </button>
          {[1, 2, 3, 4, 5].map((box) => (
            <button
              key={box}
              onClick={() => setSelectedBoxFilter(box)}
              className={`rounded-lg px-2.5 py-1.5 transition-colors whitespace-nowrap ${
                selectedBoxFilter === box
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Уровень {box}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Table / Card List */}
      <div className="mt-6">
        {filteredWords.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-800">
            <BookOpen className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm font-medium">Слов пока не найдено</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {filteredWords.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-slate-50/70 transition-colors dark:hover:bg-slate-800/40"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-slate-900 dark:text-white">
                      {entry.word}
                    </span>
                    <button
                      onClick={() => handlePlay(entry.word, entry.sourceLang)}
                      title="Прослушать"
                      className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                    {entry.grammar?.cefrLevel && (
                      <span className="font-mono text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                        {entry.grammar.cefrLevel}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {entry.translation}
                  </div>

                  {entry.contextSentence && (
                    <div className="text-[11px] text-slate-400 font-serif italic line-clamp-1">
                      «{entry.contextSentence}»
                    </div>
                  )}

                  {/* Grammar details row */}
                  {entry.grammar && (
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                      {entry.grammar.gender && <span>Род: {entry.grammar.gender}</span>}
                      {entry.grammar.plural && <span>Pl: {entry.grammar.plural}</span>}
                      {entry.grammar.verbForms && <span>{entry.grammar.verbForms}</span>}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  {/* Spaced repetition indicator */}
                  <div className="text-right">
                    <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      Уровень {entry.box || 1} / 5
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Повторено: {entry.repetitionCount || 0} раз
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteWord(entry.id)}
                    title="Удалить слово"
                    className="rounded p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
