
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  minOrder: number;
  availableStock: number;
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Engine Oil 5W-30',
    price: 45.99,
    unit: 'per liter',
    quantity: 4,
    image: '/placeholder.svg',
    minOrder: 4,
    availableStock: 6
  },
  {
    id: '2',
    name: 'Industrial Hydraulic Fluid',
    price: 89.99,
    unit: 'per 5L container',
    quantity: 5,
    image: '/placeholder.svg',
    minOrder: 1,
    availableStock: 3
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [emergencyDelivery, setEmergencyDelivery] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Check for emergency delivery parameter on component mount
  useEffect(() => {
    const isEmergency = searchParams.get('emergency') === 'true';
    if (isEmergency) {
      setEmergencyDelivery(true);
      toast({
        title: "Emergency Delivery Selected",
        description: "Emergency delivery surcharge ($75) has been added to your order.",
      });
    }
  }, [searchParams, toast]);

  const updateQuantity = (id: string, newQuantity: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    if (newQuantity < item.minOrder) {
      toast({
        title: "Minimum Order Requirement",
        description: `Minimum order quantity for ${item.name} is ${item.minOrder} units.`,
        variant: "destructive",
      });
      return;
    }

    if (newQuantity === 0) {
      removeItem(id);
      return;
    }

    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getEmergencyDeliveryFee = () => {
    return emergencyDelivery ? 75.00 : 0;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getEmergencyDeliveryFee();
  };

  const handleCheckout = () => {
    toast({
      title: "Order Placed",
      description: "Your order has been submitted successfully! You will receive a confirmation email shortly.",
    });
    
    // Here you would integrate with your ERP system
    console.log("Sending order to ERP:", {
      items: cartItems,
      subtotal: getSubtotal(),
      tax: getTax(),
      total: getTotal(),
      timestamp: new Date().toISOString()
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Button onClick={() => window.history.back()}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                 <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price} {item.unit}</p>
                    <Badge variant="outline" className="mt-1">
                      Min. Order: {item.minOrder}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= item.minOrder}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      min={item.minOrder}
                    />
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Partial Fulfillment Notice */}
                {item.quantity > item.availableStock && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-orange-800 text-sm">Limited Availability</p>
                        <p className="text-orange-700 text-sm">
                          <span className="font-medium">{item.availableStock} units</span> will ship now. 
                          The remaining <span className="font-medium">{item.quantity - item.availableStock} units</span> will be placed on backorder.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Cross-Sell Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frequently Bought Together</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Engine Filter Kit</h4>
                    <p className="text-sm text-gray-600">$24.99</p>
                  </div>
                  <Button size="sm" variant="outline">Add</Button>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Premium Grease</h4>
                    <p className="text-sm text-gray-600">$18.99</p>
                  </div>
                  <Button size="sm" variant="outline">Add</Button>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Marine Additives</h4>
                    <p className="text-sm text-gray-600">$32.99</p>
                  </div>
                  <Button size="sm" variant="outline">Add</Button>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Oil Analysis Kit</h4>
                    <p className="text-sm text-gray-600">$45.99</p>
                  </div>
                  <Button size="sm" variant="outline">Add</Button>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">Bundle Deal</span>
                  <Badge variant="secondary">Save 15%</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Add all recommended items and save $18.50
                </p>
                <Button className="w-full" size="sm">
                  Add Complete Bundle
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Ship-To Selection */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ship To</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-primary/5 border-primary/20">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="address1" 
                        name="shipTo" 
                        defaultChecked 
                        className="text-primary focus:ring-primary"
                      />
                      <label htmlFor="address1" className="font-medium text-sm">Main Warehouse</label>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      123 Industrial Blvd, Houston, TX 77001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="address2" 
                        name="shipTo" 
                        className="text-primary focus:ring-primary"
                      />
                      <label htmlFor="address2" className="font-medium text-sm">Secondary Location</label>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      456 Commerce St, Dallas, TX 75201
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="address3" 
                        name="shipTo" 
                        className="text-primary focus:ring-primary"
                      />
                      <label htmlFor="address3" className="font-medium text-sm">Port Facility</label>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      789 Harbor Dr, Galveston, TX 77550
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Delivery Options */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 border rounded-lg ${!emergencyDelivery ? 'bg-primary/5 border-primary/20' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="standard" 
                      name="delivery" 
                      checked={!emergencyDelivery}
                      onChange={() => setEmergencyDelivery(false)}
                      className="text-primary focus:ring-primary"
                    />
                    <label htmlFor="standard" className="font-medium text-sm">Standard Delivery</label>
                  </div>
                  <span className="text-sm font-medium">Free</span>
                </div>
                
                <div className={`flex items-center justify-between p-3 border rounded-lg ${emergencyDelivery ? 'bg-primary/5 border-primary/20' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="emergency" 
                      name="delivery" 
                      checked={emergencyDelivery}
                      onChange={() => setEmergencyDelivery(true)}
                      className="text-primary focus:ring-primary"
                    />
                    <label htmlFor="emergency" className="font-medium text-sm">Emergency Delivery</label>
                  </div>
                  <span className="text-sm font-medium text-red-600">+$75.00</span>
                </div>
                <p className="text-xs text-gray-600 ml-6">Same-day or next-day delivery available</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              
              {emergencyDelivery && (
                <div className="flex justify-between">
                  <span>Emergency Delivery</span>
                  <span className="text-red-600">${getEmergencyDeliveryFee().toFixed(2)}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full mt-6"
                size="lg"
              >
                Place Order
              </Button>
              
              <p className="text-sm text-gray-600 text-center">
                Order will be processed through our ERP system
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
