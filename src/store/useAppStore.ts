// src/store/useAppStore.ts
// Global application state management using Zustand

import { create } from "zustand";
import type { Step, Bay } from "@/types";

interface AppState {
  // State
  currentStep: Step;
  currentBay: Bay | null;
  
  // Actions
  setStep: (step: Step) => void;
  setCurrentBay: (bay: Bay | null) => void;
  resetSession: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentStep: "scanBay",
  currentBay: null,
  
  // Actions
  setStep: (step: Step) => set({ currentStep: step }),
  setCurrentBay: (bay: Bay | null) => set({ currentBay: bay }),
  resetSession: () => set({ currentStep: "scanBay", currentBay: null }),
}));
