import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  MapPin, 
  Clock, 
  CreditCard,
  Package,
  AlertCircle
} from 'lucide-react';

const GuestDashboard = () => {
  const guestInfo = {
    paymentMethod: 'Cash Only',
    fulfillmentType: 'Pickup Only',
    locationNote: 'Visit our store location for pickup'
  };

  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Engine Oil 5W-30',
      price: 45.99,
      unit: 'liter',
      inStock: true
    },
    {
      id: '2',
      name: 'Industrial Hydraulic Fluid',
      price: 89.99,
      unit: '5L container',
      inStock: true
    },
    {
      id: '3',
      name: 'Marine Gear Oil',
      price: 67.50,
      unit: 'liter',
      inStock: false
    },
    {
      id: '4',
      name: 'Multi-Purpose Grease',
      price: 25.99,
      unit: '500g tube',
      inStock: true
    }
  ];

  return (
    <div className="space-y-3">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, Guest!</h1>
        <p className="text-gray-600 mt-2">Browse and order products for cash pickup</p>
      </div>

      {/* Guest Account Summary */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Guest Purchase Information
            <Badge variant="secondary">Cash Sales Only</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm text-gray-600">{guestInfo.paymentMethod}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Fulfillment</p>
                <p className="text-sm text-gray-600">{guestInfo.fulfillmentType}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Store Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri 8AM-6PM</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-800">{guestInfo.locationNote}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Browse Products</h3>
                <p className="text-gray-600 text-sm">View available items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Start Shopping</h3>
                <p className="text-gray-600 text-sm">Add items to cart</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Store Location</h3>
                <p className="text-gray-600 text-sm">Get directions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Products for Quick Add */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Products</CardTitle>
          <CardDescription>Popular items available for immediate pickup</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm leading-tight">{product.name}</h4>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2">{product.unit}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button 
                    size="sm" 
                    disabled={!product.inStock}
                    className="text-xs"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800 mb-1">Guest Purchase Policy</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Cash payment required at time of pickup</li>
                <li>• All orders must be picked up within 48 hours</li>
                <li>• No delivery options available for guest purchases</li>
                <li>• Limited quantities per transaction</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestDashboard;