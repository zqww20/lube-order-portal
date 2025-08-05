import { useMemo } from 'react';
import { ButtonProps } from '@/components/ui/button';
import { getButtonProps, ButtonConfigKey } from '@/components/ui/button-variants';

// Hook for consistent button styling across the app
export const useButtonVariant = (
  configKey: ButtonConfigKey,
  overrides?: Partial<ButtonProps>
) => {
  return useMemo(() => getButtonProps(configKey, overrides), [configKey, overrides]);
};