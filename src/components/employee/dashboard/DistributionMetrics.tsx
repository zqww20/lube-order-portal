import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  Warehouse, 
  BarChart3, 
  AlertTriangle,
  Package,
  Droplets,
  ShipWheel,
  Target
} from 'lucide-react';

interface DistributionMetricProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  status?: 'critical' | 'warning' | 'good';
  description?: string;
}

const DistributionMetricCard = ({ title, value, change, trend, icon: Icon, status, description }: DistributionMetricProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-status-success';
      case 'down': return 'text-status-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'border-l-4 border-l-status-error bg-status-error/5';
      case 'warning': return 'border-l-4 border-l-status-warning bg-status-warning/5';
      case 'good': return 'border-l-4 border-l-status-success bg-status-success/5';
      default: return '';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3" />;
      case 'down': return <TrendingDown className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Card className={`hover-lift ${getStatusColor()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center space-x-1 text-xs ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{change}</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

const DistributionMetrics = () => {
  const metrics = [
    {
      title: 'Inventory Turnover',
      value: '8.2x',
      change: '+0.4 from last month',
      trend: 'up' as const,
      icon: BarChart3,
      status: 'good' as const,
      description: 'Industrial fluids leading'
    },
    {
      title: 'Bulk Orders Pipeline',
      value: '$347K',
      change: '+23% from last week',
      trend: 'up' as const,
      icon: Droplets,
      description: '12 orders >400L pending'
    },
    {
      title: 'Marine Equipment Stock',
      value: '94%',
      change: 'Seasonal peak ready',
      trend: 'neutral' as const,
      icon: ShipWheel,
      status: 'good' as const,
      description: 'Spring season prep'
    },
    {
      title: 'Critical Stock Alerts',
      value: '3',
      change: '5W-30 & Hydraulic Fluid',
      trend: 'down' as const,
      icon: AlertTriangle,
      status: 'warning' as const,
      description: 'Reorder points triggered'
    },
    {
      title: 'Warehouse Utilization',
      value: '78%',
      change: 'Dartmouth: 82%, Moncton: 74%',
      trend: 'neutral' as const,
      icon: Warehouse,
      description: 'Optimal capacity range'
    },
    {
      title: 'Distribution Efficiency',
      value: '96.2%',
      change: '+1.8% from last month',
      trend: 'up' as const,
      icon: Target,
      status: 'good' as const,
      description: 'On-time delivery rate'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <DistributionMetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default DistributionMetrics;