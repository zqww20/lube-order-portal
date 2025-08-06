import type { Meta, StoryObj } from '@storybook/react';
import { Display, H1, H2, H3, H4, H5, H6, P, Caption, Micro } from '../components/typography/Typography';
import { typographyTokens } from '../styles/typography';

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A centralized typography system using the Minor Third scale (1.2 ratio) with base size 16px.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold mb-6">Typography Scale</h1>
        <p className="text-muted-foreground mb-8">
          Minor Third scale (1.2 ratio) starting from 16px base size. 
          Each step is 1.2× larger than the previous one.
        </p>
      </div>

      <div className="space-y-8">
        {/* Display */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">Display</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.display}</Caption>
          </div>
          <Display>The quick brown fox jumps over the lazy dog</Display>
        </div>

        {/* H1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">H1</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.h1}</Caption>
          </div>
          <H1>The quick brown fox jumps over the lazy dog</H1>
        </div>

        {/* H2 */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">H2</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.h2}</Caption>
          </div>
          <H2>The quick brown fox jumps over the lazy dog</H2>
        </div>

        {/* H3 */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">H3</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.h3}</Caption>
          </div>
          <H3>The quick brown fox jumps over the lazy dog</H3>
        </div>

        {/* H4 */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">H4</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.h4}</Caption>
          </div>
          <H4>The quick brown fox jumps over the lazy dog</H4>
        </div>

        {/* H5 */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">H5</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.h5}</Caption>
          </div>
          <H5>The quick brown fox jumps over the lazy dog</H5>
        </div>

        {/* H6 */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">H6</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.h6}</Caption>
          </div>
          <H6>The quick brown fox jumps over the lazy dog</H6>
        </div>

        {/* Body */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">Body</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.body}</Caption>
          </div>
          <P>The quick brown fox jumps over the lazy dog. This is regular body text used for main content and descriptions.</P>
        </div>

        {/* Caption */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">Caption</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.caption}</Caption>
          </div>
          <Caption>The quick brown fox jumps over the lazy dog</Caption>
        </div>

        {/* Micro */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Caption className="w-20 text-right">Micro</Caption>
            <Caption className="w-24 text-muted-foreground">{typographyTokens.fontSize.micro}</Caption>
          </div>
          <Micro>The quick brown fox jumps over the lazy dog</Micro>
        </div>
      </div>

      <div className="pt-8 border-t">
        <H3 className="mb-4">Usage Examples</H3>
        <div className="space-y-6">
          <div>
            <H4 className="mb-2">Page Title</H4>
            <H1>Dashboard Overview</H1>
            <P className="mt-2">Welcome to your dashboard. Here's an overview of your account activity.</P>
          </div>
          
          <div>
            <H4 className="mb-2">Section with Caption</H4>
            <H2>Recent Activity</H2>
            <Caption>Last updated 5 minutes ago</Caption>
          </div>
          
          <div>
            <H4 className="mb-2">Card Title</H4>
            <H5>System Status</H5>
            <P>All systems are operational.</P>
            <Micro>Status checked at 10:30 AM</Micro>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Components: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <H2>Typography Components</H2>
      <P>Individual typography components with their default styling:</P>
      
      <div className="space-y-4">
        <Display>Display Component</Display>
        <H1>H1 Component</H1>
        <H2>H2 Component</H2>
        <H3>H3 Component</H3>
        <H4>H4 Component</H4>
        <H5>H5 Component</H5>
        <H6>H6 Component</H6>
        <P>P Component for body text</P>
        <Caption>Caption Component for helper text</Caption>
        <Micro>Micro Component for small text</Micro>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <H2>Typography Variants</H2>
      <P>Components can be customized with additional classes:</P>
      
      <div className="space-y-4">
        <H1 className="text-primary">H1 with primary color</H1>
        <H2 className="text-muted-foreground">H2 with muted color</H2>
        <P className="font-semibold">Bold body text</P>
        <Caption className="text-destructive">Error caption</Caption>
        <Micro className="text-success">Success micro text</Micro>
      </div>
    </div>
  ),
};