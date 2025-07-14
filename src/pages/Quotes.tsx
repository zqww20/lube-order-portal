import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Search, Download, Package } from 'lucide-react';

interface Quote {
  id: string;
  quoteNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'ready' | 'accepted' | 'expired';
  total: number;
  items: number;
  shippingAddress: string;
  erpReference?: string;
}

const mockQuotes: Quote[] = [
  {
    id: '1',
    quoteNumber: 'QTE-2024-001',
    date: '2024-01-15',
    status: 'accepted',
    total: 275.96,
    items: 3,
    shippingAddress: '123 Industrial Park, Manufacturing District',
    erpReference: 'ERP-QTE-2024-001'
  },
  {
    id: '2',
    quoteNumber: 'QTE-2024-002',
    date: '2024-01-20',
    status: 'ready',
    total: 189.98,
    items: 2,
    shippingAddress: '456 Factory Lane, Industrial Zone',
    erpReference: 'ERP-QTE-2024-002'
  },
  {
    id: '3',
    quoteNumber: 'QTE-2024-003',
    date: '2024-01-22',
    status: 'processing',
    total: 567.45,
    items: 5,
    shippingAddress: '789 Workshop Road, Manufacturing Hub',
    erpReference: 'ERP-QTE-2024-003'
  },
  {
    id: '4',
    quoteNumber: 'QTE-2024-004',
    date: '2024-01-25',
    status: 'pending',
    total: 123.50,
    items: 1,
    shippingAddress: '321 Service Center, Industrial Area'
  }
];

const statusColorMap = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  ready: 'bg-purple-100 text-purple-800',
  accepted: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800'
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
    const quote = quotes.find(q => q.id === quoteId);
    if (quote?.status === 'ready' || quote?.status === 'accepted') {
      // Add quoted items to cart
      const quotedItems = [
        {
          id: `quoted-${quoteId}-1`,
          name: 'Premium Engine Oil 5W-30',
          price: 45.99,
          unit: 'per liter',
          quantity: 2,
          image: '/placeholder.svg',
          minOrder: 1,
          availableStock: 10
        }
      ];
      localStorage.setItem('quotedCartItems', JSON.stringify(quotedItems));
      window.location.href = `/cart?from=quotes`;
    }
  };

  const downloadQuote = (quoteId: string) => {
    console.log('Downloading quote for:', quoteId);
    // Here you would trigger quote download from ERP system
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <p>Date: {new Date(quote.date).toLocaleDateString()}</p>
                    <p>Items: {quote.items}</p>
                    <p>Total: ${quote.total.toFixed(2)}</p>
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
                  {quote.status === 'ready' || quote.status === 'accepted' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewQuoteDetails(quote.id)}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Pending
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
    </div>
  );
};

export default Quotes;