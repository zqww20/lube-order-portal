
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Package, 
  Settings, 
  LogOut, 
  Menu,
  X,
  FileText,
  Users,
  LayoutDashboard,
  Package2,
  ChevronDown
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdownNav, setShowDropdownNav] = useState(false);
  const location = useLocation();
  const cartItems = 6; // This would come from your cart state
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: Package2 },
    { name: 'Orders', href: '/orders', icon: Package },
    { name: 'Quotes', href: '/quotes', icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Check for navigation overflow
  useEffect(() => {
    const checkNavOverflow = () => {
      if (!navRef.current || !actionsRef.current) return;
      
      const container = navRef.current.parentElement;
      if (!container) return;
      
      const containerWidth = container.offsetWidth;
      const logoWidth = 250; // Approximate logo + badge width
      const actionsWidth = actionsRef.current.offsetWidth;
      const navWidth = navRef.current.scrollWidth;
      
      const availableSpace = containerWidth - logoWidth - actionsWidth - 32; // 32px for margins
      const needsDropdown = navWidth > availableSpace;
      
      setShowDropdownNav(needsDropdown);
    };

    checkNavOverflow();
    window.addEventListener('resize', checkNavOverflow);
    
    return () => window.removeEventListener('resize', checkNavOverflow);
  }, [navigation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-brand shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Customer Indicator */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/fe3190ea-9ce7-4559-8b4e-f3aebf733b9d.png" 
                alt="Bluewater Group Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              CUSTOMER PORTAL
            </Badge>
          </div>

          {/* Navigation - Conditional Rendering */}
          {!showDropdownNav ? (
            <nav ref={navRef} className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
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
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:bg-white/10 border border-white/30">
                  <Menu className="h-4 w-4 mr-2" />
                  Navigation
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 z-50 bg-white dark:bg-gray-800">
                {navigation.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-2 ${
                        isActive(item.href) ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Actions */}
          <div ref={actionsRef} className="flex items-center space-x-4">
            {/* User Info and Logout - matching employee layout */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-white/80" />
              <span className="text-white/80">john.smith@acmecorp.com</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/30">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 border-b">
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-muted-foreground">Acme Corp</p>
                </div>
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="h-4 w-4 mr-2" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  My Quotes
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart - moved to rightmost position */}
            <Button asChild variant="ghost" size="sm" className="relative text-white hover:text-accent hover:bg-white/10">
              <Link to="/cart">
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

        {/* Mobile Navigation */}
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
  );
};

export default Header;
