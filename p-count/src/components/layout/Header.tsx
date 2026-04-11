import React from "react";
import { useTheme } from "next-themes";
import { Classic } from "@theme-toggles/react";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full py-1 px-4 bg-primary text-primary-foreground shadow flex items-center justify-between">
      <h1 className="text-xl font-bold">Physical Count </h1>

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
};

export default Header;
