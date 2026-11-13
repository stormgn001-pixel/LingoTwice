import React from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { InterfaceLanguage } from '../types';
import { getTranslation } from '../i18n/translations';

interface LegalModalProps {
  page: 'privacy' | 'terms' | 'faq';
  onClose: () => void;
  uiLang: InterfaceLanguage;
}

export const LegalModal: React.FC<LegalModalProps> = ({ page, onClose, uiLang }) => {
  const t = getTranslation(uiLang);
  const isRu = uiLang === 'ru';
  const isUk = uiLang === 'uk';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/file_000000004eec82468ea111a6735b2471_8524203a.png"
              alt="LingoTwice"
              className="h-8 w-8 object-contain shrink-0 drop-shadow-xs"
            />
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
                {t.legalHeaderTag}
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                {page === 'privacy' && t.legalPrivacyTitle}
                {page === 'terms' && t.legalTermsTitle}
                {page === 'faq' && t.legalFaqTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={t.closeBtn}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 pr-2 reader-scrollbar">
          <div className="rounded-xl bg-amber-50/60 p-3 text-[11px] text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{t.legalDraftNotice}</span>
          </div>

          {page === 'privacy' && (isRu || isUk ? (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Общие положения</h4>
              <p>
                LingoTwice уважает вашу приватность. Мы собираем только те данные, которые необходимы для функционирования приложения: настройки языковых пар, сохранённый словарь, историю сессий и прогресс интервального повторения.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Хранение данных</h4>
              <p>
                В гостевом режиме все ваши книги, словарь и прогресс сохраняются локально в браузере (LocalStorage). При входе через Google данные синхронизируются с облаком Firebase (Firestore) с доступом только для вашей учётной записи.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Передача третьим сторонам</h4>
              <p>
                Для контекстного разбора и перевода фрагменты текста передаются через защищённый серверный API. Мы не продаём персональные данные и не используем ваши личные тексты для публичных баз.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Data Collection</h4>
              <p>
                LingoTwice respects your privacy and stores only the information needed to run the reader: language preferences, saved books, personal vocabulary, and spaced repetition progress.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Storage & Sync</h4>
              <p>
                In guest mode, data stays in your browser LocalStorage. When signed in with Google, your library, vocabulary, stats, and preferences sync securely to Firebase Firestore under your user ID.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Third-Party Processing</h4>
              <p>
                Selected snippets are processed through our backend translation and dictionary API endpoints. You can export or delete your stored data anytime from Settings.
              </p>
            </>
          ))}

          {page === 'terms' && (isRu || isUk ? (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Условия использования</h4>
              <p>
                LingoTwice предоставляет билингвальную среду для персонального обучения иностранным языкам. Пользователь обязуется соблюдать авторские права при импорте материалов.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Ограничение ответственности</h4>
              <p>
                Автоматический перевод может содержать неточности. Приложение предоставляет инструменты редактирования каждого фрагмента для ручной правки.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Acceptable Use</h4>
              <p>
                LingoTwice provides a bilingual environment for personal language learning. Please ensure you have rights to any texts or URLs you import.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Translations</h4>
              <p>
                Automated translations may contain nuances or errors. Every passage can be manually edited inside the reader.
              </p>
            </>
          ))}

          {page === 'faq' && (isRu || isUk ? (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Защита от SSRF (Server-Side Request Forgery)</h4>
              <p>
                При импорте статей по URL сервер проверяет DNS и целевой IP-адрес (IPv4 и IPv6), блокируя локальные сети, private-диапазоны и облачные метаданные, включая редиректы.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Соблюдение GDPR / CCPA</h4>
              <p>
                Вы можете экспортировать все данные в JSON или полностью очистить их в меню настроек.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">SSRF & Network Protection</h4>
              <p>
                When importing articles by URL, the backend resolves DNS and validates both IPv4 and IPv6 addresses across redirects to block localhost, private ranges, and cloud metadata endpoints.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">GDPR / Data Portability</h4>
              <p>
                You can export your complete dataset as JSON or delete all locally stored data from Settings at any time.
              </p>
            </>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <a
              href="/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-700 hover:underline dark:text-amber-400"
            >
              Privacy Policy (HTML)
            </a>
            <span>·</span>
            <a
              href="/terms.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-700 hover:underline dark:text-amber-400"
            >
              Terms of Service (HTML)
            </a>
            <span>·</span>
            <a
              href="/about.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-slate-800 dark:hover:text-slate-200"
            >
              About
            </a>
            <span>·</span>
            <a
              href="/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-slate-800 dark:hover:text-slate-200"
            >
              Contact
            </a>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
