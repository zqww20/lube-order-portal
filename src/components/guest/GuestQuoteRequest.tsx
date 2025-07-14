import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Quote, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  viscosity: string;
  application: string;
}

interface GuestQuoteRequestProps {
  product: Product;
  trigger?: React.ReactNode;
}

interface QuoteFormData {
  quantity: number;
  requirements: string;
  expectedDelivery: string;
  contactInfo: string;
}

const GuestQuoteRequest = ({ product, trigger }: GuestQuoteRequestProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<QuoteFormData>({
    defaultValues: {
      quantity: 1,
      requirements: '',
      expectedDelivery: '',
      contactInfo: ''
    }
  });

  const onSubmit = (data: QuoteFormData) => {
    console.log('Guest quote request submitted:', { product, ...data });
    
    toast({
      title: "Quote Request Submitted",
      description: `Your quote request for ${product.name} has been submitted. We'll contact you within 24 hours. Note: Guest orders are pickup only with cash/e-transfer payment.`,
    });
    
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <Quote className="h-4 w-4 mr-2" />
            Request Quote
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Quote (Guest)</DialogTitle>
          <DialogDescription>
            Get a custom quote for {product.name} - Pickup only, cash/e-transfer payment
          </DialogDescription>
        </DialogHeader>
        
        {/* Guest Portal Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          <p className="text-amber-800 text-sm font-medium">
            <strong>Guest Portal:</strong> All orders are pickup only • Payment by cash or e-transfer • 5 item limit
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-sm text-gray-900">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-sm text-gray-500">Current price: ${product.price} {product.unit}</p>
            </div>
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity Needed (Max 5 items for guests)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="5"
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any specific requirements or questions... (Note: Pickup only)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Phone number or email for quote response"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="expectedDelivery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Pickup Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit Quote Request
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GuestQuoteRequest;