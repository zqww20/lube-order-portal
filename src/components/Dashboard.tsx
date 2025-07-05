
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
  Plus,
  CreditCard,
  Calendar,
  MapPin,
  Zap,
  TrendingDown,
  Target
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

  // Account summary data
  const accountSummary = {
    creditLimit: 25000,
    currentBalance: 3456.78,
    availableCredit: 21543.22,
    paymentTerms: 'Net 30',
    nextPaymentDue: '2024-02-15',
    accountStatus: 'Good Standing'
  };

  // Delivery information data
  const deliveryInfo = {
    nextDelivery: {
      date: '2024-02-05',
      time: '10:00 AM - 2:00 PM',
      address: '1234 Industrial Blvd, Suite 100',
      items: 'Engine Oil 5W-30 (200L), Hydraulic Fluid (50L)'
    },
    deliveryPreferences: 'Loading dock access required',
    emergencyContact: '+1-800-BLUEWATER'
  };

  // Predictive analytics data
  const predictiveRecommendations = [
    { 
      id: 'pred-1', 
      name: 'Premium Engine Oil 5W-30', 
      price: 45.99, 
      unit: 'liter', 
      inStock: true,
      confidence: 'High',
      reason: 'Ordered monthly for 6 months',
      nextOrderDate: '2024-02-10'
    },
    { 
      id: 'pred-2', 
      name: 'Industrial Hydraulic Fluid', 
      price: 89.99, 
      unit: '5L container', 
      inStock: true,
      confidence: 'Medium',
      reason: 'Usage trend indicates reorder',
      nextOrderDate: '2024-02-20'
    }
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
    <div className="space-y-3">
      {/* Compact Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
        <div className="flex-1">
          <h1 className="text-xl font-heading font-bold">Welcome back, John!</h1>
          <p className="text-xs text-muted-foreground">Manage your lubricant orders and track shipments</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input 
              placeholder="Search..."
              className="pl-7 h-8 w-32 text-xs"
            />
          </div>
          <Button asChild size="sm" className="h-8">
            <Link to="/products">
              <ShoppingCart className="h-3 w-3 mr-1" />
              Browse
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="h-8">
            <Link to="/products">
              <FileText className="h-3 w-3 mr-1" />
              Quote
            </Link>
          </Button>
        </div>
      </div>

      {/* Account Summary Widget - More Compact */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-base flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Account Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Credit Limit</p>
              <p className="font-semibold text-sm">${accountSummary.creditLimit.toLocaleString()}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Available</p>
              <p className="font-semibold text-sm text-success">${accountSummary.availableCredit.toLocaleString()}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="font-semibold text-sm">${accountSummary.currentBalance.toLocaleString()}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Due Date</p>
              <p className="font-semibold text-xs">{accountSummary.nextPaymentDue}</p>
              <Badge className="bg-success/10 text-success border-success/20 text-xs">
                {accountSummary.accountStatus}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Orders Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/orders">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">My Orders</h3>
                  <p className="text-xs text-muted-foreground">Track shipments</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">3</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Active orders</p>
            </CardContent>
          </Link>
        </Card>

        {/* Quotes Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/quotes">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">My Quotes</h3>
                  <p className="text-xs text-muted-foreground">View pricing</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-2xl font-bold text-accent">2</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ready to review</p>
            </CardContent>
          </Link>
        </Card>

        {/* Emergency Delivery Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Emergency</h3>
                <p className="text-xs text-muted-foreground">Rush delivery</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-medium text-warning">24/7</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Available</p>
          </CardContent>
        </Card>

        {/* Quick Order Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/products">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Plus className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Quick Order</h3>
                  <p className="text-xs text-muted-foreground">Browse products</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium text-success">Fast</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Start shopping</p>
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
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
        </div>

        {/* Next Delivery */}
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
      </div>

      {/* Smart Re-Order Section with Predictive Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Predictive Recommendations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base flex items-center">
              <Target className="h-3 w-3 mr-2" />
              You'll Need Soon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {predictiveRecommendations.map((item) => (
              <div key={item.id} className="p-2 border rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium line-clamp-1">{item.name}</span>
                  <Badge className={`text-xs ${item.confidence === 'High' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                    {item.confidence}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.reason}</p>
                <p className="text-xs text-muted-foreground mb-2">Est. order: {item.nextOrderDate}</p>
                <Button size="sm" className="w-full h-7 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Quick Order
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Re-Order Section */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-base">Quick Re-Order</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {frequentProducts.map((product) => (
                  <div key={product.id} className="p-2 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-xs mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      ${product.price} / {product.unit}
                    </p>
                    <div className="flex items-center space-x-1 mb-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${product.inStock ? 'bg-success' : 'bg-destructive'}`} />
                      <span className="text-xs text-muted-foreground">
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full h-7 text-xs" 
                      disabled={!product.inStock}
                      variant={product.inStock ? "default" : "secondary"}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* Cross-Sell Opportunities */}
              <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                <h4 className="font-medium text-xs text-primary mb-2">Frequently Bought Together</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Engine Oil + Filter Kit
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Hydraulic Fluid + Grease
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Marine Oil + Additives
                  </Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full h-6 text-xs mt-2">
                  View Bundle Deals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
