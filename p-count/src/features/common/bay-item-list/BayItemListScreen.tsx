// src/features/common/bay-item-list/BayItemListScreen.tsx
import React from "react";
import { useBayItemList } from "./hooks/useBayItemList";
import { ResetDatabaseDialog } from "./components/ResetDatabaseDialog";
import { BayCard } from "./components/BayCard";
import { BayListContainer } from "./components/BayListContainer";
import { BottomActionBar } from "@/components/layout/BottomActionBar";

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
      <div className="w-full mt-8 text-center space-y-4">
        <p className="text-sm text-muted-foreground">No bays collected yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full pb-24 flex flex-col h-full">
      <BayListContainer
        title="Bays & Items"
        totalBays={totalBays}
        totalRecords={totalRecords}
        totalUnits={totalUnits}
      >
        <div className="flex flex-col">
          {bays.map((bay) => (
            <BayCard key={bay.id} bay={bay} onDeleteBay={handleDeleteBay} />
          ))}
        </div>
      </BayListContainer>

      <BottomActionBar>
        <ResetDatabaseDialog onConfirm={handleReset} resetting={resetting} />
      </BottomActionBar>
    </div>
  );
};
