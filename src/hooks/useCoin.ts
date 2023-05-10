import { useMemo } from 'react';
import { coins } from '@config/coins';

export const useCoin = (ticker: string, network: string) =>
  useMemo(() => coins.find((coin) => coin.network === network && coin.ticker == ticker)!, [ticker, network]);
