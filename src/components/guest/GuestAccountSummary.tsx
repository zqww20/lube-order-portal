import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, MapPin, Clock } from 'lucide-react';
const GuestAccountSummary = () => {
  return (
    <Card className="border-0 shadow-elegant bg-gradient-card">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="font-heading text-lg flex items-center text-foreground">
          <CreditCard className="h-5 w-5 mr-3 text-primary" />
          Quick Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Payment Method</p>
            <p className="text-xs text-muted-foreground">Cash or E-transfer at pickup</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-foreground">Fulfillment</p>
            <p className="text-xs text-muted-foreground">Pickup from our locations</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
              <Clock className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-foreground">Order Limit</p>
            <p className="text-xs text-muted-foreground">Up to 5 unique items</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default GuestAccountSummary;