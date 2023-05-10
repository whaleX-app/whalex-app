import { useMemo } from 'react';
import { coinIconLoaders } from '@utils/coin-icon-loaders';

export const useCoinIcon = (ticker: string) =>
  useMemo<() => JSX.Element>(() => {
    if (ticker in coinIconLoaders) {
      return coinIconLoaders[ticker as keyof typeof coinIconLoaders]().default;
    }
  }, [ticker]);
