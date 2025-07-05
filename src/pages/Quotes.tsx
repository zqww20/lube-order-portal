import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Quote } from 'lucide-react';

interface QuoteRequest {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  requirements: string;
  expectedDelivery: string;
  status: 'ready-for-review' | 'pending' | 'accepted' | 'expired';
  requestDate: string;
  quoteAmount?: number;
}

const mockQuotes: QuoteRequest[] = [
  {
    id: 'Q001',
    productName: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    quantity: 100,
    company: 'ABC Motors',
    contactName: 'John Smith',
    email: 'john@abcmotors.com',
    phone: '(555) 123-4567',
    requirements: 'Bulk purchase for fleet maintenance',
    expectedDelivery: '2024-02-15',
    status: 'ready-for-review',
    requestDate: '2024-01-20',
    quoteAmount: 4200.00
  },
  {
    id: 'Q002',
    productName: 'Industrial Hydraulic Fluid',
    category: 'Hydraulic Fluids',
    quantity: 50,
    company: 'Manufacturing Co',
    contactName: 'Sarah Johnson',
    email: 'sarah@manufacturing.com',
    phone: '(555) 987-6543',
    requirements: 'Monthly recurring order',
    expectedDelivery: '2024-02-01',
    status: 'pending',
    requestDate: '2024-01-18'
  },
  {
    id: 'Q003',
    productName: 'Marine Gear Oil',
    category: 'Marine Lubricants',
    quantity: 25,
    company: 'Harbor Services',
    contactName: 'Mike Davis',
    email: 'mike@harborservices.com',
    phone: '(555) 456-7890',
    requirements: 'Urgent delivery needed',
    expectedDelivery: '2024-01-30',
    status: 'expired',
    requestDate: '2024-01-22'
  },
  {
    id: 'Q004',
    productName: 'Transmission Fluid',
    category: 'Automotive Fluids',
    quantity: 75,
    company: 'Fleet Services Inc',
    contactName: 'Robert Wilson',
    email: 'robert@fleetservices.com',
    phone: '(555) 321-9876',
    requirements: 'Standard delivery',
    expectedDelivery: '2024-02-20',
    status: 'accepted',
    requestDate: '2024-01-25',
    quoteAmount: 3150.00
  }
];

const statusColorMap = {
  'ready-for-review': 'bg-accent text-accent-foreground',
  'pending': 'bg-yellow-100 text-yellow-800',
  'accepted': 'bg-green-100 text-green-800',
  'expired': 'bg-muted text-muted-foreground'
};

const Quotes = () => {
  const [quotes] = useState<QuoteRequest[]>(mockQuotes);
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteRequest[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterQuotes(term, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterQuotes(searchTerm, status);
  };

  const filterQuotes = (search: string, status: string) => {
    let filtered = quotes;

    if (search) {
      filtered = filtered.filter(quote =>
        quote.id.toLowerCase().includes(search.toLowerCase()) ||
        quote.productName.toLowerCase().includes(search.toLowerCase()) ||
        quote.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(quote => quote.status === status);
    }

    setFilteredQuotes(filtered);
  };

  const viewQuoteDetails = (quoteId: string) => {
    console.log('Viewing quote details for:', quoteId);
    // Here you would navigate to quote details or open a modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-600 mt-2">Track and manage customer quote requests</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Quotes</p>
          <p className="text-2xl font-bold text-blue-600">{quotes.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by quote number, product, or company..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ready-for-review">Ready for Review</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quotes Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Quote #</TableHead>
                <TableHead className="font-semibold">Product</TableHead>
                <TableHead className="font-semibold">Company</TableHead>
                <TableHead className="font-semibold">Date Submitted</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Quoted Total</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{quote.productName}</p>
                      <p className="text-sm text-muted-foreground">{quote.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{quote.company}</p>
                      <p className="text-sm text-muted-foreground">{quote.contactName}</p>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(quote.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={statusColorMap[quote.status]}>
                      {quote.status === 'ready-for-review' 
                        ? 'Ready for Review'
                        : quote.status.charAt(0).toUpperCase() + quote.status.slice(1)
                      }
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {quote.quoteAmount ? (
                      <span className="font-semibold">${quote.quoteAmount.toFixed(2)}</span>
                    ) : (
                      <span className="text-muted-foreground">Pending</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewQuoteDetails(quote.id)}
                      style={{ backgroundColor: '#4CC2E5', borderColor: '#4CC2E5', color: 'white' }}
                      className="hover:opacity-90"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Review Quote
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
          <Quote className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No quotes found</h2>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Quotes;