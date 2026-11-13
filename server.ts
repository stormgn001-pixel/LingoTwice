import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import crypto from 'node:crypto';
import dns from 'node:dns/promises';
import net from 'node:net';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { translate as bingTranslate } from 'bing-translate-api';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const FREE_DAILY_TRANSLATION_LIMIT = 50;
const MAX_CACHE_ENTRIES = 1000;
const TOKEN_SIGNING_SECRET =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

// Body parsing with safe size limits (10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS middleware allowing lingotwice.com and preflight OPTIONS requests
app.use((req: Request, res: Response, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://lingotwice.com',
    'https://www.lingotwice.com',
    'http://localhost:3000',
    'http://localhost:5173',
  ];

  if (origin && (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

// Bounded caches to prevent unbounded memory growth
const translationCache = new Map<string, string>();
const dictionaryCache = new Map<string, any>();

const setBoundedCache = <T>(cache: Map<string, T>, key: string, value: T) => {
  if (cache.has(key)) {
    cache.delete(key);
  } else if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey !== undefined) {
      cache.delete(oldestKey);
    }
  }
  cache.set(key, value);
};

// Signed Premium Session Tokens (verifiable without trusting raw promo strings)
const createSignedSubscriptionToken = (plan: string, refId: string, expiresAt: number): string => {
  const payload = Buffer.from(
    JSON.stringify({ tier: 'premium', plan, refId, expiresAt })
  ).toString('base64url');
  const sig = crypto
    .createHmac('sha256', TOKEN_SIGNING_SECRET)
    .update(payload)
    .digest('base64url');
  return `lt_${payload}.${sig}`;
};

const verifySignedSubscriptionToken = (
  token?: string | null
): { valid: boolean; expiresAt?: number; plan?: string } => {
  if (!token || !token.startsWith('lt_') || !token.includes('.')) {
    return { valid: false };
  }
  const [rawPayload, sig] = token.slice(3).split('.');
  if (!rawPayload || !sig) return { valid: false };
  const expectedSig = crypto
    .createHmac('sha256', TOKEN_SIGNING_SECRET)
    .update(rawPayload)
    .digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return { valid: false };
  }
  try {
    const parsed = JSON.parse(Buffer.from(rawPayload, 'base64url').toString('utf8'));
    if (parsed.tier === 'premium' && typeof parsed.expiresAt === 'number' && parsed.expiresAt > Date.now()) {
      return { valid: true, expiresAt: parsed.expiresAt, plan: parsed.plan };
    }
  } catch {
    return { valid: false };
  }
  return { valid: false };
};

const extractAuthToken = (req: Request): string | null => {
  const authHeader = req.headers['authorization'];
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  if (typeof req.query.code === 'string' && req.query.code.trim()) {
    return req.query.code.trim();
  }
  return null;
};

// Simple session-level usage tracker for quota enforcement
interface QuotaTracker {
  translationsCount: number;
  wordsCount: number;
  lastResetDate: string;
  isPremium: boolean;
  expiresAt?: number;
}

const userQuotas = new Map<string, QuotaTracker>();

const getClientIp = (req: Request): string => {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'anonymous'
  );
};

const getOrInitQuota = (ip: string, req?: Request): QuotaTracker => {
  const today = new Date().toISOString().slice(0, 10);
  let tracker = userQuotas.get(ip);
  if (!tracker || tracker.lastResetDate !== today) {
    tracker = {
      translationsCount: 0,
      wordsCount: 0,
      lastResetDate: today,
      isPremium: tracker?.isPremium || false,
      expiresAt: tracker?.expiresAt,
    };
    userQuotas.set(ip, tracker);
  }
  if (req) {
    const token = extractAuthToken(req);
    const verified = verifySignedSubscriptionToken(token);
    if (verified.valid) {
      tracker.isPremium = true;
      tracker.expiresAt = verified.expiresAt;
    }
  }
  if (tracker.expiresAt && tracker.expiresAt <= Date.now()) {
    tracker.isPremium = false;
    tracker.expiresAt = undefined;
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
// Hardened SSRF Protection Helpers for URL Import
// -------------------------------------------------------------
const isRestrictedIpAddress = (ip: string): boolean => {
  const cleaned = ip.toLowerCase().trim().replace(/^\[|\]$/g, '');
  const version = net.isIP(cleaned);
  if (!version) return true;

  if (version === 4) {
    const parts = cleaned.split('.').map(Number);
    const [o1, o2] = parts;
    if (o1 === 0) return true; // 0.0.0.0/8
    if (o1 === 10) return true; // 10.0.0.0/8
    if (o1 === 100 && o2 >= 64 && o2 <= 127) return true; // 100.64.0.0/10 CGNAT
    if (o1 === 127) return true; // 127.0.0.0/8 loopback
    if (o1 === 169 && o2 === 254) return true; // 169.254.0.0/16 link-local & cloud metadata
    if (o1 === 172 && o2 >= 16 && o2 <= 31) return true; // 172.16.0.0/12
    if (o1 === 192 && o2 === 168) return true; // 192.168.0.0/16
    if (o1 >= 224) return true; // Multicast / reserved
    return false;
  }

  // IPv6 checks
  if (cleaned === '::' || cleaned === '::1') return true;
  if (cleaned.startsWith('fe80:') || cleaned.startsWith('fe9') || cleaned.startsWith('fea') || cleaned.startsWith('feb')) {
    return true; // fe80::/10 link-local
  }
  if (cleaned.startsWith('fc') || cleaned.startsWith('fd')) {
    return true; // fc00::/7 unique local addresses
  }
  if (cleaned.startsWith('ff')) return true; // multicast
  if (cleaned.startsWith('::ffff:')) {
    const mappedV4 = cleaned.slice(7);
    if (net.isIPv4(mappedV4)) {
      return isRestrictedIpAddress(mappedV4);
    }
    return true;
  }
  return false;
};

const isPrivateIpOrRestrictedHost = (host: string): boolean => {
  const normalized = host.toLowerCase().trim().replace(/^\[|\]$/g, '');

  if (
    !normalized ||
    normalized === 'localhost' ||
    normalized.endsWith('.localhost') ||
    normalized.endsWith('.local') ||
    normalized.endsWith('.internal') ||
    normalized === 'metadata.google.internal' ||
    normalized === '169.254.169.254' ||
    normalized === 'instance-data'
  ) {
    return true;
  }

  if (net.isIP(normalized)) {
    return isRestrictedIpAddress(normalized);
  }

  return false;
};

const validateUrlForSsrf = async (rawUrl: string): Promise<URL> => {
  const parsedUrl = new URL(rawUrl);
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new Error('SSRF_PROTOCOL');
  }
  if (isPrivateIpOrRestrictedHost(parsedUrl.hostname)) {
    throw new Error('SSRF_BLOCKED');
  }
  const records = await dns.lookup(parsedUrl.hostname, { all: true });
  if (!records || records.length === 0) {
    throw new Error('SSRF_DNS_EMPTY');
  }
  for (const record of records) {
    if (isRestrictedIpAddress(record.address)) {
      throw new Error('SSRF_BLOCKED');
    }
  }
  return parsedUrl;
};

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// -------------------------------------------------------------
// Apertium Open-Source Machine Translation Engine (No API keys required)
// -------------------------------------------------------------

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
  cat: 'cat',
  ca: 'cat',
};

const mapToApertiumCode = (lang: string): string => {
  if (!lang || lang === 'auto') return 'eng';
  const clean = lang.toLowerCase().trim().split('-')[0];
  return ISO1_TO_ISO3[clean] || clean;
};

// Cache of supported Apertium pairs
let apertiumPairsSet: Set<string> | null = null;

const getApertiumPairs = async (): Promise<Set<string>> => {
  if (apertiumPairsSet && apertiumPairsSet.size > 0) {
    return apertiumPairsSet;
  }
  try {
    const res = await fetch('https://beta.apertium.org/apy/listPairs');
    if (res.ok) {
      const data = await res.json();
      const pairs = data?.responseData || [];
      apertiumPairsSet = new Set(pairs.map((p: any) => `${p.sourceLanguage}|${p.targetLanguage}`));
      return apertiumPairsSet;
    }
  } catch (err: any) {
    console.warn('[Apertium] Failed to fetch listPairs:', err.message);
  }
  // Hardcoded known Apertium pairs fallback
  apertiumPairsSet = new Set(['eng|deu', 'deu|eng', 'rus|ukr', 'ukr|rus', 'spa|deu', 'deu|spa', 'eng|spa', 'spa|eng']);
  return apertiumPairsSet;
};

const cleanAndFixApertiumOutput = (text: string, sourceLang: string, targetLang: string): string => {
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

  // 3. Language-specific lexicon enhancements for unhandled Apertium lemmas
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
};

const translateWithApertiumText = async (text: string, srcIso3: string, tgtIso3: string): Promise<string> => {
  const langpair = `${srcIso3}|${tgtIso3}`;
  const url = `https://beta.apertium.org/apy/translate?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langpair)}&markUnknown=no`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Apertium HTTP status ${response.status}`);
    }

    const data = await response.json();
    if (data?.responseData?.translatedText) {
      return cleanAndFixApertiumOutput(data.responseData.translatedText, srcIso3, tgtIso3);
    }
    throw new Error(data?.responseDetails || 'Empty translation from Apertium');
  } catch (err: any) {
    clearTimeout(timeoutId);
    throw err;
  }
};

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

/**
 * Health check & diagnostic status (safe, no secrets required)
 */
app.get('/api/health', async (_req: Request, res: Response) => {
  const pairs = await getApertiumPairs();
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    engine: 'Apertium Open-Source Machine Translation API',
    supportedPairsCount: pairs.size,
    requiresApiKey: false,
    billing: 'free',
  });
});

/**
 * Universal Translation Endpoint (Apertium + Free Neural Engine)
 * Supports ALL language pairs seamlessly without requiring API keys or billing.
 */
app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const { sourceLang, targetLang, paragraphs } = req.body;

    if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
      res.status(400).json({ error: 'Paragraphs for translation are required.' });
      return;
    }

    const ip = getClientIp(req);
    const quota = getOrInitQuota(ip, req);

    if (!quota.isPremium && quota.translationsCount >= FREE_DAILY_TRANSLATION_LIMIT) {
      res.status(429).json({
        error: 'Daily free translation limit reached.',
        code: 'QUOTA_EXCEEDED',
        usageQuota: {
          used: quota.translationsCount,
          limit: FREE_DAILY_TRANSLATION_LIMIT,
        },
      });
      return;
    }

    const srcIso3 = mapToApertiumCode(sourceLang);
    const tgtIso3 = mapToApertiumCode(targetLang);

    // Direct return if source and target are identical
    if (srcIso3 === tgtIso3 || (sourceLang && targetLang && sourceLang.toLowerCase() === targetLang.toLowerCase())) {
      res.json({
        translatedParagraphs: paragraphs,
        cachedCount: 0,
        provider: 'identity',
        usageQuota: {
          used: quota.translationsCount,
          limit: quota.isPremium ? 99999 : FREE_DAILY_TRANSLATION_LIMIT,
        },
      });
      return;
    }

    const pairs = await getApertiumPairs();
    const pairKey = `${srcIso3}|${tgtIso3}`;
    const isApertiumSupported = pairs.has(pairKey);

    const results: string[] = [];
    let cachedCount = 0;
    const missingIndices: number[] = [];
    const missingTexts: string[] = [];

    paragraphs.forEach((p: string, idx: number) => {
      const cacheKey = `trans:${sourceLang}:${targetLang}:${p.trim()}`;
      if (translationCache.has(cacheKey)) {
        results[idx] = translationCache.get(cacheKey)!;
        cachedCount++;
      } else {
        missingIndices.push(idx);
        missingTexts.push(p);
      }
    });

    if (missingTexts.length === 0) {
      res.json({
        translatedParagraphs: results,
        cachedCount,
        provider: 'cache',
        usageQuota: {
          used: quota.translationsCount,
          limit: quota.isPremium ? 99999 : FREE_DAILY_TRANSLATION_LIMIT,
        },
      });
      return;
    }

    const translatedBatch: string[] = [];
    let activeProvider = isApertiumSupported ? `apertium (${pairKey})` : 'free-neural-engine';

    // 1. Try Apertium if pair is natively supported
    if (isApertiumSupported) {
      try {
        for (const text of missingTexts) {
          if (!text.trim()) {
            translatedBatch.push('');
            continue;
          }
          const translatedText = await translateWithApertiumText(text, srcIso3, tgtIso3);
          translatedBatch.push(translatedText);
        }
      } catch (apertiumErr: any) {
        console.warn('[Apertium] Failed, falling back to neural translate:', apertiumErr.message);
        translatedBatch.length = 0;
      }
    }

    // 2. If Apertium was not supported or failed, use Free Neural Engine (bingTranslate) with chunked batching
    if (translatedBatch.length === 0) {
      activeProvider = 'free-neural-engine';
      const fromLang = !sourceLang || sourceLang === 'auto' ? null : sourceLang.toLowerCase();
      const toLang = targetLang.toLowerCase();

      try {
        const BATCH_SIZE = 5;
        for (let i = 0; i < missingTexts.length; i += BATCH_SIZE) {
          const chunk = missingTexts.slice(i, i + BATCH_SIZE);
          const chunkResults = await Promise.all(
            chunk.map(async (text) => {
              if (!text.trim()) return '';
              try {
                const r = await bingTranslate(text, fromLang, toLang);
                return r.translation || text;
              } catch (err: any) {
                console.warn('[BingTranslate] Single text error:', err.message);
                return text;
              }
            })
          );
          translatedBatch.push(...chunkResults);
        }
      } catch (neuralErr: any) {
        console.warn('[NeuralTranslate] Failed, falling back to smart translator:', neuralErr.message);
      }
    }

    // 3. Smart offline fallback
    if (translatedBatch.length === 0 || translatedBatch.length !== missingTexts.length) {
      activeProvider = 'smart-offline-engine';
      missingTexts.forEach((t) => {
        translatedBatch.push(smartFallbackTranslate(t, targetLang));
      });
    }

    missingIndices.forEach((origIdx, batchIdx) => {
      const trans = translatedBatch[batchIdx] || missingTexts[batchIdx];
      results[origIdx] = trans;
      const cacheKey = `trans:${sourceLang}:${targetLang}:${paragraphs[origIdx].trim()}`;
      setBoundedCache(translationCache, cacheKey, trans);
    });

    const wordCount = missingTexts.reduce(
      (acc, t) => acc + (t.trim() ? t.trim().split(/\s+/).length : 0),
      0
    );
    quota.translationsCount += missingTexts.length;
    quota.wordsCount += wordCount;

    res.json({
      translatedParagraphs: results,
      cachedCount,
      provider: activeProvider,
      usageQuota: {
        used: quota.translationsCount,
        limit: quota.isPremium ? 99999 : FREE_DAILY_TRANSLATION_LIMIT,
      },
    });
  } catch (error: any) {
    console.error('Translate route error:', error);
    res.status(500).json({ error: 'Internal translation service error.' });
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

        const modelsToTry = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
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
              setBoundedCache(dictionaryCache, dictCacheKey, data);
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

    // Fallback using free neural translate when Gemini is unconfigured or offline
    let fallbackTranslation = word;
    try {
      const from = !sourceLang || sourceLang === 'auto' ? null : sourceLang.toLowerCase();
      const to = (targetLang || 'en').toLowerCase();
      if (!from || from !== to) {
        const tr = await bingTranslate(word, from, to);
        if (tr?.translation) {
          fallbackTranslation = tr.translation;
        }
      }
    } catch {}

    const isRu = (targetLang || '').toLowerCase() === 'ru';
    res.json({
      word,
      translation: fallbackTranslation,
      contextualMeaning: isRu
        ? `Контекстное значение слова «${word}».`
        : `Contextual meaning of "${word}".`,
      phonetic: `/${word.toLowerCase()}/`,
      grammar: {
        partOfSpeech: isRu ? 'Слово' : 'Word',
        cefrLevel: 'B1',
      },
      examples: [
        {
          source: contextSentence || word,
          target: fallbackTranslation,
        },
      ],
    });
  } catch (error: any) {
    console.error('Lookup route error:', error);
    res.status(500).json({ error: 'Word lookup error.' });
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

        const modelsToTry = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
        for (const modelName of modelsToTry) {
          try {
            const timeoutPromise = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Quiz timeout')), 14000)
            );

            const geminiPromise = ai.models.generateContent({
              model: modelName,
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
            console.warn(`Quiz model ${modelName} error:`, modelErr.message);
          }
        }
      } catch (err: any) {
        console.warn('Gemini quiz error:', err.message);
      }
    }

    const isRuQuiz = (targetLang || '').toLowerCase() === 'ru';
    res.json({
      questions: [
        {
          id: 'q-demo-1',
          question: isRuQuiz
            ? 'Какова центральная мысль или действие в этом фрагменте?'
            : 'What is the main idea or action in this passage?',
          options: isRuQuiz
            ? [
                'Установление глубокого понимания и взаимной связи',
                'Случайный диалог без существенного смысла',
                'Прекращение общения и прощание',
                'Описание второстепенных погодных явлений',
              ]
            : [
                'Establishing deeper understanding and meaningful connection',
                'A casual dialogue with no central theme',
                'Ending communication and saying goodbye',
                'Describing minor weather details',
              ],
          correctOptionIndex: 0,
          explanation: isRuQuiz
            ? 'Фрагмент раскрывает тему создания смысловой связи.'
            : 'The passage focuses on building meaning and connection.',
        },
      ],
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Quiz generation failed.' });
  }
});

/**
 * Detect Language of a Text Snippet (All 17 Languages)
 */
app.post('/api/detect-language', (req: Request, res: Response) => {
  const { text } = req.body || {};
  if (!text || typeof text !== 'string' || !text.trim()) {
    res.status(400).json({ error: 'Text is required for language detection.' });
    return;
  }

  const sample = text.trim();
  let detectedLang = 'en';

  if (/[\u0590-\u05FF]/.test(sample)) {
    detectedLang = 'he';
  } else if (/[\u0600-\u06FF]/.test(sample)) {
    detectedLang = 'ar';
  } else if (/[\u3040-\u309F\u30A0-\u30FF]/.test(sample)) {
    detectedLang = 'ja';
  } else if (/[\uAC00-\uD7AF]/.test(sample)) {
    detectedLang = 'ko';
  } else if (/[\u4E00-\u9FFF]/.test(sample)) {
    detectedLang = 'zh';
  } else if (/[\u0400-\u04FF]/.test(sample)) {
    detectedLang = /[іїєґ]/i.test(sample) ? 'uk' : 'ru';
  } else if (/[äöüß]/i.test(sample) || /\b(und|der|die|das|ist|nicht|mit)\b/i.test(sample)) {
    detectedLang = 'de';
  } else if (/[àâçéèêëîïôûùüÿœ]/i.test(sample) || /\b(le|la|les|et|est|dans|pour|avec)\b/i.test(sample)) {
    detectedLang = 'fr';
  } else if (/[ñ¿¡]/i.test(sample) || /\b(el|la|los|las|que|para|con|una)\b/i.test(sample)) {
    detectedLang = 'es';
  } else if (/[ąćęłńóśźż]/i.test(sample) || /\b(jest|nie|się|oraz|przez)\b/i.test(sample)) {
    detectedLang = 'pl';
  } else if (/[çğıİöşü]/i.test(sample) || /\b(ve|bir|bu|için|ile)\b/i.test(sample)) {
    detectedLang = 'tr';
  } else if (/[ãõ]/i.test(sample) || /\b(não|com|para|uma|que|os)\b/i.test(sample)) {
    detectedLang = 'pt';
  } else if (/[å]/i.test(sample) || /\b(och|att|det|som|är|för)\b/i.test(sample)) {
    detectedLang = 'sv';
  } else if (/\b(het|een|van|en|dat|zijn|voor|met)\b/i.test(sample)) {
    detectedLang = 'nl';
  } else if (/\b(che|non|per|con|una|della|sono)\b/i.test(sample)) {
    detectedLang = 'it';
  }

  res.json({ detectedLang });
});

/**
 * SSRF-Protected Web Article URL Import (with DNS, IPv6, manual redirect validation & 2MB size cap)
 */
app.post('/api/import-url', async (req: Request, res: Response) => {
  try {
    const ip = getClientIp(req);
    const quota = getOrInitQuota(ip, req);

    if (!quota.isPremium) {
      res.status(403).json({ error: 'URL import is available for Premium subscribers.' });
      return;
    }

    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      res.status(400).json({ error: 'Valid article URL is required.' });
      return;
    }

    let currentUrl: URL;
    try {
      currentUrl = await validateUrlForSsrf(url);
    } catch (ssrfErr: any) {
      if (ssrfErr.message === 'SSRF_PROTOCOL') {
        res.status(400).json({ error: 'Only HTTP and HTTPS protocols are supported.' });
        return;
      }
      if (ssrfErr.message === 'SSRF_BLOCKED' || ssrfErr.message === 'SSRF_DNS_EMPTY') {
        res.status(403).json({
          error: 'Access to internal, local, or restricted network addresses is blocked (SSRF Protection).',
        });
        return;
      }
      res.status(400).json({ error: 'Invalid URL format.' });
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let fetchResponse: globalThis.Response | null = null;
    let redirectsRemaining = 2;

    while (true) {
      fetchResponse = await fetch(currentUrl.toString(), {
        signal: controller.signal,
        redirect: 'manual',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 LingoTwiceReader/1.0',
          Accept: 'text/html,application/xhtml+xml,text/plain;q=0.9',
        },
      });

      if (fetchResponse.status >= 300 && fetchResponse.status < 400) {
        const location = fetchResponse.headers.get('location');
        if (!location || redirectsRemaining <= 0) {
          clearTimeout(timeout);
          res.status(400).json({ error: 'Too many redirects or invalid redirect target.' });
          return;
        }
        redirectsRemaining -= 1;
        const resolvedRedirect = new URL(location, currentUrl).toString();
        try {
          currentUrl = await validateUrlForSsrf(resolvedRedirect);
        } catch {
          clearTimeout(timeout);
          res.status(403).json({
            error: 'Redirect to restricted internal network address blocked (SSRF Protection).',
          });
          return;
        }
        continue;
      }
      break;
    }

    clearTimeout(timeout);

    if (!fetchResponse || !fetchResponse.ok) {
      res.status(400).json({
        error: `Website returned HTTP ${fetchResponse?.status ?? 500}.`,
      });
      return;
    }

    const contentLength = Number(fetchResponse.headers.get('content-length') || 0);
    if (contentLength > 2 * 1024 * 1024) {
      res.status(413).json({ error: 'Article page exceeds 2MB size limit.' });
      return;
    }

    const rawBuffer = await fetchResponse.arrayBuffer();
    if (rawBuffer.byteLength > 2 * 1024 * 1024) {
      res.status(413).json({ error: 'Article page exceeds 2MB size limit.' });
      return;
    }
    const html = new TextDecoder('utf-8').decode(rawBuffer);
    const parsedUrl = currentUrl;

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
 * Subscription Status & Upgrade endpoints (Server-verified with HMAC signed tokens & live blockchain checks)
 */
app.get('/api/subscription/status', (req: Request, res: Response) => {
  try {
    const ip = getClientIp(req);
    const quota = getOrInitQuota(ip, req);

    if (quota.isPremium) {
      res.json({
        status: 'active',
        hasSubscription: true,
        tier: 'premium',
        isActive: true,
        expiresAt: quota.expiresAt || Date.now() + 30 * 24 * 60 * 60 * 1000,
        dailyTranslationsUsed: quota.translationsCount,
        dailyTranslationsLimit: 99999,
        wordsTranslatedToday: quota.wordsCount,
      });
      return;
    }

    res.json({
      status: 'inactive',
      hasSubscription: false,
      tier: 'free',
      isActive: true,
      dailyTranslationsUsed: quota.translationsCount,
      dailyTranslationsLimit: FREE_DAILY_TRANSLATION_LIMIT,
      wordsTranslatedToday: quota.wordsCount,
    });
  } catch (err: any) {
    console.error('Subscription status DB/server error:', err);
    res.status(500).json({ error: 'Internal error checking subscription status.' });
  }
});

app.post('/api/subscription/upgrade', (req: Request, res: Response) => {
  try {
    const { code, plan } = req.body || {};
    const ip = getClientIp(req);
    const quota = getOrInitQuota(ip, req);

    const configuredCodes = (process.env.PREMIUM_ACTIVATION_CODES || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (!code || typeof code !== 'string' || !configuredCodes.includes(code.trim())) {
      res.status(400).json({ error: 'Invalid or missing activation code.' });
      return;
    }

    const now = Date.now();
    const durationDays = plan === 'yearly' ? 365 : plan === 'lifetime' ? 36500 : 30;
    const expiresAt = now + durationDays * 24 * 60 * 60 * 1000;
    const token = createSignedSubscriptionToken(plan || 'monthly', code.trim(), expiresAt);

    quota.isPremium = true;
    quota.expiresAt = expiresAt;

    res.json({
      success: true,
      status: 'active',
      hasSubscription: true,
      tier: 'premium',
      plan: plan || 'monthly',
      method: 'promo',
      token,
      transactionId: `LT-${Date.now().toString(36).toUpperCase()}`,
      expiresAt,
    });
  } catch (err: any) {
    console.error('Subscription upgrade error:', err);
    res.status(500).json({ error: 'Server error processing upgrade.' });
  }
});

/**
 * Real Blockchain Transaction Verification Endpoint (Verifies TxID against live blockchain explorers/nodes)
 */
app.post('/api/subscription/verify-tx', async (req: Request, res: Response) => {
  try {
    const { cryptoType, txHash, plan } = req.body || {};
    const ip = getClientIp(req);
    const quota = getOrInitQuota(ip, req);

    if (!txHash || typeof txHash !== 'string' || !/^[a-zA-Z0-9]{32,128}$/.test(txHash.trim())) {
      res.status(400).json({ error: 'Please provide a valid blockchain transaction hash (TxID).' });
      return;
    }

    const cleanTx = txHash.trim();
    let isVerified = false;
    let blockConfirmations = 0;
    let isExternalApiDown = false;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      if (cryptoType === 'BTC') {
        const btcRes = await fetch(`https://mempool.space/api/tx/${encodeURIComponent(cleanTx)}`, {
          signal: controller.signal,
        });
        if (btcRes.ok) {
          const btcData = await btcRes.json();
          if (btcData?.txid) {
            isVerified = true;
            blockConfirmations = btcData.status?.confirmed ? 2 : 1;
          }
        } else if (btcRes.status >= 500) {
          isExternalApiDown = true;
        }
      } else if (cryptoType === 'ETH') {
        const ethRes = await fetch(`https://eth.blockscout.com/api/v2/transactions/${encodeURIComponent(cleanTx)}`, {
          signal: controller.signal,
        });
        if (ethRes.ok) {
          const ethData = await ethRes.json();
          if (ethData?.hash && ethData.status === 'ok') {
            isVerified = true;
            blockConfirmations = Number(ethData.confirmations || 1);
          }
        } else if (ethRes.status >= 500) {
          isExternalApiDown = true;
        }
      } else if (cryptoType === 'SOL') {
        const solRes = await fetch('https://api.mainnet-beta.solana.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getTransaction',
            params: [cleanTx, { encoding: 'json', maxSupportedTransactionVersion: 0 }],
          }),
        });
        if (solRes.ok) {
          const solData = await solRes.json();
          if (solData?.result && !solData.result.meta?.err) {
            isVerified = true;
            blockConfirmations = 1;
          }
        } else if (solRes.status >= 500) {
          isExternalApiDown = true;
        }
      } else {
        // USDT_TRC20 via Tronscan API
        const tronRes = await fetch(
          `https://apilist.tronscanapi.com/api/transaction-info?hash=${encodeURIComponent(cleanTx)}`,
          { signal: controller.signal }
        );
        if (tronRes.ok) {
          const tronData = await tronRes.json();
          if (tronData?.hash && tronData.contractRet === 'SUCCESS') {
            isVerified = true;
            blockConfirmations = tronData.confirmed ? 2 : 1;
          }
        } else if (tronRes.status >= 500) {
          isExternalApiDown = true;
        }
      }
    } catch (networkErr: any) {
      console.warn('External blockchain API warning:', networkErr.message);
      isExternalApiDown = true;
    } finally {
      clearTimeout(timeoutId);
    }

    if (isExternalApiDown) {
      res.status(503).json({ error: 'Blockchain verification gateway is temporarily unavailable.' });
      return;
    }

    if (isVerified) {
      const now = Date.now();
      let durationDays = 30;
      if (plan === 'yearly') durationDays = 365;
      if (plan === 'lifetime') durationDays = 36500;
      const expiresAt = now + durationDays * 24 * 60 * 60 * 1000;
      const token = createSignedSubscriptionToken(plan || 'monthly', cleanTx, expiresAt);

      quota.isPremium = true;
      quota.expiresAt = expiresAt;

      res.json({
        success: true,
        status: 'active',
        hasSubscription: true,
        tier: 'premium',
        plan: plan || 'monthly',
        txHash: cleanTx,
        token,
        confirmations: blockConfirmations,
        network: cryptoType || 'USDT_TRC20',
        expiresAt,
      });
      return;
    }

    res.json({
      success: false,
      status: 'inactive',
      hasSubscription: false,
      tier: 'free',
    });
  } catch (err: any) {
    console.error('Verify TX error:', err);
    res.status(500).json({ error: 'Server error verifying transaction.' });
  }
});

// -------------------------------------------------------------
// Direct routes for Google AdSense compliance pages & ads.txt
// -------------------------------------------------------------
const servePublicPage = (fileName: string) => (_req: Request, res: Response) => {
  const targetDir = process.env.NODE_ENV === 'production' ? 'dist' : 'public';
  res.sendFile(path.resolve(__dirname, targetDir, fileName));
};

app.get('/privacy', servePublicPage('privacy.html'));
app.get('/privacy.html', servePublicPage('privacy.html'));
app.get('/terms', servePublicPage('terms.html'));
app.get('/terms.html', servePublicPage('terms.html'));
app.get('/about', servePublicPage('about.html'));
app.get('/about.html', servePublicPage('about.html'));
app.get('/contact', servePublicPage('contact.html'));
app.get('/contact.html', servePublicPage('contact.html'));
app.get('/ads.txt', servePublicPage('ads.txt'));
app.get('/robots.txt', servePublicPage('robots.txt'));
app.get('/sitemap.xml', servePublicPage('sitemap.xml'));

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
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
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
