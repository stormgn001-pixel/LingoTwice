import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface AdSenseBannerProps {
  pubId?: string;
  slotId?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  pubId,
  slotId = '7890123456',
}) => {
  const effectivePubId = pubId || (typeof window !== 'undefined' ? localStorage.getItem('lingotwice_adsense_pub_id') : null);

  useEffect(() => {
    if (effectivePubId) {
      // Inject AdSense script dynamically if not present
      if (!document.getElementById('adsense-script')) {
        const script = document.createElement('script');
        script.id = 'adsense-script';
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${effectivePubId}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense render error:', err);
      }
    }
  }, [effectivePubId]);

  if (!effectivePubId) {
    return (
      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-4 text-center text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300 space-y-1.5 my-3">
        <div className="flex items-center justify-center gap-1.5 font-bold">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span>Google AdSense</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400">
          Укажите ваш Publisher ID (<code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-amber-200 dark:border-amber-900">ca-pub-XXXXXXXXXXXXXXXX</code>) в настройках, чтобы показывать рекламу Google AdSense.
        </p>
      </div>
    );
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={effectivePubId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
