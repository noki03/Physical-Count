// src/App.tsx
import { useState } from "react";
import BayScreen from "@/features/bay/BayScreen";
import ItemScreen from "@/features/item/ItemScreen";
import BayItemListScreen from "@/features/common/BayItemListScreen";
import UploadScreen from "@/features/common/UploadScreen";
import { BayRepository } from "@/lib/db/repositories/bayRepository";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

type Step = "scanBay" | "addItems" | "viewList" | "upload";

const App = () => {
  const [currentStep, setCurrentStep] = useState<Step>("scanBay");
  const [currentBay, setCurrentBay] = useState<string>("");

  const handleBayCollected = (bayCode: string) => {
    setCurrentBay(bayCode);
    setCurrentStep("addItems");
  };

  const handleFinishItems = async () => {
    if (currentBay) {
      await BayRepository.finalizeBay(currentBay);
    }
    setCurrentBay("");
    setCurrentStep("scanBay");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start p-4 space-y-4">
      {currentStep === "scanBay" && (
        <BayScreen onBayCollected={handleBayCollected} />
      )}

      {currentStep === "addItems" && currentBay && (
        <div className="w-full max-w-md flex flex-col space-y-4">
          <ItemScreen bayCode={currentBay} />
          <Button
            variant="outline"
            onClick={handleFinishItems}
            className="w-full"
          >
            Finish and Scan Another Bay
          </Button>
        </div>
      )}

      {currentStep === "viewList" && <BayItemListScreen />}
      {currentStep === "upload" && <UploadScreen />}

      {/* Bottom Controls */}
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => setCurrentStep("scanBay")}>
          Scan Bay
        </Button>
        <Button variant="outline" onClick={() => setCurrentStep("viewList")}>
          View Bays & Items
        </Button>
        <Button variant="outline" onClick={() => setCurrentStep("upload")}>
          Upload
        </Button>
      </div>

      <Toaster richColors />
    </main>
  );
};

export default App;
