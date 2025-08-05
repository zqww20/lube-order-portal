# Bluewater Design System

A comprehensive design token system ensuring visual consistency across all Bluewater portals.

## Overview

The Bluewater Design System provides a centralized token-based approach to styling, ensuring consistency, maintainability, and accessibility across all Bluewater portals. Built on top of Tailwind CSS with semantic tokens and WCAG-AA compliant color combinations.

## Features

- **🎨 Semantic Color System**: Brand colors, status colors, and neutral scales
- **📝 Typography Scale**: Responsive typography with clear hierarchy
- **📏 8px Grid System**: Consistent spacing throughout the interface
- **🔲 Elevation System**: Standardized shadows for depth and hierarchy
- **🎯 Component Tokens**: Specific tokens for buttons, inputs, cards, and more
- **📱 Mobile-First**: Responsive design patterns with touch-friendly interactions
- **♿ Accessibility**: WCAG-AA compliant color contrasts and touch targets
- **🌓 Dark Mode**: Full dark mode support with semantic tokens

## Quick Start

### Using Design Tokens

Import tokens in your TypeScript files:

```typescript
import { designTokens } from '@/styles/tokens';

// Access color tokens
const primaryColor = designTokens.colors.brand.navy;
const successColor = designTokens.colors.status.success.DEFAULT;

// Access spacing tokens
const spacing = designTokens.spacing.md;

// Access typography tokens
const headingFont = designTokens.typography.fontFamily.heading;
```

### Using Tailwind Classes

The tokens are automatically mapped to Tailwind classes:

```tsx
// Colors
<div className="bg-primary text-primary-foreground">
<div className="text-status-success">
<div className="border-status-warning">

// Typography
<h1 className="text-h1 font-heading">Main Title</h1>
<p className="text-base font-body">Body text</p>

// Spacing
<div className="p-md m-lg space-y-sm">

// Components
<Button variant="primary" size="lg">
<Card className="shadow-card">
```

## Token Categories

### Colors

- **Brand Colors**: Primary navy, action blue, brand red, success teal
- **Semantic Colors**: Success, warning, error, info with variants
- **Neutral Colors**: 50-900 scale for backgrounds and text
- **Status Colors**: Feedback colors with muted and border variants

### Typography

- **Font Families**: Montserrat (headings), Open Sans (body), monospace
- **Font Sizes**: xs to display-lg with responsive scaling
- **Font Weights**: light to bold (300-700)
- **Line Heights**: tight, normal, relaxed
- **Letter Spacing**: tight, normal, wide

### Spacing

8px grid system with semantic names:
- **Numeric**: 0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32
- **Semantic**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl

### Elevation

Shadow system for depth:
- **Levels**: none, sm, base, md, lg, xl, 2xl
- **Semantic**: card, hover, focus

### Components

Predefined tokens for common components:
- **Buttons**: height, padding, font sizes for each size
- **Inputs**: standardized dimensions and spacing
- **Cards**: padding variants

## Component Usage

### Typography Components

```tsx
import { H1, H2, Text, Lead, Caption, Code } from '@/components/ui/typography';

<H1 variant="gradient">Main Title</H1>
<H2>Section Header</H2>
<Lead>Introduction paragraph</Lead>
<Text size="lg" variant="muted">Large muted text</Text>
<Caption>Small caption text</Caption>
<Code>inline code</Code>
```

### Enhanced UI Components

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Buttons with enhanced variants
<Button variant="success" size="lg">Success Action</Button>
<Button variant="brand-red">Brand Action</Button>

// Enhanced inputs with better focus states
<Input placeholder="Enter text..." />

// Cards with improved shadows and hover effects
<Card className="hover:shadow-lg">
  Content here
</Card>
```

## Responsive Design

All tokens include responsive considerations:

### Typography
- Mobile-first font sizes with desktop scaling
- Minimum 16px base size to prevent iOS zoom
- Clear hierarchy across all screen sizes

### Spacing
- Touch-friendly minimum targets (44px)
- Appropriate padding for mobile vs desktop
- Consistent spacing ratios

### Breakpoints
- sm: 640px
- md: 768px  
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Accessibility

### Color Contrast
All color combinations meet WCAG-AA standards:
- Primary text: 4.5:1 minimum contrast
- Large text: 3:1 minimum contrast
- Interactive elements: proper focus indicators

### Touch Targets
- Minimum 44px touch targets on mobile
- Adequate spacing between interactive elements
- Clear visual feedback for interactions

### Typography
- Clear font hierarchy
- Readable line heights
- Appropriate font sizes for all devices

## Storybook Documentation

View the complete component gallery and token documentation:

```bash
npm run storybook
```

This will open an interactive documentation showing:
- Complete component gallery
- All design tokens with visual examples
- Responsive behavior testing
- Accessibility guidelines
- Usage examples

## Migration Guide

### From Hardcoded Values

Replace hardcoded colors:
```tsx
// Before
<div className="text-blue-600 bg-white border-gray-200">

// After  
<div className="text-primary bg-background border-border">
```

Replace hardcoded spacing:
```tsx
// Before
<div className="p-4 m-8 space-y-6">

// After
<div className="p-md m-xl space-y-lg">
```

### From Custom Components

Update existing components to use design tokens:
```tsx
// Before
const CustomButton = styled.button`
  background: #001F4F;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
`;

// After
import { Button } from '@/components/ui/button';
// Use semantic variants instead
```

## Best Practices

### DO ✅
- Use semantic token names (`text-primary` not `text-blue-600`)
- Follow the 8px grid for spacing
- Use component variants instead of custom overrides
- Test across all breakpoints
- Verify color contrast ratios

### DON'T ❌
- Use hardcoded color values
- Create custom spacing outside the grid
- Override component styles with arbitrary values
- Ignore responsive behavior
- Skip accessibility testing

## Development

### Adding New Tokens

1. Add tokens to `/src/styles/tokens.ts`
2. Map to Tailwind in `tailwind.config.ts`
3. Update component variants as needed
4. Add to Storybook documentation
5. Update this README

### Testing Changes

```bash
# Run Storybook for visual testing
npm run storybook

# Test responsive behavior
npm run dev

# Build to check for issues
npm run build
```

## Bundle Size

The design system is optimized for performance:
- Token tree-shaking removes unused values
- CSS-in-JS avoided for better performance  
- Semantic tokens reduce duplication
- Target: <50kB gzipped increase

## Support

For questions or issues with the design system:
1. Check Storybook documentation
2. Review this README
3. Check existing component implementations
4. Create issue with reproduction case

## Changelog

### v1.0.0 (Current)
- Initial design token system
- Enhanced UI components with semantic variants
- Comprehensive Storybook documentation
- WCAG-AA compliance
- Mobile-first responsive design
- Dark mode support