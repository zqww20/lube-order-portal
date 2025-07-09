import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface QuoteItem {
  id: string;
  productName: string;
  currentPrice: number;
  quantity: number;
  requestedPrice?: number;
  quotedPrice?: number;
  selected?: boolean;
}

export interface Quote {
  id: string;
  customerName: string;
  customerEmail: string;
  items: QuoteItem[];
  status: 'pending' | 'processing' | 'ready' | 'accepted' | 'partially-accepted' | 'rejected';
  totalValue: number;
  createdDate: string;
  responseDate?: string;
  employeeName?: string;
}

interface QuoteContextType {
  quotes: Quote[];
  addQuote: (quote: Omit<Quote, 'id' | 'createdDate' | 'status'>) => void;
  updateQuoteStatus: (quoteId: string, status: Quote['status']) => void;
  updateQuoteItems: (quoteId: string, items: QuoteItem[]) => void;
  getQuoteById: (quoteId: string) => Quote | undefined;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const useQuotes = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuotes must be used within a QuoteProvider');
  }
  return context;
};

interface QuoteProviderProps {
  children: ReactNode;
}

export const QuoteProvider: React.FC<QuoteProviderProps> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 'Q-2024-001',
      customerName: 'Atlantic Marine Services',
      customerEmail: 'contact@atlanticmarine.com',
      items: [
        {
          id: 'item-1',
          productName: 'Marine Gear Oil',
          currentPrice: 45.99,
          quantity: 20,
          requestedPrice: 42.00,
          quotedPrice: 43.50,
        },
        {
          id: 'item-2',
          productName: 'Hydraulic Fluid ISO 46',
          currentPrice: 38.50,
          quantity: 15,
          requestedPrice: 35.00,
          quotedPrice: 36.75,
        }
      ],
      status: 'ready',
      totalValue: 1421.25,
      createdDate: '2024-01-15',
      responseDate: '2024-01-16',
      employeeName: 'Sarah Johnson'
    },
    {
      id: 'Q-2024-002',
      customerName: 'Industrial Solutions Ltd',
      customerEmail: 'orders@industrialsolutions.com',
      items: [
        {
          id: 'item-3',
          productName: 'Premium Engine Oil 5W-30',
          currentPrice: 52.99,
          quantity: 25,
          requestedPrice: 48.00,
          quotedPrice: 50.50,
        }
      ],
      status: 'ready',
      totalValue: 1262.50,
      createdDate: '2024-01-14',
      employeeName: 'Mike Chen'
    },
    {
      id: 'Q-2024-003',
      customerName: 'Maritime Transport Co',
      customerEmail: 'procurement@maritimetransport.com',
      items: [
        {
          id: 'item-4',
          productName: 'Multi-Purpose Grease',
          currentPrice: 28.99,
          quantity: 30,
          requestedPrice: 26.00,
          quotedPrice: 27.50,
        },
        {
          id: 'item-5',
          productName: 'Engine Oil 10W-40',
          currentPrice: 41.50,
          quantity: 40,
          requestedPrice: 38.00,
          quotedPrice: 39.75,
        }
      ],
      status: 'processing',
      totalValue: 2415.00,
      createdDate: '2024-01-12',
      employeeName: 'David Smith'
    }
  ]);

  const addQuote = (quoteData: Omit<Quote, 'id' | 'createdDate' | 'status'>) => {
    const newQuote: Quote = {
      ...quoteData,
      id: `Q-2024-${String(quotes.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setQuotes(prev => [...prev, newQuote]);
  };

  const updateQuoteStatus = (quoteId: string, status: Quote['status']) => {
    setQuotes(prev =>
      prev.map(quote =>
        quote.id === quoteId
          ? { ...quote, status, responseDate: new Date().toISOString().split('T')[0] }
          : quote
      )
    );
  };

  const updateQuoteItems = (quoteId: string, items: QuoteItem[]) => {
    setQuotes(prev =>
      prev.map(quote =>
        quote.id === quoteId
          ? { ...quote, items }
          : quote
      )
    );
  };

  const getQuoteById = (quoteId: string) => {
    return quotes.find(quote => quote.id === quoteId);
  };

  return (
    <QuoteContext.Provider value={{
      quotes,
      addQuote,
      updateQuoteStatus,
      updateQuoteItems,
      getQuoteById,
    }}>
      {children}
    </QuoteContext.Provider>
  );
};