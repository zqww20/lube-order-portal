import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';

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
  return (
    <Card className="card-enhanced shadow-card hover-lift">
      <CardHeader className="pb-3 md:pb-4 bg-gradient-subtle">
        <CardTitle className="font-heading text-mobile-h3 flex items-center text-brand">
          <CreditCard className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-brand" />
          Account Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 md:pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="space-y-1 p-2 md:p-0">
            <p className="text-xs text-muted-foreground">Credit Limit</p>
            <p className="font-semibold text-mobile-caption text-brand">${accountSummary.creditLimit.toLocaleString()}</p>
          </div>
          <div className="space-y-1 p-2 md:p-0">
            <p className="text-xs text-muted-foreground">Available</p>
            <p className="font-semibold text-mobile-caption text-success">${accountSummary.availableCredit.toLocaleString()}</p>
          </div>
          <div className="space-y-1 p-2 md:p-0">
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="font-semibold text-mobile-caption text-brand">${accountSummary.currentBalance.toLocaleString()}</p>
          </div>
          <div className="space-y-1 p-2 md:p-0">
            <p className="text-xs text-muted-foreground">Due Date</p>
            <p className="font-semibold text-xs mb-1">{accountSummary.nextPaymentDue}</p>
            <Badge className="bg-success/10 text-success border-success/20 text-xs">
              {accountSummary.accountStatus}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSummary;