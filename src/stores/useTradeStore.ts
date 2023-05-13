import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalTrade } from '@types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TradeState {
  trades: LocalTrade[];
  upsertTrade: (trade: LocalTrade) => void;
  deleteTrade: (trade: LocalTrade) => void;
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      trades: [],
      upsertTrade: (trade) =>
        set((state) => ({ trades: [...state.trades.filter((existingTrade) => existingTrade.id !== trade.id), trade] })),
      deleteTrade: (trade) =>
        set((state) => ({ trades: state.trades.filter((storeTrade) => storeTrade.id !== trade.id) })),
    }),
    { name: 'trade-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
);
