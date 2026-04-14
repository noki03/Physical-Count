import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Classic } from "@theme-toggles/react";
import { Menu, ScanBarcode, List, UploadCloud } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setStep } = useAppStore();
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navTo = (step: any) => {
    setStep(step);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50 h-14 flex items-center justify-between px-4">
      <h1 className="text-lg font-bold tracking-tight text-foreground">
        Physical Count
      </h1>

      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center hover:bg-accent rounded-md h-9 w-9 transition-colors">
          <Classic
            {...({
              toggled: theme === "dark",
              toggle: toggleTheme,
              style: {
                transform: "scale(1.4)",
                transformOrigin: "center",
                display: "flex",
                margin: "10px",
                justifyContent: "center",
                alignItems: "center",
              },
            } as any)}
          />
        </div>

        {/* Top Right Menu Prototype */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-muted text-foreground"
          >
            <Menu size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-popover text-popover-foreground rounded-md border shadow-md overflow-hidden z-50">
              <button
                onClick={() => navTo("scanBay")}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm font-medium"
              >
                <ScanBarcode size={16} /> Scan Bay
              </button>
              <button
                onClick={() => navTo("viewList")}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm font-medium"
              >
                <List size={16} /> View Bays
              </button>
              <button
                onClick={() => navTo("upload")}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm font-medium"
              >
                <UploadCloud size={16} /> Upload Data
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
