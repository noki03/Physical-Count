// src/features/bay/hooks/useUploader.ts
import { useState } from "react";
import { defaultUploader } from "@/lib/db/services/uploadService";

export const useUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [uploaderName, setUploaderName] = useState<string>("");
  const [shouldReset, setShouldReset] = useState<boolean>(false);

  const uploadAll = async () => {
    if (!uploaderName.trim()) {
      setStatus("Please enter uploader name before uploading.");
      return;
    }

    setIsUploading(true);
    setStatus("Uploading data...");

    const result = await defaultUploader(uploaderName, shouldReset);

    setStatus(
      result.success
        ? shouldReset
          ? "Upload successful and local data cleared!"
          : "Upload successful!"
        : "Upload failed. Please try again."
    );

    setIsUploading(false);
  };

  return {
    uploaderName,
    setUploaderName,
    isUploading,
    status,
    uploadAll,
    shouldReset,
    setShouldReset,
  };
};
