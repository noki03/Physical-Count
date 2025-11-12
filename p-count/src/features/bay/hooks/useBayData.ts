// src/features/bay/hooks/useBayData.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BayRepository } from "@/lib/db/repositories/bayRepository";
import type { Bay } from "../types";

export const useBayData = () => {
  const queryClient = useQueryClient();

  const { data: bays = [], isLoading } = useQuery({
    queryKey: ["bays"],
    queryFn: () => BayRepository.getAllBays(),
  });

  const addBayMutation = useMutation({
    mutationFn: async (code: string) => {
      const newBay: Omit<Bay, "id"> = {
        code,
        finalized: false,
        timestamp: Date.now(),
      };
      const id = await BayRepository.addBay(newBay);
      return { id, ...newBay };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bays"] });
    },
  });

  return {
    bays,
    isLoading,
    addBay: addBayMutation.mutateAsync,
    addBayStatus: addBayMutation.status,
  };
};
