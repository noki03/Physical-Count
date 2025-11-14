import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemRepository } from "@/lib/db/repositories/itemRepository";
import type { Item } from "../types";

export const useItemData = (bayId?: number) => {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items", bayId],
    queryFn: async () => {
      if (bayId !== undefined) {
        return await ItemRepository.getItemsByBayId(bayId);
      }
      return await ItemRepository.getAllItems();
    },
    enabled: bayId !== undefined, // only run if bayId is provided
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: Omit<Item, "id">) => {
      return await ItemRepository.addItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", bayId] });
    },
  });

  return {
    items,
    isLoading,
    addItem: addItemMutation.mutateAsync,
    isAdding: addItemMutation.isPending,
  };
};
