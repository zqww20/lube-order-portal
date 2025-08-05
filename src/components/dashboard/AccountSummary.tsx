import React from 'react';
import { UnifiedAccountSummary } from '@/components/ui/unified-account-summary';

interface AccountSummaryProps {
  accountSummary: {
    creditLimit: number;
    currentBalance: number;
    availableCredit: number;
    paymentTerms: string;
    nextPaymentDue: string;
    accountStatus: string;
  };
}

const AccountSummary = ({ accountSummary }: AccountSummaryProps) => {
  const fields = [
    { 
      label: 'Credit Limit', 
      value: `$${accountSummary.creditLimit.toLocaleString()}`, 
      className: 'text-brand' 
    },
    { 
      label: 'Available', 
      value: `$${accountSummary.availableCredit.toLocaleString()}`, 
      className: 'text-success' 
    },
    { 
      label: 'Balance', 
      value: `$${accountSummary.currentBalance.toLocaleString()}`, 
      className: 'text-brand' 
    },
    { 
      label: 'Due Date', 
      value: accountSummary.nextPaymentDue,
      badge: { 
        text: accountSummary.accountStatus, 
        variant: 'secondary' as const,
        className: 'bg-success/10 text-success border-success/20 text-xs'
      }
    }
  ];

  return (
    <UnifiedAccountSummary
      title="Account Summary"
      fields={fields}
      variant="customer"
    />
  );
};

export default AccountSummary;