import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { H1, H2, H3, H4, H5, H6, Text, Lead, Caption, Code } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { designTokens } from '@/styles/tokens';

const meta: Meta = {
  title: 'Design System/Component Gallery',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Complete overview of the Bluewater Design System components with design tokens.'
      }
    }
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// COMPONENT GALLERY STORY
// =============================================================================

export const Gallery: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <H1 variant="gradient">Bluewater Design System</H1>
        <Lead>A comprehensive design system ensuring visual consistency across all Bluewater portals.</Lead>
      </div>

      {/* Typography Section */}
      <section className="space-y-6">
        <H2>Typography</H2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <H1>Heading 1 - Main Page Titles</H1>
            <H2>Heading 2 - Section Headers</H2>
            <H3>Heading 3 - Subsection Headers</H3>
            <H4>Heading 4 - Component Titles</H4>
            <H5>Heading 5 - Small Titles</H5>
            <H6>Heading 6 - Labels & Captions</H6>
          </div>
          
          <div className="space-y-3">
            <Text size="xl">Extra Large Text - Hero descriptions</Text>
            <Text size="lg">Large Text - Important content</Text>
            <Text size="base">Base Text - Regular body content</Text>
            <Text size="sm">Small Text - Secondary information</Text>
            <Text size="xs">Extra Small Text - Fine print</Text>
          </div>

          <div className="space-y-2">
            <Lead>Lead text for introductory paragraphs and important descriptions.</Lead>
            <Caption>Caption text for image descriptions and metadata.</Caption>
            <Text>Regular paragraph text with <Code>inline code</Code> and normal formatting.</Text>
          </div>
        </div>
      </section>

      {/* Color System */}
      <section className="space-y-6">
        <H2>Color System</H2>
        
        <div className="space-y-4">
          <div>
            <H4>Brand Colors</H4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div className="space-y-2">
                <div className="h-12 bg-primary rounded-md"></div>
                <Caption>Primary (Navy)</Caption>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-secondary rounded-md"></div>
                <Caption>Secondary (Blue)</Caption>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-brand-red rounded-md"></div>
                <Caption>Brand Red</Caption>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-accent rounded-md"></div>
                <Caption>Accent</Caption>
              </div>
            </div>
          </div>

          <div>
            <H4>Status Colors</H4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div className="space-y-2">
                <div className="h-12 bg-status-success rounded-md"></div>
                <Caption>Success</Caption>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-status-warning rounded-md"></div>
                <Caption>Warning</Caption>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-status-error rounded-md"></div>
                <Caption>Error</Caption>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-status-info rounded-md"></div>
                <Caption>Info</Caption>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <H2>Buttons</H2>
        
        <div className="space-y-4">
          <div>
            <H4>Variants</H4>
            <div className="flex flex-wrap gap-3 mt-3">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="brand-red">Brand Red</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div>
            <H4>Sizes</H4>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large (Touch Friendly)</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="space-y-6">
        <H2>Form Elements</H2>
        
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Text size="sm" weight="medium">Text Input</Text>
            <Input placeholder="Enter your text here..." />
          </div>
          
          <div className="space-y-2">
            <Text size="sm" weight="medium">Email Input</Text>
            <Input type="email" placeholder="your.email@example.com" />
          </div>

          <div className="space-y-2">
            <Text size="sm" weight="medium">Disabled Input</Text>
            <Input placeholder="Disabled input" disabled />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <H2>Cards</H2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>
                A simple card with header, content, and footer sections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text>This is the main content area of the card. Cards provide elevation and grouping for related content.</Text>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>
                This card demonstrates hover effects and enhanced shadows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Text>Cards can contain any content including other components.</Text>
                <div className="flex gap-2">
                  <Badge variant="secondary">Feature</Badge>
                  <Badge variant="outline">Status</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Spacing Examples */}
      <section className="space-y-6">
        <H2>Spacing System</H2>
        
        <div className="space-y-4">
          <Text>Our 8px grid system provides consistent spacing throughout the interface:</Text>
          
          <div className="space-y-2">
            {Object.entries({
              'xs (8px)': 'xs',
              'sm (12px)': 'sm', 
              'md (16px)': 'md',
              'lg (24px)': 'lg',
              'xl (32px)': 'xl',
              '2xl (48px)': '2xl'
            }).map(([label, size]) => (
              <div key={size} className="flex items-center gap-4">
                <Caption className="w-20">{label}</Caption>
                <div className={`h-4 bg-primary rounded space-x-${size}`} style={{width: `${parseInt(label.match(/\d+/)?.[0] || '8')}px`}}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Tokens Reference */}
      <section className="space-y-6">
        <H2>Design Tokens</H2>
        
        <div className="bg-muted/50 p-6 rounded-lg">
          <H4>Token Categories</H4>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <Text weight="medium">Colors</Text>
              <Caption>Brand, semantic, neutral, and status colors</Caption>
            </div>
            <div>
              <Text weight="medium">Typography</Text>
              <Caption>Font families, sizes, weights, and responsive scales</Caption>
            </div>
            <div>
              <Text weight="medium">Spacing</Text>
              <Caption>8px grid system with semantic tokens</Caption>
            </div>
            <div>
              <Text weight="medium">Elevation</Text>
              <Caption>Shadow system for depth and hierarchy</Caption>
            </div>
            <div>
              <Text weight="medium">Radius</Text>
              <Caption>Border radius for component consistency</Caption>
            </div>
            <div>
              <Text weight="medium">Transitions</Text>
              <Caption>Duration and timing for smooth interactions</Caption>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
};

// =============================================================================
// TOKEN SHOWCASE STORIES
// =============================================================================

export const ColorTokens: Story = {
  render: () => (
    <div className="space-y-8">
      <H1>Color Tokens</H1>
      
      {Object.entries(designTokens.colors).map(([category, colors]) => (
        <div key={category} className="space-y-4">
          <H3 className="capitalize">{category} Colors</H3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {typeof colors === 'object' && Object.entries(colors).map(([name, value]) => (
              <div key={name} className="space-y-2">
                <div 
                  className="h-16 rounded-md border"
                  style={{ backgroundColor: typeof value === 'string' ? value : value.DEFAULT }}
                ></div>
                <div>
                  <Text size="sm" weight="medium">{name}</Text>
                  <Caption>{typeof value === 'string' ? value : value.DEFAULT}</Caption>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-8">
      <H1>Typography Scale</H1>
      
      <div className="space-y-6">
        <H2>Headings</H2>
        <div className="space-y-4">
          {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((level) => (
            <div key={level} className="flex items-baseline gap-4">
              <Code className="w-8 text-xs">{level}</Code>
              <Text className={`text-${level}`}>{level.toUpperCase()} - Sample heading text</Text>
            </div>
          ))}
        </div>

        <H2>Body Text</H2>
        <div className="space-y-4">
          {Object.entries(designTokens.typography.fontSize).map(([name, size]) => (
            <div key={name} className="flex items-baseline gap-4">
              <Code className="w-16 text-xs">{name}</Code>
              <Text style={{ fontSize: size }}>Sample text at {name} size</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};