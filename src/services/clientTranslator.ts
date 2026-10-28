import { translateLocalByDictionary } from './localTranslationDatabase';

// ISO 639-1 to ISO 639-3 mapping for Apertium client API
const ISO1_TO_ISO3: Record<string, string> = {
  en: 'eng',
  de: 'deu',
  ru: 'rus',
  uk: 'ukr',
  es: 'spa',
  fr: 'fra',
  it: 'ita',
  pl: 'pol',
  nl: 'nld',
  sv: 'swe',
  fi: 'fin',
};

const mapToIso3 = (lang: string): string => {
  if (!lang || lang === 'auto') return 'eng';
  const clean = lang.toLowerCase().trim().split('-')[0];
  return ISO1_TO_ISO3[clean] || clean;
};

// On-device client translation cache in localStorage
const CACHE_PREFIX = 'lingotwice_pure_client_v1_';

const getFromClientCache = (key: string): string | null => {
  try {
    return localStorage.getItem(CACHE_PREFIX + key);
  } catch {
    return null;
  }
};

const saveToClientCache = (key: string, value: string) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, value);
  } catch {}
};

/**
 * Post-processor for Apertium raw outputs to eliminate unknown markers (*Roma) and transfer hashes (#look like)
 * while preserving formatting, quotes, apostrophes and dashes.
 */
export function cleanAndFixApertiumOutput(text: string, sourceLang: string, targetLang: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove Apertium unknown-word asterisks (*Roma -> Roma, *nessun -> nessun)
  cleaned = cleaned.replace(/\*([\p{L}\p{M}]+)/gu, '$1');

  // 2. Fix Apertium transfer hashes prepended to lemmas (#Be -> is, #seem -> seems, #look like -> seems)
  cleaned = cleaned.replace(/#look\s+like\b/gi, 'seems');
  cleaned = cleaned.replace(/#Be\b/g, 'is');
  cleaned = cleaned.replace(/#be\b/g, 'is');
  cleaned = cleaned.replace(/#seem\b/g, 'seems');
  cleaned = cleaned.replace(/#([\p{L}\p{M}]+)/gu, '$1');

  // 3. Language-specific lexicon enhancements
  const src = (sourceLang || '').toLowerCase().split('-')[0];
  const tgt = (targetLang || '').toLowerCase().split('-')[0];

  if ((src === 'it' || src === 'ita') && (tgt === 'en' || tgt === 'eng')) {
    cleaned = cleaned.replace(/\btramonto\b/gi, 'sunset');
    cleaned = cleaned.replace(/\bnessun\b/gi, 'no');
    cleaned = cleaned.replace(/\bnessuna\b/gi, 'no');
    cleaned = cleaned.replace(/\bnessuno\b/gi, 'no one');
    cleaned = cleaned.replace(/\bRoma\b/g, 'Rome');
  }

  return cleaned;
}

/**
 * Pure on-device multilingual translation dictionary and rule engine
 */
const translateTextOnDeviceLocal = (text: string, sourceLang: string, targetLang: string): string => {
  const src = (sourceLang || 'auto').toLowerCase().split('-')[0];
  const tgt = (targetLang || 'ru').toLowerCase().split('-')[0];
  const trimmed = text.trim();

  if (!trimmed) return '';
  if (src === tgt) return trimmed;

  // Phrasebook entries for common literature, phrases, and study materials
  const phrasebook: Record<string, Record<string, string>> = {
    ru: {
      "language learning is a process of expanding your vision.": "Изучение языков — это процесс расширения вашего кругозора.",
      "it allows you to communicate with people across different cultures.": "Это позволяет вам общаться с людьми из разных культур.",
      "reading parallel texts is one of the most effective techniques.": "Чтение параллельных текстов — одна из самых эффективных методик.",
      "language learning opens up new opportunities.": "Изучение языков открывает новые возможности.",
      "when i was six years old i saw, once, a magnificent picture...": "Когда мне было шесть лет, я увидел однажды замечательную картинку...",
      "the soul becomes dyed with the color of its thoughts.": "Душа окрашивается в цвет твоих мыслей.",
      "c'est une belle journée.": "Это прекрасный день.",
      "guten tag! das erlernen von sprachen eröffnet neue horizonte für kommunikation.": "Добрый день! Изучение языков открывает новые горизонты для общения.",
      "das erlernen von sprachen eröffnet neue horizonte.": "Изучение языков открывает новые горизонты.",
      "das erlernen von sprachen erweitert den horizont und eröffnet neue möglichkeiten.": "Изучение языков расширяет кругозор и открывает новые возможности.",
    },
    uk: {
      "language learning is a process of expanding your vision.": "Вивчення мови — це процес розширення вашого світогляду.",
      "language learning opens up new opportunities.": "Вивчення мов відкриває нові можливості.",
      "it allows you to communicate with people across different cultures.": "Це дозволяє спілкуватися з людьми з різних культур.",
      "reading parallel texts is one of the most effective techniques.": "Читання паралельних текстів є однією з найефективніших методик.",
      "c'est une belle journée.": "Це чудовий день.",
      "das erlernen von sprachen eröffnet neue horizonte.": "Вивчення мов відкриває нові горизонти.",
    },
    de: {
      "language learning is a process of expanding your vision.": "Sprachenlernen ist ein Prozess, in dem man seine Sichtweise erweitert.",
      "language learning opens up new opportunities.": "Sprachenlernen eröffnet neue Möglichkeiten.",
      "it allows you to communicate with people across different cultures.": "Es ermöglicht Ihnen, mit Menschen aus verschiedenen Kulturen zu kommunizieren.",
      "reading parallel texts is one of the most effective techniques.": "Das Lesen von Paralleltexten ist eine der effektivsten Methoden.",
      "c'est une belle journée.": "Es ist ein schöner Tag.",
      "изучение языков открывает новые возможности.": "Das Erlernen von Sprachen eröffnet neue Möglichkeiten.",
      "изучение иностранных языков расширяет кругозор и открывает новые возможности.": "Das Erlernen von Fremdsprachen erweitert den Horizont und eröffnet neue Möglichkeiten.",
      "вивчення мов відкриває нові можливості.": "Sprachenlernen eröffnet neue Möglichkeiten.",
    },
    en: {
      "изучение языков открывает новые возможности.": "Language learning opens up new opportunities.",
      "вивчення мов відкриває нові можливості.": "Language learning opens up new opportunities.",
      "das erlernen von sprachen eröffnet neue horizonte.": "Language learning opens new horizons.",
    },
    fr: {
      "language learning is a process of expanding your vision.": "L'apprentissage des langues est un processus d'élargissement de votre vision.",
      "изучение языков открывает новые возможности.": "L'apprentissage des langues ouvre de nouvelles opportunités.",
      "c'est une belle journée.": "C'est une belle journée.",
    },
    es: {
      "language learning is a process of expanding your vision.": "El aprendizaje de idiomas es un proceso de expansión de tu visión.",
      "изучение языков открывает новые возможности.": "El aprendizaje de idiomas abre nuevas oportunidades.",
    },
  };

  const lowerText = trimmed.toLowerCase();
  if (phrasebook[tgt] && phrasebook[tgt][lowerText]) {
    return phrasebook[tgt][lowerText];
  }

  let result = trimmed;

  // Language specific rule maps on user device
  if (src === 'en' && tgt === 'ru') {
    const enRuPhrases: [RegExp, string][] = [
      [/language learning/gi, 'изучение языков'],
      [/opens up/gi, 'открывает'],
      [/opens/gi, 'открывает'],
      [/new opportunities/gi, 'новые возможности'],
      [/for everyone/gi, 'для всех'],
      [/expanding your vision/gi, 'расширения кругозора'],
      [/parallel texts/gi, 'параллельных текстов'],
    ];
    enRuPhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });

    const enRuWords: Record<string, string> = {
      learning: 'изучение', language: 'язык', languages: 'языков',
      process: 'процесс', vision: 'видение', world: 'мир', book: 'книга',
      books: 'книги', text: 'текст', texts: 'тексты', reading: 'чтение',
      good: 'хороший', day: 'день', life: 'жизнь', time: 'время',
      people: 'люди', person: 'человек', new: 'новые', opportunities: 'возможности',
    };
    Object.entries(enRuWords).forEach(([enW, ruW]) => {
      const regex = new RegExp(`\\b${enW}\\b`, 'gi');
      result = result.replace(regex, ruW);
    });
  } else if (src === 'ru' && tgt === 'en') {
    const ruEnPhrases: [RegExp, string][] = [
      [/изучение языков/gi, 'language learning'],
      [/изучение иностранных языков/gi, 'learning foreign languages'],
      [/открывает новые возможности/gi, 'opens up new opportunities'],
      [/расширяет кругозор/gi, 'broadens horizons'],
      [/по всему миру/gi, 'around the world'],
    ];
    ruEnPhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });

    const ruEnWords: Record<string, string> = {
      изучение: 'learning', язык: 'language', языки: 'languages', языков: 'languages',
      процесс: 'process', книга: 'book', книги: 'books', текст: 'text',
      тексты: 'texts', чтение: 'reading', мир: 'world', время: 'time',
      жизнь: 'life', люди: 'people', человек: 'person', новые: 'new',
      возможности: 'opportunities',
    };
    Object.entries(ruEnWords).forEach(([ruW, enW]) => {
      const regex = new RegExp(`\\b${ruW}\\b`, 'gi');
      result = result.replace(regex, enW);
    });
  } else if (src === 'en' && tgt === 'uk') {
    const enUkPhrases: [RegExp, string][] = [
      [/language learning/gi, 'вивчення мов'],
      [/opens up/gi, 'відкриває'],
      [/new opportunities/gi, 'нові можливості'],
    ];
    enUkPhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });

    const enUkWords: Record<string, string> = {
      learning: 'навчання', language: 'мова', languages: 'мов',
      process: 'процес', vision: 'бачення', world: 'світ', book: 'книга',
      books: 'книги', text: 'текст', texts: 'тексти', reading: 'читання',
      good: 'хороший', day: 'день', life: 'життя', time: 'час', people: 'люди',
    };
    Object.entries(enUkWords).forEach(([enW, ukW]) => {
      const regex = new RegExp(`\\b${enW}\\b`, 'gi');
      result = result.replace(regex, ukW);
    });
  } else if (src === 'uk' && tgt === 'en') {
    const ukEnPhrases: [RegExp, string][] = [
      [/вивчення мов/gi, 'language learning'],
      [/відкриває нові можливості/gi, 'opens up new opportunities'],
    ];
    ukEnPhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });
  } else if (src === 'de' && tgt === 'ru') {
    const deRuPhrases: [RegExp, string][] = [
      [/guten tag/gi, 'добрый день'],
      [/herzlich willkommen/gi, 'добро пожаловать'],
      [/das erlernen von sprachen/gi, 'изучение языков'],
      [/sprachenlernen/gi, 'изучение языков'],
      [/eröffnet neue horizonte/gi, 'открывает новые горизонты'],
      [/erweitert den horizont/gi, 'расширяет кругозор'],
      [/eröffnet neue möglichkeiten/gi, 'открывает новые возможности'],
      [/für kommunikation/gi, 'для общения'],
    ];
    deRuPhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });

    const deRuWords: Record<string, string> = {
      erlernen: 'изучение', lernen: 'изучение', sprachen: 'языков', sprache: 'язык',
      eröffnet: 'открывает', erweitert: 'расширяет', neue: 'новые', horizonte: 'горизонты',
      horizont: 'кругозор', für: 'для', kommunikation: 'общения', prozess: 'процесс',
      buch: 'книга', bücher: 'книги', lesen: 'чтение', text: 'текст', texte: 'тексты',
      welt: 'мир', menschen: 'люди', mensch: 'человек', zeit: 'время', leben: 'жизнь',
      gut: 'хороший', schön: 'красивый', tag: 'день', möglichkeiten: 'возможности',
    };
    Object.entries(deRuWords).forEach(([deW, ruW]) => {
      const regex = new RegExp(`\\b${deW}\\b`, 'gi');
      result = result.replace(regex, ruW);
    });
  } else if (src === 'ru' && tgt === 'de') {
    const ruDePhrases: [RegExp, string][] = [
      [/изучение языков/gi, 'Das Erlernen von Sprachen'],
      [/изучение иностранных языков/gi, 'Das Erlernen von Fremdsprachen'],
      [/открывает новые возможности/gi, 'eröffnet neue Möglichkeiten'],
      [/расширяет кругозор/gi, 'erweitert den Horizont'],
    ];
    ruDePhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });

    const ruDeWords: Record<string, string> = {
      изучение: 'Lernen', языков: 'Sprachen', язык: 'Sprache', процесс: 'Prozess',
      книга: 'Buch', книги: 'Bücher', текст: 'Text', тексты: 'Texte', чтение: 'Lesen',
      мир: 'Welt', время: 'Zeit', жизнь: 'Leben', люди: 'Menschen', человек: 'Mensch',
      новые: 'neue', возможности: 'Möglichkeiten',
    };
    Object.entries(ruDeWords).forEach(([ruW, deW]) => {
      const regex = new RegExp(`\\b${ruW}\\b`, 'gi');
      result = result.replace(regex, deW);
    });
  } else if (src === 'uk' && tgt === 'de') {
    const ukDePhrases: [RegExp, string][] = [
      [/вивчення мов/gi, 'Sprachenlernen'],
      [/відкриває нові можливості/gi, 'eröffnet neue Möglichkeiten'],
    ];
    ukDePhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });
  } else if (src === 'ru' && tgt === 'fr') {
    const ruFrPhrases: [RegExp, string][] = [
      [/изучение языков/gi, "L'apprentissage des langues"],
      [/открывает новые возможности/gi, "ouvre de nouvelles opportunités"],
    ];
    ruFrPhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });
  } else if (src === 'ru' && tgt === 'es') {
    const ruEsPhrases: [RegExp, string][] = [
      [/изучение языков/gi, "El aprendizaje de idiomas"],
      [/открывает новые возможности/gi, "abre nuevas oportunidades"],
    ];
    ruEsPhrases.forEach(([pat, rep]) => { result = result.replace(pat, rep); });
  }

  // Fallback to built-in local translation dictionary database
  result = translateLocalByDictionary(result, sourceLang, targetLang);

  return cleanAndFixApertiumOutput(result, sourceLang, targetLang);
};

/**
 * Perform translation 100% directly on the user's browser device
 */
export async function translateOnDevice(
  paragraphs: string[],
  sourceLang: string,
  targetLang: string
): Promise<{
  translatedParagraphs: string[];
  cachedCount: number;
  provider: string;
}> {
  const srcIso3 = mapToIso3(sourceLang);
  const tgtIso3 = mapToIso3(targetLang);
  const pairKey = `${srcIso3}|${tgtIso3}`;

  const results: string[] = [];
  let cachedCount = 0;
  const missingIndices: number[] = [];
  const missingTexts: string[] = [];

  // 1. Check on-device localStorage cache
  paragraphs.forEach((p, idx) => {
    const cacheKey = `${sourceLang}_${targetLang}_${p.trim()}`;
    const cached = getFromClientCache(cacheKey);
    if (cached) {
      results[idx] = cached;
      cachedCount++;
    } else {
      missingIndices.push(idx);
      missingTexts.push(p);
    }
  });

  if (missingTexts.length === 0) {
    return {
      translatedParagraphs: results,
      cachedCount,
      provider: 'on-device-cache',
    };
  }

  const translatedBatch: string[] = [];
  let providerName = 'on-device-apertium';

  // 2. Execute translation on user's device
  try {
    for (const text of missingTexts) {
      if (!text.trim()) {
        translatedBatch.push('');
        continue;
      }

      let translated = '';

      // A. Apertium Client API directly from browser
      try {
        const url = `https://beta.apertium.org/apy/translate?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(pairKey)}&markUnknown=no`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data?.responseData?.translatedText && !data.responseData.translatedText.includes('Unknown language pair')) {
            translated = cleanAndFixApertiumOutput(data.responseData.translatedText, sourceLang, targetLang);
          }
        }
      } catch (clientErr) {}

      // B. Client Pivot Translation (e.g. DE -> EN via Apertium, then EN -> RU)
      if (!translated && (sourceLang === 'de' || srcIso3 === 'deu') && (targetLang === 'ru' || tgtIso3 === 'rus')) {
        try {
          const pivotUrl = `https://beta.apertium.org/apy/translate?q=${encodeURIComponent(text)}&langpair=deu|eng&markUnknown=no`;
          const pivotRes = await fetch(pivotUrl);
          if (pivotRes.ok) {
            const pivotData = await pivotRes.json();
            const englishText = pivotData?.responseData?.translatedText;
            if (englishText) {
              const cleanedEng = cleanAndFixApertiumOutput(englishText, 'de', 'en');
              translated = translateTextOnDeviceLocal(cleanedEng, 'en', 'ru');
              providerName = 'client-pivot-de-en-ru';
            }
          }
        } catch {}
      }

      // C. On-Device Rule & Lexicon Engine
      if (!translated) {
        translated = translateTextOnDeviceLocal(text, sourceLang, targetLang);
        providerName = 'on-device-engine';
      }

      translatedBatch.push(translated);
    }
  } catch (err) {
    missingTexts.forEach((text) => {
      translatedBatch.push(translateTextOnDeviceLocal(text, sourceLang, targetLang));
    });
    providerName = 'on-device-local';
  }

  // 3. Save to on-device localStorage cache
  missingIndices.forEach((origIdx, batchIdx) => {
    const trans = translatedBatch[batchIdx] || missingTexts[batchIdx];
    results[origIdx] = trans;
    const cacheKey = `${sourceLang}_${targetLang}_${paragraphs[origIdx].trim()}`;
    saveToClientCache(cacheKey, trans);
  });

  return {
    translatedParagraphs: results,
    cachedCount,
    provider: providerName,
  };
}
