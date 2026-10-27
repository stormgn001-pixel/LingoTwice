import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Columns2,
  Rows2,
  Link,
  Unlink,
  Edit3,
  Check,
  RotateCcw,
  Sun,
  Moon,
  Coffee,
  Plus,
  Trash2,
  ArrowLeftRight,
  Play,
  Pause,
  Sparkles,
  RefreshCw,
  BookOpen,
  ChevronDown,
  Search,
  X
} from 'lucide-react';
import {
  AlignedPassage,
  ReadingDocument,
  ReadingMode,
  ReadingPreferences,
  SplitOrientation,
  InterfaceLanguage,
  ComprehensionQuestion
} from '../types';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../constants/languages';
import { getTranslation, getDocTitle } from '../i18n/translations';
import { useSynchronizedScroll } from '../hooks/useSynchronizedScroll';
import { speechService, SpeechState } from '../services/speech';
import { apiService } from '../services/api';

interface ReaderWorkspaceProps {
  document: ReadingDocument;
  documents: ReadingDocument[];
  onSelectDocument: (doc: ReadingDocument) => void;
  onDeleteDocument: (docId: string) => void;
  onOpenImporter: () => void;
  onChangeLanguages: (docId: string, sourceLang: string, targetLang: string) => void;
  onRetranslateDocument: (docId: string, targetLang: string) => Promise<void>;
  onTranslateField?: (docId: string, field: 'source' | 'target', newLang: string) => Promise<void>;
  onSwapLanguages?: (docId: string) => void;
  preferences: ReadingPreferences;
  onUpdatePreferences: (prefs: Partial<ReadingPreferences>) => void;
  onUpdatePassage: (passageId: string, sourceText: string, targetText: string) => void;
  onUpdatePassages?: (docId: string, updates: { id: string; sourceText: string; targetText: string }[]) => void;
  onWordClick: (word: string, contextSentence: string) => void;
  onProgressUpdate: (docId: string, progress: number, activePassageId?: string) => void;
  isDistractionFree: boolean;
  onToggleDistractionFree: () => void;
  uiLang: InterfaceLanguage;
}

// Memoized Source Passage Component
const SourcePassage = React.memo(({ 
  passage, 
  isActive, 
  isEditing, 
  editSourceText, 
  setEditSourceText, 
  saveEditing, 
  cancelEditing, 
  playAudio, 
  startEditing, 
  handleWordSelect, 
  fontSizeStyle, 
  lineHeightClass, 
  sourceTextColorClass,
  t,
  theme
}: { 
  passage: AlignedPassage;
  isActive: boolean;
  isEditing: boolean;
  editSourceText: string;
  setEditSourceText: (val: string) => void;
  saveEditing: () => void;
  cancelEditing: () => void;
  playAudio: (text: string) => void;
  startEditing: (p: AlignedPassage) => void;
  handleWordSelect: (word: string, p: AlignedPassage) => void;
  fontSizeStyle: React.CSSProperties;
  lineHeightClass: string;
  sourceTextColorClass: string;
  t: any;
  theme: string;
}) => {
  const tokens = React.useMemo(() => {
    return passage.sourceText.split(/(\s+)/);
  }, [passage.sourceText]);

  return (
    <div
      data-passage-id={passage.id}
      className={`group relative rounded-xl p-3 sm:p-3.5 transition-all duration-150 ${
        isActive
          ? 'bg-amber-500/10 ring-1 ring-amber-500/30 dark:bg-amber-400/10 dark:ring-amber-400/30'
          : 'hover:bg-slate-500/5'
      }`}
    >
      <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => playAudio(passage.sourceText)}
          title={t.listenSource}
          className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <Volume2 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => startEditing(passage)}
          title={t.editPassage}
          className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editSourceText}
            onChange={(e) => setEditSourceText(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-amber-500 dark:border-slate-700 dark:bg-slate-900"
            rows={4}
          />
          <div className="flex items-center gap-2">
            <button onClick={saveEditing} className="flex items-center gap-1 rounded bg-amber-600 px-3 py-1 text-xs text-white">
              <Check className="h-3 w-3" /> {t.saveChanges}
            </button>
            <button onClick={cancelEditing} className="rounded px-3 py-1 text-xs text-slate-500 hover:bg-slate-100">
              {t.cancel}
            </button>
          </div>
        </div>
      ) : (
        <p style={fontSizeStyle} className={`reading-text ${lineHeightClass} ${sourceTextColorClass}`}>
          {tokens.map((token, tokenIdx) => {
            if (/^\s+$/.test(token)) return token;
            return (
              <span
                key={tokenIdx}
                onClick={() => handleWordSelect(token, passage)}
                className={`cursor-pointer rounded-xs px-0.5 transition-colors ${
                  theme === 'sepia'
                    ? 'hover:bg-[#e2d5b4] hover:text-[#1a1208]'
                    : theme === 'dark'
                    ? 'hover:bg-amber-900/60 hover:text-amber-100'
                    : 'hover:bg-amber-200/80 hover:text-amber-950'
                }`}
              >
                {token}
              </span>
            );
          })}
        </p>
      )}
    </div>
  );
});

// Memoized Target Passage Component
const TargetPassage = React.memo(({ 
  passage, 
  isActive, 
  isEditing, 
  editTargetText, 
  setEditTargetText, 
  isRevealed, 
  toggleReveal, 
  playAudio, 
  isHiddenInImmersion,
  isTranslating,
  fontSizeStyle, 
  lineHeightClass, 
  targetTextColorClass,
  t,
  mode
}: { 
  passage: AlignedPassage;
  isActive: boolean;
  isEditing: boolean;
  editTargetText: string;
  setEditTargetText: (val: string) => void;
  isRevealed: boolean;
  toggleReveal: (id: string) => void;
  playAudio: (text: string) => void;
  isHiddenInImmersion: boolean;
  isTranslating: boolean;
  fontSizeStyle: React.CSSProperties;
  lineHeightClass: string;
  targetTextColorClass: string;
  t: any;
  mode: string;
}) => {
  return (
    <div
      data-passage-id={passage.id}
      className={`group relative rounded-xl p-3 sm:p-3.5 transition-all duration-150 ${
        isActive
          ? 'bg-amber-500/10 ring-1 ring-amber-500/30 dark:bg-amber-400/10 dark:ring-amber-400/30'
          : 'hover:bg-slate-500/5'
      }`}
    >
      <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {mode === 'immersion' && !isTranslating && passage.targetText && (
          <button
            onClick={() => toggleReveal(passage.id)}
            title={isRevealed ? t.hideTranslation : t.revealTranslation}
            className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        )}
        {!isTranslating && passage.targetText && (
          <button
            onClick={() => playAudio(passage.targetText)}
            title={t.listenTarget}
            className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editTargetText}
            onChange={(e) => setEditTargetText(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-amber-500 dark:border-slate-700 dark:bg-slate-900"
            rows={4}
          />
        </div>
      ) : isTranslating ? (
        <div className="flex flex-col gap-2 py-1">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>
      ) : !passage.targetText ? (
        <div className="flex items-center gap-2 py-1 text-[11px] text-slate-400 italic">
          <RefreshCw className="h-3 w-3 animate-spin" />
          <span>Ожидание перевода...</span>
        </div>
      ) : isHiddenInImmersion ? (
        <div
          onClick={() => toggleReveal(passage.id)}
          className="cursor-pointer rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-6 text-center text-sm font-bold text-amber-900 hover:border-amber-500 hover:bg-amber-100/80 transition-all dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300 shadow-md group-hover:scale-[1.01]"
        >
          <Eye className="mx-auto mb-2.5 h-6 w-6 text-amber-600 dark:text-amber-500" />
          <span>{t.revealTranslation}</span>
        </div>
      ) : (
        <p style={fontSizeStyle} className={`reading-text ${lineHeightClass} ${targetTextColorClass}`}>
          {passage.targetText}
        </p>
      )}
    </div>
  );
});

export const ReaderWorkspace: React.FC<ReaderWorkspaceProps> = ({
  document,
  documents,
  onSelectDocument,
  onDeleteDocument,
  onOpenImporter,
  onChangeLanguages,
  onRetranslateDocument,
  onTranslateField,
  onSwapLanguages,
  preferences,
  onUpdatePreferences,
  onUpdatePassage,
  onUpdatePassages,
  onWordClick,
  onProgressUpdate,
  isDistractionFree,
  onToggleDistractionFree,
  uiLang,
}) => {
  const t = getTranslation(uiLang);

  // Editing state for passages
  const [editingPassageId, setEditingPassageId] = useState<string | null>(null);
  const [editSourceText, setEditSourceText] = useState<string>('');
  const [editTargetText, setEditTargetText] = useState<string>('');

  // Delete confirmation modal state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Document switcher dropdown
  const [showDocSwitcher, setShowDocSwitcher] = useState(false);

  // Re-translation loading state
  const [isRetranslating, setIsRetranslating] = useState(false);

  // Immersion/Assisted revealed passages set
  const [revealedPassageIds, setRevealedPassageIds] = useState<Set<string>>(new Set());

  // Audio state
  const [speechState, setSpeechState] = useState<SpeechState>({
    isPlaying: false,
    isPaused: false,
    currentText: null,
    currentLang: null,
    error: null,
  });

  // Recall mode quiz state
  const [quizQuestions, setQuizQuestions] = useState<ComprehensionQuestion[]>([]);
  const [quizLoading, setQuizLoading] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Pagination for large documents
  const [visibleCount, setVisibleCount] = useState(100);
  const visiblePassages = document.passages.slice(0, visibleCount);
  const hasMore = document.passages.length > visibleCount;

  // Lazy translation state
  const [translatingPassageIds, setTranslatingPassageIds] = useState<Set<string>>(new Set());
  const inFlightIdsRef = React.useRef<Set<string>>(new Set());

  // Reset visibility when document changes
  useEffect(() => {
    setVisibleCount(100);
    inFlightIdsRef.current.clear();
  }, [document.id]);

  // Synchronized scroll hook
  const { sourceRef, targetRef, activePassageId, scrollToPassage } = useSynchronizedScroll({
    enabled: preferences.syncScroll,
    onActivePassageChange: (id) => {
      const idx = document.passages.findIndex((p) => p.id === id);
      if (idx !== -1 && document.passages.length > 0) {
        const pct = Math.round(((idx + 1) / document.passages.length) * 100);
        onProgressUpdate(document.id, pct, id);
      }
    },
  });

  // Auto-expand visible passages for large documents on scroll (smooth infinite loading)
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.scrollHeight - target.scrollTop - target.clientHeight < 800) {
        setVisibleCount((prev) => {
          if (prev < document.passages.length) {
            return Math.min(document.passages.length, prev + 50);
          }
          return prev;
        });
      }
    };

    const sEl = sourceRef.current;
    const tEl = targetRef.current;
    if (sEl) sEl.addEventListener('scroll', handleScroll, { passive: true });
    if (tEl) tEl.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (sEl) sEl.removeEventListener('scroll', handleScroll);
      if (tEl) tEl.removeEventListener('scroll', handleScroll);
    };
  }, [document.passages.length, sourceRef, targetRef]);

  // Real-time on-demand lazy translation effect:
  // Translates strictly within ~1000 characters ahead of current reading position
  useEffect(() => {
    if (preferences.activeMode === 'recall') return;

    const timer = setTimeout(() => {
      const startPassageId =
        activePassageId || (document.passages.length > 0 ? document.passages[0].id : null);
      if (!startPassageId) return;

      const currentIndex = document.passages.findIndex((p) => p.id === startPassageId);
      if (currentIndex === -1) return;

      // Look ahead up to 25 passages, gathering untranslated passages up to 1000 characters
      let untranslatedChars = 0;
      const batchToTranslate: AlignedPassage[] = [];
      const lookaheadLimit = Math.min(document.passages.length, currentIndex + 25);

      for (let i = currentIndex; i < lookaheadLimit; i++) {
        const p = document.passages[i];
        if (!p.targetText && !inFlightIdsRef.current.has(p.id)) {
          if (untranslatedChars + p.sourceText.length > 1000 && batchToTranslate.length > 0) {
            break; // Strictly translate up to ~1000 characters ahead to prevent model overload
          }
          batchToTranslate.push(p);
          untranslatedChars += p.sourceText.length;
        }
      }

      if (batchToTranslate.length > 0) {
        const idsToTrack = new Set(batchToTranslate.map((p) => p.id));
        idsToTrack.forEach((id) => inFlightIdsRef.current.add(id));
        setTranslatingPassageIds((prev) => new Set([...prev, ...idsToTrack]));

        apiService
          .translate({
            sourceLang: document.sourceLang,
            targetLang: document.targetLang,
            paragraphs: batchToTranslate.map((p) => p.sourceText),
          })
          .then((res) => {
            if (onUpdatePassages) {
              const updates = batchToTranslate.map((p, idx) => ({
                id: p.id,
                sourceText: p.sourceText,
                targetText: res.translatedParagraphs[idx] || '',
              }));
              onUpdatePassages(document.id, updates);
            } else {
              batchToTranslate.forEach((p, idx) => {
                onUpdatePassage(p.id, p.sourceText, res.translatedParagraphs[idx] || '');
              });
            }
          })
          .finally(() => {
            idsToTrack.forEach((id) => inFlightIdsRef.current.delete(id));
            setTranslatingPassageIds((prev) => {
              const next = new Set(prev);
              idsToTrack.forEach((id) => next.delete(id));
              return next;
            });
          });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [activePassageId, document.id, document.targetLang, preferences.activeMode, document.passages]);

  // Subscribe to speech service
  useEffect(() => {
    return speechService.subscribe(setSpeechState);
  }, []);

  // Load recall questions when entering recall mode
  useEffect(() => {
    if (preferences.activeMode === 'recall' && document.passages.length > 0) {
      const activePassage =
        document.passages.find((p) => p.id === activePassageId) || document.passages[0];
      setQuizLoading(true);
      apiService
        .generateComprehensionQuiz({
          sourceText: activePassage.sourceText,
          sourceLang: document.sourceLang,
          targetLang: document.targetLang,
        })
        .then((res) => {
          setQuizQuestions(res.questions);
          setSelectedAnswers({});
          setShowQuizResults(false);
        })
        .finally(() => setQuizLoading(false));
    }
  }, [preferences.activeMode, activePassageId, document.id]);

  const playAudio = React.useCallback((text: string, lang: string) => {
    speechService.speak(text, lang, preferences.speechRate);
  }, [preferences.speechRate]);

  // Handle word tap/click with context
  const handleWordSelect = React.useCallback((word: string, passage: AlignedPassage) => {
    const cleanWord = word.replace(/^[«"'(]+|[»"')!?,.:;]+$/g, '').trim();
    if (cleanWord.length > 1) {
      onWordClick(cleanWord, passage.sourceText);
    }
  }, [onWordClick]);

  // Passage editing handlers
  const startEditing = React.useCallback((p: AlignedPassage) => {
    setEditingPassageId(p.id);
    setEditSourceText(p.sourceText);
    setEditTargetText(p.targetText);
  }, []);

  const saveEditing = React.useCallback(() => {
    if (editingPassageId) {
      onUpdatePassage(editingPassageId, editSourceText, editTargetText);
      setEditingPassageId(null);
    }
  }, [editingPassageId, editSourceText, editTargetText, onUpdatePassage]);

  const cancelEditing = React.useCallback(() => {
    setEditingPassageId(null);
  }, []);

  const toggleReveal = React.useCallback((passageId: string) => {
    setRevealedPassageIds((prev) => {
      const next = new Set(prev);
      if (next.has(passageId)) next.delete(passageId);
      else next.add(passageId);
      return next;
    });
  }, []);

  const playSourceAudio = React.useCallback((text: string) => {
    playAudio(text, document.sourceLang);
  }, [playAudio, document.sourceLang]);

  const playTargetAudio = React.useCallback((text: string) => {
    playAudio(text, document.targetLang);
  }, [playAudio, document.targetLang]);

  // Change target language
  const handleTargetLangChange = async (newTarget: string) => {
    onChangeLanguages(document.id, document.sourceLang, newTarget);
    onUpdatePreferences({ targetLang: newTarget });
    // Trigger retranslation to new target language
    try {
      setIsRetranslating(true);
      await onRetranslateDocument(document.id, newTarget);
    } finally {
      setIsRetranslating(false);
    }
  };

  // Font size and line height styling
  const fontSizeStyle = { fontSize: `${preferences.fontSize}px` };
  const lineHeightClass =
    preferences.lineHeight === 'loose'
      ? 'leading-loose'
      : preferences.lineHeight === 'relaxed'
      ? 'leading-relaxed'
      : 'leading-normal';

  const themeClass =
    preferences.theme === 'dark'
      ? 'bg-slate-950 text-slate-100 dark'
      : preferences.theme === 'sepia'
      ? 'bg-[#f4efe2] text-[#2b2118] theme-sepia'
      : 'bg-slate-50 text-slate-900 theme-light';

  const paneHeaderBgClass =
    preferences.theme === 'dark'
      ? 'bg-slate-900/90 border-slate-800 text-slate-200'
      : preferences.theme === 'sepia'
      ? 'bg-[#e4dcbe] border-[#d8cdae] text-[#2b2118]'
      : 'bg-slate-100/90 border-slate-200 text-slate-800';

  const sourceTextColorClass =
    preferences.theme === 'dark'
      ? 'text-slate-100'
      : preferences.theme === 'sepia'
      ? 'text-[#231a10]'
      : 'text-slate-950';

  const targetTextColorClass =
    preferences.theme === 'dark'
      ? 'text-slate-200'
      : preferences.theme === 'sepia'
      ? 'text-[#2e2317]'
      : 'text-slate-900';

  const sourceLangMeta = getLanguageByCode(document.sourceLang);
  const targetLangMeta = getLanguageByCode(document.targetLang);
  const isPanesSwapped = preferences.swapSides ?? false;
  const toggleSwapSides = () => onUpdatePreferences({ swapSides: !isPanesSwapped });

  // Source language reading pane
  const renderSourcePane = () => (
    <div
      key="source-panel"
      className={`${
        preferences.splitOrientation === 'horizontal'
          ? 'w-full md:w-1/2 h-1/2 md:h-full'
          : 'w-full h-1/2'
      } flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden`}
    >
      <div className={`h-7 shrink-0 px-3 sm:px-6 flex items-center justify-between border-b select-none ${paneHeaderBgClass}`}>
        <div className="flex items-center gap-1.5">
          <span className="text-base leading-none" role="img" aria-label="Original Language Flag">
            {sourceLangMeta.flag}
          </span>
          <span className="text-xs font-bold">{t.originalPane}</span>
        </div>
      </div>

      <div
        ref={sourceRef}
        className="flex-1 min-w-0 min-h-0 overflow-y-auto px-3 py-3 sm:px-6 md:px-8 reader-scrollbar"
      >
        <div className="space-y-4 sm:space-y-5 max-w-2xl mx-auto pb-16">
          {visiblePassages.map((passage) => (
            <SourcePassage
              key={passage.id}
              passage={passage}
              isActive={activePassageId === passage.id}
              isEditing={editingPassageId === passage.id}
              editSourceText={editSourceText}
              setEditSourceText={setEditSourceText}
              saveEditing={saveEditing}
              cancelEditing={cancelEditing}
              playAudio={playSourceAudio}
              startEditing={startEditing}
              handleWordSelect={handleWordSelect}
              fontSizeStyle={fontSizeStyle}
              lineHeightClass={lineHeightClass}
              sourceTextColorClass={sourceTextColorClass}
              t={t}
              theme={preferences.theme}
            />
          ))}
          
          {hasMore && (
            <div className="flex justify-center py-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 100)}
                className="flex items-center gap-2 rounded-xl bg-slate-200 px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                {t.loadMore || 'Загрузить ещё 100 фрагментов'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Target language reading pane
  const renderTargetPane = () => (
    <div
      key="target-panel"
      className={`${
        preferences.splitOrientation === 'horizontal'
          ? 'w-full md:w-1/2 h-1/2 md:h-full'
          : 'w-full h-1/2'
      } flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden`}
    >
      <div className={`h-7 shrink-0 px-3 sm:px-6 flex items-center justify-between border-b select-none ${paneHeaderBgClass}`}>
        <div className="flex items-center gap-1.5">
          <span className="text-base leading-none" role="img" aria-label="Target Language Flag">
            {targetLangMeta.flag}
          </span>
          <span className="text-xs font-bold">{t.translationPane}</span>
        </div>
        <div className="flex items-center gap-2">
          {preferences.activeMode === 'immersion' && (
            <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">Погружение</span>
          )}
        </div>
      </div>

      <div
        ref={targetRef}
        className="flex-1 min-w-0 min-h-0 overflow-y-auto px-3 py-3 sm:px-6 md:px-8 reader-scrollbar"
      >
        <div className="space-y-4 sm:space-y-5 max-w-2xl mx-auto pb-16">
          {visiblePassages.map((passage) => (
            <TargetPassage
              key={passage.id}
              passage={passage}
              isActive={activePassageId === passage.id}
              isEditing={editingPassageId === passage.id}
              editTargetText={editTargetText}
              setEditTargetText={setEditTargetText}
              isRevealed={revealedPassageIds.has(passage.id)}
              toggleReveal={toggleReveal}
              playAudio={playTargetAudio}
              isHiddenInImmersion={preferences.activeMode === 'immersion' && !revealedPassageIds.has(passage.id)}
              isTranslating={translatingPassageIds.has(passage.id)}
              fontSizeStyle={fontSizeStyle}
              lineHeightClass={lineHeightClass}
              targetTextColorClass={targetTextColorClass}
              t={t}
              mode={preferences.activeMode}
            />
          ))}

          {preferences.activeMode === 'recall' && (
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 sm:p-5 dark:border-amber-900/60 dark:bg-amber-950/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Проверка понимания прочитанного (Recall Mode)
                </h4>
              </div>

              {quizLoading ? (
                <div className="flex items-center gap-2 py-4 text-xs text-slate-500">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
                  <span>Генерация контрольных вопросов по тексту...</span>
                </div>
              ) : quizQuestions.length > 0 ? (
                <div className="space-y-4">
                  {quizQuestions.map((q, qIndex) => {
                    const userSelection = selectedAnswers[q.id];
                    return (
                      <div key={q.id} className="space-y-2 border-b border-amber-100 pb-3 last:border-b-0 dark:border-amber-900/40">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{qIndex + 1}. {q.question}</p>
                        <div className="space-y-1.5">
                          {q.options.map((opt, optIndex) => {
                            const isSelected = userSelection === optIndex;
                            const isCorrect = optIndex === q.correctOptionIndex;
                            let optClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300';
                            if (showQuizResults) {
                              if (isCorrect) optClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-medium dark:bg-emerald-950/60 dark:text-emerald-300';
                              else if (isSelected) optClass = 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
                            } else if (isSelected) optClass = 'border-amber-600 bg-amber-50 text-amber-900 font-medium dark:bg-amber-950/60 dark:text-amber-200';
                            return (
                              <button key={optIndex} onClick={() => !showQuizResults && setSelectedAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                                className={`w-full text-left rounded-lg border px-3 py-1.5 text-xs transition-colors ${optClass}`}>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {showQuizResults && <p className="mt-1 text-[11px] text-slate-500 italic dark:text-slate-400">Пояснение: {q.explanation}</p>}
                      </div>
                    );
                  })}
                  <div className="pt-2 flex items-center justify-between">
                    {!showQuizResults ? (
                      <button onClick={() => setShowQuizResults(true)} disabled={Object.keys(selectedAnswers).length === 0}
                        className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-amber-700 disabled:opacity-50">Проверить ответы</button>
                    ) : (
                      <button onClick={() => { setSelectedAnswers({}); setShowQuizResults(false); }}
                        className="flex items-center gap-1 text-xs text-amber-700 hover:underline dark:text-amber-400"><RotateCcw className="h-3 w-3" /> Попробовать снова</button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center py-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 100)}
                className="flex items-center gap-2 rounded-xl bg-slate-200 px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                {t.loadMore || 'Загрузить ещё 100 фрагментов'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col h-full w-full select-text transition-colors duration-200 ${themeClass}`}>
      <div className={`border-b border-slate-200/80 px-2.5 py-1.5 sm:px-4 sm:py-2 dark:border-slate-800 ${
        preferences.theme === 'sepia' ? 'bg-[#f4efe1] border-[#e2d9c2]' : 'bg-slate-50/90 dark:bg-slate-900/70'
      }`}>
        <div className="flex items-center justify-between gap-1 sm:gap-2 pb-1 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="relative shrink min-w-0">
            <button
              onClick={() => setShowDocSwitcher(!showDocSwitcher)}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[11px] sm:text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 max-w-[95px] xs:max-w-[130px] sm:max-w-[180px] md:max-w-[220px]"
              title={getDocTitle(document, preferences.uiLang)}
            >
              <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <span className="truncate">{getDocTitle(document, preferences.uiLang)}</span>
              <ChevronDown className="h-3 w-3 shrink-0 text-slate-400" />
            </button>
            {showDocSwitcher && (
              <div className="absolute left-0 top-full mt-1 z-40 w-72 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="text-[10px] font-semibold uppercase text-slate-400 px-2 py-1">{t.libraryTitle}</div>
                <div className="max-h-60 overflow-y-auto reader-scrollbar divide-y divide-slate-100 dark:divide-slate-800">
                  {documents.map((d) => (
                    <button key={d.id} onClick={() => { onSelectDocument(d); setShowDocSwitcher(false); }}
                      className={`w-full text-left rounded-lg px-2.5 py-2 text-xs transition-colors ${d.id === document.id ? 'bg-amber-50 text-amber-900 font-semibold dark:bg-amber-950/60 dark:text-amber-200' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                      <div className="truncate">{getDocTitle(d, preferences.uiLang)}</div>
                      <div className="text-[10px] text-slate-400">{d.sourceLang.toUpperCase()} → {d.targetLang.toUpperCase()} · {d.wordCount} слов</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 bg-white rounded-lg border border-slate-200 px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[11px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 shrink-0 shadow-xs">
            <span className="hidden sm:inline text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">{t.translateTo}</span>
            <div className="flex items-center gap-0.5">
              <select value={document.targetLang} onChange={(e) => handleTargetLangChange(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-hidden text-[11px] sm:text-xs py-0">
                {SUPPORTED_LANGUAGES.map((l) => (<option key={l.code} value={l.code}>{l.flag} {l.name}</option>))}
              </select>
            </div>
            {isRetranslating && <RefreshCw className="h-3 w-3 text-amber-600 animate-spin ml-0.5" />}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button onClick={onOpenImporter} className="flex items-center gap-1 rounded-lg bg-amber-600 px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[11px] sm:text-xs font-semibold text-white transition-colors hover:bg-amber-700 shadow-xs whitespace-nowrap shrink-0">
              <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">{t.addNewText}</span>
              <span className="sm:hidden text-[10px]">+Текст</span>
            </button>
            <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center justify-center rounded-lg border border-slate-200 p-1 text-[11px] sm:text-xs font-medium text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-300 shrink-0">
              <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-rose-500" />
            </button>
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-1.5 sm:gap-2 text-xs overflow-x-auto no-scrollbar touch-pan-x py-0.5">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-950 shrink-0">
            {(['parallel', 'immersion', 'recall'] as ReadingMode[]).map((mode) => (
              <button key={mode} onClick={() => onUpdatePreferences({ activeMode: mode })}
                className={`px-1.5 sm:px-2.5 py-1 font-medium transition-all rounded-md whitespace-nowrap shrink-0 text-xs ${preferences.activeMode === mode ? 'bg-amber-600 text-white shadow-xs dark:bg-amber-500' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`}>
                <span className="hidden sm:inline">
                  {mode === 'parallel' && t.modeParallel}
                  {mode === 'immersion' && t.modeImmersion}
                  {mode === 'recall' && t.modeRecall}
                </span>
                <span className="sm:hidden">
                  {mode === 'parallel' && 'Параллель'}
                  {mode === 'immersion' && 'Погружение'}
                  {mode === 'recall' && 'Тест'}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-950 shrink-0">
              <button type="button" onClick={() => onUpdatePreferences({ splitOrientation: 'horizontal' })} className={`p-1 sm:p-1.5 rounded-md text-xs font-semibold transition-colors ${preferences.splitOrientation === 'horizontal' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}><Columns2 className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => onUpdatePreferences({ splitOrientation: 'vertical' })} className={`p-1 sm:p-1.5 rounded-md text-xs font-semibold transition-colors ${preferences.splitOrientation === 'vertical' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}><Rows2 className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={toggleSwapSides} className={`flex items-center gap-1 p-1 sm:px-1.5 rounded-md text-xs font-semibold transition-all border-l border-slate-200 dark:border-slate-800 ${isPanesSwapped ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}>
                <ArrowLeftRight className={`h-3.5 w-3.5 transition-transform duration-200 ${isPanesSwapped ? 'rotate-180 text-amber-600 dark:text-amber-400' : ''}`} />
                <span className="hidden lg:inline text-[10px]">{t.sides}</span>
              </button>
            </div>

            <button onClick={() => onUpdatePreferences({ syncScroll: !preferences.syncScroll })} className={`flex items-center gap-1 rounded-lg border p-1 sm:px-2 text-xs font-medium transition-colors shrink-0 ${preferences.syncScroll ? 'border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200' : 'border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'}`}>
              {preferences.syncScroll ? <Link className="h-3.5 w-3.5 text-amber-600" /> : <Unlink className="h-3.5 w-3.5 text-slate-400" />}
              <span className="hidden xl:inline text-[11px]">{preferences.syncScroll ? 'Синхрон' : 'Раздельно'}</span>
            </button>

            <div className="flex items-center rounded-lg border border-slate-200 bg-white px-0.5 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 shrink-0">
              <button onClick={() => onUpdatePreferences({ fontSize: Math.max(14, preferences.fontSize - 1) })} className="px-1 py-0.5 font-semibold hover:text-amber-600 text-xs">A-</button>
              <span className="px-0.5 font-mono text-[10px] text-slate-400">{preferences.fontSize}</span>
              <button onClick={() => onUpdatePreferences({ fontSize: Math.min(26, preferences.fontSize + 1) })} className="px-1 py-0.5 font-semibold hover:text-amber-600 text-xs">A+</button>
            </div>

            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-950 shrink-0">
              <button onClick={() => onUpdatePreferences({ theme: 'light' })} className={`p-1 rounded-md ${preferences.theme === 'light' ? 'bg-slate-100 text-amber-600' : 'text-slate-400 hover:text-slate-700'}`}><Sun className="h-3 w-3" /></button>
              <button onClick={() => onUpdatePreferences({ theme: 'sepia' })} className={`p-1 rounded-md ${preferences.theme === 'sepia' ? 'bg-[#eadebf] text-[#6d512a]' : 'text-slate-400 hover:text-slate-700'}`}><Coffee className="h-3 w-3" /></button>
              <button onClick={() => onUpdatePreferences({ theme: 'dark' })} className={`p-1 rounded-md ${preferences.theme === 'dark' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-700'}`}><Moon className="h-3 w-3" /></button>
            </div>

            <button onClick={onToggleDistractionFree} className={`p-1 sm:p-1.5 rounded-lg border transition-colors shrink-0 ${isDistractionFree ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400' : 'border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800'}`}>
              {isDistractionFree ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {speechState.isPlaying && (
          <div className="mt-1.5 flex items-center justify-between rounded-lg bg-amber-50/90 px-2.5 py-1 text-xs text-amber-900 dark:bg-amber-950/60 dark:text-amber-200">
            <div className="flex items-center gap-1.5 truncate">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
              <span className="font-medium shrink-0">Воспроизведение:</span>
              <span className="italic truncate">{speechState.currentText}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button onClick={() => (speechState.isPaused ? speechService.resume() : speechService.pause())} className="rounded p-1 hover:bg-amber-100 dark:hover:bg-amber-900">
                {speechState.isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
              </button>
              <button onClick={() => speechService.stop()} className="rounded p-1 hover:bg-amber-100 dark:hover:bg-amber-900"><VolumeX className="h-3 w-3" /></button>
            </div>
          </div>
        )}
      </div>

      <div className={`relative flex-1 min-h-0 w-full overflow-hidden ${preferences.splitOrientation === 'horizontal' ? 'flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800' : 'flex flex-col divide-y divide-slate-200 dark:divide-slate-800'}`}>
        {isPanesSwapped ? (<>{renderTargetPane()}{renderSourcePane()}</>) : (<>{renderSourcePane()}{renderTargetPane()}</>)}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">Удалить этот текст?</h4>
            <p className="mt-2 text-xs text-slate-500">«{document.title}» будет удалён из вашей библиотеки. Это действие нельзя отменить.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Отмена</button>
              <button onClick={() => { setShowDeleteConfirm(false); onDeleteDocument(document.id); }} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700">Удалить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
