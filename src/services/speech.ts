/**
 * Web Speech API Audio Engine
 * Handles multilingual TTS playback, voice resolution, rate control, and state management.
 */

export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string | null;
  currentLang: string | null;
  error: string | null;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private listeners: Set<(state: SpeechState) => void> = new Set();
  private state: SpeechState = {
    isPlaying: false,
    isPaused: false,
    currentText: null,
    currentLang: null,
    error: null,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public subscribe(listener: (state: SpeechState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public getAvailableVoicesForLocale(localePrefix: string): SpeechSynthesisVoice[] {
    if (!this.voices.length) this.loadVoices();
    return this.voices.filter((v) =>
      v.lang.toLowerCase().startsWith(localePrefix.toLowerCase())
    );
  }

  public speak(text: string, langCode: string, rate: number = 1.0, preferredVoiceName?: string): boolean {
    if (!this.synth) {
      this.state.error = 'Синтез речи не поддерживается данным браузером.';
      this.notify();
      return false;
    }

    this.stop();

    if (!text.trim()) return false;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.max(0.5, Math.min(2.0, rate));

    // Match best voice for language
    if (!this.voices.length) this.loadVoices();
    const cleanLang = langCode.split('-')[0].toLowerCase();
    const candidateVoices = this.voices.filter(
      (v) => v.lang.toLowerCase().startsWith(cleanLang)
    );

    if (preferredVoiceName) {
      const match = this.voices.find((v) => v.name === preferredVoiceName);
      if (match) utterance.voice = match;
    } else if (candidateVoices.length > 0) {
      // Prefer default or local voice
      utterance.voice = candidateVoices.find((v) => v.default) || candidateVoices[0];
    }

    utterance.lang = candidateVoices[0]?.lang || langCode;

    utterance.onstart = () => {
      this.state = {
        isPlaying: true,
        isPaused: false,
        currentText: text,
        currentLang: langCode,
        error: null,
      };
      this.notify();
    };

    utterance.onend = () => {
      this.state = {
        isPlaying: false,
        isPaused: false,
        currentText: null,
        currentLang: null,
        error: null,
      };
      this.notify();
    };

    utterance.onerror = (e) => {
      // Canceled error is normal when user clicks another paragraph
      if (e.error === 'canceled' || e.error === 'interrupted') {
        this.state.isPlaying = false;
        this.state.isPaused = false;
        this.notify();
        return;
      }
      this.state = {
        isPlaying: false,
        isPaused: false,
        currentText: null,
        currentLang: null,
        error: `Ошибка воспроизведения: ${e.error || 'голос для языка не найден'}`,
      };
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  public pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.state = {
        isPlaying: false,
        isPaused: false,
        currentText: null,
        currentLang: null,
        error: null,
      };
      this.notify();
    }
  }
}

export const speechService = new SpeechService();
