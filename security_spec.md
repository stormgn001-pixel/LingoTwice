# Security Specification for LingoTwice

## Data Invariants
1. All user data (`/users/{userId}/vocabulary/{vocabularyId}`, `/users/{userId}/stats/data`, `/users/{userId}/documents/{documentId}`, `/users/{userId}/preferences/data`) is strictly owned by `request.auth.uid == userId` with verified email (`request.auth.token.email_verified == true`).
2. All document IDs (`vocabularyId`, `documentId`) match `^[a-zA-Z0-9_\\-]+$` and are at most 128 characters.
3. Every entity is validated by a dedicated blueprint helper (`isValidVocabularyEntry`, `isValidUserStats`, `isValidReadingDocument`, `isValidReadingPreferences`) enforcing required keys, allowed keys (`hasOnly`), field types, and bounded string/array lengths.
4. Immutable fields (`id`, `createdAt`) cannot be modified on update, and updates explicitly whitelist mutable fields via `affectedKeys().hasOnly(...)`.
5. No blanket reads or client-delegated list queries exist; default deny blocks all unmatched paths.
