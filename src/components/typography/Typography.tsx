import React from 'react';
import { cn } from '@/lib/utils';

// Base typography component props
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Display Text - Largest size for hero sections
export const Display = ({ children, className, as = 'h1', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-display font-bold leading-display tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Heading 1 - Primary page titles
export const H1 = ({ children, className, as = 'h1', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-h1 font-bold leading-h1 tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Heading 2 - Section titles
export const H2 = ({ children, className, as = 'h2', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-h2 font-semibold leading-h2 tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Heading 3 - Subsection titles
export const H3 = ({ children, className, as = 'h3', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-h3 font-semibold leading-h3',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Heading 4 - Small section titles
export const H4 = ({ children, className, as = 'h4', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-h4 font-semibold leading-h4',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Heading 5 - Card titles
export const H5 = ({ children, className, as = 'h5', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-h5 font-medium leading-h5',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Heading 6 - Small card titles
export const H6 = ({ children, className, as = 'h6', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-h6 font-medium leading-h6',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Body text - Main content
export const P = ({ children, className, as = 'p', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-body leading-body font-normal',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Caption text - Helper text, labels
export const Caption = ({ children, className, as = 'span', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-caption leading-caption font-normal text-muted-foreground',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Micro text - Very small text like badges, timestamps
export const Micro = ({ children, className, as = 'span', ...props }: TypographyProps) => {
  const Component = as;
  return (
    <Component 
      className={cn(
        'text-micro leading-micro font-normal text-muted-foreground',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};