import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, FileText, ShoppingCart, Package } from 'lucide-react';
import { useQuotes } from '@/contexts/QuoteContext';
import { QuoteSelectionModal } from '@/components/QuoteSelectionModal';

const EmployeeQuotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  
  const { quotes, consolidatedOrders } = useQuotes();

  // Group quotes by customer and calculate totals
  const customerQuoteSummary = quotes.reduce((acc, quote) => {
    const key = quote.customerName;
    if (!acc[key]) {
      acc[key] = {
        customerName: quote.customerName,
        totalItems: 0,
        totalValue: 0,
        readyItems: 0,
        statuses: new Set(),
        latestDate: quote.createdDate,
        employees: new Set()
      };
    }
    
    acc[key].totalItems += 1;
    acc[key].totalValue += quote.totalPrice;
    acc[key].statuses.add(quote.status);
    acc[key].employees.add(quote.employeeName);
    
    if (quote.status === 'ready') {
      acc[key].readyItems += 1;
    }
    
    if (quote.createdDate > acc[key].latestDate) {
      acc[key].latestDate = quote.createdDate;
    }
    
    return acc;
  }, {} as Record<string, {
    customerName: string;
    totalItems: number;
    totalValue: number;
    readyItems: number;
    statuses: Set<string>;
    latestDate: string;
    employees: Set<string>;
  }>);

  const customerSummaries = Object.values(customerQuoteSummary);

  const getStatusColor = (statuses: Set<string>) => {
    if (statuses.has('ready')) return 'default';
    if (statuses.has('pending')) return 'secondary';
    if (statuses.has('accepted')) return 'default';
    if (statuses.has('rejected')) return 'destructive';
    return 'outline';
  };

  const filteredCustomers = customerSummaries.filter(customer => {
    const matchesSearch = customer.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.statuses.has(statusFilter);
    return matchesSearch && matchesStatus;
  });

  const handleSelectQuotes = (customerName: string) => {
    setSelectedCustomer(customerName);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Quotes</h1>
          <p className="text-muted-foreground">Select and consolidate quote items into orders</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            {quotes.filter(q => q.status === 'ready').length} Ready
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <ShoppingCart className="h-3 w-3" />
            {consolidatedOrders.length} Orders Created
          </Badge>
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
                <TableHead>Customer</TableHead>
                <TableHead>Quote Items</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Latest Date</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.customerName} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium">{customer.customerName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{customer.totalItems} items</span>
                      {customer.readyItems > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {customer.readyItems} ready
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${customer.totalValue.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Array.from(customer.statuses).map((status) => (
                        <Badge key={status} variant={getStatusColor(new Set([status]))} className="text-xs">
                          {status}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{customer.latestDate}</TableCell>
                  <TableCell className="text-sm">
                    {Array.from(customer.employees).join(', ')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {customer.readyItems > 0 && (
                        <Button 
                          size="sm" 
                          onClick={() => handleSelectQuotes(customer.customerName)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Select ({customer.readyItems})
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No customer quotes found matching your criteria.</p>
        </div>
      )}

      {/* Quote Selection Modal */}
      <QuoteSelectionModal
        isOpen={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
        customerName={selectedCustomer || ''}
      />
    </div>
  );
};

export default EmployeeQuotes;