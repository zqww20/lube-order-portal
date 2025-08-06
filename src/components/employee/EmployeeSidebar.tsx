import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Settings, 
  Database,
  BarChart3,
  Users,
  Truck,
  Calculator,
  Tag,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const { open } = useSidebar();
  const collapsed = !open;
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground";
  };

  const operationsItems = [
    { title: 'Dashboard', url: '/employee/dashboard', icon: LayoutDashboard },
    { title: 'Quote Workbench', url: '/employee/workbench', icon: Calculator },
    { title: 'All Quotes', url: '/employee/quotes', icon: FileText },
    { title: 'All Orders', url: '/employee/orders', icon: Package },
    { title: 'Promo Console', url: '/employee/promo-console', icon: Tag },
  ];

  const analyticsItems = [
    { title: 'Performance', url: '/employee/analytics/performance', icon: BarChart3 },
    { title: 'Customer Insights', url: '/employee/analytics/customers', icon: Users },
    { title: 'Reports', url: '/employee/analytics/reports', icon: FileText },
  ];

  const adminItems = [
    { title: 'Logistics Admin', url: '/employee/admin/logistics', icon: Truck },
    { title: 'User Management', url: '/employee/admin/users', icon: Users },
    { title: 'System Settings', url: '/employee/admin/settings', icon: Settings },
    { title: 'ERP Integration', url: '/employee/erp-integration', icon: Database },
  ];

  const quickActions = [
    {
      title: 'New Quote',
      description: 'Create customer quote',
      icon: Calculator,
      action: () => navigate('/employee/workbench/new'),
    },
    {
      title: 'Bulk Operations',
      description: 'Process multiple orders',
      icon: Package,
      action: () => navigate('/employee/orders?bulk=true'),
    },
    {
      title: 'Customer Search',
      description: 'Find customer records',
      icon: Search,
      action: () => console.log('Open customer search'),
    },
    {
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: BarChart3,
      action: () => navigate('/employee/analytics/reports'),
    },
  ];

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/55e4f4d0-f564-42e5-99d3-e7bad233d344.png" 
                alt="Bluewater Group" 
                className="h-8 w-auto"
              />
              <Badge variant="secondary" className="text-xs">
                EMPLOYEE
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex flex-col items-center space-y-2">
            <img 
              src="/lovable-uploads/55e4f4d0-f564-42e5-99d3-e7bad233d344.png" 
              alt="Bluewater Group" 
              className="h-6 w-auto"
            />
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Quick Actions
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" align="end" className="w-80 p-0">
                <div className="p-4">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start h-auto p-3 flex-col items-start space-y-1"
                        onClick={action.action}
                      >
                        <div className="flex items-center space-x-2 w-full">
                          <action.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="font-medium text-sm">{action.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground text-left">
                          {action.description}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Bell className="h-3 w-3" />
              <span>3 notifications</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex flex-col items-center space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" align="end" className="w-80 p-0">
                <div className="p-4">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start h-auto p-3 flex-col items-start space-y-1"
                        onClick={action.action}
                      >
                        <div className="flex items-center space-x-2 w-full">
                          <action.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="font-medium text-sm">{action.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground text-left">
                          {action.description}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Bell className="h-3 w-3 text-muted-foreground" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default EmployeeSidebar;