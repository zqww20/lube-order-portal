import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface QuoteItem {
  id: string;
  quoteId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'ready' | 'accepted' | 'rejected';
  createdDate: string;
  responseDate?: string;
  employeeName: string;
}

export interface ConsolidatedOrder {
  id: string;
  customerId: string;
  customerName: string;
  items: QuoteItem[];
  totalValue: number;
  createdDate: string;
  status: 'pending' | 'processing' | 'completed';
}

interface QuoteContextType {
  quotes: QuoteItem[];
  consolidatedOrders: ConsolidatedOrder[];
  selectedItems: string[];
  selectItem: (itemId: string) => void;
  deselectItem: (itemId: string) => void;
  selectAllForCustomer: (customerName: string) => void;
  clearSelection: () => void;
  consolidateSelectedItems: () => void;
  updateQuoteStatus: (itemId: string, status: QuoteItem['status']) => void;
  setCustomerDefaultPricing: (customerId: string, productName: string, price: number) => void;
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
  // Mock data - would come from API
  const [quotes, setQuotes] = useState<QuoteItem[]>([
    {
      id: 'QI-001',
      quoteId: 'Q-2024-001',
      productName: 'Marine Gear Oil',
      quantity: 24,
      unitPrice: 45.50,
      totalPrice: 1092.00,
      customerName: 'Atlantic Marine Services',
      customerEmail: 'orders@atlanticmarine.com',
      status: 'ready',
      createdDate: '2024-01-15',
      employeeName: 'Sarah Johnson'
    },
    {
      id: 'QI-002',
      quoteId: 'Q-2024-001',
      productName: 'Hydraulic Fluid ISO 46',
      quantity: 12,
      unitPrice: 13.17,
      totalPrice: 158.00,
      customerName: 'Atlantic Marine Services',
      customerEmail: 'orders@atlanticmarine.com',
      status: 'ready',
      createdDate: '2024-01-15',
      employeeName: 'Sarah Johnson'
    },
    {
      id: 'QI-003',
      quoteId: 'Q-2024-002',
      productName: 'Premium Engine Oil 5W-30',
      quantity: 48,
      unitPrice: 18.55,
      totalPrice: 890.50,
      customerName: 'Industrial Solutions Ltd',
      customerEmail: 'procurement@industrial-solutions.com',
      status: 'pending',
      createdDate: '2024-01-14',
      employeeName: 'Mike Chen'
    },
    {
      id: 'QI-004',
      quoteId: 'Q-2024-003',
      productName: 'Multi-Purpose Grease',
      quantity: 36,
      unitPrice: 32.75,
      totalPrice: 1179.00,
      customerName: 'Maritime Transport Co',
      customerEmail: 'supplies@maritimetransport.com',
      status: 'ready',
      createdDate: '2024-01-12',
      employeeName: 'David Smith'
    },
    {
      id: 'QI-005',
      quoteId: 'Q-2024-003',
      productName: 'Engine Oil 10W-40',
      quantity: 24,
      unitPrice: 40.49,
      totalPrice: 971.75,
      customerName: 'Maritime Transport Co',
      customerEmail: 'supplies@maritimetransport.com',
      status: 'ready',
      createdDate: '2024-01-12',
      employeeName: 'David Smith'
    }
  ]);

  const [consolidatedOrders, setConsolidatedOrders] = useState<ConsolidatedOrder[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const selectItem = (itemId: string) => {
    setSelectedItems(prev => [...prev, itemId]);
  };

  const deselectItem = (itemId: string) => {
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const selectAllForCustomer = (customerName: string) => {
    const customerItems = quotes
      .filter(quote => quote.customerName === customerName && quote.status === 'ready')
      .map(quote => quote.id);
    setSelectedItems(prev => [...new Set([...prev, ...customerItems])]);
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const consolidateSelectedItems = () => {
    const selectedQuotes = quotes.filter(quote => selectedItems.includes(quote.id));
    
    if (selectedQuotes.length === 0) return;

    // Group by customer
    const customerGroups = selectedQuotes.reduce((groups, quote) => {
      const key = quote.customerName;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(quote);
      return groups;
    }, {} as Record<string, QuoteItem[]>);

    // Create consolidated orders for each customer
    Object.entries(customerGroups).forEach(([customerName, items]) => {
      const totalValue = items.reduce((sum, item) => sum + item.totalPrice, 0);
      
      const consolidatedOrder: ConsolidatedOrder = {
        id: `CO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        customerId: items[0].customerEmail,
        customerName: customerName,
        items: items,
        totalValue: totalValue,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };

      setConsolidatedOrders(prev => [...prev, consolidatedOrder]);

      // Update quote statuses to accepted
      setQuotes(prev => prev.map(quote => 
        selectedItems.includes(quote.id) 
          ? { ...quote, status: 'accepted' as const, responseDate: new Date().toISOString().split('T')[0] }
          : quote
      ));

      // Set default pricing for customer (in real app, this would update customer pricing table)
      items.forEach(item => {
        setCustomerDefaultPricing(items[0].customerEmail, item.productName, item.unitPrice);
      });
    });

    clearSelection();
  };

  const updateQuoteStatus = (itemId: string, status: QuoteItem['status']) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === itemId ? { ...quote, status, responseDate: new Date().toISOString().split('T')[0] } : quote
    ));
  };

  const setCustomerDefaultPricing = (customerId: string, productName: string, price: number) => {
    // In a real application, this would update the customer's default pricing in the database
    console.log(`Setting default price for customer ${customerId}: ${productName} = $${price}`);
  };

  return (
    <QuoteContext.Provider value={{
      quotes,
      consolidatedOrders,
      selectedItems,
      selectItem,
      deselectItem,
      selectAllForCustomer,
      clearSelection,
      consolidateSelectedItems,
      updateQuoteStatus,
      setCustomerDefaultPricing
    }}>
      {children}
    </QuoteContext.Provider>
  );
};