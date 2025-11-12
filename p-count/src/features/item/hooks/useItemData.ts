// src/features/item/hooks/useItemData.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemRepository } from "@/lib/db/repositories/itemRepository";
import type { Item } from "../types";

export const useItemData = (bayCode?: string) => {
  const queryClient = useQueryClient();

  // Query to fetch items for a given bay
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items", bayCode],
    queryFn: async () => {
      if (bayCode) {
        return await ItemRepository.getItemsByBay(bayCode);
      }
      return await ItemRepository.getAllItems();
    },
  });

  // Mutation for adding a new item
  const addItemMutation = useMutation({
    mutationFn: async (item: Omit<Item, "id">) => {
      return await ItemRepository.addItem(item);
    },
    onSuccess: () => {
      // Refetch item list after successful add
      queryClient.invalidateQueries({ queryKey: ["items", bayCode] });
    },
  });

  return {
    items,
    isLoading,
    addItem: addItemMutation.mutateAsync,
    isAdding: addItemMutation.isPending,
  };
};
