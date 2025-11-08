// src/features/common/bay-item-list/components/BayItemCard.tsx
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface BayItemCardProps {
  title: string;
  children: React.ReactNode;
}

export const BayItemCard: React.FC<BayItemCardProps> = ({
  title,
  children,
}) => {
  return (
    <Card className="shadow border-border">
      <CardHeader>
        <h2 className="text-lg font-semibold text-center">{title}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
