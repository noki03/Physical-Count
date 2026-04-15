import { useQuery } from "@tanstack/react-query";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";

export const useUploadData = () => {
  const { data: bays, isLoading } = useQuery({
    queryKey: ["bays-with-items"],
    queryFn: () => CommonRepository.getBaysWithItems(),
  });

  const isEmpty = bays && bays.length === 0;
  const pendingBays = bays?.filter((b) => !b.isUploaded) || [];
  const unsyncedBaysCount = pendingBays.length;
  const unsyncedItemsCount = pendingBays.reduce(
    (sum, bay) => sum + (bay.items?.length || 0),
    0,
  );

  // Derive synced state synchronously to prevent hydration flicker
  const isAllSynced = Boolean(
    bays && bays.length > 0 && unsyncedBaysCount === 0,
  );

  return {
    bays,
    isLoading,
    isEmpty,
    unsyncedBaysCount,
    unsyncedItemsCount,
    isAllSynced,
  };
};
