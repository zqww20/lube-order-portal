import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Package, FileText, Zap, Plus, ArrowRight } from 'lucide-react';

const ActionCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Orders Card */}
      <Card className="card-modern hover:shadow-glow transition-all duration-300 cursor-pointer group border-brand/20">
        <Link to="/orders">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                <Package className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-brand">My Orders</h3>
                <p className="text-sm text-muted-foreground">Track shipments</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-3xl font-bold text-brand">3</span>
              <ArrowRight className="h-5 w-5 text-brand/60 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Active orders</p>
          </CardContent>
        </Link>
      </Card>

      {/* Quotes Card */}
      <Card className="card-modern hover:shadow-glow transition-all duration-300 cursor-pointer group border-brand/10">
        <Link to="/quotes">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-brand/5 flex items-center justify-center group-hover:bg-brand/15 transition-colors">
                <FileText className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-brand">My Quotes</h3>
                <p className="text-sm text-muted-foreground">View pricing</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-3xl font-bold text-brand">2</span>
              <ArrowRight className="h-5 w-5 text-brand/60 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Ready to review</p>
          </CardContent>
        </Link>
      </Card>

      {/* Emergency Delivery Card */}
      <Card className="card-modern hover:shadow-glow transition-all duration-300 cursor-pointer group animate-pulse-glow">
        <Link to="/products?emergency=true">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
                <Zap className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-base">Emergency</h3>
                <p className="text-sm text-muted-foreground">Rush delivery</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-bold text-warning">24/7</span>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Available</p>
          </CardContent>
        </Link>
      </Card>

      {/* Quick Order Card */}
      <Card className="card-modern hover:shadow-glow transition-all duration-300 cursor-pointer group">
        <Link to="/products">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                <Plus className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-base">Quick Order</h3>
                <p className="text-sm text-muted-foreground">Browse products</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-bold text-success">Fast</span>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Start shopping</p>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default ActionCards;