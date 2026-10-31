import React from 'react';
import { X, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import { InterfaceLanguage } from '../types';

interface LegalModalProps {
  page: 'privacy' | 'terms' | 'faq';
  onClose: () => void;
  uiLang: InterfaceLanguage;
}

export const LegalModal: React.FC<LegalModalProps> = ({ page, onClose, uiLang }) => {
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
                LingoTwice · Юридические положения и защита данных
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                {page === 'privacy' && 'Политика конфиденциальности (Проект)'}
                {page === 'terms' && 'Пользовательское соглашение (Проект)'}
                {page === 'faq' && 'Регламент обработки данных и безопасность'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 pr-2 reader-scrollbar">
          <div className="rounded-xl bg-amber-50/60 p-3 text-[11px] text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Примечание: Данный текст является примерным шаблоном (Draft) для интеграции в продакшене и не заменяет квалифицированную юридическую консультацию.
            </span>
          </div>

          {page === 'privacy' && (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Общие положения</h4>
              <p>
                LingoTwice уважает вашу приватность. Мы собираем только те данные, которые необходимы для функционирования приложения: настройки языковых пар, сохранённый словарь, историю сессий и прогресс интервального повторения.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Хранение данных</h4>
              <p>
                По умолчанию в гостевом режиме все ваши книги, словарь и прогресс сохраняются локально в хранилище вашего браузера (LocalStorage). Вы в любой момент можете выгрузить полную копию в формате JSON или удалить все данные без возможности восстановления.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Передача третьим сторонам</h4>
              <p>
                Для синхронного перевода и грамматического разбора фрагменты текста передаются через защищённый серверный API на модель Google Gemini. Мы не передаём персональные идентификационные данные и не используем ваши тексты для публичных баз данных.
              </p>
            </>
          )}

          {page === 'terms' && (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Условия использования</h4>
              <p>
                LingoTwice предоставляет билингвальную среду для персонального обучения иностранным языкам. Пользователь обязуется не импортировать материалы, защищённые авторским правом без соответствующих прав, а также соблюдать правила robots.txt и условия сайтов-источников при импорте по URL.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Ограничение ответственности</h4>
              <p>
                Машинный и искусственный интеллект-перевод может содержать неточности. Приложение предоставляет инструменты редактирования каждого фрагмента, чтобы пользователь мог вручную скорректировать формулировку.
              </p>
            </>
          )}

          {page === 'faq' && (
            <>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Защита от SSRF (Server-Side Request Forgery)</h4>
              <p>
                При импорте статей по URL наш сервер валидирует целевой хост, блокирует обращения к внутренним локальным IP-адресам (127.0.0.1, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, link-local) и облачным метаданным (169.254.169.254).
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Соблюдение GDPR / CCPA</h4>
              <p>
                Пользователи обладают правом на экспорт данных («Right of Access and Portability») через кнопку выгрузки JSON в настройках, а также правом на забвение («Right to Erasure») через функцию полной очистки данных.
              </p>
            </>
          )}
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
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
