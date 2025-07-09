import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, FileText } from 'lucide-react';

interface Quote {
  id: string;
  customerName: string;
  products: string[];
  totalValue: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdDate: string;
  responseDate?: string;
  employeeName: string;
}

const EmployeeQuotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - would be fetched from API
  const quotes: Quote[] = [
    {
      id: 'Q-2024-001',
      customerName: 'Atlantic Marine Services',
      products: ['Marine Gear Oil', 'Hydraulic Fluid ISO 46'],
      totalValue: 1250.00,
      status: 'accepted',
      createdDate: '2024-01-15',
      responseDate: '2024-01-16',
      employeeName: 'Sarah Johnson'
    },
    {
      id: 'Q-2024-002',
      customerName: 'Industrial Solutions Ltd',
      products: ['Premium Engine Oil 5W-30'],
      totalValue: 890.50,
      status: 'pending',
      createdDate: '2024-01-14',
      employeeName: 'Mike Chen'
    },
    {
      id: 'Q-2024-003',
      customerName: 'Maritime Transport Co',
      products: ['Multi-Purpose Grease', 'Engine Oil 10W-40'],
      totalValue: 2150.75,
      status: 'rejected',
      createdDate: '2024-01-12',
      responseDate: '2024-01-13',
      employeeName: 'David Smith'
    },
    {
      id: 'Q-2024-004',
      customerName: 'Coastal Construction',
      products: ['Hydraulic Fluid ISO 68'],
      totalValue: 675.25,
      status: 'expired',
      createdDate: '2024-01-10',
      employeeName: 'Sarah Johnson'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      case 'expired': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Quotes</h1>
          <p className="text-muted-foreground">Manage and track all customer quotes</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by customer name or quote ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{quote.customerName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {quote.products.slice(0, 2).map((product, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                      {quote.products.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{quote.products.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${quote.totalValue.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(quote.status)}>
                      {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{quote.createdDate}</TableCell>
                  <TableCell className="text-sm">{quote.employeeName}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No quotes found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeQuotes;