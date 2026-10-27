import React, { useRef, useEffect, useState } from 'react';
import { BookOpen, Sparkles, Settings as SettingsIcon } from 'lucide-react';
import { InterfaceLanguage, SubscriptionStatus } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeaderProps {
  currentView: 'read' | 'library' | 'vocabulary' | 'review' | 'progress';
  onNavigate: (view: 'read' | 'library' | 'vocabulary' | 'review' | 'progress') => void;
  uiLang: InterfaceLanguage;
  subscription: SubscriptionStatus;
  onOpenSettings: () => void;
  onOpenSubscription: () => void;
  dueCardsCount: number;
  isDistractionFree?: boolean;
  theme?: 'light' | 'dark' | 'sepia';
}

const TABS: Array<'read' | 'library' | 'vocabulary' | 'review' | 'progress'> = [
  'read',
  'library',
  'vocabulary',
  'review',
  'progress',
];

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  uiLang,
  subscription,
  onOpenSettings,
  onOpenSubscription,
  dueCardsCount,
  isDistractionFree,
  theme = 'light',
}) => {
  const t = getTranslation(uiLang);
  const navRef = useRef<HTMLElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Touch swipe gesture tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Auto-scroll the active tab into view horizontally when changed
  useEffect(() => {
    if (activeTabRef.current && navRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentView]);

  if (isDistractionFree && currentView === 'read') {
    return null;
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    // Dominant horizontal swipe with distance threshold (45px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      const currentIndex = TABS.indexOf(currentView);
      if (deltaX < 0 && currentIndex < TABS.length - 1) {
        // Swipe left -> next tab
        onNavigate(TABS[currentIndex + 1]);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe right -> previous tab
        onNavigate(TABS[currentIndex - 1]);
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  const headerBgClass =
    theme === 'sepia'
      ? 'bg-[#eae3d2] border-[#dfd5c0] text-[#2b2118]'
      : theme === 'dark'
      ? 'bg-slate-950/95 border-slate-800 text-slate-100'
      : 'bg-white/95 border-slate-200 text-slate-900';

  const brandTextClass =
    theme === 'sepia'
      ? 'text-[#2b2118] hover:text-amber-800'
      : theme === 'dark'
      ? 'text-slate-100 hover:text-amber-400'
      : 'text-slate-900 hover:text-amber-700';

  const activeTabClass =
    theme === 'sepia'
      ? 'font-bold text-[#2b2118] bg-[#dcd2be] underline decoration-amber-700 decoration-2 underline-offset-4'
      : theme === 'dark'
      ? 'font-semibold text-white bg-slate-800/90 underline decoration-amber-500 decoration-2 underline-offset-4'
      : 'font-semibold text-slate-950 bg-slate-100 underline decoration-amber-600 decoration-2 underline-offset-4';

  const inactiveTabClass =
    theme === 'sepia'
      ? 'text-[#5c4c3b] hover:text-[#2b2118] hover:bg-[#e4d9c3]'
      : theme === 'dark'
      ? 'text-slate-400 hover:text-white hover:bg-slate-900'
      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100';

  return (
    <header className={`sticky top-0 z-30 flex items-center justify-between gap-2 sm:gap-6 border-b px-3 py-2 sm:px-6 sm:py-2.5 backdrop-blur-md transition-colors ${headerBgClass}`}>
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onNavigate('read')}
          className={`group flex items-center gap-1.5 text-left font-serif text-base sm:text-lg font-bold tracking-tight transition-colors ${brandTextClass}`}
        >
          <BookOpen className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-amber-600 transition-transform group-hover:scale-105 dark:text-amber-500" />
          <span className="whitespace-nowrap">LingoTwice</span>
        </button>
      </div>

      {/* Zone 2: Horizontally swipeable / scrollable tabs */}
      <div className="flex-1 min-w-0 max-w-xl mx-auto overflow-hidden">
        <nav
          ref={navRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex items-center gap-1 sm:gap-3 text-xs sm:text-sm font-medium overflow-x-auto no-scrollbar scroll-smooth touch-pan-x overscroll-x-contain py-1 px-1"
        >
          {TABS.map((tab) => {
            const isActive = currentView === tab;
            let tabLabel = t.navRead;
            if (tab === 'library') tabLabel = t.navLibrary;
            if (tab === 'vocabulary') tabLabel = t.navVocabulary;
            if (tab === 'review') tabLabel = t.navReview;
            if (tab === 'progress') tabLabel = t.navProgress;

            return (
              <button
                key={tab}
                ref={isActive ? activeTabRef : undefined}
                onClick={() => onNavigate(tab)}
                className={`relative px-2.5 py-1 rounded-md transition-all whitespace-nowrap shrink-0 text-xs sm:text-sm ${
                  isActive ? activeTabClass : inactiveTabClass
                }`}
              >
                {tabLabel}
                {tab === 'review' && dueCardsCount > 0 && (
                  <span className="ml-1 inline-block text-[10px] font-semibold text-amber-700 tabular-nums dark:text-amber-400">
                    ({dueCardsCount})
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Zone 3: Actions (PRO & Settings) */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          onClick={onOpenSubscription}
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-amber-300 hover:bg-amber-50/50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 whitespace-nowrap shrink-0"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span className="hidden xs:inline">{subscription.tier === 'premium' ? 'PRO' : t.upgradePremium}</span>
          <span className="xs:hidden">{subscription.tier === 'premium' ? 'PRO' : 'PRO'}</span>
        </button>

        <button
          onClick={onOpenSettings}
          title={t.navSettings}
          className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <SettingsIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
