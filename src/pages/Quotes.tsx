import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Search, Download, Package } from 'lucide-react';

interface QuoteLineItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selected?: boolean;
}

interface Quote {
  id: string;
  quoteNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'ready' | 'accepted' | 'expired' | 'partially-accepted';
  total: number;
  items: QuoteLineItem[];
  shippingAddress: string;
  erpReference?: string;
  validUntil?: string;
}

const mockQuotes: Quote[] = [
  {
    id: '1',
    quoteNumber: 'QTE-2024-001',
    date: '2024-01-15',
    status: 'accepted',
    total: 275.96,
    items: [
      { id: '1-1', productName: 'Premium Engine Oil 5W-30', quantity: 2, unitPrice: 45.99, totalPrice: 91.98 },
      { id: '1-2', productName: 'Hydraulic Fluid ISO 46', quantity: 1, unitPrice: 89.99, totalPrice: 89.99 },
      { id: '1-3', productName: 'Multi-Purpose Grease', quantity: 3, unitPrice: 31.33, totalPrice: 93.99 }
    ],
    shippingAddress: '123 Industrial Park, Manufacturing District',
    erpReference: 'ERP-QTE-2024-001',
    validUntil: '2024-02-15'
  },
  {
    id: '2',
    quoteNumber: 'QTE-2024-002',
    date: '2024-01-20',
    status: 'ready',
    total: 189.98,
    items: [
      { id: '2-1', productName: 'Marine Gear Oil', quantity: 1, unitPrice: 125.50, totalPrice: 125.50 },
      { id: '2-2', productName: 'Engine Oil 10W-40', quantity: 2, unitPrice: 32.24, totalPrice: 64.48 }
    ],
    shippingAddress: '456 Factory Lane, Industrial Zone',
    erpReference: 'ERP-QTE-2024-002',
    validUntil: '2024-02-20'
  },
  {
    id: '3',
    quoteNumber: 'QTE-2024-003',
    date: '2024-01-22',
    status: 'processing',
    total: 567.45,
    items: [
      { id: '3-1', productName: 'Hydraulic System Cleaner', quantity: 3, unitPrice: 75.99, totalPrice: 227.97 },
      { id: '3-2', productName: 'Industrial Grease', quantity: 2, unitPrice: 89.50, totalPrice: 179.00 },
      { id: '3-3', productName: 'Cutting Fluid', quantity: 4, unitPrice: 40.12, totalPrice: 160.48 }
    ],
    shippingAddress: '789 Workshop Road, Manufacturing Hub',
    erpReference: 'ERP-QTE-2024-003',
    validUntil: '2024-02-22'
  },
  {
    id: '4',
    quoteNumber: 'QTE-2024-004',
    date: '2024-01-25',
    status: 'pending',
    total: 123.50,
    items: [
      { id: '4-1', productName: 'Brake Fluid DOT 4', quantity: 5, unitPrice: 24.70, totalPrice: 123.50 }
    ],
    shippingAddress: '321 Service Center, Industrial Area',
    validUntil: '2024-02-25'
  }
];

const statusColorMap = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  ready: 'bg-purple-100 text-purple-800',
  accepted: 'bg-green-100 text-green-800',
  'partially-accepted': 'bg-orange-100 text-orange-800',
  expired: 'bg-red-100 text-red-800'
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterQuotes(term, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterQuotes(searchTerm, status);
  };

  const filterQuotes = (search: string, status: string) => {
    let filtered = quotes;

    if (search) {
      filtered = filtered.filter(quote =>
        quote.quoteNumber.toLowerCase().includes(search.toLowerCase()) ||
        quote.erpReference?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(quote => quote.status === status);
    }

    setFilteredQuotes(filtered);
  };

  const viewQuoteDetails = (quoteId: string) => {
    console.log('Viewing quote details for:', quoteId);
    // Here you would navigate to quote details or open a modal
  };

  const downloadQuote = (quoteId: string) => {
    console.log('Downloading quote for:', quoteId);
    // Here you would trigger quote download from ERP system
  };

  const acceptSelectedItems = (quote: Quote) => {
    const selectedItems = quote.items.filter(item => item.selected);
    if (selectedItems.length === 0) return;

    // Create consolidated order from selected items
    const orderNumber = `ORD-${Date.now()}`;
    const orderTotal = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
    console.log('Creating order:', {
      orderNumber,
      items: selectedItems,
      total: orderTotal,
      shippingAddress: quote.shippingAddress
    });

    // Update quote status
    const hasUnselectedItems = quote.items.some(item => !item.selected);
    const newStatus = hasUnselectedItems ? 'partially-accepted' : 'accepted';
    
    setQuotes(prev => prev.map(q => 
      q.id === quote.id 
        ? { ...q, status: newStatus as Quote['status'] }
        : q
    ));

    // Update pricing defaults for customer (would be API call)
    selectedItems.forEach(item => {
      console.log(`Setting new default price for ${item.productName}: $${item.unitPrice}`);
    });

    setSelectedQuote(null);
  };

  const toggleItemSelection = (quoteId: string, itemId: string) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? {
            ...quote,
            items: quote.items.map(item => 
              item.id === itemId 
                ? { ...item, selected: !item.selected }
                : item
            )
          }
        : quote
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Quote Requests</h1>
          <p className="text-gray-600 mt-2">Track and manage your lubricant quotes</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Quotes</p>
          <p className="text-2xl font-bold text-blue-600">{quotes.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by quote number or product..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="ready">Quote Ready</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="partially-accepted">Partially Accepted</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quotes List */}
      <div className="space-y-4">
        {filteredQuotes.map((quote) => (
          <Card key={quote.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="font-semibold text-lg">{quote.id}</h3>
                    <Badge className={quote.status === 'ready' || quote.status === 'accepted' ? 'bg-green-100 text-green-800' : statusColorMap[quote.status]}>
                      {quote.status === 'ready' ? 'Quote Ready' : quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-gray-600">
                    <p>Date: {new Date(quote.date).toLocaleDateString()}</p>
                    <p>Items: {quote.items.length}</p>
                    <p>Total: ${quote.total.toFixed(2)}</p>
                    {quote.validUntil && <p>Valid Until: {new Date(quote.validUntil).toLocaleDateString()}</p>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Ship to: {quote.shippingAddress}
                  </p>
                  {quote.erpReference && (
                    <p className="text-sm text-blue-600 mt-1">
                      ERP Ref: {quote.erpReference}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewQuoteDetails(quote.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Quote
                  </Button>
                  {quote.status === 'ready' && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setSelectedQuote(quote)}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Accept Items
                    </Button>
                  )}
                  {quote.status === 'accepted' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadQuote(quote.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No quotes found</h2>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Quote Selection Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Accept Quote Items - {selectedQuote.quoteNumber}</h2>
                <Button variant="outline" onClick={() => setSelectedQuote(null)}>×</Button>
              </div>
              <p className="text-gray-600 mt-2">Select the items you want to accept and create an order</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {selectedQuote.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={item.selected || false}
                        onChange={() => toggleItemSelection(selectedQuote.id, item.id)}
                        className="w-4 h-4"
                      />
                      <div>
                        <h4 className="font-medium">{item.productName}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity} @ ${item.unitPrice}/unit</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Selected Items Total:</p>
                    <p className="text-2xl font-bold">
                      ${selectedQuote.items
                        .filter(item => item.selected)
                        .reduce((sum, item) => sum + item.totalPrice, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setSelectedQuote(null)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => acceptSelectedItems(selectedQuote)}
                      disabled={!selectedQuote.items.some(item => item.selected)}
                    >
                      Create Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotes;