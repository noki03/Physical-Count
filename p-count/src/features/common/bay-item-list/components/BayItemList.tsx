import React, { useState } from "react";
import { Barcode } from "lucide-react";
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
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in duration-500">
        <div className="bg-muted/30 p-5 rounded-full mb-4">
          <Barcode
            className="size-10 text-muted-foreground/50"
            strokeWidth={1.5}
          />
        </div>
        <h4 className="text-lg font-semibold text-foreground tracking-tight mb-1">
          No items recorded
        </h4>
        <p className="text-sm text-muted-foreground max-w-[200px]">
          Scan items into this Bay to see them listed here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col divide-y divide-border/70 mt-4 ">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-background"
            >
              {/* Left section  */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base tracking-tight">
                    {item.itemCode}
                  </span>
                  {item.isUploaded && (
                    <span className="text-[10px] font-medium bg-green-500/15 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                      Synced
                    </span>
                  )}
                </div>

                <span className="text-xs text-muted-foreground">
                  {item.timestamp
                    ? new Date(item.timestamp).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>

              {/* Right section*/}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold bg-muted/50 px-2 py-1 rounded-md text-foreground">
                  ×{item.quantity}
                </span>
                <button
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors p-2 rounded-md"
                  onClick={() => {
                    if (onDeleteItem && item.id !== undefined) {
                      onDeleteItem(item.id);
                    }
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

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
