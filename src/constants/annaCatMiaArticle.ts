import { ReadingDocument } from '../types';
import { ANNA_CAT_MIA_PART1 } from './annaCatMiaPart1';
import { ANNA_CAT_MIA_PART2 } from './annaCatMiaPart2';

export const ANNA_CAT_MIA_ARTICLE: ReadingDocument = {
  id: 'anna_cat_mia_a1_001',
  title: 'Кошка Мия (Уровень A1)',
  author: 'LingoTwice Stories',
  sourceLang: 'ru',
  targetLang: 'en',
  category: 'dialogue',
  level: 'A1',
  createdAt: 1715070000000,
  lastReadAt: Date.now(),
  readingProgress: 0,
  wordCount: 935,
  isSample: true,
  coverImage: '/assets/images/anna_cat_mia_a1_1794835129183.jpg',
  titleTranslations: {
    ru: 'Кошка Мия (Уровень A1)',
    en: 'Mia the Cat (Level A1)',
    de: 'Die Katze Mia (Niveau A1)',
    uk: 'Кішка Мія (Рівень A1)',
    fr: 'Mia la chatte (Niveau A1)',
    es: 'La gata Mia (Nivel A1)',
    it: 'La gatta Mia (Livello A1)',
    pl: 'Kotka Mia (Poziom A1)',
    zh: '猫咪米娅 (A1级别)',
    ja: '猫のミア (レベルA1)',
    ko: '고양이 미아 (레벨 A1)',
    pt: 'A gata Mia (Nível A1)',
    ar: 'القطة ميا (المستوى A1)',
    tr: 'Kedi Mia (A1 Seviyesi)',
    nl: 'De kat Mia (Niveau A1)',
    sv: 'Katten Mia (Nivå A1)',
    he: 'החתולה מיה (רמה A1)'
  },
  passages: [
    ...ANNA_CAT_MIA_PART1,
    ...ANNA_CAT_MIA_PART2
  ]
};
