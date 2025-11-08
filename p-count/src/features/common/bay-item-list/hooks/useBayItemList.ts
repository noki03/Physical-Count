// src/features/common/bay-item-list/hooks/useBayItemList.ts
import { useState, useEffect } from "react";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";
import { BayRepository } from "@/lib/db/repositories/bayRepository";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";

export const useBayItemList = () => {
  const [bays, setBays] = useState<(Bay & { items: Item[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

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

  const handleReset = async () => {
    setResetting(true);
    try {
      await CommonRepository.resetDatabase();
      await fetchBays();
    } catch (error) {
      console.error("Failed to reset database:", error);
    } finally {
      setResetting(false);
    }
  };

  // ✅ Update bay code
  const handleUpdateBay = async (id: number, newCode: string) => {
    try {
      await BayRepository.updateBay(id, { code: newCode });
      await fetchBays();
    } catch (error) {
      console.error("Failed to update bay:", error);
    }
  };

  useEffect(() => {
    fetchBays();
  }, []);

  return { bays, loading, resetting, handleReset, handleUpdateBay };
};
