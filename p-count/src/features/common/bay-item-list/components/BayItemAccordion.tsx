// src/features/common/bay-item-list/components/BayItemAccordion.tsx
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";

interface BayItemAccordionProps {
  bays: (Bay & { items: Item[] })[];
}

export const BayItemAccordion: React.FC<BayItemAccordionProps> = ({ bays }) => {
  return (
    <Accordion type="single" collapsible>
      {bays.map((bay) => (
        <AccordionItem key={bay.code} value={bay.code}>
          <AccordionTrigger>{bay.code}</AccordionTrigger>
          <AccordionContent>
            {bay.items.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No items added yet.
              </p>
            ) : (
              <ul className="list-disc pl-5 text-sm">
                {bay.items.map((item) => (
                  <li key={item.id}>
                    {item.itemCode} ×{item.quantity}
                  </li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
