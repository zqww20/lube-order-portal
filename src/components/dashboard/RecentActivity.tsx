import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Truck, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

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
        <CardTitle className="font-heading text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {recentOrders.slice(0, 3).map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-primary text-sm">{order.id}</span>
                <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1 text-xs`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1 line-clamp-1">{order.items}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{order.date}</span>
                {order.trackingNumber && (
                  <span>#{order.trackingNumber}</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">${order.total.toFixed(2)}</p>
              {order.status === 'Shipped' && (
                <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                  Track
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button asChild variant="outline" className="w-full">
          <Link to="/orders">
            View All Orders <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;