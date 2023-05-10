import { useState } from 'react';
import { View, ViewProps, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Typography';
import { Icon } from '@components/Icon';
import { Input } from '@components/Input';
import { Coin } from '@types';

interface Props extends ViewProps {
  address: string;
  coin: Coin;
  onChange: (address: string) => void;
}

export const RefundAddressInput = ({ address, coin, onChange, ...rest }: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="py-2" {...rest}>
      <TouchableOpacity className="flex-row items-center justify-center gap-x-1" onPress={() => setIsOpen(!isOpen)}>
        <Icon name="info" size={16} className="text-gray-50" />
        <Typography className="text-gray-50">{t('refundAddressToggle')}</Typography>
        <Icon name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={16} className="text-gray-50" />
      </TouchableOpacity>
      {isOpen && (
        <Input
          className="mt-2"
          label={`${t('refundAddress')} (${coin.ticker.toUpperCase()})`}
          value={address}
          onChange={onChange}
        />
      )}
    </View>
  );
};
