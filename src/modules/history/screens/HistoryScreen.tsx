import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Footer } from '@components/Footer';
import { useTradeStore } from '@stores/useTradeStore';
import { HistoryTradeList } from '../components/HistoryTradeList';
import { HistoryTopbar } from '../components/HistoryTopbar';

export const HistoryScreen = () => {
  const trades = useTradeStore((state) => state.trades);
  const sortedTrades = useMemo(
    () => trades.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [trades]
  );

  return (
    <View className="flex-1">
      <ScrollView className="px-6 bg-black flex-1">
        <HistoryTopbar />
        <HistoryTradeList trades={sortedTrades} />
      </ScrollView>
      <Footer />
    </View>
  );
};
