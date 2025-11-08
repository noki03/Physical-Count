// src/features/common/bay-item-list/components/ResetDatabaseButton.tsx
import React from "react";
import { Button } from "@/components/ui/button";

interface ResetDatabaseButtonProps {
  onReset: () => void;
  resetting: boolean;
}

export const ResetDatabaseButton: React.FC<ResetDatabaseButtonProps> = ({
  onReset,
  resetting,
}) => {
  return (
    <div className="text-center mt-4">
      <Button variant="destructive" onClick={onReset} disabled={resetting}>
        {resetting ? "Resetting..." : "Reset Database"}
      </Button>
    </div>
  );
};
