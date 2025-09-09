import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../ProductCard";
import { CartProvider } from "@/contexts/CartContext";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock useToast hook
const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock useProductStore
const mockAddToWishlist = vi.fn();
const mockRemoveFromWishlistByProductId = vi.fn();
const mockIsInWishlist = vi.fn();

vi.mock("@/stores/useProductStore", () => ({
  useProductStore: () => ({
    addToWishlist: mockAddToWishlist,
    removeFromWishlistByProductId: mockRemoveFromWishlistByProductId,
    isInWishlist: mockIsInWishlist,
  }),
}));

const mockProduct = {
  id: "1",
  name: "Test Product",
  price: 100000,
  originalPrice: 120000,
  image: "https://example.com/image.jpg",
  hoverImage: "https://example.com/hover-image.jpg",
  badge: "NEW",
  rating: 4.5,
  reviewCount: 10,
  sizes: ["S", "M", "L", "XL"],
};

const renderProductCard = (product = mockProduct) => {
  return render(
    <CartProvider>
      <ProductCard product={product} />
    </CartProvider>
  );
};

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsInWishlist.mockReturnValue(false);
  });

  it("should render product information correctly", () => {
    renderProductCard();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("100,000원")).toBeInTheDocument();
    expect(screen.getByText("120,000원")).toBeInTheDocument();
    expect(screen.getByText("17%")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("(10)")).toBeInTheDocument();
  });

  it("should display product image", () => {
    renderProductCard();

    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("should show badge when provided", () => {
    renderProductCard();

    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("should not show badge when not provided", () => {
    const productWithoutBadge = { ...mockProduct, badge: undefined };
    renderProductCard(productWithoutBadge);

    expect(screen.queryByText("NEW")).not.toBeInTheDocument();
  });

  it("should show hover image on mouse enter", async () => {
    const user = userEvent.setup();
    renderProductCard();

    const card = screen.getByText("Test Product").closest("div");
    const image = screen.getByAltText("Test Product");

    await user.hover(card!);

    expect(image).toHaveAttribute("src", "https://example.com/hover-image.jpg");
  });

  it("should show size buttons on hover", async () => {
    const user = userEvent.setup();
    renderProductCard();

    const card = screen.getByText("Test Product").closest("div");

    await user.hover(card!);

    expect(screen.getByText("S")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  it("should show additional sizes count when more than 3 sizes", async () => {
    const user = userEvent.setup();
    renderProductCard();

    const card = screen.getByText("Test Product").closest("div");

    await user.hover(card!);

    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("should select size when clicked", async () => {
    const user = userEvent.setup();
    renderProductCard();

    const card = screen.getByText("Test Product").closest("div");
    await user.hover(card!);

    const sizeButton = screen.getByText("M");
    await user.click(sizeButton);

    expect(sizeButton).toHaveClass("bg-gray-900");
  });

  it("should add item to cart when add to cart button is clicked", async () => {
    const user = userEvent.setup();
    const productWithoutSizes = { ...mockProduct, sizes: [] };
    renderProductCard(productWithoutSizes);

    const addToCartButton = screen.getByText("장바구니");
    await user.click(addToCartButton);

    // Should show toast for size selection
    expect(mockToast).toHaveBeenCalledWith({
      title: "사이즈를 선택해주세요",
      description: "장바구니에 추가하기 전에 사이즈를 선택해주세요.",
      duration: 3000,
    });
  });

  it("should add item to cart with selected size", async () => {
    const user = userEvent.setup();
    renderProductCard();

    // First hover to show size buttons
    const card = screen.getByText("Test Product").closest("div");
    await user.hover(card!);

    // Select a size
    const sizeButton = screen.getByText("M");
    await user.click(sizeButton);

    // Click add to cart
    const addToCartButton = screen.getByText("장바구니");
    await user.click(addToCartButton);

    // Should not show toast since size is selected
    expect(mockToast).not.toHaveBeenCalled();
  });

  it("should toggle wishlist when heart button is clicked", async () => {
    const user = userEvent.setup();
    renderProductCard();

    const heartButton = screen.getByRole("button", { name: "" }); // Heart button
    await user.click(heartButton);

    expect(mockAddToWishlist).toHaveBeenCalledWith({
      productId: "1",
      name: "Test Product",
      price: 100000,
      originalPrice: 120000,
      image: "https://example.com/image.jpg",
      rating: 4.5,
      reviewCount: 10,
      isNew: false,
      isSale: true,
      isBest: false,
    });
  });

  it("should remove from wishlist when already wishlisted", async () => {
    mockIsInWishlist.mockReturnValue(true);
    const user = userEvent.setup();
    renderProductCard();

    const heartButton = screen.getByRole("button", { name: "" }); // Heart button
    await user.click(heartButton);

    expect(mockRemoveFromWishlistByProductId).toHaveBeenCalledWith("1");
  });

  it("should show filled heart when wishlisted", () => {
    mockIsInWishlist.mockReturnValue(true);
    renderProductCard();

    const heartIcon = screen
      .getByRole("button", { name: "" })
      .querySelector("svg");
    expect(heartIcon).toHaveClass("fill-red-500", "text-red-500");
  });

  it("should show empty heart when not wishlisted", () => {
    mockIsInWishlist.mockReturnValue(false);
    renderProductCard();

    const heartIcon = screen
      .getByRole("button", { name: "" })
      .querySelector("svg");
    expect(heartIcon).toHaveClass("text-gray-400");
  });

  it("should have correct product detail link", () => {
    renderProductCard();

    const productLink = screen.getByText("Test Product").closest("a");
    expect(productLink).toHaveAttribute("href", "/products/1");
  });

  it("should have correct detail view button link", () => {
    renderProductCard();

    const detailButton = screen.getByText("상세보기").closest("a");
    expect(detailButton).toHaveAttribute("href", "/products/1");
  });

  it("should calculate discount percentage correctly", () => {
    renderProductCard();

    expect(screen.getByText("17%")).toBeInTheDocument();
  });

  it("should not show discount when no original price", () => {
    const productWithoutOriginalPrice = {
      ...mockProduct,
      originalPrice: undefined,
    };
    renderProductCard(productWithoutOriginalPrice);

    expect(screen.queryByText("%")).not.toBeInTheDocument();
    expect(screen.queryByText("120,000원")).not.toBeInTheDocument();
  });

  it("should handle products with no sizes", () => {
    const productWithoutSizes = { ...mockProduct, sizes: [] };
    renderProductCard(productWithoutSizes);

    // Should still render the component
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should format price with Korean locale", () => {
    renderProductCard();

    expect(screen.getByText("100,000원")).toBeInTheDocument();
    expect(screen.getByText("120,000원")).toBeInTheDocument();
  });
});
