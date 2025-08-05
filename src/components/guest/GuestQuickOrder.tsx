import React from 'react';
import { UnifiedQuickOrder } from '@/components/ui/unified-quick-order';
import { AlertCircle } from 'lucide-react';

const GuestQuickOrder = () => {
  const featuredProducts = [
    { id: '1', name: 'Premium Engine Oil 5W-30', price: 45.99, unit: 'liter', inStock: true },
    { id: '2', name: 'Industrial Hydraulic Fluid', price: 89.99, unit: '5L container', inStock: true },
    { id: '3', name: 'Marine Gear Oil', price: 67.50, unit: 'liter', inStock: false },
    { id: '4', name: 'Multi-Purpose Grease', price: 25.99, unit: '500g tube', inStock: true }
  ];

  const notices = [{
    icon: AlertCircle,
    title: 'Guest Purchase Policy',
    items: [
      'Maximum 5 unique items per transaction',
      'Cash or E-transfer payment at pickup',
      'All orders must be picked up within 48 hours',
      'No delivery options available'
    ],
    variant: 'warning' as const
  }];

  const handleAddToCart = (productId: string) => {
    console.log('Adding product to cart:', productId);
  };

  return (
    <UnifiedQuickOrder
      variant="guest"
      title="Featured Products"
      subtitle="Quick add to cart - Limited to 5 unique items"
      products={featuredProducts}
      notices={notices}
      onAddToCart={handleAddToCart}
    />
  );
};

export default GuestQuickOrder;