import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, FileText, Zap, Plus } from 'lucide-react';
import { UnifiedActionCard } from '@/components/common/UnifiedActionCard';

const ActionCards = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'My Orders',
      description: 'Track shipments and view order status',
      icon: Package,
      onClick: () => navigate('/orders'),
      variant: 'primary' as const,
      badge: '3',
      buttonText: 'View Orders'
    },
    {
      title: 'My Quotes',
      description: 'View pricing and quote details',
      icon: FileText,
      onClick: () => navigate('/quotes'),
      variant: 'success' as const,
      badge: '2',
      buttonText: 'View Quotes'
    },
    {
      title: 'Emergency',
      description: 'Rush delivery available 24/7',
      icon: Zap,
      onClick: () => navigate('/products?emergency=true'),
      variant: 'warning' as const,
      buttonText: 'Order Now'
    },
    {
      title: 'Quick Order',
      description: 'Browse products and start shopping',
      icon: Plus,
      onClick: () => navigate('/products'),
      variant: 'default' as const,
      buttonText: 'Start Shopping'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
      {actions.map((action, index) => (
        <UnifiedActionCard key={index} {...action} />
      ))}
    </div>
  );
};

export default ActionCards;