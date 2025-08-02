import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', name: 'T-shirt', price: 20, quantity: 2 },
    { id: '2', name: 'Sneakers', price: 50, quantity: 1 },
  ]);

  // TODO: Implement updateQuantity and removeItem logic
  const updateQuantity = (id: string, quantity: number): void => {
    // TBD
    const updatedItems = items.map((item) => {
        if(item.id === id) {
            return { ...item, quantity: Math.max(1, quantity) }; // Prevent quantity below 1
        } else {
            return item;
        }
    }) ;
    setItems(updatedItems)
  };
  const removeItem = (id: string) => {
    // TBD
    const updateItems = items.filter((item) => item.id !== id)
    setItems(updateItems)
  };

  return (
    <CartContext.Provider value={{ items, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};