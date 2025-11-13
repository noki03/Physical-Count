// src/features/common/bay-item-list/components/BayItemCard.tsx -> BayListContainer.tsx
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface BayListContainerProps {
  // Renamed Props
  title: string;
  children: React.ReactNode;
}

export const BayListContainer: React.FC<BayListContainerProps> = ({
  // Renamed Component
  title,
  children,
}) => {
  return (
    <Card className="border-border px-1">
      <CardHeader>
        <h2 className="text-lg font-semibold text-center">{title}</h2>
      </CardHeader>
      <CardContent className="px-3">{children}</CardContent>
    </Card>
  );
};
