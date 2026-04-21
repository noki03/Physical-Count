import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, beforeEach } from "vitest";
import { useBayData } from "../../src/features/bay/hooks/useBayData";
import { db } from "../../src/lib/db/core/database";
import React from "react";

describe("useBayData Hook Logic", () => {
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
  });

  test("should load all bays", async () => {
    await db.bays.add({ code: "BAY-A", finalized: false, timestamp: Date.now() });
    await db.bays.add({ code: "BAY-B", finalized: false, timestamp: Date.now() });

    const { result } = renderHook(() => useBayData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.bays).toHaveLength(2));
    expect(result.current.bays.map((b) => b.code)).toEqual(
      expect.arrayContaining(["BAY-A", "BAY-B"]),
    );
  });

  test("should add a new bay and return it with an id", async () => {
    const { result } = renderHook(() => useBayData(), {
      wrapper: createWrapper(),
    });

    let newBay: { id: number; code: string } | undefined;
    await act(async () => {
      newBay = await result.current.addBay("BAY-NEW");
    });

    expect(newBay).toBeDefined();
    expect(newBay!.code).toBe("BAY-NEW");
    expect(newBay!.id).toBeTypeOf("number");

    await waitFor(() => expect(result.current.bays).toHaveLength(1));
    expect(result.current.bays[0].code).toBe("BAY-NEW");
    expect(result.current.bays[0].finalized).toBe(false);
  });

  test("should handle loading state correctly", async () => {
    const { result } = renderHook(() => useBayData(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  test("should return empty array when no bays exist", async () => {
    const { result } = renderHook(() => useBayData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.bays).toHaveLength(0);
  });
});
