// src/App.tsx
import BayScreen from "@/features/bay/BayScreen";
import ItemScreen from "@/features/item/ItemScreen";
import UploadScreen from "@/features/common/upload/UploadScreen";
import { BayRepository } from "@/lib/db/repositories/bayRepository";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { BayItemListScreen } from "@/features/common/bay-item-list/BayItemListScreen";
import { SpeedDial } from "@/components/common/SpeedDial";
import Header from "@/components/layout/Header";
import { List, ScanBarcode, UploadCloud } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const App = () => {
  const { currentStep, currentBay, setStep, setCurrentBay } = useAppStore();

  const handleBayCollected = (bay: { id: number; code: string }) => {
    setCurrentBay(bay);
    setStep("addItems");
  };

  const handleFinishItems = async () => {
    if (currentBay?.id) {
      await BayRepository.finalizeBay(currentBay.id);
    }
    setCurrentBay(null);
    setStep("scanBay");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-col p-2 gap-4">
        {currentStep === "scanBay" && (
          <BayScreen onBayCollected={handleBayCollected} />
        )}

        {currentStep === "addItems" && currentBay && (
          <div className="w-full max-w-md flex flex-col gap-4 mx-auto">
            <ItemScreen bayId={currentBay.id!} bayCode={currentBay.code} />

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

        {/* Bottom SpeedDial Floating Actions */}
        <SpeedDial
          placement="bottom-right"
          actions={[
            {
              icon: <ScanBarcode size={18} />,
              label: "Scan Bay",
              onClick: () => setStep("scanBay"),
            },
            {
              icon: <List size={18} />,
              label: "View Bays & Items",
              onClick: () => setStep("viewList"),
            },
            {
              icon: <UploadCloud size={18} />,
              label: "Upload",
              onClick: () => setStep("upload"),
            },
          ]}
        />

        <Toaster richColors />
      </main>
    </div>
  );
};

export default App;
