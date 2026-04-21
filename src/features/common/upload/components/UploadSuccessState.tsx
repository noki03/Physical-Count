import React from "react";
import { CheckCircle2 } from "lucide-react";

export const UploadSuccessState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 space-y-4 text-center mt-12 animate-in zoom-in-95 duration-100">
      <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">All Caught Up!</h3>
        <p className="text-sm text-muted-foreground max-w-[250px]">
          All your scanned bays and items have been safely backed up to cloud.
        </p>
      </div>
    </div>
  );
};
