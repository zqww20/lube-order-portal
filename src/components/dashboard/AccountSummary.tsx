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
    <Card className="card-modern">
      <CardHeader className="pb-4 surface-gradient rounded-t-xl">
        <CardTitle className="font-heading text-lg flex items-center text-brand">
          <CreditCard className="h-5 w-5 mr-3 text-brand" />
          Account Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Credit Limit</p>
            <p className="font-semibold text-xl text-brand">${accountSummary.creditLimit.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Available</p>
            <p className="font-semibold text-xl text-success">${accountSummary.availableCredit.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Balance</p>
            <p className="font-semibold text-xl text-brand">${accountSummary.currentBalance.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Due Date</p>
            <p className="font-semibold text-sm mb-2">{accountSummary.nextPaymentDue}</p>
            <Badge className="bg-success/10 text-success border-success/20 text-sm px-3 py-1">
              {accountSummary.accountStatus}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSummary;