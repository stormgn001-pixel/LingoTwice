export interface Language {
  code: string;
  name: string; // Russian name
  nativeName: string;
  flag: string;
  ttsLocale: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'ru', name: 'Русский', nativeName: 'Русский', flag: '🇷🇺', ttsLocale: 'ru-RU' },
  { code: 'uk', name: 'Украинский', nativeName: 'Українська', flag: '🇺🇦', ttsLocale: 'uk-UA' },
  { code: 'en', name: 'Английский', nativeName: 'English', flag: '🇬🇧', ttsLocale: 'en-US' },
  { code: 'de', name: 'Немецкий', nativeName: 'Deutsch', flag: '🇩🇪', ttsLocale: 'de-DE' },
  { code: 'fr', name: 'Французский', nativeName: 'Français', flag: '🇫🇷', ttsLocale: 'fr-FR' },
  { code: 'es', name: 'Испанский', nativeName: 'Español', flag: '🇪🇸', ttsLocale: 'es-ES' },
  { code: 'it', name: 'Итальянский', nativeName: 'Italiano', flag: '🇮🇹', ttsLocale: 'it-IT' },
  { code: 'zh', name: 'Китайский', nativeName: '中文', flag: '🇨🇳', ttsLocale: 'zh-CN' },
  { code: 'ja', name: 'Японский', nativeName: '日本語', flag: '🇯🇵', ttsLocale: 'ja-JP' },
  { code: 'ko', name: 'Корейский', nativeName: '한국어', flag: '🇰🇷', ttsLocale: 'ko-KR' },
  { code: 'pt', name: 'Португальский', nativeName: 'Português', flag: '🇵🇹', ttsLocale: 'pt-PT' },
  { code: 'ar', name: 'Арабский', nativeName: 'العربية', flag: '🇸🇦', ttsLocale: 'ar-SA', rtl: true },
  { code: 'tr', name: 'Турецкий', nativeName: 'Türkçe', flag: '🇹🇷', ttsLocale: 'tr-TR' },
  { code: 'nl', name: 'Нидерландский', nativeName: 'Nederlands', flag: '🇳🇱', ttsLocale: 'nl-NL' },
  { code: 'pl', name: 'Польский', nativeName: 'Polski', flag: '🇵🇱', ttsLocale: 'pl-PL' },
  { code: 'sv', name: 'Шведский', nativeName: 'Svenska', flag: '🇸🇪', ttsLocale: 'sv-SE' },
  { code: 'he', name: 'Иврит', nativeName: 'עברית', flag: '🇮🇱', ttsLocale: 'he-IL', rtl: true },
];

export const AUTO_DETECT_LANGUAGE: Language = {
  code: 'auto',
  name: 'Автоопределение',
  nativeName: 'Auto Detect',
  flag: '✨',
  ttsLocale: 'en-US',
};

export const SOURCE_LANGUAGES: Language[] = [AUTO_DETECT_LANGUAGE, ...SUPPORTED_LANGUAGES];

export const getLanguageByCode = (code: string): Language => {
  if (!code) return SUPPORTED_LANGUAGES[0];
  const normalized = code.toLowerCase().trim();
  if (normalized === 'auto') return AUTO_DETECT_LANGUAGE;
  const directMatch = SUPPORTED_LANGUAGES.find(l => l.code === normalized);
  if (directMatch) return directMatch;
  const prefix = normalized.split(/[-_]/)[0];
  const prefixMatch = SUPPORTED_LANGUAGES.find(l => l.code === prefix);
  if (prefixMatch) return prefixMatch;
  return {
    code: normalized,
    name: normalized.toUpperCase(),
    nativeName: normalized.toUpperCase(),
    flag: '🌐',
    ttsLocale: `${normalized}-${normalized.toUpperCase()}`
  };
};
