import React from "react";
import type { Item } from "@/features/item/types";

interface BayItemListProps {
  items: Item[];
}

export const BayItemList: React.FC<BayItemListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">No items recorded.</p>
    );
  }

  return (
    <ul className="space-y-2 mt-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center p-2 border rounded-md border-border bg-background/50 hover:bg-muted/40 transition"
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {item.itemCode} × {item.quantity}
            </span>
            {item.timestamp && (
              <span className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
