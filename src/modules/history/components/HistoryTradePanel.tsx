import React from 'react';
import { View, Image, ViewProps, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Swipeable } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import { TradeStatus } from '@generated/gql';
import { TradeUtils } from '@utils/TradeUtils';
import { LocalTrade } from '@types';
import { Typography } from '@components/Typography';
import { Icon } from '@components/Icon';
import { useNavigation } from '@hooks/useNavigation';
import { useCoinIcon } from '@hooks/useCoinIcon';
import { useProviderLogo } from '@hooks/useProviderLogo';
import { KycIcon } from '@components/icons/KycIcon';
import { InsuranceIcon } from '@components/icons/InsuranceIcon';
import { StatusCard } from '@components/StatusCard';

type Props = {
  trade: LocalTrade;
  lastUpdate: number;
  onDelete: () => void;
} & ViewProps;

export const HistoryTradePanel = ({ trade, onDelete, ...rest }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const providerLogo = useProviderLogo(trade.provider, true);
  const coinFromIcon = useCoinIcon(trade.tickerFrom);
  const coinToIcon = useCoinIcon(trade.tickerTo);
  const resolvedStatus = TradeUtils.resolveStatus(trade);

  const renderSwipeActions = () => (
    <TouchableOpacity
      className="p-3 mt-3 rounded-r-lg bg-danger-100 flex-row items-center justify-end"
      onPress={onDelete}
    >
      <Icon name="delete" size={20} />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderSwipeActions} overshootRight={false}>
      <TouchableOpacity
        className="bg-surface-100 rounded-lg flex-row justify-between p-3 mt-3 gap-x-2"
        onPress={() => navigation.navigate('Trade', { id: trade.id })}
        {...rest}
      >
        <View className="justify-between">
          <StatusCard status={resolvedStatus} />
          <View className="flex-row">
            <KycIcon rating={trade.kycRating} />
            <InsuranceIcon rate={trade.insurance} className="ml-1" />
          </View>
        </View>
        <View className="flex-1 gap-y-2">
          <View className="flex-row items-center gap-x-1">
            <Image source={providerLogo} resizeMode="cover" className="rounded h-6 w-6" />
            <View>
              <View className="flex-row items-center">
                <Typography>{trade.provider}</Typography>
                <Icon name="keyboard-arrow-right" size={14} />
              </View>
            </View>
          </View>
          <View>
            <View className="flex-row items-center gap-x-1">
              <Typography className="text-sm text-gray-100">{t('created')}</Typography>
              <Typography className="text-sm text-primary">{dayjs(trade.createdAt).fromNow()}</Typography>
              <Typography className="text-sm text-gray-100">({dayjs(trade.createdAt).format('h:mm:ss A')})</Typography>
            </View>
            {resolvedStatus !== TradeStatus.Expired && resolvedStatus != TradeStatus.Completed && (
              <View className="flex-row items-center gap-x-1 mt-0.5">
                <Typography className="text-sm text-gray-100">{t('tradeExpires')}</Typography>
                <Typography className="text-primary text-sm">{dayjs(trade.expiresAt).fromNow()}</Typography>
                <Typography className="text-sm text-gray-100">
                  ({dayjs(trade.expiresAt).format('h:mm:ss A')})
                </Typography>
              </View>
            )}
          </View>
          <View className="flex-row items-center">
            <View className="flex-row items-center gap-x-1">
              {React.createElement(coinFromIcon, { width: 15, height: 15 })}
              <Typography className="text-sm">{trade.amountFrom}</Typography>
            </View>
            <Icon name="arrow-forward" size={15} className="mx-2 text-primary" />
            <View className="flex-row items-center gap-x-1 flex-1">
              {React.createElement(coinToIcon, { width: 15, height: 15 })}
              <Typography numberOfLines={1} className="text-sm flex-1">
                {trade.amountTo}
              </Typography>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
