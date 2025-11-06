import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  quantity: number;
};

type Bay = {
  code: string;
  items: Item[];
  finalized?: boolean;
};

interface BayState {
  bays: Bay[];

  // --- Bay Management ---
  addBay: (code: string) => void;
  getBay: (code: string) => Bay | undefined;

  // --- Item Management ---
  addItemToBay: (bayCode: string, item: Item) => void;
  finalizeBay: (bayCode: string) => void;
}

export const useBayData = create<BayState>((set, get) => ({
  bays: [],

  addBay: (code) =>
    set((state) => {
      if (state.bays.find((b) => b.code === code)) return state; // prevent duplicates
      return { bays: [...state.bays, { code, items: [] }] };
    }),

  getBay: (code) => get().bays.find((b) => b.code === code),

  addItemToBay: (bayCode, newItem) =>
    set((state) => {
      const bays = state.bays.map((bay) => {
        if (bay.code !== bayCode) return bay;

        const existing = bay.items.find((item) => item.id === newItem.id);

        let updatedItems: Item[];
        if (existing) {
          updatedItems = bay.items.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          updatedItems = [...bay.items, newItem];
        }

        return { ...bay, items: updatedItems };
      });

      return { bays };
    }),

  finalizeBay: (bayCode) =>
    set((state) => ({
      bays: state.bays.map((bay) =>
        bay.code === bayCode ? { ...bay, finalized: true } : bay
      ),
    })),
}));
