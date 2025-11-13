// src/features/common/bay-item-list/components/BayItemDialog.tsx
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

interface BayItemDialogProps {
  bay: Bay & { items: Item[] };
}

export const BayItemDialog: React.FC<BayItemDialogProps> = ({ bay }) => {
  const [open, setOpen] = useState(false);

  const totalItems = bay.items.length;
  const totalQuantity = bay.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Items
        </Button>
      </DialogTrigger>

      <DialogContent className="w-screen h-screen max-w-none p-0 m-0 rounded-none flex flex-col bg-background">
        {/* Header */}
        <DialogHeader className="shrink-0 p-4 border-b border-border">
          <DialogTitle className="text-lg font-semibold">
            {bay.code}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            List of recorded items in this bay
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-2">
          <BayItemList items={bay.items} />
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border mt-2 p-2 flex justify-center">
          <span className="text-[11px] text-muted-foreground italic text-center">
            {totalItems} {totalItems === 1 ? "item" : "items"} • {totalQuantity}{" "}
            total units
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
