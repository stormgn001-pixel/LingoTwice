import { ReadingDocument } from '../types';
import { CLASSICS_PART1 } from './libraryClassics1';
import { CLASSICS_PART2 } from './libraryClassics2';
import { CLASSICS_PART3 } from './libraryClassics3';
import { SCIENCE_DOCUMENTS } from './libraryScience';
import { DIALOGUE_DOCUMENTS } from './libraryDialogues';

export const SAMPLE_DOCUMENTS: ReadingDocument[] = [
  ...CLASSICS_PART1,
  ...CLASSICS_PART2,
  ...CLASSICS_PART3,
  ...SCIENCE_DOCUMENTS,
  ...DIALOGUE_DOCUMENTS,
];
