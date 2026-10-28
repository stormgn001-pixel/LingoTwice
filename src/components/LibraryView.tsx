import React, { useState, useMemo } from 'react';
import { BookOpen, Plus, Trash2, ArrowRight, ShieldCheck, Globe, Filter, RotateCcw, ChevronDown, Languages } from 'lucide-react';
import { InterfaceLanguage, ReadingDocument, SubscriptionStatus } from '../types';
import { getTranslation, getDocTitle } from '../i18n/translations';
import { getLanguageByCode } from '../constants/languages';
import { SAMPLE_DOCUMENTS } from '../constants/sampleLibrary';

interface LibraryViewProps {
  documents: ReadingDocument[];
  onSelectDocument: (doc: ReadingDocument) => void;
  onOpenImporter: () => void;
  onDeleteDocument: (docId: string) => void;
  uiLang: InterfaceLanguage;
  subscription: SubscriptionStatus;
  onOpenSettings: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  documents,
  onSelectDocument,
  onOpenImporter,
  onDeleteDocument,
  uiLang,
  subscription,
  onOpenSettings,
}) => {
  const t = getTranslation(uiLang);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Simplified filtering logic: only by category
  const filteredDocs = useMemo(() => {
    return documents.filter((d) => {
      return filterCategory === 'all' || d.category === filterCategory;
    });
  }, [documents, filterCategory]);

  // Helper to count documents matching a category
  const getCategoryCount = (cat: string) => {
    return documents.filter((d) => {
      return cat === 'all' || d.category === cat;
    }).length;
  };

  const handleResetFilters = () => {
    setFilterCategory('all');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
            {t.libraryTitle}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.libraryCatalogTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-500 max-w-xl">
            {t.librarySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            title={t.navSettings}
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white cursor-pointer"
          >
            <Languages className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={onOpenImporter}
            className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-amber-600 px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700 shadow-sm shrink-0 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{t.addNewText}</span>
          </button>
        </div>
      </div>

      {/* Filter Control Section */}
      <div className="mt-5 space-y-3 bg-slate-50/80 dark:bg-slate-900/60 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
        {/* Top Row: Categories & Language Toggle Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium">
            <span className="text-slate-400 dark:text-slate-500 mr-1 hidden sm:inline-flex items-center gap-1 font-semibold">
              <Filter className="h-3.5 w-3.5" />
              <span>Категория:</span>
            </span>

            <button
              onClick={() => setFilterCategory('all')}
              className={`rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {t.all} ({getCategoryCount('all')})
            </button>
            <button
              onClick={() => setFilterCategory('literature')}
              className={`rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all cursor-pointer ${
                filterCategory === 'literature'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {t.sampleCategoryLiterature} ({getCategoryCount('literature')})
            </button>
            <button
              onClick={() => setFilterCategory('science')}
              className={`rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all cursor-pointer ${
                filterCategory === 'science'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {t.sampleCategoryScience} ({getCategoryCount('science')})
            </button>
            <button
              onClick={() => setFilterCategory('dialogue')}
              className={`rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all cursor-pointer ${
                filterCategory === 'dialogue'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {t.sampleCategoryDialogue} ({getCategoryCount('dialogue')})
            </button>
            <button
              onClick={() => setFilterCategory('custom')}
              className={`rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all cursor-pointer ${
                filterCategory === 'custom'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {t.sampleCategoryCustom} ({getCategoryCount('custom')})
            </button>

            {/* Active filter clear button */}
            {filterCategory !== 'all' && (
              <button
                onClick={handleResetFilters}
                className="ml-auto flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-2"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{t.resetFilters || 'Сбросить'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Books */}
      {filteredDocs.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => {
            const isBuiltIn = Boolean(doc.isSample || SAMPLE_DOCUMENTS.some((s) => s.id === doc.id));
            const docTitle = getDocTitle(doc, uiLang);
            const sLang = getLanguageByCode(doc.sourceLang);
            // Built-in articles adapt to UI language; user custom texts retain their own fixed target language
            const tLang = isBuiltIn ? getLanguageByCode(uiLang) : getLanguageByCode(doc.targetLang);

            const categoryBadge =
              doc.category === 'literature'
                ? { text: t.sampleCategoryLiterature, style: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/50' }
                : doc.category === 'science'
                ? { text: t.sampleCategoryScience, style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50' }
                : doc.category === 'dialogue'
                ? { text: t.sampleCategoryDialogue, style: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50' }
                : { text: t.sampleCategoryCustom, style: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };

            return (
              <div
                key={doc.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all hover:border-amber-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  {/* Book Cover Image slot */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {(() => {
                      const displayImage = doc.coverImage || (
                        doc.category === 'literature' ? '/assets/images/book_cover_literature_1792926490325.jpg' :
                        doc.category === 'science' ? '/assets/images/book_cover_quantum_1792929019401.jpg' :
                        doc.category === 'dialogue' ? '/assets/images/book_cover_dialogues_1792926491648.jpg' :
                        doc.category === 'philosophy' ? '/assets/images/book_cover_kafka_1792929018156.jpg' :
                        doc.category === 'news' ? '/assets/images/book_cover_paris_bookstore_1792929019575.jpg' :
                        '/assets/images/book_cover_technology_1792926491315.jpg'
                      );

                      return (
                        <img
                          src={displayImage}
                          alt={docTitle}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
                          onError={(e) => {
                            // Fallback if the specific asset fails to load
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800';
                          }}
                        />
                      );
                    })()}

                    {/* Category pill on top right - hidden for 'method' category to keep image clean */}
                    {doc.category !== 'method' && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium backdrop-blur-xs ${categoryBadge.style}`}>
                          {categoryBadge.text}
                        </span>
                      </div>
                    )}

                    {/* Clean language pair indicators (Left: original text language, Right: current interface language) */}
                    <div className="absolute bottom-2.5 left-2.5 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-slate-800 backdrop-blur-xs dark:bg-slate-900/90 dark:text-white shadow-xs">
                      <span>{sLang.flag} {sLang.code.toUpperCase()}</span>
                      <span className="mx-1 text-slate-400">⇄</span>
                      <span>{tLang.flag} {tLang.code.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Content details */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-base font-bold text-slate-900 line-clamp-2 dark:text-white">
                        {docTitle}
                      </h3>

                      {!doc.isSample && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteDocument(doc.id);
                          }}
                          title={t.deleteDoc}
                          className="rounded p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {doc.author && (
                      <p className="mt-1 text-xs text-slate-500 font-serif italic">
                        {doc.author}
                      </p>
                    )}

                    {/* Metadata line */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono tabular-nums">{doc.wordCount} {t.wordsCount}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{doc.passages.length} {t.passagesCount}</span>
                    </div>

                    {/* Reading progress bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-1">
                        <span>{t.readProgress}</span>
                        <span className="font-mono tabular-nums">{doc.readingProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-amber-600 transition-all duration-300 dark:bg-amber-500"
                          style={{ width: `${doc.readingProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="border-t border-slate-100 p-4 dark:border-slate-800/80">
                  <button
                    onClick={() => onSelectDocument(doc)}
                    className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-amber-600 hover:text-white dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-amber-600 dark:hover:text-white cursor-pointer"
                  >
                    <span>{t.continueReading}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State when filters yield no results */
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-slate-50/50 dark:bg-slate-900/30">
          <Globe className="mx-auto h-12 w-12 text-slate-400/60" />
          <h3 className="mt-4 font-serif text-lg font-bold text-slate-800 dark:text-slate-200">
            {t.noMatchingDocs || 'Нет изданий по выбранным фильтрам'}
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Попробуйте изменить категорию или выбрать другой язык оригинала.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.resetFilters || 'Сбросить фильтры'}</span>
          </button>
        </div>
      )}

      {/* Google AdSense Readiness Slot (Clean, non-intrusive, Ad-Free for PRO) */}
      {subscription.tier === 'free' && (
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Информационный блок партнёров LingoTwice (AdSense Ready)</span>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Бесплатная версия поддерживается ненавязчивыми спонсорскими публикациями. В тарифе Премиум чтение полностью свободно от рекламы.
          </p>
        </div>
      )}
    </div>
  );
};
