// src/lib/db/services/uploadService.ts
import { db } from "../core/database";

/**
 * Generic upload handler
 */
export interface UploadTarget<T> {
  name: string;
  getLocalData: () => Promise<T[]>;
  uploadToServer: (data: T[]) => Promise<void>;
  clearAfterUpload?: () => Promise<void>;
}

export const uploadData = async <T>(target: UploadTarget<T>) => {
  console.log(`🔼 Starting upload for: ${target.name}`);

  const localData = await target.getLocalData();
  console.log(`📦 Local data fetched for ${target.name}:`, localData);

  if (localData.length === 0) {
    console.log(`⚠️ No local data found for ${target.name}`);
    return { success: false, message: "No local data found." };
  }

  try {
    await target.uploadToServer(localData);

    if (target.clearAfterUpload) {
      await target.clearAfterUpload();
    }

    console.log(`✅ Successfully uploaded ${target.name}`);
    return { success: true, message: `${target.name} uploaded successfully.` };
  } catch (error) {
    console.error(`❌ Upload failed for ${target.name}:`, error);
    return { success: false, message: "Upload failed." };
  }
};

/**
 * Default uploader with uploader info
 */
export const defaultUploader = async (uploaderName: string) => {
  const bays = await db.bays.toArray();
  const items = await db.items.toArray();

  // 🧩 Combine bays and their corresponding items
  const structuredData = bays.map((bay) => ({
    bayCode: bay.code,
    timestamp: bay.timestamp || null,
    items: items
      .filter((item) => item.bayCode === bay.code)
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
      deviceId: "DEVICE-001",
    },
    timestamp: new Date().toISOString(),
    data: structuredData,
  };

  console.log("📤 Preparing structured upload payload:");
  console.log(JSON.stringify(payload, null, 2));
  console.log(`📊 Bays: ${bays.length}, Items: ${items.length}`);

  try {
    console.log("🧪 Simulating upload to server...");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Future real API call placeholder:
    /*
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Server responded with ${response.status}`);
    */

    console.log("✅ Simulated upload completed successfully");
    return { success: true, message: "Upload simulated successfully." };
  } catch (error) {
    console.error("❌ Simulated upload failed:", error);
    return { success: false, message: "Upload failed." };
  }
};
