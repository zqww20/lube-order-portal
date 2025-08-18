import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Palette, 
  ChevronDown, 
  ChevronRight, 
  Users, 
  User, 
  UserCheck,
  ShoppingCart,
  Package,
  FileText,
  Settings,
  Home,
  MapPin,
  Tags
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NavigationSection {
  title: string;
  icon: React.ElementType;
  badge?: string;
  routes: {
    path: string;
    label: string;
    description?: string;
  }[];
}

const navigationSections: NavigationSection[] = [
  {
    title: "Customer Portal",
    icon: User,
    badge: "Main",
    routes: [
      { path: "/", label: "Dashboard", description: "Customer home & overview" },
      { path: "/products", label: "Products", description: "Browse lubricant catalog" },
      { path: "/products/1", label: "Product Detail", description: "Individual product view" },
      { path: "/cart", label: "Cart", description: "Shopping cart & checkout" },
      { path: "/orders", label: "Orders", description: "Order history" },
      { path: "/orders/1", label: "Order Detail", description: "Individual order view" },
      { path: "/quotes", label: "Quotes", description: "Quote management" }
    ]
  },
  {
    title: "Guest Portal",
    icon: Users,
    badge: "Public",
    routes: [
      { path: "/guest/dashboard", label: "Guest Home", description: "Public landing page" },
      { path: "/guest/products", label: "Browse Products", description: "Product catalog for guests" },
      { path: "/guest/products/1", label: "Product Info", description: "Product details for guests" },
      { path: "/guest/cart", label: "Guest Cart", description: "Quote-only cart" },
      { path: "/guest/quotes", label: "Request Quotes", description: "Quote request system" },
      { path: "/guest/location", label: "Locations", description: "Store/warehouse locations" }
    ]
  },
  {
    title: "Employee Portal",
    icon: UserCheck,
    badge: "Internal",
    routes: [
      { path: "/employee/dashboard", label: "Employee Dashboard", description: "Internal operations hub" },
      { path: "/employee/promotions", label: "Promotions", description: "Manage product promotions & discounts" },
      { path: "/employee/quotes", label: "Quote Management", description: "Process customer quotes" },
      { path: "/employee/orders", label: "Order Processing", description: "Fulfill customer orders" },
      { path: "/employee/orders/1", label: "Order Detail", description: "Process individual orders" },
      { path: "/employee/admin/logistics", label: "Logistics Admin", description: "Warehouse & shipping" }
    ]
  }
];

const DesignNavigator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['Customer Portal']);
  const location = useLocation();

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const isCurrentRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-elegant rounded-full w-14 h-14 mb-2"
        variant="default"
        size="icon"
      >
        <Palette className="h-6 w-6" />
      </Button>

      {/* Navigation Panel */}
      {isOpen && (
        <Card className="w-80 max-h-96 overflow-y-auto shadow-elegant border-border/20 bg-background/95 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Design Navigator</h3>
              <Badge variant="secondary" className="text-xs">UX Review</Badge>
            </div>
            
            <div className="space-y-3">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{section.title}</span>
                      {section.badge && (
                        <Badge variant="outline" className="text-xs">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                    {expandedSections.includes(section.title) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                  
                  {expandedSections.includes(section.title) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.routes.map((route) => (
                        <Link
                          key={route.path}
                          to={route.path}
                          className={`block p-2 rounded text-xs hover:bg-muted/30 transition-colors ${
                            isCurrentRoute(route.path) 
                              ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="font-medium">{route.label}</div>
                          {route.description && (
                            <div className="text-xs opacity-70 mt-0.5">{route.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border/20">
              <p className="text-xs text-muted-foreground">
                Navigate without authentication to review UX flows and interfaces.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DesignNavigator;