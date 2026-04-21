// src/features/bay/UploadScreen.tsx
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useUploader } from "../hooks/useUploader";
import { useUploadData } from "../hooks/useUploadData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/useAppStore";
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

  const {
    isLoading,
    isEmpty,
    unsyncedBaysCount,
    unsyncedItemsCount,
    isAllSynced,
  } = useUploadData();

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [pendingSnapshot, setPendingSnapshot] = React.useState({
    bays: 0,
    items: 0,
  });
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [syncedSnapshot, setSyncedSnapshot] = React.useState({
    bays: 0,
    items: 0,
  });
  // Track whether session should reset when the success modal is dismissed
  const shouldResetOnClose = React.useRef(false);

  const handleUpload = async () => {
    setShowConfirm(false);
    const result = await uploadAll();
    if (result?.success) {
      setSyncedSnapshot(pendingSnapshot);
      shouldResetOnClose.current = shouldReset;
      setShowSuccessModal(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (shouldResetOnClose.current) {
      resetSession();
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-8 px-4 pb-24">
      {/* Header */}
      <div className="pb-6 mb-6 border-b border-border/50">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Upload Data
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sync your locally collected inventory to the cloud.
        </p>
      </div>

      {/* Form Area */}
      <div className="flex flex-col mt-4">
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
          <div className="flex flex-col animate-in fade-in duration-300">
            <UploadSummary
              baysCount={unsyncedBaysCount}
              itemsCount={unsyncedItemsCount}
            />

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
          </div>
        )}
      </div>

      {/* Upload Confirmation Dialog */}
      <ConfirmationDialog
        trigger={<div className="hidden" />}
        title="Confirm Upload?"
        description={`You are about to upload ${pendingSnapshot.bays} bays containing ${pendingSnapshot.items} items to the cloud.${shouldReset ? " Your local session will be cleared afterwards." : ""}`}
        onConfirm={handleUpload}
        confirmText="Upload Now"
        open={showConfirm}
        onOpenChange={setShowConfirm}
      />

      {/* Post-upload Summary Modal */}
      <Dialog open={showSuccessModal} onOpenChange={handleSuccessModalClose}>
        <DialogContent showCloseButton={false} className="text-center">
          <DialogHeader className="items-center">
            <div className="mb-2 flex items-center justify-center rounded-full bg-green-500/15 p-4">
              <CheckCircle2 className="size-8 text-green-500" />
            </div>
            <DialogTitle className="text-xl">Upload Successful</DialogTitle>
            <DialogDescription className="text-base">
              Successfully synced{" "}
              <span className="font-semibold text-foreground">
                {syncedSnapshot.bays} {syncedSnapshot.bays === 1 ? "bay" : "bays"}
              </span>{" "}
              and{" "}
              <span className="font-semibold text-foreground">
                {syncedSnapshot.items} {syncedSnapshot.items === 1 ? "item" : "items"}
              </span>{" "}
              to the cloud.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="w-full" onClick={handleSuccessModalClose}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sticky Bottom Action Bar */}
      <BottomActionBar>
        <Button
          className="w-full h-12 rounded-xl text-base font-semibold"
          onClick={() => {
            setPendingSnapshot({
              bays: unsyncedBaysCount,
              items: unsyncedItemsCount,
            });
            setShowConfirm(true);
          }}
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
