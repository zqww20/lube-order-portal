import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Plus, Zap, Eye, Edit, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CostData {
  sku: string;
  productName: string;
  avgCost: number;
  stdPrice: number;
  marginPercent: number;
  status: 'active' | 'discontinued' | 'low-stock';
}

interface PromoData {
  sku: string;
  promoType: string;
  discountPercent: number;
  expiryDate?: Date;
  description: string;
}

interface CreatePromotionTabProps {
  costData: CostData[];
  onCreatePromo: (promo: PromoData) => void;
}

const CreatePromotionTab = ({ costData, onCreatePromo }: CreatePromotionTabProps) => {
  const [sku, setSku] = useState('');
  const [promoType, setPromoType] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();
  const [description, setDescription] = useState('');

  const getMarginColor = (margin: number) => {
    if (margin >= 30) return 'text-success';
    if (margin >= 20) return 'text-warning';
    return 'text-destructive';
  };

  const getMarginIcon = (margin: number) => {
    return margin >= 25 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success">Active</Badge>;
      case 'discontinued':
        return <Badge variant="destructive">Discontinued</Badge>;
      case 'low-stock':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Low Stock</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sku || !promoType || !discountPercent) {
      return;
    }

    const promoData: PromoData = {
      sku,
      promoType,
      discountPercent: parseFloat(discountPercent),
      expiryDate,
      description: description || `${discountPercent}% off ${sku}`
    };

    onCreatePromo(promoData);
    
    // Reset form
    setSku('');
    setPromoType('');
    setDiscountPercent('');
    setExpiryDate(undefined);
    setDescription('');
  };

  const handleSelectSKU = (selectedSku: string) => {
    setSku(selectedSku);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cost View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Product Cost & Margin Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Select</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costData.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell className="font-medium max-w-32 truncate">{item.productName}</TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      ${item.avgCost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      ${item.stdPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className={`text-right font-semibold text-sm ${getMarginColor(item.marginPercent)}`}>
                      <div className="flex items-center justify-end gap-1">
                        {getMarginIcon(item.marginPercent)}
                        {item.marginPercent.toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant={sku === item.sku ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handleSelectSKU(item.sku)}
                      >
                        {sku === item.sku ? 'Selected' : 'Select'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Sale Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Sale Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                placeholder="Enter SKU or select from table..."
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Promo Type</Label>
                <Select value={promoType} onValueChange={setPromoType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Off</SelectItem>
                    <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                    <SelectItem value="bogo">Buy One Get One</SelectItem>
                    <SelectItem value="bundle">Bundle Deal</SelectItem>
                    <SelectItem value="clearance">Clearance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount %</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="15"
                  min="1"
                  max="90"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Expiry Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !expiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={setExpiryDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Custom promo description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90"
              disabled={!sku || !promoType || !discountPercent}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePromotionTab;