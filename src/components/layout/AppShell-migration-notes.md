# AppShell Migration Notes

## Visual Preservation Strategy

The AppShell component was created to exactly match the visual appearance of the original portal-specific layouts:

### Original Components Replaced:
- `src/components/Header.tsx` (Customer portal)
- `src/components/EmployeeLayout.tsx` (Employee portal)  
- `src/components/GuestLayout.tsx` (Guest portal)

### Styling Preservation:

#### Exact CSS Classes Copied:
- Header: `fixed top-0 left-0 right-0 z-50 w-full bg-gradient-brand shadow-brand backdrop-blur-sm`
- Container: `container mx-auto px-4`
- Height: `h-16` for header
- Logo: `h-10 w-auto object-contain`
- Badge: `bg-secondary text-secondary-foreground`
- Navigation active: `text-white font-semibold border-b-2 border-accent`
- Navigation inactive: `text-white/90 hover:text-white hover:text-accent`
- Mobile nav: `md:hidden border-t border-white/20 bg-brand`
- Buttons: `text-white hover:bg-white/10 border border-white/30`

#### Background Classes by Role:
- Guest: `min-h-screen bg-gradient-subtle`
- Customer/Employee: `min-h-screen bg-background`

#### Content Wrapper Classes:
- Guest: `container mx-auto px-4 py-8` (matches original)
- Customer/Employee: No wrapper (matches original)

### Duplicated Utility Classes Found:

#### Navigation Styling (appears in all 3 layouts):
```css
px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2
```

#### Mobile Menu Button (slight variations):
```css
md:hidden text-white hover:bg-white/10
```

#### Dropdown Menu Structure (consistent across all):
```css
flex items-center w-full
```

#### Active State Indicators (consistent):
```css
border-b-2 border-accent
bg-white/10 text-white font-semibold
```

### Feature Flag Implementation:

The AppShell supports a feature flag `NEXT_PUBLIC_NEW_SHELL` (default: false) to enable gradual rollout.

### Headless UI Integration:

- Added `@headlessui/react ^1.7.0` for mobile menu collapse
- Uses `Disclosure.Panel` for mobile navigation
- Preserves all original mobile menu behavior

### Business Logic Preservation:

- All SAP API integration points remain untouched
- Cart state management unchanged
- Authentication flows preserved
- Route structures maintained exactly

### Bundle Size Impact:

- Estimated increase: ~8kB gzipped (well under 20kB limit)
- Consolidates 3 separate layout components into 1
- Reduces overall bundle size through deduplication

### Testing Checklist:

- [ ] Visual diff ≤ 1% for all three portal types
- [ ] Mobile navigation works identically 
- [ ] Cart functionality preserved (guest/customer)
- [ ] Employee navigation buttons work correctly
- [ ] Dropdown menus function identically
- [ ] localStorage persistence for mobile menu state
- [ ] All existing routes render correctly
- [ ] No regression in Jest/Playwright tests

### Cleanup Needed After Migration:

1. Remove duplicated utility class patterns:
   - Extract navigation styling to design system
   - Consolidate mobile menu button variants
   - Create reusable dropdown menu components

2. Remove old layout files:
   - `src/components/Header.tsx`
   - `src/components/EmployeeLayout.tsx`
   - `src/components/GuestLayout.tsx`

3. Update import statements across all pages that reference the old components.