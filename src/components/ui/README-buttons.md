# Button Standardization Guide

This project uses a standardized button system to ensure consistent styling and behavior across all components.

## Usage

Import the button hook:
```tsx
import { useButtonVariant } from '@/hooks/useButtonVariant';
```

Use standardized button configurations:
```tsx
<Button {...useButtonVariant('primary')}>
  Primary Action
</Button>

<Button {...useButtonVariant('secondary', { className: 'w-full' })}>
  Secondary Action
</Button>
```

## Available Button Variants

- **primary**: Main CTA buttons (default variant with touch targets)
- **secondary**: Less prominent actions (outline style with touch targets)
- **subtle**: Minimal visual impact (ghost style with touch targets)
- **destructive**: Delete/remove actions (destructive variant with touch targets)
- **link**: Text-like buttons (link style with proper spacing)
- **nav**: Navigation buttons (for headers, custom white styling)
- **cardAction**: Buttons inside cards (outline, small, full width)
- **quickAction**: Small buttons for frequent actions (outline, small, touch targets)

## Touch Targets

All button variants include proper touch targets for mobile accessibility.

## Migration

Old button usage:
```tsx
<Button variant="outline" size="sm" className="w-full touch-target">
```

New standardized usage:
```tsx
<Button {...useButtonVariant('cardAction')}>
```

This ensures consistency while reducing code duplication and improving maintainability.