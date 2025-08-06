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
  Plus,
  Search,
  Filter,
  FileText,
  TrendingUp,
  CheckCircle
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
      case 'pending_review': return 'outline';
      case 'pending_approval': return 'default';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return FileText;
      case 'pending_review': return Clock;
      case 'pending_approval': return CheckCircle;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Quote Workbench
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and edit customer quotes with real-time updates
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              onClick={() => navigate('/employee/workbench/new')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Quote
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-card border shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Active Quotes
                  </p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {quotes.length}
                </p>
              </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+12%</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Pending Review
                  </p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {quotes.filter(q => q.status === 'pending_review').length}
                </p>
              </div>
                <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-amber-600 font-medium">2 urgent</span>
                <span className="text-muted-foreground ml-1">require attention</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Total Items
                  </p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {quotes.reduce((sum, q) => sum + q.itemCount, 0)}
                </p>
              </div>
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-emerald-600 font-medium">$247.5K</span>
                <span className="text-muted-foreground ml-1">total value</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes List */}
        <Card className="bg-card border shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Active Quotes
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{quotes.length} total quotes</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {quotes.map((quote) => {
                const StatusIcon = getStatusIcon(quote.status);
                return (
                  <div
                    key={quote.id}
                    className="p-6 hover:bg-muted/50 transition-all duration-200 group cursor-pointer"
                    onClick={() => navigate(`/employee/workbench/${quote.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <StatusIcon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {quote.id}
                            </h3>
                            <Badge 
                              variant={getStatusColor(quote.status) as any}
                              className="text-xs"
                            >
                              {getStatusLabel(quote.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span className="font-medium">{quote.customerName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Package className="h-4 w-4" />
                              <span>{quote.itemCount} items</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{quote.lastModified}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {quote.customerEmail}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/employee/workbench/${quote.id}`);
                          }}
                        >
                          <Calculator className="h-4 w-4 mr-2" />
                          Edit Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkbenchList;