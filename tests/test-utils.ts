import { coins } from '@config/coins';
import { TradeStatus } from '@generated/gql';
import { LocalTrade, KycRating } from '@types';

export const getCoinByTicker = (ticker: string) => coins.find((coin) => coin.ticker === ticker)!;

export const createTrade = (partialTrade?: Partial<LocalTrade>) =>
  ({
    ...{
      id: 'test-trade',
      createdAt: '2023-04-24T12:18:14Z',
      expiresAt: '2523-04-24T12:18:14Z',
      tickerFrom: 'btc',
      tickerTo: 'xmr',
      addressProvider: 'addressProvider',
      addressUser: 'addressUser',
      amountFrom: 1.53535,
      amountTo: 2.353535,
      networkFrom: 'Mainnet',
      networkTo: 'Mainnet',
      provider: 'Swapuz',
      providerSupportPlatform: '',
      providerSupportUrl: '',
      providerTradeUrl: '',
      providerTradeId: 'providerTradeId',
      status: TradeStatus.Waiting,
      kycRating: 'A',
      insurance: 50,
    },
    ...partialTrade,
  } as LocalTrade);
