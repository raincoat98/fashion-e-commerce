"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | {
      type: "REMOVE_ITEM";
      payload: { id: number; size: string; color: string };
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: number; size: string; color: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

const CartContext = createContext<
  | {
      state: CartState;
      addItem: (item: Omit<CartItem, "quantity">) => void;
      removeItem: (id: number, size: string, color: string) => void;
      updateQuantity: (
        id: number,
        size: string,
        color: string,
        quantity: number
      ) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;

        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      } else {
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          total: newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.color === action.payload.color
          )
      );

      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
        ) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };

    case "LOAD_CART":
      return {
        items: action.payload,
        total: action.payload.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
      };

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: cartItems });
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
  };

  const removeItem = (id: number, size: string, color: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size, color } });
  };

  const updateQuantity = (
    id: number,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(id, size, color);
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, size, color, quantity },
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
