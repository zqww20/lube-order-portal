import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const VisualRefreshShowcase = () => {
  return (
    <div className="p-8 space-y-8 bg-bw-surface min-h-screen">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-h1 font-bold text-bw-text mb-2">Visual Refresh v2 Showcase</h1>
        <p className="text-base text-bw-text leading-normal">
          Complete component showcase using the new Bluewater design tokens
        </p>
      </div>

      {/* Color Palette Section */}
      <section className="space-y-4">
        <h2 className="text-h2 font-semibold text-bw-text">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-full h-20 bg-bw-primary rounded-lg shadow-bw-md mb-3"></div>
            <div className="text-sm font-medium text-bw-text">Deep Navy</div>
            <div className="text-xs text-gray-500">#111D4A</div>
            <code className="text-xs bg-gray-100 px-1 rounded">bg-bw-primary</code>
          </div>
          
          <div className="text-center">
            <div className="w-full h-20 bg-bw-accent rounded-lg shadow-bw-md mb-3"></div>
            <div className="text-sm font-medium text-bw-text">Accent Blue</div>
            <div className="text-xs text-gray-500">#4CC1E5</div>
            <code className="text-xs bg-gray-100 px-1 rounded">bg-bw-accent</code>
          </div>
          
          <div className="text-center">
            <div className="w-full h-20 bg-bw-surface border border-gray-200 rounded-lg shadow-bw-md mb-3"></div>
            <div className="text-sm font-medium text-bw-text">Mist Grey</div>
            <div className="text-xs text-gray-500">#F2F5F7</div>
            <code className="text-xs bg-gray-100 px-1 rounded">bg-bw-surface</code>
          </div>
          
          <div className="text-center">
            <div className="w-full h-20 bg-bw-text rounded-lg shadow-bw-md mb-3"></div>
            <div className="text-sm font-medium text-bw-text">Dark Grey</div>
            <div className="text-xs text-gray-500">#333333</div>
            <code className="text-xs bg-gray-100 px-1 rounded">bg-bw-text</code>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="space-y-4">
        <h2 className="text-h2 font-semibold text-bw-text">Typography Scale</h2>
        <div className="bg-bw-white rounded-lg shadow-bw-md p-6 space-y-4">
          <div className="text-h1 font-semibold text-bw-text">H1 Heading (48px)</div>
          <div className="text-h2 font-semibold text-bw-text">H2 Heading (36px)</div>
          <div className="text-h3 font-semibold text-bw-text">H3 Heading (30px)</div>
          <div className="text-h4 font-semibold text-bw-text">H4 Heading (24px)</div>
          <div className="text-h5 font-semibold text-bw-text">H5 Heading (20px)</div>
          <div className="text-h6 font-semibold text-bw-text">H6 Heading (16px)</div>
          <div className="text-base text-bw-text leading-normal pt-4 border-t border-gray-200">
            Body text with optimized 1.5 line height for better readability. This demonstrates the refreshed typography system with proper contrast and spacing.
          </div>
        </div>
      </section>

      {/* Button Variations */}
      <section className="space-y-4">
        <h2 className="text-h2 font-semibold text-bw-text">Interactive Elements</h2>
        <div className="bg-bw-white rounded-lg shadow-bw-md p-6 space-y-6">
          
          {/* Primary Actions */}
          <div>
            <h3 className="text-h4 font-medium text-bw-text mb-3">Primary Actions (Deep Navy)</h3>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-bw-primary text-bw-white hover:bg-bw-primary/90 transition-all duration-150 ease-in-out">
                Primary Button
              </Button>
              <Button size="lg" className="bg-bw-primary text-bw-white hover:bg-bw-primary/90 transition-all duration-150 ease-in-out">
                Large Primary
              </Button>
              <Button size="sm" className="bg-bw-primary text-bw-white hover:bg-bw-primary/90 transition-all duration-150 ease-in-out">
                Small Primary
              </Button>
            </div>
          </div>

          {/* Accent Actions */}
          <div>
            <h3 className="text-h4 font-medium text-bw-text mb-3">Accent Actions (Accent Blue)</h3>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-bw-accent text-bw-white hover:bg-bw-accent/90 transition-all duration-150 ease-in-out">
                Accent Button
              </Button>
              <Button variant="outline" className="border-bw-accent text-bw-accent hover:bg-bw-accent hover:text-bw-white transition-all duration-150 ease-in-out">
                Accent Outline
              </Button>
            </div>
          </div>

          {/* Secondary Actions */}
          <div>
            <h3 className="text-h4 font-medium text-bw-text mb-3">Secondary Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-gray-300 text-bw-text hover:bg-bw-surface transition-all duration-150 ease-in-out">
                Secondary
              </Button>
              <Button variant="ghost" className="text-bw-text hover:bg-bw-surface transition-all duration-150 ease-in-out">
                Ghost Button
              </Button>
            </div>
          </div>

          {/* Focus States */}
          <div>
            <h3 className="text-h4 font-medium text-bw-text mb-3">Focus States (2px Accent Blue)</h3>
            <Button className="bg-bw-primary text-bw-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-accent focus-visible:ring-offset-2 transition-all duration-150 ease-in-out">
              Try Tab Focus
            </Button>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="space-y-4">
        <h2 className="text-h2 font-semibold text-bw-text">Form Elements</h2>
        <div className="bg-bw-white rounded-lg shadow-bw-md p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-bw-text mb-1 block">
                Input with Focus Ring
              </label>
              <Input 
                placeholder="Focus me to see accent blue ring"
                className="focus-visible:ring-bw-accent transition-all duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-bw-text mb-1 block">
                Another Input Field
              </label>
              <Input 
                placeholder="Standard input styling"
                className="focus-visible:ring-bw-accent transition-all duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cards and Surfaces */}
      <section className="space-y-4">
        <h2 className="text-h2 font-semibold text-bw-text">Cards & Surfaces</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Card className="bg-bw-white shadow-bw-md transition-all duration-150 ease-in-out hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-h4 text-bw-text">Standard Card</CardTitle>
              <CardDescription className="text-bw-text/70">
                Using unified 4dp shadow token and 8px radius
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base text-bw-text leading-normal">
                This card demonstrates the new design system with proper spacing and shadows.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bw-surface border-0 shadow-bw-md transition-all duration-150 ease-in-out hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-h4 text-bw-text">Surface Card</CardTitle>
              <CardDescription className="text-bw-text/70">
                Using mist grey background
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base text-bw-text leading-normal">
                Alternative surface treatment for varied content hierarchy.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bw-primary text-bw-white shadow-bw-md transition-all duration-150 ease-in-out hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-h4">Primary Card</CardTitle>
              <CardDescription className="text-bw-white/80">
                Deep navy for important content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-normal">
                High-emphasis card for critical information or calls-to-action.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badges and Status */}
      <section className="space-y-4">
        <h2 className="text-h2 font-semibold text-bw-text">Status & Badges</h2>
        <div className="bg-bw-white rounded-lg shadow-bw-md p-6">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-bw-primary text-bw-white">Primary</Badge>
            <Badge className="bg-bw-accent text-bw-white">Accent</Badge>
            <Badge variant="outline" className="border-bw-text text-bw-text">Outline</Badge>
            <Badge variant="secondary" className="bg-bw-surface text-bw-text">Secondary</Badge>
          </div>
        </div>
      </section>

      {/* 8pt Grid Spacing */}
      <section className="space-y-4">
        <h2 className="text-h2 font-semibold text-bw-text">8pt Grid System</h2>
        <div className="bg-bw-white rounded-lg shadow-bw-md p-6">
          <div className="space-y-4">
            <div className="p-2 bg-blue-100 rounded">p-2 (8px)</div>
            <div className="p-4 bg-blue-100 rounded">p-4 (16px)</div>
            <div className="p-6 bg-blue-100 rounded">p-6 (24px)</div>
            <div className="p-8 bg-blue-100 rounded">p-8 (32px)</div>
          </div>
          
          <div className="mt-6 p-2 bg-yellow-100 rounded" data-dense>
            <div className="text-sm text-bw-text">
              <strong>Dense content area:</strong> Uses <code>data-dense</code> attribute with <code>p-2</code> for critical density (tables, filter bars)
            </div>
          </div>
        </div>
      </section>

      {/* Border Treatment */}
      <section className="space-y-4">
        <h2 className="text-h2 font-semibold text-bw-text">Border Treatment</h2>
        <div className="bg-bw-white rounded-lg shadow-bw-md p-6 space-y-4">
          <div className="ring-1 ring-bw-surface p-4 rounded-lg">
            <p className="text-base text-bw-text leading-normal">
              Using <code>ring-1 ring-bw-surface</code> instead of thick borders for subtle separation
            </p>
          </div>
          
          <div className="border border-gray-200 p-4 rounded-lg">
            <p className="text-base text-bw-text leading-normal">
              Traditional border for comparison - <code>border border-gray-200</code>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof VisualRefreshShowcase> = {
  title: 'Design System/Visual Refresh Showcase',
  component: VisualRefreshShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete showcase of all components using the Visual Refresh v2 design tokens and guidelines.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    themes: {
      default: 'dark',
    },
  },
};