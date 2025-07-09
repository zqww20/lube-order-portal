import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, FileText, ShoppingCart } from 'lucide-react';
import { useQuotes } from '@/contexts/QuoteContext';
import { QuoteSelectionModal } from '@/components/QuoteSelectionModal';

const EmployeeQuotes = () => {
  const { quotes } = useQuotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [showSelectionModal, setShowSelectionModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'default';
      case 'partially-accepted': return 'default';
      case 'ready': return 'secondary';
      case 'pending': return 'outline';
      case 'processing': return 'outline';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleAcceptItems = (quote: any) => {
    setSelectedQuote(quote);
    setShowSelectionModal(true);
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
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="partially-accepted">Partially Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
                      {quote.items.slice(0, 2).map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item.productName}
                        </Badge>
                      ))}
                      {quote.items.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{quote.items.length - 2} more
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
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {quote.status === 'ready' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleAcceptItems(quote)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Accept Items
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

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No quotes found matching your criteria.</p>
        </div>
      )}

      {selectedQuote && (
        <QuoteSelectionModal
          quote={selectedQuote}
          open={showSelectionModal}
          onOpenChange={setShowSelectionModal}
        />
      )}
    </div>
  );
};

export default EmployeeQuotes;