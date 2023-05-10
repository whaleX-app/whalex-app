import { useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography';
import { Trade, TradeStatus } from '@generated/gql';
import { TradeUtils } from '@utils/TradeUtils';
import { StatusCard } from '@components/StatusCard';
import { statusColors } from '@config/status-colors';
import { StatusStepper } from './StatusStepper';
import { useUpdate } from '@hooks/useUpdate';

interface Props {
  trade: Trade;
}

export const StatusPanel = ({ trade }: Props) => {
  const { t } = useTranslation();
  const resolvedStatus = TradeUtils.resolveStatus(trade);
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

  useUpdate(60000);

  return (
    <View className="bg-surface-100 px-6 py-4 mt-3 rounded-lg">
      <View className="flex-row items-center justify-center">
        <Typography className="text-gray-100">{t('status')}: </Typography>
        <Icon name="info" size={16} style={{ color: statusColors[resolvedStatus] }} />
        <Typography style={{ color: statusColors[resolvedStatus] }}>
          {' '}
          {t(`statusType.${resolvedStatus.toLowerCase()}`)}
        </Typography>
      </View>
      <StatusStepper status={resolvedStatus} />
      <Typography className="text-gray-100 text-sm text-center mt-1">{statusDescriptions[resolvedStatus]}</Typography>
      <View className="mt-3 flex-row gap-x-4">
        <StatusCard status={resolvedStatus} />
        <View className="mt-1">
          <View className="flex-row items-center gap-x-1">
            <Typography className="text-sm text-gray-100">{t('created')}</Typography>
            <Typography className="text-sm text-primary">{dayjs(trade.createdAt).fromNow()}</Typography>
            <Typography className="text-sm text-gray-100">({dayjs(trade.createdAt).format('h:mm:ss A')})</Typography>
          </View>
          {resolvedStatus !== TradeStatus.Expired && resolvedStatus != TradeStatus.Completed && (
            <View className="flex-row items-center gap-x-1 mt-1">
              <Typography className="text-sm text-gray-100">{t('tradeExpires')}</Typography>
              <Typography className="text-primary text-sm">{dayjs(trade.expiresAt).fromNow()}</Typography>
              <Typography className="text-sm text-gray-100">({dayjs(trade.expiresAt).format('h:mm:ss A')})</Typography>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
