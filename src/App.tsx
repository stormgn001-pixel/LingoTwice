import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { ReaderWorkspace } from './components/ReaderWorkspace';
import { VocabularyCard } from './components/VocabularyCard';
import { ContentImporter } from './components/ContentImporter';
import { LibraryView } from './components/LibraryView';
import { VocabularyView } from './components/VocabularyView';
import { ReviewView } from './components/ReviewView';
import { ProgressView } from './components/ProgressView';
import { SettingsModal } from './components/SettingsModal';
import { LegalModal } from './components/LegalModal';
import { InfoPageView } from './components/InfoPageView';
import { OnboardingModal } from './components/OnboardingModal';
import { PullToRefreshIndicator } from './components/PullToRefreshIndicator';
import { OfflineIndicator } from './components/OfflineIndicator';
import { usePullToRefresh } from './hooks/usePullToRefresh';
import { SAMPLE_DOCUMENTS } from './constants/sampleLibrary';
import {
  ReadingDocument,
  ReadingPreferences,
  UserStats,
  VocabularyEntry,
  WordLookupResponse,
  InterfaceLanguage,
} from './types';
import { apiService } from './services/api';
import { getDueVocabulary } from './services/srs';
import { getTranslation } from './i18n/translations';
import { SEO_DATA_MAP, SEO_LANGUAGES_LIST } from './constants/seoData';

const STORAGE_KEYS = {
  DOCUMENTS: 'linguatwin_documents_v3',
  VOCABULARY: 'linguatwin_vocabulary_v1',
  PREFERENCES: 'linguatwin_preferences_v1',
  STATS: 'linguatwin_stats_v1',
  ACTIVE_DOC_ID: 'linguatwin_active_doc_id_v1',
  COOKIE_CONSENT: 'linguatwin_cookie_consent_v1',
};

const DEFAULT_PREFERENCES: ReadingPreferences = {
  fontSize: 17,
  lineHeight: 'relaxed',
  theme: 'dark',
  splitOrientation: 'horizontal',
  syncScroll: true,
  activeMode: 'parallel',
  sourceLang: 'fr',
  targetLang: 'ru',
  uiLang: 'ru',
  speechRate: 1.0,
  swapSides: false,
};

const getTodayDateKey = () => new Date().toISOString().slice(0, 10);
const getYesterdayDateKey = () => new Date(Date.now() - 86400000).toISOString().slice(0, 10);

const createDefaultStats = (): UserStats => ({
  streakDays: 0,
  lastStreakDate: getTodayDateKey(),
  totalReadingMinutes: 0,
  totalWordsLearned: 0,
  totalPassagesRead: 0,
  dailyGoalMinutes: 20,
  dailyGoalWords: 10,
  todayReadingMinutes: 0,
  todayWordsLearned: 0,
});

const normalizeStatsForToday = (raw?: Partial<UserStats> | null): UserStats => {
  const base = createDefaultStats();
  if (!raw) return base;
  const today = getTodayDateKey();
  const yesterday = getYesterdayDateKey();
  const isToday = raw.lastStreakDate === today;
  const keepStreak = isToday || raw.lastStreakDate === yesterday;
  return {
    ...base,
    ...raw,
    streakDays: keepStreak ? Math.max(0, Number(raw.streakDays) || 0) : 0,
    todayReadingMinutes: isToday ? Math.max(0, Number(raw.todayReadingMinutes) || 0) : 0,
    todayWordsLearned: isToday ? Math.max(0, Number(raw.todayWordsLearned) || 0) : 0,
  };
};

const applyDailyActivity = (prev: UserStats, delta: { readingMinutes?: number; wordsLearned?: number; passagesRead?: number }): UserStats => {
  const normalized = normalizeStatsForToday(prev);
  const today = getTodayDateKey();
  const yesterday = getYesterdayDateKey();
  let nextStreak = normalized.streakDays;
  if (prev.lastStreakDate !== today || nextStreak === 0) {
    nextStreak = prev.lastStreakDate === yesterday && normalized.streakDays > 0 ? normalized.streakDays + 1 : 1;
  }
  return {
    ...normalized,
    streakDays: nextStreak,
    lastStreakDate: today,
    totalReadingMinutes: normalized.totalReadingMinutes + (delta.readingMinutes || 0),
    todayReadingMinutes: normalized.todayReadingMinutes + (delta.readingMinutes || 0),
    totalWordsLearned: normalized.totalWordsLearned + (delta.wordsLearned || 0),
    todayWordsLearned: normalized.todayWordsLearned + (delta.wordsLearned || 0),
    totalPassagesRead: normalized.totalPassagesRead + (delta.passagesRead || 0),
  };
};

import { useAuth } from './contexts/AuthContext';
import { dbService } from './services/db';

const isBuiltInDoc = (doc?: ReadingDocument | null): boolean => {
  if (!doc) return false;
  return Boolean(doc.isSample || SAMPLE_DOCUMENTS.some((s) => s.id === doc.id));
};

const sanitizeDocuments = (docs: ReadingDocument[]): ReadingDocument[] => {
  return docs.map((doc) => {
    const sample = SAMPLE_DOCUMENTS.find((s) => s.id === doc.id);
    let targetLang = doc.targetLang;
    if (!targetLang) {
      targetLang = doc.sourceLang === 'ru' ? 'en' : 'ru';
    }
    if (sample) {
      const sampleTrans = targetLang === 'ru'
        ? doc.passages.map((p) => p.sourceText)
        : sample.translations?.[targetLang];
      return {
        ...doc,
        targetLang,
        passages: doc.passages.map((p, idx) => ({
          ...p,
          targetText: p.isEdited
            ? (p.targetText || '')
            : ((targetLang === 'ru' ? p.sourceText : null) || p.targetText || sampleTrans?.[idx] || p.translations?.[targetLang] || ''),
        })),
      };
    }
    return { ...doc, targetLang };
  });
};

export default function App() {
  const user = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Navigation & View state
  const [currentView, setCurrentView] = useState<
    'read' | 'library' | 'vocabulary' | 'review' | 'progress' | 'about' | 'contact' | 'privacy' | 'terms'
  >('read');
  const [isDistractionFree, setIsDistractionFree] = useState(false);

  // Core Data
  const [documents, setDocuments] = useState<ReadingDocument[]>(() => {
    let deletedIds: string[] = [];
    try {
      const deletedStr = localStorage.getItem('linguatwin_deleted_ids_v1');
      if (deletedStr) {
        const parsedDeleted = JSON.parse(deletedStr);
        if (Array.isArray(parsedDeleted)) deletedIds = parsedDeleted;
      }
    } catch {}
    const deletedSet = new Set(deletedIds);

    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = sanitizeDocuments(parsed).filter((d) => !deletedSet.has(d.id));
          const sampleMap = new Map(SAMPLE_DOCUMENTS.map(s => [s.id, s]));
          const updated = sanitized.map(doc => {
            if (doc.isSample && sampleMap.has(doc.id)) {
              const fresh = sampleMap.get(doc.id)!;
              return {
                ...fresh,
                readingProgress: doc.readingProgress ?? 0,
                lastReadAt: doc.lastReadAt ?? fresh.lastReadAt
              };
            }
            return doc;
          });
          const existingIds = new Set(updated.map(d => d.id));
          const missingSamples = SAMPLE_DOCUMENTS.filter(
            sample => !existingIds.has(sample.id) && !deletedSet.has(sample.id)
          );
          const merged = sanitizeDocuments([...missingSamples, ...updated]);
          if (merged.length > 0) return merged;
        }
      }
    } catch {}
    const initialSamples = SAMPLE_DOCUMENTS.filter(s => !deletedSet.has(s.id));
    return sanitizeDocuments(initialSamples.length > 0 ? initialSamples : SAMPLE_DOCUMENTS);
  });
  const [activeDocId, setActiveDocId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_DOC_ID);
      if (saved) return saved;
    } catch {}
    return SAMPLE_DOCUMENTS[0].id;
  });

  const getInitialUiLang = (): InterfaceLanguage => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/^\/([a-z]{2})(\/|$)/i);
      if (match) {
        const code = match[1].toLowerCase() as InterfaceLanguage;
        if (SEO_LANGUAGES_LIST.includes(code as any)) {
          return code;
        }
      }
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.uiLang && SEO_LANGUAGES_LIST.includes(parsed.uiLang as any)) {
          return parsed.uiLang;
        }
      }
    } catch {}
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserCode = navigator.language.split('-')[0].toLowerCase() as InterfaceLanguage;
      if (SEO_LANGUAGES_LIST.includes(browserCode as any)) {
        return browserCode;
      }
    }
    return 'ru';
  };

  const [vocabulary, setVocabulary] = useState<VocabularyEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });
  const [preferences, setPreferences] = useState<ReadingPreferences>(() => {
    const initialUi = getInitialUiLang();
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PREFERENCES, ...parsed, uiLang: initialUi };
      }
    } catch {}
    return { ...DEFAULT_PREFERENCES, uiLang: initialUi };
  });
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      if (saved) {
        return normalizeStatsForToday(JSON.parse(saved));
      }
    } catch {}
    return createDefaultStats();
  });

  const documentsRef = useRef(documents);
  documentsRef.current = documents;
  const vocabularyRef = useRef(vocabulary);
  vocabularyRef.current = vocabulary;
  const statsRef = useRef(stats);
  statsRef.current = stats;
  const lastSyncedPrefsJsonRef = useRef<string | null>(null);
  const readPassagesSessionRef = useRef<Set<string>>(new Set());
  const progressCloudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeLookupContextRef = useRef<string>('');

  // Synchronize browser URL, document title, and SEO tags with active UI language
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('.html')) return;

    const targetPath = `/${preferences.uiLang}/`;
    if (currentPath !== targetPath && (currentPath === '/' || /^\/[a-z]{2}(\/|$)/i.test(currentPath))) {
      window.history.replaceState(null, '', targetPath);
    }

    const seo = SEO_DATA_MAP[preferences.uiLang as keyof typeof SEO_DATA_MAP];
    if (seo) {
      document.title = seo.title;
      document.documentElement.lang = preferences.uiLang;
      if (seo.rtl) {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.removeAttribute('dir');
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', seo.description);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', `https://lingotwice.com/${preferences.uiLang}/`);
    }
  }, [preferences.uiLang]);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/^\/([a-z]{2})(\/|$)/i);
      if (match) {
        const code = match[1].toLowerCase() as InterfaceLanguage;
        if (SEO_LANGUAGES_LIST.includes(code as any) && code !== preferences.uiLang) {
          setPreferences((prev) => ({ ...prev, uiLang: code }));
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [preferences.uiLang]);

  // Dynamic Google Analytics GA4 Page View tracking for SPA view transitions
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'page_view', {
          page_title: `LingoTwice — ${currentView}`,
          page_location: window.location.href,
          page_path: `/${currentView}`,
        });
      }
    } catch (e) {
      console.warn('GA4 page_view tracking error:', e);
    }
  }, [currentView]);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      if (user) {
        try {
          const [cloudDocs, cloudVocab, cloudStats, cloudPrefs] = await Promise.all([
            dbService.getDocuments(user.uid),
            dbService.getVocabulary(user.uid),
            dbService.getStats(user.uid),
            dbService.getPreferences(user.uid)
          ]);

          let deletedIds: string[] = [];
          try {
            const parsed = JSON.parse(localStorage.getItem('linguatwin_deleted_ids_v1') || '[]');
            if (Array.isArray(parsed)) deletedIds = parsed;
          } catch {}
          const deletedSet = new Set(deletedIds);

          // Merge cloud documents with guest custom documents & active samples
          const cloudDocIds = new Set(cloudDocs.map((d) => d.id));
          const guestCustomDocs = documentsRef.current.filter(
            (d) => !isBuiltInDoc(d) && !cloudDocIds.has(d.id) && !deletedSet.has(d.id)
          );
          const mergedNonSamples = [...cloudDocs.filter((d) => !deletedSet.has(d.id)), ...guestCustomDocs];
          const mergedIds = new Set(mergedNonSamples.map((d) => d.id));
          const activeSamples = SAMPLE_DOCUMENTS.filter(
            (s) => !mergedIds.has(s.id) && !deletedSet.has(s.id)
          );
          const mergedDocs = sanitizeDocuments([...mergedNonSamples, ...activeSamples]);
          if (mergedDocs.length > 0) {
            setDocuments(mergedDocs);
          }
          // Push guest custom documents up to Firestore
          for (const gDoc of guestCustomDocs) {
            dbService.saveDocument(user.uid, gDoc).catch((e) => console.error('Guest doc sync failed:', e));
          }

          // Merge cloud vocabulary with guest vocabulary
          const cloudWords = new Set(cloudVocab.map((v) => v.word.toLowerCase()));
          const cloudVocabIds = new Set(cloudVocab.map((v) => v.id));
          const guestExtraVocab = vocabularyRef.current.filter(
            (v) => !cloudVocabIds.has(v.id) && !cloudWords.has(v.word.toLowerCase())
          );
          const mergedVocab = [...cloudVocab, ...guestExtraVocab];
          if (mergedVocab.length > 0) {
            setVocabulary(mergedVocab);
          }
          for (const gEntry of guestExtraVocab) {
            dbService.saveVocabularyEntry(user.uid, gEntry).catch((e) => console.error('Guest vocab sync failed:', e));
          }

          // Merge stats cleanly
          const localStats = normalizeStatsForToday(statsRef.current);
          const remoteStats = cloudStats ? normalizeStatsForToday(cloudStats) : null;
          if (remoteStats) {
            const mergedStats: UserStats = {
              ...remoteStats,
              streakDays: Math.max(remoteStats.streakDays, localStats.streakDays),
              totalReadingMinutes: Math.max(remoteStats.totalReadingMinutes, localStats.totalReadingMinutes),
              totalWordsLearned: Math.max(remoteStats.totalWordsLearned, localStats.totalWordsLearned, mergedVocab.length),
              totalPassagesRead: Math.max(remoteStats.totalPassagesRead, localStats.totalPassagesRead),
              todayReadingMinutes: Math.max(remoteStats.todayReadingMinutes, localStats.todayReadingMinutes),
              todayWordsLearned: Math.max(remoteStats.todayWordsLearned, localStats.todayWordsLearned),
            };
            setStats(mergedStats);
            if (
              mergedStats.totalReadingMinutes !== remoteStats.totalReadingMinutes ||
              mergedStats.totalWordsLearned !== remoteStats.totalWordsLearned ||
              mergedStats.totalPassagesRead !== remoteStats.totalPassagesRead
            ) {
              dbService.saveStats(user.uid, mergedStats).catch((e) => console.error('Merged stats sync failed:', e));
            }
          } else if (
            localStats.totalReadingMinutes > 0 ||
            localStats.totalWordsLearned > 0 ||
            localStats.totalPassagesRead > 0 ||
            mergedVocab.length > 0
          ) {
            const initialCloudStats = {
              ...localStats,
              totalWordsLearned: Math.max(localStats.totalWordsLearned, mergedVocab.length),
            };
            setStats(initialCloudStats);
            dbService.saveStats(user.uid, initialCloudStats).catch((e) => console.error('Initial stats sync failed:', e));
          }

          if (cloudPrefs) {
            lastSyncedPrefsJsonRef.current = JSON.stringify(cloudPrefs);
            setPreferences((prev) => ({ ...prev, ...cloudPrefs }));
          }
        } catch (err) {
          console.error('Failed to load Firestore user data:', err);
        }
      }
      setLoading(false);
    };
    loadUserData();
  }, [user]);

  // Persist preferences to Firestore when changed locally (skipping echo right after cloud load)
  useEffect(() => {
    if (!user) return;
    const serialized = JSON.stringify(preferences);
    if (lastSyncedPrefsJsonRef.current === serialized) return;
    lastSyncedPrefsJsonRef.current = serialized;
    dbService.savePreferences(user.uid, preferences).catch((err) => console.error('Save prefs failed:', err));
  }, [preferences, user]);

  // Modal states
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | 'faq' | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('lingotwice_onboarded_v1');
    } catch {
      return false;
    }
  });

  // Cookie consent state
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    } catch {
      return false;
    }
  });

  // Contextual Vocabulary lookup card state
  const [activeLookup, setActiveLookup] = useState<WordLookupResponse | null>(null);
  const [isLookupLoading, setIsLookupLoading] = useState(false);

  // Pull-to-refresh handler
  const handlePullRefresh = async () => {
    // Keep indicator smoothly animating for feedback before reload
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.location.reload();
  };

  const isAnyModalOpen = isImporterOpen || isSettingsOpen || legalPage !== null || showOnboarding;

  // Reading time tracker (1 minute interval when actively reading)
  useEffect(() => {
    if (currentView !== 'read' || isAnyModalOpen) return;

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
      const nextStats = applyDailyActivity(statsRef.current, { readingMinutes: 1 });
      setStats(nextStats);
      if (user) {
        dbService.saveStats(user.uid, nextStats).catch((e) => console.error('Cloud save reading minutes failed:', e));
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [currentView, isAnyModalOpen, user]);

  const { pullDistance, isPulling, isRefreshing, canRelease } = usePullToRefresh({
    onRefresh: handlePullRefresh,
    pullThreshold: 65,
    resistance: 0.4,
    disabled: isAnyModalOpen,
  });

  // Persist documents & preferences & stats to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
    } catch {}
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocabulary));
    } catch {}
  }, [vocabulary]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    } catch {}
  }, [preferences]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch {}
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DOC_ID, activeDocId);
    } catch {}
  }, [activeDocId]);

  // Guarantee window and document scroll position is reset to 0 whenever the view changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.body) document.body.scrollTop = 0;
    if (document.documentElement) document.documentElement.scrollTop = 0;
  }, [currentView]);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    if (preferences.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('theme-sepia', 'theme-light');
      root.style.colorScheme = 'dark';
      metaThemeColor.setAttribute('content', '#020617');
    } else if (preferences.theme === 'sepia') {
      root.classList.remove('dark', 'theme-light');
      root.classList.add('theme-sepia');
      root.style.colorScheme = 'light';
      metaThemeColor.setAttribute('content', '#f4efe2');
    } else {
      root.classList.remove('dark', 'theme-sepia');
      root.classList.add('theme-light');
      root.style.colorScheme = 'light';
      metaThemeColor.setAttribute('content', '#f8fafc');
    }
  }, [preferences.theme]);

  // Current active document
  const activeDocument =
    documents.find((d) => d.id === activeDocId) || documents[0] || SAMPLE_DOCUMENTS[0];

  const t = getTranslation(preferences.uiLang);

  // Handle word selection and vocabulary lookup
  const handleWordClick = async (word: string, contextSentence: string) => {
    activeLookupContextRef.current = contextSentence;
    setIsLookupLoading(true);
    setActiveLookup({
      word,
      translation: t.loadingText,
      contextualMeaning: '',
      examples: [],
    });

    try {
      const result = await apiService.lookupWord({
        word,
        contextSentence,
        sourceLang: activeDocument.sourceLang,
        targetLang: activeDocument.targetLang,
      });
      setActiveLookup(result);
    } catch {
      setActiveLookup({
        word,
        translation: word,
        contextualMeaning: t.contextualFallback,
        examples: [],
      });
    } finally {
      setIsLookupLoading(false);
    }
  };

  // Add word to vocabulary
  const handleSaveWord = (lookup: WordLookupResponse) => {
    const existingIndex = vocabulary.findIndex(
      (v) => v.word.toLowerCase() === lookup.word.toLowerCase()
    );

    if (existingIndex >= 0) {
      return;
    }

    const newEntry: VocabularyEntry = {
      id: `vocab-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      word: lookup.word,
      translation: lookup.translation,
      contextSentence: activeLookupContextRef.current || lookup.contextualMeaning || '',
      notes: lookup.contextualMeaning || undefined,
      sourceLang: activeDocument.sourceLang,
      targetLang: activeDocument.targetLang,
      grammar: lookup.grammar,
      box: 1,
      interval: 1,
      repetitionCount: 0,
      easeFactor: 2.5,
      nextReviewDate: Date.now() + 86400000,
      correctCount: 0,
      incorrectCount: 0,
      createdAt: Date.now(),
    };

    const nextStats = applyDailyActivity(statsRef.current, { wordsLearned: 1 });

    setVocabulary((prev) => [newEntry, ...prev]);
    setStats(nextStats);
    if (user) {
      dbService.saveVocabularyEntry(user.uid, newEntry).catch((e) => console.error('Cloud save word failed:', e));
      dbService.saveStats(user.uid, nextStats).catch((e) => console.error('Cloud save stats failed:', e));
    }
  };

  const isWordSaved = (word?: string) => {
    if (!word) return false;
    return vocabulary.some((v) => v.word.toLowerCase() === word.toLowerCase());
  };

  // Update multiple passages at once (for batch translation and manual edits)
  const handleUpdatePassages = useCallback((
    docId: string,
    updates: { id: string; sourceText: string; targetText: string; isEdited?: boolean }[]
  ) => {
    const updateMap = new Map(updates.map((u) => [u.id, u]));
    const targetDoc = documentsRef.current.find((d) => d.id === docId);
    let updatedForCloud: ReadingDocument | null = null;
    if (targetDoc) {
      updatedForCloud = {
        ...targetDoc,
        passages: targetDoc.passages.map((p) => {
          const up = updateMap.get(p.id);
          return up
            ? {
                ...p,
                sourceText: up.sourceText,
                targetText: up.targetText,
                ...(up.isEdited !== undefined ? { isEdited: up.isEdited } : {}),
              }
            : p;
        }),
      };
    }

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id !== docId) return doc;
        return {
          ...doc,
          passages: doc.passages.map((p) => {
            const up = updateMap.get(p.id);
            return up
              ? {
                  ...p,
                  sourceText: up.sourceText,
                  targetText: up.targetText,
                  ...(up.isEdited !== undefined ? { isEdited: up.isEdited } : {}),
                }
              : p;
          }),
        };
      })
    );

    if (user && updatedForCloud) {
      dbService.saveDocument(user.uid, updatedForCloud).catch((e) => console.error('Cloud save doc failed:', e));
    }
  }, [user]);

  // Update single passage text (explicit user edit)
  const handleUpdatePassage = useCallback((
    passageId: string,
    sourceText: string,
    targetText: string
  ) => {
    handleUpdatePassages(activeDocument.id, [{ id: passageId, sourceText, targetText, isEdited: true }]);
  }, [activeDocument.id, handleUpdatePassages]);

  // Update progress (with unique passage tracking and debounced cloud persistence)
  const handleProgressUpdate = useCallback((
    docId: string,
    progress: number,
    activePassageId?: string
  ) => {
    const targetDoc = documentsRef.current.find((d) => d.id === docId);
    const updatedDoc: ReadingDocument | null = targetDoc
      ? {
          ...targetDoc,
          readingProgress: Math.max(targetDoc.readingProgress, progress),
          lastReadAt: Date.now(),
          lastActivePassageId: activePassageId,
        }
      : null;

    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              readingProgress: Math.max(d.readingProgress, progress),
              lastReadAt: Date.now(),
              lastActivePassageId: activePassageId,
            }
          : d
      )
    );

    let nextStatsToSave: UserStats | null = null;
    if (activePassageId) {
      const visitKey = `${docId}:${activePassageId}`;
      if (!readPassagesSessionRef.current.has(visitKey)) {
        readPassagesSessionRef.current.add(visitKey);
        nextStatsToSave = applyDailyActivity(statsRef.current, { passagesRead: 1 });
        setStats(nextStatsToSave);
      }
    }

    if (user && (updatedDoc || nextStatsToSave)) {
      if (progressCloudTimerRef.current) {
        clearTimeout(progressCloudTimerRef.current);
      }
      const statsSnapshot = nextStatsToSave;
      progressCloudTimerRef.current = setTimeout(() => {
        if (updatedDoc) {
          dbService.saveDocument(user.uid, updatedDoc).catch((e) => console.error('Cloud save progress failed:', e));
        }
        if (statsSnapshot) {
          dbService.saveStats(user.uid, statsSnapshot).catch((e) => console.error('Cloud save stats failed:', e));
        }
      }, 1200);
    }
  }, [user]);

  // Delete document
  const handleDeleteDocument = (docId: string) => {
    try {
      const deletedIdsStr = localStorage.getItem('linguatwin_deleted_ids_v1');
      const deletedIds: string[] = deletedIdsStr ? JSON.parse(deletedIdsStr) : [];
      if (!deletedIds.includes(docId)) {
        deletedIds.push(docId);
        localStorage.setItem('linguatwin_deleted_ids_v1', JSON.stringify(deletedIds));
      }
    } catch {}
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    if (activeDocId === docId) {
      const remaining = documents.filter((d) => d.id !== docId);
      if (remaining.length > 0) setActiveDocId(remaining[0].id);
    }
    if (user) {
      dbService.deleteDocument(user.uid, docId).catch((e) => console.error('Cloud delete doc failed:', e));
    }
  };

  // Update document language pair (only permitted for built-in library articles)
  const handleChangeLanguages = (docId: string, sourceLang: string, targetLang: string) => {
    const doc = documentsRef.current.find((d) => d.id === docId);
    if (!doc || !isBuiltInDoc(doc)) return;
    const updatedDoc = { ...doc, sourceLang, targetLang };
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? updatedDoc : d))
    );
    if (user) {
      dbService.saveDocument(user.uid, updatedDoc).catch((e) => console.error('Cloud save lang change failed:', e));
    }
  };

  // Swap document languages AND their texts so both fields remain aligned (non-built-in only)
  const handleSwapDocumentLanguages = (docId: string) => {
    const doc = documentsRef.current.find((d) => d.id === docId);
    if (!doc || isBuiltInDoc(doc)) return;
    const updatedDoc: ReadingDocument = {
      ...doc,
      sourceLang: doc.targetLang,
      targetLang: doc.sourceLang,
      passages: doc.passages.map((p) => ({
        ...p,
        sourceText: p.targetText,
        targetText: p.sourceText,
      })),
    };
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? updatedDoc : d))
    );
    if (user) {
      dbService.saveDocument(user.uid, updatedDoc).catch((e) => console.error('Cloud save swap failed:', e));
    }
  };

  // Unified translation handler - safely updates language and fills translations
  const handleTranslateField = async (
    docId: string,
    field: 'source' | 'target',
    newLang: string
  ) => {
    const doc = documentsRef.current.find((d) => d.id === docId);
    if (!doc || !isBuiltInDoc(doc)) return;

    const currentLang = field === 'source' ? doc.sourceLang : doc.targetLang;
    if (currentLang.toLowerCase() === newLang.toLowerCase()) {
      if (field === 'target' && newLang.toLowerCase() === 'ru') {
        const updatedDoc: ReadingDocument = {
          ...doc,
          targetLang: 'ru',
          passages: doc.passages.map((p) => ({
            ...p,
            targetText: p.sourceText || p.targetText || '',
          })),
        };
        setDocuments((prev) => prev.map((d) => (d.id === docId ? updatedDoc : d)));
        if (user) {
          dbService.saveDocument(user.uid, updatedDoc).catch((e) => console.error('Cloud save translate failed:', e));
        }
      }
      return;
    }

    const sampleDoc = SAMPLE_DOCUMENTS.find((s) => s.id === docId);
    const existingTranslations =
      newLang.toLowerCase() === 'ru'
        ? doc.passages.map((p) => p.sourceText)
        : sampleDoc?.translations?.[newLang] || doc.translations?.[newLang];

    if (field === 'target') {
      let updatedDoc: ReadingDocument;
      if (existingTranslations && existingTranslations.length > 0) {
        updatedDoc = {
          ...doc,
          targetLang: newLang,
          passages: doc.passages.map((p, idx) => ({
            ...p,
            targetText: p.isEdited
              ? p.targetText
              : (existingTranslations[idx] || p.translations?.[newLang] || p.targetText || ''),
          })),
        };
      } else {
        try {
          const res = await apiService.translate({
            sourceLang: doc.sourceLang,
            targetLang: newLang,
            paragraphs: doc.passages.map((p) => p.sourceText),
          });
          if (res && res.translatedParagraphs && res.translatedParagraphs.length > 0) {
            updatedDoc = {
              ...doc,
              targetLang: newLang,
              passages: doc.passages.map((p, idx) => ({
                ...p,
                targetText: p.isEdited ? p.targetText : (res.translatedParagraphs[idx] || p.targetText || ''),
              })),
            };
          } else {
            updatedDoc = { ...doc, targetLang: newLang };
          }
        } catch {
          updatedDoc = { ...doc, targetLang: newLang };
        }
      }
      setDocuments((prev) => prev.map((d) => (d.id === docId ? updatedDoc : d)));
      if (user) {
        dbService.saveDocument(user.uid, updatedDoc).catch((e) => console.error('Cloud save translate failed:', e));
      }
    } else {
      const updatedDoc = { ...doc, sourceLang: newLang };
      setDocuments((prev) => prev.map((d) => (d.id === docId ? updatedDoc : d)));
      if (user) {
        dbService.saveDocument(user.uid, updatedDoc).catch((e) => console.error('Cloud save translate failed:', e));
      }
    }
  };

  // Retranslate document into new target language (now lazy, only for built-in documents)
  const handleRetranslateDocument = async (docId: string, newTargetLang: string) => {
    const doc = documentsRef.current.find((d) => d.id === docId);
    if (!doc || !isBuiltInDoc(doc)) return;
    await handleTranslateField(docId, 'target', newTargetLang);
  };

  // Unified preference update handler across Reader & SettingsModal
  const handleUpdatePreferences = (newPrefs: Partial<ReadingPreferences>) => {
    const next = { ...preferences, ...newPrefs };
    if (newPrefs.uiLang && newPrefs.uiLang !== preferences.uiLang) {
      const newTargetLang = newPrefs.targetLang || (
        newPrefs.uiLang === 'ru'
          ? (preferences.targetLang && preferences.targetLang !== 'ru' ? preferences.targetLang : 'en')
          : 'ru'
      );
      next.targetLang = newTargetLang;
      setPreferences(next);
      if (activeDocument && isBuiltInDoc(activeDocument)) {
        handleChangeLanguages(activeDocument.id, newPrefs.uiLang, newTargetLang);
        handleRetranslateDocument(activeDocument.id, newTargetLang);
      }
    } else {
      setPreferences(next);
    }
  };

  const handleUpdateStats = (partial: Partial<UserStats>) => {
    const nextStats: UserStats = {
      ...statsRef.current,
      ...partial,
    };
    setStats(nextStats);
    if (user) {
      dbService.saveStats(user.uid, nextStats).catch((e) => console.error('Cloud save stats failed:', e));
    }
  };

  // Review flashcard session
  const dueCards = getDueVocabulary(vocabulary);

  const handleReviewCardComplete = (updatedCard: VocabularyEntry) => {
    setVocabulary((prev) =>
      prev.map((item) => (item.id === updatedCard.id ? updatedCard : item))
    );
    if (user) {
      dbService.saveVocabularyEntry(user.uid, updatedCard).catch((e) => console.error('Cloud save review failed:', e));
    }
  };

  // Cookie acceptance
  const acceptCookies = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'accepted');
    } catch {}
    setShowCookieConsent(false);
  };

  return (
    <div
      className={`fixed inset-0 h-full w-full max-h-[100dvh] flex flex-col overflow-hidden select-text ${
        preferences.theme === 'dark'
          ? 'bg-slate-950 text-slate-100 dark'
          : preferences.theme === 'sepia'
          ? 'bg-[#f4efe2] text-[#2b2118] theme-sepia'
          : 'bg-slate-50 text-slate-900 theme-light'
      }`}
    >
      {/* Pull to refresh visual indicator */}
      <PullToRefreshIndicator
        pullDistance={pullDistance}
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        canRelease={canRelease}
        theme={preferences.theme}
        uiLang={preferences.uiLang}
      />

      {/* Offline Status Banner */}
      <OfflineIndicator uiLang={preferences.uiLang} />

      {/* Top Bar Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        uiLang={preferences.uiLang}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenOnboarding={() => setShowOnboarding(true)}
        dueCardsCount={dueCards.length}
        isDistractionFree={isDistractionFree}
        theme={preferences.theme}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 w-full overflow-hidden relative">
        {currentView === 'read' && (
          <ReaderWorkspace
            document={activeDocument}
            documents={documents}
            onSelectDocument={(doc) => setActiveDocId(doc.id)}
            onDeleteDocument={handleDeleteDocument}
            onOpenImporter={() => setIsImporterOpen(true)}
            onChangeLanguages={handleChangeLanguages}
            onRetranslateDocument={handleRetranslateDocument}
            onTranslateField={handleTranslateField}
            onSwapLanguages={handleSwapDocumentLanguages}
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onUpdatePassages={handleUpdatePassages}
            onUpdatePassage={handleUpdatePassage}
            onWordClick={handleWordClick}
            onProgressUpdate={handleProgressUpdate}
            isDistractionFree={isDistractionFree}
            onToggleDistractionFree={() => setIsDistractionFree((prev) => !prev)}
            uiLang={preferences.uiLang}
          />
        )}

        {currentView === 'library' && (
          <div className="h-full overflow-y-auto reader-scrollbar">
            <LibraryView
              documents={documents}
              onSelectDocument={(doc) => {
                setActiveDocId(doc.id);
                // Ensure document has valid distinct source and target languages
                let targetLang = doc.targetLang;
                if (!targetLang || targetLang === doc.sourceLang) {
                  targetLang = doc.sourceLang === 'ru' ? 'en' : 'ru';
                  handleChangeLanguages(doc.id, doc.sourceLang, targetLang);
                }
                window.scrollTo(0, 0);
                setCurrentView('read');
              }}
              onOpenImporter={() => setIsImporterOpen(true)}
              onDeleteDocument={handleDeleteDocument}
              uiLang={preferences.uiLang}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          </div>
        )}

        {currentView === 'vocabulary' && (
          <div className="h-full overflow-y-auto reader-scrollbar">
            <VocabularyView
              vocabulary={vocabulary}
              onDeleteWord={(id) => {
                setVocabulary((prev) => prev.filter((item) => item.id !== id));
                if (user) {
                  dbService.deleteVocabularyEntry(user.uid, id).catch((e) => console.error('Cloud delete vocab failed:', e));
                }
              }}
              onStartReview={() => setCurrentView('review')}
              uiLang={preferences.uiLang}
            />
          </div>
        )}

        {currentView === 'review' && (
          <div className="h-full overflow-y-auto reader-scrollbar">
            <ReviewView
              dueCards={dueCards}
              onCompleteReview={handleReviewCardComplete}
              onFinishSession={() => setCurrentView('read')}
              uiLang={preferences.uiLang}
            />
          </div>
        )}

        {currentView === 'progress' && (
          <div className="h-full overflow-y-auto reader-scrollbar">
            <ProgressView
              stats={stats}
              vocabulary={vocabulary}
              documents={documents}
              uiLang={preferences.uiLang}
            />
          </div>
        )}

        {(currentView === 'about' || currentView === 'contact' || currentView === 'privacy' || currentView === 'terms') && (
          <InfoPageView
            page={currentView}
            onBack={() => setCurrentView('read')}
            uiLang={preferences.uiLang}
          />
        )}
      </main>

      {/* Floating Word Lookup Card */}
      <VocabularyCard
        lookup={activeLookup}
        isLoading={isLookupLoading}
        onClose={() => setActiveLookup(null)}
        onSaveWord={handleSaveWord}
        isSaved={isWordSaved(activeLookup?.word)}
        uiLang={preferences.uiLang}
        sourceLang={activeDocument.sourceLang}
        speechRate={preferences.speechRate}
        preferredVoice={preferences.preferredVoice}
      />

      {/* Importer Modal */}
      {isImporterOpen && (
        <ContentImporter
          onClose={() => setIsImporterOpen(false)}
          onImportComplete={(newDoc) => {
            setDocuments((prev) => [newDoc, ...prev]);
            setActiveDocId(newDoc.id);
            setIsImporterOpen(false);
            setCurrentView('read');
            if (user) {
              dbService.saveDocument(user.uid, newDoc).catch((e) => console.error('Cloud save new doc failed:', e));
            }
          }}
          uiLang={preferences.uiLang}
          defaultSourceLang={preferences.sourceLang}
          defaultTargetLang={preferences.targetLang}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          preferences={preferences}
          onUpdatePreferences={handleUpdatePreferences}
          stats={stats}
          onUpdateStats={handleUpdateStats}
          allData={{ documents, vocabulary, stats }}
          onClearAllData={() => {
            const resetStats = createDefaultStats();
            setDocuments(SAMPLE_DOCUMENTS);
            setActiveDocId(SAMPLE_DOCUMENTS[0].id);
            setVocabulary([]);
            setStats(resetStats);
            readPassagesSessionRef.current.clear();
            try {
              localStorage.removeItem('linguatwin_deleted_ids_v1');
            } catch {}
          }}
          onOpenLegal={(page) => setLegalPage(page)}
        />
      )}

      {/* Legal & Privacy Modal */}
      {legalPage && (
        <LegalModal
          page={legalPage}
          onClose={() => setLegalPage(null)}
          uiLang={preferences.uiLang}
        />
      )}

      {/* 3-Step Interactive Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        uiLang={preferences.uiLang}
        onSelectLanguage={(lang) => {
          handleUpdatePreferences({ uiLang: lang });
        }}
      />

      {/* Cookie Consent Notice (GDPR/ePrivacy compliant) */}
      {showCookieConsent && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 p-3.5 shadow-lg backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:px-6 dark:border-slate-800 dark:bg-slate-900/95">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {t.cookieMessage}
          </p>
          <div className="mt-2 flex items-center gap-2 sm:mt-0 shrink-0">
            <button
              onClick={() => setLegalPage('privacy')}
              className="text-xs text-slate-500 underline hover:text-slate-800 dark:hover:text-slate-200 mr-2 cursor-pointer"
            >
              {t.cookieLearnMore}
            </button>
            <button
              onClick={acceptCookies}
              className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer"
            >
              {t.cookieAccept}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
