import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, beforeEach } from "vitest";
import { useItemData } from "../../src/features/item/hooks/useItemData";
import { db } from "../../src/lib/db/core/database";
import React from "react";

describe("useItemData Hook Logic", () => {
  let testBayId: number;

  // Function to create a fresh QueryClient for every test
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(async () => {
    await db.items.clear();
    await db.bays.clear();

    // Setup test bay
    const bayId = await db.bays.add({
      code: "TEST-BAY",
      finalized: false,
      timestamp: Date.now(),
    });
    testBayId = bayId as number;
  });

  test("should load items for a specific bay", async () => {
    await db.items.add({
      itemCode: "ITEM-001",
      bayId: testBayId,
      bayCode: "TEST-BAY",
      quantity: 1,
      timestamp: Date.now(),
    });

    const { result } = renderHook(() => useItemData(testBayId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.items).toHaveLength(1));
    expect(result.current.items[0].itemCode).toBe("ITEM-001");
  });

  test("should add a new item successfully", async () => {
    const { result } = renderHook(() => useItemData(testBayId), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.addItem({
        itemCode: "NEW-ITEM",
        bayId: testBayId,
        bayCode: "TEST-BAY",
        quantity: 1,
      });
    });

    await waitFor(() => expect(result.current.items).toHaveLength(1));
    expect(result.current.items[0].itemCode).toBe("NEW-ITEM");
  });

  test("should delete an item successfully", async () => {
    await db.items.add({
      itemCode: "DELETE-ME",
      bayId: testBayId,
      bayCode: "TEST-BAY",
      quantity: 1,
      timestamp: Date.now(),
    });

    const { result } = renderHook(() => useItemData(testBayId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.items).toHaveLength(1));

    await act(async () => {
      const item = result.current.items[0];
      await result.current.deleteItem({ id: item.id!, itemCode: item.itemCode });
    });

    await waitFor(() => expect(result.current.items).toHaveLength(0));
  });

  test("should handle loading states correctly", async () => {
    const { result } = renderHook(() => useItemData(testBayId), {
      wrapper: createWrapper(),
    });

    // Check loading transition
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  test("should delete all items for a bay", async () => {
    await db.items.add({
      itemCode: "ITEM-A",
      bayId: testBayId,
      bayCode: "TEST-BAY",
      quantity: 1,
      timestamp: Date.now(),
    });
    await db.items.add({
      itemCode: "ITEM-B",
      bayId: testBayId,
      bayCode: "TEST-BAY",
      quantity: 2,
      timestamp: Date.now(),
    });

    const { result } = renderHook(() => useItemData(testBayId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.items).toHaveLength(2));

    await act(async () => {
      await result.current.deleteAllItems();
    });

    await waitFor(() => expect(result.current.items).toHaveLength(0));
  });

  test("should only load items belonging to the given bay", async () => {
    const otherBayId = (await db.bays.add({
      code: "OTHER-BAY",
      finalized: false,
      timestamp: Date.now(),
    })) as number;

    await db.items.add({
      itemCode: "MINE",
      bayId: testBayId,
      bayCode: "TEST-BAY",
      quantity: 1,
      timestamp: Date.now(),
    });
    await db.items.add({
      itemCode: "NOT-MINE",
      bayId: otherBayId,
      bayCode: "OTHER-BAY",
      quantity: 1,
      timestamp: Date.now(),
    });

    const { result } = renderHook(() => useItemData(testBayId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.items).toHaveLength(1));
    expect(result.current.items[0].itemCode).toBe("MINE");
  });
});
