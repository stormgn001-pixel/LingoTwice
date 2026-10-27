import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, AlertCircle } from 'lucide-react';
import { InterfaceLanguage, SubscriptionStatus } from '../types';
import { getTranslation } from '../i18n/translations';
import { apiService } from '../services/api';

interface SubscriptionModalProps {
  onClose: () => void;
  subscription: SubscriptionStatus;
  onSubscriptionUpdated: (newStatus: SubscriptionStatus) => void;
  uiLang: InterfaceLanguage;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  onClose,
  subscription,
  onSubscriptionUpdated,
  uiLang,
}) => {
  const t = getTranslation(uiLang);
  const [promoCode, setPromoCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleUpgrade = async (code?: string) => {
    try {
      setIsVerifying(true);
      setStatusMessage(null);
      const res = await apiService.upgradeSubscription(code);
      if (res.success) {
        const updated = await apiService.getSubscription();
        onSubscriptionUpdated(updated);
        setStatusMessage(t.activePremiumNotice || 'Премиум тариф успешно активирован!');
      }
    } catch (err: any) {
      setStatusMessage(err.message || 'Ошибка активации тарифа.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
              LingoTwice Pro
            </span>
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
              {t.subscriptionTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Pricing comparison columns */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Free Tier */}
          <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">{t.freePlan}</h4>
              <div className="mt-2 font-serif text-2xl font-bold text-slate-900 dark:text-white">
                0 $ <span className="text-xs font-normal text-slate-500">/ {t.freeForever || 'навсегда'}</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{t.freeFeature1 || 'Импорт и параллельный перевод собственных текстов объемом до 1000 знаков'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{t.freeFeature2 || 'Доступ к золотой коллекции классических изданий'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{t.freeFeature3 || 'Интервальное запоминание слов по методу SM-2'}</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500">
              {t.freePlanFooter || 'Оптимально для знакомства с платформой'}
            </div>
          </div>

          {/* Premium Tier */}
          <div className="relative rounded-xl border-2 border-amber-500 bg-amber-50/20 p-5 dark:bg-amber-950/20 flex flex-col justify-between">
            <div className="absolute -top-2.5 right-4 rounded-full bg-amber-600 px-2 py-0.5 text-[10px] font-semibold text-white">
              {t.recommended || 'РЕКОМЕНДУЕТСЯ'}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">{t.premiumPlan}</h4>
              <div className="mt-2 font-serif text-2xl font-bold text-amber-700 dark:text-amber-400">
                $5.99 <span className="text-xs font-normal text-slate-500">/ {t.perMonth || 'месяц'}</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span className="font-medium">{t.premFeature1 || 'Неограниченный импорт, синхронный перевод и чтение любых собственных текстов и книг'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span>{t.premFeature2 || 'Премиальное чтение без рекламы и ограничений'}</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-400 font-medium">
              {t.premPlanFooter || 'Безграничные возможности для свободного владения языком'}
            </div>
          </div>
        </div>

        {/* Upgrade / Activation Section */}
        <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800 space-y-3">
          {subscription.tier === 'premium' ? (
            <div className="rounded-xl bg-emerald-50 p-3 text-center text-xs font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {t.activePremiumNotice || 'У вас активирован тариф Премиум. Спасибо за поддержку проекта!'}
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t.promoPlaceholder || 'Промокод или ключ (например: LINGOTWICE_PRO)'}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <button
                  onClick={() => handleUpgrade(promoCode || 'LINGOTWICE_PRO')}
                  disabled={isVerifying}
                  className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {isVerifying ? (t.verifying || 'Проверка...') : (t.activateProBtn || 'Активировать PRO ($5.99)')}
                </button>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 dark:bg-slate-800/40">
                <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <Shield className="h-3.5 w-3.5 text-amber-600" />
                  <span>{t.secureServerValidation || 'Безопасная серверная валидация платежей'}</span>
                </div>
                <p className="mt-1">
                  {t.stripeNotice || 'Оплата защищена международными стандартами безопасного шифрования через платежный шлюз.'}
                </p>
              </div>
            </>
          )}

          {statusMessage && (
            <div className="rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900 dark:bg-amber-950/60 dark:text-amber-200">
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
