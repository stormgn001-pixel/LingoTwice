import React from 'react';
import { ArrowDown, RotateCw } from 'lucide-react';
import { InterfaceLanguage } from '../types';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isPulling: boolean;
  isRefreshing: boolean;
  canRelease: boolean;
  theme?: 'light' | 'dark' | 'sepia';
  uiLang?: InterfaceLanguage;
}

export const PullToRefreshIndicator: React.FC<PullToRefreshIndicatorProps> = ({
  pullDistance,
  isPulling,
  isRefreshing,
  canRelease,
  theme = 'dark',
  uiLang = 'ru',
}) => {
  if (!isPulling && !isRefreshing && pullDistance <= 0) {
    return null;
  }

  // Localized status labels
  const getLabel = () => {
    if (isRefreshing) {
      if (uiLang === 'ru' || uiLang === 'uk') return 'Обновление...';
      if (uiLang === 'de') return 'Aktualisieren...';
      if (uiLang === 'fr') return 'Actualisation...';
      if (uiLang === 'es') return 'Actualizando...';
      return 'Refreshing...';
    }
    if (canRelease) {
      if (uiLang === 'ru' || uiLang === 'uk') return 'Отпустите для обновления';
      if (uiLang === 'de') return 'Loslassen zum Aktualisieren';
      if (uiLang === 'fr') return 'Relâchez pour actualiser';
      if (uiLang === 'es') return 'Suelte para actualizar';
      return 'Release to refresh';
    }
    if (uiLang === 'ru' || uiLang === 'uk') return 'Потяните вниз для обновления';
    if (uiLang === 'de') return 'Nach unten ziehen';
    if (uiLang === 'fr') return 'Tirez pour actualiser';
    if (uiLang === 'es') return 'Tire para actualizar';
    return 'Pull down to refresh';
  };

  const badgeBgClass =
    theme === 'sepia'
      ? 'bg-[#eae3d2]/95 border-[#d6c9af] text-[#2b2118]'
      : theme === 'dark'
      ? 'bg-slate-900/95 border-slate-700/80 text-slate-100 shadow-slate-950/60'
      : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/60';

  const rotation = isRefreshing ? 0 : Math.min(pullDistance * 4.5, 360);
  const opacity = Math.min(Math.max((pullDistance - 10) / 40, 0), 1);

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none transition-transform duration-100 ease-out"
      style={{
        transform: `translateY(${Math.max(pullDistance - 15, -60)}px)`,
        opacity: isRefreshing ? 1 : opacity,
      }}
    >
      <div
        className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xl backdrop-blur-md transition-colors ${badgeBgClass}`}
      >
        {isRefreshing ? (
          <RotateCw className="h-4 w-4 text-amber-500 animate-spin" />
        ) : (
          <div
            className={`transition-transform duration-200 ${canRelease ? 'text-amber-500 scale-110' : 'text-slate-400'}`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {canRelease ? <RotateCw className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </div>
        )}
        <span className={canRelease || isRefreshing ? 'text-amber-600 dark:text-amber-400' : ''}>
          {getLabel()}
        </span>
      </div>
    </div>
  );
};
