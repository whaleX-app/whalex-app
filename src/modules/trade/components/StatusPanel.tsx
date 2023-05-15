import { useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography';
import { Trade, TradeStatus } from '@generated/gql';
import { StatusCard } from '@components/StatusCard';
import { statusColors } from '@config/status-colors';
import { useUpdate } from '@hooks/useUpdate';
import { TradeUtils } from '@utils/TradeUtils';
import { StatusStepper } from './StatusStepper';

interface Props {
  trade: Trade;
}

export const StatusPanel = ({ trade }: Props) => {
  const { t } = useTranslation();
  const statusDescriptions = useMemo(
    () => ({
      Waiting: t('statusDescription.waiting'),
      Confirming: t('statusDescription.confirming'),
      Sending: t('statusDescription.sending'),
      Completed: t('statusDescription.completed'),
      Expired: t('statusDescription.expired'),
      Unknown: t('unknown'),
    }),
    [t]
  );
  const expiresAt = TradeUtils.resolveExpiresAt(trade.expiresAt);

  useUpdate(60000);

  return (
    <View className="bg-surface-100 px-6 py-4 mt-3 rounded-lg">
      <View className="flex-row items-center justify-center">
        <Typography className="text-gray-100">{t('status')}: </Typography>
        <Icon name="info" size={16} style={{ color: statusColors[trade.status] }} />
        <Typography style={{ color: statusColors[trade.status] }}>
          {' '}
          {t(`statusType.${trade.status.toLowerCase()}`)}
        </Typography>
      </View>
      <StatusStepper status={trade.status} />
      <Typography className="text-gray-100 text-sm text-center mt-1">{statusDescriptions[trade.status]}</Typography>
      <View className="mt-3 flex-row gap-x-4">
        <StatusCard status={trade.status} />
        <View className="mt-1">
          <View className="flex-row items-center gap-x-1">
            <Typography className="text-sm text-gray-100">{t('created')}</Typography>
            <Typography className="text-sm text-primary">{dayjs(trade.createdAt).fromNow()}</Typography>
            <Typography className="text-sm text-gray-100">({dayjs(trade.createdAt).format('h:mm:ss A')})</Typography>
          </View>
          {trade.status !== TradeStatus.Expired && trade.status != TradeStatus.Completed && expiresAt && (
            <View className="flex-row items-center gap-x-1 mt-1">
              <Typography className="text-sm text-gray-100">{t('tradeExpires')}</Typography>
              <Typography className="text-primary text-sm">{expiresAt}</Typography>
              <Typography className="text-sm text-gray-100">({dayjs(trade.expiresAt).format('h:mm:ss A')})</Typography>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
