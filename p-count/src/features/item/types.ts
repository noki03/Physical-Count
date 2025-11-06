// src/features/item/types.ts

export interface Item {
  id?: number;
  bayCode: string;
  itemCode: string;
  quantity: number;
  timestamp?: number; // Optional timestamp
}
