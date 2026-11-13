import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  Shield,
  AlertCircle,
  Copy,
  ArrowRight,
  RefreshCw,
  KeyRound,
  Coins,
} from 'lucide-react';
import { InterfaceLanguage, SubscriptionStatus } from '../types';
import { getTranslation } from '../i18n/translations';
import { apiService } from '../services/api';

interface SubscriptionModalProps {
  onClose: () => void;
  subscription: SubscriptionStatus;
  onSubscriptionUpdated: (newStatus: SubscriptionStatus) => void;
  uiLang: InterfaceLanguage;
}

type PlanType = 'monthly' | 'yearly' | 'lifetime';
type PaymentTabType = 'crypto' | 'promo';

const CRYPTO_OPTIONS: Record<string, { label: string; network: string; address: string }> = {
  USDT_TRC20: {
    label: 'USDT (TRC-20)',
    network: 'Tron TRC-20',
    address: 'TBnztbz23R1bGTYbmn68bmcVVoVJ8rfS3m',
  },
  SOL: {
    label: 'Solana (SOL)',
    network: 'Solana Mainnet',
    address: 'D6XshRX52Y55C5yKQtLqVqFMnPrWvxFoAHDGMnEHNpLn',
  },
  BTC: {
    label: 'Bitcoin (BTC)',
    network: 'Bitcoin SegWit',
    address: 'bc1q0hkkwgakxp50cr0qah04dtljjmltmmeyf93ksv',
  },
  ETH: {
    label: 'Ethereum (ETH)',
    network: 'ERC-20 / EVM',
    address: '0x94025a59Fb8113DC51e762d0d42ca13025f4bd96',
  },
};

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  onClose,
  onSubscriptionUpdated,
  uiLang,
}) => {
  const t = getTranslation(uiLang);

  const plans: Record<PlanType, { id: PlanType; title: string; price: string; period: string; note: string; badge?: string }> = {
    monthly: {
      id: 'monthly',
      title: t.planMonthly,
      price: '$5.99',
      period: t.perMonth,
      note: t.standardSub,
    },
    yearly: {
      id: 'yearly',
      title: t.planYearly,
      price: '$49.99',
      period: t.perYear,
      note: t.save30,
      badge: t.popularBadge,
    },
    lifetime: {
      id: 'lifetime',
      title: t.planLifetime,
      price: '$99.00',
      period: t.oneTime,
      note: t.lifetimeAccess,
      badge: 'VIP',
    },
  };

  const [selectedPlan, setSelectedPlan] = useState<PlanType>('monthly');
  const [activeTab, setActiveTab] = useState<PaymentTabType>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState<string>('USDT_TRC20');
  const [isCopied, setIsCopied] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    transactionId: string;
    plan: string;
    method: string;
    date: string;
  } | null>(null);

  const activeCrypto = CRYPTO_OPTIONS[selectedCrypto];

  const handleCopyAddress = () => {
    if (activeCrypto?.address) {
      navigator.clipboard?.writeText(activeCrypto.address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleVerifyTx = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!txHash.trim() || txHash.trim().length < 16) {
      setErrorMessage(t.invalidTxError);
      return;
    }
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await apiService.verifyCryptoTx({
        cryptoType: selectedCrypto,
        txHash: txHash.trim(),
        plan: selectedPlan,
      });

      if (res.success && res.token) {
        const updated = await apiService.getSubscription();
        onSubscriptionUpdated({
          ...updated,
          tier: 'premium',
          isActive: true,
          dailyTranslationsLimit: 99999,
        });

        setPaymentSuccess({
          transactionId: res.txHash,
          plan: plans[selectedPlan].title,
          method: `${activeCrypto.label} (${res.confirmations})`,
          date: new Date().toLocaleDateString(uiLang === 'ru' ? 'ru-RU' : 'en-US'),
        });
      } else {
        setErrorMessage(t.txNotFoundError);
      }
    } catch (err: any) {
      setErrorMessage(err.message || t.txNotFoundError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePromoActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) {
      setErrorMessage(t.invalidPromoError);
      return;
    }
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await apiService.upgradeSubscription({
        code: promoCode.trim(),
        method: 'promo',
        plan: selectedPlan,
      });

      if (res.success && res.token) {
        const updated = await apiService.getSubscription();
        onSubscriptionUpdated({
          ...updated,
          tier: 'premium',
          isActive: true,
          dailyTranslationsLimit: 99999,
        });

        setPaymentSuccess({
          transactionId: `CODE-${promoCode.trim().toUpperCase()}`,
          plan: plans[selectedPlan].title,
          method: t.promoCodeTab,
          date: new Date().toLocaleDateString(uiLang === 'ru' ? 'ru-RU' : 'en-US'),
        });
      } else {
        setErrorMessage(t.invalidPromoError);
      }
    } catch (err: any) {
      setErrorMessage(err.message || t.invalidPromoError);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-2.5 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-xl my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-3 sm:px-6 sm:py-3.5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 shrink-0">
          <div>
            <div className="flex items-center gap-1.5">
              <img
                src="/assets/aistudio/file_000000004eec82468ea111a6735b2471_8524203a.png"
                alt="LingoTwice"
                className="h-5 w-5 object-contain"
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500">
                LingoTwice Pro
              </span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {t.subscriptionTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label={t.closeBtn}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer touch-manipulation shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto reader-scrollbar p-3.5 sm:p-5 space-y-4">
          {paymentSuccess ? (
            <div className="py-4 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400">
                <Check className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  {t.premiumActivatedTitle}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.premiumActivatedDesc}
                </p>
              </div>

              <div className="mx-auto max-w-sm rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-left text-xs dark:border-slate-800 dark:bg-slate-800/50 space-y-1.5">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{t.planLabel}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{paymentSuccess.plan}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{t.methodLabel}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{paymentSuccess.method}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{t.receiptLabel}</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{paymentSuccess.transactionId}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{t.dateLabel}</span>
                  <span className="text-slate-800 dark:text-slate-200">{paymentSuccess.date}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-2.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors shadow-sm cursor-pointer"
              >
                <span>{t.startUnlimitedReading}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Feature Highlights Banner */}
              <div className="rounded-xl border border-amber-200/90 bg-amber-50/50 p-3 sm:p-3.5 dark:border-amber-900/60 dark:bg-amber-950/30">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {t.proBenefitsTitle}
                    </span>
                    <ul className="mt-1 space-y-1 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{t.proBenefit1}</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{t.proBenefit2}</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{t.proBenefit3}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Plan Selector */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  {t.choosePlan}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(plans) as PlanType[]).map((pKey) => {
                    const plan = plans[pKey];
                    const isSelected = selectedPlan === pKey;
                    return (
                      <button
                        key={pKey}
                        type="button"
                        onClick={() => setSelectedPlan(pKey)}
                        className={`relative rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-600 bg-amber-500/10 ring-1 ring-amber-500 text-slate-900 dark:text-white shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {plan.badge && (
                          <span className="absolute -top-2 right-2 rounded bg-amber-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-xs">
                            {plan.badge}
                          </span>
                        )}
                        <div className="text-xs font-bold truncate">{plan.title}</div>
                        <div className="mt-0.5 text-sm sm:text-base font-extrabold text-amber-700 dark:text-amber-400">
                          {plan.price}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{plan.note}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment / Activation Tab Switcher */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setActiveTab('crypto'); setErrorMessage(null); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'crypto'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                      : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
                  }`}
                >
                  <Coins className="h-3.5 w-3.5" />
                  <span>{t.cryptoTab}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('promo'); setErrorMessage(null); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'promo'
                      ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                      : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
                  }`}
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>{t.promoCodeTab}</span>
                </button>
              </div>

              {activeTab === 'crypto' ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-850/50 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t.cryptoPayTitle}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">{t.instantCredit}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {Object.keys(CRYPTO_OPTIONS).map((cKey) => {
                      const isCSelected = selectedCrypto === cKey;
                      return (
                        <button
                          key={cKey}
                          type="button"
                          onClick={() => setSelectedCrypto(cKey)}
                          className={`rounded-lg py-1 px-1.5 text-center text-[10px] font-semibold border transition-all cursor-pointer ${
                            isCSelected
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 ring-1 ring-emerald-500'
                              : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                          }`}
                        >
                          {CRYPTO_OPTIONS[cKey].label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{t.networkLabel} <b className="text-slate-700 dark:text-slate-300">{activeCrypto.network}</b></span>
                      <span>{t.amountLabel} <b className="text-emerald-600">{plans[selectedPlan].price}</b></span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        readOnly
                        value={activeCrypto.address}
                        className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-mono text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                      />
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="flex items-center gap-1 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 cursor-pointer shrink-0"
                      >
                        <Copy className="h-3 w-3" />
                        <span>{isCopied ? t.copiedBtn : t.copyBtn}</span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyTx} className="space-y-2 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        {t.txHashLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        placeholder={t.txHashPlaceholder}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                      <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                        {t.txExplorerNote}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 text-xs font-bold transition-colors cursor-pointer shadow-sm disabled:opacity-60"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>{t.checkingTx}</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>{t.verifyAndActivate}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handlePromoActivate} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-850/50 space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      {t.promoCodeLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={t.promoCodePlaceholder}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white py-2.5 text-xs font-bold transition-colors cursor-pointer shadow-sm disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>{t.activatingCode}</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-3.5 w-3.5" />
                        <span>{t.activateCodeBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-2.5 text-xs text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                <span>{t.sslFooter}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
