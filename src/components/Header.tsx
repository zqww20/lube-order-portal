
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  ShoppingCart, 
  User, 
  Package, 
  Settings, 
  LogOut, 
  FileText,
  Users,
  LayoutDashboard
} from 'lucide-react';
import { UnifiedNavigation, MobileMenuButton, NavigationItem } from '@/components/common/UnifiedNavigation';
import { useButtonVariant } from '@/hooks/useButtonVariant';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const cartItems = 6; // This would come from your cart state

  const navigation = [
    { title: 'Dashboard', href: '/', icon: LayoutDashboard },
    { title: 'Products', href: '/products', icon: Package },
    { title: 'Quotes', href: '/quotes', icon: FileText },
    { title: 'Orders', href: '/orders', icon: Package },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-brand shadow-brand backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Customer Indicator */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/55e4f4d0-f564-42e5-99d3-e7bad233d344.png" 
                alt="Bluewater Group Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              CUSTOMER PORTAL
            </Badge>
          </div>

          <div className="hidden md:block">
            <UnifiedNavigation 
              items={navigation as NavigationItem[]} 
              variant="horizontal"
              className="text-white [&_a]:text-white/90 [&_a:hover]:text-white [&_a.bg-primary]:bg-white/10 [&_a.bg-primary]:text-white [&_a.bg-primary]:border-b-2 [&_a.bg-primary]:border-accent"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* User Info and Logout - matching employee layout */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-white/80" />
              <span className="text-white/80">john.smith@acmecorp.com</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button {...useButtonVariant('nav')}>
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 border-b">
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-muted-foreground">Acme Corp</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center w-full">
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="flex items-center w-full">
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/quotes" className="flex items-center w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    My Quotes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center w-full text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart - moved to rightmost position */}
            <Button asChild {...useButtonVariant('nav', { className: 'relative text-white hover:text-accent hover:bg-white/10' })}>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-accent text-white min-w-[20px] h-5 flex items-center justify-center">
                    {cartItems}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile menu button */}
            <MobileMenuButton 
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-brand">
            <div className="px-2 py-3">
              <UnifiedNavigation 
                items={navigation as NavigationItem[]} 
                variant="mobile"
                className="[&_a]:text-white/90 [&_a:hover]:text-white [&_a:hover]:bg-white/5 [&_a.bg-primary]:bg-white/10 [&_a.bg-primary]:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
