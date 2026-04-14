/**
 * DASHBOARD BAYS LIST - DELETE ACTION
 * Extracted delete button component for BayCard.
 * Handles confirmation dialog for deleting an entire Bay.
 */
// src/features/common/bay-item-list/components/DeleteBayButton.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";

interface DeleteBayButtonProps {
  bayId: number;
  bayCode: string;
  onDeleteBay: (id: number) => void;
}

export const DeleteBayButton: React.FC<DeleteBayButtonProps> = ({
  bayId,
  bayCode,
  onDeleteBay,
}) => {
  // Trigger button (trash icon)
  const triggerButton = (
    <Button variant="ghost" size="icon">
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );

  return (
    <ConfirmationDialog
      trigger={triggerButton}
      title={`Delete Bay ${bayCode}`}
      description={`Are you sure you want to delete bay "${bayCode}"? This action cannot be undone.`}
      onConfirm={() => onDeleteBay(bayId)}
      confirmText="Delete Bay"
      confirmVariant="destructive"
    />
  );
};
