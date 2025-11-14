// src/features/common/bay-item-list/hooks/useBayItemList.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

  // 🧹 Reset database mutation
  const resetMutation = useMutation({
    mutationFn: CommonRepository.resetDatabase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bays-with-items"] });
    },
  });

  // ✏️ Update bay code mutation
  const updateBayMutation = useMutation({
    mutationFn: async ({ id, newCode }: { id: number; newCode: string }) => {
      await BayRepository.updateBay(id, { code: newCode });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bays-with-items"] });
    },
  });

  return {
    bays,
    loading,
    isError,
    error,
    resetting: resetMutation.isPending,
    handleReset: () => resetMutation.mutate(),
    handleUpdateBay: (id: number, newCode: string) =>
      updateBayMutation.mutate({ id, newCode }),
  };
};
