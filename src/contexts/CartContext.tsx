"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { CartItem } from "@/types/CartItem";
import { CartContextItem } from '../types/CartContextItem';
import { SubscriptionItem } from "@/types/SubscriptionItem";
import toast from 'react-hot-toast';

const CartContext = createContext<CartContextItem | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<SubscriptionItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: SubscriptionItem) => {
    let showToast: (() => void) | undefined;

    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id);
      const prevSubscription = prevCart.find((c) =>
        c.service.includes("Subscription")
      );

      if (prevSubscription && item.service.includes("Subscription")) {
        showToast = () =>
          toast.error("You can only have one subscription at a time!", {
            duration: 3000,
            style: { background: "#444", color: "#fff" },
          });
        return prevCart;
      }

      if (existing) {
        showToast = () =>
          toast.success(`${item.service} added to cart!`, {
            duration: 3000,
            style: { background: "#444", color: "#fff" },
          });
        return prevCart.map((c) =>
          c.id === item.id ? { ...c, amount: c.amount + 1 } : c
        );
      }

      const newCartItem: CartItem = {
        ...item,
        amount: 1,
      };

      showToast = () =>
        toast.success(`${item.service} added to cart!`, {
          duration: 3000,
          style: { background: "#444", color: "#fff" },
        });
      return [...prevCart, newCartItem];
    });

    if (showToast) showToast();
  };

    const removeFromCart = (id: number) => {
      setCart((prevCart) => prevCart.filter((c) => c.id !== id));
    };

    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};