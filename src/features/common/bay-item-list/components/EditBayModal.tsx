// src/features/common/bay-item-list/components/EditBayModal.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Bay } from "@/features/bay/types";

interface EditBayModalProps {
  bay: Bay;
  onSave: (id: number, newCode: string) => void;
}

export const EditBayModal: React.FC<EditBayModalProps> = ({ bay, onSave }) => {
  const [open, setOpen] = useState(false);
  const [newCode, setNewCode] = useState(bay.code);

  const handleSave = () => {
    if (!newCode.trim()) return;
    onSave(bay.id!, newCode.trim());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Bay</DialogTitle>
          <DialogDescription>Update the code for this bay.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">Bay Code</label>
          <Input
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="Enter new bay code"
          />
        </div>

        <DialogFooter className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
