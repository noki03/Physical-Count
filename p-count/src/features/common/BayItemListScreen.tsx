// src/features/common/BayItemListScreen.tsx
import React, { useEffect, useState } from "react";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Item } from "@/features/item/types";
import type { Bay } from "@/features/bay/types";

const BayItemListScreen: React.FC = () => {
  const [bays, setBays] = useState<(Bay & { items: Item[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBays = async () => {
      setLoading(true);
      const data = await CommonRepository.getBaysWithItems();
      setBays(data);
      setLoading(false);
    };

    fetchBays();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-sm text-muted-foreground mt-8">
        Loading bays...
      </p>
    );
  }

  if (bays.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground mt-8">
        No bays collected yet.
      </p>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Card className="shadow border-border">
        <CardHeader>
          <h2 className="text-lg font-semibold text-center">Bays & Items</h2>
        </CardHeader>
        <CardContent>
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
                          {item.itemCode} x{item.quantity}
                        </li>
                      ))}
                    </ul>
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

export default BayItemListScreen;
