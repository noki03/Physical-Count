// src/features/bay/hooks/useUploader.ts
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { defaultUploader } from "@/lib/db/services/uploadService";

export const useUploader = () => {
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [uploaderName, setUploaderName] = useState<string>("");
  const [shouldReset, setShouldReset] = useState<boolean>(false);

  const uploadAll = async () => {
    if (!uploaderName.trim()) {
      toast.error("Please enter uploader name before uploading.");
      return;
    }

    setIsUploading(true);

    const result = await defaultUploader(uploaderName, shouldReset);

    if (result.success) {
      toast.success("Data uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["bays-with-items"] });
    } else {
      toast.error("Upload failed. Please try again.");
    }

    setIsUploading(false);
    return result;
  };

  return {
    uploaderName,
    setUploaderName,
    isUploading,
    uploadAll,
    shouldReset,
    setShouldReset,
  };
};
