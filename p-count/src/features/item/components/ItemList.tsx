import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
  onDeleteClick?: (id: number) => void;
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
    <Card className="mt-4 border-border py-0">
      <CardHeader className="pt-3 pb-1">
        <h2 className="text-sm font-semibold text-center">Current Items</h2>
      </CardHeader>

      <CardContent className="px-2 pt-0">
        <div className="flex flex-col divide-y divide-border text-sm max-h-64 overflow-y-auto pr-2">
          {[...items].reverse().map((i) => (
            <div key={i.id} className="flex items-center justify-between py-2">
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
                  onDeleteClick?.(i.id!);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
