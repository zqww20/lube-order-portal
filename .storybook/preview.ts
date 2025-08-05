import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'brand',
          value: '#001F4F',
        },
      ],
    },
  },
  globalTypes: {
    darkMode: {
      description: 'Toggle dark mode',
      toolbar: {
        title: 'Dark mode',
        icon: 'moon',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;