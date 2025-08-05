import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Truck, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useButtonVariant } from '@/hooks/useButtonVariant';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: string;
  trackingNumber: string | null;
}

interface RecentActivityProps {
  recentOrders: Order[];
}

const RecentActivity = ({ recentOrders }: RecentActivityProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-warning/10 text-warning border-warning/20';
      case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return <Clock className="h-3 w-3" />;
      case 'shipped': return <Truck className="h-3 w-3" />;
      case 'delivered': return <CheckCircle className="h-3 w-3" />;
      default: return <AlertCircle className="h-3 w-3" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-mobile-h3">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {recentOrders.slice(0, 3).map((order) => (
          <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-muted/30 transition-colors space-y-2 sm:space-y-0">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-semibold text-primary text-mobile-caption">{order.id}</span>
                <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1 text-xs`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </Badge>
              </div>
              <p className="text-mobile-caption text-muted-foreground mb-2 line-clamp-2">{order.items}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
                <span>{order.date}</span>
                {order.trackingNumber && (
                  <span className="sm:ml-0">#{order.trackingNumber}</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between sm:flex-col sm:text-right sm:justify-start">
              <p className="font-semibold text-mobile-caption">${order.total.toFixed(2)}</p>
              {order.status === 'Shipped' && (
                <Button {...useButtonVariant('link', { size: 'sm', className: 'text-xs' })}>
                  Track
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button asChild {...useButtonVariant('secondary', { className: 'w-full' })}>
          <Link to="/orders">
            View All Orders <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;