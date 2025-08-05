import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Plus, Package } from 'lucide-react';
import { useButtonVariant } from '@/hooks/useButtonVariant';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  inStock: boolean;
}

interface PredictiveRecommendation {
  id: string;
  name: string;
  price: number;
  unit: string;
  inStock: boolean;
  confidence: string;
  reason: string;
  nextOrderDate: string;
}

interface QuickReorderProps {
  frequentProducts: Product[];
  predictiveRecommendations: PredictiveRecommendation[];
}

const QuickReorder = ({ frequentProducts, predictiveRecommendations }: QuickReorderProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      {/* Predictive Recommendations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-base flex items-center">
            <Target className="h-3 w-3 mr-2" />
            You'll Need Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {predictiveRecommendations.map((item) => (
            <div key={item.id} className="p-2 border rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium line-clamp-1">{item.name}</span>
                <Badge className={`text-xs ${item.confidence === 'High' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                  {item.confidence}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{item.reason}</p>
              <p className="text-xs text-muted-foreground mb-2">Est. order: {item.nextOrderDate}</p>
              <Button {...useButtonVariant('primary', { size: 'sm', className: 'w-full h-7 text-xs' })}>
                <Plus className="h-3 w-3 mr-1" />
                Quick Order
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Re-Order Section */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base">Quick Re-Order</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {frequentProducts.map((product) => (
                <div key={product.id} className="p-2 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-xs mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    ${product.price} / {product.unit}
                  </p>
                  <div className="flex items-center space-x-1 mb-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${product.inStock ? 'bg-success' : 'bg-destructive'}`} />
                    <span className="text-xs text-muted-foreground">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <Button 
                    {...useButtonVariant(product.inStock ? 'primary' : 'secondary', 
                      { size: 'sm', className: 'w-full h-7 text-xs' }
                    )}
                    disabled={!product.inStock}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Cross-Sell Opportunities */}
            <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
              <h4 className="font-medium text-xs text-primary mb-2">Frequently Bought Together</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  Engine Oil + Filter Kit
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Hydraulic Fluid + Grease
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Marine Oil + Additives
                </Badge>
              </div>
              <Button {...useButtonVariant('secondary', { size: 'sm', className: 'w-full h-6 text-xs mt-2' })}>
                View Bundle Deals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickReorder;