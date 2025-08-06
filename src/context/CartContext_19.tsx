// CartContext.tsx
import React, { createContext, useContext, useMemo, useState} from 'react';
import type { ReactNode } from 'react';

export const mockItems = [
  { id: '1', name: 'T-shirt', price: 20, quantity: 2, stock: 5 },
  { id: '2', name: 'Sneakers', price: 50, quantity: 1, stock: 2 },
];

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

type CartContextType = {
  items: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Initialize with some mock items
  const [items, setItems] = useState<CartItem[]>(mockItems);

  const updateQuantity = (id: string, quantity: number) => {
    // TODO: Implement quantity update with validation (stock, min 1, numeric)
    const itemtoUpdate = items.find((item) => item.id === id)
    
    if (!itemtoUpdate) return;
    if (quantity > itemtoUpdate.stock) return;
    if (quantity <= itemtoUpdate.stock) {
      setItems((prev) => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
    } 
  };

  const removeItem = (id: string) => {
    // TODO: Remove item from cart
    const itemtoUpdate = items.find((item) => item.id === id)
    if (!itemtoUpdate) return;
    setItems(items.filter(item => item.id !== id));
  };
  
  const storeValues = useMemo(() => ({ items, updateQuantity, removeItem }), [items])
  return (
    <CartContext.Provider value={storeValues}>
      {children}
    </CartContext.Provider>
  );
};
