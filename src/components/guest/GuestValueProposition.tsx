import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Shield, CreditCard, MapPin, Package, Users } from 'lucide-react';

const GuestValueProposition = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Quick & Easy",
      description: "Browse and order in minutes, pickup same day"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Professional-grade marine equipment and supplies"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay with cash or e-transfer at pickup"
    },
    {
      icon: MapPin,
      title: "Convenient Pickup",
      description: "Multiple locations across the region"
    },
    {
      icon: Package,
      title: "No Minimums",
      description: "Order exactly what you need, when you need it"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Knowledgeable staff ready to assist"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit, index) => (
        <Card key={index} className="border-0 shadow-elegant bg-gradient-card hover-lift transition-smooth">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <benefit.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
              {benefit.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {benefit.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GuestValueProposition;