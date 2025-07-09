import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  viscosity: string;
  application: string;
  quantity: number;
  requirements: string;
  shipToAddress: string;
  expectedDelivery: string;
  emergencyDelivery: string;
  addedAt: string;
}

interface QuoteState {
  items: QuoteItem[];
  totalItems: number;
}

type QuoteAction = 
  | { type: 'ADD_ITEM'; payload: Omit<QuoteItem, 'id' | 'addedAt'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<QuoteItem> } }
  | { type: 'CLEAR_QUOTES' }
  | { type: 'LOAD_QUOTES'; payload: QuoteItem[] };

const initialState: QuoteState = {
  items: [],
  totalItems: 0,
};

function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem: QuoteItem = {
        ...action.payload,
        id: `quote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        addedAt: new Date().toISOString(),
      };
      
      const newItems = [...state.items, newItem];
      return {
        items: newItems,
        totalItems: newItems.length,
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        totalItems: newItems.length,
      };
    }
    
    case 'UPDATE_ITEM': {
      const newItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, ...action.payload.updates }
          : item
      );
      return {
        items: newItems,
        totalItems: newItems.length,
      };
    }
    
    case 'CLEAR_QUOTES':
      return {
        items: [],
        totalItems: 0,
      };
    
    case 'LOAD_QUOTES':
      return {
        items: action.payload,
        totalItems: action.payload.length,
      };
    
    default:
      return state;
  }
}

interface QuoteContextType {
  state: QuoteState;
  addItem: (item: Omit<QuoteItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<QuoteItem>) => void;
  clearQuotes: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  // Load quotes from localStorage on mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('customer-quote-list');
    if (savedQuotes) {
      try {
        const quotes = JSON.parse(savedQuotes);
        dispatch({ type: 'LOAD_QUOTES', payload: quotes });
      } catch (error) {
        console.error('Failed to load quotes from localStorage:', error);
      }
    }
  }, []);

  // Save quotes to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('customer-quote-list', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<QuoteItem, 'id' | 'addedAt'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateItem = (id: string, updates: Partial<QuoteItem>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
  };

  const clearQuotes = () => {
    dispatch({ type: 'CLEAR_QUOTES' });
  };

  return (
    <QuoteContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateItem,
      clearQuotes,
    }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuotes must be used within a QuoteProvider');
  }
  return context;
}