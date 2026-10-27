import React, { useState } from 'react';
import { Globe, FileText, Upload, Sparkles, AlertCircle, X, Lock, Plus } from 'lucide-react';
import { InterfaceLanguage, ReadingDocument, SubscriptionStatus } from '../types';
import { SUPPORTED_LANGUAGES, SOURCE_LANGUAGES } from '../constants/languages';
import { getTranslation } from '../i18n/translations';
import { apiService } from '../services/api';

interface ContentImporterProps {
  onClose: () => void;
  onImportComplete: (document: ReadingDocument) => void;
  uiLang: InterfaceLanguage;
  defaultSourceLang: string;
  defaultTargetLang: string;
  subscription: SubscriptionStatus;
  onOpenSubscription: () => void;
}

export const ContentImporter: React.FC<ContentImporterProps> = ({
  onClose,
  onImportComplete,
  uiLang,
  defaultSourceLang,
  defaultTargetLang,
  subscription,
  onOpenSubscription,
}) => {
  const t = getTranslation(uiLang);
  const isFree = subscription.tier === 'free';

  const [activeTab, setActiveTab] = useState<'url' | 'paste' | 'file'>('paste');
  const [sourceLang, setSourceLang] = useState<string>(defaultSourceLang);
  const [targetLang, setTargetLang] = useState<string>(defaultTargetLang);

  // URL state
  const [urlInput, setUrlInput] = useState<string>('');
  // Paste state
  const [titleInput, setTitleInput] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  // File state
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Status
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<string>('');

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFree) {
      onOpenSubscription();
      return;
    }
    if (!urlInput.trim()) return;

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      setProgressStatus('Извлечение очищенного текста статьи...');

      const extracted = await apiService.importUrl(urlInput.trim());

      const newDoc: ReadingDocument = {
        id: `doc-${Date.now()}`,
        title: extracted.title || 'Импортированная статья',
        author: extracted.author || new URL(urlInput).hostname,
        sourceLang,
        targetLang,
        sourceUrl: urlInput,
        category: 'news',
        createdAt: Date.now(),
        lastReadAt: Date.now(),
        readingProgress: 0,
        wordCount: extracted.wordCount,
        passages: extracted.paragraphs.map((p, idx) => ({
          id: `p-${idx + 1}`,
          order: idx + 1,
          sourceText: p,
          targetText: '', // Will be translated on-demand
        })),
      };

      onImportComplete(newDoc);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка извлечения статьи. Попробуйте скопировать текст вручную.');
    } finally {
      setIsProcessing(false);
      setProgressStatus('');
    }
  };

  const [saveToLibrary, setSaveToLibrary] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<'custom' | 'literature' | 'science' | 'dialogue'>('literature');

  /**
   * Intelligently split large texts into readable passages (< 600 chars)
   * while preserving complete sentences for superior side-by-side parallel alignment.
   */
  const splitIntoOptimalPassages = (rawText: string): string[] => {
    let rawParagraphs = rawText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (rawParagraphs.length === 1 && rawText.includes('\n')) {
      rawParagraphs = rawText
        .split(/\n+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    }

    const optimalPassages: string[] = [];
    for (const para of rawParagraphs) {
      if (para.length <= 600) {
        optimalPassages.push(para);
      } else {
        // Split longer paragraphs by sentences
        const sentences = para.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [para];
        let buffer = '';
        for (const s of sentences) {
          const trimmed = s.trim();
          if (!trimmed) continue;
          if (!buffer) {
            buffer = trimmed;
          } else if ((buffer + ' ' + trimmed).length <= 500) {
            buffer += ' ' + trimmed;
          } else {
            optimalPassages.push(buffer);
            buffer = trimmed;
          }
        }
        if (buffer) optimalPassages.push(buffer);
      }
    }
    return optimalPassages;
  };

  const handlePasteSubmit = async (e: React.FormEvent, forceSaveToLib: boolean = saveToLibrary) => {
    if (e) e.preventDefault();
    if (!textInput.trim()) return;

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      setProgressStatus('Подготовка текста...');

      const passages = splitIntoOptimalPassages(textInput);
      if (passages.length === 0) {
        throw new Error('Введённый текст пуст.');
      }

      const wordCount = textInput.trim().split(/\s+/).length;

      // Prepare initial batch (up to ~1000 chars) for immediate real-time translation
      let initialCharCount = 0;
      const initialIndices: number[] = [];
      for (let i = 0; i < passages.length; i++) {
        if (initialCharCount + passages[i].length > 1000 && initialIndices.length > 0) {
          break;
        }
        initialIndices.push(i);
        initialCharCount += passages[i].length;
      }

      const initialTexts = initialIndices.map((i) => passages[i]);
      const initialTranslations: Record<number, string> = {};

      let finalSourceLang = sourceLang;

      // If source and target are different, translate initial batch immediately
      if (sourceLang.toLowerCase() !== targetLang.toLowerCase() && initialTexts.length > 0) {
        setProgressStatus('Перевод выполняется...');
        try {
          const transResult = await apiService.translate({
            sourceLang,
            targetLang,
            paragraphs: initialTexts,
          });

          initialIndices.forEach((origIdx, batchIdx) => {
            initialTranslations[origIdx] = transResult.translatedParagraphs[batchIdx] || '';
          });

          if (transResult.detectedSourceLang) {
            finalSourceLang = transResult.detectedSourceLang.split('-')[0].toLowerCase();
          }

          setProgressStatus('Перевод готов!');
          // Short delay for visual confirmation
          await new Promise((r) => setTimeout(r, 400));
        } catch (transErr: any) {
          console.warn('Initial translation error in importer:', transErr.message);
          // Show error to the user so they know what happened, with option to proceed
          setErrorMessage(
            `Перевод не удался: ${transErr.message}. Вы можете повторить попытку или открыть текст для чтения в оригинале.`
          );
          setIsProcessing(false);
          setProgressStatus('');
          return;
        }
      }

      const newDoc: ReadingDocument = {
        id: `doc-${Date.now()}`,
        title: titleInput.trim() || 'Пользовательский текст',
        sourceLang: finalSourceLang,
        targetLang,
        category: forceSaveToLib ? selectedCategory : 'custom',
        createdAt: Date.now(),
        lastReadAt: Date.now(),
        readingProgress: 0,
        wordCount,
        passages: passages.map((p, idx) => ({
          id: `p-${idx + 1}`,
          order: idx + 1,
          sourceText: p,
          targetText: initialTranslations[idx] || '', // Pre-filled for initial passages, lazy for rest
        })),
      };

      onImportComplete(newDoc);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка обработки текста.');
    } finally {
      setIsProcessing(false);
      setProgressStatus('');
    }
  };

  const handleOpenAnywayWithoutTranslation = () => {
    if (!textInput.trim()) return;
    const passages = splitIntoOptimalPassages(textInput);
    const wordCount = textInput.trim().split(/\s+/).length;
    const newDoc: ReadingDocument = {
      id: `doc-${Date.now()}`,
      title: titleInput.trim() || 'Пользовательский текст',
      sourceLang,
      targetLang,
      category: saveToLibrary ? selectedCategory : 'custom',
      createdAt: Date.now(),
      lastReadAt: Date.now(),
      readingProgress: 0,
      wordCount,
      passages: passages.map((p, idx) => ({
        id: `p-${idx + 1}`,
        order: idx + 1,
        sourceText: p,
        targetText: '',
      })),
    };
    onImportComplete(newDoc);
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfjs = await import('pdfjs-dist');
    // Using a more reliable worker setup for pdfjs-dist
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFree) {
      onOpenSubscription();
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setIsProcessing(true);
    setErrorMessage(null);
    setProgressStatus('Извлечение текста из файла...');

    try {
      let content = '';
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        content = await extractTextFromPdf(file);
      } else {
        const reader = new FileReader();
        content = await new Promise<string>((resolve, reject) => {
          reader.onload = (event) => resolve(event.target?.result as string);
          reader.onerror = () => reject(new Error('Ошибка чтения файла'));
          reader.readAsText(file);
        });
      }

      if (content.trim()) {
        setTextInput(content);
        if (!titleInput) {
          setTitleInput(file.name.replace(/\.[^/.]+$/, ''));
        }
        setActiveTab('paste');
      } else {
        throw new Error('Файл пуст или не удалось извлечь текст.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка обработки файла.');
    } finally {
      setIsProcessing(false);
      setProgressStatus('');
    }
  };

  const currentPasteChars = textInput.trim().length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              {t.importContent}
            </h3>
            <p className="text-xs text-slate-500">
              {isFree
                ? (t.freeLimitNotice || 'Бесплатный тариф: вставка текста до 1000 знаков. URL и файлы доступны в Премиум.')
                : (t.premiumLimitNotice || 'Премиум тариф: безлимитный импорт из любых источников')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Language Selection Row */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div>
            <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {t.sourceLangLabel}
            </label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 cursor-pointer"
            >
              {SOURCE_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name} ({l.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {t.targetLangLabel}
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name} ({l.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-4 flex border-b border-slate-200 text-xs font-medium dark:border-slate-800">
          <button
            onClick={() => {
              if (isFree) {
                onOpenSubscription();
              } else {
                setActiveTab('url');
              }
            }}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 transition-colors cursor-pointer ${
              activeTab === 'url'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>{t.importTabUrl}</span>
            {isFree && <Lock className="h-3 w-3 text-amber-600 ml-1" />}
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 transition-colors cursor-pointer ${
              activeTab === 'paste'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>{t.importTabPaste}</span>
          </button>

          <button
            onClick={() => {
              if (isFree) {
                onOpenSubscription();
              } else {
                setActiveTab('file');
              }
            }}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 transition-colors cursor-pointer ${
              activeTab === 'file'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Upload className="h-4 w-4" />
            <span>{t.importTabFile} (PDF / TXT)</span>
            {isFree && <Lock className="h-3 w-3 text-amber-600 ml-1" />}
          </button>
        </div>

        {/* Tab 1: URL Form (Premium Required Check) */}
        {activeTab === 'url' && (
          isFree ? (
            <div className="mt-4 space-y-4 py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                <Lock className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                {t.urlLockedTitle || 'Импорт статей по ссылке (URL) доступен в Премиум'}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t.urlLockedDesc || 'В бесплатном тарифе можно вставлять свой текст до 1000 знаков. Получите безлимитный импорт любых веб-страниц, книг и документов с тарифом Премиум за $5.99/мес.'}
              </p>
              <button
                onClick={onOpenSubscription}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t.upgradeBtn || 'Перейти на Премиум за $5.99'}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleUrlSubmit} className="mt-4 space-y-4 py-4">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t.urlLabel || 'Ссылка на статью (URL)'}
                </label>
                <input
                  type="url"
                  required
                  autoFocus
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={t.urlInputPlaceholder || 'https://example.com/article...'}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing || !urlInput.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>{isProcessing ? progressStatus : 'Добавить в библиотеку'}</span>
              </button>
              <p className="text-[10px] text-center text-slate-400">
                {t.ssrfNotice || 'Загрузка внешних веб-страниц защищена от внутренних сетевых вызовов (SSRF).'}
              </p>
            </form>
          )
        )}

        {/* Tab 2: Paste Form (Enhanced with large text support & Library options) */}
        {activeTab === 'paste' && (
          <form onSubmit={(e) => handlePasteSubmit(e, saveToLibrary)} className="mt-4 space-y-3.5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t.pasteTitlePlaceholder}
                </label>
                <span className="text-[11px] font-mono font-medium text-slate-400">
                  {currentPasteChars} {t.charsCount || 'знаков'}
                  {currentPasteChars > 0 && ` · ~${textInput.trim().split(/\s+/).length} слов`}
                </span>
              </div>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="Например: Новая глава, роман, научная статья..."
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Текст на языке оригинала (поддерживаются большие тексты и книги)
              </label>
              <textarea
                required
                rows={7}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={t.pasteTextPlaceholder}
                className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-xs font-serif leading-relaxed focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Совет: При запуске из библиотеки приложение переводит текст в реальном времени порциями до 1000 знаков, экономя ресурсы и обеспечивая плавное чтение без задержек.
              </p>
            </div>

            {/* Library Suggestion & Category Selection */}
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={saveToLibrary}
                    onChange={(e) => setSaveToLibrary(e.target.checked)}
                    className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-amber-950 dark:text-amber-200">
                    Сохранить в библиотеку LingoTwice
                  </span>
                </label>

                {saveToLibrary && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Категория:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="rounded-lg border border-amber-300 bg-white px-2 py-1 text-xs font-medium text-slate-800 dark:border-amber-800 dark:bg-slate-900 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="literature">Литература</option>
                      <option value="science">Наука и статьи</option>
                      <option value="dialogue">Диалоги</option>
                      <option value="custom">Пользовательское</option>
                    </select>
                  </div>
                )}
              </div>
              <p className="mt-1.5 text-[11px] text-amber-800/80 dark:text-amber-300/80">
                {saveToLibrary
                  ? 'Текст появится в каталоге библиотеки с обложкой и прогрессом чтения.'
                  : 'Текст будет открыт для разового сеанса чтения без добавления в каталог.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="submit"
                disabled={isProcessing || !textInput.trim()}
                onClick={(e) => handlePasteSubmit(e, true)}
                className="flex flex-1 w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-2.5 px-4 text-xs font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>{isProcessing ? progressStatus : 'Добавить в библиотеку и открыть'}</span>
              </button>

              <button
                type="button"
                disabled={isProcessing || !textInput.trim()}
                onClick={(e) => handlePasteSubmit(e, false)}
                className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white py-2.5 px-4 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Открыть без сохранения
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: File Upload Form (Premium Required Check) */}
        {activeTab === 'file' && (
          isFree ? (
            <div className="mt-4 space-y-4 py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                <Lock className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                {t.fileLockedTitle || 'Загрузка файлов (.pdf, .txt, .md) доступна в Премиум'}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t.fileLockedDesc || 'В бесплатном тарифе можно вставлять текст вручную (до 1000 знаков). Оформите подписку Премиум за $5.99/мес для загрузки файлов без ограничений.'}
              </p>
              <button
                onClick={onOpenSubscription}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t.upgradeBtn || 'Перейти на Премиум за $5.99'}</span>
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-4 py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl dark:border-slate-800">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {isProcessing ? progressStatus : (selectedFileName || 'Выберите файл .pdf, .txt или .md')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {t.fileUploadHint || 'Поддерживаются форматы .pdf, .txt и .md'}
                </p>
              </div>
              <label className={`inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer shadow-sm ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <input
                  type="file"
                  accept=".pdf,.txt,.md"
                  disabled={isProcessing}
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span>{isProcessing ? 'Обработка...' : 'Выбрать файл'}</span>
              </label>
            </div>
          )
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{errorMessage}</span>
              {activeTab === 'paste' && textInput.trim().length > 0 && (
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={(e) => handlePasteSubmit(e, saveToLibrary)}
                    className="rounded-lg bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-rose-700 cursor-pointer shadow-xs"
                  >
                    Повторить попытку
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAnywayWithoutTranslation}
                    className="rounded-lg border border-rose-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-rose-800 hover:bg-rose-100 dark:border-rose-700 dark:bg-slate-900 dark:text-rose-200 cursor-pointer"
                  >
                    Открыть только оригинал (без перевода)
                  </button>
                </div>
              )}
              {isFree && errorMessage.includes('1000 знаков') && (
                <button
                  onClick={onOpenSubscription}
                  className="mt-2 block rounded-lg bg-rose-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-rose-700 cursor-pointer shadow-xs"
                >
                  Разблокировать безлимит за $5.99 / мес
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
