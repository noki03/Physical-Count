// src/App.tsx
import { useState } from "react";
import BayScreen from "@/features/bay/BayScreen";
import ItemScreen from "@/features/item/ItemScreen";
import UploadScreen from "@/features/common/upload/UploadScreen";
import { BayRepository } from "@/lib/db/repositories/bayRepository";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { BayItemListScreen } from "@/features/common/bay-item-list/BayItemListScreen";

type Step = "scanBay" | "addItems" | "viewList" | "upload";

const App = () => {
  const [currentStep, setCurrentStep] = useState<Step>("scanBay");
  const [currentBay, setCurrentBay] = useState<{
    id: number;
    code: string;
  } | null>(null);

  const handleBayCollected = (bay: { id: number; code: string }) => {
    setCurrentBay(bay);
    setCurrentStep("addItems");
  };

  const handleFinishItems = async () => {
    if (currentBay) {
      await BayRepository.finalizeBay(currentBay.id);
    }
    setCurrentBay(null);
    setCurrentStep("scanBay");
  };

  return (
    <main className="text-foreground flex flex-col p-2 gap-4 bg-background">
      {currentStep === "scanBay" && (
        <BayScreen onBayCollected={handleBayCollected} />
      )}

      {currentStep === "addItems" && currentBay && (
        <div className="w-full max-w-md flex flex-col gap-4 mx-auto">
          <ItemScreen bayId={currentBay.id} bayCode={currentBay.code} />

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
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap gap-2 w-full max-w-md">
          <Button
            variant="outline"
            onClick={() => setCurrentStep("scanBay")}
            className="flex-1 min-w-[100px]"
          >
            Scan Bay
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentStep("viewList")}
            className="flex-1 min-w-[100px]"
          >
            View Bays & Items
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentStep("upload")}
            className="flex-1 min-w-[100px]"
          >
            Upload
          </Button>
        </div>
      </div>

      <Toaster richColors />
    </main>
  );
};

export default App;
