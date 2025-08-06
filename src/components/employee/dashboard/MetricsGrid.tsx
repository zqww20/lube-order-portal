import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  FileText,
  Clock,
  Target
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const MetricCard = ({ title, value, change, trend, icon: Icon, description }: MetricCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
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
    <Card className="hover-lift">
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

const MetricsGrid = () => {
  const metrics = [
    {
      title: 'Monthly Revenue',
      value: '$847,240',
      change: '+12.5% from last month',
      trend: 'up' as const,
      icon: DollarSign,
      description: 'Target: $900K'
    },
    {
      title: 'Active Customers',
      value: '2,847',
      change: '+5.2% from last month',
      trend: 'up' as const,
      icon: Users,
      description: '156 new this month'
    },
    {
      title: 'Pending Quotes',
      value: '127',
      change: '-8.1% from yesterday',
      trend: 'down' as const,
      icon: FileText,
      description: '23 urgent priority'
    },
    {
      title: 'Orders Processing',
      value: '394',
      change: '+2.3% from yesterday',
      trend: 'up' as const,
      icon: Package,
      description: '12 expedited orders'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-15min from last week',
      trend: 'up' as const,
      icon: Clock,
      description: 'Target: < 3h'
    },
    {
      title: 'Conversion Rate',
      value: '68.4%',
      change: '+3.2% from last month',
      trend: 'up' as const,
      icon: Target,
      description: 'Industry avg: 52%'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;