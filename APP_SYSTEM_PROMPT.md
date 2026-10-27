# LingoTwice - AI-Powered Bilingual Reading Application

## 1. core Philosophy
LingoTwice is designed to facilitate the "Parallel Reading" method of language learning. It allows users to read original texts alongside their translations, synchronized line-by-line, to build vocabulary and grammar intuition naturally through context.

## 2. Technical Architecture
- **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons.
- **Backend**: Express.js (Node.js) acting as a proxy to Google Gemini API.
- **AI Integration**: Uses Gemini 1.5 Flash for:
  - Synchronous translation of user-imported paragraphs.
  - Contextual dictionary lookups (part of speech, IPA, examples, CEFR levels).
  - Generation of reading comprehension quizzes.
- **Storage**: Browser LocalStorage for user books, vocabulary, and preferences.
- **Audio**: Web Speech API for multi-language text-to-speech.

## 3. Key Systems

### A. Alignment Engine
The app splits imported text into meaningful "passages" (paragraphs or blocks). It ensures that every passage in the source language is paired with its translation, allowing for synchronized scrolling and focused comparison.

### B. Reading Modes
1. **Parallel Mode**: Standard side-by-side view (Source and Target).
2. **Immersion Mode**: Hides the translation by default. The user must click/tap a "Reveal" button to see the translation for a specific block, encouraging them to try understanding the original first.
3. **Recall Mode**: Triggers AI to generate comprehension questions based on the active passage after the user has finished reading it.

### C. Contextual AI Dictionary
When a user clicks a word:
- The app sends the word AND the surrounding sentence to the AI.
- The AI provides a translation that is *specific to that context*.
- It breaks down grammar (e.g., noun gender, verb forms) and provides CEFR levels.
- Users can "Save" words to their personal vocabulary.

### D. Spaced Repetition (SRS)
Saved words are entered into an SRS system using the **SM-2 algorithm**.
- Words are scheduled for review based on their difficulty.
- The "Review" tab shows flashcards for words due today.

### E. Security & Privacy
- **SSRF Protection**: All URL imports are handled server-side with strict IP and hostname validation to prevent internal network scanning.
- **Rate Limiting**: Free users have character and passage limits, managed by IP-based quota tracking and activation codes.

## 4. Operational Instructions for AI (System Prompt)
If you are asked to generate or modify content for this app:
- **Translations**: Must be faithful but natural. Use the provided context to disambiguate homonyms.
- **Linguistic Analysis**: Always include phonetic IPA and part of speech. For nouns in gendered languages (DE, FR, RU), always specify the gender.
- **Quizzes**: Questions should test *nuanced* understanding, not just surface-level vocabulary.

## 5. Monetization Strategy
- **Free Tier**: Access to classic library, manual text import (up to 1000 chars), and basic SRS.
- **Premium Tier**: Unlimited URL imports, PDF/File uploads, unlimited AI translation, and ad-free experience.
