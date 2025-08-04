import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Package, ShoppingCart, MapPin, Plus, ArrowRight } from 'lucide-react';

const GuestActionCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Products Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-brand/20">
        <Link to="/guest/products">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-brand">Browse Products</h3>
                <p className="text-xs text-muted-foreground">Limited selection</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-medium text-brand">Available</span>
              <ArrowRight className="h-4 w-4 text-brand/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Cash sales only</p>
          </CardContent>
        </Link>
      </Card>

      {/* Cart Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-brand/10">
        <Link to="/guest/cart">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-success">Shopping Cart</h3>
                <p className="text-xs text-muted-foreground">Review items</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-2xl font-bold text-success">0</span>
              <ArrowRight className="h-4 w-4 text-success/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Items in cart</p>
          </CardContent>
        </Link>
      </Card>

      {/* Store Location Card */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <Link to="/guest/location">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Store Location</h3>
                <p className="text-xs text-muted-foreground">Visit for pickup</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-medium text-purple-600">Open</span>
              <ArrowRight className="h-4 w-4 text-purple-600/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Directions & hours</p>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default GuestActionCards;