import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, MapPin, Plus, Minus, Trash2, Quote } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import WarehouseStagingStatus from '@/components/WarehouseStagingStatus';

const GuestCart = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, updateQuantity, removeFromCart, getSubtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle quoted items from URL parameters
  useEffect(() => {
    const quotedItems = searchParams.get('quoted');
    if (quotedItems) {
      try {
        const items = JSON.parse(decodeURIComponent(quotedItems));
        // Add quoted items to cart (implementation depends on your cart context)
        toast({
          title: "Quoted Items Added",
          description: `${items.length} quoted items have been added to your cart.`,
        });
      } catch (error) {
        console.error('Error parsing quoted items:', error);
      }
    }
  }, [searchParams, toast]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const item = items.find(item => item.id === id);
    if (!item) return;

    if (newQuantity < item.minOrder) {
      toast({
        title: "Minimum Order Requirement",
        description: `Minimum order quantity is ${item.minOrder} units.`,
        variant: "destructive",
      });
      return;
    }

    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Order Submitted",
      description: "Your guest order has been submitted for cash pickup. You'll receive a confirmation email shortly.",
    });
    
    clearCart();
    setIsProcessing(false);
    navigate('/guest/dashboard');
  };

  const getTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getUniqueProductCount = () => {
    return items.length;
  };

  const isAtLimit = () => {
    return getUniqueProductCount() >= 5;
  };

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Guest Cart</h1>
            <p className="text-muted-foreground">Review your items for cash pickup</p>
          </div>
        </div>

        {/* Empty Cart State */}
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">Add products to get started with your guest order</p>
            <Button onClick={() => navigate('/guest/products')}>Browse Products</Button>
          </CardContent>
        </Card>

        {/* Cash Payment Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Pickup Information</h4>
                <p className="text-sm text-blue-700 mb-2">All guest orders are for store pickup with cash or e-transfer payment.</p>
                <div className="text-sm text-blue-700">
                  <p><strong>Store Hours:</strong> Mon-Fri 8AM-6PM, Sat 8AM-4PM</p>
                  <p><strong>Location:</strong> 1234 Industrial Blvd, Suite 100</p>
                  <p><strong>Payment:</strong> Cash or E-transfer at pickup</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Guest Cart</h1>
          <p className="text-muted-foreground">Review your items for cash pickup</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">
            {getUniqueProductCount()}/5 Products
          </Badge>
          <Badge variant="outline">
            {getTotalQuantity()} Items Total
          </Badge>
        </div>
      </div>

      {/* Product Limit Warning */}
      {isAtLimit() && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Quote className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Product Limit Reached</h4>
                <p className="text-sm text-amber-700">
                  You've reached the 5-product limit for guest orders. Remove items to add different products.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {item.isQuoted ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Quoted: ${item.quotedPrice?.toFixed(2)}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">
                          Quote Required
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">{item.unit}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= item.minOrder}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-16 text-center"
                      min={item.minOrder}
                    />
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {item.isQuoted ? (
                        `$${((item.quotedPrice || item.price) * item.quantity).toFixed(2)}`
                      ) : (
                        'Quote Required'
                      )}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">
                  {items.every(item => item.isQuoted) ? `$${getSubtotal().toFixed(2)}` : 'Quote Required'}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Taxes</span>
                <span>Calculated at pickup</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span>Store Pickup (Free)</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  {items.every(item => item.isQuoted) ? `$${getSubtotal().toFixed(2)}` : 'Quote Required'}
                </span>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCheckout}
                disabled={isProcessing || !items.every(item => item.isQuoted)}
              >
                {isProcessing ? 'Processing...' : 'Submit Order for Pickup'}
              </Button>
              
              {!items.every(item => item.isQuoted) && (
                <p className="text-sm text-muted-foreground text-center">
                  All items must be quoted before checkout
                </p>
              )}
            </CardContent>
          </Card>

          {/* Pickup Information */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Pickup Information</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Store Hours:</strong> Mon-Fri 8AM-6PM, Sat 8AM-4PM</p>
                    <p><strong>Location:</strong> 1234 Industrial Blvd, Suite 100</p>
                    <p><strong>Payment:</strong> Cash or E-transfer at pickup</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuestCart;