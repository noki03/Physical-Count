// src/lib/db/repositories/itemRepository.ts
import { db } from "../core/database";
import type { Item } from "@/features/item/types";

export const ItemRepository = {
  addItem: async (item: Omit<Item, "id">) => {
    return await db.items.add(item);
  },
  getAllItems: async () => {
    return await db.items.toArray();
  },
  getItemsByBay: async (bayCode: string) => {
    return await db.items.where("bayCode").equals(bayCode).toArray();
  },
  deleteItem: async (id: number) => {
    return await db.items.delete(id);
  },
};
