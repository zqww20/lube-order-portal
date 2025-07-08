import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  MapPin,
  LogOut
} from 'lucide-react';

const GuestLayout = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/guest/dashboard', icon: Home },
    { name: 'Products', href: '/guest/products', icon: Package },
    { name: 'Cart', href: '/guest/cart', icon: ShoppingCart },
    { name: 'Store Location', href: '/guest/location', icon: MapPin },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Guest Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-brand shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/guest/dashboard" className="flex items-center space-x-3">
              <div className="h-12 w-auto flex items-center">
                <img 
                  src="/lovable-uploads/5a3219f9-f6bb-4b5b-936f-6484a5d764f6.png" 
                  alt="Bluewater Group Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <Badge variant="secondary" className="ml-2">Guest Portal</Badge>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Exit Guest Portal */}
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Exit Guest Portal</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default GuestLayout;