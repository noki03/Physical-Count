import React from "react";
import { Package, Tags } from "lucide-react";

interface UploadSummaryProps {
  baysCount: number;
  itemsCount: number;
}

export const UploadSummary: React.FC<UploadSummaryProps> = ({
  baysCount,
  itemsCount,
}) => {
  return (
    <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
      <h4 className="text-sm font-medium text-foreground mb-3">Ready to Sync</h4>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="size-4 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold leading-none">{baysCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Bays</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Tags className="size-4 text-blue-500" />
          </div>
          <div>
            <p className="text-xl font-bold leading-none">{itemsCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};
