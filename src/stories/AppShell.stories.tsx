import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppShell>;

// Sample content component for testing
const SampleContent = ({ title, description }: { title: string; description: string }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-gray-600 mb-8">{description}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Sample Card {i + 1}</h3>
          <p className="text-gray-600">This is sample content to demonstrate the layout.</p>
        </div>
      ))}
    </div>
  </div>
);

export const GuestShell: Story = {
  args: {
    userRole: 'guest',
    children: (
      <SampleContent 
        title="Guest Portal Dashboard" 
        description="Welcome to the Guest Portal. Browse products and request quotes for cash pickup."
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Guest portal layout with guest-specific navigation and styling. Matches the original GuestLayout component exactly.',
      },
    },
  },
};

export const CustomerShell: Story = {
  args: {
    userRole: 'customer',
    children: (
      <SampleContent 
        title="Customer Portal Dashboard" 
        description="Welcome back! Manage your orders, quotes, and account information."
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Customer portal layout with customer-specific navigation and cart functionality. Matches the original Header component exactly.',
      },
    },
  },
};

export const EmployeeShell: Story = {
  args: {
    userRole: 'employee',
    children: (
      <SampleContent 
        title="Employee Portal Dashboard" 
        description="Employee dashboard with access to all customer quotes, orders, and logistics admin tools."
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Employee portal layout with employee-specific navigation and admin tools. Matches the original EmployeeLayout component exactly.',
      },
    },
  },
};

// Mobile viewport tests
export const GuestShellMobile: Story = {
  ...GuestShell,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Guest portal on mobile viewport to test responsive behavior and mobile navigation.',
      },
    },
  },
};

export const CustomerShellMobile: Story = {
  ...CustomerShell,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Customer portal on mobile viewport to test responsive behavior and mobile navigation.',
      },
    },
  },
};

export const EmployeeShellMobile: Story = {
  ...EmployeeShell,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Employee portal on mobile viewport to test responsive behavior and mobile navigation.',
      },
    },
  },
};