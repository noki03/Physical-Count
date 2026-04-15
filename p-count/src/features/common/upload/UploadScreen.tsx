// src/features/bay/UploadScreen.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUploader } from "../hooks/useUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { UploadSummary } from "./components/UploadSummary";
import { UploadSuccessState } from "./components/UploadSuccessState";
import { UploadEmptyState } from "./components/UploadEmptyState";

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

  // Fetch bays data for summary
  const { data: bays, isLoading } = useQuery({
    queryKey: ["bays-with-items"],
    queryFn: () => CommonRepository.getBaysWithItems(),
  });

  // Calculate pending items and check if empty
  const isEmpty = bays && bays.length === 0;
  const pendingBays = bays?.filter((b) => !b.isUploaded) || [];
  const unsyncedBaysCount = pendingBays.length;
  const unsyncedItemsCount = pendingBays.reduce(
    (sum, bay) => sum + (bay.items?.length || 0),
    0,
  );

  // Check sync state for UI
  const [isAllSynced, setIsAllSynced] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

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

      {/* Upload Summary */}
      <div className="px-4 pb-4">
        <UploadSummary
          baysCount={unsyncedBaysCount}
          itemsCount={unsyncedItemsCount}
        />
      </div>

      {/* Form Area */}
      <div className="flex-1 overflow-y-auto flex flex-col p-4">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-20 w-20 bg-muted rounded-full"></div>
              <div className="h-6 w-32 bg-muted rounded-md mt-4"></div>
              <div className="h-4 w-48 bg-muted rounded-md mt-2"></div>
            </div>
          </div>
        ) : isEmpty ? (
          <UploadEmptyState />
        ) : isAllSynced ? (
          <UploadSuccessState />
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

      {/* Upload Confirmation Dialog */}
      <ConfirmationDialog
        trigger={<div className="hidden" />}
        title="Confirm Upload?"
        description={`You are about to upload ${unsyncedBaysCount} bays containing ${unsyncedItemsCount} items to the cloud. ${shouldReset ? "Your local session will be cleared afterwards." : ""}`}
        onConfirm={() => {
          setShowConfirm(false);
          handleUploadWithSessionReset();
        }}
        confirmText="Upload Now"
        open={showConfirm}
        onOpenChange={setShowConfirm}
      />

      {/* Sticky Bottom Action Bar */}
      <BottomActionBar>
        <Button
          className="w-full h-12 rounded-xl text-base font-semibold"
          onClick={() => setShowConfirm(true)}
          disabled={isUploading || isAllSynced || isEmpty}
          variant="outline"
        >
          {isUploading
            ? "Uploading..."
            : isEmpty
              ? "No Data"
              : isAllSynced
                ? "Synced"
                : "Upload to Cloud"}
        </Button>
      </BottomActionBar>
    </div>
  );
};

export default UploadScreen;
