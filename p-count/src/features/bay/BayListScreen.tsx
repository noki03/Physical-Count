// src/features/bay/BayListScreen.tsx
import React from "react";
import { useBayData } from "./hooks/useBayData";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const BayListScreen: React.FC = () => {
  const { bays } = useBayData();

  if (bays.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground mt-8">
        No bays collected yet.
      </p>
    );
  }

  return (
    <div className="w-full max-w-md mt-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-center">
            📋 Scanned Bays Summary
          </h2>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {bays.map((bay) => (
              <AccordionItem key={bay.code} value={bay.code}>
                <AccordionTrigger>{bay.code}</AccordionTrigger>
                <AccordionContent>
                  {bay.items.length > 0 ? (
                    <ul className="text-sm text-muted-foreground">
                      {bay.items.map((item) => (
                        <li key={item.id} className="py-1 border-b">
                          {item.name} — Qty: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No items scanned yet.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default BayListScreen;
