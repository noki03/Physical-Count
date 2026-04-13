import React, { useState } from "react";
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
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic mt-2">
        No items recorded.
      </p>
    );
  }

  return (
    <>
      <ul className="overflow-hidden">
        {items.map((item) => {
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
                  {item.isUploaded && (
                    <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                      Synced
                    </span>
                  )}
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
              <button
                type="button"
                className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
                aria-label={`Delete ${item.itemCode}`}
                onClick={() => setItemToDelete(item)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Single Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={itemToDelete !== null}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        title={
          itemToDelete
            ? `Delete Item: ${itemToDelete.itemCode}?`
            : "Delete Item"
        }
        description={
          itemToDelete
            ? `Are you sure you want to permanently delete the record for item ${itemToDelete.itemCode} (Qty: ${itemToDelete.quantity})?`
            : ""
        }
        onConfirm={async () => {
          if (itemToDelete?.id && onDeleteItem) {
            await Promise.resolve(onDeleteItem(itemToDelete.id));
            setItemToDelete(null);
          }
        }}
        confirmText="Delete Item"
        confirmVariant="destructive"
        trigger={<div className="hidden" />} // Hidden trigger - controlled by state
      />
    </>
  );
};
