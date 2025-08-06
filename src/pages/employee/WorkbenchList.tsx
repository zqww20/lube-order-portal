import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Clock, 
  User, 
  Package,
  Plus
} from 'lucide-react';

interface QuoteWorkItem {
  id: string;
  customerName: string;
  customerEmail: string;
  status: 'draft' | 'pending_review' | 'pending_approval';
  lastModified: string;
  itemCount: number;
}

const WorkbenchList = () => {
  const navigate = useNavigate();

  const quotes: QuoteWorkItem[] = [
    {
      id: 'Q-2024-001',
      customerName: 'Atlantic Marine Services',
      customerEmail: 'procurement@atlantic-marine.ca',
      status: 'draft',
      lastModified: '2 hours ago',
      itemCount: 5
    },
    {
      id: 'Q-2024-002',
      customerName: 'Coastal Fisheries Ltd',
      customerEmail: 'orders@coastal-fish.ca',
      status: 'pending_review',
      lastModified: '1 day ago',
      itemCount: 12
    },
    {
      id: 'Q-2024-003',
      customerName: 'Maritime Transport Co',
      customerEmail: 'quotes@maritime-transport.ca',
      status: 'pending_approval',
      lastModified: '3 days ago',
      itemCount: 8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'pending_review': return 'warning';
      case 'pending_approval': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'pending_review': return 'Pending Review';
      case 'pending_approval': return 'Pending Approval';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quote Workbench</h1>
          <p className="text-muted-foreground">
            Manage and edit customer quotes
          </p>
        </div>
        <Button onClick={() => navigate('/employee/workbench/new')}>
          <Plus className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Active Quotes</p>
                <p className="text-2xl font-bold">{quotes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Pending Review</p>
                <p className="text-2xl font-bold">
                  {quotes.filter(q => q.status === 'pending_review').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Items</p>
                <p className="text-2xl font-bold">
                  {quotes.reduce((sum, q) => sum + q.itemCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Badge variant={getStatusColor(quote.status) as any}>
                      {getStatusLabel(quote.status)}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium">{quote.id}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{quote.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Package className="h-3 w-3" />
                        <span>{quote.itemCount} items</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{quote.lastModified}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/employee/workbench/${quote.id}`)}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Edit Quote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkbenchList;