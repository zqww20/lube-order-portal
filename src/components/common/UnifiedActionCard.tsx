import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useButtonVariant } from '@/hooks/useButtonVariant';

interface UnifiedActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  badge?: string;
  buttonText?: string;
  className?: string;
  disabled?: boolean;
}

const variantStyles = {
  default: 'hover:bg-muted/50',
  primary: 'hover:bg-primary/5 border-primary/20',
  success: 'hover:bg-success/5 border-success/20',
  warning: 'hover:bg-warning/5 border-warning/20'
};

const iconStyles = {
  default: 'text-muted-foreground',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning'
};

export const UnifiedActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant = 'default',
  badge,
  buttonText = 'View',
  className,
  disabled = false
}: UnifiedActionCardProps) => {
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200 hover-lift',
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'h-12 w-12 rounded-lg flex items-center justify-center',
            variant === 'primary' && 'bg-primary/10',
            variant === 'success' && 'bg-success/10',
            variant === 'warning' && 'bg-warning/10',
            variant === 'default' && 'bg-muted'
          )}>
            <Icon className={cn('h-6 w-6', iconStyles[variant])} />
          </div>
          {badge && (
            <Badge variant={variant === 'default' ? 'secondary' : 'outline'}>
              {badge}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
        
        <Button 
          {...useButtonVariant('cardAction')}
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};