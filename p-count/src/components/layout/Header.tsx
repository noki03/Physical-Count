import React from "react";
import { useTheme } from "next-themes";
import { Classic } from "@theme-toggles/react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full py-1 px-4 bg-primary text-primary-foreground shadow flex items-center justify-between">
      <h1 className="text-xl font-bold">Physical Count </h1>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-9 w-9"
        aria-label="Toggle theme"
      >
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
      </Button>
    </header>
  );
};

export default Header;
