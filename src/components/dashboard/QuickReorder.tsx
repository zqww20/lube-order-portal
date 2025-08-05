import React from 'react';
import { UnifiedQuickOrder } from '@/components/ui/unified-quick-order';

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
  const handleAddToCart = (productId: string) => {
    console.log('Adding product to cart:', productId);
  };

  return (
    <UnifiedQuickOrder
      variant="customer"
      title="Quick Re-Order"
      products={frequentProducts}
      predictiveItems={predictiveRecommendations}
      onAddToCart={handleAddToCart}
    />
  );
};

export default QuickReorder;