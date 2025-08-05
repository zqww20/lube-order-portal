import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccountField {
  label: string;
  value: string;
  className?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    className?: string;
  };
}

interface UnifiedAccountSummaryProps {
  title: string;
  fields: AccountField[];
  variant?: 'customer' | 'guest';
  className?: string;
}

export const UnifiedAccountSummary = ({ 
  title, 
  fields, 
  variant = 'customer',
  className 
}: UnifiedAccountSummaryProps) => {
  const cols = variant === 'guest' ? 'md:grid-cols-3' : 'md:grid-cols-4';
  
  return (
    <Card className={cn('card-enhanced shadow-card hover-lift', className)}>
      <CardHeader className="pb-3 md:pb-4 bg-gradient-subtle">
        <CardTitle className="font-heading text-mobile-h3 flex items-center text-brand">
          <CreditCard className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-brand" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 md:pt-4">
        <div className={cn('grid grid-cols-2 gap-3 md:gap-4', cols)}>
          {fields.map((field, index) => (
            <div key={index} className="space-y-1 p-2 md:p-0">
              <p className="text-xs text-muted-foreground">{field.label}</p>
              <p className={cn('font-semibold text-mobile-caption', field.className)}>
                {field.value}
              </p>
              {field.badge && (
                <Badge 
                  variant={field.badge.variant || 'secondary'}
                  className={cn('text-xs', field.badge.className)}
                >
                  {field.badge.text}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};