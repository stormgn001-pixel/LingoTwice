import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { ReadingDocument, VocabularyEntry, UserStats, ReadingPreferences } from '../types';

export const dbService = {
  // Vocabulary
  async getVocabulary(userId: string): Promise<VocabularyEntry[]> {
    const snapshot = await getDocs(collection(db, 'users', userId, 'vocabulary'));
    return snapshot.docs.map(doc => doc.data() as VocabularyEntry);
  },
  async saveVocabularyEntry(userId: string, entry: VocabularyEntry) {
    await setDoc(doc(db, 'users', userId, 'vocabulary', entry.id), entry);
  },

  // Stats
  async getStats(userId: string): Promise<UserStats | null> {
    const statsDoc = await getDoc(doc(db, 'users', userId, 'stats', 'data'));
    return statsDoc.exists() ? (statsDoc.data() as UserStats) : null;
  },
  async saveStats(userId: string, stats: UserStats) {
    await setDoc(doc(db, 'users', userId, 'stats', 'data'), stats);
  },

  // Documents
  async getDocuments(userId: string): Promise<ReadingDocument[]> {
    const snapshot = await getDocs(collection(db, 'users', userId, 'documents'));
    return snapshot.docs.map(doc => doc.data() as ReadingDocument);
  },
  async saveDocument(userId: string, docData: ReadingDocument) {
    await setDoc(doc(db, 'users', userId, 'documents', docData.id), docData);
  },

  // Preferences
  async getPreferences(userId: string): Promise<ReadingPreferences | null> {
    const prefDoc = await getDoc(doc(db, 'users', userId, 'preferences', 'data'));
    return prefDoc.exists() ? (prefDoc.data() as ReadingPreferences) : null;
  },
  async savePreferences(userId: string, prefs: ReadingPreferences) {
    await setDoc(doc(db, 'users', userId, 'preferences', 'data'), prefs);
  }
};
