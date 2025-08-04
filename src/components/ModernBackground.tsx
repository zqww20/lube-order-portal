import React from 'react';

interface ModernBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'hero' | 'surface';
  className?: string;
}

const ModernBackground = ({ children, variant = 'default', className = '' }: ModernBackgroundProps) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-hero';
      case 'surface':
        return 'surface-gradient';
      default:
        return 'bg-background';
    }
  };

  return (
    <div className={`${getBackgroundClass()} ${className}`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ModernBackground;