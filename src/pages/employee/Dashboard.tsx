import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  Search, 
  TrendingUp, 
  Package, 
  FileText, 
  Users,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PendingQuote {
  id: string;
  customerName: string;
  products: string[];
  timeAgo: string;
  priority: 'high' | 'medium' | 'low';
  customerEmail: string;
}

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  // Mock data for pending quotes
  const pendingQuotes: PendingQuote[] = [
    {
      id: 'Q-2024-001',
      customerName: 'Atlantic Marine Services',
      products: ['Marine Gear Oil', 'Hydraulic Fluid ISO 46'],
      timeAgo: '15 minutes ago',
      priority: 'high',
      customerEmail: 'purchasing@atlanticmarine.ca'
    },
    {
      id: 'Q-2024-002',
      customerName: 'Industrial Solutions Ltd',
      products: ['Premium Engine Oil 5W-30'],
      timeAgo: '1 hour ago',
      priority: 'medium',
      customerEmail: 'orders@industrialsolutions.ca'
    },
    {
      id: 'Q-2024-003',
      customerName: 'Maritime Transport Co',
      products: ['Multi-Purpose Grease', 'Engine Oil 10W-40'],
      timeAgo: '2 hours ago',
      priority: 'medium',
      customerEmail: 'fleet@maritimetransport.ca'
    },
    {
      id: 'Q-2024-004',
      customerName: 'Coastal Construction',
      products: ['Hydraulic Fluid ISO 68'],
      timeAgo: '3 hours ago',
      priority: 'low',
      customerEmail: 'procurement@coastal.ca'
    }
  ];

  const stats = [
    {
      title: "Pending Quotes",
      value: pendingQuotes.length.toString(),
      icon: FileText,
      color: "text-orange-600"
    },
    {
      title: "Active Customers",
      value: "247",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Today's Orders",
      value: "12",
      icon: Package,
      color: "text-green-600"
    },
    {
      title: "Revenue (MTD)",
      value: "$284,950",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const handleCreateQuote = (quoteId: string) => {
    navigate(`/employee/workbench/${quoteId}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Quote Requests */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Pending Quote Requests
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers..."
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingQuotes.map((quote) => (
              <div key={quote.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{quote.customerName}</h3>
                      <Badge variant={getPriorityColor(quote.priority)}>
                        {quote.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      <p>{quote.customerEmail}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Requested Products:</p>
                      <div className="flex flex-wrap gap-1">
                        {quote.products.map((product, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {quote.timeAgo}
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button 
                      onClick={() => handleCreateQuote(quote.id)}
                      className="bg-brand-red text-brand-red-foreground hover:bg-brand-red/90"
                    >
                      Create Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;