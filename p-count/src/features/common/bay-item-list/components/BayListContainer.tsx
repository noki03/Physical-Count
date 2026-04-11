// src/features/common/bay-item-list/components/BayItemCard.tsx -> BayListContainer.tsx
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface BayListContainerProps {
  // Renamed Props
  title: string;
  children: React.ReactNode;
  totalBays?: number;
  totalRecords?: number;
  totalUnits?: number;
}

// Number formatting helper for large numbers
const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US", {
    notation: num > 999999 ? "compact" : "standard",
  }).format(num);

export const BayListContainer: React.FC<BayListContainerProps> = ({
  // Renamed Component
  title,
  children,
  totalBays,
  totalRecords,
  totalUnits,
}) => {
  return (
    <Card className="border-border px-1">
      <CardHeader>
        <h2 className="text-lg font-semibold text-center">{title}</h2>

        {/* 3-Metric Dashboard */}
        {totalBays !== undefined &&
          totalRecords !== undefined &&
          totalUnits !== undefined && (
            <div className="grid grid-cols-3 gap-4 divide-x divide-border mt-4">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold tracking-tight truncate w-full">
                  {formatNumber(totalBays)}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                  BAYS
                </span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold tracking-tight truncate w-full">
                  {formatNumber(totalRecords)}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                  ITEMS
                </span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold tracking-tight truncate w-full">
                  {formatNumber(totalUnits)}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                  UNITS
                </span>
              </div>
            </div>
          )}
      </CardHeader>
      <CardContent className="px-2">
        <div className="max-h-[50vh] overflow-y-auto">{children}</div>
      </CardContent>
    </Card>
  );
};
