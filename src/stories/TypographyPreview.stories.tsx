import type { Meta, StoryObj } from '@storybook/react';

const TypographyPreview = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Typography Scale Preview</h1>
        <p className="text-gray-600">Before vs. After comparison for Visual Refresh v2</p>
      </div>

      {/* BEFORE Section */}
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">BEFORE (Current Typography)</h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-heading-1 font-semibold">H1 Heading (32px)</div>
              <code className="text-sm text-gray-500">text-heading-1 font-semibold</code>
            </div>
            
            <div>
              <div className="text-heading-2 font-semibold">H2 Heading (24px)</div>
              <code className="text-sm text-gray-500">text-heading-2 font-semibold</code>
            </div>
            
            <div>
              <div className="text-heading-3 font-semibold">H3 Heading (20px)</div>
              <code className="text-sm text-gray-500">text-heading-3 font-semibold</code>
            </div>
            
            <div>
              <div className="text-heading-4 font-semibold">H4 Heading (18px)</div>
              <code className="text-sm text-gray-500">text-heading-4 font-semibold</code>
            </div>
            
            <div>
              <div className="text-heading-5 font-semibold">H5 Heading (16px)</div>
              <code className="text-sm text-gray-500">text-heading-5 font-semibold</code>
            </div>
            
            <div>
              <div className="text-heading-6 font-semibold">H6 Heading (14px)</div>
              <code className="text-sm text-gray-500">text-heading-6 font-semibold</code>
            </div>
            
            <div className="pt-4 border-t border-yellow-300">
              <div className="text-base leading-relaxed">
                Body text example with current styling. This shows how the existing typography looks with standard line height and spacing.
              </div>
              <code className="text-sm text-gray-500">text-base leading-relaxed</code>
            </div>
          </div>
        </div>

        {/* AFTER Section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">AFTER (Visual Refresh v2 Typography)</h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-h1 font-semibold text-bw-text">H1 Heading (48px)</div>
              <code className="text-sm text-gray-500">text-h1 font-semibold text-bw-text</code>
            </div>
            
            <div>
              <div className="text-h2 font-semibold text-bw-text">H2 Heading (36px)</div>
              <code className="text-sm text-gray-500">text-h2 font-semibold text-bw-text</code>
            </div>
            
            <div>
              <div className="text-h3 font-semibold text-bw-text">H3 Heading (30px)</div>
              <code className="text-sm text-gray-500">text-h3 font-semibold text-bw-text</code>
            </div>
            
            <div>
              <div className="text-h4 font-semibold text-bw-text">H4 Heading (24px)</div>
              <code className="text-sm text-gray-500">text-h4 font-semibold text-bw-text</code>
            </div>
            
            <div>
              <div className="text-h5 font-semibold text-bw-text">H5 Heading (20px)</div>
              <code className="text-sm text-gray-500">text-h5 font-semibold text-bw-text</code>
            </div>
            
            <div>
              <div className="text-h6 font-semibold text-bw-text">H6 Heading (16px)</div>
              <code className="text-sm text-gray-500">text-h6 font-semibold text-bw-text</code>
            </div>
            
            <div className="pt-4 border-t border-green-300">
              <div className="text-base leading-normal text-bw-text">
                Body text example with new styling. This demonstrates the refreshed typography with optimized line height (1.5) and the new Dark Grey color for better readability.
              </div>
              <code className="text-sm text-gray-500">text-base leading-normal text-bw-text</code>
            </div>
          </div>
        </div>

        {/* Color Palette Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Visual Refresh v2 Color Palette</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-16 bg-bw-primary rounded-lg mb-2 border"></div>
              <div className="text-sm font-medium">Deep Navy</div>
              <div className="text-xs text-gray-500">#111D4A</div>
              <code className="text-xs">bg-bw-primary</code>
            </div>
            
            <div className="text-center">
              <div className="w-full h-16 bg-bw-accent rounded-lg mb-2 border"></div>
              <div className="text-sm font-medium">Accent Blue</div>
              <div className="text-xs text-gray-500">#4CC1E5</div>
              <code className="text-xs">bg-bw-accent</code>
            </div>
            
            <div className="text-center">
              <div className="w-full h-16 bg-bw-surface rounded-lg mb-2 border"></div>
              <div className="text-sm font-medium">Mist Grey</div>
              <div className="text-xs text-gray-500">#F2F5F7</div>
              <code className="text-xs">bg-bw-surface</code>
            </div>
            
            <div className="text-center">
              <div className="w-full h-16 bg-bw-text rounded-lg mb-2 border"></div>
              <div className="text-sm font-medium">Dark Grey</div>
              <div className="text-xs text-gray-500">#333333</div>
              <code className="text-xs">bg-bw-text</code>
            </div>
          </div>
        </div>

        {/* Component Examples */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Component Examples with New Tokens</h2>
          
          <div className="space-y-4">
            {/* Button Examples */}
            <div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">Buttons</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-bw-primary text-bw-white rounded-lg transition-all duration-150 ease-in-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-accent">
                  Primary CTA
                </button>
                <button className="px-4 py-2 bg-bw-accent text-bw-white rounded-lg transition-all duration-150 ease-in-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-accent">
                  Accent Button
                </button>
                <button className="px-4 py-2 bg-bw-white text-bw-text border border-gray-200 rounded-lg transition-all duration-150 ease-in-out hover:bg-bw-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-accent">
                  Secondary
                </button>
              </div>
            </div>

            {/* Card Example */}
            <div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">Card with Unified Shadow</h3>
              <div className="bg-bw-white rounded-lg shadow-bw-md p-6 max-w-md">
                <h4 className="text-h4 font-semibold text-bw-text mb-2">Card Title</h4>
                <p className="text-base text-bw-text leading-normal">
                  This card demonstrates the new 4dp unified shadow token and 8px radius with proper color usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof TypographyPreview> = {
  title: 'Design System/Typography Preview',
  component: TypographyPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Preview of typography changes for Visual Refresh v2. Compare before and after styles for sign-off approval.',
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