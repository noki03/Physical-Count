import { useLiveQuery } from "dexie-react-hooks";
import { BayRepository } from "@/lib/db/repositories/bayRepository";
import type { Bay } from "../types";

export const useBayData = () => {
  const bays = useLiveQuery(() => BayRepository.getAllBays(), []) || [];

  const addBay = async (code: string) => {
    const newBay: Omit<Bay, "id"> = {
      code,
      finalized: false,
      timestamp: Date.now(),
    };
    await BayRepository.addBay(newBay);
  };

  return {
    bays,
    addBay,
  };
};
