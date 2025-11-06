// src/app/App.tsx
import { useState } from "react";
import BayScreen from "@/features/bay/BayScreen";
import BayListScreen from "@/features/bay/BayListScreen";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

const App = () => {
  const [view, setView] = useState<"scan" | "list">("scan");

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 space-y-4">
      {view === "scan" ? <BayScreen /> : <BayListScreen />}

      <Button
        variant="outline"
        onClick={() => setView(view === "scan" ? "list" : "scan")}
      >
        {view === "scan" ? "View Scanned Bays" : "Back to Scanning"}
      </Button>

      <Toaster richColors />
    </main>
  );
};

export default App;
