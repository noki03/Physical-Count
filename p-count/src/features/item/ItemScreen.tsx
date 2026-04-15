/**
 * ACTIVE SCANNING LIST
 * Renders the UI for actively scanning new items into the current Bay.
 * Includes the input field and the real-time list of scanned items.
 */

import React, { useState } from "react";

import { useItemData } from "./hooks/useItemData";
import { ItemHeader } from "./components/ItemHeader";
import { ItemForm } from "./components/ItemForm";
import { ItemList } from "./components/ItemList";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { Button } from "@/components/ui/button";
import type { Item } from "./types";

interface ItemScreenProps {
  bayId: number;
  bayCode: string;
  onFinishItems?: () => void;
}

const ItemScreen: React.FC<ItemScreenProps> = ({
  bayId,
  bayCode,
  onFinishItems,
}) => {
  const [itemCode, setItemCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

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

      setItemCode("");
      setQuantity(1);
    } catch {
      setError("Failed to add item. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete?.id) return;

    try {
      await deleteItem({
        id: itemToDelete.id,
        itemCode: itemToDelete.itemCode,
      });
      setItemToDelete(null); // Keep UI state reset in the UI layer
    } catch (error) {
      // Error toast is now handled by the data layer
      console.error("Deletion failed:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-4 pb-24 ">
      <div className="mb-6">
        <ItemHeader bayCode={bayCode} />
      </div>

      <div className="space-y-6 ">
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
          onDeleteClick={(item) => setItemToDelete(item)}
        />
      </div>

      <BottomActionBar>
        <Button
          variant="outline"
          onClick={() => onFinishItems?.()}
          className="w-full"
        >
          Finish and Scan Another Bay
        </Button>
      </BottomActionBar>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        trigger={<div />} // Hidden trigger - controlled by state
        title={
          itemToDelete
            ? `Delete Item: ${itemToDelete.itemCode}?`
            : "Delete Item"
        }
        description={
          itemToDelete
            ? `Are you sure you want to permanently delete item ${itemToDelete.itemCode} (Qty: ${itemToDelete.quantity})?`
            : ""
        }
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        confirmVariant="destructive"
        open={itemToDelete !== null}
        onOpenChange={(open: boolean) => !open && setItemToDelete(null)}
      />
    </div>
  );
};

export default ItemScreen;
