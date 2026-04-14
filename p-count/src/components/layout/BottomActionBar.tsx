import React from "react";

export const BottomActionBar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed bottom-16 left-0 w-full p-4 bg-background/80 backdrop-blur-md border-t border-border/50 z-40">
      <div className="max-w-md mx-auto w-full">{children}</div>
    </div>
  );
};
