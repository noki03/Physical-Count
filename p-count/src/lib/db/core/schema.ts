// src/lib/db/core/schema.ts
export const schema = {
  bays: "++id, code, timestamp, finalized",
  items: "++id, bayCode, bayId, itemCode, quantity, type, timestamp",
};
