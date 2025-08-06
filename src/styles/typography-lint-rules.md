# Typography Lint Rules

## Stylelint Configuration (To be added)

To enforce the centralized typography system and prevent raw font-size declarations outside of tokens, add the following Stylelint rule to your configuration:

```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "font-size": ["/^(?!var\\(--[a-z-]+\\)).*$/", "!important"]
    },
    "custom-property-pattern": {
      "font-size": "^(micro|caption|body|h[1-6]|display)$"
    }
  },
  "customSyntax": "postcss-scss"
}
```

## Implementation Notes

1. **Add to package.json**:
   ```json
   {
     "devDependencies": {
       "stylelint": "^15.0.0",
       "stylelint-config-standard": "^30.0.0"
     },
     "scripts": {
       "lint:css": "stylelint 'src/**/*.{css,scss,tsx}'"
     }
   }
   ```

2. **Create .stylelintrc.json**:
   ```json
   {
     "extends": ["stylelint-config-standard"],
     "rules": {
       "declaration-property-value-disallowed-list": {
         "font-size": ["/^(?!(var\\(--[a-z-]+\\)|inherit|initial|unset|revert)).*$/"]
       }
     }
   }
   ```

3. **Add to CI/CD pipeline**:
   ```yaml
   - name: Lint CSS
     run: npm run lint:css
   ```

## Allowed Font Size Usage

✅ **Allowed:**
- `font-size: var(--font-size-h1)`
- `@apply text-h1`
- Using Typography components: `<H1>`, `<P>`, etc.

❌ **Not Allowed:**
- `font-size: 24px`
- `font-size: 1.5rem`
- `text-[20px]` (arbitrary values)

## Migration Guide

Replace raw font-size declarations with typography tokens:

```css
/* Before */
.title { font-size: 24px; }
.body { font-size: 16px; }
.caption { font-size: 14px; }

/* After */
.title { @apply text-h4; }
.body { @apply text-body; }
.caption { @apply text-caption; }
```

Or use Typography components:
```tsx
// Before
<h1 style={{ fontSize: '24px' }}>Title</h1>

// After
<H4>Title</H4>
```