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

  const sharedTransition = {
    layout: { type: "spring" as const, bounce: 0, duration: 0.3 },
    opacity: { duration: 0.15 },
  };
  return (
    <Card className="border-border px-1">
      <CardHeader>
        <h2 className="text-lg font-semibold text-center">{title}</h2>

        {/* 3-Metric Dashboard */}
        {totalBays !== undefined &&
          totalRecords !== undefined &&
          totalUnits !== undefined && (
            <div>
              <div className="flex w-full divide-x divide-border overflow-hidden rounded-md border border-border/50 bg-card">
                {/* Bays Metric */}
                <motion.div
                  layout
                  transition={sharedTransition}
                  style={{ flex: expandedMetric === "bays" ? 3 : 1 }}
                  onClick={() =>
                    setExpandedMetric(expandedMetric === "bays" ? null : "bays")
                  }
                  className="flex flex-col items-center justify-center py-3 cursor-pointer hover:bg-accent/50 active:bg-muted/50"
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      layout="position"
                      key={formatNumber(totalBays, expandedMetric === "bays")}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={sharedTransition}
                      className="text-2xl font-bold tracking-tight truncate w-full text-center px-1"
                    >
                      {formatNumber(totalBays, expandedMetric === "bays")}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span
                    layout="position"
                    transition={sharedTransition}
                    className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1"
                  >
                    Bays
                  </motion.span>
                </motion.div>

                {/* Items Metric */}
                <motion.div
                  layout
                  transition={sharedTransition}
                  style={{ flex: expandedMetric === "items" ? 3 : 1 }}
                  onClick={() =>
                    setExpandedMetric(
                      expandedMetric === "items" ? null : "items",
                    )
                  }
                  className="flex flex-col items-center justify-center py-3 cursor-pointer hover:bg-accent/50 active:bg-muted/50"
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      layout="position"
                      key={formatNumber(
                        totalRecords,
                        expandedMetric === "items",
                      )}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={sharedTransition}
                      className="text-2xl font-bold tracking-tight truncate w-full text-center px-1"
                    >
                      {formatNumber(totalRecords, expandedMetric === "items")}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span
                    layout="position"
                    transition={sharedTransition}
                    className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1"
                  >
                    Items
                  </motion.span>
                </motion.div>

                {/* Units Metric */}
                <motion.div
                  layout
                  transition={sharedTransition}
                  style={{ flex: expandedMetric === "units" ? 3 : 1 }}
                  onClick={() =>
                    setExpandedMetric(
                      expandedMetric === "units" ? null : "units",
                    )
                  }
                  className="flex flex-col items-center justify-center py-3 cursor-pointer hover:bg-accent/50 active:bg-muted/50"
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      layout="position"
                      key={formatNumber(totalUnits, expandedMetric === "units")}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={sharedTransition}
                      className="text-2xl font-bold tracking-tight truncate w-full text-center px-1"
                    >
                      {formatNumber(totalUnits, expandedMetric === "units")}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span
                    layout="position"
                    transition={sharedTransition}
                    className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1"
                  >
                    Units
                  </motion.span>
                </motion.div>
              </div>

              <div className="text-center mt-2 text-[10px] text-muted-foreground">
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
