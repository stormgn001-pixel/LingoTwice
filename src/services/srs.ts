/**
 * SuperMemo-2 (SM-2) Spaced Repetition Algorithm
 *
 * References:
 * - P.A. Wozniak, "Optimization of learning" (1990)
 * - Leitner Box mapping for progressive mastery tracking
 */

import { VocabularyEntry } from '../types';

export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

const GRADE_VALUES: Record<ReviewGrade, number> = {
  again: 0, // complete blackout / incorrect
  hard: 3,  // correct response recalled with serious difficulty
  good: 4,  // correct response after hesitation
  easy: 5,  // perfect recall with minimal hesitation
};

export const calculateNextReview = (
  entry: VocabularyEntry,
  grade: ReviewGrade
): Partial<VocabularyEntry> => {
  const quality = GRADE_VALUES[grade];
  const now = Date.now();
  const ONE_DAY_MS = 86400000;

  let repetitionCount = entry.repetitionCount || 0;
  let easeFactor = entry.easeFactor || 2.5;
  let interval = entry.interval || 1;
  let box = entry.box || 1;

  if (quality >= 3) {
    // Successful recall
    if (repetitionCount === 0) {
      interval = 1;
    } else if (repetitionCount === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitionCount += 1;

    // Calculate new Ease Factor
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) {
      easeFactor = 1.3;
    }

    // Advance Leitner Box (1 to 5)
    if (interval >= 30) box = 5;
    else if (interval >= 14) box = 4;
    else if (interval >= 6) box = 3;
    else if (interval >= 2) box = 2;
    else box = 1;

    return {
      repetitionCount,
      easeFactor,
      interval,
      box,
      lastReviewedDate: now,
      nextReviewDate: now + interval * ONE_DAY_MS,
      correctCount: (entry.correctCount || 0) + 1,
    };
  } else {
    // Failed recall (Again) - reset interval
    repetitionCount = 0;
    interval = 1;
    box = 1;

    return {
      repetitionCount,
      easeFactor,
      interval,
      box,
      lastReviewedDate: now,
      nextReviewDate: now + ONE_DAY_MS,
      incorrectCount: (entry.incorrectCount || 0) + 1,
    };
  }
};

/**
 * Filter vocabulary items due for review today
 */
export const getDueVocabulary = (vocabulary: VocabularyEntry[]): VocabularyEntry[] => {
  const now = Date.now();
  return vocabulary.filter((item) => {
    return !item.nextReviewDate || item.nextReviewDate <= now;
  });
};
