// src/features/bay/hooks/useBayData.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BayRepository } from "@/lib/db/repositories/bayRepository";
import type { Bay } from "../types";

export const useBayData = () => {
  const queryClient = useQueryClient();

  // Fetch all bays
  const { data: bays = [], isLoading } = useQuery({
    queryKey: ["bays"],
    queryFn: () => BayRepository.getAllBays(),
  });

  // Mutation: add a new bay
  const addBayMutation = useMutation({
    mutationFn: async (code: string) => {
      const newBay: Omit<Bay, "id"> = {
        code,
        finalized: false,
        timestamp: Date.now(),
      };
      return await BayRepository.addBay(newBay);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bays"] }); // refresh bay list
    },
  });

  return {
    bays,
    isLoading,
    addBay: addBayMutation.mutateAsync,
    addBayStatus: addBayMutation.status, // "idle" | "pending" | "success" | "error"
  };
};
