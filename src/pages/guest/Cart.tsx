import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ShoppingCart, MapPin } from 'lucide-react';

const GuestCart = () => {
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
          <Button>Browse Products</Button>
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
};

export default GuestCart;