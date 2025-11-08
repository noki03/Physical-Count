// src/features/common/bay-item-list/components/ResetDatabaseDialog.tsx
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
          variant="destructive"
          size="lg"
          className="w-full sm:w-auto bg-red-700 text-white hover:bg-red-800 transition"
          disabled={resetting}
        >
          {resetting ? "Resetting..." : "Reset Database"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="mx-auto p-6 rounded-xl shadow-lg border border-border bg-background">
        <AlertDialogHeader className="text-center space-y-2">
          <AlertDialogTitle className="text-lg font-bold text-destructive-foreground">
            Confirm Data Reset
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            This action will <strong>permanently clear</strong> all local bay
            and item data. This cannot be undone. Are you sure you want to
            continue?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              disabled={resetting}
            >
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={handleConfirm}
              className="w-full sm:w-auto bg-red-700 text-white hover:bg-red-800 transition"
              disabled={resetting}
            >
              {resetting ? "Resetting..." : "Confirm Reset"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
