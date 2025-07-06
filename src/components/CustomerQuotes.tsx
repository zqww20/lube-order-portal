import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, Calendar, Package, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

interface CustomerQuote {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  requirements: string;
  expectedDelivery: string;
  status: 'pending' | 'processing' | 'quoted' | 'accepted' | 'declined';
  requestDate: string;
  quoteAmount?: number;
  validUntil?: string;
}

const mockCustomerQuotes: CustomerQuote[] = [
  {
    id: 'Q001',
    productName: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    quantity: 100,
    requirements: 'Bulk purchase for fleet maintenance',
    expectedDelivery: '2024-02-15',
    status: 'quoted',
    requestDate: '2024-01-20',
    quoteAmount: 4200.00,
    validUntil: '2024-02-05'
  },
  {
    id: 'Q002',
    productName: 'Hydraulic System Cleaner',
    category: 'Industrial Fluids',
    quantity: 50,
    requirements: 'Regular maintenance schedule',
    expectedDelivery: '2024-02-10',
    status: 'quoted',
    requestDate: '2024-01-21',
    quoteAmount: 1850.00,
    validUntil: '2024-02-07'
  },
  {
    id: 'Q003',
    productName: 'Marine Gear Oil',
    category: 'Marine Lubricants',
    quantity: 25,
    requirements: 'Urgent delivery needed',
    expectedDelivery: '2024-01-30',
    status: 'pending',
    requestDate: '2024-01-22'
  },
  {
    id: 'Q004',
    productName: 'Industrial Grease Multi-Purpose',
    category: 'Greases',
    quantity: 12,
    requirements: 'High temperature application',
    expectedDelivery: '2024-02-05',
    status: 'processing',
    requestDate: '2024-01-23'
  }
];

const statusInfo = {
  pending: { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock, text: 'Under Review' },
  processing: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Package, text: 'Being Processed' },
  quoted: { color: 'bg-green-50 text-green-700 border-green-200', icon: DollarSign, text: 'Quote Ready' },
  accepted: { color: 'bg-purple-50 text-purple-700 border-purple-200', icon: CheckCircle, text: 'Accepted' },
  declined: { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, text: 'Declined' }
};

const CustomerQuotes = () => {
  const [quotes] = useState<CustomerQuote[]>(mockCustomerQuotes);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">My Quote Requests</h1>
          <p className="text-gray-600 mt-2">Track your quote requests and responses</p>
        </div>
        <div className="flex items-center space-x-3 bg-primary/10 text-primary px-6 py-3 rounded-lg">
          <Quote className="h-5 w-5" />
          <span className="font-semibold">{quotes.length} Active</span>
        </div>
      </div>

      <div className="space-y-4">
        {quotes.map((quote) => {
          const statusConfig = statusInfo[quote.status];
          const StatusIcon = statusConfig.icon;
          
          return (
            <Card key={quote.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="font-semibold text-lg">{quote.productName}</h3>
                      <Badge className={`${statusConfig.color} border font-medium px-3 py-1`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.text}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">Quote #{quote.id} • {quote.category}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                      <p>Quantity: {quote.quantity} units</p>
                      <p>Requested: {quote.requestDate}</p>
                      <p>Expected: {quote.expectedDelivery}</p>
                      {quote.quoteAmount && <p>Total: ${quote.quoteAmount.toFixed(2)}</p>}
                    </div>
                    
                    {quote.requirements && (
                      <p className="text-sm text-gray-600 mb-2">
                        Requirements: {quote.requirements}
                      </p>
                    )}

                    {quote.quoteAmount ? (
                      <div className="bg-green-50 border border-green-200 p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-green-800">Custom Quote Ready</p>
                            <p className="text-xs text-green-600">
                              ${(quote.quoteAmount / quote.quantity).toFixed(2)} per unit
                              {quote.validUntil && ` • Valid until: ${quote.validUntil}`}
                            </p>
                          </div>
                          <p className="text-xl font-bold text-green-800">${quote.quoteAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/50 border border-muted p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-muted-foreground">Quote Pending</p>
                            <p className="text-xs text-muted-foreground">We're preparing your custom pricing</p>
                          </div>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {quote.status === 'quoted' && (
                      <Button size="sm" variant="outline">
                        <Package className="h-4 w-4 mr-2" />
                        Contact Sales
                      </Button>
                    )}
                    {quote.status === 'accepted' && (
                      <Button size="sm" variant="outline">
                        <Package className="h-4 w-4 mr-2" />
                        Track Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {quotes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Quote className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">No quote requests yet</p>
            <p className="text-sm text-muted-foreground">
              Start by browsing our products and requesting quotes for items you need.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerQuotes;