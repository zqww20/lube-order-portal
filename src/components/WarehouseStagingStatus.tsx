import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, CheckCircle, Warehouse } from 'lucide-react';

interface StagingStatus {
  isStaged: boolean;
  stagingDate?: string;
  warehouse: string;
  warehouseLocation: string;
  estimatedStagingTime?: string;
  pickupInstructions?: string;
}

interface WarehouseStagingStatusProps {
  orderId: string;
  orderType: 'pickup' | 'delivery';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'backordered';
  stagingInfo?: StagingStatus;
}

const mockStagingData: Record<string, StagingStatus> = {
  '1': {
    isStaged: true,
    stagingDate: '2024-01-18T08:30:00Z',
    warehouse: 'Main Distribution Center',
    warehouseLocation: '1234 Industrial Blvd, Houston, TX 77001',
    pickupInstructions: 'Proceed to pickup dock 3. Present order confirmation and valid ID.'
  },
  '2': {
    isStaged: true,
    stagingDate: '2024-01-21T14:00:00Z',
    warehouse: 'North Dallas Facility',
    warehouseLocation: '456 Commerce St, Dallas, TX 75201',
    pickupInstructions: 'Enter through gate B, check in at the office first.'
  },
  '3': {
    isStaged: false,
    warehouse: 'San Antonio Distribution',
    warehouseLocation: '789 Workshop Road, San Antonio, TX 78201',
    estimatedStagingTime: '2024-01-23T10:00:00Z',
    pickupInstructions: 'Order will be staged in express pickup area.'
  },
  '4': {
    isStaged: false,
    warehouse: 'Austin Service Center',
    warehouseLocation: '321 Service Center, Austin, TX 73301',
    estimatedStagingTime: '2024-01-26T09:00:00Z'
  }
};

const WarehouseStagingStatus: React.FC<WarehouseStagingStatusProps> = ({
  orderId,
  orderType,
  status,
  stagingInfo
}) => {
  // Skip rendering for delivery orders or non-applicable statuses
  if (orderType !== 'pickup' || !['processing', 'shipped'].includes(status)) {
    return null;
  }

  // Get staging data - use provided or mock data
  const staging = stagingInfo || mockStagingData[orderId];
  
  if (!staging) {
    return null;
  }

  const getStatusInfo = () => {
    if (staging.isStaged) {
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        badge: <Badge className="bg-green-100 text-green-800">Ready for Pickup</Badge>,
        title: 'Order Staged & Ready',
        description: `Staged on ${new Date(staging.stagingDate!).toLocaleDateString()} at ${new Date(staging.stagingDate!).toLocaleTimeString()}`
      };
    } else {
      return {
        icon: <Clock className="h-5 w-5 text-amber-600" />,
        badge: <Badge className="bg-amber-100 text-amber-800">Being Staged</Badge>,
        title: 'Order Being Prepared',
        description: staging.estimatedStagingTime 
          ? `Expected to be staged by ${new Date(staging.estimatedStagingTime).toLocaleDateString()} at ${new Date(staging.estimatedStagingTime).toLocaleTimeString()}`
          : 'Order is being picked and staged for pickup'
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className={`border-2 ${staging.isStaged ? 'border-green-200 bg-green-50/30' : 'border-amber-200 bg-amber-50/30'}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {statusInfo.icon}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">{statusInfo.title}</h4>
              {statusInfo.badge}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {statusInfo.description}
            </p>

            {/* Warehouse Information */}
            <div className="bg-white/60 rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Warehouse className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">{staging.warehouse}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p>{staging.warehouseLocation}</p>
                </div>
              </div>
              
              {staging.pickupInstructions && staging.isStaged && (
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm font-medium text-blue-800 mb-1">Pickup Instructions:</p>
                  <p className="text-sm text-blue-700">{staging.pickupInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarehouseStagingStatus;