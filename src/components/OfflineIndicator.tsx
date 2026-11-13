import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { InterfaceLanguage } from '../types';
import { getTranslation } from '../i18n/translations';

interface OfflineIndicatorProps {
  uiLang: InterfaceLanguage;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ uiLang }) => {
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!isOffline) return null;

  const t = getTranslation(uiLang);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-2 bg-amber-600 px-3 py-1 text-[11px] font-medium text-white shrink-0"
    >
      <WifiOff className="h-3.5 w-3.5 shrink-0" />
      <span>{t.offlineNotice}</span>
    </div>
  );
};
