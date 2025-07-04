import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Settings,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

const EmployeeDashboard = () => {
  const stats = [
    {
      title: "Active Customers",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Pending Orders",
      value: "89",
      change: "+23%",
      icon: Package,
      color: "text-orange-600"
    },
    {
      title: "Revenue (MTD)",
      value: "$284,950",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Quote Requests",
      value: "34",
      change: "+5%",
      icon: FileText,
      color: "text-purple-600"
    }
  ];

  const recentActivities = [
    {
      type: "order",
      message: "New order #ORD-2024-0156 from Acme Corp",
      time: "2 minutes ago",
      status: "pending"
    },
    {
      type: "quote",
      message: "Quote request from TechStart Inc",
      time: "15 minutes ago",
      status: "new"
    },
    {
      type: "customer",
      message: "New customer registration: Global Industries",
      time: "1 hour ago",
      status: "completed"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest customer interactions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant={activity.status === 'pending' ? 'secondary' : 'default'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common employee tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Manage Customers
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Process Orders
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Review Quotes
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertTriangle className="h-4 w-4 mr-2" />
              System Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Employee Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>Manage customer accounts and relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Access Customer Portal</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Control</CardTitle>
            <CardDescription>Monitor stock levels and product availability</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">View Inventory</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ERP Integration</CardTitle>
            <CardDescription>Sync data with enterprise systems</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">ERP Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;