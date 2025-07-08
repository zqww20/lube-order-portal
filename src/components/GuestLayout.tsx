import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  MapPin,
  LogOut,
  Menu,
  X,
  User,
  AlertCircle
} from 'lucide-react';

const GuestLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = 0; // Guest cart items
  
  const navigation = [
    { name: 'Dashboard', href: '/guest/dashboard', icon: Home },
    { name: 'Products', href: '/guest/products', icon: Package },
    { name: 'Cart', href: '/guest/cart', icon: ShoppingCart },
    { name: 'Store Location', href: '/guest/location', icon: MapPin },
  ];

  const isActive = (path: string) => {
    if (path === '/guest/dashboard') {
      return location.pathname === '/guest/dashboard' || location.pathname === '/guest';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Guest Header - Matching customer header design */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-brand shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Guest Indicator */}
            <div className="flex items-center space-x-4">
              <Link to="/guest/dashboard" className="flex items-center">
                <img 
                  src="/lovable-uploads/fe3190ea-9ce7-4559-8b4e-f3aebf733b9d.png" 
                  alt="Bluewater Group Logo" 
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                GUEST PORTAL
              </Badge>
            </div>

            {/* Navigation - Matching customer navigation style */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
                    isActive(item.href)
                      ? 'text-white font-semibold border-b-2 border-accent'
                      : 'text-white/90 hover:text-white hover:text-accent'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Actions - Matching customer header style */}
            <div className="flex items-center space-x-4">
              {/* Guest Info */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-white/80" />
                <span className="text-white/80">Guest User</span>
              </div>

              {/* Guest Options Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/30">
                    <User className="h-4 w-4 mr-2" />
                    Guest
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b">
                    <p className="font-medium">Guest User</p>
                    <p className="text-sm text-muted-foreground">Cash Pickup Only</p>
                  </div>
                  <DropdownMenuItem>
                    <MapPin className="h-4 w-4 mr-2" />
                    Store Location
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Pickup Policy
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/" className="flex items-center w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Exit Guest Portal
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart - Matching customer cart button */}
              <Button asChild variant="ghost" size="sm" className="relative text-white hover:text-accent hover:bg-white/10">
                <Link to="/guest/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-accent text-white">
                      {cartItems}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Matching customer mobile nav */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 bg-brand">
              <div className="px-2 py-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/90 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
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