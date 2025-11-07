import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useItemData } from "./hooks/useItemData";

interface ItemScreenProps {
  bayCode: string;
}

const ItemScreen: React.FC<ItemScreenProps> = ({ bayCode }) => {
  const [itemCode, setItemCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { addItem, items } = useItemData(bayCode);

  const handleAddItem = async () => {
    if (!itemCode.trim()) {
      setError("Please enter or scan an item code.");
      return;
    }
    if (quantity <= 0) {
      setError("Quantity must be at least 1.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addItem({
        bayCode,
        itemCode: itemCode.trim(),
        quantity,
        timestamp: Date.now(),
      });
      toast.success(`Item ${itemCode} added to bay ${bayCode}!`);
      setItemCode("");
      setQuantity(1);
    } catch (err) {
      console.error(err);
      setError("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Card className="border-border">
        <CardHeader>
          <h1 className="text-xl font-semibold text-center">
            Add Item to Bay {bayCode}
          </h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 mt-2">
            <Input
              type="text"
              placeholder="Enter or scan item code"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              disabled={loading}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={loading}
              min={1}
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              onClick={handleAddItem}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Item"}
            </Button>

            {items.length > 0 && (
              <Card className="mt-4 border-border">
                <CardHeader>
                  <h2 className="text-sm font-semibold text-center">
                    Current Items
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm">
                    {items.map((i) => (
                      <li key={i.id}>
                        {i.itemCode} x{i.quantity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemScreen;
