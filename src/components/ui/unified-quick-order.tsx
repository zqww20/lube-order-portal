import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Plus, Target, AlertCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  inStock: boolean;
}

interface PredictiveItem extends Product {
  confidence: string;
  reason: string;
  nextOrderDate: string;
}

interface NoticeItem {
  icon: LucideIcon;
  title: string;
  items: string[];
  variant?: 'warning' | 'info' | 'success';
}

interface UnifiedQuickOrderProps {
  products: Product[];
  predictiveItems?: PredictiveItem[];
  notices?: NoticeItem[];
  title?: string;
  subtitle?: string;
  variant?: 'guest' | 'customer';
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export const UnifiedQuickOrder = ({
  products,
  predictiveItems = [],
  notices = [],
  title = 'Quick Order',
  subtitle,
  variant = 'customer',
  onAddToCart,
  className
}: UnifiedQuickOrderProps) => {
  const gridCols = variant === 'guest' 
    ? 'grid-cols-2 md:grid-cols-4' 
    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';

  const handleAddToCart = (productId: string) => {
    onAddToCart?.(productId);
  };

  const renderNotice = (notice: NoticeItem, index: number) => {
    const variants = {
      warning: 'border-orange-200 bg-orange-50 text-orange-800',
      info: 'border-blue-200 bg-blue-50 text-blue-800',
      success: 'border-green-200 bg-green-50 text-green-800'
    };
    
    const iconColors = {
      warning: 'text-orange-600',
      info: 'text-blue-600', 
      success: 'text-green-600'
    };

    return (
      <Card key={index} className={cn('border', variants[notice.variant || 'info'])}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <notice.icon className={cn('h-5 w-5 mt-0.5', iconColors[notice.variant || 'info'])} />
            <div>
              <h4 className="font-medium mb-1">{notice.title}</h4>
              <ul className="text-sm space-y-1">
                {notice.items.map((item, itemIndex) => (
                  <li key={itemIndex}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Predictive Recommendations (Customer only) */}
      {variant === 'customer' && predictiveItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-base flex items-center">
                <Target className="h-3 w-3 mr-2" />
                You'll Need Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {predictiveItems.map((item) => (
                <div key={item.id} className="p-2 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium line-clamp-1">{item.name}</span>
                    <Badge className={cn(
                      'text-xs',
                      item.confidence === 'High' 
                        ? 'bg-success/10 text-success border-success/20' 
                        : 'bg-warning/10 text-warning border-warning/20'
                    )}>
                      {item.confidence}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.reason}</p>
                  <p className="text-xs text-muted-foreground mb-2">Est. order: {item.nextOrderDate}</p>
                  <Button 
                    size="sm" 
                    className="w-full h-7 text-xs"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Quick Order
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Main products grid for customer */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-base">{title}</CardTitle>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className={cn('grid gap-2', gridCols)}>
                  {products.map((product) => (
                    <div key={product.id} className="p-2 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-xs mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mb-1">
                        ${product.price} / {product.unit}
                      </p>
                      <div className="flex items-center space-x-1 mb-2">
                        <div className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          product.inStock ? 'bg-success' : 'bg-destructive'
                        )} />
                        <span className="text-xs text-muted-foreground">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full h-7 text-xs" 
                        disabled={!product.inStock}
                        variant={product.inStock ? "default" : "secondary"}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Guest variant - single card layout */}
      {variant === 'guest' && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base">{title}</CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            <div className={cn('grid gap-3', gridCols)}>
              {products.map((product) => (
                <div key={product.id} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    ${product.price} / {product.unit}
                  </p>
                  <div className="flex items-center space-x-1 mb-2">
                    <div className={cn(
                      'h-2 w-2 rounded-full',
                      product.inStock ? 'bg-success' : 'bg-destructive'
                    )} />
                    <span className="text-xs text-muted-foreground">
                      {product.inStock ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full h-8 text-xs" 
                    disabled={!product.inStock}
                    variant={product.inStock ? "default" : "secondary"}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notices */}
      {notices.map((notice, index) => renderNotice(notice, index))}
    </div>
  );
};