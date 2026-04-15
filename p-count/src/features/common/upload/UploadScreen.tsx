// src/features/bay/UploadScreen.tsx
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useUploader } from "../hooks/useUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";
import { BottomActionBar } from "@/components/layout/BottomActionBar";

const UploadScreen: React.FC = () => {
  const { resetSession } = useAppStore();
  const {
    uploaderName,
    setUploaderName,
    uploadAll,
    isUploading,
    shouldReset,
    setShouldReset,
  } = useUploader();

  // Check sync state for UI
  const [isAllSynced, setIsAllSynced] = React.useState(false);

  React.useEffect(() => {
    const checkSyncState = async () => {
      const bays = await CommonRepository.getBaysWithItems();

      // Check if no bays exist or all bays are uploaded
      const hasNoBays = bays.length === 0;
      const allBaysUploaded =
        bays.length > 0 && bays.every((bay) => bay.isUploaded);
      setIsAllSynced(hasNoBays || allBaysUploaded);
    };

    checkSyncState();
  }, []);

  const handleUploadWithSessionReset = async () => {
    const result = await uploadAll();
    if (result?.success) {
      resetSession();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in pb-24">
      {/* Premium Header Area */}
      <div className="px-4 pt-8 pb-6 border-b border-border/50">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Upload Data
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sync your locally collected inventory to the cloud.
        </p>
      </div>

      {/* Form Area */}
      <div className="flex-1 overflow-y-auto flex flex-col p-4">
        {isAllSynced ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-4 text-center mt-12 animate-in zoom-in-95 duration-300">
            <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">All Caught Up!</h3>
              <p className="text-sm text-muted-foreground max-w-[250px]">
                All your scanned bays and items have been safely backed up to
                the cloud.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Uploader Name
              </label>
              <Input
                placeholder="Enter your name or ID"
                className="h-12 rounded-xl text-base"
                value={uploaderName}
                onChange={(e) => setUploaderName(e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/20">
              <input
                type="checkbox"
                className="size-5 rounded border-input"
                checked={shouldReset}
                onChange={(e) => setShouldReset(e.target.checked)}
                disabled={isUploading}
              />
              <span className="text-sm font-medium">
                Reset local data after upload
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar */}
      <BottomActionBar>
        <Button
          className="w-full h-12 rounded-xl text-base font-semibold"
          onClick={handleUploadWithSessionReset}
          disabled={isUploading || isAllSynced}
          variant="outline"
        >
          {isUploading
            ? "Uploading..."
            : isAllSynced
              ? "Synced"
              : "Upload to Cloud"}
        </Button>
      </BottomActionBar>
    </div>
  );
};

export default UploadScreen;
