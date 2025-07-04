
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Quote, Search, Filter, Calendar, User, Building } from 'lucide-react';

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
  status: 'pending' | 'processing' | 'quoted' | 'accepted' | 'declined';
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
    status: 'quoted',
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
    status: 'processing',
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
    status: 'pending',
    requestDate: '2024-01-22'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  quoted: 'bg-green-100 text-green-800',
  accepted: 'bg-purple-100 text-purple-800',
  declined: 'bg-red-100 text-red-800'
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(mockQuotes);
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteRequest[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filterQuotes = () => {
    let filtered = quotes;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(quote => quote.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(quote =>
        quote.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.contactName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredQuotes(filtered);
  };

  React.useEffect(() => {
    filterQuotes();
  }, [searchTerm, statusFilter, quotes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
          <p className="text-gray-600 mt-2">Manage customer quote requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Quote className="h-6 w-6" />
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
            {filteredQuotes.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search quotes..."
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
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="quoted">Quoted</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quotes List */}
      <div className="space-y-6">
        {filteredQuotes.map((quote) => (
          <Card key={quote.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{quote.productName}</CardTitle>
                  <CardDescription>Quote #{quote.id} • {quote.category}</CardDescription>
                </div>
                <Badge className={statusColors[quote.status]}>
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{quote.company}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{quote.contactName}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Email: {quote.email}</p>
                    <p>Phone: {quote.phone}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Quantity:</span> {quote.quantity} units
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Expected: {quote.expectedDelivery}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Requested: {quote.requestDate}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {quote.quoteAmount && (
                    <div className="text-lg font-bold text-green-600">
                      ${quote.quoteAmount.toFixed(2)}
                    </div>
                  )}
                  {quote.requirements && (
                    <div className="text-sm">
                      <span className="font-medium">Requirements:</span>
                      <p className="text-gray-600 mt-1">{quote.requirements}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {quote.status === 'pending' && (
                  <Button size="sm">
                    Process Quote
                  </Button>
                )}
                {quote.status === 'quoted' && (
                  <Button size="sm" variant="outline">
                    Send Quote
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <Quote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No quote requests found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Quotes;
