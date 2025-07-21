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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background/95">
      {/* Header Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-muted/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Quoting Workbench</h1>
                <p className="text-muted-foreground text-sm">Quote ID: {quoteData.id}</p>
              </div>
            </div>
            
            {/* Customer Info in Header */}
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="text-right">
                <p className="font-semibold">{quoteData.customerName}</p>
                <p className="text-muted-foreground">{quoteData.customerEmail}</p>
              </div>
              <Badge variant="outline" className="gap-1">
                {getStockStatusIcon(quoteData.stockStatus)}
                {getStockStatusText(quoteData.stockStatus)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-none">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Left Panel - Products & Pricing */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            {/* Products Overview */}
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Products Requested</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {quoteData.products.length} item{quoteData.products.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {quoteData.products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">#{product.selectedOption.productNumber}</p>
                        </div>
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

            {/* Pricing Grid */}
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Product Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {products.map((product, index) => (
                    <div key={index} className="p-6 border border-border/40 rounded-xl bg-card/50 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{product.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {product.selectedOption.productNumber} • {product.quantity} × {product.selectedOption.size}{product.selectedOption.unit} 
                            = <span className="font-medium">{(product.quantity * product.selectedOption.size).toFixed(2)}L total</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Our Cost</Label>
                          <p className="text-2xl font-bold text-muted-foreground">${product.wholesaleCost.toFixed(2)}/L</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`markup-${index}`} className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Markup per Liter ($)
                          </Label>
                          <Input
                            id={`markup-${index}`}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={product.markupDisplay}
                            onChange={(e) => updateProductMarkup(index, e.target.value)}
                            className="text-lg h-12 font-semibold"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Final Price</Label>
                          <p className="text-2xl font-bold text-primary">${product.finalPrice.toFixed(2)}/L</p>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-border/30">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Quote Value:</span>
                          <span className="text-xl font-bold text-primary">
                            ${(product.quantity * product.selectedOption.size * product.finalPrice).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Actions & Info */}
          <div className="col-span-12 xl:col-span-4 space-y-6">
            {/* Quick Summary */}
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quote Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Items:</span>
                    <span className="font-medium">{products.reduce((sum, p) => sum + p.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Volume:</span>
                    <span className="font-medium">
                      {products.reduce((sum, p) => sum + (p.quantity * p.selectedOption.size), 0).toFixed(2)}L
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Warehouse:</span>
                    <span className="font-medium flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {quoteData.warehouse}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Grand Total:</span>
                      <span className="text-xl font-bold text-primary">
                        ${products.reduce((sum, p) => sum + (p.quantity * p.selectedOption.size * p.finalPrice), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Action */}
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Submit Quote</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleSubmitQuote}
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                  disabled={products.every(p => p.markupPerLiter === 0)}
                >
                  Submit Quote to Customer
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Quote will be sent directly to {quoteData.customerEmail}
                </p>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any special instructions, delivery notes, or customer requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-32 resize-none"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotingWorkbench;