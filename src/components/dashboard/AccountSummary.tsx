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
      <CardHeader className="pb-3 bg-gradient-subtle">
        <CardTitle className="font-heading text-lg flex items-center text-brand">
          <CreditCard className="h-5 w-5 mr-3 text-brand" />
          Account Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Credit Limit</p>
            <p className="font-semibold text-sm text-brand">${accountSummary.creditLimit.toLocaleString()}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Available</p>
            <p className="font-semibold text-sm text-success">${accountSummary.availableCredit.toLocaleString()}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="font-semibold text-sm text-brand">${accountSummary.currentBalance.toLocaleString()}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Due Date</p>
            <p className="font-semibold text-xs">{accountSummary.nextPaymentDue}</p>
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