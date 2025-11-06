// src/app/App.tsx
import BayScreen from "@/features/bay/BayScreen";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <BayScreen />
      <Toaster richColors />
    </main>
  );
};

export default App;
