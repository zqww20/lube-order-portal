import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Calendar, MapPin, Zap } from 'lucide-react';

interface DeliveryInfo {
  nextDelivery: {
    date: string;
    time: string;
    address: string;
    items: string;
  };
  deliveryPreferences: string;
  emergencyContact: string;
}

interface NextDeliveryProps {
  deliveryInfo: DeliveryInfo;
}

const NextDelivery = ({ deliveryInfo }: NextDeliveryProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-lg flex items-center">
          <Truck className="h-4 w-4 mr-2" />
          Next Delivery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="p-3 border rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{deliveryInfo.nextDelivery.date}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{deliveryInfo.nextDelivery.time}</p>
          <div className="flex items-start space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground line-clamp-2">{deliveryInfo.nextDelivery.address}</p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{deliveryInfo.nextDelivery.items}</p>
        </div>
        <Button variant="outline" className="w-full">
          <Zap className="h-4 w-4 mr-1" />
          Emergency Delivery
        </Button>
      </CardContent>
    </Card>
  );
};

export default NextDelivery;