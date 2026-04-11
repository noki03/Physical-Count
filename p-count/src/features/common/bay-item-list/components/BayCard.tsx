// Updated BayCard.tsx with delete icon button
import React from "react";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BayItemDialog } from "./BayItemDialog";
import { DeleteBayButton } from "./DeleteBayButton";

interface BayCardProps {
  bay: Bay & { items: Item[] };
  onDeleteBay: (id: number) => void;
}

export const BayCard: React.FC<BayCardProps> = ({ bay, onDeleteBay }) => {
  return (
    <Card className="border shadow-none mb-1 p-2 rounded-sm">
      <CardHeader className="flex flex-row justify-between items-center px-2 py-0">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-semibold leading-tight">
              {bay.code}
            </CardTitle>
            {bay.isUploaded && (
              <Badge
                variant="outline"
                className="ml-2 bg-green-50 text-green-700 border-green-200"
              >
                Synced
              </Badge>
            )}
          </div>
          <CardDescription className="text-[10px] text-muted-foreground leading-tight">
            {bay.items.length} {bay.items.length === 1 ? "item" : "items"}
          </CardDescription>
        </div>

        <div className="flex gap-2 items-center">
          <BayItemDialog bay={bay} />

          {/* NEW reusable Delete Bay button */}
          <DeleteBayButton
            bayId={bay.id!}
            bayCode={bay.code}
            onDeleteBay={onDeleteBay}
          />
        </div>
      </CardHeader>
    </Card>
  );
};
