import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton' | 'dots';
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = 'md', className, text }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

const LoadingSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse', className)}>
    <div className="space-y-3">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
    </div>
  </div>
);

const LoadingDots = ({ className }: { className?: string }) => (
  <div className={cn('flex space-x-1 justify-center items-center', className)}>
    <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
  </div>
);

export const Loading = ({ variant = 'spinner', ...props }: LoadingProps) => {
  switch (variant) {
    case 'skeleton':
      return <LoadingSkeleton className={props.className} />;
    case 'dots':
      return <LoadingDots className={props.className} />;
    default:
      return <LoadingSpinner {...props} />;
  }
};

export const PageLoading = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loading size="lg" text={text} />
  </div>
);

export const InlineLoading = ({ text }: { text?: string }) => (
  <div className="flex items-center gap-2 py-2">
    <Loading size="sm" />
    {text && <span className="text-sm text-muted-foreground">{text}</span>}
  </div>
);