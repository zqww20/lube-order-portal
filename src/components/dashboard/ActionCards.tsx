import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Package, FileText, Zap, Plus, ArrowRight } from 'lucide-react';

const ActionCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Orders Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-brand/20">
        <Link to="/orders">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-brand">My Orders</h3>
                <p className="text-xs text-muted-foreground">Track shipments</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-2xl font-bold text-brand">3</span>
              <ArrowRight className="h-4 w-4 text-brand/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active orders</p>
          </CardContent>
        </Link>
      </Card>

      {/* Quotes Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-brand/10">
        <Link to="/quotes">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-brand/5 flex items-center justify-center">
                <FileText className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-brand">My Quotes</h3>
                <p className="text-xs text-muted-foreground">View pricing</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-2xl font-bold text-brand">2</span>
              <ArrowRight className="h-4 w-4 text-brand/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ready to review</p>
          </CardContent>
        </Link>
      </Card>

      {/* Emergency Delivery Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <Link to="/products?emergency=true">
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
        </Link>
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
  );
};

export default ActionCards;