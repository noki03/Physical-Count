import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ItemRepository } from "@/lib/db/repositories/itemRepository";
import type { Item } from "../types";

export const useItemData = (bayId?: number) => {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items", bayId],
    queryFn: async () => {
      if (bayId === undefined) return [];
      return await ItemRepository.getItemsByBayId(bayId);
    },
    enabled: bayId !== undefined, // only run if bayId is provided
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: Omit<Item, "id">) => {
      return await ItemRepository.addItem(item);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["items", bayId] });
      toast.success(`Item ${variables.itemCode} added!`);
    },
    onError: () => {
      toast.error("Failed to add item. Please try again.");
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async ({ id }: { id: number; itemCode: string }) => {
      return await ItemRepository.deleteItem(id);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["items", bayId] });
      queryClient.invalidateQueries({ queryKey: ["bays-with-items"] });
      // Using the neutral default toast for deletions
      toast.info(`Item ${variables.itemCode} removed`);
    },
    onError: () => {
      toast.error("Failed to delete item. Please try again.");
    },
  });

  const deleteAllItemsMutation = useMutation({
    mutationFn: async () => {
      if (bayId === undefined) return;
      return await ItemRepository.deleteItemsByBayId(bayId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", bayId] });
      queryClient.invalidateQueries({ queryKey: ["bays-with-items"] });
      toast("All items removed from bay");
    },
    onError: () => {
      toast.error("Failed to clear items. Please try again.");
    },
  });

  return {
    items,
    isLoading,
    addItem: addItemMutation.mutateAsync,
    isAdding: addItemMutation.isPending,

    deleteItem: deleteItemMutation.mutateAsync,
    isDeleting: deleteItemMutation.isPending,

    deleteAllItems: deleteAllItemsMutation.mutateAsync, // 🔥 NEW
    isDeletingAll: deleteAllItemsMutation.isPending,
  };
};
