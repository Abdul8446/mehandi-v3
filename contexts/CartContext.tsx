'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  // specifications?: {
  //   weight?: number; // Weight is in specifications
  //   // ... other specification fields
  // };
  specifications: {
    weight: number
  }
  weight: Object
}

interface CartContextType {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalWeight: number;
  totalPrice: number;
  shippingCost: number; // Add this line
  grandTotal: number; // Add this line
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  console.log(items, 'items');

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total weight in grams
  const totalWeight = items.reduce(
    (total, item) => {
      console.log(item, 'item', total, 'total');
      const itemWeight = item.specifications?.weight || 0;
      return total + itemWeight * item.quantity;
    },
    0
  );

  // Calculate shipping cost based on weight
  const shippingCost = totalWeight <= 400 ? 50 : 80;
  
  // Calculate grand total
  const grandTotal = totalPrice + shippingCost;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalWeight,
        totalPrice,
        shippingCost,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};