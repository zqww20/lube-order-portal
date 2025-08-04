import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, MapPin, ArrowRight } from 'lucide-react';

const GuestActionCards = () => {
  const actionItems = [
    {
      to: "/guest/products",
      icon: ShoppingBag,
      title: "Browse Products",
      description: "Explore our extensive catalog of marine equipment and supplies",
      color: "bg-blue-500"
    },
    {
      to: "/guest/cart",
      icon: ShoppingCart,
      title: "View Cart",
      description: "Review your selections and proceed to checkout",
      color: "bg-emerald-500"
    },
    {
      to: "/guest/location",
      icon: MapPin,
      title: "Pickup Locations",
      description: "Find convenient pickup locations near you",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Get Started</h2>
        <p className="text-muted-foreground">Choose how you'd like to begin your order</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actionItems.map((item, index) => (
          <Link key={index} to={item.to} className="group">
            <Card className="h-full border-0 shadow-elegant bg-gradient-card hover-lift transition-smooth hover:shadow-card-hover">
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-14 h-14 ${item.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`h-7 w-7 ${item.color.replace('bg-', 'text-')}`} />
                </div>
                <CardTitle className="text-lg font-heading group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium mr-1">Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GuestActionCards;