// src/features/common/bay-item-list/hooks/useBayItemList.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CommonRepository } from "@/lib/db/repositories/commonRepository";
import { BayRepository } from "@/lib/db/repositories/bayRepository";
import type { Bay } from "@/features/bay/types";
import type { Item } from "@/features/item/types";

export const useBayItemList = () => {
  const queryClient = useQueryClient();

  const {
    data: bays = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery<(Bay & { items: Item[] })[]>({
    queryKey: ["bays-with-items"],
    queryFn: CommonRepository.getBaysWithItems,
  });

  // 🧹 Reset DB
  const resetMutation = useMutation({
    mutationFn: CommonRepository.resetDatabase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bays-with-items"] });
    },
  });

  // ✏️ Update Bay Code
  const updateBayMutation = useMutation({
    mutationFn: async ({ id, newCode }: { id: number; newCode: string }) => {
      await BayRepository.updateBay(id, { code: newCode });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bays-with-items"] });
    },
  });

  // 🗑️ Delete Bay Mutation (NEW)
  const deleteBayMutation = useMutation({
    mutationFn: async ({ id }: { id: number; code: string }) => {
      await BayRepository.deleteBay(id);
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["bays-with-items"] });
      // Using the neutral default toast for deletions
      toast.info(`Bay ${variables.code} deleted`);
    },
    onError: () => {
      toast.error("Failed to delete bay. Please try again.");
    },
  });

  return {
    bays,
    loading,
    isError,
    error,

    // reset
    resetting: resetMutation.isPending,
    handleReset: () => resetMutation.mutate(),

    // update
    handleUpdateBay: (id: number, newCode: string) =>
      updateBayMutation.mutate({ id, newCode }),

    // delete (NEW)
    deletingBay: deleteBayMutation.isPending,
    handleDeleteBay: ({ id, code }: { id: number; code: string }) =>
      deleteBayMutation.mutate({ id, code }),
  };
};
