import { Package, Tags } from "lucide-react";

interface UploadSummaryProps {
  baysCount: number;
  itemsCount: number;
}

export function UploadSummary({ baysCount, itemsCount }: UploadSummaryProps) {
  return (
    <div className="mb-6 space-y-3">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Ready to Sync
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Bays Metric Card */}
        <div className="bg-muted/20 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Package className="size-5 text-primary" />
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold tracking-tight text-foreground">
              {baysCount}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Pending Bays
            </span>
          </div>
        </div>

        {/* Items Metric Card */}
        <div className="bg-muted/20 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-foreground/5 rounded-full">
            <Tags className="size-5 text-foreground" />
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold tracking-tight text-foreground">
              {itemsCount}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Pending Items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
