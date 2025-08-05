/**
 * Bluewater Group Design System Tokens
 * 
 * Central design token system that ensures visual consistency across
 * all Bluewater portals. These tokens are mapped to Tailwind CSS
 * custom properties for optimal performance and theme support.
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const colorTokens = {
  // Primary brand colors
  brand: {
    navy: 'hsl(216 100% 16%)', // #001F4F - Primary brand navy
    blue: 'hsl(205 100% 50%)', // #0091FF - Action blue
    red: 'hsl(0 69% 55%)',     // Corporate red accent
    teal: 'hsl(162 100% 38%)', // #00C08D - Success teal
  },

  // Semantic color system
  semantic: {
    success: 'hsl(var(--success))',
    warning: 'hsl(var(--warning))',
    error: 'hsl(var(--destructive))',
    info: 'hsl(var(--accent))',
  },

  // Status colors for feedback
  status: {
    success: {
      DEFAULT: 'hsl(var(--success))',
      foreground: 'hsl(var(--success-foreground))',
      muted: 'hsl(var(--success) / 0.1)',
      border: 'hsl(var(--success) / 0.2)',
    },
    warning: {
      DEFAULT: 'hsl(var(--warning))',
      foreground: 'hsl(var(--warning-foreground))',
      muted: 'hsl(var(--warning) / 0.1)',
      border: 'hsl(var(--warning) / 0.2)',
    },
    error: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))',
      muted: 'hsl(var(--destructive) / 0.1)',
      border: 'hsl(var(--destructive) / 0.2)',
    },
    info: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
      muted: 'hsl(var(--accent) / 0.1)',
      border: 'hsl(var(--accent) / 0.2)',
    },
  },

  // Neutral grays for backgrounds and text
  neutral: {
    white: 'hsl(0 0% 100%)',
    50: 'hsl(227 25% 97%)',
    100: 'hsl(227 20% 95%)',
    200: 'hsl(227 20% 89%)',
    300: 'hsl(227 15% 80%)',
    400: 'hsl(227 15% 65%)',
    500: 'hsl(227 30% 45%)',
    600: 'hsl(227 63% 18%)',
    700: 'hsl(216 100% 16%)',
    800: 'hsl(228 64% 10%)',
    900: 'hsl(228 64% 8%)',
  },
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const typographyTokens = {
  // Font families
  fontFamily: {
    heading: ['Montserrat', 'system-ui', 'sans-serif'],
    body: ['Open Sans', 'system-ui', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Font sizes with responsive scaling
  fontSize: {
    // Body text sizes
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px

    // Heading sizes - mobile first, responsive
    'heading-6': '0.875rem',  // h6 - 14px
    'heading-5': '1rem',      // h5 - 16px
    'heading-4': '1.125rem',  // h4 - 18px
    'heading-3': '1.25rem',   // h3 - 20px (mobile) -> 24px (desktop)
    'heading-2': '1.5rem',    // h2 - 24px (mobile) -> 32px (desktop)
    'heading-1': '2rem',      // h1 - 32px (mobile) -> 48px (desktop)

    // Display sizes for hero content
    'display-sm': '2.25rem',  // 36px
    'display-md': '3rem',     // 48px
    'display-lg': '4rem',     // 64px
  },

  // Line heights
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },

  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;

// =============================================================================
// SPACING TOKENS (8px Grid System)
// =============================================================================

export const spacingTokens = {
  // Base spacing scale (8px grid)
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  32: '8rem',       // 128px

  // Semantic spacing
  xs: '0.5rem',     // 8px
  sm: '0.75rem',    // 12px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
} as const;

// =============================================================================
// ELEVATION TOKENS (Shadows)
// =============================================================================

export const elevationTokens = {
  none: 'none',
  sm: '0 1px 2px 0 hsl(var(--primary) / 0.05)',
  base: '0 1px 3px 0 hsl(var(--primary) / 0.1), 0 1px 2px -1px hsl(var(--primary) / 0.1)',
  md: '0 4px 6px -1px hsl(var(--primary) / 0.1), 0 2px 4px -2px hsl(var(--primary) / 0.1)',
  lg: '0 10px 15px -3px hsl(var(--primary) / 0.1), 0 4px 6px -4px hsl(var(--primary) / 0.1)',
  xl: '0 20px 25px -5px hsl(var(--primary) / 0.1), 0 8px 10px -6px hsl(var(--primary) / 0.1)',
  '2xl': '0 25px 50px -12px hsl(var(--primary) / 0.25)',

  // Semantic shadows
  card: '0 4px 6px -1px hsl(var(--primary) / 0.1), 0 2px 4px -2px hsl(var(--primary) / 0.1)',
  hover: '0 10px 25px -5px hsl(var(--primary) / 0.15), 0 8px 10px -6px hsl(var(--primary) / 0.15)',
  focus: '0 0 0 2px hsl(var(--ring))',
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export const radiusTokens = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',  // 8px if radius is 12px
  base: 'calc(var(--radius) - 2px)', // 10px if radius is 12px
  md: 'var(--radius)',               // 12px default
  lg: 'calc(var(--radius) + 2px)',  // 14px if radius is 12px
  xl: 'calc(var(--radius) + 4px)',  // 16px if radius is 12px
  full: '9999px',

  // Semantic radius
  button: 'var(--radius)',
  card: 'var(--radius)',
  input: 'calc(var(--radius) - 2px)',
} as const;

// =============================================================================
// TRANSITION TOKENS
// =============================================================================

export const transitionTokens = {
  // Duration
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // Timing functions
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Common transitions
  all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// =============================================================================
// COMPONENT TOKENS
// =============================================================================

export const componentTokens = {
  button: {
    height: {
      sm: '2.25rem',    // 36px
      md: '2.5rem',     // 40px
      lg: '2.75rem',    // 44px - minimum touch target
    },
    padding: {
      sm: '0.5rem 0.75rem',    // 8px 12px
      md: '0.625rem 1rem',     // 10px 16px
      lg: '0.75rem 2rem',      // 12px 32px
    },
    fontSize: {
      sm: '0.875rem',   // 14px
      md: '0.875rem',   // 14px
      lg: '1rem',       // 16px
    },
  },

  input: {
    height: '2.5rem',           // 40px
    padding: '0.5rem 0.75rem',  // 8px 12px
    fontSize: '1rem',           // 16px (prevents zoom on iOS)
  },

  card: {
    padding: {
      sm: '1rem',       // 16px
      md: '1.5rem',     // 24px
      lg: '2rem',       // 32px
    },
  },
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

export const breakpointTokens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// COMBINED DESIGN TOKENS
// =============================================================================

export const designTokens = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  elevation: elevationTokens,
  radius: radiusTokens,
  transition: transitionTokens,
  component: componentTokens,
  breakpoint: breakpointTokens,
} as const;

export default designTokens;