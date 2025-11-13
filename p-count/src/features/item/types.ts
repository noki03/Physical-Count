// src/features/item/types.ts

export interface Item {
  id?: number;
  bayId: number;
  bayCode: string;
  itemCode: string;
  quantity: number;
  timestamp?: number;
}
