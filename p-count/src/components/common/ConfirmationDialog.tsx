import React from "react";
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

interface ConfirmationDialogProps {
  /** The React node (e.g., a Button) that triggers the dialog. */
  trigger: React.ReactNode;
  /** The main title for the dialog (e.g., "Confirm Deletion"). */
  title: string;
  /** The main descriptive text explaining the action (e.g., "Are you sure you want to delete all items?"). */
  description: string;
  /** Function to execute when the user confirms the action. */
  onConfirm: () => void;
  /** Optional text for the confirm button. Defaults to "Continue". */
  confirmText?: string;
  /** Optional text for the cancel button. Defaults to "Cancel". */
  cancelText?: string;
  /** Optional variant for the confirm button (e.g., "destructive" for deletes). */
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

/**
 * A reusable component for requesting confirmation before executing a critical action.
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  trigger,
  title,
  description,
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
  confirmVariant = "destructive",
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} asChild>
            {/* The action button will be destructive if specified, matching the seriousness of deletion */}
            <Button variant={confirmVariant}>{confirmText}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
