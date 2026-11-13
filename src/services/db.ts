import { auth, db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import {
  ReadingDocument,
  VocabularyEntry,
  UserStats,
  ReadingPreferences,
} from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
      isAnonymous: auth.currentUser?.isAnonymous ?? null,
      tenantId: auth.currentUser?.tenantId ?? null,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

function stripUndefined<T extends Record<string, any>>(obj: T): T {
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      clean[key] = value;
    }
  }
  return clean as T;
}

function sanitizeId(rawId: string): string {
  const cleaned = (rawId || '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
  return cleaned || `id_${Date.now()}`;
}

function sanitizeVocabularyEntry(entry: VocabularyEntry): VocabularyEntry {
  const id = sanitizeId(entry.id);
  const base: VocabularyEntry = {
    id,
    word: String(entry.word || '').slice(0, 200) || 'word',
    translation: String(entry.translation || '').slice(0, 500) || 'translation',
    contextSentence: String(entry.contextSentence || '').slice(0, 2000),
    sourceLang: String(entry.sourceLang || 'en').slice(0, 16),
    targetLang: String(entry.targetLang || 'ru').slice(0, 16),
    box: Math.min(5, Math.max(1, Number(entry.box) || 1)),
    interval: Math.min(36500, Math.max(0, Number(entry.interval) || 1)),
    repetitionCount: Math.max(0, Number(entry.repetitionCount) || 0),
    easeFactor: Math.min(5, Math.max(1, Number(entry.easeFactor) || 2.5)),
    nextReviewDate: Number(entry.nextReviewDate) || Date.now(),
    correctCount: Math.max(0, Number(entry.correctCount) || 0),
    incorrectCount: Math.max(0, Number(entry.incorrectCount) || 0),
    createdAt: Number(entry.createdAt) || Date.now(),
  };

  if (entry.contextTranslation !== undefined) {
    base.contextTranslation = String(entry.contextTranslation).slice(0, 2000);
  }
  if (entry.notes !== undefined) {
    base.notes = String(entry.notes).slice(0, 1000);
  }
  if (entry.grammar !== undefined) {
    base.grammar = stripUndefined(entry.grammar);
  }
  if (entry.lastReviewedDate !== undefined) {
    base.lastReviewedDate = Number(entry.lastReviewedDate);
  }

  return base;
}

function sanitizeStats(stats: UserStats): UserStats {
  return {
    streakDays: Math.min(100000, Math.max(0, Number(stats.streakDays) || 0)),
    lastStreakDate: String(stats.lastStreakDate || new Date().toISOString().slice(0, 10)).slice(0, 20),
    totalReadingMinutes: Math.max(0, Number(stats.totalReadingMinutes) || 0),
    totalWordsLearned: Math.max(0, Number(stats.totalWordsLearned) || 0),
    totalPassagesRead: Math.max(0, Number(stats.totalPassagesRead) || 0),
    dailyGoalMinutes: Math.min(1440, Math.max(1, Number(stats.dailyGoalMinutes) || 20)),
    dailyGoalWords: Math.min(1000, Math.max(1, Number(stats.dailyGoalWords) || 10)),
    todayReadingMinutes: Math.max(0, Number(stats.todayReadingMinutes) || 0),
    todayWordsLearned: Math.max(0, Number(stats.todayWordsLearned) || 0),
  };
}

function sanitizeDocument(docData: ReadingDocument): ReadingDocument {
  const id = sanitizeId(docData.id);
  const clean: ReadingDocument = {
    id,
    title: String(docData.title || 'Untitled').slice(0, 300),
    sourceLang: String(docData.sourceLang || 'en').slice(0, 16),
    targetLang: String(docData.targetLang || 'ru').slice(0, 16),
    category: docData.category || 'custom',
    createdAt: Number(docData.createdAt) || Date.now(),
    lastReadAt: Number(docData.lastReadAt) || Date.now(),
    readingProgress: Math.min(100, Math.max(0, Number(docData.readingProgress) || 0)),
    wordCount: Math.min(5000000, Math.max(0, Number(docData.wordCount) || 0)),
    isSample: Boolean(docData.isSample),
    passages: (Array.isArray(docData.passages) ? docData.passages : [])
      .slice(0, 2000)
      .map((p, idx) =>
        stripUndefined({
          id: String(p.id || `p-${idx + 1}`).slice(0, 128),
          order: Number(p.order ?? idx),
          sourceText: String(p.sourceText || ''),
          targetText: p.targetText !== undefined ? String(p.targetText) : '',
          notes: p.notes !== undefined ? String(p.notes).slice(0, 1000) : undefined,
          isEdited: p.isEdited !== undefined ? Boolean(p.isEdited) : undefined,
        })
      ),
  };

  if (docData.author !== undefined && docData.author.trim()) {
    clean.author = String(docData.author).slice(0, 200);
  }
  if (docData.level !== undefined) {
    clean.level = docData.level;
  }
  if (docData.coverImage !== undefined && docData.coverImage.length <= 500000) {
    clean.coverImage = docData.coverImage;
  }
  if (docData.sourceUrl !== undefined) {
    clean.sourceUrl = String(docData.sourceUrl).slice(0, 2048);
  }
  if (docData.lastActivePassageId !== undefined) {
    clean.lastActivePassageId = String(docData.lastActivePassageId).slice(0, 128);
  }
  if (docData.titleTranslations !== undefined) {
    clean.titleTranslations = stripUndefined(docData.titleTranslations);
  }

  return clean;
}

function sanitizePreferences(prefs: ReadingPreferences): ReadingPreferences {
  const clean: ReadingPreferences = {
    fontSize: Math.min(32, Math.max(12, Number(prefs.fontSize) || 17)),
    lineHeight: prefs.lineHeight || 'relaxed',
    theme: prefs.theme || 'dark',
    splitOrientation: prefs.splitOrientation || 'horizontal',
    syncScroll: Boolean(prefs.syncScroll),
    activeMode: prefs.activeMode || 'parallel',
    sourceLang: String(prefs.sourceLang || 'fr').slice(0, 16),
    targetLang: String(prefs.targetLang || 'ru').slice(0, 16),
    uiLang: prefs.uiLang || 'ru',
    speechRate: Math.min(2.5, Math.max(0.5, Number(prefs.speechRate) || 1.0)),
    swapSides: Boolean(prefs.swapSides),
  };
  if (prefs.preferredVoice !== undefined) {
    clean.preferredVoice = String(prefs.preferredVoice).slice(0, 200);
  }
  return clean;
}

export const dbService = {
  // Vocabulary
  async getVocabulary(userId: string): Promise<VocabularyEntry[]> {
    const path = `users/${userId}/vocabulary`;
    try {
      const snapshot = await getDocs(collection(db, 'users', userId, 'vocabulary'));
      return snapshot.docs.map((d) => d.data() as VocabularyEntry);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },
  async saveVocabularyEntry(userId: string, entry: VocabularyEntry) {
    const sanitized = sanitizeVocabularyEntry(entry);
    const path = `users/${userId}/vocabulary/${sanitized.id}`;
    try {
      await setDoc(doc(db, 'users', userId, 'vocabulary', sanitized.id), sanitized);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },
  async deleteVocabularyEntry(userId: string, entryId: string) {
    const safeId = sanitizeId(entryId);
    const path = `users/${userId}/vocabulary/${safeId}`;
    try {
      await deleteDoc(doc(db, 'users', userId, 'vocabulary', safeId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Stats
  async getStats(userId: string): Promise<UserStats | null> {
    const path = `users/${userId}/stats/data`;
    try {
      const statsDoc = await getDoc(doc(db, 'users', userId, 'stats', 'data'));
      return statsDoc.exists() ? (statsDoc.data() as UserStats) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },
  async saveStats(userId: string, stats: UserStats) {
    const sanitized = sanitizeStats(stats);
    const path = `users/${userId}/stats/data`;
    try {
      await setDoc(doc(db, 'users', userId, 'stats', 'data'), sanitized);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  // Documents
  async getDocuments(userId: string): Promise<ReadingDocument[]> {
    const path = `users/${userId}/documents`;
    try {
      const snapshot = await getDocs(collection(db, 'users', userId, 'documents'));
      return snapshot.docs.map((d) => d.data() as ReadingDocument);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },
  async saveDocument(userId: string, docData: ReadingDocument) {
    const sanitized = sanitizeDocument(docData);
    const path = `users/${userId}/documents/${sanitized.id}`;
    try {
      await setDoc(doc(db, 'users', userId, 'documents', sanitized.id), sanitized);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },
  async deleteDocument(userId: string, docId: string) {
    const safeId = sanitizeId(docId);
    const path = `users/${userId}/documents/${safeId}`;
    try {
      await deleteDoc(doc(db, 'users', userId, 'documents', safeId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Preferences
  async getPreferences(userId: string): Promise<ReadingPreferences | null> {
    const path = `users/${userId}/preferences/data`;
    try {
      const prefDoc = await getDoc(doc(db, 'users', userId, 'preferences', 'data'));
      return prefDoc.exists() ? (prefDoc.data() as ReadingPreferences) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },
  async savePreferences(userId: string, prefs: ReadingPreferences) {
    const sanitized = sanitizePreferences(prefs);
    const path = `users/${userId}/preferences/data`;
    try {
      await setDoc(doc(db, 'users', userId, 'preferences', 'data'), sanitized);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },
};
