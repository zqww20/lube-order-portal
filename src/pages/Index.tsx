
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
  Users,
  ArrowRight,
  BarChart3,
  Truck,
  Award
} from 'lucide-react';

const Index = () => {
  const stats = [
    { label: 'Active Orders', value: '24', icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50', change: '+12%' },
    { label: 'Products Available', value: '156', icon: ShoppingCart, color: 'text-green-600', bgColor: 'bg-green-50', change: '+8%' },
    { label: 'This Month Orders', value: '89', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50', change: '+23%' },
    { label: 'Avg Processing Time', value: '2.3h', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50', change: '-15%' },
  ];

  const features = [
    {
      icon: ShoppingCart,
      title: 'Easy Ordering',
      description: 'Browse our complete catalog of industrial lubricants and place orders with just a few clicks.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Zap,
      title: 'ERP Integration',
      description: 'Seamlessly integrated with your ERP system for real-time inventory and order processing.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All products meet industry standards with full traceability and quality documentation.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Globe,
      title: 'Global Supply Chain',
      description: 'Reliable delivery network ensuring your lubricants arrive when and where you need them.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentOrders = [
    { id: 'ORD-2024-025', date: '2024-01-25', status: 'Processing', total: 234.50, product: 'Premium Engine Oil 5W-30' },
    { id: 'ORD-2024-024', date: '2024-01-24', status: 'Shipped', total: 567.89, product: 'Industrial Hydraulic Fluid' },
    { id: 'ORD-2024-023', date: '2024-01-23', status: 'Delivered', total: 123.45, product: 'Marine Gear Oil' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Professional Lubricant
              <span className="block text-blue-300">Portal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Your one-stop solution for industrial lubricants with seamless ERP integration. 
              Order, track, and manage your lubricant needs efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-blue-50 shadow-lg text-lg px-8 py-6 h-auto">
                <Link to="/products">
                  <ShoppingCart className="h-6 w-6 mr-3" />
                  Browse Products
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-800 shadow-lg text-lg px-8 py-6 h-auto">
                <Link to="/orders">
                  <Package className="h-6 w-6 mr-3" />
                  Track Orders
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl ${stat.bgColor}`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-600 font-semibold">{stat.change}</div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 shadow-lg border-0">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900">Recent Orders</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    Your latest lubricant orders and their current status
                  </CardDescription>
                </div>
                <Button asChild variant="outline" size="sm" className="hover:bg-blue-50">
                  <Link to="/orders">
                    View All <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <p className="font-semibold text-gray-900">{order.id}</p>
                        <Badge className={`${getStatusColor(order.status)} border`}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{order.product}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600">
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start h-12 text-left">
                <Link to="/products">
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  <span>New Order</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                <Link to="/cart">
                  <Package className="h-5 w-5 mr-3" />
                  <span>View Cart</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                <Link to="/orders">
                  <Truck className="h-5 w-5 mr-3" />
                  <span>Track Order</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                <Link to="/quotes">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  <span>Quote Requests</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                <Link to="/erp-integration">
                  <Zap className="h-5 w-5 mr-3" />
                  <span>ERP Settings</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Portal?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of lubricant procurement with our advanced features designed for modern businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                <CardContent className="p-8">
                  <div className={`inline-flex p-6 rounded-3xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-12 w-12 ${feature.color}`} />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ERP Integration Status */}
        <Card className="mt-16 shadow-lg border-0 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="pb-8">
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="p-2 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-gray-900">ERP Integration Status</span>
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Your portal is successfully connected to your ERP system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-2xl">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">Connected</div>
                <div className="text-sm text-gray-600">System Status</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2 min ago</div>
                <div className="text-sm text-gray-600">Last Sync</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-2xl">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
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
