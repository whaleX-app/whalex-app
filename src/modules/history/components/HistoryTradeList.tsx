import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HistoryTradePanel } from './HistoryTradePanel';
import { useTradeStore } from '@stores/useTradeStore';
import { apiClient } from '@libs/api-client';
import { Toast } from '@libs/Toast';
import { LocalTrade } from '@types';
import { useUpdate } from '@hooks/useUpdate';

interface Props {
  trades: LocalTrade[];
}

export const HistoryTradeList = ({ trades }: Props) => {
  const { t } = useTranslation();
  const deleteTradeFromStore = useTradeStore((state) => state.deleteTrade);
  const lastUpdate = useUpdate(60000);

  const deleteTrade = (trade: LocalTrade) => {
    apiClient.deleteTrade({ id: trade.id });
    deleteTradeFromStore(trade);
    Toast.show(t('tradeDeleted'));
  };

  return (
    <View className="pb-4">
      {trades.map((trade) => (
        <HistoryTradePanel key={trade.id} trade={trade} onDelete={() => deleteTrade(trade)} lastUpdate={lastUpdate} />
      ))}
    </View>
  );
};
