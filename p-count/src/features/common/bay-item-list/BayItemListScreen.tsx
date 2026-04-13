// src/features/common/bay-item-list/BayItemListScreen.tsx
import React from "react";
import { useBayItemList } from "./hooks/useBayItemList";
import { ResetDatabaseDialog } from "./components/ResetDatabaseDialog";
import { BayCard } from "./components/BayCard";
import { BayListContainer } from "./components/BayListContainer";

export const BayItemListScreen: React.FC = () => {
  const { bays, loading, resetting, handleReset, handleDeleteBay } =
    useBayItemList();

  // Calculate aggregates for summary display
  const totalBays = bays.length;
  const totalRecords =
    bays?.reduce((acc, bay) => acc + (bay.items?.length || 0), 0) || 0;
  const totalUnits =
    bays?.reduce(
      (acc, bay) =>
        acc + (bay.items?.reduce((sum, item) => sum + item.quantity, 0) || 0),
      0,
    ) || 0;

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
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-8 space-y-4 p-0 ">
      <BayListContainer
        title="Bays & Items"
        totalBays={totalBays}
        totalRecords={totalRecords}
        totalUnits={totalUnits}
      >
        <div className="space-y-3">
          {bays.map((bay) => (
            <BayCard
              key={bay.id}
              bay={bay}
              onDeleteBay={handleDeleteBay} // 👈 NEW
            />
          ))}
        </div>
      </BayListContainer>

      <div className="text-center">
        <ResetDatabaseDialog onConfirm={handleReset} resetting={resetting} />
      </div>
    </div>
  );
};
