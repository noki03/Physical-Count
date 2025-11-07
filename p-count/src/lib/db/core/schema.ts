// src/lib/db/core/schema.ts
export const schema = {
  bays: "++id, code, timestamp, finalized",
  items: "++id, bayCode, itemCode, quantity, type, timestamp",
};
