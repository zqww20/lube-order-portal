import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, AlertTriangle, Star, CheckCircle } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Featured Products */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2 flex items-center justify-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Popular Products
          </h2>
          <p className="text-muted-foreground">Top picks from our marine equipment catalog</p>
        </div>
        
        <Card className="border-0 shadow-elegant bg-gradient-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-background border border-border/50 rounded-xl p-5 space-y-4 hover-lift transition-smooth hover:shadow-card-hover"
                >
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-base text-foreground">{product.name}</h3>
                    <p className="text-lg font-bold text-primary">
                      ${product.price} <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={product.inStock ? "secondary" : "destructive"}
                      className={`text-xs ${product.inStock ? 'bg-success/10 text-success border-success/20' : ''}`}
                    >
                      {product.inStock ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          In Stock
                        </>
                      ) : "Out of Stock"}
                    </Badge>
                    <Button 
                      size="sm" 
                      disabled={!product.inStock}
                      className="shadow-sm"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="border-0 shadow-elegant bg-gradient-card">
        <CardHeader className="text-center pb-4">
          <CardTitle className="font-heading text-xl flex items-center justify-center text-foreground">
            <CheckCircle className="h-5 w-5 mr-2 text-success" />
            How Guest Orders Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">What's Included:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Browse full product catalog</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Up to 5 unique items per order</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Same-day pickup available</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Multiple pickup locations</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Payment & Pickup:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Cash or e-transfer payment only</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Pickup required within 24 hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Delivery not available for guest orders</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Valid ID required at pickup</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestQuickOrder;