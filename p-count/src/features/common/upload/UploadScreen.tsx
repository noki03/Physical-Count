// src/features/bay/UploadScreen.tsx
import React from "react";
import { useUploader } from "../hooks/useUploader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";

const UploadScreen: React.FC = () => {
  const { resetSession } = useAppStore();
  const {
    uploaderName,
    setUploaderName,
    uploadAll,
    isUploading,
    status,
    shouldReset,
    setShouldReset,
  } = useUploader();

  // Check sync state for UI
  const [allBays, setAllBays] = React.useState<any[]>([]);
  const [isAllSynced, setIsAllSynced] = React.useState(false);

  React.useEffect(() => {
    const checkSyncState = async () => {
      const bays = await CommonRepository.getBaysWithItems();
      setAllBays(bays);

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
    <div className="w-full max-w-md mx-auto mt-8">
      <Card className="border-border">
        <CardHeader>
          <h2 className="text-lg font-semibold text-center">Upload Data</h2>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Input
            placeholder="Enter uploader name"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            disabled={isUploading}
          />

          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={shouldReset}
              onChange={(e) => setShouldReset(e.target.checked)}
              disabled={isUploading}
            />
            <span>Reset local data after upload</span>
          </label>

          {isAllSynced ? (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {allBays.length === 0
                  ? "No data to upload."
                  : "All local data is already synced."}
              </p>
              <Button variant="outline" className="w-full" disabled>
                Upload to Server
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleUploadWithSessionReset}
              disabled={isUploading}
              variant="outline"
              className="w-full"
            >
              {isUploading ? "Uploading..." : "Upload to Server"}
            </Button>
          )}

          {status && (
            <p className="text-sm text-muted-foreground text-center">
              {status}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadScreen;
