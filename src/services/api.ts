import {
  ComprehensionQuestion,
  WordLookupResponse,
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
}

export const apiService = {
  /**
   * Get base URL for backend API (supports separate backend deployment)
   */
  getBaseUrl() {
    const raw = (import.meta.env.VITE_API_BASE_URL as string) || '';
    const trimmed = raw.trim().replace(/\/+$/, '');
    return trimmed.replace(/\/api$/, '');
  },

  /**
   * Helper to get common JSON headers
   */
  getHeaders(): Record<string, string> {
    return { 'Content-Type': 'application/json' };
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

      if (res.ok) {
        const data = await res.json();
        if (
          data &&
          Array.isArray(data.translatedParagraphs) &&
          data.translatedParagraphs.length === req.paragraphs.length
        ) {
          return data;
        }
      }
    } catch {
      console.warn('Backend server translation unavailable, falling back to on-device translation...');
    }

    // On-device client translation fallback
    const onDeviceRes = await translateOnDevice(req.paragraphs, req.sourceLang, req.targetLang);
    return {
      translatedParagraphs: onDeviceRes.translatedParagraphs,
      cachedCount: onDeviceRes.cachedCount,
      provider: onDeviceRes.provider,
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
            target: isRussian ? 'Пример использования в литературном контексте.' : 'Usage example in literary context.',
          },
        ],
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
                'Установление глубокого понимания и взаимной связи',
                'Случайный диалог без существенного смысла',
                'Прекращение общения и прощание',
                'Описание второстепенных погодных явлений',
              ],
              correctOptionIndex: 0,
              explanation: 'Текст раскрывает тему создания смысловой связи.',
            },
          ]
        : [
            {
              id: 'q-1',
              question: 'What is the main idea or key event in the passage?',
              options: [
                'Establishing deeper understanding and meaningful connection',
                'A casual dialogue with no central theme',
                'Refusing further communication',
                'A dry inventory of household objects',
              ],
              correctOptionIndex: 0,
              explanation: 'The passage focuses on context, connection, and mutual understanding.',
            },
          ],
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
   * Submit contact form inquiry to backend
   */
  async sendContactMessage(params: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; messageId?: string }> {
    const baseUrl = this.getBaseUrl();
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to send message.');
    }

    return await res.json();
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
  },
};
