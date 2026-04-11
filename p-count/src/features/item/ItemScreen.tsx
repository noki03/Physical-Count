// item/ItemScreen.tsx
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useItemData } from "./hooks/useItemData";
import { ItemHeader } from "./components/ItemHeader";
import { ItemForm } from "./components/ItemForm";
import { ItemList } from "./components/ItemList";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ItemScreenProps {
  bayId: number;
  bayCode: string;
}

const ItemScreen: React.FC<ItemScreenProps> = ({ bayId, bayCode }) => {
  const [itemCode, setItemCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const { items, addItem, deleteItem, isAdding, isLoading } =
    useItemData(bayId);

  const handleAddItem = async () => {
    if (!itemCode.trim()) return setError("Please enter or scan an item code.");
    if (quantity <= 0) return setError("Quantity must be at least 1.");

    setError("");

    try {
      await addItem({
        bayId,
        bayCode,
        itemCode: itemCode.trim(),
        quantity,
        timestamp: Date.now(),
      });

      toast.success(`Item ${itemCode} added to bay ${bayCode}!`);
      setItemCode("");
      setQuantity(1);
    } catch {
      setError("Failed to add item. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete === null) return;

    try {
      await deleteItem(itemToDelete);
      toast.success("Item deleted successfully!");
      setItemToDelete(null);
    } catch {
      toast.error("Failed to delete item. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Card className="border-border">
        <CardHeader>
          <ItemHeader bayCode={bayCode} />
        </CardHeader>

        <CardContent className="px-3.5 ">
          <ItemForm
            itemCode={itemCode}
            quantity={quantity}
            error={error}
            onItemCodeChange={setItemCode}
            onQuantityChange={setQuantity}
            onSubmit={handleAddItem}
            isAdding={isAdding}
          />

          <ItemList
            items={items}
            isLoading={isLoading}
            onDeleteClick={(id) => setItemToDelete(id)}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={itemToDelete !== null}
        onOpenChange={(open: boolean) => !open && setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ItemScreen;
