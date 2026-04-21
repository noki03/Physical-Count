// src/types/index.ts
// Centralized type definitions for the Physical Count application

export type Step = "scanBay" | "addItems" | "viewList" | "upload";

// Re-export feature types for global access
export type { Bay } from "@/features/bay/types";
export type { Item } from "@/features/item/types";
