import React, { useState } from 'react';
import { BookOpen, Brain, Volume2, ArrowRight, ArrowLeft, Check, X, Globe, CheckCircle2 } from 'lucide-react';
import { InterfaceLanguage } from '../types';
import { ONBOARDING_DATA } from '../constants/onboardingData';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  uiLang: InterfaceLanguage;
  onSelectLanguage?: (lang: InterfaceLanguage) => void;
}

const LANGUAGE_META: Record<InterfaceLanguage, { name: string; nativeName: string; flag: string }> = {
  ru: { name: 'Русский', nativeName: 'Русский', flag: '🇷🇺' },
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  de: { name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪' },
  uk: { name: 'Українська', nativeName: 'Українська', flag: '🇺🇦' },
  fr: { name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
  it: { name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹' },
  pl: { name: 'Polski', nativeName: 'Polski', flag: '🇵🇱' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  pt: { name: 'Português', nativeName: 'Português', flag: '🇵🇹' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  tr: { name: 'Türkçe', nativeName: 'Türkçe', flag: '🇹🇷' },
  nl: { name: 'Nederlands', nativeName: 'Nederlands', flag: '🇳🇱' },
  sv: { name: 'Svenska', nativeName: 'Svenska', flag: '🇸🇪' },
  he: { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
};

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  uiLang,
  onSelectLanguage,
}) => {
  const [step, setStep] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);

  if (!isOpen) return null;

  const locale = ONBOARDING_DATA[uiLang] || ONBOARDING_DATA.ru;
  const isRtl = uiLang === 'ar' || uiLang === 'he';

  const steps = [
    {
      content: locale.step1,
      icon: BookOpen,
      iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400',
      demo: (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 transition-all dark:border-amber-900/60 dark:bg-amber-950/30">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>{locale.step1.nativeLabel}</span>
            <span className="font-mono text-[10px] text-amber-600/80 dark:text-amber-400/80">1 / 2</span>
          </div>
          <p className="mt-1.5 font-serif text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
            {locale.step1.nativeSentence}
          </p>
        </div>
      ),
    },
    {
      content: locale.step2,
      icon: Brain,
      iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-400',
      demo: (
        <div className="space-y-2.5">
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 opacity-75 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {locale.step2.nativeLabel}
            </div>
            <p className="mt-1 font-serif text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
              {locale.step2.nativeSentence}
            </p>
          </div>
          <div className="rounded-xl border border-sky-300 bg-sky-50/80 p-4 shadow-xs dark:border-sky-900/70 dark:bg-sky-950/40">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              <span>{locale.step2.targetLabel}</span>
              <span className="rounded-md bg-sky-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                Параллельно
              </span>
            </div>
            <p className="mt-1.5 font-serif text-sm sm:text-base leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
              {locale.step2.targetSentence}
            </p>
          </div>
        </div>
      ),
    },
    {
      content: locale.step3,
      icon: Volume2,
      iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400',
      demo: (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                {locale.step3.wordCard.word}
              </span>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                title="Audio"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
              {locale.step3.wordCard.tag}
            </span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            {locale.step3.wordCard.translation}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{locale.step3.wordCard.srsNotice}</span>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const handleFinish = () => {
    try {
      localStorage.setItem('lingotwice_onboarded_v1', 'true');
    } catch {}
    onClose();
  };

  const handleLangChange = (code: InterfaceLanguage) => {
    if (onSelectLanguage) {
      onSelectLanguage(code);
    }
    setShowLangMenu(false);
  };

  const currentLangMeta = LANGUAGE_META[uiLang] || LANGUAGE_META.ru;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl dark:border-slate-800 dark:bg-slate-900 flex flex-col max-h-[92vh] overflow-y-auto reader-scrollbar">
        {/* Top Header: Progress & Language Selector & Close */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === step ? 'w-8 bg-amber-600' : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
                title={`Шаг ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangMenu((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 transition-colors cursor-pointer"
                title={locale.switchLang}
              >
                <span>{currentLangMeta.flag}</span>
                <span className="hidden xs:inline">{currentLangMeta.nativeName}</span>
                <Globe className="h-3 w-3 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 top-full mt-1.5 z-50 w-48 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl reader-scrollbar dark:border-slate-700 dark:bg-slate-900">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {locale.switchLang}
                  </div>
                  {Object.entries(LANGUAGE_META).map(([code, meta]) => (
                    <button
                      key={code}
                      onClick={() => handleLangChange(code as InterfaceLanguage)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                        uiLang === code
                          ? 'bg-amber-50 font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{meta.flag}</span>
                        <span>{meta.nativeName}</span>
                      </span>
                      {uiLang === code && <Check className="h-3.5 w-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={handleFinish}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
              title={locale.skip}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Step Badge & Icon */}
        <div className="mt-5 flex items-center gap-3">
          <div className={`rounded-xl p-2.5 ${currentStep.iconBg}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            {currentStep.content.badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h2 className="mt-3.5 font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
          {currentStep.content.title}
        </h2>
        <div className="text-xs font-semibold text-amber-600 dark:text-amber-500 mt-0.5">
          {currentStep.content.subtitle}
        </div>

        {/* Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {currentStep.content.description}
        </p>

        {/* Live Interactive Preview Box */}
        <div className="mt-4.5">{currentStep.demo}</div>

        {/* Bottom Navigation Controls */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              <span>{locale.back}</span>
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              {locale.skip}
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-sm transition-all cursor-pointer"
            >
              <span>{locale.next}</span>
              <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-amber-700 shadow-md transition-all cursor-pointer"
            >
              <span>{locale.startReading}</span>
              <Check className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
