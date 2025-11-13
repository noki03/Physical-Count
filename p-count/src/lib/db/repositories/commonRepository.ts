// src/lib/db/repositories/commonRepository.ts
import { db } from "../core/database";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";

export const CommonRepository = {
  /**
   * Fetch all finalized bays along with their items (by bayId)
   */
  getBaysWithItems: async (): Promise<(Bay & { items: Item[] })[]> => {
    // 🧩 Only get finalized bays
    const finalizedBays = await db.bays
      .filter((bay) => bay.finalized === true)
      .toArray();

    const result = await Promise.all(
      finalizedBays.map(async (bay) => {
        const items = await db.items.where("bayId").equals(bay.id!).toArray();
        return { ...bay, items };
      })
    );

    console.log(
      `📦 Retrieved ${result.length} finalized bays with their items.`
    );
    return result;
  },

  /**
   * Fetch a single bay (any, finalized or not) along with its items (by bayId)
   */
  getBayWithItems: async (
    bayId: number
  ): Promise<(Bay & { items: Item[] }) | null> => {
    const bay = await db.bays.get(bayId);
    if (!bay) return null;

    const items = await db.items.where("bayId").equals(bayId).toArray();
    return { ...bay, items };
  },

  /**
   * Clear all local data (used after successful upload)
   */
  resetDatabase: async (): Promise<void> => {
    await db.bays.clear();
    await db.items.clear();
    console.log("🧹 Local database cleared successfully.");
  },
};
