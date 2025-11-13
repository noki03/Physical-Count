// src/features/common/bay-item-list/components/ResetDatabaseDialog.tsx
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ResetDatabaseDialogProps {
  onConfirm: () => Promise<void> | void;
  resetting: boolean;
}

export const ResetDatabaseDialog: React.FC<ResetDatabaseDialogProps> = ({
  onConfirm,
  resetting,
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-muted-foreground "
          disabled={resetting}
        >
          <Trash2 className="h-4 w-4" />
          {resetting ? "Resetting..." : "Reset All Data"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset All Data?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all bay and item data. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={resetting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={resetting}
            className="bg-destructive text-destructive-foreground text-white hover:bg-destructive/90"
          >
            {resetting ? "Resetting..." : "Reset Data"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
