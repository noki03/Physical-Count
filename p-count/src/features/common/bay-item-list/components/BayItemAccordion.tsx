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
import { BayItemList } from "./BayItemList";

interface BayItemAccordionProps {
  bays: (Bay & { items: Item[] })[];
}

export const BayItemAccordion: React.FC<BayItemAccordionProps> = ({ bays }) => {
  return (
    <Accordion type="single" collapsible>
      {bays.map((bay) => (
        <AccordionItem key={bay.code} value={bay.code}>
          <AccordionTrigger>
            <span className="font-medium">{bay.code}</span>
          </AccordionTrigger>

          <AccordionContent>
            <BayItemList items={bay.items} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
