import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ItemFormProps {
  itemCode: string;
  quantity: number;
  error: string;
  isAdding: boolean;
  onItemCodeChange: (v: string) => void;
  onQuantityChange: (v: number) => void;
  onSubmit: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({
  itemCode,
  quantity,
  error,
  onItemCodeChange,
  onQuantityChange,
  onSubmit,
  isAdding,
}) => {
  const itemInputRef = useRef<HTMLInputElement>(null);
  const qtyInputRef = useRef<HTMLInputElement>(null);

  const handleItemEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      qtyInputRef.current?.focus();
      qtyInputRef.current?.select();
    }
  };

  const handleQtyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();

      // Delay slightly so state resets first before focusing back
      setTimeout(() => {
        itemInputRef.current?.focus();
        itemInputRef.current?.select();
      }, 50);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-2">
      {/* ITEM CODE INPUT */}
      <Input
        ref={itemInputRef}
        type="text"
        placeholder="Enter or scan item code"
        value={itemCode}
        onChange={(e) => onItemCodeChange(e.target.value)}
        disabled={isAdding}
        autoFocus
        onKeyDown={handleItemEnter}
        autoComplete="off"
        enterKeyHint="next"
        autoCapitalize="characters"
      />

      {/* QUANTITY INPUT */}
      <Input
        ref={qtyInputRef}
        type="number"
        placeholder="Quantity"
        value={quantity}
        min={1}
        disabled={isAdding}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        onFocus={(e) => e.target.select()}
        onKeyDown={handleQtyEnter}
        inputMode="decimal"
        pattern="[0-9]*"
        enterKeyHint="done"
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={onSubmit} className="w-full" disabled={isAdding}>
        {isAdding ? "Adding..." : "Add Item"}
      </Button>
    </div>
  );
};
