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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Settings, 
  LogOut,
  User,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const [useSlider, setUseSlider] = useState(false);

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

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
  };

  // Check if navigation needs slider
  useEffect(() => {
    const checkNavOverflow = () => {
      if (!navRef.current) return;
      
      const nav = navRef.current;
      const parent = nav.parentElement;
      if (!parent) return;
      
      // Calculate available space
      const parentWidth = parent.offsetWidth;
      const logoSection = parent.querySelector('.flex.items-center.space-x-4') as HTMLElement;
      const accountSection = parent.querySelector('.flex.items-center.space-x-4:last-child') as HTMLElement;
      
      const logoWidth = logoSection?.offsetWidth || 0;
      const accountWidth = accountSection?.offsetWidth || 0;
      const availableWidth = parentWidth - logoWidth - accountWidth - 96; // 96px for padding
      
      // Calculate natural navigation width
      const tempNav = nav.cloneNode(true) as HTMLElement;
      tempNav.style.position = 'absolute';
      tempNav.style.visibility = 'hidden';
      tempNav.style.width = 'auto';
      document.body.appendChild(tempNav);
      
      const naturalWidth = tempNav.scrollWidth;
      document.body.removeChild(tempNav);
      
      setUseSlider(naturalWidth > availableWidth);
    };

    checkNavOverflow();
    window.addEventListener('resize', checkNavOverflow);
    return () => window.removeEventListener('resize', checkNavOverflow);
  }, []);

  const renderNavItems = () => {
    return navItems.map((item) => (
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
    ));
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

            {/* Navigation */}
            {useSlider ? (
              <div className="hidden md:block flex-1 max-w-md mx-4">
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2">
                    {navItems.map((item) => (
                      <CarouselItem key={item.path} className="pl-2 basis-auto">
                        <button
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
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="text-white border-white/30 hover:bg-white/10" />
                  <CarouselNext className="text-white border-white/30 hover:bg-white/10" />
                </Carousel>
              </div>
            ) : (
              <nav ref={navRef} className="hidden md:flex items-center space-x-8">
                {renderNavItems()}
              </nav>
            )}

            {/* User Info and Account Menu */}
            <div className="flex items-center space-x-4">
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
          <div className="md:hidden border-t border-white/20 bg-brand">
            <div className="px-2 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
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