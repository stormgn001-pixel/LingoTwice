import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ReaderWorkspace } from './components/ReaderWorkspace';
import { VocabularyCard } from './components/VocabularyCard';
import { ContentImporter } from './components/ContentImporter';
import { LibraryView } from './components/LibraryView';
import { VocabularyView } from './components/VocabularyView';
import { ReviewView } from './components/ReviewView';
import { ProgressView } from './components/ProgressView';
import { SettingsModal } from './components/SettingsModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { LegalModal } from './components/LegalModal';
import { SAMPLE_DOCUMENTS } from './constants/sampleLibrary';
import {
  ReadingDocument,
  ReadingPreferences,
  SubscriptionStatus,
  UserStats,
  VocabularyEntry,
  WordLookupResponse,
} from './types';
import { apiService } from './services/api';
import { getDueVocabulary } from './services/srs';

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

const DEFAULT_STATS: UserStats = {
  streakDays: 4,
  lastStreakDate: new Date().toISOString().slice(0, 10),
  totalReadingMinutes: 48,
  totalWordsLearned: 32,
  totalPassagesRead: 28,
  dailyGoalMinutes: 20,
  dailyGoalWords: 10,
  todayReadingMinutes: 12,
  todayWordsLearned: 5,
};

import { useAuth } from './contexts/AuthContext';
import { dbService } from './services/db';

const isBuiltInDoc = (doc?: ReadingDocument | null): boolean => {
  if (!doc) return false;
  return Boolean(doc.isSample || SAMPLE_DOCUMENTS.some((s) => s.id === doc.id));
};

export default function App() {
  const user = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Navigation & View state
  const [currentView, setCurrentView] = useState<
    'read' | 'library' | 'vocabulary' | 'review' | 'progress'
  >('read');
  const [isDistractionFree, setIsDistractionFree] = useState(false);

  // Core Data
  const [documents, setDocuments] = useState<ReadingDocument[]>(SAMPLE_DOCUMENTS);
  const [activeDocId, setActiveDocId] = useState<string>(SAMPLE_DOCUMENTS[0].id);

  const [vocabulary, setVocabulary] = useState<VocabularyEntry[]>([]);
  const [preferences, setPreferences] = useState<ReadingPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      if (user) {
        const [docs, vocab, statsData, prefsData] = await Promise.all([
          dbService.getDocuments(user.uid),
          dbService.getVocabulary(user.uid),
          dbService.getStats(user.uid),
          dbService.getPreferences(user.uid)
        ]);
        
        if (docs.length > 0) {
          try {
            const deletedIds: string[] = JSON.parse(localStorage.getItem('linguatwin_deleted_ids_v1') || '[]');
            const activeSamples = SAMPLE_DOCUMENTS.filter(s => !deletedIds.includes(s.id));
            const existingIds = new Set(docs.map(d => d.id));
            const missingSamples = activeSamples.filter(s => !existingIds.has(s.id));
            setDocuments([...docs, ...missingSamples]);
          } catch {
            setDocuments(docs);
          }
        }
        setVocabulary(vocab);
        if (statsData) setStats(statsData);
        if (prefsData) setPreferences(prefsData);
      }
      setLoading(false);
    };
    loadUserData();
  }, [user]);

  // Persist preferences to Firestore when changed
  useEffect(() => {
    if (user && preferences !== DEFAULT_PREFERENCES) {
      dbService.savePreferences(user.uid, preferences);
    }
  }, [preferences, user]);



  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    tier: 'free',
    isActive: true,
    dailyTranslationsUsed: 4,
    dailyTranslationsLimit: 20,
    wordsTranslatedToday: 512,
  });

  // Modal states
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | 'faq' | null>(null);

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

  // Fetch verified subscription status on mount
  useEffect(() => {
    apiService.getSubscription().then(setSubscription);
  }, []);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (preferences.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('theme-sepia', 'theme-light');
    } else if (preferences.theme === 'sepia') {
      root.classList.remove('dark', 'theme-light');
      root.classList.add('theme-sepia');
    } else {
      root.classList.remove('dark', 'theme-sepia');
      root.classList.add('theme-light');
    }
  }, [preferences.theme]);

  // Current active document
  const activeDocument =
    documents.find((d) => d.id === activeDocId) || documents[0] || SAMPLE_DOCUMENTS[0];

  // Handle word selection and vocabulary lookup
  const handleWordClick = async (word: string, contextSentence: string) => {
    setIsLookupLoading(true);
    setActiveLookup({
      word,
      translation: 'Загрузка...',
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
        contextualMeaning: 'Значение в контексте предложения.',
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
      // Word already in vocabulary
      return;
    }

    const newEntry: VocabularyEntry = {
      id: `vocab-${Date.now()}`,
      word: lookup.word,
      translation: lookup.translation,
      contextSentence: lookup.contextualMeaning || '',
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

    setVocabulary((prev) => [newEntry, ...prev]);
    if (user) {
      dbService.saveVocabularyEntry(user.uid, newEntry);
    }
    setStats((prev) => ({
      ...prev,
      totalWordsLearned: prev.totalWordsLearned + 1,
      todayWordsLearned: prev.todayWordsLearned + 1,
    }));
  };

  const isWordSaved = (word?: string) => {
    if (!word) return false;
    return vocabulary.some((v) => v.word.toLowerCase() === word.toLowerCase());
  };

  // Update multiple passages at once (for batch translation)
  const handleUpdatePassages = (
    docId: string,
    updates: { id: string; sourceText: string; targetText: string }[]
  ) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id !== docId) return doc;
        const updateMap = new Map(updates.map(u => [u.id, u]));
        return {
          ...doc,
          passages: doc.passages.map((p) => {
            const up = updateMap.get(p.id);
            return up ? { ...p, sourceText: up.sourceText, targetText: up.targetText } : p;
          }),
        };
      })
    );
  };

  // Update single passage text
  const handleUpdatePassage = (
    passageId: string,
    sourceText: string,
    targetText: string
  ) => {
    handleUpdatePassages(activeDocument.id, [{ id: passageId, sourceText, targetText }]);
  };

  // Update progress
  const handleProgressUpdate = (
    docId: string,
    progress: number,
    activePassageId?: string
  ) => {
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

    setStats((prev) => ({
      ...prev,
      totalPassagesRead: prev.totalPassagesRead + 1,
    }));
  };

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
  };

  // Update document language pair (only permitted for built-in library articles)
  const handleChangeLanguages = (docId: string, sourceLang: string, targetLang: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (doc && !isBuiltInDoc(doc)) return;
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, sourceLang, targetLang } : d))
    );
  };

  // Swap document languages AND their texts so both fields remain aligned
  const handleSwapDocumentLanguages = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id !== docId) return d;
        return {
          ...d,
          sourceLang: d.targetLang,
          targetLang: d.sourceLang,
          passages: d.passages.map((p) => ({
            ...p,
            sourceText: p.targetText,
            targetText: p.sourceText,
          })),
        };
      })
    );
  };

  // Unified translation handler - now supports lazy translation by clearing target texts
  const handleTranslateField = async (
    docId: string,
    field: 'source' | 'target',
    newLang: string
  ) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc || !isBuiltInDoc(doc)) return;

    const currentLang = field === 'source' ? doc.sourceLang : doc.targetLang;
    if (currentLang.toLowerCase() === newLang.toLowerCase()) return;

    // For lazy translation, we just update the target language and clear target texts
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id !== docId) return d;
        if (field === 'source') {
          // If source changes, we need a full re-sync usually, but let's keep it simple
          return {
            ...d,
            sourceLang: newLang,
          };
        } else {
          return {
            ...d,
            targetLang: newLang,
            passages: d.passages.map((p) => ({
              ...p,
              targetText: '', // Clear to trigger lazy translation
            })),
          };
        }
      })
    );
  };

  // Retranslate document into new target language (now lazy, only for built-in documents)
  const handleRetranslateDocument = async (docId: string, newTargetLang: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc || !isBuiltInDoc(doc)) return;
    await handleTranslateField(docId, 'target', newTargetLang);
  };

  // Review flashcard session
  const dueCards = getDueVocabulary(vocabulary);

  const handleReviewCardComplete = (updatedCard: VocabularyEntry) => {
    setVocabulary((prev) =>
      prev.map((item) => (item.id === updatedCard.id ? updatedCard : item))
    );
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
      className={`flex h-screen w-screen flex-col overflow-hidden transition-colors duration-200 ${
        preferences.theme === 'dark'
          ? 'bg-slate-950 text-slate-100 dark'
          : preferences.theme === 'sepia'
          ? 'bg-[#f4efe2] text-[#2b2118] theme-sepia'
          : 'bg-slate-50 text-slate-900 theme-light'
      }`}
    >
      {/* Top Bar Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        uiLang={preferences.uiLang}
        subscription={subscription}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        dueCardsCount={dueCards.length}
        isDistractionFree={isDistractionFree}
        theme={preferences.theme}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
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
            onUpdatePreferences={(newPrefs) => {
              setPreferences((prev) => {
                const next = { ...prev, ...newPrefs };
                if (newPrefs.uiLang && newPrefs.uiLang !== prev.uiLang) {
                  next.targetLang = newPrefs.uiLang;
                  if (activeDocument && isBuiltInDoc(activeDocument)) {
                    handleChangeLanguages(activeDocument.id, activeDocument.sourceLang, newPrefs.uiLang);
                    handleRetranslateDocument(activeDocument.id, newPrefs.uiLang);
                  }
                }
                return next;
              });
            }}
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
                if (isBuiltInDoc(doc) && doc.targetLang !== preferences.uiLang) {
                  handleChangeLanguages(doc.id, doc.sourceLang, preferences.uiLang);
                  handleRetranslateDocument(doc.id, preferences.uiLang);
                }
                setCurrentView('read');
              }}
              onOpenImporter={() => setIsImporterOpen(true)}
              onDeleteDocument={handleDeleteDocument}
              uiLang={preferences.uiLang}
              subscription={subscription}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          </div>
        )}

        {currentView === 'vocabulary' && (
          <div className="h-full overflow-y-auto reader-scrollbar">
            <VocabularyView
              vocabulary={vocabulary}
              onDeleteWord={(id) =>
                setVocabulary((prev) => prev.filter((item) => item.id !== id))
              }
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
          }}
          uiLang={preferences.uiLang}
          defaultSourceLang={preferences.sourceLang}
          defaultTargetLang={preferences.targetLang}
          subscription={subscription}
          onOpenSubscription={() => {
            setIsImporterOpen(false);
            setIsSubscriptionOpen(true);
          }}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          preferences={preferences}
          onUpdatePreferences={(newPrefs) => {
            setPreferences((prev) => {
              const next = { ...prev, ...newPrefs };
              if (newPrefs.uiLang && newPrefs.uiLang !== prev.uiLang) {
                next.targetLang = newPrefs.uiLang;
                if (activeDocument && isBuiltInDoc(activeDocument)) {
                  handleChangeLanguages(activeDocument.id, activeDocument.sourceLang, newPrefs.uiLang);
                  handleRetranslateDocument(activeDocument.id, newPrefs.uiLang);
                }
              }
              return next;
            });
          }}
          allData={{ documents, vocabulary, stats }}
          onClearAllData={() => {
            setDocuments(SAMPLE_DOCUMENTS);
            setActiveDocId(SAMPLE_DOCUMENTS[0].id);
            setVocabulary([]);
            setStats(DEFAULT_STATS);
          }}
          onOpenLegal={(page) => setLegalPage(page)}
        />
      )}

      {/* Subscription Modal */}
      {isSubscriptionOpen && (
        <SubscriptionModal
          onClose={() => setIsSubscriptionOpen(false)}
          subscription={subscription}
          onSubscriptionUpdated={setSubscription}
          uiLang={preferences.uiLang}
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

      {/* Cookie Consent Notice (GDPR/ePrivacy compliant) */}
      {showCookieConsent && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 p-3.5 shadow-lg backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:px-6 dark:border-slate-800 dark:bg-slate-900/95">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            LingoTwice использует локальное хранилище браузера для сохранения ваших книг, словаря и прогресса интервального повторения.
          </p>
          <div className="mt-2 flex items-center gap-2 sm:mt-0 shrink-0">
            <button
              onClick={() => setLegalPage('privacy')}
              className="text-xs text-slate-500 underline hover:text-slate-800 dark:hover:text-slate-200 mr-2"
            >
              Подробнее
            </button>
            <button
              onClick={acceptCookies}
              className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
            >
              Принять
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
