
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Users
} from 'lucide-react';

const Index = () => {
  const stats = [
    { label: 'Active Orders', value: '24', icon: Package, color: 'text-blue-600' },
    { label: 'Products Available', value: '156', icon: ShoppingCart, color: 'text-green-600' },
    { label: 'This Month Orders', value: '89', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Avg Processing Time', value: '2.3h', icon: Clock, color: 'text-orange-600' },
  ];

  const features = [
    {
      icon: ShoppingCart,
      title: 'Easy Ordering',
      description: 'Browse our complete catalog of industrial lubricants and place orders with just a few clicks.'
    },
    {
      icon: Zap,
      title: 'ERP Integration',
      description: 'Seamlessly integrated with your ERP system for real-time inventory and order processing.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All products meet industry standards with full traceability and quality documentation.'
    },
    {
      icon: Globe,
      title: 'Global Supply Chain',
      description: 'Reliable delivery network ensuring your lubricants arrive when and where you need them.'
    }
  ];

  const recentOrders = [
    { id: 'ORD-2024-025', date: '2024-01-25', status: 'Processing', total: 234.50 },
    { id: 'ORD-2024-024', date: '2024-01-24', status: 'Shipped', total: 567.89 },
    { id: 'ORD-2024-023', date: '2024-01-23', status: 'Delivered', total: 123.45 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Lubricant Portal
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Your one-stop solution for industrial lubricants with seamless ERP integration. 
              Order, track, and manage your lubricant needs efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/products">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Browse Products
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/orders">
                  <Package className="h-5 w-5 mr-2" />
                  View Orders
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Orders</span>
                <Button asChild variant="outline" size="sm">
                  <Link to="/orders">View All</Link>
                </Button>
              </CardTitle>
              <CardDescription>
                Your latest lubricant orders and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                        className="mb-1"
                      >
                        {order.status}
                      </Badge>
                      <p className="text-sm font-medium">${order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link to="/products">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  New Order
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/cart">
                  <Package className="h-4 w-4 mr-2" />
                  View Cart
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/orders">
                  <Clock className="h-4 w-4 mr-2" />
                  Track Order
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/erp-integration">
                  <Zap className="h-4 w-4 mr-2" />
                  ERP Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Portal?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of lubricant procurement with our advanced features designed for modern businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ERP Integration Status */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>ERP Integration Status</span>
            </CardTitle>
            <CardDescription>
              Your portal is successfully connected to your ERP system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Connected</div>
                <div className="text-sm text-gray-600">System Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2 min ago</div>
                <div className="text-sm text-gray-600">Last Sync</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Products Synced</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
