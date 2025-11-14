import React from "react";
import type { Item } from "@/features/item/types";
import { Trash2 } from "lucide-react";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";

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
        const DeleteItemTrigger = (
          <button
            type="button"
            className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
            aria-label={`Delete ${item.itemCode}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        );

        return (
          <li
            key={item.id}
            className="py-2 px-2 flex justify-between items-start text-sm hover:bg-muted/40 transition-colors border border-border rounded mb-0.5"
          >
            {/* Left section  */}
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

            {/* Right section*/}
            <ConfirmationDialog
              trigger={DeleteItemTrigger}
              title={`Delete Item: ${item.itemCode}?`}
              description={`Are you sure you want to permanently delete the record for item ${item.itemCode} (Qty: ${item.quantity})?`}
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
