import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';

interface CrossSellProduct {
  itemCode: string;
  title: string;
  thumbUrl: string;
  price: number;
}

interface CustomersAlsoViewedProps {
  crossSell: CrossSellProduct[];
}

const CustomersAlsoViewed = ({ crossSell }: CustomersAlsoViewedProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (itemCode: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemCode]: Math.max(1, value)
    }));
  };

  const getQuantity = (itemCode: string) => quantities[itemCode] || 1;

  return (
    <div className="w-80 space-y-4">
      <h3 className="text-lg font-heading font-semibold text-foreground">
        Customers Also Viewed
      </h3>
      
      <div className="space-y-3">
        {crossSell.slice(0, 4).map((product) => (
          <Card key={product.itemCode} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-3">
              <div className="flex gap-3">
                {/* Product Thumbnail */}
                <div className="w-16 h-16 bg-muted rounded flex-shrink-0">
                  <img 
                    src={product.thumbUrl} 
                    alt={product.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                    {product.title}
                  </h4>
                  
                  <div className="text-sm font-semibold text-foreground">
                    ${product.price.toFixed(2)}
                  </div>
                  
                  {/* Inline Qty and Add to Cart */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(product.itemCode, getQuantity(product.itemCode) - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={getQuantity(product.itemCode)}
                        onChange={(e) => handleQuantityChange(product.itemCode, parseInt(e.target.value) || 1)}
                        className="w-8 h-6 text-xs text-center border-0 focus-visible:ring-0 p-0"
                        min="1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(product.itemCode, getQuantity(product.itemCode) + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs px-2 h-6"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomersAlsoViewed;