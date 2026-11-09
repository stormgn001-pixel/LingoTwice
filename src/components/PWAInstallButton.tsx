import React, { useState } from 'react';
import { Download, X, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { InterfaceLanguage } from '../types';

interface PWAInstallButtonProps {
  uiLang?: InterfaceLanguage;
  theme?: 'light' | 'dark' | 'sepia';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ uiLang = 'ru', theme = 'dark' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed and running standalone, do not show button
  if (isInstalled) {
    return null;
  }

  const label = uiLang === 'ru' ? 'Установить' : uiLang === 'de' ? 'Installieren' : uiLang === 'fr' ? 'Installer' : uiLang === 'es' ? 'Instalar' : 'Install App';

  // Chromium / Android / Desktop flow with deferred prompt
  if (isInstallable) {
    return (
      <button
        onClick={install}
        title={label}
        className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
          theme === 'dark'
            ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-300 hover:border-emerald-600 hover:bg-emerald-900/50'
            : theme === 'sepia'
            ? 'border-emerald-700/50 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
        }`}
      >
        <Download className="h-3.5 w-3.5 text-emerald-500" />
        <span className="hidden sm:inline">{label}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          title="Install on iOS"
          className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            theme === 'dark'
              ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-300 hover:border-emerald-600 hover:bg-emerald-900/50'
              : theme === 'sepia'
              ? 'border-emerald-700/50 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          <Download className="h-3.5 w-3.5 text-emerald-500" />
          <span className="hidden sm:inline">PWA</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute right-3.5 top-3.5 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                    {uiLang === 'ru' ? 'Установка на iPhone' : 'Install on iPhone / iPad'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    LingoTwice PWA
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    1
                  </div>
                  <div>
                    {uiLang === 'ru' ? (
                      <>Нажмите кнопку <strong className="inline-flex items-center gap-0.5"><Share className="inline h-3 w-3" /> «Поделиться»</strong> в нижней панели Safari.</>
                    ) : (
                      <>Tap the <strong>Share</strong> button in Safari toolbar.</>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    2
                  </div>
                  <div>
                    {uiLang === 'ru' ? (
                      <>Прокрутите вниз и выберите <strong>«На экран "Домой"»</strong>.</>
                    ) : (
                      <>Scroll down and tap <strong>«Add to Home Screen»</strong>.</>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 cursor-pointer"
              >
                {uiLang === 'ru' ? 'Понятно' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
