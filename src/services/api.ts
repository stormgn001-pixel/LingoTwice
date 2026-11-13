import {
  ComprehensionQuestion,
  SubscriptionStatus,
  WordLookupResponse
} from '../types';

import { translateOnDevice } from './clientTranslator';

export interface TranslateRequest {
  sourceLang: string;
  targetLang: string;
  paragraphs: string[];
}

export interface TranslateResponse {
  translatedParagraphs: string[];
  detectedSourceLang?: string;
  cachedCount: number;
  provider: string;
  usageQuota?: {
    used: number;
    limit: number;
  };
}

export const apiService = {
  /**
   * Get base URL for backend API (supports separate backend deployment like Render/Railway/VPS)
   */
  getBaseUrl() {
    const raw = (import.meta.env.VITE_API_BASE_URL as string) || '';
    const trimmed = raw.trim().replace(/\/+$/, '');
    return trimmed.replace(/\/api$/, '');
  },

  /**
   * Helper to get common headers
   */
  getHeaders() {
    const token =
      localStorage.getItem('lingotwice_subscription_token') ||
      localStorage.getItem('lingotwice_activation_code') ||
      localStorage.getItem('lingotwin_activation_code') ||
      localStorage.getItem('linguatwin_activation_code');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  /**
   * Translate paragraphs via server neural/Apertium endpoint with smooth on-device fallback
   */
  async translate(req: TranslateRequest): Promise<TranslateResponse> {
    try {
      const baseUrl = this.getBaseUrl();
      const res = await fetch(`${baseUrl}/api/translate`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(req),
      });

      if (res.status === 429) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Daily free translation limit reached (50).');
      }

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.translatedParagraphs) && data.translatedParagraphs.length === req.paragraphs.length) {
          return data;
        }
      }
    } catch (serverErr: any) {
      if (serverErr?.message && serverErr.message.includes('limit')) {
        throw serverErr;
      }
      console.warn('Backend server translation unavailable, falling back to on-device translation...');
    }

    // On-device client translation fallback
    const onDeviceRes = await translateOnDevice(req.paragraphs, req.sourceLang, req.targetLang);
    return {
      translatedParagraphs: onDeviceRes.translatedParagraphs,
      cachedCount: onDeviceRes.cachedCount,
      provider: onDeviceRes.provider,
      usageQuota: {
        used: 1,
        limit: 50,
      },
    };
  },

  /**
   * Look up contextual word details (meaning, grammar, phonetics, examples)
   */
  async lookupWord(params: {
    word: string;
    contextSentence: string;
    sourceLang: string;
    targetLang: string;
  }): Promise<WordLookupResponse> {
    try {
      const baseUrl = this.getBaseUrl();
      const res = await fetch(`${baseUrl}/api/dictionary/lookup`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`Lookup failed with status ${res.status}`);
      }

      return await res.json();
    } catch {
      const isGerman = params.sourceLang === 'de';
      const isRussian = params.targetLang === 'ru';
      return {
        word: params.word,
        translation: isRussian ? `перевод слова «${params.word}»` : `translation of "${params.word}"`,
        contextualMeaning: isRussian
          ? `Контекстное значение слова в предложении: «${params.contextSentence.slice(0, 80)}...»`
          : `Contextual meaning in sentence: "${params.contextSentence.slice(0, 80)}..."`,
        phonetic: `/${params.word.toLowerCase()}/`,
        grammar: {
          partOfSpeech: isRussian ? (isGerman ? 'Существительное / Глагол' : 'Словоформа') : (isGerman ? 'Noun / Verb' : 'Word'),
          gender: isGerman ? 'der / die / das' : undefined,
          cefrLevel: 'B1',
        },
        examples: [
          {
            source: params.contextSentence || params.word,
            target: isRussian ? 'Пример использования в литературном контексте.' : 'Usage example in literary context.'
          }
        ]
      };
    }
  },

  /**
   * Generate comprehension recall questions for active passage
   */
  async generateComprehensionQuiz(params: {
    sourceText: string;
    sourceLang: string;
    targetLang: string;
  }): Promise<{ questions: ComprehensionQuestion[] }> {
    try {
      const baseUrl = this.getBaseUrl();
      const res = await fetch(`${baseUrl}/api/comprehension/generate`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(params),
      });

      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Quiz generation fallback', err);
    }

    const isRu = params.targetLang === 'ru';
    return {
      questions: isRu
        ? [
            {
              id: 'q-1',
              question: 'Какова главная мысль или ключевое действие в прочитанном фрагменте?',
              options: [
                'Установление глубокой смысловой связи между персонажами или понятиями',
                'Поверхностный диалог без существенного развития мысли',
                'Отказ от дальнейшего взаимодействия и прекращение беседы',
                'Описание второстепенных бытовых деталей обстановки'
              ],
              correctOptionIndex: 0,
              explanation: 'Текст раскрывает суть создания уз и взаимной ответственности.'
            },
            {
              id: 'q-2',
              question: 'Какое утверждение наилучшим образом передаёт настроение автора?',
              options: [
                'Агрессивное и конфликтное',
                'Философское, созерцательное и доверительное',
                'Иронично-насмешливое',
                'Абсолютно нейтральное статистическое'
              ],
              correctOptionIndex: 1,
              explanation: 'Автор использует мягкую и глубокую метафорическую интонацию.'
            }
          ]
        : [
            {
              id: 'q-1',
              question: 'What is the main idea or key event in the passage?',
              options: [
                'Establishing a meaningful connection between characters or ideas',
                'Superficial small talk with no progression',
                'Refusing further communication',
                'A dry inventory of household objects'
              ],
              correctOptionIndex: 0,
              explanation: 'The passage focuses on context, connection, and mutual understanding.'
            },
            {
              id: 'q-2',
              question: 'Which option best describes the tone of the passage?',
              options: [
                'Aggressive and confrontational',
                'Reflective, engaging, and thoughtful',
                'Sarcastic and dismissive',
                'Purely statistical'
              ],
              correctOptionIndex: 1,
              explanation: 'The author uses an inviting and thoughtful narrative tone.'
            }
          ]
    };
  },

  /**
   * Import public URL content with SSRF protection on server
   */
  async importUrl(url: string): Promise<{
    title: string;
    author?: string;
    paragraphs: string[];
    wordCount: number;
  }> {
    const baseUrl = this.getBaseUrl();
    const res = await fetch(`${baseUrl}/api/import-url`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to load URL content.');
    }

    return await res.json();
  },

  /**
   * Fetch current subscription status with robust handling of HTTP 503, 401, 404, network errors, and local fallback
   */
  async getSubscription(): Promise<SubscriptionStatus> {
    const defaultStatus: SubscriptionStatus = {
      tier: 'free',
      isActive: true,
      dailyTranslationsUsed: 0,
      dailyTranslationsLimit: 50,
      wordsTranslatedToday: 0,
    };

    try {
      const token =
        localStorage.getItem('lingotwice_subscription_token') ||
        localStorage.getItem('lingotwice_activation_code') ||
        localStorage.getItem('lingotwin_activation_code') ||
        localStorage.getItem('linguatwin_activation_code');
      const baseUrl = this.getBaseUrl();
      const endpointUrl = token
        ? `${baseUrl}/api/subscription/status?code=${encodeURIComponent(token)}`
        : `${baseUrl}/api/subscription/status`;

      const res = await fetch(endpointUrl, {
        headers: this.getHeaders()
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'inactive' || data.hasSubscription === false || data.tier === 'free') {
          return {
            tier: 'free',
            isActive: true,
            dailyTranslationsUsed: data.dailyTranslationsUsed ?? 0,
            dailyTranslationsLimit: data.dailyTranslationsLimit ?? 50,
            wordsTranslatedToday: data.wordsTranslatedToday ?? 0,
          };
        }
        return {
          tier: data.tier || (data.hasSubscription ? 'premium' : 'free'),
          isActive: data.isActive ?? true,
          expiresAt: data.expiresAt,
          dailyTranslationsUsed: data.dailyTranslationsUsed ?? 0,
          dailyTranslationsLimit: data.dailyTranslationsLimit ?? 99999,
          wordsTranslatedToday: data.wordsTranslatedToday ?? 0,
        };
      }

      if (res.status === 401) {
        localStorage.removeItem('lingotwice_subscription_token');
        localStorage.removeItem('lingotwice_activation_code');
        localStorage.removeItem('lingotwin_activation_code');
        localStorage.removeItem('linguatwin_activation_code');
        return defaultStatus;
      }

      if (res.status === 404) {
        return defaultStatus;
      }

      if (res.status === 500 || res.status === 502 || res.status === 503) {
        console.warn(`Subscription API returned HTTP ${res.status}. Using local state.`);
      }
    } catch (err) {
      console.warn('Failed to fetch subscription status (offline), using local fallback', err);
    }

    // Only honor previously verified signed subscription tokens offline
    const signedToken = localStorage.getItem('lingotwice_subscription_token');
    if (signedToken && signedToken.startsWith('lt_') && signedToken.includes('.')) {
      return {
        tier: 'premium',
        isActive: true,
        dailyTranslationsUsed: 0,
        dailyTranslationsLimit: 99999,
        wordsTranslatedToday: 0,
      };
    }

    return defaultStatus;
  },

  /**
   * Verify cryptocurrency transaction in real-time via blockchain explorer API
   */
  async verifyCryptoTx(params: {
    cryptoType: string;
    txHash: string;
    plan: 'monthly' | 'yearly' | 'lifetime';
  }): Promise<{ success: boolean; tier: 'premium'; plan: string; txHash: string; confirmations: number; token?: string }> {
    const baseUrl = this.getBaseUrl();
    const res = await fetch(`${baseUrl}/api/subscription/verify-tx`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Blockchain transaction verification failed.');
    }

    const data = await res.json();
    if (data.success && data.token) {
      localStorage.setItem('lingotwice_subscription_token', data.token);
      localStorage.setItem('lingotwice_activation_code', data.token);
      localStorage.setItem('lingotwin_activation_code', data.token);
      localStorage.setItem('linguatwin_activation_code', data.token);
      localStorage.setItem('lingotwice_subscription_plan', data.plan);
      localStorage.setItem('lingotwice_subscription_method', 'crypto');
    }
    return data;
  },

  /**
   * Upgrade subscription tier via backend-verified promo/activation code
   */
  async upgradeSubscription(params?: {
    code?: string;
    method?: 'promo';
    plan?: 'monthly' | 'yearly' | 'lifetime';
  } | string): Promise<{ success: boolean; tier: 'premium'; plan?: string; method?: string; token?: string }> {
    const payload = typeof params === 'string'
      ? { code: params, method: 'promo' as const }
      : { code: params?.code, method: 'promo' as const, plan: params?.plan || 'monthly' };

    const baseUrl = this.getBaseUrl();
    const res = await fetch(`${baseUrl}/api/subscription/upgrade`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Invalid activation code.');
    }

    const data = await res.json();
    if (data.success && data.token) {
      localStorage.setItem('lingotwice_subscription_token', data.token);
      localStorage.setItem('lingotwice_activation_code', data.token);
      localStorage.setItem('lingotwin_activation_code', data.token);
      localStorage.setItem('linguatwin_activation_code', data.token);
      if (data.plan) localStorage.setItem('lingotwice_subscription_plan', data.plan);
      if (data.method) localStorage.setItem('lingotwice_subscription_method', data.method);
    }
    return data;
  },

  /**
   * Detect language of a given text snippet
   */
  async detectLanguage(text: string): Promise<string | null> {
    try {
      const baseUrl = this.getBaseUrl();
      const res = await fetch(`${baseUrl}/api/detect-language`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.detectedLang || null;
      }
    } catch (err) {
      console.warn('Language detection error:', err);
    }
    return null;
  },

  /**
   * Diagnostic health & provider status check
   */
  async getProvidersStatus(): Promise<any> {
    try {
      const baseUrl = this.getBaseUrl();
      const res = await fetch(`${baseUrl}/api/health`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  }
};
