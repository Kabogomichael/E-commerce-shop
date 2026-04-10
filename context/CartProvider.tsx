"use client"
import { Items } from "@/components/Products";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "sonner";
type CartItem = Items & {
  quantity: number;
};
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Items) => void;
};
const CartContext = createContext<CartContextType | null>({}as CartContextType);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Items) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export  const useCart = () => {
  const context= useContext(CartContext);
  if (!context) {
    toast.error("useCart must be used within CartProvider");
  }
 
  
  return context
};
