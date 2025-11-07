// src/lib/db/services/uploadService.ts
import { db } from "../core/database";
import { CommonRepository } from "../repositories/commonRepository";

export const defaultUploader = async (
  uploaderName: string,
  shouldReset = false
) => {
  const bays = await db.bays.toArray();
  const items = await db.items.toArray();

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

  console.log("📤 Upload payload:", payload);

  try {
    console.log("🧪 Simulating upload...");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("✅ Simulated upload completed successfully");

    if (shouldReset) {
      await CommonRepository.resetDatabase();
    }

    return { success: true, message: "Upload simulated successfully." };
  } catch (error) {
    console.error("❌ Simulated upload failed:", error);
    return { success: false, message: "Upload failed." };
  }
};
