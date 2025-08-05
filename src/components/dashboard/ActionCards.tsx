import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Package, FileText, Zap, Plus, ArrowRight } from 'lucide-react';

const ActionCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
      {/* Orders Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-brand/20 touch-target">
        <Link to="/orders" className="block h-full">
          <CardContent className="p-4 md:p-5 h-full">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <Package className="h-4 w-4 md:h-5 md:w-5 text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-mobile-caption text-brand">My Orders</h3>
                <p className="text-xs text-muted-foreground">Track shipments</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xl md:text-2xl font-bold text-brand">3</span>
              <ArrowRight className="h-4 w-4 text-brand/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active orders</p>
          </CardContent>
        </Link>
      </Card>

      {/* Quotes Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-brand/10 touch-target">
        <Link to="/quotes" className="block h-full">
          <CardContent className="p-4 md:p-5 h-full">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-brand/5 flex items-center justify-center">
                <FileText className="h-4 w-4 md:h-5 md:w-5 text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-mobile-caption text-brand">My Quotes</h3>
                <p className="text-xs text-muted-foreground">View pricing</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xl md:text-2xl font-bold text-brand">2</span>
              <ArrowRight className="h-4 w-4 text-brand/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ready to review</p>
          </CardContent>
        </Link>
      </Card>

      {/* Emergency Delivery Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer touch-target">
        <Link to="/products?emergency=true" className="block h-full">
          <CardContent className="p-4 md:p-5 h-full">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-mobile-caption">Emergency</h3>
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
      <Card className="hover:shadow-lg transition-shadow cursor-pointer touch-target">
        <Link to="/products" className="block h-full">
          <CardContent className="p-4 md:p-5 h-full">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Plus className="h-4 w-4 md:h-5 md:w-5 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-mobile-caption">Quick Order</h3>
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