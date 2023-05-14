import { useMemo, ComponentProps } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { TradeStatus } from '@generated/gql';
import { useNavigation } from '@hooks/useNavigation';
import { useRoute } from '@hooks/useRoute';
import { useTrade } from '@hooks/useTrade';
import { Toast } from '@libs/Toast';
import { RootStackParamList } from '@types';
import { Icon } from './Icon';
import { Typography } from './Typography';

interface NavItem {
  label: string;
  route: keyof RootStackParamList;
  icon: ComponentProps<typeof Icon>['name'];
  onPress: () => void;
}

const statusBadgeClassNames: Record<TradeStatus, string> = {
  Waiting: 'bg-white',
  Confirming: 'bg-info-50',
  Sending: 'bg-primary',
  Completed: '',
  Expired: '',
  Unknown: 'bg-danger-50',
};

export const Footer = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { trade } = useTrade();

  const items = useMemo<NavItem[]>(
    () => [
      {
        label: t('trade'),
        route: 'Trade',
        icon: 'home',
        onPress: () => {
          if (trade) {
            navigation.navigate('Trade', { id: trade.id });
          } else {
            Toast.show(t('error.noOngoingTrade'));
          }
        },
      },
      {
        label: t('newTrade'),
        route: 'CreateTrade',
        icon: 'add-circle',
        onPress: () => {
          navigation.navigate('CreateTrade');
        },
      },
      { label: t('history'), route: 'History', icon: 'history', onPress: () => navigation.navigate('History') },
    ],
    [trade, t]
  );

  return (
    <View className="bg-surface-100 py-3 flex-row items-center justify-between px-16">
      {items.map((item, idx) => (
        <TouchableOpacity key={idx} onPress={item.onPress}>
          <View className="relative">
            <Icon
              name={item.icon}
              size={26}
              className={classNames('text-center', route.name === item.route ? 'text-primary' : 'text-gray-50')}
            />
            {item.route === 'Trade' && trade && (
              <View
                className={classNames(
                  'absolute rounded-full h-3 w-3 right-0.5 top-3 border-2 border-black',
                  statusBadgeClassNames[trade.status]
                )}
              ></View>
            )}
          </View>
          <Typography
            className={classNames('text-sm text-center', route.name === item.route ? 'text-primary' : 'text-gray-50')}
          >
            {item.label}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};
