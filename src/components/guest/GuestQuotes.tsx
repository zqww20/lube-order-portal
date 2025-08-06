import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Quote, Calendar, Package, DollarSign, CheckCircle, XCircle, Clock, ShoppingCart } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';

interface GuestQuote {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  requirements: string;
  expectedDelivery: string;
  requestDate: string;
  status: 'pending' | 'processing' | 'quoted' | 'accepted' | 'declined';
  quoteAmount?: number;
  validUntil?: string;
}

const mockGuestQuotes: GuestQuote[] = [
  {
    id: 'GQ001',
    productName: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    quantity: 5,
    requirements: 'Small business bulk purchase',
    expectedDelivery: '2024-02-15',
    status: 'quoted',
    requestDate: '2024-01-20',
    quoteAmount: 210.00,
    validUntil: '2024-02-05'
  },
  {
    id: 'GQ002',
    productName: 'Multi-Purpose Grease',
    category: 'Greases',
    quantity: 3,
    requirements: 'Pickup preferred',
    expectedDelivery: '2024-02-10',
    status: 'quoted',
    requestDate: '2024-01-21',
    quoteAmount: 87.50,
    validUntil: '2024-02-07'
  },
  {
    id: 'GQ003',
    productName: 'Marine Gear Oil',
    category: 'Marine Lubricants',
    quantity: 2,
    requirements: 'Urgent pickup needed',
    expectedDelivery: '2024-01-30',
    status: 'pending',
    requestDate: '2024-01-22'
  }
];

const statusInfo = {
  pending: { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock, text: 'Quote Pending' },
  processing: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Package, text: 'Processing' },
  quoted: { color: 'bg-green-50 text-green-700 border-green-200', icon: DollarSign, text: 'Quote Ready' },
  accepted: { color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle, text: 'Accepted' },
  declined: { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, text: 'Declined' }
};

const GuestQuotes = () => {
  const { state, dispatch } = useQuote();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);

  // For guest portal, we'll use local state instead of the global context
  const [quotes] = useState<GuestQuote[]>(mockGuestQuotes);
  
  const readyQuotes = quotes.filter(quote => quote.status === 'quoted' && quote.quoteAmount);
  const selectedCount = selectedQuotes.length;
  const selectedTotal = selectedQuotes.reduce((total, quoteId) => {
    const quote = quotes.find(q => q.id === quoteId);
    return total + (quote?.quoteAmount || 0);
  }, 0);

  const handleQuoteSelect = (quoteId: string, selected: boolean) => {
    if (selected) {
      setSelectedQuotes(prev => [...prev, quoteId]);
    } else {
      setSelectedQuotes(prev => prev.filter(id => id !== quoteId));
    }
  };

  const handleMoveToCart = () => {
    if (selectedQuotes.length === 0) {
      toast({
        title: "No Quotes Selected",
        description: "Please select at least one quote to move to cart.",
        variant: "destructive"
      });
      return;
    }

    // Note: Guest portal limitations reminder
    if (selectedQuotes.length > 5) {
      toast({
        title: "Guest Portal Limit",
        description: "Guest accounts are limited to 5 unique items. Please select fewer quotes.",
        variant: "destructive"
      });
      return;
    }

    // Create cart items from selected quotes
    const cartItems = selectedQuotes.map(quoteId => {
      const quote = quotes.find(q => q.id === quoteId)!;
      return {
        id: quote.id,
        name: quote.productName,
        price: (quote.quoteAmount || 0) / quote.quantity,
        quantity: quote.quantity,
        category: quote.category,
        unit: 'each',
        availableStock: quote.quantity + 10,
        fromQuote: true,
        quoteId: quote.id
      };
    });

    // Store in localStorage for guest cart
    localStorage.setItem('guestQuotedCartItems', JSON.stringify(cartItems));

    toast({
      title: "Quotes Moved to Cart",
      description: `${selectedCount} quotes have been accepted and moved to your cart.`,
    });

    navigate('/guest/cart?from=quotes');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-bw-text">My Quote Requests</h1>
          <p className="text-bw-text/70 mt-2">Track your quote requests and responses (Guest Portal)</p>
        </div>
        <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
          <Quote className="h-5 w-5" />
          <span className="font-semibold">{quotes.length} Active</span>
        </div>
      </div>

      {/* Guest Portal Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm font-medium">
          <strong>Guest Portal:</strong> Cash or E-transfer payment • Pick-up only • Limited to 5 unique items per order
        </p>
      </div>

      {/* Action Bar for Ready Quotes */}
      {readyQuotes.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-green-800">
                  {selectedCount > 0 ? `${selectedCount} quotes selected` : `${readyQuotes.length} quotes ready`}
                </h3>
                {selectedCount > 0 && (
                  <p className="text-green-700">Total: ${selectedTotal.toFixed(2)}</p>
                )}
              </div>
              <Button 
                onClick={handleMoveToCart}
                disabled={selectedCount === 0}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Move to Cart ({selectedCount})
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quotes List */}
      <div className="space-y-4">
        {quotes.map((quote) => {
          const statusConfig = statusInfo[quote.status];
          const StatusIcon = statusConfig.icon;
          const isReady = quote.status === 'quoted' && quote.quoteAmount;
          const isSelected = selectedQuotes.includes(quote.id);

          return (
            <Card key={quote.id} className={`hover:shadow-lg transition-all duration-200 ${isSelected ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    {isReady && (
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleQuoteSelect(quote.id, checked as boolean)}
                        className="mt-1"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">{quote.productName}</h3>
                        <Badge className={statusConfig.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-bw-text/60 mb-2">Quote #{quote.id} • {quote.category}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-bw-text/60">
                        <p>Quantity: {quote.quantity} units</p>
                        <p>Requested: {quote.requestDate}</p>
                        <p>Expected: {quote.expectedDelivery}</p>
                        {quote.quoteAmount && <p>Total: ${quote.quoteAmount.toFixed(2)}</p>}
                      </div>
                      
                      {quote.requirements && (
                        <p className="text-sm text-bw-text/60 mt-2">
                          Requirements: {quote.requirements}
                        </p>
                      )}
                      
                      {quote.quoteAmount ? (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-green-800">Quote Total: ${quote.quoteAmount.toFixed(2)}</p>
                              <p className="text-sm text-green-600">Valid until: {quote.validUntil}</p>
                              <p className="text-xs text-green-600 mt-1">Guest pricing includes pickup only</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 p-3 bg-bw-surface rounded-lg border shadow-bw-md">
                          <p className="text-bw-text/70 text-sm">
                            {quote.status === 'pending' ? 'Awaiting review...' : 'Quote being prepared...'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {quotes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Quote className="h-12 w-12 mx-auto text-bw-text/50 mb-4" />
            <h3 className="text-lg font-medium text-bw-text mb-2">No quote requests yet</h3>
            <p className="text-bw-text/70 mb-4">
              Start by browsing products and requesting quotes for items you need.
            </p>
            <Button onClick={() => navigate('/guest/products')}>
              Browse Products
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuestQuotes;