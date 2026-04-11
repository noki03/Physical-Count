import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
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
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </header>
  );
};

export default Header;
