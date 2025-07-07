import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
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
  FileText, 
  Package, 
  Settings, 
  LogOut,
  User,
  Database,
  Menu,
  ChevronDown,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdownNav, setShowDropdownNav] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Mock authentication check - replace with real auth
  const isEmployeeAuthenticated = true; // Would check for @bluewatergroup.ca email
  
  if (!isEmployeeAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    {
      label: 'Dashboard',
      path: '/employee/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'All Quotes',
      path: '/employee/quotes',
      icon: FileText
    },
    {
      label: 'All Orders',
      path: '/employee/orders',
      icon: Package
    },
    {
      label: 'Logistics Admin',
      path: '/employee/admin/logistics',
      icon: Settings
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Check for navigation overflow with proper cleanup
  useEffect(() => {
    const checkNavOverflow = () => {
      if (!navRef.current || !actionsRef.current) return;
      
      // Force layout recalculation
      const container = navRef.current.parentElement;
      if (!container) return;
      
      // Get real-time measurements
      const containerRect = container.getBoundingClientRect();
      const actionsRect = actionsRef.current.getBoundingClientRect();
      
      // Calculate actual available space
      const logoWidth = 320; // Account for employee logo + badge + margins
      const actionsWidth = actionsRect.width + 16; // Add margin
      const availableSpace = containerRect.width - logoWidth - actionsWidth;
      
      // Measure navigation width by temporarily showing it
      const wasHidden = showDropdownNav;
      if (wasHidden) setShowDropdownNav(false);
      
      // Small delay to ensure DOM update
      setTimeout(() => {
        if (navRef.current) {
          const navWidth = navRef.current.scrollWidth + 32; // Add margin buffer
          const needsDropdown = navWidth > availableSpace;
          
          if (needsDropdown !== showDropdownNav) {
            setShowDropdownNav(needsDropdown);
          }
        }
      }, 10);
    };

    // Initial check
    setTimeout(checkNavOverflow, 100);
    
    // Add resize listener with debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkNavOverflow, 50);
    };
    
    window.addEventListener('resize', debouncedCheck);
    
    return () => {
      window.removeEventListener('resize', debouncedCheck);
      clearTimeout(timeoutId);
    };
  }, [showDropdownNav]);

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Employee Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-brand shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Employee Indicator */}
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/73e1d39d-4ed6-4eb1-9866-b1671d7f685a.png" 
                alt="Bluewater Group Logo" 
                className="h-10 w-auto object-contain"
              />
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                EMPLOYEE PORTAL
              </Badge>
            </div>

            {/* Navigation - Conditional Rendering */}
            {!showDropdownNav ? (
              <nav ref={navRef} className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                      isActivePath(item.path)
                        ? 'text-white font-semibold border-b-2 border-accent'
                        : 'text-white/90 hover:text-white hover:text-accent'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
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
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* User Info and Account Menu */}
            <div ref={actionsRef} className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-white/80" />
                <span className="text-white/80">employee@bluewatergroup.ca</span>
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
                    <p className="font-medium">Employee</p>
                    <p className="text-sm text-muted-foreground">Bluewater Group</p>
                  </div>
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => setShowDropdownNav(!showDropdownNav)}
            >
              {showDropdownNav ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            
            {showDropdownNav && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/20 z-40" 
                  onClick={() => setShowDropdownNav(false)}
                />
                {/* Menu */}
                <div className="absolute top-full left-0 right-0 z-50 border-t border-white/20 bg-brand shadow-lg">
                  <div className="px-2 py-3 space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setShowDropdownNav(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                          isActivePath(item.path)
                            ? 'bg-white/10 text-white font-semibold'
                            : 'text-white/90 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;