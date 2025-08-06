import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  FileText, 
  Users, 
  Package, 
  BarChart3, 
  Settings,
  Plus,
  Search,
  Download
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const primaryActions = [
    {
      title: 'New Quote',
      description: 'Create customer quote',
      icon: Calculator,
      action: () => navigate('/employee/workbench/new'),
      variant: 'default' as const
    },
    {
      title: 'Bulk Operations',
      description: 'Process multiple orders',
      icon: Package,
      action: () => navigate('/employee/orders?bulk=true'),
      variant: 'secondary' as const
    },
    {
      title: 'Customer Search',
      description: 'Find customer records',
      icon: Search,
      action: () => console.log('Open customer search'),
      variant: 'outline' as const
    }
  ];

  const secondaryActions = [
    {
      title: 'Generate Report',
      icon: BarChart3,
      action: () => navigate('/employee/analytics/reports')
    },
    {
      title: 'Export Data',
      icon: Download,
      action: () => console.log('Export data')
    },
    {
      title: 'Add Customer',
      icon: Plus,
      action: () => console.log('Add customer')
    },
    {
      title: 'System Admin',
      icon: Settings,
      action: () => navigate('/employee/admin/settings')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {primaryActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                className="h-auto p-3 sm:p-4 flex flex-col items-start space-y-2 text-left min-h-[70px] sm:min-h-[80px] w-full"
                onClick={action.action}
              >
                <div className="flex items-center space-x-2 w-full">
                  <action.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm leading-tight break-words flex-1 overflow-wrap-anywhere">
                    {action.title}
                  </span>
                </div>
                <span className="text-xs leading-tight break-words w-full opacity-80 overflow-wrap-anywhere hyphens-auto">
                  {action.description}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Secondary Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tools & Utilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            {secondaryActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start"
                onClick={action.action}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;