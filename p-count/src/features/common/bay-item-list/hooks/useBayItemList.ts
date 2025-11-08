// src/features/common/bay-item-list/hooks/useBayItemList.ts
import { useState, useEffect } from "react";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";

export const useBayItemList = () => {
  const [bays, setBays] = useState<(Bay & { items: Item[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  const fetchBays = async () => {
    setLoading(true);
    const data = await CommonRepository.getBaysWithItems();
    setBays(data);
    setLoading(false);
  };

  const handleReset = async () => {
    const confirmReset = confirm(
      "Are you sure you want to clear all local data? This action cannot be undone."
    );
    if (!confirmReset) return;

    setResetting(true);
    await CommonRepository.resetDatabase();
    await fetchBays();
    setResetting(false);
  };

  useEffect(() => {
    fetchBays();
  }, []);

  return { bays, loading, resetting, handleReset };
};
