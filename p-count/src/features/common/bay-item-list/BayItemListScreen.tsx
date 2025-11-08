// src/features/common/bay-item-list/BayItemListScreen.tsx
import React from "react";
import { useBayItemList } from "./hooks/useBayItemList";
import { BayItemCard } from "./components/BayItemCard";
import { BayItemAccordion } from "./components/BayItemAccordion";
import { ResetDatabaseDialog } from "./components/ResetDatabaseDialog";

export const BayItemListScreen: React.FC = () => {
  const { bays, loading, resetting, handleReset } = useBayItemList();

  if (loading) {
    return (
      <p className="text-center text-sm text-muted-foreground mt-8">
        Loading bays...
      </p>
    );
  }

  if (bays.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 text-center space-y-4">
        <p className="text-sm text-muted-foreground">No bays collected yet.</p>
        <ResetDatabaseDialog onConfirm={handleReset} resetting={resetting} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-4">
      <BayItemCard title="Bays & Items">
        <BayItemAccordion bays={bays} />
      </BayItemCard>

      <div className="text-center">
        <ResetDatabaseDialog onConfirm={handleReset} resetting={resetting} />
      </div>
    </div>
  );
};
