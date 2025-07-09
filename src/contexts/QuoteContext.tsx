import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface QuoteItem {
  id: string;
  productName: string;
  productId: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  requirements: string;
  expectedDelivery: string;
  status: 'pending' | 'processing' | 'quoted' | 'accepted' | 'declined';
  requestDate: string;
  quoteAmount?: number;
  validUntil?: string;
  selected?: boolean;
}

export interface QuoteState {
  quotes: QuoteItem[];
  selectedQuotes: QuoteItem[];
  isLoading: boolean;
}

type QuoteAction = 
  | { type: 'SET_QUOTES'; payload: QuoteItem[] }
  | { type: 'SELECT_QUOTE'; payload: string }
  | { type: 'DESELECT_QUOTE'; payload: string }
  | { type: 'CLEAR_SELECTIONS' }
  | { type: 'ACCEPT_SELECTED_QUOTES' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: QuoteState = {
  quotes: [
    {
      id: 'Q001',
      productId: 'P001',
      productName: 'Premium Engine Oil 5W-30',
      category: 'Engine Oils',
      quantity: 100,
      unitPrice: 42.00,
      totalPrice: 4200.00,
      requirements: 'Bulk purchase for fleet maintenance',
      expectedDelivery: '2024-02-15',
      status: 'quoted',
      requestDate: '2024-01-20',
      quoteAmount: 4200.00,
      validUntil: '2024-02-05',
      selected: false
    },
    {
      id: 'Q002',
      productId: 'P002',
      productName: 'Hydraulic System Cleaner',
      category: 'Industrial Fluids',
      quantity: 50,
      unitPrice: 37.00,
      totalPrice: 1850.00,
      requirements: 'Regular maintenance schedule',
      expectedDelivery: '2024-02-10',
      status: 'quoted',
      requestDate: '2024-01-21',
      quoteAmount: 1850.00,
      validUntil: '2024-02-07',
      selected: false
    },
    {
      id: 'Q003',
      productId: 'P003',
      productName: 'Marine Gear Oil',
      category: 'Marine Lubricants',
      quantity: 25,
      unitPrice: 0,
      totalPrice: 0,
      requirements: 'Urgent delivery needed',
      expectedDelivery: '2024-01-30',
      status: 'pending',
      requestDate: '2024-01-22',
      selected: false
    },
    {
      id: 'Q004',
      productId: 'P004',
      productName: 'Industrial Grease Multi-Purpose',
      category: 'Greases',
      quantity: 12,
      unitPrice: 0,
      totalPrice: 0,
      requirements: 'High temperature application',
      expectedDelivery: '2024-02-05',
      status: 'processing',
      requestDate: '2024-01-23',
      selected: false
    }
  ],
  selectedQuotes: [],
  isLoading: false
};

const quoteReducer = (state: QuoteState, action: QuoteAction): QuoteState => {
  switch (action.type) {
    case 'SET_QUOTES':
      return {
        ...state,
        quotes: action.payload
      };
    case 'SELECT_QUOTE':
      return {
        ...state,
        quotes: state.quotes.map(quote =>
          quote.id === action.payload ? { ...quote, selected: true } : quote
        ),
        selectedQuotes: [
          ...state.selectedQuotes,
          state.quotes.find(q => q.id === action.payload)!
        ]
      };
    case 'DESELECT_QUOTE':
      return {
        ...state,
        quotes: state.quotes.map(quote =>
          quote.id === action.payload ? { ...quote, selected: false } : quote
        ),
        selectedQuotes: state.selectedQuotes.filter(q => q.id !== action.payload)
      };
    case 'CLEAR_SELECTIONS':
      return {
        ...state,
        quotes: state.quotes.map(quote => ({ ...quote, selected: false })),
        selectedQuotes: []
      };
    case 'ACCEPT_SELECTED_QUOTES':
      return {
        ...state,
        quotes: state.quotes.map(quote =>
          quote.selected ? { ...quote, status: 'accepted' as const, selected: false } : quote
        ),
        selectedQuotes: []
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

const QuoteContext = createContext<{
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
} | null>(null);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  return (
    <QuoteContext.Provider value={{ state, dispatch }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};