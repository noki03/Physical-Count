import React, { useState } from "react";
import { toast } from "sonner";
import { useBayData } from "./hooks/useBayData";
import { BayForm } from "./components/BayForm";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { Button } from "@/components/ui/button";

interface BayScreenProps {
  onBayCollected?: (bay: { id: number; code: string }) => void;
}

const BayScreen: React.FC<BayScreenProps> = ({ onBayCollected }) => {
  const [bayCode, setBayCode] = useState("");
  const [error, setError] = useState("");
  const { addBay, addBayStatus } = useBayData();

  const handleCollect = async () => {
    if (!bayCode.trim()) {
      setError("Please enter or scan a bay code.");
      return;
    }
    setError("");

    try {
      const newBay = await addBay(bayCode.trim());
      toast.success(`Bay ${bayCode} collected successfully!`);
      onBayCollected?.(newBay);
      setBayCode("");
    } catch (err) {
      console.error(err);
      setError("Failed to add bay. Please try again.");
    }
  };

  const isLoading = addBayStatus === "pending";

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-4 pb-24 pt-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">P-Count System</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Identify a bay before scanning items.
        </p>
      </div>

      <div className="space-y-4">
        <BayForm
          bayCode={bayCode}
          error={error}
          isLoading={isLoading}
          onChange={setBayCode}
          onSubmit={handleCollect}
        />
      </div>

      <BottomActionBar>
        <Button
          onClick={handleCollect}
          className="w-full"
          disabled={isLoading}
          size="default"
        >
          {isLoading ? "Collecting..." : "Collect Bay"}
        </Button>
      </BottomActionBar>
    </div>
  );
};

export default BayScreen;
