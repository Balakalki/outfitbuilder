"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import type { DroppedItem } from "../components/Canvas";

interface CartContextType {
  cartItems: DroppedItem[];
  addMultipleToCart: (items: DroppedItem[]) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<DroppedItem[]>([]);

  const addMultipleToCart = (items: DroppedItem[]) => {
    const clonedItems = items.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    }));
    setCartItems((prev) => [...prev, ...clonedItems]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addMultipleToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
