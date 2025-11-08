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
import { Button } from "@/components/ui/button";
import type { Item } from "@/features/item/types";
import type { Bay } from "@/features/bay/types";

const BayItemListScreen: React.FC = () => {
  const [bays, setBays] = useState<(Bay & { items: Item[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  const fetchBays = async () => {
    setLoading(true);
    const data = await CommonRepository.getBaysWithItems();
    setBays(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBays();
  }, []);

  const handleReset = async () => {
    const confirmReset = confirm(
      "Are you sure you want to clear all local data? This action cannot be undone."
    );
    if (!confirmReset) return;

    setResetting(true);
    await CommonRepository.resetDatabase();
    await fetchBays(); // refresh list (should now be empty)
    setResetting(false);
  };

  if (loading) {
    return (
      <p className="text-center text-sm text-muted-foreground mt-8">
        Loading bays...
      </p>
    );
  }

  if (bays.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          No bays collected yet.
        </p>
        <Button
          variant="destructive"
          onClick={handleReset}
          disabled={resetting}
        >
          {resetting ? "Resetting..." : "Reset Database"}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-4">
      <Card className="shadow border-border">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-center flex-1">
            Bays & Items
          </h2>
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
                          {item.itemCode} ×{item.quantity}
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

      <div className="text-center">
        <Button
          variant="destructive"
          onClick={handleReset}
          disabled={resetting}
        >
          {resetting ? "Resetting..." : "Reset Database"}
        </Button>
      </div>
    </div>
  );
};

export default BayItemListScreen;
