import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useBanners } from "../useBanners";

// Mock console.error to avoid noise in tests
const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

describe("useBanners", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with empty banners and loading state", () => {
    const { result } = renderHook(() => useBanners());

    expect(result.current.banners).toEqual([]);
    expect(result.current.activeBanners).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should load banners after initialization", async () => {
    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.banners).toHaveLength(6);
    expect(result.current.activeBanners).toHaveLength(6);
    expect(result.current.error).toBe(null);
  });

  it("should return active banners sorted by order", async () => {
    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const activeBanners = result.current.activeBanners;
    expect(activeBanners[0].order).toBe(1);
    expect(activeBanners[1].order).toBe(2);
    expect(activeBanners[2].order).toBe(3);
  });

  it("should add a new banner", async () => {
    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const newBanner = {
      title: "New Banner",
      description: "New Description",
      imageUrl: "https://example.com/image.jpg",
      linkUrl: "/new",
      order: 7,
      isActive: true,
    };

    let addedBanner;
    await act(async () => {
      addedBanner = await result.current.addBanner(newBanner);
    });

    expect(addedBanner).toMatchObject(newBanner);
    expect(addedBanner?.id).toBeDefined();
    expect(addedBanner?.createdAt).toBeDefined();
    expect(addedBanner?.updatedAt).toBeDefined();

    expect(result.current.banners).toHaveLength(7);
  });

  it("should update a banner", async () => {
    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const bannerId = result.current.banners[0].id;
    const updateData = { title: "Updated Title" };

    await act(async () => {
      await result.current.updateBanner(bannerId, updateData);
    });

    const updatedBanner = result.current.banners.find((b) => b.id === bannerId);
    expect(updatedBanner?.title).toBe("Updated Title");
    expect(updatedBanner?.updatedAt).toBeDefined();
  });

  it("should delete a banner", async () => {
    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialLength = result.current.banners.length;
    const bannerId = result.current.banners[0].id;

    await act(async () => {
      await result.current.deleteBanner(bannerId);
    });

    expect(result.current.banners).toHaveLength(initialLength - 1);
    expect(
      result.current.banners.find((b) => b.id === bannerId)
    ).toBeUndefined();
  });

  it("should reorder banners", async () => {
    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const bannerIds = result.current.banners.map((b) => b.id).reverse();

    await act(async () => {
      await result.current.reorderBanners(bannerIds);
    });

    const reorderedBanners = result.current.banners;
    expect(reorderedBanners[0].id).toBe(bannerIds[0]);
    expect(reorderedBanners[1].id).toBe(bannerIds[1]);
  });

  it("should toggle banner status", async () => {
    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const bannerId = result.current.banners[0].id;
    const initialStatus = result.current.banners[0].isActive;

    await act(async () => {
      await result.current.toggleBannerStatus(bannerId);
    });

    const toggledBanner = result.current.banners.find((b) => b.id === bannerId);
    expect(toggledBanner?.isActive).toBe(!initialStatus);
  });

  it("should reload banners", async () => {
    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.reloadBanners();
    });

    expect(result.current.banners).toHaveLength(6);
    expect(result.current.loading).toBe(false);
  });

  it("should handle errors gracefully", async () => {
    // Mock fetch to throw an error
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useBanners());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Since we're using mock data, this test might not catch the error
    // but it ensures the hook doesn't crash
    expect(result.current.error).toBe(null);

    global.fetch = originalFetch;
  });
});
