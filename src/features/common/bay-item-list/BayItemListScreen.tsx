/**
 * DASHBOARD BAYS LIST (REVIEW SCREEN)
 * The main review dashboard showing aggregate metrics and a list of all collected Bays.
 * Uses BayCard for individual rows.
 */
// src/features/common/bay-item-list/BayItemListScreen.tsx
import React from "react";
import { PackageOpen } from "lucide-react";
import { useBayItemList } from "./hooks/useBayItemList";
import { ResetDatabaseDialog } from "./components/ResetDatabaseDialog";
import { BayCard } from "./components/BayCard";
import { BayListContainer } from "./components/BayListContainer";
import { BottomActionBar } from "@/components/layout/BottomActionBar";

export const BayItemListScreen: React.FC = () => {
  const {
    bays,
    loading,
    resetting,
    handleReset,
    handleDeleteBay,
    handleUpdateBay,
  } = useBayItemList();

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
      <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center animate-in fade-in duration-500">
        <div className="bg-muted/30 p-6 rounded-full mb-5">
          <PackageOpen
            className="size-12 text-muted-foreground/50"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
          No bays collected
        </h3>
        <p className="text-sm text-muted-foreground max-w-62.5">
          Your scanned bays and inventory items will appear here. Head over to
          the Scan tab to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto pb-24 flex flex-col h-full">
      <BayListContainer
        title="Bays & Items"
        totalBays={totalBays}
        totalRecords={totalRecords}
        totalUnits={totalUnits}
      >
        <div className="flex flex-col divide-y divide-border/70 ">
          {bays.map((bay) => (
            <BayCard
              key={bay.id}
              bay={bay}
              onDeleteBay={() => {
                if (bay.id) {
                  handleDeleteBay({ id: bay.id, code: bay.code });
                }
              }}
              onUpdateBay={handleUpdateBay}
            />
          ))}
        </div>
      </BayListContainer>

      <BottomActionBar>
        <ResetDatabaseDialog onConfirm={handleReset} resetting={resetting} />
      </BottomActionBar>
    </div>
  );
};
