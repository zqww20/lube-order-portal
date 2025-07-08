
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

interface QuoteRequestProps {
  product: Product;
  trigger?: React.ReactNode;
}

interface QuoteFormData {
  quantity: number;
  requirements: string;
  shipToAddress: string;
  expectedDelivery: string;
  emergencyDelivery: string;
}

const QuoteRequest = ({ product, trigger }: QuoteRequestProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<QuoteFormData>({
    defaultValues: {
      quantity: 1,
      requirements: '',
      shipToAddress: '',
      expectedDelivery: '',
      emergencyDelivery: 'standard'
    }
  });

  // Mock ship-to addresses - would come from ERP system
  const shipToAddresses = [
    {
      id: '1',
      name: 'Main Warehouse',
      address: '123 Industrial Drive, Halifax, NS B3H 4R2'
    },
    {
      id: '2', 
      name: 'Secondary Location',
      address: '456 Marine Blvd, Dartmouth, NS B2Y 3Z8'
    },
    {
      id: '3',
      name: 'Distribution Center',
      address: '789 Port Road, Sydney, NS B1P 6K5'
    }
  ];

  const onSubmit = (data: QuoteFormData) => {
    console.log('Quote request submitted:', { product, ...data });
    
    toast({
      title: "Quote Request Submitted",
      description: `Your quote request for ${product.name} has been submitted. We'll contact you within 24 hours.`,
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
          <DialogTitle>Request Quote</DialogTitle>
          <DialogDescription>
            Get a custom quote for {product.name}
          </DialogDescription>
        </DialogHeader>
        
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
                  <FormLabel>Quantity Needed</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
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
                      placeholder="Any specific requirements, delivery instructions, or questions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shipToAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ship-To Address</FormLabel>
                  <FormControl>
                    <select 
                      {...field} 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select ship-to address...</option>
                      {shipToAddresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.name} - {address.address}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expectedDelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Delivery Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emergencyDelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Type</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="standard">Standard Delivery</option>
                        <option value="emergency">Emergency Delivery (+$75)</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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

export default QuoteRequest;
