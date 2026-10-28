import React, { useState, useMemo } from 'react';
import {
  Globe,
  FileText,
  Upload,
  Sparkles,
  AlertCircle,
  X,
  Lock,
  Plus,
  ArrowLeftRight,
  Check,
  Eye,
  EyeOff,
  BookOpen,
  Image as ImageIcon,
  Trash2,
  Link as LinkIcon,
} from 'lucide-react';
import { InterfaceLanguage, ReadingDocument, SubscriptionStatus } from '../types';
import { SUPPORTED_LANGUAGES, SOURCE_LANGUAGES, getLanguageByCode } from '../constants/languages';
import { getTranslation } from '../i18n/translations';
import { apiService } from '../services/api';

const PRESET_COVERS = [
  {
    id: 'literature',
    label: 'Классика',
    url: '/assets/images/book_cover_literature_1792926490325.jpg',
  },
  {
    id: 'reading',
    label: 'Чтение',
    url: '/assets/images/reading_desk_atmosphere_1793214356959.jpg',
  },
  {
    id: 'science',
    label: 'Наука & Технологии',
    url: '/assets/images/future_humanity_tech_1793205103986.jpg',
  },
  {
    id: 'dialogue',
    label: 'Диалоги',
    url: '/assets/images/book_cover_dialogues_1792926491648.jpg',
  },
  {
    id: 'kafka',
    label: 'Философия',
    url: '/assets/images/book_cover_kafka_1792929018156.jpg',
  },
  {
    id: 'app',
    label: 'LingoTwice',
    url: '/assets/aistudio/file_000000003e588211bf60528640d33add_c3fdfa78.png',
  },
];

// Resize local user uploaded images via canvas to keep localStorage quota lightweight
const processCoverImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Пожалуйста, выберите файл изображения (PNG, JPG, WebP)'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 900;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Не удалось обработать изображение'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsDataURL(file);
  });
};

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

  const [activeTab, setActiveTab] = useState<'bilingual' | 'url' | 'file'>('bilingual');
  const [sourceLang, setSourceLang] = useState<string>(
    defaultSourceLang === 'auto' ? 'en' : defaultSourceLang
  );
  const [targetLang, setTargetLang] = useState<string>(
    defaultTargetLang === sourceLang ? (sourceLang === 'ru' ? 'en' : 'ru') : defaultTargetLang
  );

  // Document metadata
  const [titleInput, setTitleInput] = useState<string>('');
  const [authorInput, setAuthorInput] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<
    'custom' | 'literature' | 'science' | 'dialogue'
  >('literature');
  const [saveToLibrary, setSaveToLibrary] = useState<boolean>(true);

  // Cover image state
  const [customCoverImage, setCustomCoverImage] = useState<string | null>(null);
  const [isUrlCoverOpen, setIsUrlCoverOpen] = useState<boolean>(false);
  const [coverUrlInput, setCoverUrlInput] = useState<string>('');

  // Dual text inputs (Original + Translation)
  const [sourceTextInput, setSourceTextInput] = useState<string>('');
  const [targetTextInput, setTargetTextInput] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // URL state
  const [urlInput, setUrlInput] = useState<string>('');

  // File state
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Status
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<string>('');

  // Split text into paragraphs
  const splitTextIntoParagraphs = (rawText: string): string[] => {
    if (!rawText.trim()) return [];

    let paragraphs = rawText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    // If no double newlines, try single newlines
    if (paragraphs.length <= 1 && rawText.includes('\n')) {
      paragraphs = rawText
        .split(/\n+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    }

    return paragraphs;
  };

  const sourceParagraphs = useMemo(
    () => splitTextIntoParagraphs(sourceTextInput),
    [sourceTextInput]
  );
  const targetParagraphs = useMemo(
    () => splitTextIntoParagraphs(targetTextInput),
    [targetTextInput]
  );

  const sourceWords = useMemo(
    () => (sourceTextInput.trim() ? sourceTextInput.trim().split(/\s+/).length : 0),
    [sourceTextInput]
  );
  const targetWords = useMemo(
    () => (targetTextInput.trim() ? targetTextInput.trim().split(/\s+/).length : 0),
    [targetTextInput]
  );

  // Swap languages and their texts
  const handleSwap = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);

    const tempText = sourceTextInput;
    setSourceTextInput(targetTextInput);
    setTargetTextInput(tempText);
  };

  // Upload local image for cover
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setProgressStatus('Обработка обложки...');
      const processed = await processCoverImageFile(file);
      setCustomCoverImage(processed);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка загрузки обложки.');
    } finally {
      setIsProcessing(false);
      setProgressStatus('');
      e.target.value = '';
    }
  };

  // Apply image from external URL
  const handleApplyCoverUrl = () => {
    if (!coverUrlInput.trim()) return;
    setCustomCoverImage(coverUrlInput.trim());
    setIsUrlCoverOpen(false);
  };

  // Align paragraphs side by side
  const alignedPairs = useMemo(() => {
    const maxLen = Math.max(sourceParagraphs.length, targetParagraphs.length);
    const pairs: Array<{ source: string; target: string; index: number }> = [];
    for (let i = 0; i < maxLen; i++) {
      pairs.push({
        source: sourceParagraphs[i] || '',
        target: targetParagraphs[i] || '',
        index: i + 1,
      });
    }
    return pairs;
  }, [sourceParagraphs, targetParagraphs]);

  // Submit bilingual text
  const handleBilingualSubmit = async (e?: React.FormEvent, forceSave: boolean = saveToLibrary) => {
    if (e) e.preventDefault();
    if (!sourceTextInput.trim()) {
      setErrorMessage('Пожалуйста, введите текст оригинала.');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      setProgressStatus('Формирование параллельного текста...');

      const sParas = sourceParagraphs;
      const tParas = targetParagraphs;
      const maxLen = Math.max(sParas.length, tParas.length);

      if (maxLen === 0) {
        throw new Error('Текст не содержит абзацев.');
      }

      // If user provided original but no translation, and wants auto-translate
      let translatedArray: string[] = [...tParas];
      if (tParas.length === 0 && sourceLang.toLowerCase() !== targetLang.toLowerCase()) {
        setProgressStatus('Автоматический перевод первых фрагментов...');
        try {
          const initialBatch = sParas.slice(0, 5);
          const transResult = await apiService.translate({
            sourceLang,
            targetLang,
            paragraphs: initialBatch,
          });
          translatedArray = transResult.translatedParagraphs || [];
        } catch (transErr: any) {
          console.warn('Initial translation warning:', transErr.message);
        }
      }

      const totalLen = Math.max(sParas.length, translatedArray.length);
      const passages = [];
      for (let i = 0; i < totalLen; i++) {
        passages.push({
          id: `p-${i + 1}`,
          order: i + 1,
          sourceText: sParas[i] || '',
          targetText: translatedArray[i] || '',
        });
      }

      const generatedTitle =
        titleInput.trim() ||
        (sParas[0]
          ? sParas[0].slice(0, 45).replace(/[.,;:!?]+$/, '') + '...'
          : 'Пользовательский текст');

      const defaultCategoryCover =
        selectedCategory === 'literature'
          ? '/assets/images/book_cover_literature_1792926490325.jpg'
          : selectedCategory === 'science'
          ? '/assets/images/future_humanity_tech_1793205103986.jpg'
          : selectedCategory === 'dialogue'
          ? '/assets/images/book_cover_dialogues_1792926491648.jpg'
          : '/assets/images/reading_desk_atmosphere_1793214356959.jpg';

      const coverImage = customCoverImage?.trim() || defaultCategoryCover;

      const newDoc: ReadingDocument = {
        id: `doc-${Date.now()}`,
        title: generatedTitle,
        author: authorInput.trim() || undefined,
        sourceLang,
        targetLang,
        category: forceSave ? selectedCategory : 'custom',
        createdAt: Date.now(),
        lastReadAt: Date.now(),
        readingProgress: 0,
        wordCount: sourceWords || targetWords || 100,
        coverImage,
        passages,
        isSample: false,
      };

      onImportComplete(newDoc);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка обработки текста.');
    } finally {
      setIsProcessing(false);
      setProgressStatus('');
    }
  };

  // Submit URL import (extract article)
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
          targetText: '',
        })),
        isSample: false,
      };

      onImportComplete(newDoc);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка извлечения статьи. Попробуйте скопировать текст вручную.');
    } finally {
      setIsProcessing(false);
      setProgressStatus('');
    }
  };

  // File upload logic
  const extractTextFromPdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'source' | 'target') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setIsProcessing(true);
    setErrorMessage(null);
    setProgressStatus(`Чтение файла (${file.name})...`);

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
        if (targetField === 'source') {
          setSourceTextInput(content);
          if (!titleInput) {
            setTitleInput(file.name.replace(/\.[^/.]+$/, ''));
          }
        } else {
          setTargetTextInput(content);
        }
        setActiveTab('bilingual');
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

  const sourceMeta = getLanguageByCode(sourceLang);
  const targetMeta = getLanguageByCode(targetLang);

  const paragraphsDiff = Math.abs(sourceParagraphs.length - targetParagraphs.length);
  const hasBothTexts = sourceParagraphs.length > 0 && targetParagraphs.length > 0;
  const isPerfectMatch = hasBothTexts && sourceParagraphs.length === targetParagraphs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-5 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-4xl my-auto rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 dark:border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <BookOpen className="h-4 w-4" />
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                Добавление своего параллельного текста
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Добавьте текст оригинала и текст перевода на выбранных языках для комфортного чтения абзац к абзацу
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto py-3 reader-scrollbar space-y-4">
          {/* Languages Selector Bar */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Source Language Picker */}
              <div className="flex-1">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  <span>{t.sourceLangLabel || 'Язык оригинала'}:</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {sourceMeta.flag} {sourceMeta.name}
                  </span>
                </label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name} ({l.nativeName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex sm:flex-col justify-center items-center pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={handleSwap}
                  title="Поменять языки и тексты местами"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-amber-950/60 dark:hover:text-amber-300 transition-colors cursor-pointer shadow-xs"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </button>
              </div>

              {/* Target Language Picker */}
              <div className="flex-1">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  <span>{t.targetLangLabel || 'Язык перевода'}:</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {targetMeta.flag} {targetMeta.name}
                  </span>
                </label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name} ({l.nativeName})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-slate-200 text-xs font-medium dark:border-slate-800">
            <button
              onClick={() => setActiveTab('bilingual')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 transition-colors cursor-pointer ${
                activeTab === 'bilingual'
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Оригинал и Перевод (Текст)</span>
            </button>

            <button
              onClick={() => {
                if (isFree) {
                  onOpenSubscription();
                } else {
                  setActiveTab('file');
                }
              }}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 transition-colors cursor-pointer ${
                activeTab === 'file'
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>Загрузить файлы</span>
              {isFree && <Lock className="h-3 w-3 text-amber-600 ml-0.5" />}
            </button>

            <button
              onClick={() => {
                if (isFree) {
                  onOpenSubscription();
                } else {
                  setActiveTab('url');
                }
              }}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 transition-colors cursor-pointer ${
                activeTab === 'url'
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>Из статьи по URL</span>
              {isFree && <Lock className="h-3 w-3 text-amber-600 ml-0.5" />}
            </button>
          </div>

          {/* Metadata Row: Title, Author, Cover Image */}
          {activeTab === 'bilingual' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Название издания / книги / статьи
                  </label>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="Например: Маленький принц, Глава 1 или Статья о науке"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Автор (необязательно)
                  </label>
                  <input
                    type="text"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    placeholder="Имя автора"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              {/* Cover Image Selection Block */}
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Изображение / обложка текста
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      (для библиотеки и карточки материала)
                    </span>
                  </div>

                  {customCoverImage && (
                    <button
                      type="button"
                      onClick={() => setCustomCoverImage(null)}
                      className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 dark:text-rose-400 cursor-pointer font-medium"
                      title="Удалить выбранную обложку"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Сбросить обложку</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {/* Current Cover Preview Card */}
                  <div className="relative w-full sm:w-36 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-200/60 dark:border-slate-700 dark:bg-slate-900 shrink-0 shadow-xs group">
                    <img
                      src={
                        customCoverImage ||
                        (selectedCategory === 'literature'
                          ? '/assets/images/book_cover_literature_1792926490325.jpg'
                          : selectedCategory === 'science'
                          ? '/assets/images/future_humanity_tech_1793205103986.jpg'
                          : selectedCategory === 'dialogue'
                          ? '/assets/images/book_cover_dialogues_1792926491648.jpg'
                          : '/assets/images/reading_desk_atmosphere_1793214356959.jpg')
                      }
                      alt="Превью обложки"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1.5">
                      <span className="text-[10px] text-white font-medium truncate">
                        {customCoverImage ? 'Своя обложка' : 'По умолчанию'}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Presets */}
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Upload local image file button */}
                      <label className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 dark:border-amber-800/80 hover:bg-amber-500/20 transition-colors cursor-pointer shadow-xs">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Загрузить изображение</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          onChange={handleCoverUpload}
                          className="hidden"
                        />
                      </label>

                      {/* URL button */}
                      <button
                        type="button"
                        onClick={() => setIsUrlCoverOpen(!isUrlCoverOpen)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                        <span>Указать URL ссылку</span>
                      </button>
                    </div>

                    {/* URL Input subrow */}
                    {isUrlCoverOpen && (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="url"
                          placeholder="https://example.com/cover.jpg"
                          value={coverUrlInput}
                          onChange={(e) => setCoverUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleApplyCoverUrl();
                            }
                          }}
                          className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoverUrl}
                          className="rounded-lg bg-amber-600 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-700 cursor-pointer"
                        >
                          Применить
                        </button>
                      </div>
                    )}

                    {/* Preset Badges / Mini thumbs */}
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                        Или выберите готовую обложку:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {PRESET_COVERS.map((preset) => {
                          const isSelected = customCoverImage === preset.url;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => setCustomCoverImage(preset.url)}
                              className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium border transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-amber-500 bg-amber-50 text-amber-800 ring-1 ring-amber-500 dark:bg-amber-950/60 dark:text-amber-200'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                              }`}
                            >
                              <img
                                src={preset.url}
                                alt={preset.label}
                                className="h-4 w-4 rounded-xs object-cover"
                              />
                              <span>{preset.label}</span>
                              {isSelected && <Check className="h-3 w-3 text-amber-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: Bilingual Text Inputs */}
          {activeTab === 'bilingual' && (
            <div className="space-y-3">
              {/* Dual Textareas: Side by side on Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* 1. Original Text */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between pb-1">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span>{sourceMeta.flag}</span>
                      <span>Текст оригинала ({sourceMeta.name})</span>
                      <span className="text-amber-600">*</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {sourceParagraphs.length} абз. · {sourceWords} слов
                    </span>
                  </div>

                  <textarea
                    rows={9}
                    required
                    value={sourceTextInput}
                    onChange={(e) => setSourceTextInput(e.target.value)}
                    placeholder={`Вставьте текст оригинала на языке ${sourceMeta.name}.\n\nСовет: Разделяйте абзацы пустой строкой, чтобы они точно сопоставились с переводом.`}
                    className="w-full flex-1 rounded-xl border border-slate-300 p-3 text-xs font-serif leading-relaxed focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white reader-scrollbar"
                  />
                </div>

                {/* 2. Translation Text */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between pb-1">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span>{targetMeta.flag}</span>
                      <span>Текст перевода ({targetMeta.name})</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {targetParagraphs.length} абз. · {targetWords} слов
                    </span>
                  </div>

                  <textarea
                    rows={9}
                    value={targetTextInput}
                    onChange={(e) => setTargetTextInput(e.target.value)}
                    placeholder={`Вставьте соответствующий перевод на языке ${targetMeta.name}.\n\nКаждый абзац будет привязан к абзацу оригинала. Если перевода нет, система сможет перевести текст автоматически.`}
                    className="w-full flex-1 rounded-xl border border-slate-300 p-3 text-xs font-serif leading-relaxed focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white reader-scrollbar"
                  />
                </div>
              </div>

              {/* Alignment Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-slate-50 px-3.5 py-2.5 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  {hasBothTexts ? (
                    isPerfectMatch ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                        <Check className="h-3.5 w-3.5" />
                        <span>Идеальное выравнивание: {sourceParagraphs.length} абзацев (1:1)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-medium text-amber-700 dark:text-amber-400">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>
                          Оригинал: {sourceParagraphs.length} абз., Перевод: {targetParagraphs.length} абз. (Разница: {paragraphsDiff})
                        </span>
                      </span>
                    )
                  ) : sourceParagraphs.length > 0 ? (
                    <span className="text-slate-500 dark:text-slate-400">
                      Введено: {sourceParagraphs.length} абзацев оригинала. Введите перевод или откройте для автоперевода.
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      Вставьте текст оригинала слева и текст перевода справа.
                    </span>
                  )}
                </div>

                {alignedPairs.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer shrink-0"
                  >
                    {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    <span>{showPreview ? 'Скрыть предпросмотр' : `Предпросмотр пар (${alignedPairs.length})`}</span>
                  </button>
                )}
              </div>

              {/* Optional Alignment Preview Box */}
              {showPreview && alignedPairs.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/60 max-h-56 overflow-y-auto reader-scrollbar space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Сверка сопоставления абзацев:
                  </span>
                  {alignedPairs.slice(0, 6).map((pair) => (
                    <div
                      key={pair.index}
                      className="grid grid-cols-2 gap-2 text-[11px] p-2 rounded-lg bg-white border border-slate-200/80 dark:bg-slate-950 dark:border-slate-800"
                    >
                      <div className="border-r border-slate-100 dark:border-slate-800 pr-2">
                        <span className="text-amber-600 font-mono font-bold mr-1">#{pair.index}</span>
                        <span className="text-slate-800 dark:text-slate-200 line-clamp-2 font-serif">
                          {pair.source || <i className="text-slate-400">— пусто —</i>}
                        </span>
                      </div>
                      <div className="pl-1">
                        <span className="text-slate-600 font-mono font-bold mr-1">#{pair.index}</span>
                        <span className="text-slate-700 dark:text-slate-300 line-clamp-2 font-serif">
                          {pair.target || <i className="text-slate-400">— пусто —</i>}
                        </span>
                      </div>
                    </div>
                  ))}
                  {alignedPairs.length > 6 && (
                    <p className="text-[10px] text-center text-slate-400 pt-1">
                      ... и ещё {alignedPairs.length - 6} абзацев
                    </p>
                  )}
                </div>
              )}

              {/* Library & Category Settings */}
              <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Категория:</span>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as any)}
                        className="rounded-lg border border-amber-300 bg-white px-2 py-1 text-xs font-medium text-slate-800 dark:border-amber-800 dark:bg-slate-900 dark:text-slate-200 cursor-pointer"
                      >
                        <option value="literature">Классическая литература</option>
                        <option value="science">Наука и технологии</option>
                        <option value="dialogue">Диалоги и речь</option>
                        <option value="custom">Мои тексты</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Upload Files */}
          {activeTab === 'file' && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* File for Original */}
                <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-5 text-center">
                  <Upload className="mx-auto h-8 w-8 text-amber-600 mb-2" />
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Файл оригинала ({sourceMeta.name})
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 mb-3">
                    Поддерживаются .txt, .pdf, .md
                  </p>
                  <label className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.txt,.md"
                      disabled={isProcessing}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'source')}
                    />
                    <span>Загрузить оригинал</span>
                  </label>
                </div>

                {/* File for Translation */}
                <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-5 text-center">
                  <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Файл перевода ({targetMeta.name})
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 mb-3">
                    Поддерживаются .txt, .pdf, .md
                  </p>
                  <label className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.txt,.md"
                      disabled={isProcessing}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'target')}
                    />
                    <span>Загрузить перевод</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: URL Form */}
          {activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-4 py-2">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t.urlLabel || 'Ссылка на веб-статью (URL)'}
                </label>
                <input
                  type="url"
                  required
                  autoFocus
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/article..."
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing || !urlInput.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>{isProcessing ? progressStatus : 'Загрузить и открыть статью'}</span>
              </button>
            </form>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-start gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        {activeTab === 'bilingual' && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white py-2 px-4 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 cursor-pointer"
            >
              Отмена
            </button>

            <button
              type="button"
              disabled={isProcessing || !sourceTextInput.trim()}
              onClick={() => handleBilingualSubmit(undefined, false)}
              className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white py-2 px-4 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Открыть без сохранения
            </button>

            <button
              type="button"
              disabled={isProcessing || !sourceTextInput.trim()}
              onClick={() => handleBilingualSubmit(undefined, true)}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-amber-600 py-2 px-5 text-xs font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>{isProcessing ? progressStatus : 'Добавить в библиотеку и открыть'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
