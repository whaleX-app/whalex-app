import { Trade, TradeStatus } from '@generated/gql';

export class TradeUtils {
  static getUrl(id: string) {
    return `https://trocador.app/en/checkout/${id}`;
  }

  static resolveStatus(trade: Trade) {
    if (trade.status === TradeStatus.Completed) {
      return TradeStatus.Completed;
    }

    if (trade.status === TradeStatus.Expired || new Date() >= new Date(trade.expiresAt)) {
      return TradeStatus.Expired;
    }

    return trade.status;
  }
}
