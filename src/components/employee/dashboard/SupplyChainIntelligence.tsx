import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Package,
  Truck,
  Calendar,
  DollarSign,
  Thermometer,
  AlertCircle
} from 'lucide-react';

interface SupplierMetric {
  name: string;
  category: string;
  deliveryReliability: number;
  qualityScore: number;
  costTrend: 'up' | 'down' | 'stable';
  lastDelivery: string;
  nextDelivery: string;
  status: 'excellent' | 'good' | 'concerning' | 'critical';
}

interface InventoryForecast {
  product: string;
  currentStock: number;
  weeksSupply: number;
  demandTrend: 'up' | 'down' | 'stable';
  reorderPoint: number;
  status: 'healthy' | 'low' | 'critical';
}

const SupplyChainIntelligence = () => {
  const suppliers: SupplierMetric[] = [
    {
      name: 'Shell Lubricants',
      category: 'Engine Oils',
      deliveryReliability: 98,
      qualityScore: 96,
      costTrend: 'stable',
      lastDelivery: '2 days ago',
      nextDelivery: 'Tomorrow',
      status: 'excellent'
    },
    {
      name: 'Mobil Industrial',
      category: 'Hydraulic Fluids',
      deliveryReliability: 94,
      qualityScore: 98,
      costTrend: 'up',
      lastDelivery: '5 days ago',
      nextDelivery: 'Next week',
      status: 'good'
    },
    {
      name: 'Marine Equipment Corp',
      category: 'Navigation Systems',
      deliveryReliability: 89,
      qualityScore: 92,
      costTrend: 'down',
      lastDelivery: '1 week ago',
      nextDelivery: '3 days',
      status: 'concerning'
    },
    {
      name: 'Atlantic Safety Supply',
      category: 'Safety Equipment',
      deliveryReliability: 85,
      qualityScore: 94,
      costTrend: 'up',
      lastDelivery: '10 days ago',
      nextDelivery: 'Overdue',
      status: 'critical'
    }
  ];

  const inventoryForecasts: InventoryForecast[] = [
    {
      product: 'Mobil 1 5W-30 (208L)',
      currentStock: 24,
      weeksSupply: 1.2,
      demandTrend: 'up',
      reorderPoint: 30,
      status: 'critical'
    },
    {
      product: 'Shell Rimula 15W-40',
      currentStock: 156,
      weeksSupply: 8.5,
      demandTrend: 'stable',
      reorderPoint: 50,
      status: 'healthy'
    },
    {
      product: 'Hydraulic Fluid AW32',
      currentStock: 78,
      weeksSupply: 3.2,
      demandTrend: 'down',
      reorderPoint: 80,
      status: 'low'
    },
    {
      product: 'Marine Radar NX-500',
      currentStock: 3,
      weeksSupply: 2.1,
      demandTrend: 'up',
      reorderPoint: 5,
      status: 'critical'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-status-success';
      case 'good': return 'text-bw-primary';
      case 'concerning': return 'text-status-warning';
      case 'critical': return 'text-status-error';
      case 'healthy': return 'text-status-success';
      case 'low': return 'text-status-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'excellent': 'default',
      'good': 'secondary',
      'concerning': 'outline',
      'critical': 'destructive',
      'healthy': 'default',
      'low': 'secondary'
    };

    return (
      <Badge variant={variants[status] || 'outline'} className="text-xs">
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-status-error" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-status-success" />;
      default: return <div className="h-3 w-3 rounded-full bg-muted" />;
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Supplier Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Supplier Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suppliers.map((supplier, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{supplier.name}</h4>
                    <p className="text-xs text-muted-foreground">{supplier.category}</p>
                  </div>
                  {getStatusBadge(supplier.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span>Delivery Reliability</span>
                      <span className="font-medium">{supplier.deliveryReliability}%</span>
                    </div>
                    <Progress value={supplier.deliveryReliability} className="h-1" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span>Quality Score</span>
                      <span className="font-medium">{supplier.qualityScore}%</span>
                    </div>
                    <Progress value={supplier.qualityScore} className="h-1" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Cost trend:</span>
                    {getTrendIcon(supplier.costTrend)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Next: {supplier.nextDelivery}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Forecasting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Inventory Forecasting</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryForecasts.map((forecast, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{forecast.product}</h4>
                    <p className="text-xs text-muted-foreground">
                      Current: {forecast.currentStock} units
                    </p>
                  </div>
                  {getStatusBadge(forecast.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span>Weeks Supply</span>
                      <span className={`font-medium ${getStatusColor(forecast.status)}`}>
                        {forecast.weeksSupply}w
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((forecast.weeksSupply / 8) * 100, 100)} 
                      className="h-1" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Demand</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(forecast.demandTrend)}
                      <span className="font-medium">{forecast.demandTrend}</span>
                    </div>
                  </div>
                </div>
                
                {forecast.currentStock <= forecast.reorderPoint && (
                  <div className="flex items-center space-x-2 text-xs text-status-error bg-status-error/10 rounded p-2">
                    <AlertCircle className="h-3 w-3" />
                    <span>Below reorder point ({forecast.reorderPoint} units)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyChainIntelligence;