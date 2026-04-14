// Updated BayCard.tsx with delete icon button
import React from "react";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";
import { BayItemDialog } from "./BayItemDialog";
import { DeleteBayButton } from "./DeleteBayButton";

interface BayCardProps {
  bay: Bay & { items: Item[] };
  onDeleteBay: (id: number) => void;
}

export const BayCard: React.FC<BayCardProps> = ({ bay, onDeleteBay }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-background hover:bg-muted/50 transition-colors">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{bay.code}</span>
          {bay.isUploaded && (
            <span className="text-[10px] font-medium bg-green-500/15 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
              Synced
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {bay.items?.length || 0} items
        </span>
      </div>

      <div className="flex gap-2 items-center">
        <BayItemDialog bay={bay} />
        <DeleteBayButton
          bayId={bay.id!}
          bayCode={bay.code}
          onDeleteBay={onDeleteBay}
        />
      </div>
    </div>
  );
};
