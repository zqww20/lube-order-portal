import { ButtonProps } from './button';

// Standardized button configurations for consistent usage across the app
export const buttonConfigs = {
  // Primary actions - main CTA buttons
  primary: {
    variant: 'default' as const,
    className: 'touch-target'
  },
  
  // Secondary actions - outline style for less prominent actions
  secondary: {
    variant: 'outline' as const,
    className: 'touch-target'
  },
  
  // Subtle actions - ghost style for minimal visual impact
  subtle: {
    variant: 'ghost' as const,
    className: 'touch-target'
  },
  
  // Destructive actions - for delete, remove, etc.
  destructive: {
    variant: 'destructive' as const,
    className: 'touch-target'
  },
  
  // Link style - for text-like buttons
  link: {
    variant: 'link' as const,
    className: 'touch-target p-0 h-auto'
  },
  
  // Navigation buttons - for headers and navigation areas
  nav: {
    variant: 'ghost' as const,
    size: 'sm' as const,
    className: 'text-white hover:bg-white/10 border border-white/30'
  },
  
  // Card actions - for buttons inside cards
  cardAction: {
    variant: 'outline' as const,
    size: 'sm' as const,
    className: 'px-3 py-1.5 text-xs'
  },
  
  // Quick actions - small buttons for frequent actions
  quickAction: {
    variant: 'outline' as const,
    size: 'sm' as const,
    className: 'touch-target'
  }
} as const;

export type ButtonConfigKey = keyof typeof buttonConfigs;

// Helper function to get button props for a specific config
export const getButtonProps = (configKey: ButtonConfigKey, overrides?: Partial<ButtonProps>): ButtonProps => {
  const config = buttonConfigs[configKey];
  return {
    ...config,
    ...overrides,
    className: `${config.className} ${overrides?.className || ''}`.trim()
  };
};