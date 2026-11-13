import React, { useState } from 'react';
import { X, Send, MessageCircle, Twitter, Copy, Check, Share2 } from 'lucide-react';
import { InterfaceLanguage } from '../types';
import { getTranslation } from '../i18n/translations';

interface ShareQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceText: string;
  targetText: string;
  sourceLangName: string;
  targetLangName: string;
  bookTitle: string;
  uiLang: InterfaceLanguage;
}

export const ShareQuoteModal: React.FC<ShareQuoteModalProps> = ({
  isOpen,
  onClose,
  sourceText,
  targetText,
  sourceLangName,
  targetLangName,
  bookTitle,
  uiLang,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const t = getTranslation(uiLang);
  const appUrl = 'https://lingotwice.com';
  const fullQuoteText = `«${targetText}»\n— ${sourceText}\n\n📖 ${bookTitle} · LingoTwice\n${appUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullQuoteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(`«${targetText}»\n— ${sourceText}\n\n📖 ${bookTitle} · LingoTwice`)}`;
  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullQuoteText)}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`«${targetText.slice(0, 140)}» — LingoTwice`)}&url=${encodeURIComponent(appUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <button
          onClick={onClose}
          aria-label={t.closeBtn}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
            <Share2 className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
            {t.shareQuoteTitle}
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 to-orange-50/40 p-5 shadow-inner dark:border-slate-800 dark:from-slate-800/60 dark:to-slate-900/60">
          <div className="flex items-center justify-between text-[11px] font-semibold text-amber-700 dark:text-amber-400">
            <span>{targetLangName}</span>
            <span className="text-slate-400">LingoTwice</span>
          </div>

          <p className="mt-2 font-serif text-base font-semibold leading-relaxed text-slate-900 dark:text-white">
            «{targetText}»
          </p>

          <div className="my-3 border-t border-amber-200/50 dark:border-slate-700/50" />

          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {sourceLangName}:
          </div>
          <p className="mt-1 font-serif text-xs text-slate-600 dark:text-slate-300 italic">
            «{sourceText}»
          </p>

          <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400">
            <span className="truncate max-w-[240px]">📖 {bookTitle}</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">lingotwice.com</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <a
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-3 py-2.5 text-xs font-semibold text-white hover:bg-sky-600 transition-colors shadow-xs"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Telegram</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={twitterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-xs"
          >
            <Twitter className="h-3.5 w-3.5" />
            <span>X / Twitter</span>
          </a>

          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors shadow-xs cursor-pointer ${
              copied
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? t.copiedBtn : t.copyBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
