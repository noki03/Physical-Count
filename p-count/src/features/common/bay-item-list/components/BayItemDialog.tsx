import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";
import { BayItemList } from "./BayItemList";
import { useItemData } from "@/features/item/hooks/useItemData";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";

interface BayItemDialogProps {
  bay: Bay & { items: Item[] };
}

export const BayItemDialog: React.FC<BayItemDialogProps> = ({ bay }) => {
  const [open, setOpen] = useState(false);

  const { deleteItem, deleteAllItems, isDeletingAll } = useItemData(bay.id);

  const totalItems = bay.items.length;
  const totalQuantity = bay.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleDeleteAllConfirmed = async () => {
    await deleteAllItems();
  };

  const DeleteButtonTrigger = (
    <Button
      variant="destructive"
      size="sm"
      disabled={totalItems === 0 || isDeletingAll}
    >
      {isDeletingAll ? "Deleting..." : "Delete All Items"}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Items
        </Button>
      </DialogTrigger>

      <DialogContent className="w-screen h-screen max-w-none p-0 m-0 rounded-none flex flex-col bg-background">
        {/* Header  */}
        <DialogHeader className="shrink-0 p-4 border-b border-border">
          <DialogTitle className="text-lg font-semibold">
            {bay.code}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            List of recorded items in this bay
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable item list*/}
        <div className="flex-1 overflow-y-auto p-2">
          <BayItemList
            items={bay.items}
            onDeleteItem={(id) => deleteItem(id)}
          />
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border p-3 flex flex-col gap-3 items-center">
          {/* Stats (No Change) */}
          <span className="text-[11px] text-muted-foreground italic text-center">
            {totalItems} {totalItems === 1 ? "item" : "items"} • {totalQuantity}{" "}
            total units
          </span>

          <ConfirmationDialog
            trigger={DeleteButtonTrigger}
            title={`Confirm Deletion for Bay ${bay.code}`}
            description="This action will permanently delete ALL item records in this bay. Are you absolutely sure you want to proceed?"
            onConfirm={handleDeleteAllConfirmed}
            confirmText="Yes, Delete All"
            confirmVariant="destructive"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
