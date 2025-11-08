// src/features/common/bay-item-list/hooks/useBayItemList.ts
import { useState, useEffect } from "react";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";

export const useBayItemList = () => {
  const [bays, setBays] = useState<(Bay & { items: Item[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  // Fetch all bays with their items
  const fetchBays = async () => {
    setLoading(true);
    try {
      const data = await CommonRepository.getBaysWithItems();
      setBays(data);
    } catch (error) {
      console.error("Failed to fetch bays:", error);
      setBays([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset the database (actual confirmation handled in UI)
  const handleReset = async () => {
    setResetting(true);
    try {
      await CommonRepository.resetDatabase();
      await fetchBays(); // Refresh list after reset
    } catch (error) {
      console.error("Failed to reset database:", error);
    } finally {
      setResetting(false);
    }
  };

  useEffect(() => {
    fetchBays();
  }, []);

  return { bays, loading, resetting, handleReset };
};
