import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, Package, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProductOption {
  productNumber: string;
  containerType: string;
  size: number;
  unit: string;
}

interface ProductQuote {
  name: string;
  selectedOption: ProductOption;
  quantity: number;
  wholesaleCost: number;
  markupPerLiter: number;
  markupDisplay: string;
  finalPrice: number;
}

interface QuoteData {
  id: string;
  customerName: string;
  customerEmail: string;
  products: ProductQuote[];
  warehouse: 'Dartmouth' | 'Moncton';
  stockStatus: 'available' | 'transfer_required' | 'out_of_stock';
}

const QuotingWorkbench = () => {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [products, setProducts] = useState<ProductQuote[]>([
    { 
      name: 'Marine Gear Oil', 
      selectedOption: {
        productNumber: 'MGO-208D',
        containerType: 'Drum',
        size: 208,
        unit: 'L'
      },
      quantity: 1, 
      wholesaleCost: 12.50,
      markupPerLiter: 0,
      markupDisplay: '0',
      finalPrice: 12.50
    },
    { 
      name: 'Hydraulic Fluid ISO 46', 
      selectedOption: {
        productNumber: 'HF46-22B',
        containerType: 'Box',
        size: 22.71,
        unit: 'L'
      },
      quantity: 2, 
      wholesaleCost: 8.75,
      markupPerLiter: 0,
      markupDisplay: '0',
      finalPrice: 8.75
    }
  ]);

  // Mock data - would be fetched based on quoteId
  const quoteData: QuoteData = {
    id: quoteId || 'Q-2024-001',
    customerName: 'Atlantic Marine Services',
    customerEmail: 'purchasing@atlanticmarine.ca',
    products: products,
    warehouse: 'Dartmouth',
    stockStatus: 'available'
  };

  const updateProductMarkup = (index: number, markupValue: string) => {
    const updatedProducts = [...products];
    const markup = markupValue === '' ? 0 : parseFloat(markupValue) || 0;
    updatedProducts[index].markupPerLiter = markup;
    updatedProducts[index].markupDisplay = markupValue;
    updatedProducts[index].finalPrice = updatedProducts[index].wholesaleCost + markup;
    setProducts(updatedProducts);
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
    console.log('Submitting quote:', {
      quoteId: quoteData.id,
      products,
      notes
    });
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
                      <p className="text-sm text-muted-foreground">Product #: {product.selectedOption.productNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{product.quantity} × {product.selectedOption.containerType}</p>
                      <p className="text-sm text-muted-foreground">{product.selectedOption.size}{product.selectedOption.unit} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Product Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {products.map((product, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{product.name}</h4>
                    <div className="text-right">
                      <span className="text-sm font-medium">{product.selectedOption.productNumber}</span>
                      <p className="text-xs text-muted-foreground">{product.quantity} × {product.selectedOption.size}{product.selectedOption.unit} = {(product.quantity * product.selectedOption.size).toFixed(2)}L total</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Our Cost</Label>
                      <p className="text-sm font-medium">${product.wholesaleCost.toFixed(2)}/L</p>
                    </div>
                    <div>
                      <Label className="text-xs">Final Price</Label>
                      <p className="text-sm font-semibold text-primary">${product.finalPrice.toFixed(2)}/L</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`markup-${index}`} className="text-sm">Markup per Liter ($)</Label>
                    <Input
                      id={`markup-${index}`}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={product.markupDisplay}
                      onChange={(e) => updateProductMarkup(index, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Total: {product.quantity} × {product.selectedOption.size}L × ${product.finalPrice.toFixed(2)} = ${(product.quantity * product.selectedOption.size * product.finalPrice).toFixed(2)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any special instructions or notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-20"
              />
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
                disabled={products.every(p => p.markupPerLiter === 0)}
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