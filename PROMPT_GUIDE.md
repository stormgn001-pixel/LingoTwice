# LingoTwice: Technical System Prompt & Architecture Guide

## 1. Application Overview
LingoTwice is a high-fidelity parallel reading and language learning platform. It allows users to read foreign texts with a synchronized translation, look up words in context, and practice using spaced repetition (SRS).

## 2. Core Systems

### A. Reader Workspace
- **Sync Scroll**: A custom synchronization engine that keeps the source and target texts aligned by calculating viewport offsets and matching paragraph IDs.
- **Interactive Text**: Every word in the source text is clickable. This triggers a contextual lookup that analyzes the specific usage of the word in its sentence.

### B. AI Engine (Gemini Integration)
- **Model Selection Strategy**:
  - `gemini-3-flash-preview`: Used for complex, high-quality full-text translations where nuance and literary flow are critical.
  - `gemini-3.1-flash-lite`: Used for high-frequency, low-latency tasks such as individual word lookups and quiz generation. This optimizes for speed and bypasses strict daily quotas on the Free Tier.
- **Contextual Dictionary**: Unlike standard dictionaries, LingoTwice sends the entire sentence context to the AI. This allows it to identify precise grammatical roles (e.g., distinguishing between a noun and a verb) and provide relevant translations.
- **Automatic Chunking**: Large texts are split into manageable paragraph arrays before being sent to the AI to prevent timeouts and ensure structured JSON responses.

### C. Learning & Retention (SRS)
- **SuperMemo-2 (SM-2) Algorithm**: Uses the ease factor, repetition count, and interval to schedule reviews.
- **Vocabulary Bank**: Stores saved words with their original context, phonetic transcriptions, and CEFR levels.

### D. Content Acquisition
- **SSRF-Protected Importer**: A server-side proxy fetches web articles, cleanses HTML (removing scripts/ads), and extracts readable paragraphs.
- **Local Storage Persistence**: All user data (books, vocabulary, stats) is stored locally in the browser, ensuring privacy and offline availability.

## 3. System Prompt for AI Interactions

If you were to recreate the AI logic, use the following "Master Prompt":

```text
You are the LingoTwice Linguistic Engine. Your goal is to facilitate deep language acquisition.

1. FOR TRANSLATION:
   - Provide "Parallel-Ready" translations.
   - Maintain a 1:1 paragraph correspondence.
   - Use a tone that matches the source (Literary, Technical, or Casual).
   - Return strictly structured JSON.

2. FOR DICTIONARY LOOKUP:
   - Analyze the [WORD] within the [CONTEXT_SENTENCE].
   - Identify the specific grammatical gender, case, or conjugation used.
   - Suggest a CEFR level (A1-C2).
   - Provide natural example sentences that differ from the source.

3. FOR COMPREHENSION:
   - Generate active recall questions that test understanding, not just translation.
   - Focus on key verbs and idiomatic expressions found in the text.
```

## 4. Optimization Nuances
- **Double-Layer Caching**: The application implements both a translation cache (hash-based) and a dictionary cache (context-based) to reduce redundant API calls.
- **Smart Fallbacks**: If the AI API is unreachable or quotas are exceeded, the system uses a heuristic-based fallback translator to ensure the user can keep reading without interruption.
- **User-Agent Telemetry**: All requests include the `aistudio-build` header for proper monitoring within the AI Studio environment.

---

# LingoTwice: Техническое руководство по промтам и архитектуре

## 1. Обзор приложения
LingoTwice — это платформа для параллельного чтения и изучения языков с высокой точностью. Она позволяет пользователям читать иностранные тексты с синхронизированным переводом, разбирать слова в контексте и закреплять знания с помощью системы интервальных повторений (SRS).

## 2. Основные системы

### A. Рабочее пространство читателя
- **Синхронная прокрутка**: Движок, который удерживает оригинал и перевод выровненными, вычисляя смещения и сопоставляя ID абзацев.
- **Интерактивный текст**: Каждое слово кликабельно. Это запускает контекстный поиск, который анализирует конкретное использование слова в предложении.

### B. ИИ-движок (Интеграция с Gemini)
- **Стратегия выбора моделей**:
  - `gemini-3-flash-preview`: Для высококачественного перевода полных текстов, где важна литературность.
  - `gemini-3.1-flash-lite`: Для высокочастотных задач (словарь, тесты). Это оптимизирует скорость и обходит лимиты бесплатного тарифа.
- **Контекстный словарь**: ИИ получает всё предложение целиком, что позволяет точно определить грамматическую роль слова.
- **Автоматическое разбиение (Batching)**: Большие тексты делятся на пакеты по 40 абзацев для предотвращения таймаутов.

### C. Обучение (SRS)
- **Алгоритм SuperMemo-2 (SM-2)**: Использует коэффициент легкости и интервалы для планирования повторений.

### D. Импорт контента
- **Защищенный импортер**: Прокси-сервер с защитой от SSRF извлекает текст из URL, очищая его от рекламы и скриптов.

## 3. Мастер-Промт для ИИ

Если вы захотите воссоздать логику ИИ, используйте этот промт:

```text
Ты — лингвистический движок LingoTwice. Твоя цель — способствовать глубокому усвоению языка.

1. ДЛЯ ПЕРЕВОДА:
   - Обеспечь точность 1:1 по абзацам.
   - Соблюдай стиль оригинала (литературный, технический или разговорный).
   - Возвращай строго структурированный JSON.

2. ДЛЯ СЛОВАРЯ:
   - Анализируй [СЛОВО] внутри [ПРЕДЛОЖЕНИЯ].
   - Определи род, падеж или спряжение.
   - Укажи уровень CEFR (A1-C2).
   - Приведи 2 примера употребления, отличных от оригинала.

3. ДЛЯ ПРОВЕРКИ:
   - Генерируй вопросы на понимание смысла, а не просто перевода.
```

## 4. Нюансы оптимизации
- **Двойное кеширование**: Хеширование переводов и словарных разборов на сервере экономит квоту API.
- **Пагинация UI**: Приложение отображает только первые 100 абзацев для сверхбольших книг, добавляя кнопку «Загрузить ещё», что предотвращает зависание браузера.
