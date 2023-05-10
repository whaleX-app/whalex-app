import { View, ViewProps, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Typography';
import { Coin } from '@types';
import { Icon } from '@components/Icon';
import { Field } from '@components/Field';
import { CoinPicker } from './CoinPicker';
import { Ref } from 'react';

type Props = {
  type: 'send' | 'receive';
  coin: Coin;
  amount?: number;
  amountInputRef?: Ref<TextInput>;
  isAmountLocked: boolean;
  isCoinLocked: boolean;
  onCoinUpdate?: (coin: Coin) => void;
  onAmountUpdate?: (amount: number | undefined) => void;
} & ViewProps;

export const CoinInput = ({
  coin,
  type,
  amount,
  isAmountLocked,
  amountInputRef,
  isCoinLocked,
  onCoinUpdate,
  onAmountUpdate,
  ...rest
}: Props) => {
  const { t } = useTranslation();

  return (
    <Field {...rest}>
      <View className="flex-1 pt-1">
        <View className="flex-row items-center">
          <Typography className="text-sm text-gray-50 ">{type === 'send' ? t('youSend') : t('youReceive')}</Typography>
          {isAmountLocked && <Icon name="lock" size={10} className="text-gray-50 ml-0.5" />}
        </View>
        <TextInput
          ref={amountInputRef}
          editable={!isAmountLocked}
          keyboardType="numeric"
          className="font-sans text-primary flex-1"
          value={amount?.toString()}
          onChangeText={(text) => {
            if (onAmountUpdate) {
              onAmountUpdate(text ? parseFloat(text) : undefined);
            }
          }}
        />
      </View>
      <CoinPicker coin={coin} onCoinSelect={onCoinUpdate} isLocked={isCoinLocked} />
    </Field>
  );
};
