// src/features/common/bay-item-list/components/BayCard.tsx
import React from "react";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BayItemDialog } from "./BayItemDialog";

interface BayCardProps {
  bay: Bay & { items: Item[] };
}

export const BayCard: React.FC<BayCardProps> = ({ bay }) => {
  return (
    <Card className="border shadow-none mb-1 p-2 rounded-sm ">
      <CardHeader className="flex flex-row justify-between items-center px-2 py-0">
        <div>
          <CardTitle className="text-sm font-semibold leading-tight">
            {bay.code}
          </CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground leading-tight">
            {bay.items.length} {bay.items.length === 1 ? "item" : "items"}
          </CardDescription>
        </div>
        <BayItemDialog bay={bay} />
      </CardHeader>
    </Card>
  );
};
