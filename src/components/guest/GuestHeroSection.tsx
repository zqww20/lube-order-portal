import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Clock, Shield } from 'lucide-react';

const GuestHeroSection = () => {
  return (
    <div className="relative bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Shield className="h-3 w-3 mr-1" />
            Trusted Maritime Partner
          </Badge>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
            Professional Marine
            <span className="block text-gradient bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
              Products & Equipment
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Quality marine equipment and supplies available for immediate cash pickup. 
            No account needed – browse, order, and collect.
          </p>
          
          {/* Quick Benefits */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-100 mt-8">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Same-day pickup available
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Multiple pickup locations
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              No minimum order
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 shadow-lg">
              <Link to="/guest/products">
                Browse Products
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/guest/location">
                Find Pickup Location
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-400/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default GuestHeroSection;