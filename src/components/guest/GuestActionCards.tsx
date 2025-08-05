import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, MapPin } from 'lucide-react';
import { UnifiedActionCard } from '@/components/common/UnifiedActionCard';

const GuestActionCards = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Browse Products',
      description: 'Explore our catalog of industrial lubricants - cash sales only',
      icon: Package,
      onClick: () => navigate('/guest/products'),
      variant: 'primary' as const,
      buttonText: 'Browse Catalog'
    },
    {
      title: 'Shopping Cart',
      description: 'Review items and proceed to checkout',
      icon: ShoppingCart,
      onClick: () => navigate('/guest/cart'),
      variant: 'success' as const,
      badge: '0',
      buttonText: 'View Cart'
    },
    {
      title: 'Store Location',
      description: 'Find our nearest pickup location and hours',
      icon: MapPin,
      onClick: () => navigate('/guest/location'),
      variant: 'default' as const,
      buttonText: 'Get Directions'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {actions.map((action, index) => (
        <UnifiedActionCard key={index} {...action} />
      ))}
    </div>
  );
};

export default GuestActionCards;