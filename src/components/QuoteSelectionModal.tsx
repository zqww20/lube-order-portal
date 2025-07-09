import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Package, Calendar } from 'lucide-react';
import { useQuote, QuoteItem } from '@/contexts/QuoteContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface QuoteSelectionModalProps {
  open: boolean;
  onClose: () => void;
  readyQuotes: QuoteItem[];
}

const QuoteSelectionModal = ({ open, onClose, readyQuotes }: QuoteSelectionModalProps) => {
  const { state, dispatch } = useQuote();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuoteSelect = (quoteId: string, selected: boolean) => {
    if (selected) {
      dispatch({ type: 'SELECT_QUOTE', payload: quoteId });
    } else {
      dispatch({ type: 'DESELECT_QUOTE', payload: quoteId });
    }
  };

  const handleProceedToCart = () => {
    if (state.selectedQuotes.length === 0) {
      toast({
        title: "No Quotes Selected",
        description: "Please select at least one quote to proceed to cart.",
        variant: "destructive",
      });
      return;
    }

    // Accept selected quotes and update their status
    dispatch({ type: 'ACCEPT_SELECTED_QUOTES' });

    // Create cart items from selected quotes
    const cartItems = state.selectedQuotes.map(quote => ({
      id: quote.productId,
      name: quote.productName,
      price: quote.unitPrice,
      quantity: quote.quantity,
      unit: 'per unit',
      image: '/placeholder.svg',
      minOrder: 1,
      availableStock: quote.quantity + 10,
      fromQuote: true,
      quoteId: quote.id
    }));

    // Store cart items in localStorage or context
    localStorage.setItem('quotedCartItems', JSON.stringify(cartItems));

    toast({
      title: "Quotes Accepted",
      description: `${state.selectedQuotes.length} quotes have been accepted and added to your cart.`,
    });

    onClose();
    navigate('/cart?from=quotes');
  };

  const getSelectionTotal = () => {
    return state.selectedQuotes.reduce((total, quote) => total + (quote.quoteAmount || 0), 0);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Select Quotes to Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the quotes you want to accept and add to your cart. These prices will become your new customer defaults.
          </p>

          <div className="grid gap-4">
            {readyQuotes.map((quote) => (
              <Card key={quote.id} className={`transition-all ${quote.selected ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={quote.selected || false}
                      onCheckedChange={(checked) => handleQuoteSelect(quote.id, checked as boolean)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{quote.productName}</h4>
                          <p className="text-sm text-muted-foreground">Quote #{quote.id} • {quote.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">${quote.quoteAmount?.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            ${quote.unitPrice.toFixed(2)} per unit
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <span className="ml-1 font-medium">{quote.quantity} units</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expected:</span>
                          <span className="ml-1 font-medium">{quote.expectedDelivery}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valid Until:</span>
                          <span className="ml-1 font-medium">{quote.validUntil}</span>
                        </div>
                      </div>

                      {quote.requirements && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Requirements:</span>
                          <span className="ml-1">{quote.requirements}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {state.selectedQuotes.length > 0 && (
            <>
              <Separator />
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Selected Quotes ({state.selectedQuotes.length})</span>
                  <span className="text-lg font-semibold">${getSelectionTotal().toFixed(2)}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  These items will be added to your cart with the quoted prices as your new customer defaults.
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleProceedToCart}
              disabled={state.selectedQuotes.length === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart ({state.selectedQuotes.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteSelectionModal;