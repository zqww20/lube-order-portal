import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuoteFormField {
  name: string;
  label: string;
  type: 'input' | 'textarea' | 'select' | 'email' | 'tel';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string; }[];
  className?: string;
}

interface UnifiedQuoteRequestProps {
  variant?: 'guest' | 'customer' | 'employee';
  title?: string;
  description?: string;
  triggerText?: string;
  triggerVariant?: 'default' | 'outline' | 'secondary';
  triggerClassName?: string;
  fields?: QuoteFormField[];
  onSubmit?: (data: Record<string, string>) => void;
  submitText?: string;
  className?: string;
}

const defaultGuestFields: QuoteFormField[] = [
  { name: 'name', label: 'Full Name', type: 'input', placeholder: 'Enter your full name', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@company.com', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(555) 123-4567', required: true },
  { name: 'company', label: 'Company Name', type: 'input', placeholder: 'Your company name' },
  { name: 'products', label: 'Products of Interest', type: 'textarea', placeholder: 'List the products you need quotes for...', required: true },
  { name: 'quantity', label: 'Estimated Quantity', type: 'input', placeholder: 'e.g., 10 drums, 500 liters' },
  { name: 'timeline', label: 'Timeline', type: 'select', required: true, options: [
    { value: 'immediate', label: 'Immediate (1-7 days)' },
    { value: 'short', label: 'Short term (1-4 weeks)' },
    { value: 'medium', label: 'Medium term (1-3 months)' },
    { value: 'long', label: 'Long term (3+ months)' }
  ]},
  { name: 'notes', label: 'Additional Notes', type: 'textarea', placeholder: 'Any special requirements or questions...' }
];

const defaultCustomerFields: QuoteFormField[] = [
  { name: 'products', label: 'Products for Quote', type: 'textarea', placeholder: 'List products with quantities...', required: true },
  { name: 'timeline', label: 'Required Timeline', type: 'select', required: true, options: [
    { value: 'immediate', label: 'Immediate (1-7 days)' },
    { value: 'short', label: 'Short term (1-4 weeks)' },
    { value: 'medium', label: 'Medium term (1-3 months)' },
    { value: 'long', label: 'Long term (3+ months)' }
  ]},
  { name: 'delivery', label: 'Delivery Preference', type: 'select', options: [
    { value: 'standard', label: 'Standard Delivery' },
    { value: 'express', label: 'Express Delivery' },
    { value: 'pickup', label: 'Pickup' }
  ]},
  { name: 'notes', label: 'Special Requirements', type: 'textarea', placeholder: 'Any special requirements or questions...' }
];

export const UnifiedQuoteRequest = ({
  variant = 'customer',
  title,
  description,
  triggerText = 'Request Quote',
  triggerVariant = 'outline',
  triggerClassName = 'w-full',
  fields,
  onSubmit,
  submitText = 'Submit Quote Request',
  className
}: UnifiedQuoteRequestProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Use default fields based on variant if none provided
  const formFields = fields || (variant === 'guest' ? defaultGuestFields : defaultCustomerFields);
  
  const dialogTitle = title || `Request Quote${variant === 'guest' ? ' (Guest)' : ''}`;
  const dialogDescription = description || 
    (variant === 'guest' 
      ? 'Fill out the form below and we\'ll get back to you with pricing within 24 hours.'
      : 'Submit your quote request and we\'ll provide detailed pricing.');

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setOpen(false);
    setFormData({});
  };

  const renderField = (field: QuoteFormField) => {
    const baseInputClass = "w-full";
    
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            key={field.name}
            id={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className={cn(baseInputClass, field.className)}
          />
        );
      
      case 'select':
        return (
          <Select
            key={field.name}
            value={formData[field.name] || ''}
            onValueChange={(value) => handleInputChange(field.name, value)}
            required={field.required}
          >
            <SelectTrigger className={cn(baseInputClass, field.className)}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return (
          <Input
            key={field.name}
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className={cn(baseInputClass, field.className)}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className={triggerClassName}>
          <FileText className="h-4 w-4 mr-2" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[500px]', className)}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {submitText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};