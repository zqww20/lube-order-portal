import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator,
  CreditCard,
  Truck,
  FileCheck,
  RotateCcw,
  AlertTriangle,
  Droplets,
  MapPin,
  ClipboardList,
  Settings
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  variant: 'default' | 'outline' | 'secondary';
  urgency?: number;
  category: 'pricing' | 'logistics' | 'compliance' | 'management';
}

const QuickDistributionActions = () => {
  const actions: QuickAction[] = [
    {
      id: '1',
      title: 'Bulk Quote Calculator',
      description: 'Quick pricing for >400L orders',
      icon: Calculator,
      variant: 'default',
      urgency: 3,
      category: 'pricing'
    },
    {
      id: '2',
      title: 'Credit Check & Approval',
      description: 'Verify customer credit limits',
      icon: CreditCard,
      variant: 'outline',
      category: 'management'
    },
    {
      id: '3',
      title: 'Hazmat Shipping Scheduler',
      description: 'Schedule dangerous goods shipments',
      icon: AlertTriangle,
      variant: 'secondary',
      urgency: 2,
      category: 'compliance'
    },
    {
      id: '4',
      title: 'Emergency Stock Transfer',
      description: 'Dartmouth ↔ Moncton inventory',
      icon: RotateCcw,
      variant: 'outline',
      urgency: 1,
      category: 'logistics'
    },
    {
      id: '5',
      title: 'Marine Season Inventory',
      description: 'Spring prep checklist',
      icon: Droplets,
      variant: 'default',
      category: 'management'
    },
    {
      id: '6',
      title: 'Delivery Route Optimizer',
      description: 'Plan efficient delivery routes',
      icon: MapPin,
      variant: 'outline',
      category: 'logistics'
    },
    {
      id: '7',
      title: 'Generate Tech Data Sheets',
      description: 'Product specifications & SDS',
      icon: FileCheck,
      variant: 'outline',
      category: 'compliance'
    },
    {
      id: '8',
      title: 'Customer Pricing Tiers',
      description: 'Update volume discount levels',
      icon: Settings,
      variant: 'secondary',
      category: 'pricing'
    }
  ];

  const getUrgencyBadge = (urgency?: number) => {
    if (!urgency) return null;
    
    const config = {
      1: { variant: 'destructive' as const, label: 'URGENT' },
      2: { variant: 'secondary' as const, label: 'HIGH' },
      3: { variant: 'outline' as const, label: 'PENDING' }
    };

    const badge = config[urgency as keyof typeof config];
    return badge ? (
      <Badge variant={badge.variant} className="text-xs ml-2">
        {badge.label}
      </Badge>
    ) : null;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pricing': return 'bg-blue-50 border-blue-200';
      case 'logistics': return 'bg-green-50 border-green-200';
      case 'compliance': return 'bg-yellow-50 border-yellow-200';
      case 'management': return 'bg-purple-50 border-purple-200';
      default: return '';
    }
  };

  // Group actions by category
  const groupedActions = actions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  const categoryTitles = {
    pricing: 'Pricing & Quotes',
    logistics: 'Logistics & Shipping',
    compliance: 'Compliance & Documentation',
    management: 'Inventory Management'
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Object.entries(groupedActions).map(([category, categoryActions]) => (
        <Card key={category} className={getCategoryColor(category)}>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className="w-full justify-start h-auto py-3 px-4"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <action.icon className="h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs opacity-70">{action.description}</div>
                    </div>
                  </div>
                  {getUrgencyBadge(action.urgency)}
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickDistributionActions;