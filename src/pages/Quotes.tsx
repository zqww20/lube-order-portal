import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuotes } from '@/contexts/QuoteContext';
import { Trash2, Send, ShoppingCart, FileText, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CustomerQuotes = () => {
  const { state, removeItem, clearQuotes } = useQuotes();
  const { toast } = useToast();

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: "Item Removed",
      description: "Quote item has been removed from your list.",
    });
  };

  const handleSubmitAllQuotes = () => {
    if (state.items.length === 0) {
      toast({
        title: "No Items",
        description: "Add some items to your quote list first.",
        variant: "destructive",
      });
      return;
    }

    // Here you would submit all quotes to your backend
    console.log('Submitting all quotes:', state.items);
    
    toast({
      title: "Quote Requests Submitted",
      description: `${state.items.length} quote requests have been submitted. We'll contact you within 24 hours.`,
    });
    
    clearQuotes();
  };

  const getTotalEstimatedValue = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quote List</h1>
          <p className="text-muted-foreground">
            {state.totalItems} item{state.totalItems !== 1 ? 's' : ''} in your quote list
          </p>
        </div>
        
        {state.totalItems > 0 && (
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={clearQuotes}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <Button onClick={handleSubmitAllQuotes}>
              <Send className="h-4 w-4 mr-2" />
              Submit All Quotes
            </Button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {state.totalItems === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your quote list is empty</h3>
            <p className="text-muted-foreground mb-4">
              Add products to your quote list to request bulk pricing
            </p>
            <Button asChild>
              <a href="/products">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Browse Products
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quote Summary */}
      {state.totalItems > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Quote Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{state.totalItems}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Value</p>
                <p className="text-2xl font-bold">${getTotalEstimatedValue().toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="secondary">Draft</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quote Items */}
      <div className="space-y-4">
        {state.items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.productName}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <Badge variant="outline">{item.category}</Badge>
                    <span>{item.viscosity}</span>
                    <span>{item.application}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Quantity</p>
                  <p className="text-lg">{item.quantity} {item.unit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Current Price</p>
                  <p className="text-lg">${item.price} per {item.unit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Estimated Total</p>
                  <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Added</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="border-t pt-4 space-y-2">
                {item.requirements && (
                  <div className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Special Requirements</p>
                      <p className="text-sm text-muted-foreground">{item.requirements}</p>
                    </div>
                  </div>
                )}
                
                {item.expectedDelivery && (
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Expected Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.expectedDelivery).toLocaleDateString()} 
                        {item.emergencyDelivery === 'emergency' && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Emergency (+$75)
                          </Badge>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {item.shipToAddress && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Ship To</p>
                      <p className="text-sm text-muted-foreground">{item.shipToAddress}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerQuotes;