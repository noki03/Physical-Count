import { useTheme } from "next-themes";
import { Classic } from "@theme-toggles/react";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50 h-14 flex items-center justify-between px-4">
      <h1 className="text-lg font-bold tracking-tight text-foreground">
        Physical Count
      </h1>

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
    </header>
  );
}
