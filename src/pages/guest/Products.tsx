import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const GuestProducts = () => {
  const products = [
    {
      id: '1',
      name: 'Premium Engine Oil 5W-30',
      price: 45.99,
      unit: 'liter',
      inStock: true,
      category: 'Engine Oil'
    },
    {
      id: '2',
      name: 'Industrial Hydraulic Fluid',
      price: 89.99,
      unit: '5L container',
      inStock: true,
      category: 'Hydraulic Fluids'
    },
    {
      id: '3',
      name: 'Marine Gear Oil',
      price: 67.50,
      unit: 'liter',
      inStock: false,
      category: 'Marine Oil'
    },
    {
      id: '4',
      name: 'Multi-Purpose Grease',
      price: 25.99,
      unit: '500g tube',
      inStock: true,
      category: 'Grease'
    },
    {
      id: '5',
      name: 'Transmission Fluid ATF',
      price: 55.99,
      unit: 'liter',
      inStock: true,
      category: 'Transmission Fluid'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Guest Product Catalog</h1>
          <p className="text-muted-foreground">Cash pickup only - Limited selection available</p>
        </div>
      </div>

      {/* Guest Restrictions Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800 mb-1">Guest Purchase Limitations</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Maximum 5 unique items per transaction</li>
                <li>• Cash payment only at pickup</li>
                <li>• No bulk discounts available</li>
                <li>• Limited product selection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </div>
                <Badge variant={product.inStock ? "default" : "secondary"}>
                  {product.inStock ? "Available" : "Out of Stock"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <span className="text-sm text-muted-foreground">per {product.unit}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Max: 5 items</span>
                  <Button 
                    size="sm" 
                    disabled={!product.inStock}
                    className="flex-1 ml-2"
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GuestProducts;