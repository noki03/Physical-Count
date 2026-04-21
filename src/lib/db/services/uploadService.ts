// src/lib/db/services/uploadService.ts
import { db } from "../core/database";
import { CommonRepository } from "../repositories/commonRepository";
import { getDeviceId } from "@/lib/deviceId";

export const defaultUploader = async (
  uploaderName: string,
  shouldReset = false,
) => {
  const bays = await db.bays.toArray();
  const items = await db.items.toArray();

  const structuredData = bays.map((bay) => ({
    bayCode: bay.code,
    timestamp: bay.timestamp || null,
    items: items
      .filter((item) => item.bayId === bay.id)
      .map((item) => ({
        id: item.id,
        itemCode: item.itemCode,
        quantity: item.quantity,
        timestamp: item.timestamp || null,
      })),
  }));

  const payload = {
    uploader: {
      name: uploaderName,
      deviceId: getDeviceId(),
    },
    timestamp: new Date().toISOString(),
    data: structuredData,
  };

  try {
    const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

    if (uploadUrl) {
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } else {
      // No API configured — simulate for local development
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    if (shouldReset) {
      await CommonRepository.resetDatabase();
    } else {
      await db.bays.toCollection().modify({ isUploaded: true });
      await db.items.toCollection().modify({ isUploaded: true });
    }

    return { success: true, message: "Upload completed successfully." };
  } catch (error) {
    console.error("Upload failed:", error);
    return { success: false, message: "Upload failed." };
  }
};
