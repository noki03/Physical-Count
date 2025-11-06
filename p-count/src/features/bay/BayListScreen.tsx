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
    <div className="w-full max-w-md mx-auto mt-8">
      <Card className="shadow-lg border-border">
        <CardHeader>
          <h2 className="text-lg font-semibold text-center">
            Scanned Bays Summary
          </h2>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {bays.map((bay) => (
              <AccordionItem key={bay.code} value={bay.code}>
                <AccordionTrigger>{bay.code}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground italic">
                    Bay added successfully.
                  </p>
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
