// src/features/bay/BayScreen.tsx
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useBayData } from "./hooks/useBayData";

interface BayScreenProps {
  onBayCollected?: (bayCode: string) => void;
}

const BayScreen: React.FC<BayScreenProps> = ({ onBayCollected }) => {
  const [bayCode, setBayCode] = useState("");
  const [error, setError] = useState("");
  const { addBay } = useBayData();

  const handleCollect = () => {
    if (!bayCode.trim()) {
      setError("Please enter or scan a bay code.");
      return;
    }

    addBay(bayCode.trim());
    setError("");
    toast.success(`Bay ${bayCode} collected successfully!`);

    if (onBayCollected) {
      onBayCollected(bayCode.trim());
    }

    setBayCode("");
  };

  return (
    <div className="w-full max-w-sm">
      <Card className="shadow-lg border-border">
        <CardHeader>
          <h1 className="text-xl font-semibold text-center">P-Count System</h1>
          <p className="text-sm text-muted-foreground text-center">
            Identify a bay before scanning items.
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col space-y-4 mt-2">
            <Input
              type="text"
              placeholder="Enter or scan Bay code"
              value={bayCode}
              onChange={(e) => setBayCode(e.target.value)}
            />

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleCollect} className="w-full">
              Collect Bay
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BayScreen;
