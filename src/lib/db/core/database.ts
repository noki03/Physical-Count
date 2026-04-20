// src/lib/db/core/database.ts
import Dexie, { type Table } from "dexie";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";
import { schema } from "./schema";

export class PCountDB extends Dexie {
  bays!: Table<Bay, number>;
  items!: Table<Item, number>;

  constructor() {
    super("PCountDB");
    this.version(1).stores(schema);
  }
}
export const db = new PCountDB();
