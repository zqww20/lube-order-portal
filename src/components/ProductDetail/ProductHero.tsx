import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Minus, Plus, Mail, Printer, MapPin, Clock } from 'lucide-react';

interface ProductHeroProps {
  itemCode: string;
  itemName: string;
  brand: string;
  imageUrl: string;
  customerPrice: number;
  listPrice?: number;
  stockQty: number;
  nextZoneDate?: string;
  isBulk?: boolean;
}

const ProductHero = ({
  itemCode,
  itemName,
  brand,
  imageUrl,
  customerPrice,
  listPrice,
  stockQty,
  nextZoneDate,
  isBulk
}: ProductHeroProps) => {
  const [quantity, setQuantity] = useState(isBulk ? 400 : 1);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [compareChecked, setCompareChecked] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const handleQuantityChange = (increment: boolean) => {
    const minValue = isBulk ? 400 : 1;
    const step = isBulk ? 10 : 1;
    setQuantity(prev => increment ? prev + step : Math.max(minValue, prev - step));
  };

  const getStockStatus = () => {
    if (stockQty <= 5) return { color: 'text-warning', label: 'Limited — order soon' };
    if (stockQty <= 20) return { color: 'text-warning', label: 'Low Stock' };
    return { color: 'text-success', label: 'In Stock' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
      {/* Product Image - 40% */}
      <div className="lg:col-span-2">
        <div 
          className="aspect-square bg-muted rounded-lg flex items-center justify-center cursor-zoom-in transition-transform duration-300 hover:scale-105"
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
          <img 
            src={imageUrl} 
            alt={itemName}
            className={`w-full h-full object-cover rounded-lg transition-transform duration-300 ${
              imageHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
      </div>

      {/* Buy Box - 60% */}
      <div className="lg:col-span-3 space-y-6">
        {/* Title and Brand */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="bg-success text-success-foreground">
              {brand}
            </Badge>
            <span className="text-sm text-muted-foreground">{itemCode}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
            {itemName}
          </h1>
        </div>

        {/* Pricing */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Web Price</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              ${customerPrice.toFixed(2)}
            </span>
            {listPrice && listPrice !== customerPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${listPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="quantity" className="text-sm font-medium">
              {isBulk ? 'Liters:' : 'Qty:'}
            </Label>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(false)}
                className="h-9 w-9 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const minValue = isBulk ? 400 : 1;
                  setQuantity(Math.max(minValue, parseInt(e.target.value) || minValue));
                }}
                className="w-20 text-center border-0 focus-visible:ring-0"
                min={isBulk ? "400" : "1"}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(true)}
                className="h-9 w-9 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            Add to Cart - ${(customerPrice * quantity).toFixed(2)} {isBulk ? `(${quantity}L)` : ''}
          </Button>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="compare"
              checked={compareChecked}
              onCheckedChange={(checked) => setCompareChecked(checked === true)}
            />
            <Label htmlFor="compare" className="text-sm">Compare</Label>
          </div>
        </div>

        {/* Availability Card */}
        <Card className="border-2">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Availability</Label>
              <RadioGroup 
                value={deliveryMethod} 
                onValueChange={setDeliveryMethod}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="font-medium">Pick-Up</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shipping" id="shipping" />
                  <Label htmlFor="shipping" className="font-medium">Shipping</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-2 border-t space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stockStatus.color.replace('text-', 'bg-')}`} />
                <span className={`text-sm font-medium ${stockStatus.color}`}>
                  {stockStatus.label}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({stockQty} available)
                </span>
              </div>

              {deliveryMethod === 'pickup' && nextZoneDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Next zone run: {nextZoneDate}</span>
                </div>
              )}

              {deliveryMethod === 'shipping' && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Enter postal code for lead time"
                    className="text-sm h-8"
                  />
                  <Button size="sm" variant="outline">Check</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Share Options */}
        <div className="flex items-center gap-4 pt-2">
          <span className="text-sm text-muted-foreground">Share:</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;