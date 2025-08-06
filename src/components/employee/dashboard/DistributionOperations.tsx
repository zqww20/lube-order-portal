import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Truck, 
  Package, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  Ship,
  Droplets,
  FileText,
  Wrench
} from 'lucide-react';

interface OperationItem {
  id: string;
  type: 'inbound' | 'outbound' | 'bulk_order' | 'inventory_alert' | 'hazmat' | 'marine_seasonal';
  title: string;
  description: string;
  timestamp: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status?: string;
  value?: string;
  location?: string;
}

const DistributionOperations = () => {
  const operations: OperationItem[] = [
    {
      id: '1',
      type: 'bulk_order',
      title: 'Bulk Quote Processing',
      description: 'Atlantic Shipping - 800L Marine Engine Oil 15W-40',
      timestamp: '12 minutes ago',
      priority: 'urgent',
      value: '$18,400',
      status: 'pricing_review'
    },
    {
      id: '2',
      type: 'inventory_alert',
      title: 'Critical Stock Alert',
      description: 'Mobil 1 5W-30 - Only 24 units remaining (Dartmouth)',
      timestamp: '25 minutes ago',
      priority: 'high',
      location: 'Dartmouth',
      status: 'reorder_pending'
    },
    {
      id: '3',
      type: 'inbound',
      title: 'Inbound Shipment',
      description: 'Shell Rimula - 48 drums arriving tomorrow',
      timestamp: '1 hour ago',
      priority: 'medium',
      value: '48 drums',
      status: 'in_transit'
    },
    {
      id: '4',
      type: 'marine_seasonal',
      title: 'Marine Season Prep',
      description: 'Boat lift systems - Spring inventory check required',
      timestamp: '2 hours ago',
      priority: 'medium',
      status: 'scheduled'
    },
    {
      id: '5',
      type: 'hazmat',
      title: 'Hazmat Shipment Ready',
      description: 'Industrial degreaser - Certified packaging complete',
      timestamp: '3 hours ago',
      priority: 'high',
      location: 'Moncton',
      status: 'ready_to_ship'
    },
    {
      id: '6',
      type: 'outbound',
      title: 'Distribution Route Optimized',
      description: 'Halifax-Truro route - 8 deliveries consolidated',
      timestamp: '4 hours ago',
      priority: 'low',
      status: 'completed'
    }
  ];

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'bulk_order': return <Droplets className="h-4 w-4" />;
      case 'inventory_alert': return <AlertTriangle className="h-4 w-4" />;
      case 'inbound': return <Truck className="h-4 w-4" />;
      case 'outbound': return <Package className="h-4 w-4" />;
      case 'marine_seasonal': return <Ship className="h-4 w-4" />;
      case 'hazmat': return <Wrench className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-status-error bg-status-error/10';
      case 'high': return 'border-l-status-warning bg-status-warning/10';
      case 'medium': return 'border-l-bw-primary bg-bw-primary/10';
      case 'low': return 'border-l-muted bg-muted/10';
      default: return 'border-l-muted';
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const statusConfig: Record<string, { variant: any; label: string }> = {
      'pricing_review': { variant: 'secondary', label: 'Pricing Review' },
      'reorder_pending': { variant: 'destructive', label: 'Reorder Pending' },
      'in_transit': { variant: 'default', label: 'In Transit' },
      'scheduled': { variant: 'outline', label: 'Scheduled' },
      'ready_to_ship': { variant: 'secondary', label: 'Ready to Ship' },
      'completed': { variant: 'default', label: 'Completed' }
    };

    const config = statusConfig[status] || { variant: 'outline', label: status };

    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, { variant: any; label: string }> = {
      'urgent': { variant: 'destructive', label: 'URGENT' },
      'high': { variant: 'secondary', label: 'HIGH' },
      'medium': { variant: 'outline', label: 'MED' },
      'low': { variant: 'outline', label: 'LOW' }
    };

    const config = priorityConfig[priority];
    return (
      <Badge variant={config.variant} className="text-xs font-bold">
        {config.label}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Distribution Operations</CardTitle>
          <Button variant="outline" size="sm">
            View All Operations
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {operations.map((operation) => (
              <div
                key={operation.id}
                className={`border-l-2 pl-4 pb-3 ${getPriorityColor(operation.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-0.5">
                      {getOperationIcon(operation.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1 flex-wrap">
                        <p className="text-sm font-medium text-foreground">
                          {operation.title}
                        </p>
                        {getPriorityBadge(operation.priority)}
                        {getStatusBadge(operation.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {operation.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {operation.timestamp}
                        </div>
                        <div className="flex items-center space-x-2">
                          {operation.location && (
                            <Badge variant="outline" className="text-xs">
                              {operation.location}
                            </Badge>
                          )}
                          {operation.value && (
                            <Badge variant="outline" className="text-xs">
                              {operation.value}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DistributionOperations;