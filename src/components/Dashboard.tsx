
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  FileText,
  Truck,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const recentOrders = [
    { 
      id: 'ORD-2024-025', 
      date: '2024-01-25', 
      status: 'Shipped', 
      total: 1234.50, 
      items: 'Engine Oil 5W-30, Hydraulic Fluid',
      trackingNumber: 'TRK123456789'
    },
    { 
      id: 'ORD-2024-024', 
      date: '2024-01-24', 
      status: 'Processing', 
      total: 567.89, 
      items: 'Marine Gear Oil, Multi-Purpose Grease',
      trackingNumber: null
    },
    { 
      id: 'ORD-2024-023', 
      date: '2024-01-23', 
      status: 'Delivered', 
      total: 2156.78, 
      items: 'Industrial Hydraulic Fluid (5x)',
      trackingNumber: 'TRK987654321'
    },
  ];

  const frequentProducts = [
    { id: '1', name: 'Premium Engine Oil 5W-30', price: 45.99, unit: 'liter', inStock: true },
    { id: '2', name: 'Industrial Hydraulic Fluid', price: 89.99, unit: '5L container', inStock: true },
    { id: '3', name: 'Marine Gear Oil', price: 67.50, unit: 'liter', inStock: false },
    { id: '4', name: 'Multi-Purpose Grease', price: 25.99, unit: '500g tube', inStock: true },
    { id: '5', name: 'Transmission Fluid ATF', price: 55.99, unit: 'liter', inStock: true },
  ];

  const pendingQuotes = [
    { id: 'QTE-2024-012', date: '2024-01-24', items: 'Bulk Engine Oil Order', total: 15420.00 },
    { id: 'QTE-2024-011', date: '2024-01-22', items: 'Marine Lubricant Package', total: 8750.00 },
  ];

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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Welcome back, John!
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Ready to manage your lubricant orders? Search our catalog or track your shipments.
          </p>
          
          {/* Hero Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-foreground/70" />
            <Input 
              placeholder="Search for products by name, code, or application..."
              className="pl-12 pr-4 h-14 text-lg bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/70 focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading">Recent Orders</CardTitle>
                  <CardDescription>Track your latest lubricant orders</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/orders">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-primary">{order.id}</span>
                      <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{order.items}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{order.date}</span>
                      {order.trackingNumber && (
                        <span>Tracking: {order.trackingNumber}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                    {order.status === 'Shipped' && (
                      <Button variant="link" size="sm" className="p-0 h-auto text-accent">
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Required */}
        <div className="space-y-6">
          {pendingQuotes.length > 0 && (
            <Card className="border-warning/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-warning">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-heading">Action Required</span>
                </CardTitle>
                <CardDescription>Quotes awaiting your approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingQuotes.map((quote) => (
                  <div key={quote.id} className="p-3 bg-warning/5 rounded-lg border border-warning/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">{quote.id}</span>
                      <span className="font-semibold text-warning">${quote.total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{quote.items}</p>
                    <Button size="sm" className="w-full">
                      Review Quote
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="font-heading">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start h-12">
                <Link to="/products">
                  <ShoppingCart className="h-4 w-4 mr-3" />
                  <span>Browse Products</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-12">
                <Link to="/quotes/new">
                  <FileText className="h-4 w-4 mr-3" />
                  <span>Request Quote</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-12">
                <Link to="/erp-integration">
                  <TrendingUp className="h-4 w-4 mr-3" />
                  <span>ERP Dashboard</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Re-Order Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="font-heading">Quick Re-Order</CardTitle>
          <CardDescription>Your most frequently purchased lubricants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {frequentProducts.map((product) => (
              <div key={product.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  ${product.price} / {product.unit}
                </p>
                <div className="flex items-center space-x-1 mb-3">
                  <div className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-destructive'}`} />
                  <span className="text-xs text-muted-foreground">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full" 
                  disabled={!product.inStock}
                  variant={product.inStock ? "default" : "secondary"}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
