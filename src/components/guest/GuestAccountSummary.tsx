import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, MapPin, Clock } from 'lucide-react';

const GuestAccountSummary = () => {
  return (
    <Card>
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
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
              Cash/E-transfer Sales
            </Badge>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">Payment Options</p>
              <p className="text-xs text-blue-700">Cash or E-transfer accepted at pickup</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestAccountSummary;