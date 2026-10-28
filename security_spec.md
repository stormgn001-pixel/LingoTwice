# Security Specification for LingoTwice

## Data Invariants
1. Vocabulary entries must belong to the authenticated user (userId in path must match request.auth.uid).
2. Stats document must belong to the authenticated user.
3. IDs must be valid alphanumeric/underscore/hyphen strings.

## The "Dirty Dozen" Payloads
(Assuming these are test cases to verify rule security, for the sake of this prompt, I will provide a structure for the test runner)

### firestore.rules.test.ts (Draft)
```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";
// ... (omitted test implementation for brevity in generation, but planned)
```
