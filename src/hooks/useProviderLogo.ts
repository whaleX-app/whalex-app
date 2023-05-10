import { useMemo } from 'react';
import { providerLogoLoaders, providerSquareLogoLoaders } from '@utils/provider-logo-loaders';

export const useProviderLogo = (provider: string, square: boolean = false) =>
  useMemo(() => {
    if (square) {
      if (provider in providerSquareLogoLoaders) {
        return providerSquareLogoLoaders[provider as keyof typeof providerSquareLogoLoaders]();
      }
    } else {
      if (provider in providerLogoLoaders) {
        return providerLogoLoaders[provider as keyof typeof providerLogoLoaders]();
      }
    }
  }, [provider]);
