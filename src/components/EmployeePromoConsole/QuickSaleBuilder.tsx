import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface QuickSaleBuilderProps {
  onCreatePromo: (promo: PromoData) => void;
}

interface PromoData {
  sku: string;
  promoType: string;
  discountPercent: number;
  expiryDate?: Date;
  description: string;
}

const QuickSaleBuilder = ({ onCreatePromo }: QuickSaleBuilderProps) => {
  const [sku, setSku] = useState('');
  const [promoType, setPromoType] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();
  const [description, setDescription] = useState('');

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Sale Builder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* SKU Selection */}
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                placeholder="Enter SKU or search..."
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>

            {/* Promo Type */}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Discount Amount */}
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

            {/* Expiry Date */}
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
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Custom promo description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
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
  );
};

export default QuickSaleBuilder;