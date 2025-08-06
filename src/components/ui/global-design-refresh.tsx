/**
 * Global Design Refresh v2 Component
 * 
 * This component provides global CSS overrides to ensure Visual Refresh v2
 * is applied consistently across the entire application. It uses CSS-in-JS
 * to override any remaining hardcoded colors with design tokens.
 */

import React from 'react';

export const GlobalDesignRefresh: React.FC = () => {
  React.useEffect(() => {
    // Create style element for global overrides
    const styleElement = document.createElement('style');
    styleElement.id = 'global-design-refresh-v2';
    
    styleElement.textContent = `
      /* Visual Refresh v2 - Global Color Overrides */
      
      /* Override any remaining hardcoded grays with design tokens */
      .text-gray-900 { color: hsl(225 65% 17%) !important; } /* bw-text */
      .text-gray-800 { color: hsl(225 65% 17%) !important; }
      .text-gray-700 { color: hsl(225 65% 17% / 0.9) !important; }
      .text-gray-600 { color: hsl(225 65% 17% / 0.7) !important; }
      .text-gray-500 { color: hsl(225 65% 17% / 0.6) !important; }
      .text-gray-400 { color: hsl(225 65% 17% / 0.5) !important; }
      
      .bg-gray-50 { background-color: hsl(210 33% 96%) !important; } /* bw-surface */
      .bg-gray-100 { background-color: hsl(210 33% 96%) !important; }
      
      .border-gray-200 { border-color: hsl(210 33% 96%) !important; }
      .border-gray-300 { border-color: hsl(210 33% 96%) !important; }
      
      /* Override hardcoded blues with design tokens */
      .text-blue-600 { color: hsl(192 77% 59%) !important; } /* bw-accent */
      .text-blue-700 { color: hsl(192 77% 59%) !important; }
      .bg-blue-50 { background-color: hsl(192 77% 59% / 0.1) !important; }
      .border-blue-200 { border-color: hsl(192 77% 59% / 0.2) !important; }
      
      /* Override hardcoded greens with status tokens */
      .text-green-600 { color: hsl(var(--success)) !important; }
      .text-green-700 { color: hsl(var(--success)) !important; }
      .text-green-800 { color: hsl(var(--success)) !important; }
      .bg-green-50 { background-color: hsl(var(--success) / 0.1) !important; }
      .border-green-200 { border-color: hsl(var(--success) / 0.2) !important; }
      
      /* Override hardcoded yellows with warning tokens */
      .text-yellow-600 { color: hsl(var(--warning)) !important; }
      .text-yellow-700 { color: hsl(var(--warning)) !important; }
      .bg-yellow-50 { background-color: hsl(var(--warning) / 0.1) !important; }
      .border-yellow-200 { border-color: hsl(var(--warning) / 0.2) !important; }
      
      /* Override hardcoded reds with error tokens */
      .text-red-600 { color: hsl(var(--destructive)) !important; }
      .text-red-700 { color: hsl(var(--destructive)) !important; }
      .bg-red-50 { background-color: hsl(var(--destructive) / 0.1) !important; }
      .border-red-200 { border-color: hsl(var(--destructive) / 0.2) !important; }
      
      /* Override hardcoded purples with primary tokens */
      .text-purple-600 { color: hsl(225 65% 17%) !important; } /* bw-primary */
      .text-purple-700 { color: hsl(225 65% 17%) !important; }
      .bg-purple-50 { background-color: hsl(225 65% 17% / 0.1) !important; }
      .border-purple-200 { border-color: hsl(225 65% 17% / 0.2) !important; }
      
      /* Override hardcoded oranges with warning tokens */
      .text-orange-600 { color: hsl(var(--warning)) !important; }
      .text-orange-700 { color: hsl(var(--warning)) !important; }
      
      /* Apply unified shadow to all cards */
      .shadow-lg,
      .shadow-md,
      .shadow-sm {
        box-shadow: 0 4px 6px -1px hsl(225 65% 17% / 0.1), 0 2px 4px -2px hsl(225 65% 17% / 0.1) !important;
      }
      
      /* Apply consistent border radius */
      .rounded-lg,
      .rounded-md {
        border-radius: 8px !important;
      }
      
      /* Ensure transitions use the standard 150ms ease-in-out */
      .transition-all,
      .transition-colors,
      .transition-transform,
      .transition-opacity {
        transition-duration: 150ms !important;
        transition-timing-function: ease-in-out !important;
      }
      
      /* Focus rings should use accent color */
      .focus\\:ring-2,
      .focus-visible\\:ring-2 {
        --tw-ring-color: hsl(192 77% 59%) !important; /* bw-accent */
      }
      
      /* Ensure button hover states use proper colors */
      .hover\\:bg-primary:hover {
        background-color: hsl(225 65% 17%) !important; /* bw-primary */
      }
      
      .hover\\:text-accent:hover {
        color: hsl(192 77% 59%) !important; /* bw-accent */
      }
      
      /* Override any remaining hardcoded text colors in specific contexts */
      h1, h2, h3, h4, h5, h6 {
        color: hsl(225 65% 17%) !important; /* bw-text */
      }
      
      /* Ensure charts use design tokens */
      .recharts-cartesian-axis-tick text,
      .recharts-legend-wrapper text {
        fill: hsl(225 65% 17% / 0.7) !important;
      }
      
      /* Mobile optimizations */
      @media (max-width: 768px) {
        /* Ensure touch targets are accessible */
        button, 
        .touch-target,
        [role="button"] {
          min-height: 44px !important;
          min-width: 44px !important;
        }
        
        /* Increase padding for mobile */
        .mobile-padding {
          padding: 1rem !important;
        }
      }
    `;
    
    // Remove existing style if it exists
    const existingStyle = document.getElementById('global-design-refresh-v2');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Add the new styles
    document.head.appendChild(styleElement);
    
    // Cleanup function
    return () => {
      const styleElement = document.getElementById('global-design-refresh-v2');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);
  
  return null; // This component only adds global styles
};

export default GlobalDesignRefresh;