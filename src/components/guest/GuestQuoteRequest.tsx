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

interface GuestQuoteRequestProps {
  product: Product;
  trigger?: React.ReactNode;
}

const GuestQuoteRequest = ({ product, trigger }: GuestQuoteRequestProps) => {
  const { toast } = useToast();

  const customFields = [
    { name: 'contactInfo', label: 'Contact Information', type: 'input' as const, placeholder: 'Phone number or email for quote response', required: true },
    { name: 'quantity', label: 'Quantity Needed (Max 5 items for guests)', type: 'input' as const, placeholder: '1-5', required: true },
    { name: 'requirements', label: 'Special Requirements', type: 'textarea' as const, placeholder: 'Any specific requirements or questions... (Note: Pickup only)' },
    { name: 'expectedDelivery', label: 'Expected Pickup Date', type: 'input' as const, placeholder: 'YYYY-MM-DD' }
  ];

  const handleSubmit = (data: Record<string, string>) => {
    console.log('Guest quote request submitted:', { product, ...data });
    
    toast({
      title: "Quote Request Submitted",
      description: `Your quote request for ${product.name} has been submitted. We'll contact you within 24 hours. Note: Guest orders are pickup only with cash/e-transfer payment.`,
    });
  };

  return (
    <div>
      {/* Product info display */}
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-sm text-gray-900">{product.name}</h4>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-sm text-gray-500">Current price: ${product.price} {product.unit}</p>
      </div>

      {/* Guest Portal Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
        <p className="text-amber-800 text-sm font-medium">
          <strong>Guest Portal:</strong> All orders are pickup only • Payment by cash or e-transfer • 5 item limit
        </p>
      </div>

      <UnifiedQuoteRequest
        variant="guest"
        title="Request Quote (Guest)"
        description={`Get a custom quote for ${product.name} - Pickup only, cash/e-transfer payment`}
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

export default GuestQuoteRequest;