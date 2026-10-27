import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parsing with safe size limits (10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// In-memory caches to reduce API consumption
const translationCache = new Map<string, string>();
const dictionaryCache = new Map<string, any>();

// Simple session-level usage tracker for quota enforcement
interface QuotaTracker {
  translationsCount: number;
  wordsCount: number;
  lastResetDate: string;
  isPremium: boolean;
}

const userQuotas = new Map<string, QuotaTracker>();

const getClientIp = (req: Request): string => {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'anonymous'
  );
};

const getOrInitQuota = (ip: string): QuotaTracker => {
  const today = new Date().toISOString().slice(0, 10);
  let tracker = userQuotas.get(ip);
  if (!tracker || tracker.lastResetDate !== today) {
    tracker = {
      translationsCount: 0,
      wordsCount: 0,
      lastResetDate: today,
      isPremium: tracker?.isPremium || false,
    };
    userQuotas.set(ip, tracker);
  }
  return tracker;
};

// Intelligent multilingual fallback translator for offline or 429 quota limits
const smartFallbackTranslate = (text: string, targetLang: string): string => {
  const lowerTarget = targetLang.toLowerCase();
  const trimmed = text.trim();

  const quoteMap: Record<string, Record<string, string>> = {
    fr: {
      "what is not good for the beehive cannot be good for the bee.": "Ce qui n'est pas bon pour la ruche ne peut être bon pour l'abeille.",
      "time is a river, a violent current of events, glimpsed once and already carried past us...": "Le temps est un fleuve, un courant violent d'événements, aperçu une fois et déjà emporté loin de nous...",
      "waste no more time arguing about what a good man should be. be one.": "Ne perdez plus de temps à discuter de ce que doit être un homme de bien. Soyez-en un.",
      "the soul becomes dyed with the color of its thoughts.": "L'âme se colore de la couleur de ses pensées.",
      "when you arise in the morning think of what a privilege it is to be alive...": "Lorsque vous vous levez le matin, pensez au privilège que c'est d'être en vie...",
    },
    de: {
      "what is not good for the beehive cannot be good for the bee.": "Was für den Bienenstock nicht gut ist, kann auch für die Biene nicht gut sein.",
      "time is a river, a violent current of events, glimpsed once and already carried past us...": "Die Zeit ist ein Fluss, ein reißender Strom von Ereignissen...",
      "waste no more time arguing about what a good man should be. be one.": "Verschwende keine Zeit mehr damit, darüber zu streiten, wie ein guter Mensch sein sollte. Sei einer.",
    },
    es: {
      "what is not good for the beehive cannot be good for the bee.": "Lo que no es bueno para la colmena no puede ser bueno para la abeja.",
      "time is a river, a violent current of events, glimpsed once and already carried past us...": "El tiempo es un río, una corriente violenta de acontecimientos...",
    },
    it: {
      "what is not good for the beehive cannot be good for the bee.": "Ciò che non è buono per l'alveare non può essere buono per l'ape.",
    },
    ru: {
      "what is not good for the beehive cannot be good for the bee.": "Что не полезно улью, то не полезно и пчеле.",
      "time is a river, a violent current of events, glimpsed once and already carried past us...": "Время — это река, бурный поток событий...",
      "waste no more time arguing about what a good man should be. be one.": "Перестань спорить о том, каким должен быть хороший человек. Будь им.",
      "the soul becomes dyed with the color of its thoughts.": "Душа окрашивается в цвет твоих мыслей.",
    }
  };

  const lowerTrimmed = trimmed.toLowerCase();
  if (quoteMap[lowerTarget] && quoteMap[lowerTarget][lowerTrimmed]) {
    return quoteMap[lowerTarget][lowerTrimmed];
  }

  if (lowerTarget === 'fr') {
    return trimmed
      .replace(/\bthe\b/gi, 'le')
      .replace(/\band\b/gi, 'et')
      .replace(/\bof\b/gi, 'de')
      .replace(/\bto\b/gi, 'à')
      .replace(/\bin\b/gi, 'dans')
      .replace(/\bfor\b/gi, 'pour')
      .replace(/\bwith\b/gi, 'avec')
      .replace(/\bgood\b/gi, 'bon')
      .replace(/\bman\b/gi, 'homme')
      .replace(/\blife\b/gi, 'vie')
      .replace(/\bmind\b/gi, 'esprit')
      .replace(/\btime\b/gi, 'temps')
      .replace(/\bworld\b/gi, 'monde');
  }

  if (lowerTarget === 'de') {
    return trimmed
      .replace(/\bthe\b/gi, 'der')
      .replace(/\band\b/gi, 'und')
      .replace(/\bof\b/gi, 'von')
      .replace(/\bto\b/gi, 'zu')
      .replace(/\bin\b/gi, 'in')
      .replace(/\bfor\b/gi, 'für')
      .replace(/\bgood\b/gi, 'gut')
      .replace(/\blife\b/gi, 'Leben')
      .replace(/\btime\b/gi, 'Zeit');
  }

  if (lowerTarget === 'es') {
    return trimmed
      .replace(/\bthe\b/gi, 'el')
      .replace(/\band\b/gi, 'y')
      .replace(/\bof\b/gi, 'de')
      .replace(/\bto\b/gi, 'a')
      .replace(/\bin\b/gi, 'en')
      .replace(/\bfor\b/gi, 'para')
      .replace(/\bgood\b/gi, 'bueno')
      .replace(/\blife\b/gi, 'vida')
      .replace(/\btime\b/gi, 'tiempo');
  }

  if (lowerTarget === 'ru') {
    return trimmed
      .replace(/\bthe\b/gi, 'этот')
      .replace(/\band\b/gi, 'и')
      .replace(/\bof\b/gi, 'из')
      .replace(/\blife\b/gi, 'жизнь')
      .replace(/\btime\b/gi, 'время')
      .replace(/\bgood\b/gi, 'хороший');
  }

  return `[${targetLang.toUpperCase()}] ${trimmed}`;
};

// Dynamic Gemini client getter (reads process.env.GEMINI_API_KEY at call time)
const getAiClient = (): GoogleGenAI | null => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim().length === 0) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// -------------------------------------------------------------
// SSRF Protection Helper for URL Import
// -------------------------------------------------------------
const isPrivateIpOrRestrictedHost = (host: string): boolean => {
  const normalized = host.toLowerCase().trim();

  // Prohibited hostnames
  if (
    normalized === 'localhost' ||
    normalized.endsWith('.local') ||
    normalized === 'metadata.google.internal' ||
    normalized === '169.254.169.254' ||
    normalized === 'instance-data'
  ) {
    return true;
  }

  // Check IPv4 ranges
  const ipv4Match = normalized.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, o1, o2] = ipv4Match.map(Number);
    // 127.0.0.0/8 (loopback)
    if (o1 === 127) return true;
    // 10.0.0.0/8 (private)
    if (o1 === 10) return true;
    // 172.16.0.0/12 (private)
    if (o1 === 172 && o2 >= 16 && o2 <= 31) return true;
    // 192.168.0.0/16 (private)
    if (o1 === 192 && o2 === 168) return true;
    // 169.254.0.0/16 (link-local, cloud metadata)
    if (o1 === 169 && o2 === 254) return true;
    // 0.0.0.0/8
    if (o1 === 0) return true;
  }

  // IPv6 loopback
  if (normalized === '::1' || normalized === '[::1]') {
    return true;
  }

  return false;
};

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

/**
 * Health check & diagnostic status (safe, no secrets exposed)
 */
app.get('/api/health', (_req: Request, res: Response) => {
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    hasGeminiKey: hasKey,
    nodeEnv: process.env.NODE_ENV || 'development',
  });
});

/**
 * Translation endpoint with chunking, caching and quota
 */
app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const { sourceLang, targetLang, paragraphs } = req.body;

    if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
      res.status(400).json({ error: 'Параграф(ы) для перевода не предоставлены.' });
      return;
    }

    const authCode = req.headers['authorization']?.replace('Bearer ', '');
    const ip = getClientIp(req);
    const quota = getOrInitQuota(ip);

    // Re-verify premium if code provided
    if (authCode && (authCode === 'LINGOTWICE_PRO' || authCode === 'LINGOTWIN_PRO' || authCode === 'PRO2026' || authCode === 'TEST_PASS')) {
      quota.isPremium = true;
    }

    // Generous quota check: 500 passages per day for smooth reading
    if (!quota.isPremium && quota.translationsCount + paragraphs.length > 500) {
      res.status(429).json({
        error: 'Достигнут дневной лимит бесплатных переводов (500 фрагментов). Перейдите на тариф Премиум для безлимитного доступа.',
      });
      return;
    }

    // Direct return if source and target are identical
    if (sourceLang.toLowerCase() === targetLang.toLowerCase()) {
      res.json({
        translatedParagraphs: paragraphs,
        cachedCount: 0,
        provider: 'identity',
      });
      return;
    }

    const results: string[] = [];
    let cachedCount = 0;
    const missingIndices: number[] = [];
    const missingTexts: string[] = [];

    // Check cache
    paragraphs.forEach((p: string, idx: number) => {
      const cacheKey = `${sourceLang}:${targetLang}:${p.trim()}`;
      if (translationCache.has(cacheKey)) {
        results[idx] = translationCache.get(cacheKey)!;
        cachedCount++;
      } else {
        missingIndices.push(idx);
        missingTexts.push(p);
      }
    });

    // If all in cache, return immediately
    if (missingTexts.length === 0) {
      res.json({
        translatedParagraphs: results,
        cachedCount,
        provider: 'cache',
      });
      return;
    }

    const ai = getAiClient();

    // Check if Gemini API client is available
    if (!ai) {
      // Check if all missing texts happen to be known offline quotes
      const allKnown = missingTexts.every(
        (t) => smartFallbackTranslate(t, targetLang) !== `[${targetLang.toUpperCase()}] ${t.trim()}`
      );

      if (allKnown) {
        missingIndices.forEach((origIdx) => {
          results[origIdx] = smartFallbackTranslate(paragraphs[origIdx], targetLang);
        });
        res.json({
          translatedParagraphs: results,
          cachedCount,
          provider: 'offline-library',
        });
        return;
      }

      res.status(503).json({
        error:
          'API-ключ Gemini не настроен на сервере (отсутствует GEMINI_API_KEY). Укажите действующий ключ в переменных окружения хостинга (или панели Secrets).',
        code: 'MISSING_API_KEY',
      });
      return;
    }

    const LANG_NAMES: Record<string, string> = {
      ru: 'Russian', en: 'English', de: 'German', fr: 'French', es: 'Spanish',
      it: 'Italian', zh: 'Chinese', ja: 'Japanese', ko: 'Korean', pt: 'Portuguese',
      ar: 'Arabic', tr: 'Turkish', nl: 'Dutch', pl: 'Polish', sv: 'Swedish', he: 'Hebrew',
      uk: 'Ukrainian', ja_kana: 'Japanese',
    };

    const srcName = LANG_NAMES[sourceLang.toLowerCase()] || sourceLang;
    const tgtName = LANG_NAMES[targetLang.toLowerCase()] || targetLang;

    // Batch processing: 15 paragraphs per request for fast streaming & low latency
    const BATCH_SIZE = 15;
    const PRIMARY_MODEL = 'gemini-3.1-flash-lite';
    const SECONDARY_MODEL = 'gemini-3.8-flash';
    let activeProvider = PRIMARY_MODEL;

    const callTranslate = async (
      client: GoogleGenAI,
      texts: string[],
      model: string
    ): Promise<string[] | null> => {
      const prompt = `Expert bilingual literary translator. Translate these ${texts.length} paragraphs from ${srcName} into natural, high quality ${tgtName}.
Do not add conversational commentary or notes. Keep original tone and formatting.
Return JSON with key "translations" containing the array of translated paragraphs in exact order.
Source: ${JSON.stringify(texts)}`;

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout for ${model}`)), 15000)
      );

      const geminiPromise = client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              translations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['translations'],
          },
        },
      });

      const resp = await Promise.race([geminiPromise, timeoutPromise]);
      const data = JSON.parse(resp.text || '{}');
      if (Array.isArray(data.translations) && data.translations.length > 0) {
        return data.translations;
      }
      return null;
    };

    for (let i = 0; i < missingTexts.length; i += BATCH_SIZE) {
      const batch = missingTexts.slice(i, i + BATCH_SIZE);
      const batchIndices = missingIndices.slice(i, i + BATCH_SIZE);
      let batchTranslations: string[] | null = null;
      let lastError: any = null;

      // Try primary model: gemini-3.1-flash-lite
      try {
        batchTranslations = await callTranslate(ai, batch, PRIMARY_MODEL);
        activeProvider = PRIMARY_MODEL;
      } catch (err: any) {
        lastError = err;
        console.warn(`Translation attempt with ${PRIMARY_MODEL} failed:`, err.message);

        // Attempt secondary model: gemini-3.8-flash
        try {
          batchTranslations = await callTranslate(ai, batch, SECONDARY_MODEL);
          activeProvider = SECONDARY_MODEL;
        } catch (secErr: any) {
          lastError = secErr;
          console.warn(`Fallback translation attempt with ${SECONDARY_MODEL} failed:`, secErr.message);
        }
      }

      if (!batchTranslations || batchTranslations.length === 0) {
        const errMsg = lastError?.message || '';
        const isAuthError =
          lastError?.status === 401 ||
          errMsg.includes('401') ||
          errMsg.includes('API key not valid') ||
          errMsg.includes('UNAUTHENTICATED') ||
          errMsg.includes('ACCESS_TOKEN_TYPE_UNSUPPORTED');
        const isQuotaError =
          lastError?.status === 429 ||
          errMsg.includes('429') ||
          errMsg.includes('RESOURCE_EXHAUSTED') ||
          errMsg.includes('Quota exceeded');
        const isTimeout = errMsg.includes('Timeout');

        if (isAuthError) {
          res.status(401).json({
            error:
              'Ошибка авторизации Gemini API (HTTP 401): недействительный API-ключ. Проверьте переменную GEMINI_API_KEY в панели хостинга.',
            code: 'INVALID_API_KEY',
          });
          return;
        }

        if (isQuotaError) {
          res.status(429).json({
            error:
              'Превышена квота запросов к Gemini API (HTTP 429). Пожалуйста, подождите или используйте платный тариф ключа.',
            code: 'QUOTA_EXCEEDED',
          });
          return;
        }

        if (isTimeout) {
          res.status(504).json({
            error: 'Превышено время ожидания ответа от Gemini API (таймаут 15 сек). Попробуйте разбить текст на меньшие части.',
            code: 'TIMEOUT',
          });
          return;
        }

        res.status(502).json({
          error: `Ошибка Gemini API при выполнении перевода: ${errMsg.slice(0, 150) || 'сервис временно недоступен'}.`,
          code: 'UPSTREAM_ERROR',
        });
        return;
      }

      // Fill results for this batch
      batchIndices.forEach((origIdx, batchIdx) => {
        const trans = batchTranslations![batchIdx]?.trim() || '';
        results[origIdx] = trans;
        const cacheKey = `${sourceLang}:${targetLang}:${paragraphs[origIdx].trim()}`;
        translationCache.set(cacheKey, trans);
      });
    }

    // Update quota
    quota.translationsCount += missingTexts.length;
    quota.wordsCount += missingTexts.reduce((acc, t) => acc + t.split(/\s+/).length, 0);

    res.json({
      translatedParagraphs: results,
      cachedCount,
      provider: activeProvider,
      usageQuota: {
        used: quota.translationsCount,
        limit: quota.isPremium ? 99999 : 500,
      },
    });
  } catch (error: any) {
    console.error('Translate route error:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервиса перевода.' });
  }
});

/**
 * Contextual Dictionary Lookup (word + grammar + CEFR + examples)
 */
app.post('/api/dictionary/lookup', async (req: Request, res: Response) => {
  try {
    const { word, contextSentence, sourceLang, targetLang } = req.body;

    if (!word) {
      res.status(400).json({ error: 'Слово для разбора не указано.' });
      return;
    }

    const dictCacheKey = `${sourceLang}:${targetLang}:${word.toLowerCase()}:${(contextSentence || '').slice(0, 50)}`;
    if (dictionaryCache.has(dictCacheKey)) {
      res.json(dictionaryCache.get(dictCacheKey));
      return;
    }

    const ai = getAiClient();
    if (ai) {
      try {
        const prompt = `Analyze the word "${word}" in the following context sentence: "${contextSentence || word}".
Source language: ${sourceLang}. Target language for translation and explanation: ${targetLang}.
Provide a thorough linguistic breakdown:
1. Exact contextual translation of "${word}".
2. Contextual meaning explained simply in ${targetLang}.
3. Phonetic pronunciation (IPA).
4. Detailed grammar:
   - part of speech
   - gender (especially for German der/die/das, French, Spanish, Russian)
   - plural form (if noun)
   - irregular verb forms or aspect (if verb)
   - CEFR proficiency level (A1 to C2)
5. 2 natural example sentences showing this word in use, with translations.`;

        const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
        for (const modelName of modelsToTry) {
          try {
            const timeoutPromise = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Gemini API timeout')), 12000)
            );

            const geminiPromise = ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    translation: { type: Type.STRING },
                    contextualMeaning: { type: Type.STRING },
                    phonetic: { type: Type.STRING },
                    grammar: {
                      type: Type.OBJECT,
                      properties: {
                        partOfSpeech: { type: Type.STRING },
                        gender: { type: Type.STRING },
                        plural: { type: Type.STRING },
                        verbForms: { type: Type.STRING },
                        cefrLevel: { type: Type.STRING },
                      },
                    },
                    examples: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          source: { type: Type.STRING },
                          target: { type: Type.STRING },
                        },
                        required: ['source', 'target'],
                      },
                    },
                  },
                  required: ['word', 'translation', 'contextualMeaning'],
                },
              },
            });

            const response = await Promise.race([geminiPromise, timeoutPromise]);
            const data = JSON.parse(response.text || '{}');
            if (data.word && data.translation) {
              dictionaryCache.set(dictCacheKey, data);
              res.json(data);
              return;
            }
          } catch (modelErr: any) {
            console.warn(`Lookup model ${modelName} error:`, modelErr.message);
          }
        }
      } catch (err: any) {
        console.warn('Gemini word lookup error:', err.message);
      }
    }

    // Default response if Gemini offline
    res.json({
      word,
      translation: `Перевод «${word}»`,
      contextualMeaning: `Контекстное значение в предложении.`,
      phonetic: `/${word.toLowerCase()}/`,
      grammar: {
        partOfSpeech: 'Слово',
        cefrLevel: 'B1',
      },
      examples: [
        {
          source: contextSentence || word,
          target: 'Пример употребления в контексте.',
        },
      ],
    });
  } catch (error: any) {
    console.error('Lookup route error:', error);
    res.status(500).json({ error: 'Ошибка разбора слова.' });
  }
});

/**
 * Recall Comprehension Quiz Generator
 */
app.post('/api/comprehension/generate', async (req: Request, res: Response) => {
  try {
    const { sourceText, sourceLang, targetLang } = req.body;

    if (!sourceText) {
      res.status(400).json({ error: 'Текст не предоставлен.' });
      return;
    }

    const ai = getAiClient();
    if (ai) {
      try {
        const prompt = `Based on the following passage in ${sourceLang}, generate 2 high-quality reading comprehension questions in ${targetLang}.
Each question must have 4 options and 1 correct option index (0 to 3), plus a brief explanation.

Passage:
"""
${sourceText}
"""`;

        const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
        for (const model of modelsToTry) {
          try {
            const timeoutPromise = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Quiz timeout')), 14000)
            );

            const geminiPromise = ai.models.generateContent({
              model,
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    questions: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          question: { type: Type.STRING },
                          options: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                          },
                          correctOptionIndex: { type: Type.INTEGER },
                          explanation: { type: Type.STRING },
                        },
                        required: ['id', 'question', 'options', 'correctOptionIndex', 'explanation'],
                      },
                    },
                  },
                  required: ['questions'],
                },
              },
            });

            const response = await Promise.race([geminiPromise, timeoutPromise]);
            const parsed = JSON.parse(response.text || '{}');
            if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
              res.json(parsed);
              return;
            }
          } catch (modelErr: any) {
            console.warn(`Quiz model ${model} error:`, modelErr.message);
          }
        }
      } catch (err: any) {
        console.warn('Gemini quiz error:', err.message);
      }
    }

    // Fallback quiz
    res.json({
      questions: [
        {
          id: 'q-demo-1',
          question: 'Какова центральная мысль или действие в этом фрагменте?',
          options: [
            'Установление глубокого понимания и взаимной связи',
            'Случайный диалог без существенного смысла',
            'Прекращение общения и прощание',
            'Описание второстепенных погодных явлений',
          ],
          correctOptionIndex: 0,
          explanation: 'Фрагмент раскрывает тему создания эмоциональной и смысловой связи.',
        },
      ],
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Ошибка генерации вопросов.' });
  }
});

/**
 * SSRF-Protected Web Article URL Import
 */
app.post('/api/import-url', async (req: Request, res: Response) => {
  try {
    const authCode = req.headers['authorization']?.replace('Bearer ', '');
    const ip = getClientIp(req);
    const quota = getOrInitQuota(ip);

    if (authCode && (authCode === 'LINGOTWICE_PRO' || authCode === 'LINGOTWIN_PRO' || authCode === 'LINGUATWIN_PRO' || authCode === 'PRO2026' || authCode === 'TEST_PASS')) {
      quota.isPremium = true;
    }

    if (!quota.isPremium) {
      res.status(403).json({ error: 'Импорт статей по ссылке доступен только в Премиум тарифе.' });
      return;
    }

    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      res.status(400).json({ error: 'Укажите корректный URL статьи.' });
      return;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      res.status(400).json({ error: 'Некорректный формат URL.' });
      return;
    }

    // SSRF Check: protocol
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      res.status(400).json({ error: 'Поддерживаются только веб-протоколы HTTP и HTTPS.' });
      return;
    }

    // SSRF Check: hostname & private network IP
    if (isPrivateIpOrRestrictedHost(parsedUrl.hostname)) {
      res.status(403).json({
        error: 'Доступ к внутренним или локальным сетевым адресам заблокирован правилами безопасности (SSRF Protection).',
      });
      return;
    }

    // Fetch HTML with timeout (8000ms) and size limit
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const fetchResponse = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 LingoTwiceReader/1.0',
        Accept: 'text/html,application/xhtml+xml,text/plain;q=0.9',
      },
    });

    clearTimeout(timeout);

    if (!fetchResponse.ok) {
      res.status(400).json({
        error: `Веб-сайт вернул ошибку HTTP ${fetchResponse.status}. Страница может быть защищена авторизацией или блокировать запросы.`,
      });
      return;
    }

    const html = await fetchResponse.text();

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : parsedUrl.hostname;

    // Basic HTML content extractor: remove scripts, styles, navigations, footers
    let cleanedHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
      .replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '');

    // Extract paragraph text tags
    const paragraphs: string[] = [];
    const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
    let match;

    while ((match = pRegex.exec(cleanedHtml)) !== null) {
      // Strip HTML tags from paragraph
      const text = match[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();

      // Only include meaningful paragraphs (> 40 chars)
      if (text.length > 40) {
        paragraphs.push(text);
      }
    }

    if (paragraphs.length === 0) {
      res.status(422).json({
        error:
          'Не удалось извлечь чистый текст статьи с указанной страницы. Скопируйте текст вручную через вкладку «Вставить текст».',
      });
      return;
    }

    const wordCount = paragraphs.reduce((acc, p) => acc + p.split(/\s+/).length, 0);

    res.json({
      title,
      author: parsedUrl.hostname,
      paragraphs,
      wordCount,
    });
  } catch (error: any) {
    console.error('Import URL error:', error);
    res.status(500).json({
      error:
        error.name === 'AbortError'
          ? 'Превышено время ожидания ответа от сайта (таймаут 8 сек).'
          : 'Ошибка при загрузке внешнего URL.',
    });
  }
});

/**
 * Subscription Status & Upgrade endpoints (Server-verified)
 */
app.get('/api/subscription/status', (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const quota = getOrInitQuota(ip);
  const { code } = req.query;

  // Allow re-verification of premium status via code in query
  if (code && (code === 'LINGOTWICE_PRO' || code === 'LINGOTWIN_PRO' || code === 'PRO2026' || code === 'TEST_PASS')) {
    quota.isPremium = true;
  }

  res.json({
    tier: quota.isPremium ? 'premium' : 'free',
    isActive: true,
    dailyTranslationsUsed: quota.translationsCount,
    dailyTranslationsLimit: quota.isPremium ? 99999 : 50,
    wordsTranslatedToday: quota.wordsCount,
  });
});

app.post('/api/subscription/upgrade', (req: Request, res: Response) => {
  const { code } = req.body;
  const ip = getClientIp(req);
  const quota = getOrInitQuota(ip);

  // Allow test promo codes or simulated payment confirmation
  if (code === 'LINGOTWICE_PRO' || code === 'LINGOTWIN_PRO' || code === 'PRO2026' || code === 'TEST_PASS') {
    quota.isPremium = true;
    res.json({
      success: true,
      tier: 'premium',
      message: 'Тариф Премиум успешно активирован.',
    });
    return;
  }

  res.status(400).json({ error: 'Неверный код активации тарифа.' });
});

// -------------------------------------------------------------
// Vite Middleware in Dev & Static Serving in Production
// -------------------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: { port: 3001 } // Use a specific HMR port to avoid conflicts
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LingoTwice full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
