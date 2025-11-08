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
import { EditBayModal } from "./EditBayModal";

interface BayItemAccordionProps {
  bays: (Bay & { items: Item[] })[];
  onUpdateBay?: (id: number, newCode: string) => void;
}

export const BayItemAccordion: React.FC<BayItemAccordionProps> = ({
  bays,
  onUpdateBay,
}) => {
  return (
    <Accordion type="single" collapsible>
      {bays.map((bay) => (
        <AccordionItem key={bay.code} value={bay.code}>
          <div className="flex justify-between items-center px-2 sm:px-3">
            {/* Accordion header trigger on the left */}
            <AccordionTrigger className="flex-1 text-left py-3">
              <span className="font-medium">{bay.code}</span>
            </AccordionTrigger>

            {/* Action buttons on the right (NOT inside the trigger) */}
            {onUpdateBay && (
              <div className="ml-2">
                <EditBayModal bay={bay} onSave={onUpdateBay} />
              </div>
            )}
          </div>

          <AccordionContent>
            <BayItemList items={bay.items} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
