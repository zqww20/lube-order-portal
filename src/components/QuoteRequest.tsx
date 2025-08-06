
import React from 'react';
import { UnifiedQuoteRequest } from '@/components/ui/unified-quote-request';
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

const QuoteRequest = ({ product, trigger }: QuoteRequestProps) => {
  const { toast } = useToast();

  // Mock ship-to addresses - would come from ERP system
  const shipToOptions = [
    { value: '1', label: 'Main Warehouse - 123 Industrial Drive, Halifax, NS B3H 4R2' },
    { value: '2', label: 'Secondary Location - 456 Marine Blvd, Dartmouth, NS B2Y 3Z8' },
    { value: '3', label: 'Distribution Center - 789 Port Road, Sydney, NS B1P 6K5' }
  ];

  const deliveryOptions = [
    { value: 'standard', label: 'Standard Delivery' },
    { value: 'emergency', label: 'Emergency Delivery (+$75)' }
  ];

  const customFields = [
    { name: 'quantity', label: 'Quantity Needed', type: 'input' as const, placeholder: 'Enter quantity', required: true },
    { name: 'requirements', label: 'Special Requirements', type: 'textarea' as const, placeholder: 'Any specific requirements, delivery instructions, or questions...' },
    { name: 'shipToAddress', label: 'Ship-To Address', type: 'select' as const, options: shipToOptions, required: true },
    { name: 'expectedDelivery', label: 'Expected Delivery Date', type: 'input' as const, placeholder: 'YYYY-MM-DD' },
    { name: 'emergencyDelivery', label: 'Delivery Type', type: 'select' as const, options: deliveryOptions }
  ];

  const handleSubmit = (data: Record<string, string>) => {
    console.log('Quote request submitted:', { product, ...data });
    
    toast({
      title: "Quote Request Submitted",
      description: `Your quote request for ${product.name} has been submitted. We'll contact you within 24 hours.`,
    });
  };

  return (
    <div>
      {/* Product info display */}
      <div className="bg-bw-surface p-3 rounded-lg mb-4 shadow-bw-md">
        <h4 className="font-medium text-sm text-bw-text">{product.name}</h4>
        <p className="text-sm text-bw-text/70">{product.category}</p>
        <p className="text-sm text-bw-text/60">Current price: ${product.price} {product.unit}</p>
      </div>

      <UnifiedQuoteRequest
        variant="customer"
        title="Request Quote"
        description={`Get a custom quote for ${product.name}`}
        triggerText="Request Quote"
        triggerVariant="outline"
        triggerClassName="w-full"
        fields={customFields}
        onSubmit={handleSubmit}
        submitText="Submit Quote Request"
      />
    </div>
  );
};

export default QuoteRequest;
