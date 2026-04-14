import { ScanBarcode, List, UploadCloud } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const { currentStep, setStep } = useAppStore();

  const navItems = [
    { id: "scanBay", icon: ScanBarcode, label: "Scan" },
    { id: "viewList", icon: List, label: "Bays" },
    { id: "upload", icon: UploadCloud, label: "Upload" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-background/90 backdrop-blur-md border-t border-border/50 z-50 flex justify-around items-center pb-safe">
      {navItems.map((item) => {
        const isActive = currentStep === item.id || (currentStep === "addItems" && item.id === "scanBay");
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setStep(item.id as any)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
