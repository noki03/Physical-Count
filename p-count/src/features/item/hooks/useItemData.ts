// src/features/item/hooks/useItemData.ts
import { useLiveQuery } from "dexie-react-hooks";
import { ItemRepository } from "@/lib/db/repositories/itemRepository";
import type { Item } from "../types";
import { db } from "@/lib/db/core/database";

export const useItemData = (bayCode?: string) => {
  // Live query: fetch items by bayCode, or all if no bayCode provided
  const items =
    useLiveQuery(() => {
      if (bayCode) {
        return ItemRepository.getItemsByBay(bayCode);
      }
      return db.items.toArray();
    }, [bayCode]) || [];

  // Function to add a new item
  const addItem = async (item: Omit<Item, "id">) => {
    await ItemRepository.addItem(item);
  };

  return {
    items,
    addItem,
  };
};
