// src/features/bay/types.ts
export type Bay = {
  id?: number; // Primary key for IndexedDB
  code: string; // Your bay code
  finalized?: boolean; // Optional finalized flag
  timestamp?: number; // Optional timestamp
};
