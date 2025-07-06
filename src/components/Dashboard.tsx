
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccountSummary from './dashboard/AccountSummary';
import ActionCards from './dashboard/ActionCards';
import RecentActivity from './dashboard/RecentActivity';
import NextDelivery from './dashboard/NextDelivery';
import QuickReorder from './dashboard/QuickReorder';

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


  return (
    <div className="space-y-3">
      {/* Compact Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-2">Manage your lubricant orders and track shipments</p>
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

      <AccountSummary accountSummary={accountSummary} />

      <ActionCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentActivity recentOrders={recentOrders} />
        </div>
        <NextDelivery deliveryInfo={deliveryInfo} />
      </div>

      <QuickReorder 
        frequentProducts={frequentProducts} 
        predictiveRecommendations={predictiveRecommendations} 
      />
    </div>
  );
};

export default Dashboard;
