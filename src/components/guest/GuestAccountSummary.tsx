import React from 'react';
import { UnifiedAccountSummary } from '@/components/ui/unified-account-summary';

const GuestAccountSummary = () => {
  const fields = [
    { 
      label: 'Payment Method', 
      value: 'Cash or E-transfer', 
      className: 'text-brand' 
    },
    { 
      label: 'Fulfillment', 
      value: 'Pickup Only', 
      className: 'text-orange-600' 
    },
    { 
      label: 'SKU Limit', 
      value: 'Max 5 unique items'
    }
  ];

  return (
    <UnifiedAccountSummary
      title="Guest Purchase Information"
      fields={fields}
      variant="guest"
    />
  );
};

export default GuestAccountSummary;