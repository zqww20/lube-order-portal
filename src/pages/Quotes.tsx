import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Quote, Search, Filter, Calendar, User, Building, Mail, Phone, Package, Clock, DollarSign, ArrowRight, FileText } from 'lucide-react';

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
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  quoted: 'bg-green-50 text-green-700 border-green-200',
  accepted: 'bg-purple-50 text-purple-700 border-purple-200',
  declined: 'bg-red-50 text-red-700 border-red-200'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quote Requests</h1>
              <p className="text-xl text-gray-600">Manage customer quote requests efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                <Quote className="h-6 w-6" />
                <span className="text-lg font-semibold">{filteredQuotes.length}</span>
                <span className="text-blue-100">Total</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-700 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-800">
                      {quotes.filter(q => q.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 mb-1">Processing</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {quotes.filter(q => q.status === 'processing').length}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 mb-1">Quoted</p>
                    <p className="text-2xl font-bold text-green-800">
                      {quotes.filter(q => q.status === 'quoted').length}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700 mb-1">Accepted</p>
                    <p className="text-2xl font-bold text-purple-800">
                      {quotes.filter(q => q.status === 'accepted').length}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Improved Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by product, company, or contact name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-64 h-12 border-gray-200">
                  <Filter className="h-5 w-5 mr-2" />
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
          </CardContent>
        </Card>

        {/* Enhanced Quotes List */}
        <div className="space-y-6">
          {filteredQuotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-900 mb-2">{quote.productName}</CardTitle>
                    <div className="flex items-center space-x-4">
                      <CardDescription className="text-gray-600">Quote #{quote.id}</CardDescription>
                      <Badge variant="outline" className="text-gray-600 border-gray-300">
                        {quote.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={`${statusColors[quote.status]} border font-medium px-4 py-2`}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg mb-4">Company Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5 text-gray-500" />
                        <span className="font-medium text-gray-900">{quote.company}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-700">{quote.contactName}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">{quote.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">{quote.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg mb-4">Order Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-semibold text-gray-900">{quote.quantity} units</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">Expected Delivery</span>
                          <span className="font-medium text-gray-900">{quote.expectedDelivery}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">Requested</span>
                          <span className="text-gray-700">{quote.requestDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg mb-4">Quote Info</h4>
                    {quote.quoteAmount && (
                      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                        <div className="text-sm text-green-700 mb-1">Quote Amount</div>
                        <div className="text-2xl font-bold text-green-800">
                          ${quote.quoteAmount.toFixed(2)}
                        </div>
                      </div>
                    )}
                    {quote.requirements && (
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-sm font-medium text-gray-700 mb-2">Special Requirements</div>
                        <p className="text-gray-600 text-sm leading-relaxed">{quote.requirements}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="hover:bg-gray-50">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {quote.status === 'pending' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Package className="h-4 w-4 mr-2" />
                      Process Quote
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                  {quote.status === 'quoted' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Quote
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuotes.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="mb-6">
                <Quote className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-xl mb-2">No quote requests found</p>
                <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quotes;
