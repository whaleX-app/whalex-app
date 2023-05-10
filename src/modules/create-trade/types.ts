import { Offer, TradeMode } from '@generated/gql';
import { Coin } from '@types';

export interface CreateTradeStep1Result {
  mode: TradeMode;
  coinFrom: Coin;
  coinTo: Coin;
  amountFrom: number;
  amountTo: number;
  offers: Offer[];
  createTradeId: string;
}
