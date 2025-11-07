// src/lib/db/repositories/commonRepository.ts
import { db } from "../core/database";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";

export const CommonRepository = {
  /**
   * Fetch all bays along with their items
   */
  getBaysWithItems: async (): Promise<(Bay & { items: Item[] })[]> => {
    const bays = await db.bays.toArray();

    const result = await Promise.all(
      bays.map(async (bay) => {
        const items = await db.items
          .where("bayCode")
          .equals(bay.code)
          .toArray();
        return { ...bay, items };
      })
    );

    return result;
  },

  /**
   * Fetch a single bay with its items
   */
  getBayWithItems: async (
    bayCode: string
  ): Promise<(Bay & { items: Item[] }) | null> => {
    const bay = await db.bays.get({ code: bayCode });
    if (!bay) return null;

    const items = await db.items.where("bayCode").equals(bayCode).toArray();
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
