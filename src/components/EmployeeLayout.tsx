import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Settings, 
  LogOut,
  User
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
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Employee Indicator */}
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/73e1d39d-4ed6-4eb1-9866-b1671d7f685a.png" 
                alt="Bluewater Group Logo" 
                className="h-8 w-auto object-contain"
              />
              <Badge variant="secondary" className="bg-brand-red text-brand-red-foreground">
                EMPLOYEE PORTAL
              </Badge>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? "default" : "ghost"}
                  onClick={() => navigate(item.path)}
                  className="flex items-center space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">employee@bluewatergroup.ca</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-border py-2">
            <div className="flex space-x-1 overflow-x-auto">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className="flex items-center space-x-1 whitespace-nowrap"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;