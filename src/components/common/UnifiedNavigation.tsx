import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
}

interface UnifiedNavigationProps {
  items: NavigationItem[];
  variant?: 'horizontal' | 'vertical' | 'mobile';
  className?: string;
}

export const UnifiedNavigation = ({ 
  items, 
  variant = 'horizontal', 
  className 
}: UnifiedNavigationProps) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const baseClasses = cn(
    'flex gap-1',
    variant === 'horizontal' && 'flex-row',
    variant === 'vertical' && 'flex-col',
    variant === 'mobile' && 'flex-col space-y-1',
    className
  );

  const linkClasses = (href: string) => cn(
    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
    'hover:bg-muted focus:bg-muted focus:outline-none',
    isActive(href) 
      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
      : 'text-muted-foreground hover:text-foreground',
    variant === 'mobile' && 'justify-start w-full',
    variant === 'vertical' && 'justify-start w-full'
  );

  return (
    <nav className={baseClasses}>
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) => 
            cn(
              linkClasses(item.href),
              item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
            )
          }
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
          {item.badge && (
            <span className={cn(
              'ml-auto px-2 py-0.5 text-xs rounded-full',
              isActive(item.href)
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-primary text-primary-foreground'
            )}>
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

// Mobile menu button component
export const MobileMenuButton = ({ 
  isOpen, 
  onClick, 
  className 
}: { 
  isOpen: boolean; 
  onClick: () => void; 
  className?: string; 
}) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    className={cn('md:hidden', className)}
    aria-label="Toggle menu"
  >
    <div className="flex flex-col gap-1">
      <span className={cn(
        'block h-0.5 w-5 bg-current transition-transform',
        isOpen && 'rotate-45 translate-y-1.5'
      )} />
      <span className={cn(
        'block h-0.5 w-5 bg-current transition-opacity',
        isOpen && 'opacity-0'
      )} />
      <span className={cn(
        'block h-0.5 w-5 bg-current transition-transform',
        isOpen && '-rotate-45 -translate-y-1.5'
      )} />
    </div>
  </Button>
);