import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '@/contexts/UserContext';
import AppShell from '@/components/AppShell';

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Unified AppShell component with role-aware navigation, sidebar, breadcrumbs, and persistent state.',
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <UserProvider>
          <Story />
        </UserProvider>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const GuestPortal: Story = {
  name: 'Guest Portal',
  parameters: {
    docs: {
      description: {
        story: 'AppShell in guest mode with teal accents and guest-specific navigation.',
      },
    },
  },
};

export const CustomerPortal: Story = {
  name: 'Customer Portal',
  parameters: {
    docs: {
      description: {
        story: 'AppShell for authenticated customer users with full sidebar navigation.',
      },
    },
  },
  decorators: [
    (Story) => {
      // Mock customer login
      const mockUser = {
        id: 'cust_001',
        username: 'john.smith',
        email: 'john.smith@acmecorp.com',
        role: 'customer' as const,
        customerCode: 'C001',
        permissions: ['read_own', 'create_quotes'],
        preferences: {
          portal: 'customer' as const,
          notifications: true,
          autoSync: false
        }
      };

      return (
        <div style={{ minHeight: '100vh' }}>
          <Story />
        </div>
      );
    },
  ],
};

export const EmployeePortal: Story = {
  name: 'Employee Portal',
  parameters: {
    docs: {
      description: {
        story: 'AppShell for employee users with admin navigation and tools.',
      },
    },
  },
  decorators: [
    (Story) => {
      // Mock employee login
      const mockUser = {
        id: 'emp_001',
        username: 'employee',
        email: 'employee@bluewatergroup.ca',
        role: 'employee' as const,
        permissions: ['read_all', 'write_quotes', 'manage_orders'],
        preferences: {
          portal: 'employee' as const,
          notifications: true,
          autoSync: true
        }
      };

      return (
        <div style={{ minHeight: '100vh' }}>
          <Story />
        </div>
      );
    },
  ],
};

export const WithBreadcrumbs: Story = {
  name: 'With Breadcrumbs',
  parameters: {
    docs: {
      description: {
        story: 'AppShell showing breadcrumb navigation for deep page routes.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export const MobileView: Story = {
  name: 'Mobile View',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'AppShell optimized for mobile devices with collapsible navigation.',
      },
    },
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'AppShell in dark mode with proper contrast and theming.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark" style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};