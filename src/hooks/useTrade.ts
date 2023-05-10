import { useMemo } from 'react';
import { useTradeStore } from '@stores/useTradeStore';
import { TradeUtils } from '@utils/TradeUtils';
import { TradeStatus } from '@generated/gql';
import { apiClient } from '@libs/api-client';

export const useTrade = (id?: string) => {
  const deleteTradeFromStore = useTradeStore((state) => state.deleteTrade);
  const trades = useTradeStore((state) => state.trades);

  const trade = useMemo(() => {
    if (id) {
      return trades.find((trade) => trade.id === id);
    } else {
      // Return most recent ongoing trade.
      const ongoingTrades = trades.filter((trade) => {
        const resolvedStatus = TradeUtils.resolveStatus(trade);

        return resolvedStatus !== TradeStatus.Completed && resolvedStatus !== TradeStatus.Expired;
      });

      return ongoingTrades.shift();
    }
  }, [id, trades]);

  const deleteTrade = () => {
    if (!trade) {
      return false;
    }

    apiClient.deleteTrade({ id: trade.id });
    deleteTradeFromStore(trade);
  };

  return { trade, deleteTrade };
};
