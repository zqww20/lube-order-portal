import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, Package, AlertTriangle, CheckCircle } from 'lucide-react';

interface QuoteData {
  id: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  warehouse: 'Dartmouth' | 'Moncton';
  stockStatus: 'available' | 'transfer_required' | 'out_of_stock';
}

const QuotingWorkbench = () => {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [notes, setNotes] = useState('');

  // Mock data - would be fetched based on quoteId
  const quoteData: QuoteData = {
    id: quoteId || 'Q-2024-001',
    customerName: 'Atlantic Marine Services',
    customerEmail: 'purchasing@atlanticmarine.ca',
    products: [
      { name: 'Marine Gear Oil', quantity: 24, unit: 'L' },
      { name: 'Hydraulic Fluid ISO 46', quantity: 12, unit: 'L' }
    ],
    warehouse: 'Dartmouth',
    stockStatus: 'available'
  };

  // Auto-focus price input on mount
  useEffect(() => {
    const priceInput = document.getElementById('price-input');
    if (priceInput) {
      priceInput.focus();
    }
  }, []);

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'transfer_required':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'out_of_stock':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'In Stock';
      case 'transfer_required':
        return 'Transfer Required';
      case 'out_of_stock':
        return 'Out of Stock';
      default:
        return 'Unknown';
    }
  };

  const getStockStatusVariant = (status: string) => {
    switch (status) {
      case 'available':
        return 'default';
      case 'transfer_required':
        return 'secondary';
      case 'out_of_stock':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleSubmitQuote = () => {
    // Handle quote submission logic here
    console.log('Submitting quote:', {
      quoteId: quoteData.id,
      pricePerUnit,
      notes
    });
    
    // Navigate back to dashboard
    navigate('/employee/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quoting Workbench</h1>
          <p className="text-muted-foreground">Quote ID: {quoteData.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer & Product Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <Label className="text-sm font-medium">Customer</Label>
                  <p className="text-lg font-semibold">{quoteData.customerName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{quoteData.customerEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Requested */}
          <Card>
            <CardHeader>
              <CardTitle>Products Requested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quoteData.products.map((product, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{product.quantity} {product.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quote Form */}
          <Card>
            <CardHeader>
              <CardTitle>Quote Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price-input">Price per Unit ($)</Label>
                <Input
                  id="price-input"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any special instructions or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logistics Info & Actions */}
        <div className="space-y-6">
          {/* Warehouse & Stock Status */}
          <Card>
            <CardHeader>
              <CardTitle>Logistics Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Servicing Warehouse
                </Label>
                <p className="text-lg font-semibold">{quoteData.warehouse}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Stock Status
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  {getStockStatusIcon(quoteData.stockStatus)}
                  <Badge variant={getStockStatusVariant(quoteData.stockStatus)}>
                    {getStockStatusText(quoteData.stockStatus)}
                  </Badge>
                </div>
                {quoteData.stockStatus === 'transfer_required' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Inventory transfer needed from alternate warehouse
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Action */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSubmitQuote}
                className="w-full bg-brand-red text-brand-red-foreground hover:bg-brand-red/90"
                disabled={!pricePerUnit}
              >
                Submit Quote to Customer
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Quote will be sent directly to customer email
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuotingWorkbench;