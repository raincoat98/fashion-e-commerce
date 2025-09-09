import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import {
  useLoading,
  useMultipleLoading,
  useConditionalLoading,
} from "../useLoading";

describe("useLoading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useLoading());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it("should initialize with custom initial loading state", () => {
    const { result } = renderHook(() => useLoading({ initialLoading: true }));

    expect(result.current.loading).toBe(true);
  });

  it("should execute async function successfully", async () => {
    const { result } = renderHook(() => useLoading());
    const mockData = { id: 1, name: "test" };
    const asyncFunction = vi.fn().mockResolvedValue(mockData);

    let executeResult;
    await act(async () => {
      executeResult = await result.current.execute(asyncFunction);
    });

    expect(asyncFunction).toHaveBeenCalledOnce();
    expect(executeResult).toEqual(mockData);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle async function errors", async () => {
    const { result } = renderHook(() => useLoading());
    const mockError = new Error("Test error");
    const asyncFunction = vi.fn().mockRejectedValue(mockError);

    await act(async () => {
      try {
        await result.current.execute(asyncFunction);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBe(null);
  });

  it("should respect minimum delay", async () => {
    const { result } = renderHook(() => useLoading({ delay: 100 }));
    const asyncFunction = vi.fn().mockResolvedValue("test");

    const startTime = Date.now();
    await act(async () => {
      await result.current.execute(asyncFunction);
    });
    const endTime = Date.now();

    expect(endTime - startTime).toBeGreaterThanOrEqual(100);
  });

  it("should call onSuccess callback", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useLoading({ onSuccess }));
    const mockData = { id: 1 };
    const asyncFunction = vi.fn().mockResolvedValue(mockData);

    await act(async () => {
      await result.current.execute(asyncFunction);
    });

    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });

  it("should call onError callback", async () => {
    const onError = vi.fn();
    const { result } = renderHook(() => useLoading({ onError }));
    const mockError = new Error("Test error");
    const asyncFunction = vi.fn().mockRejectedValue(mockError);

    await act(async () => {
      try {
        await result.current.execute(asyncFunction);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(onError).toHaveBeenCalledWith(mockError);
  });

  it("should reset state", () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading(true);
      result.current.setError(new Error("test"));
      result.current.setData({ test: "data" });
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeTruthy();

    act(() => {
      result.current.reset();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it("should set loading state manually", () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.loading).toBe(false);
  });

  it("should set error state manually", () => {
    const { result } = renderHook(() => useLoading());
    const error = new Error("Manual error");

    act(() => {
      result.current.setError(error);
    });

    expect(result.current.error).toEqual(error);
  });

  it("should set data manually", () => {
    const { result } = renderHook(() => useLoading());
    const data = { id: 1, name: "test" };

    act(() => {
      result.current.setData(data);
    });

    expect(result.current.data).toEqual(data);
  });
});

describe("useMultipleLoading", () => {
  it("should initialize with empty states", () => {
    const { result } = renderHook(() => useMultipleLoading());

    expect(result.current.loadingStates).toEqual({});
    expect(result.current.errors).toEqual({});
  });

  it("should manage multiple loading states", async () => {
    const { result } = renderHook(() => useMultipleLoading());
    const asyncFunction1 = vi.fn().mockResolvedValue("result1");
    const asyncFunction2 = vi.fn().mockResolvedValue("result2");

    await act(async () => {
      await Promise.all([
        result.current.execute("key1", asyncFunction1),
        result.current.execute("key2", asyncFunction2),
      ]);
    });

    expect(result.current.isLoading("key1")).toBe(false);
    expect(result.current.isLoading("key2")).toBe(false);
    expect(result.current.getError("key1")).toBe(null);
    expect(result.current.getError("key2")).toBe(null);
  });

  it("should handle errors for specific keys", async () => {
    const { result } = renderHook(() => useMultipleLoading());
    const mockError = new Error("Key1 error");
    const asyncFunction1 = vi.fn().mockRejectedValue(mockError);
    const asyncFunction2 = vi.fn().mockResolvedValue("result2");

    await act(async () => {
      try {
        await result.current.execute("key1", asyncFunction1);
      } catch (error) {
        // Expected to throw
      }
      await result.current.execute("key2", asyncFunction2);
    });

    expect(result.current.getError("key1")).toEqual(mockError);
    expect(result.current.getError("key2")).toBe(null);
    expect(result.current.isLoading("key1")).toBe(false);
    expect(result.current.isLoading("key2")).toBe(false);
  });

  it("should check if any loading is in progress", async () => {
    const { result } = renderHook(() => useMultipleLoading());

    expect(result.current.hasAnyLoading()).toBe(false);

    act(() => {
      result.current.setLoading("key1", true);
    });

    expect(result.current.hasAnyLoading()).toBe(true);

    act(() => {
      result.current.setLoading("key1", false);
    });

    expect(result.current.hasAnyLoading()).toBe(false);
  });

  it("should set loading and error states manually", () => {
    const { result } = renderHook(() => useMultipleLoading());
    const error = new Error("Manual error");

    act(() => {
      result.current.setLoading("key1", true);
      result.current.setError("key1", error);
    });

    expect(result.current.isLoading("key1")).toBe(true);
    expect(result.current.getError("key1")).toEqual(error);
  });
});

describe("useConditionalLoading", () => {
  it("should execute function when condition is true", async () => {
    const asyncFunction = vi.fn().mockResolvedValue("result");
    const { result } = renderHook(() =>
      useConditionalLoading(true, asyncFunction)
    );

    await act(async () => {
      await result.current.executeIfCondition();
    });

    expect(asyncFunction).toHaveBeenCalledOnce();
  });

  it("should not execute function when condition is false", async () => {
    const asyncFunction = vi.fn().mockResolvedValue("result");
    const { result } = renderHook(() =>
      useConditionalLoading(false, asyncFunction)
    );

    await act(async () => {
      const executeResult = await result.current.executeIfCondition();
      expect(executeResult).toBe(null);
    });

    expect(asyncFunction).not.toHaveBeenCalled();
  });

  it("should update condition and re-execute", async () => {
    let condition = false;
    const asyncFunction = vi.fn().mockResolvedValue("result");

    const { result, rerender } = renderHook(() =>
      useConditionalLoading(condition, asyncFunction)
    );

    // First render with condition false
    await act(async () => {
      const executeResult = await result.current.executeIfCondition();
      expect(executeResult).toBe(null);
    });

    expect(asyncFunction).not.toHaveBeenCalled();

    // Update condition to true
    condition = true;
    rerender();

    await act(async () => {
      await result.current.executeIfCondition();
    });

    expect(asyncFunction).toHaveBeenCalledOnce();
  });
});
