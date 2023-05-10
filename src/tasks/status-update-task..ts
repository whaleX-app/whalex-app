import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import { TradeStatus } from '@generated/gql';
import { apiClient } from '@libs/api-client';
import { useTradeStore } from '@stores/useTradeStore';
import i18n from '@libs/i18n';

export const STATUS_UPDATE_TASK = 'update-status-task';

export const statusUpdateTaskHandler = async () => {
  const trades = useTradeStore.getState().trades;
  const upsertTrade = useTradeStore.getState().upsertTrade;
  let updateFound = false;

  const promises = trades.map(async (trade) => {
    if (trade.status === TradeStatus.Completed || trade.status === TradeStatus.Expired) {
      return;
    }

    const response = await apiClient.trade({ id: trade.id });
    const serverTrade = response.trade;

    if (trade.status !== serverTrade.status) {
      upsertTrade({ ...trade, ...serverTrade });
      updateFound = true;

      if (serverTrade.status === TradeStatus.Completed) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: i18n.t('notification.tradeCompleted', { id: trade.id }),
            data: { id: trade.id },
          },
          trigger: {
            seconds: 1,
          },
        });
      }
    }
  });

  await Promise.all(promises);

  return updateFound ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
};

TaskManager.defineTask(STATUS_UPDATE_TASK, statusUpdateTaskHandler);

BackgroundFetch.registerTaskAsync(STATUS_UPDATE_TASK, {
  minimumInterval: 60 * 2,
  stopOnTerminate: false,
  startOnBoot: true,
});
