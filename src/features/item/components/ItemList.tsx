/**
 * ACTIVE SCANNING LIST - ROW RENDERER
 * Maps and renders individual scanned items for the active Bay.
 * Contains direct Delete button (Trash2) for individual active items.
 */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Item } from "../types";

export const ItemList = ({
  items,
  isLoading,
  onDeleteClick,
}: {
  items: Item[];
  isLoading: boolean;
  onDeleteClick?: (item: Item) => void;
}) => {
  if (isLoading)
    return (
      <p className="text-center text-sm text-muted-foreground mt-4">
        Loading items...
      </p>
    );

  if (!items.length) return null;

  const formatDateTime = (ts: number) =>
    new Date(ts).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="flex flex-col divide-y divide-border/40 mt-4">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
        Current Items
      </h3>

      <div className="flex flex-col divide-y divide-border/40 text-sm max-h-68 overflow-y-auto">
        {[...items].reverse().map((i) => (
          <div
            key={i.id}
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors bg-background"
          >
            {/* Left side */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium">{i.itemCode}</span>

                {/* Quantity Chip */}
                <Badge
                  variant="secondary"
                  className="px-1.5 py-0.5 text-[10px] font-semibold"
                >
                  ×{i.quantity}
                </Badge>
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-muted-foreground">
                {i.timestamp ? formatDateTime(i.timestamp) : "—"}
              </span>
            </div>

            {/* Delete Icon */}
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
              onClick={() => {
                onDeleteClick?.(i);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
