import React from "react";
import type { Item } from "@/features/item/types";
import { Trash2 } from "lucide-react";
// Import ConfirmationDialog for individual item deletion
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
// Import Button for the ConfirmationDialog's internal use (trigger is a <button> but the dialog itself uses <Button>)
import { Button } from "@/components/ui/button";

interface BayItemListProps {
  items: Item[];
  onDeleteItem?: (itemId: number) => void;
}

export const BayItemList: React.FC<BayItemListProps> = ({
  items,
  onDeleteItem,
}) => {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic mt-2">
        No items recorded.
      </p>
    );
  }

  return (
    <ul className="overflow-hidden">
      {items.map((item) => {
        // Define the button element that will trigger the dialog
        const DeleteItemTrigger = (
          <button
            type="button"
            className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
            aria-label={`Delete ${item.itemCode}`}
            // IMPORTANT: onClick is removed here, as clicking this now opens the dialog
          >
            <Trash2 className="w-4 h-4" />
          </button>
        );

        return (
          <li
            key={item.id}
            className="py-2 px-2 flex justify-between items-start text-sm hover:bg-muted/40 transition-colors border border-border rounded mb-0.5"
          >
            {/* Left section (No Change) */}
            <div className="flex flex-col leading-tight">
              <div className="flex items-center space-x-2">
                <span className="font-medium tracking-tight">
                  {item.itemCode}
                </span>
                <span className="text-xs font-medium bg-muted px-1.5 py-0.5 rounded">
                  Qty: {item.quantity}
                </span>
              </div>

              {item.timestamp && (
                <span className="text-[11px] text-muted-foreground">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              )}
            </div>

            {/* Right section: delete icon WRAPPED in ConfirmationDialog */}
            <ConfirmationDialog
              trigger={DeleteItemTrigger} // The trash icon button
              title={`Delete Item: ${item.itemCode}?`}
              description={`Are you sure you want to permanently delete the record for item ${item.itemCode} (Qty: ${item.quantity})?`}
              // The action to execute upon confirmation
              onConfirm={() => onDeleteItem?.(item.id!)}
              confirmText="Delete Item"
              confirmVariant="destructive"
            />
          </li>
        );
      })}
    </ul>
  );
};
