import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, MapPin, Clock } from 'lucide-react';
const GuestAccountSummary = () => {
  return <Card>
      <CardHeader className="pb-2 bg-brand-light/50">
        <CardTitle className="font-heading text-base flex items-center text-brand">
          <CreditCard className="h-4 w-4 mr-2 text-brand" />
          Guest Purchase Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Payment Method</p>
            <p className="font-semibold text-sm text-brand">Cash or E-transfer</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Fulfillment</p>
            <p className="font-semibold text-sm text-orange-600">Pickup Only</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">SKU Limit</p>
            <p className="font-semibold text-xs">Max 5 unique items</p>
          </div>
        </div>
        
      </CardContent>
    </Card>;
};
export default GuestAccountSummary;