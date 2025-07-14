import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  id: string;
  productId: string;
  optionId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  minOrder: number;
  maxStock?: number;
  isQuoted?: boolean;
  quotedPrice?: number;
  quoteId?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, optionId: string, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  addQuotedItemsToCart: (quotedItems: CartItem[]) => void;
  isGuestMode: boolean;
  setGuestMode: (isGuest: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isGuestMode, setIsGuestMode] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedGuestMode = localStorage.getItem('isGuestMode');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    if (savedGuestMode) {
      setIsGuestMode(JSON.parse(savedGuestMode));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('isGuestMode', JSON.stringify(isGuestMode));
  }, [isGuestMode]);

  const addToCart = (product: Product, optionId: string, quantity: number) => {
    const option = product.options.find(opt => opt.id === optionId);
    if (!option) return;

    const cartItemId = `${product.id}-${optionId}`;
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === cartItemId);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === cartItemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        optionId: optionId,
        name: product.name,
        price: isGuestMode ? option.price : (product.customerPrice || option.price),
        unit: option.unit,
        quantity: quantity,
        image: product.image,
        minOrder: option.minOrder,
        maxStock: product.inStock ? 50 : 0 // Mock stock levels
      };
      
      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const price = item.isQuoted ? (item.quotedPrice || item.price) : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const addQuotedItemsToCart = (quotedItems: CartItem[]) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      
      quotedItems.forEach(quotedItem => {
        const existingIndex = newItems.findIndex(item => item.id === quotedItem.id);
        if (existingIndex >= 0) {
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            ...quotedItem,
            isQuoted: true
          };
        } else {
          newItems.push({
            ...quotedItem,
            isQuoted: true
          });
        }
      });
      
      return newItems;
    });
  };

  const setGuestMode = (isGuest: boolean) => {
    setIsGuestMode(isGuest);
    // Update prices for existing items when mode changes
    setItems(prevItems =>
      prevItems.map(item => ({
        ...item,
        price: isGuest ? item.price : (item.price * 0.85) // Apply customer discount
      }))
    );
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getItemCount,
      getSubtotal,
      addQuotedItemsToCart,
      isGuestMode,
      setGuestMode
    }}>
      {children}
    </CartContext.Provider>
  );
};