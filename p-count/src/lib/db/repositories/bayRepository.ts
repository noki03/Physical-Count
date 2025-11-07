// src/lib/db/repositories/bayRepository.ts
import { db } from "../core/database";
import type { Bay } from "@/features/bay/types";

export const BayRepository = {
  addBay: async (bay: Omit<Bay, "id">) => {
    return await db.bays.add(bay);
  },
  getAllBays: async () => {
    return await db.bays.toArray();
  },
  updateBay: async (id: number, updates: Partial<Bay>) => {
    return await db.bays.update(id, updates);
  },
  deleteBay: async (id: number) => {
    return await db.bays.delete(id);
  },
};
