import React from 'react';
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
  Tags
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      label: 'Promotions',
      path: '/employee/promotions',
      icon: Tags
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

  return (
    <div className="min-h-screen bg-background">
      {/* Employee Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-brand shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Employee Indicator */}
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/55e4f4d0-f564-42e5-99d3-e7bad233d344.png" 
                alt="Bluewater Group Logo" 
                className="h-10 w-auto object-contain"
              />
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                EMPLOYEE PORTAL
              </Badge>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
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