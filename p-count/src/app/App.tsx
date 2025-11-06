// src/app/App.tsx
import { useState } from "react";
import BayScreen from "@/features/bay/BayScreen";
import BayListScreen from "@/features/bay/BayListScreen";
import ItemScreen from "@/features/item/ItemScreen";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

type View = "scan" | "list" | "items";

const App = () => {
  const [view, setView] = useState<View>("scan");
  const [activeBay, setActiveBay] = useState<string | null>(null);

  const handleBayCollected = (bayCode: string) => {
    setActiveBay(bayCode);
    setView("items");
  };

  const handleBack = () => {
    setActiveBay(null);
    setView("scan");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 space-y-4">
      {view === "scan" && <BayScreen onBayCollected={handleBayCollected} />}
      {view === "list" && <BayListScreen />}
      {view === "items" && activeBay && (
        <ItemScreen bayCode={activeBay} onBack={handleBack} />
      )}

      {view !== "items" && (
        <Button
          variant="outline"
          onClick={() => setView(view === "scan" ? "list" : "scan")}
        >
          {view === "scan" ? "View Scanned Bays" : "Back to Scanning"}
        </Button>
      )}

      <Toaster richColors />
    </main>
  );
};

export default App;
