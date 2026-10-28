/**
 * LingoTwice Type Definitions
 */

export type ReadingMode = 'parallel' | 'immersion' | 'recall';
export type SplitOrientation = 'horizontal' | 'vertical';
export type ReadingTheme = 'light' | 'dark' | 'sepia';
export type InterfaceLanguage =
  | 'ru'
  | 'uk'
  | 'en'
  | 'de'
  | 'es'
  | 'fr'
  | 'it'
  | 'pl'
  | 'tr'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'pt'
  | 'ar'
  | 'nl'
  | 'sv'
  | 'he';

export interface AlignedPassage {
  id: string;
  sourceText: string;
  targetText?: string;
  translations?: Record<string, string>; // Pre-translated paragraph text by language code ('ru', 'de', 'en', 'uk', 'fr', 'es', 'it', etc.)
  order: number;
  notes?: string;
  isEdited?: boolean;
}

export interface ReadingDocument {
  id: string;
  title: string;
  author?: string;
  sourceLang: string;
  targetLang: string;
  passages: AlignedPassage[];
  translations?: Record<string, string[]>; // Pre-translated paragraphs array mapped by target language code ('ru', 'de', 'en', 'uk', 'fr', 'es', 'it', etc.)
  coverImage?: string;
  sourceUrl?: string;
  titleTranslations?: Partial<Record<InterfaceLanguage | string, string>>;
  category: 'literature' | 'science' | 'news' | 'dialogue' | 'philosophy' | 'custom' | 'method';
  createdAt: number;
  lastReadAt: number;
  readingProgress: number; // 0 to 100%
  lastActivePassageId?: string;
  wordCount: number;
  isSample?: boolean;
}

export interface WordGrammarInfo {
  partOfSpeech?: string;
  gender?: 'der (m)' | 'die (f)' | 'das (n)' | 'm' | 'f' | 'n' | string;
  plural?: string;
  verbForms?: string;
  aspect?: string;
  case?: string;
  cefrLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  phonetic?: string;
  synonyms?: string[];
  examples?: Array<{ source: string; target: string }>;
}

export interface VocabularyEntry {
  id: string;
  word: string;
  translation: string;
  contextSentence: string;
  contextTranslation?: string;
  sourceLang: string;
  targetLang: string;
  grammar?: WordGrammarInfo;
  notes?: string;
  // Spaced Repetition Data (SM-2 Hybrid)
  box: number; // 1 to 5
  interval: number; // days
  repetitionCount: number;
  easeFactor: number; // default 2.5
  nextReviewDate: number; // timestamp
  lastReviewedDate?: number;
  correctCount: number;
  incorrectCount: number;
  createdAt: number;
}

export interface ReadingPreferences {
  fontSize: number; // 14 to 26 px
  lineHeight: 'normal' | 'relaxed' | 'loose';
  theme: ReadingTheme;
  splitOrientation: SplitOrientation;
  syncScroll: boolean;
  activeMode: ReadingMode;
  sourceLang: string;
  targetLang: string;
  uiLang: InterfaceLanguage;
  speechRate: number; // 0.75, 1.0, 1.25
  preferredVoice?: string;
  swapSides?: boolean;
}

export interface UserStats {
  streakDays: number;
  lastStreakDate: string; // YYYY-MM-DD
  totalReadingMinutes: number;
  totalWordsLearned: number;
  totalPassagesRead: number;
  dailyGoalMinutes: number;
  dailyGoalWords: number;
  todayReadingMinutes: number;
  todayWordsLearned: number;
}

export interface SubscriptionStatus {
  tier: 'free' | 'premium';
  isActive: boolean;
  expiresAt?: number;
  dailyTranslationsUsed: number;
  dailyTranslationsLimit: number; // Free: 20 passages, Premium: 1000
  wordsTranslatedToday: number;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface WordLookupResponse {
  word: string;
  translation: string;
  contextualMeaning: string;
  phonetic?: string;
  grammar?: WordGrammarInfo;
  examples: Array<{ source: string; target: string }>;
}
