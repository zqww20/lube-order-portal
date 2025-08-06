import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Package, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Clock,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'quote' | 'order' | 'customer' | 'alert' | 'system';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  status?: string;
  value?: string;
}

const ActivityFeed = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'quote',
      title: 'New Quote Request',
      description: 'Marine Electronics Ltd. - Industrial Sensors Package',
      timestamp: '5 minutes ago',
      priority: 'high',
      value: '$24,500'
    },
    {
      id: '2',
      type: 'order',
      title: 'Order Completed',
      description: 'Atlantic Shipping Co. - Safety Equipment',
      timestamp: '12 minutes ago',
      priority: 'medium',
      status: 'delivered',
      value: '$8,750'
    },
    {
      id: '3',
      type: 'customer',
      title: 'New Customer Registration',
      description: 'Pacific Marine Solutions registered',
      timestamp: '1 hour ago',
      priority: 'low'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Inventory Alert',
      description: 'Navigation Radar Model NX-500 - Low Stock (3 units)',
      timestamp: '2 hours ago',
      priority: 'high'
    },
    {
      id: '5',
      type: 'quote',
      title: 'Quote Approved',
      description: 'Northern Fleet Services - Communication Equipment',
      timestamp: '3 hours ago',
      priority: 'medium',
      status: 'approved',
      value: '$45,200'
    },
    {
      id: '6',
      type: 'system',
      title: 'System Update',
      description: 'ERP integration sync completed successfully',
      timestamp: '4 hours ago',
      priority: 'low',
      status: 'completed'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quote': return <FileText className="h-4 w-4" />;
      case 'order': return <Package className="h-4 w-4" />;
      case 'customer': return <Users className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-primary bg-primary/5';
      default: return 'border-l-muted';
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const variants: Record<string, any> = {
      'delivered': 'default',
      'approved': 'secondary',
      'completed': 'outline'
    };

    return (
      <Badge variant={variants[status] || 'outline'} className="text-xs">
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`border-l-2 pl-4 pb-3 ${getPriorityColor(activity.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-foreground">
                          {activity.title}
                        </p>
                        {getStatusBadge(activity.status)}
                        {activity.value && (
                          <Badge variant="outline" className="text-xs">
                            {activity.value}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.timestamp}
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

export default ActivityFeed;