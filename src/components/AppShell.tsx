import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
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
  LayoutDashboard,
  Package,
  FileText,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
  MapPin,
  AlertCircle,
  Quote,
  Database,
  Users
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

interface BreadcrumbItem {
  name: string;
  href?: string;
}

const SIDEBAR_STORAGE_KEY = 'appshell-sidebar-collapsed';

const AppShell = () => {
  const { state: userState, logout } = useUser();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Mock cart items - would come from cart context
  const cartItems = 6;

  // Get navigation based on user role
  const getNavigation = (): NavigationItem[] => {
    if (!userState.user) {
      // Guest navigation
      return [
        { name: 'Dashboard', href: '/guest/dashboard', icon: Home },
        { name: 'Products', href: '/guest/products', icon: Package },
        { name: 'Quotes', href: '/guest/quotes', icon: Quote },
        { name: 'Store Location', href: '/guest/location', icon: MapPin },
      ];
    }

    switch (userState.user.role) {
      case 'employee':
      case 'admin':
        return [
          { name: 'Dashboard', href: '/employee/dashboard', icon: LayoutDashboard },
          { name: 'All Quotes', href: '/employee/quotes', icon: FileText },
          { name: 'All Orders', href: '/employee/orders', icon: Package },
          { name: 'Logistics Admin', href: '/employee/admin/logistics', icon: Settings },
          { name: 'ERP Integration', href: '/employee/erp-integration', icon: Database },
        ];
      case 'customer':
        return [
          { name: 'Dashboard', href: '/', icon: LayoutDashboard },
          { name: 'Products', href: '/products', icon: Package },
          { name: 'Quotes', href: '/quotes', icon: FileText },
          { name: 'Orders', href: '/orders', icon: Package },
        ];
      default:
        return [];
    }
  };

  const navigation = getNavigation();

  // Generate breadcrumbs based on current path
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Handle root/index page
    if (pathSegments.length === 0) {
      if (userState.user?.role === 'customer') {
        breadcrumbs.push({ name: 'Customer Portal' });
      }
      return breadcrumbs;
    }

    // Add home based on role
    if (userState.user?.role === 'employee' || userState.user?.role === 'admin') {
      breadcrumbs.push({ name: 'Employee Portal', href: '/employee/dashboard' });
    } else if (!userState.user || pathSegments[0] === 'guest') {
      breadcrumbs.push({ name: 'Guest Portal', href: '/guest/dashboard' });
    } else {
      breadcrumbs.push({ name: 'Customer Portal', href: '/' });
    }

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip root segments that are already covered
      if (segment === 'employee' || segment === 'guest') return;
      
      // Find matching navigation item or create breadcrumb
      const navItem = navigation.find(item => item.href === currentPath);
      const isLast = index === pathSegments.length - 1;
      
      if (navItem) {
        breadcrumbs.push({
          name: navItem.name,
          href: isLast ? undefined : navItem.href
        });
      } else {
        // Format segment as readable name
        let name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        
        // Handle special cases
        if (segment === 'admin') name = 'Admin';
        if (segment === 'logistics') name = 'Logistics';
        if (segment === 'erp-integration') name = 'ERP Integration';
        if (segment.match(/^\d+$/)) name = `ID: ${segment}`; // Handle IDs
        
        breadcrumbs.push({
          name,
          href: isLast ? undefined : currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const getPortalBadge = () => {
    if (!userState.user) return { text: 'GUEST PORTAL', variant: 'secondary' as const };
    switch (userState.user.role) {
      case 'employee':
      case 'admin':
        return { text: 'EMPLOYEE PORTAL', variant: 'secondary' as const };
      case 'customer':
        return { text: 'CUSTOMER PORTAL', variant: 'secondary' as const };
      default:
        return { text: 'PORTAL', variant: 'secondary' as const };
    }
  };

  const getUserInfo = () => {
    if (!userState.user) return { name: 'Guest User', email: 'guest@local', company: 'Cash Pickup Only' };
    return {
      name: userState.user.username,
      email: userState.user.email,
      company: userState.user.role === 'employee' ? 'Bluewater Group' : 'Customer Account'
    };
  };

  const isActive = (href: string) => {
    if (href === '/' && userState.user?.role === 'customer') {
      return location.pathname === '/';
    }
    if (href.includes('/dashboard')) {
      return location.pathname === href || location.pathname.endsWith('/dashboard');
    }
    return location.pathname.startsWith(href);
  };

  const portalBadge = getPortalBadge();
  const userInfo = getUserInfo();

  // Redirect logic for authenticated users in wrong portal
  if (userState.user?.role === 'employee' && !location.pathname.startsWith('/employee')) {
    return <Navigate to="/employee/dashboard" replace />;
  }
  if (userState.user?.role === 'customer' && (location.pathname.startsWith('/employee') || location.pathname.startsWith('/guest'))) {
    return <Navigate to="/" replace />;
  }
  if (!userState.user && !location.pathname.startsWith('/guest') && location.pathname !== '/login') {
    return <Navigate to="/guest/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Unified Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-brand shadow-brand backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Portal Badge */}
            <div className="flex items-center space-x-4">
              <Link 
                to={userState.user?.role === 'employee' ? '/employee/dashboard' : 
                    userState.user?.role === 'customer' ? '/' : '/guest/dashboard'} 
                className="flex items-center"
              >
                <img 
                  src="/lovable-uploads/55e4f4d0-f564-42e5-99d3-e7bad233d344.png" 
                  alt="Bluewater Group Logo" 
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <Badge variant={portalBadge.variant} className="bg-secondary text-secondary-foreground">
                {portalBadge.text}
              </Badge>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2",
                    isActive(item.href)
                      ? "text-white font-semibold border-b-2 border-accent"
                      : "text-white/90 hover:text-white hover:text-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-white/80" />
                <span className="text-white/80">{userInfo.email}</span>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/30">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b">
                    <p className="font-medium">{userInfo.name}</p>
                    <p className="text-sm text-muted-foreground">{userInfo.company}</p>
                  </div>
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  {userState.user?.role === 'customer' && (
                    <>
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
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </DropdownMenuItem>
                    </>
                  )}
                  {!userState.user && (
                    <>
                      <DropdownMenuItem>
                        <MapPin className="h-4 w-4 mr-2" />
                        Store Location
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Pickup Policy
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive" 
                    onClick={() => {
                      if (userState.user) {
                        logout();
                      } else {
                        window.location.href = '/';
                      }
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {userState.user ? 'Sign Out' : 'Exit Guest Portal'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart - Show for customer and guest */}
              {(!userState.user || userState.user.role === 'customer') && (
                <Button 
                  asChild 
                  variant="ghost" 
                  size="sm" 
                  className="relative text-white hover:text-accent hover:bg-white/10 touch-target"
                >
                  <Link to={userState.user ? '/cart' : '/guest/cart'}>
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-accent text-white min-w-[20px] h-5 flex items-center justify-center">
                        {cartItems}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )}

              {/* Mobile Menu */}
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button 
                      className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      {open ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel className="absolute top-16 left-0 right-0 md:hidden border-t border-white/20 bg-brand">
                      <div className="px-2 py-3 space-y-1">
                        {navigation.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                              "block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2",
                              isActive(item.href)
                                ? "bg-white/10 text-white font-semibold"
                                : "text-white/90 hover:text-white hover:bg-white/5"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 1 && (
        <nav className="fixed top-16 left-0 right-0 z-40 bg-muted/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-2">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
                  {item.href ? (
                    <Link 
                      to={item.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={cn("pt-16", breadcrumbs.length > 1 && "pt-28")}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Bluewater Group</h3>
              <p className="text-muted-foreground text-sm">
                Your trusted partner for industrial supplies and solutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to={userState.user?.role === 'employee' ? '/employee/dashboard' : userState.user ? '/' : '/guest/dashboard'} className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
                <li><Link to={userState.user?.role === 'employee' ? '/employee/quotes' : userState.user ? '/products' : '/guest/products'} className="text-muted-foreground hover:text-foreground">Products</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-muted-foreground">Phone: (555) 123-4567</span></li>
                <li><span className="text-muted-foreground">Email: support@bluewatergroup.ca</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Portal Access</h4>
              <p className="text-muted-foreground text-sm">
                {userState.user 
                  ? `Logged in as ${userState.user.role}` 
                  : 'Currently in guest mode'
                }
              </p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-4 text-center text-sm text-muted-foreground">
            © 2024 Bluewater Group. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;