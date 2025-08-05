import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
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
  AlertCircle,
  Quote,
  LayoutDashboard, 
  FileText, 
  Settings,
  Users,
  Database
} from 'lucide-react';
import { UnifiedNavigation, MobileMenuButton, NavigationItem } from '@/components/common/UnifiedNavigation';

type UserRole = 'guest' | 'customer' | 'employee';

interface AppShellProps {
  children?: React.ReactNode;
  userRole?: UserRole;
  enableNewShell?: boolean;
}

// Feature flag for gradual rollout
const isNewShellEnabled = () => {
  // Check environment variable or prop override
  return process.env.NEXT_PUBLIC_NEW_SHELL === 'true';
};

const AppShell = ({ children, userRole = 'customer' }: AppShellProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Persist mobile menu state
  useEffect(() => {
    const savedState = localStorage.getItem('appshell-mobile-menu');
    if (savedState) {
      setIsMobileMenuOpen(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appshell-mobile-menu', JSON.stringify(isMobileMenuOpen));
  }, [isMobileMenuOpen]);

  // Role-specific configurations
  const getPortalConfig = () => {
    switch (userRole) {
      case 'guest':
        return {
          navigation: [
            { title: 'Dashboard', href: '/guest/dashboard', icon: Home },
            { title: 'Products', href: '/guest/products', icon: Package },
            { title: 'Quotes', href: '/guest/quotes', icon: Quote },
            { title: 'Store Location', href: '/guest/location', icon: MapPin },
          ],
          badgeText: 'GUEST PORTAL',
          userDisplayName: 'Guest User',
          userInfo: 'Cash Pickup Only',
          cartPath: '/guest/cart',
          cartItems: 0,
          showCart: true,
          isEmployee: false
        };
      case 'employee':
        return {
          navigation: [
            { title: 'Dashboard', href: '/employee/dashboard', icon: LayoutDashboard },
            { title: 'All Quotes', href: '/employee/quotes', icon: FileText },
            { title: 'All Orders', href: '/employee/orders', icon: Package },
            { title: 'Logistics Admin', href: '/employee/admin/logistics', icon: Settings }
          ],
          badgeText: 'EMPLOYEE PORTAL',
          userDisplayName: 'Employee',
          userInfo: 'Bluewater Group',
          cartPath: '',
          cartItems: 0,
          showCart: false,
          isEmployee: true
        };
      default: // customer
        return {
          navigation: [
            { title: 'Dashboard', href: '/', icon: LayoutDashboard },
            { title: 'Products', href: '/products', icon: Package },
            { title: 'Quotes', href: '/quotes', icon: FileText },
            { title: 'Orders', href: '/orders', icon: Package },
          ],
          badgeText: 'CUSTOMER PORTAL',
          userDisplayName: 'John Smith',
          userInfo: 'Acme Corp',
          cartPath: '/cart',
          cartItems: 6,
          showCart: true,
          isEmployee: false
        };
    }
  };

  const config = getPortalConfig();

  // Navigation active state logic (copied from originals)
  const isActive = (path: string) => {
    if (userRole === 'guest') {
      if (path === '/guest/dashboard') {
        return location.pathname === '/guest/dashboard' || location.pathname === '/guest';
      }
      return location.pathname.startsWith(path);
    } else if (userRole === 'employee') {
      return location.pathname === path || location.pathname.startsWith(path + '/');
    } else {
      // customer
      if (path === '/') {
        return location.pathname === '/';
      }
      return location.pathname.startsWith(path);
    }
  };

  const handleLogout = () => {
    if (userRole === 'employee') {
      navigate('/login');
    } else {
      navigate('/');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  // Background class based on role (copied from originals)
  const getBackgroundClass = () => {
    if (userRole === 'guest') return 'min-h-screen bg-gradient-subtle';
    return 'min-h-screen bg-background';
  };

  // Main content wrapper classes (copied from originals)
  const getMainContentClass = () => {
    if (userRole === 'guest') {
      return 'pt-16';
    }
    return 'pt-16';
  };

  const getMainInnerClass = () => {
    if (userRole === 'guest') {
      return 'container mx-auto px-4 py-8';
    }
    return '';
  };

  return (
    <div className={getBackgroundClass()}>
      {/* Header - Exact styling copied from each portal */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-brand shadow-brand backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Portal Indicator */}
            <div className="flex items-center space-x-4">
              <Link 
                to={userRole === 'guest' ? '/guest/dashboard' : userRole === 'employee' ? '/employee/dashboard' : '/'} 
                className="flex items-center"
              >
                <img 
                  src="/lovable-uploads/55e4f4d0-f564-42e5-99d3-e7bad233d344.png" 
                  alt="Bluewater Group Logo" 
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                {config.badgeText}
              </Badge>
            </div>

            {/* Navigation - Different styles for employee vs guest/customer */}
            {userRole === 'employee' ? (
              <nav className="hidden md:flex items-center space-x-8">
                {config.navigation.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className={`px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'text-white font-semibold border-b-2 border-accent'
                        : 'text-white/90 hover:text-white hover:text-accent'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </nav>
            ) : userRole === 'guest' ? (
              <nav className="hidden md:flex items-center space-x-8">
                {config.navigation.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'text-white font-semibold border-b-2 border-accent'
                        : 'text-white/90 hover:text-white hover:text-accent'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            ) : (
              <div className="hidden md:block">
                <UnifiedNavigation 
                  items={config.navigation as NavigationItem[]} 
                  variant="horizontal"
                  className="text-white [&_a]:text-white/90 [&_a:hover]:text-white [&_a.bg-primary]:bg-white/10 [&_a.bg-primary]:text-white [&_a.bg-primary]:border-b-2 [&_a.bg-primary]:border-accent"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-white/80" />
                <span className="text-white/80">
                  {userRole === 'employee' ? 'employee@bluewatergroup.ca' : 
                   userRole === 'guest' ? 'Guest User' : 'john.smith@acmecorp.com'}
                </span>
              </div>

              {/* Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/30">
                    <User className="h-4 w-4 mr-2" />
                    {userRole === 'guest' ? 'Guest' : 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b">
                    <p className="font-medium">{config.userDisplayName}</p>
                    <p className="text-sm text-muted-foreground">{config.userInfo}</p>
                  </div>
                  
                  {userRole === 'guest' ? (
                    <>
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
                    </>
                  ) : userRole === 'employee' ? (
                    <>
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/employee/erp-integration')}>
                        <Database className="h-4 w-4 mr-2" />
                        ERP Integration
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart Button (if applicable) */}
              {config.showCart && (
                <Button asChild variant="ghost" size="sm" className={`relative text-white hover:text-accent hover:bg-white/10 ${userRole === 'customer' ? 'touch-target' : ''}`}>
                  <Link to={config.cartPath}>
                    <ShoppingCart className="h-5 w-5" />
                    {config.cartItems > 0 && (
                      <Badge className={`absolute -top-2 -right-2 px-2 py-1 text-xs bg-accent text-white ${userRole === 'customer' ? 'min-w-[20px] h-5 flex items-center justify-center' : ''}`}>
                        {config.cartItems}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )}

              {/* Mobile menu button */}
              {userRole === 'customer' ? (
                <MobileMenuButton 
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:bg-white/10"
                />
              ) : (
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
              )}
            </div>
          </div>

          {/* Mobile Navigation - Using Headless UI Disclosure for collapse */}
          <Disclosure>
            {({ open }) => (
              <>
                {isMobileMenuOpen && (
                  <Disclosure.Panel static className="md:hidden border-t border-white/20 bg-brand">
                    <div className="px-2 py-3 space-y-1">
                      {userRole === 'employee' ? (
                        config.navigation.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => {
                              navigate(item.href);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                              isActive(item.href)
                                ? 'bg-white/10 text-white font-semibold'
                                : 'text-white/90 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </button>
                        ))
                      ) : userRole === 'guest' ? (
                        config.navigation.map((item) => (
                          <Link
                            key={item.title}
                            to={item.href}
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                              isActive(item.href)
                                ? 'bg-white/10 text-white font-semibold'
                                : 'text-white/90 hover:text-white hover:bg-white/5'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        ))
                      ) : (
                        <UnifiedNavigation 
                          items={config.navigation as NavigationItem[]} 
                          variant="mobile"
                          className="[&_a]:text-white/90 [&_a:hover]:text-white [&_a:hover]:bg-white/5 [&_a.bg-primary]:bg-white/10 [&_a.bg-primary]:text-white"
                        />
                      )}
                    </div>
                  </Disclosure.Panel>
                )}
              </>
            )}
          </Disclosure>
        </div>
      </header>

      {/* Main Content - Exact wrapper structure from originals */}
      <main className={getMainContentClass()}>
        {userRole === 'guest' ? (
          <div className={getMainInnerClass()}>
            {children || <Outlet />}
          </div>
        ) : (
          children || <Outlet />
        )}
      </main>
    </div>
  );
};

export default AppShell;