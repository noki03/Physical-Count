// src/features/common/bay-item-list/components/BayItemCard.tsx -> BayListContainer.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const formatNumber = (num: number, isExact: boolean) =>
  new Intl.NumberFormat("en-US", {
    notation: !isExact && num > 999999 ? "compact" : "standard",
  }).format(num);

export const BayListContainer: React.FC<BayListContainerProps> = ({
  // Renamed Component
  title,
  children,
  totalBays,
  totalRecords,
  totalUnits,
}) => {
  const [expandedMetric, setExpandedMetric] = useState<
    "bays" | "items" | "units" | null
  >(null);
  return (
    <Card className="border-border px-1">
      <CardHeader>
        <h2 className="text-lg font-semibold text-center">{title}</h2>

        {/* 3-Metric Dashboard */}
        {totalBays !== undefined &&
          totalRecords !== undefined &&
          totalUnits !== undefined && (
            <div>
              <div className="grid grid-cols-3 w-full divide-x divide-border overflow-hidden rounded-md border border-border/50">
                {/* Bays Metric */}
                <div
                  onClick={() =>
                    setExpandedMetric(expandedMetric === "bays" ? null : "bays")
                  }
                  className="flex flex-col items-center justify-center py-3 cursor-pointer transition-colors active:bg-muted/50"
                >
                  <span
                    className={`font-bold tracking-tight truncate w-full text-center px-1 transition-all ${expandedMetric === "bays" ? "text-lg" : "text-2xl"}`}
                  >
                    {formatNumber(totalBays, expandedMetric === "bays")}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                    Bays
                  </span>
                </div>

                {/* Items Metric */}
                <div
                  onClick={() =>
                    setExpandedMetric(
                      expandedMetric === "items" ? null : "items",
                    )
                  }
                  className="flex flex-col items-center justify-center py-3 cursor-pointer transition-colors active:bg-muted/50"
                >
                  <span
                    className={`font-bold tracking-tight truncate w-full text-center px-1 transition-all ${expandedMetric === "items" ? "text-lg" : "text-2xl"}`}
                  >
                    {formatNumber(totalRecords, expandedMetric === "items")}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                    Items
                  </span>
                </div>

                {/* Units Metric */}
                <div
                  onClick={() =>
                    setExpandedMetric(
                      expandedMetric === "units" ? null : "units",
                    )
                  }
                  className="flex flex-col items-center justify-center py-3 cursor-pointer transition-colors active:bg-muted/50"
                >
                  <span
                    className={`font-bold tracking-tight truncate w-full text-center px-1 transition-all ${expandedMetric === "units" ? "text-lg" : "text-2xl"}`}
                  >
                    {formatNumber(totalUnits, expandedMetric === "units")}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                    Units
                  </span>
                </div>
              </div>

              <div className="text-center mt-3 text-[10px] text-muted-foreground animate-pulse">
                Tap a metric to see exact numbers
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
