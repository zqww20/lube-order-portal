import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Plus, AlertCircle } from 'lucide-react';

const GuestQuickOrder = () => {
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
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-base">Featured Products</CardTitle>
          <p className="text-sm text-muted-foreground">Quick add to cart - Limited to 5 unique items</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featuredProducts.map((product) => (
              <div key={product.id} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  ${product.price} / {product.unit}
                </p>
                <div className="flex items-center space-x-1 mb-2">
                  <div className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-destructive'}`} />
                  <span className="text-xs text-muted-foreground">
                    {product.inStock ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full h-8 text-xs" 
                  disabled={!product.inStock}
                  variant={product.inStock ? "default" : "secondary"}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guest Limitations Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800 mb-1">Guest Purchase Policy</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Maximum 5 unique items per transaction</li>
                <li>• Cash or E-transfer payment at pickup</li>
                <li>• All orders must be picked up within 48 hours</li>
                <li>• No delivery options available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestQuickOrder;