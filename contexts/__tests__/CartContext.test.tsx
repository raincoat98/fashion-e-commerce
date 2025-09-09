import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../CartContext";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("CartContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("should provide initial cart state", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.total).toBe(0);
    expect(result.current.state.itemCount).toBe(0);
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const newItem = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "test.jpg",
      size: "M",
      color: "Red",
    };

    act(() => {
      result.current.addItem(newItem);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0]).toEqual({
      ...newItem,
      quantity: 1,
    });
    expect(result.current.state.total).toBe(100);
    expect(result.current.state.itemCount).toBe(1);
  });

  it("should increase quantity when adding existing item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "test.jpg",
      size: "M",
      color: "Red",
    };

    act(() => {
      result.current.addItem(item);
      result.current.addItem(item);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].quantity).toBe(2);
    expect(result.current.state.total).toBe(200);
    expect(result.current.state.itemCount).toBe(2);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "test.jpg",
      size: "M",
      color: "Red",
    };

    act(() => {
      result.current.addItem(item);
      result.current.removeItem(1, "M", "Red");
    });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.total).toBe(0);
    expect(result.current.state.itemCount).toBe(0);
  });

  it("should update item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "test.jpg",
      size: "M",
      color: "Red",
    };

    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity(1, "M", "Red", 3);
    });

    expect(result.current.state.items[0].quantity).toBe(3);
    expect(result.current.state.total).toBe(300);
    expect(result.current.state.itemCount).toBe(3);
  });

  it("should remove item when quantity is set to 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "test.jpg",
      size: "M",
      color: "Red",
    };

    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity(1, "M", "Red", 0);
    });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.total).toBe(0);
  });

  it("should clear cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "test.jpg",
      size: "M",
      color: "Red",
    };

    act(() => {
      result.current.addItem(item);
      result.current.clearCart();
    });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.total).toBe(0);
    expect(result.current.state.itemCount).toBe(0);
  });

  it("should load cart from localStorage on mount", () => {
    const savedCart = [
      {
        id: 1,
        name: "Saved Product",
        price: 150,
        image: "saved.jpg",
        size: "L",
        color: "Blue",
        quantity: 2,
      },
    ];

    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.state.items).toEqual(savedCart);
    expect(result.current.state.total).toBe(300);
    expect(result.current.state.itemCount).toBe(2);
  });

  it("should handle localStorage parse error gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid json");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.state.items).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to load cart from localStorage:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it("should throw error when useCart is used outside provider", () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrow("useCart must be used within a CartProvider");
  });

  it("should handle multiple items with different sizes and colors", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item1 = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "test.jpg",
      size: "M",
      color: "Red",
    };

    const item2 = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "test.jpg",
      size: "L",
      color: "Red",
    };

    act(() => {
      result.current.addItem(item1);
      result.current.addItem(item2);
    });

    expect(result.current.state.items).toHaveLength(2);
    expect(result.current.state.total).toBe(200);
    expect(result.current.state.itemCount).toBe(2);
  });
});
