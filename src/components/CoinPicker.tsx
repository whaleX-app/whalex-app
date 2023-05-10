import React, { useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity, ViewProps } from 'react-native';
import { coins } from '@config/coins';
import { twConfig } from '@utils/tw-config';
import { Typography } from '@components/Typography';
import { Icon } from '@components/Icon';
import { Coin } from '@types';
import { useCoinIcon } from '@hooks/useCoinIcon';

type Props = {
  coin: Coin;
  onCoinSelect?: (coin: Coin) => void;
  isLocked: boolean;
} & ViewProps;

export const CoinPicker = ({ coin, onCoinSelect, isLocked, ...rest }: Props) => {
  const pickerRef = useRef<Picker<string>>(null);
  const coinIcon = useCoinIcon(coin.ticker);

  return (
    <TouchableOpacity
      className="flex-row items-center gap-x-2 mx-1 h-8"
      disabled={isLocked}
      onPress={() => {
        if (!isLocked) {
          pickerRef.current?.focus();
        }
      }}
      {...rest}
    >
      {React.createElement(coinIcon)}
      <Typography className="text-sm">{coin.name}</Typography>
      {!isLocked && <Icon name="keyboard-arrow-down" size={16} className="text-white ml-auto" />}
      <Picker
        ref={pickerRef}
        style={{ display: 'none' }}
        dropdownIconColor={twConfig.theme.colors.surface['100']}
        selectedValue={coin.name}
        onValueChange={(itemValue) => {
          if (onCoinSelect) {
            onCoinSelect(coins.find((curCoin) => curCoin.name === itemValue)!);
          }
        }}
      >
        {coins.map((coin) => (
          <Picker.Item key={coin.name} label={coin.name} value={coin.name} />
        ))}
      </Picker>
    </TouchableOpacity>
  );
};
