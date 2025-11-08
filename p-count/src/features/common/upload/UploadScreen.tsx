// src/features/bay/UploadScreen.tsx
import React from "react";
import { useUploader } from "../hooks/useUploader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const UploadScreen: React.FC = () => {
  const {
    uploaderName,
    setUploaderName,
    uploadAll,
    isUploading,
    status,
    shouldReset,
    setShouldReset,
  } = useUploader();

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

          <Button
            onClick={uploadAll}
            disabled={isUploading}
            variant="outline"
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Upload to Server"}
          </Button>

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
