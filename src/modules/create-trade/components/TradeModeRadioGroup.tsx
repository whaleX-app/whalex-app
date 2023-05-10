import { ViewProps } from 'react-native';
import { useMemo } from 'react';
import { RadioGroup } from '@components/RadioGroup';
import { TradeMode } from '@generated/gql';
import { useTranslation } from 'react-i18next';

interface Props extends ViewProps {
  mode: TradeMode;
  onSelect: (mode: TradeMode) => void;
  disabled: boolean;
}

export const TradeModeRadioGroup = ({ mode, onSelect, ...rest }: Props) => {
  const { t } = useTranslation();

  const choices = useMemo(
    () => [
      {
        label: t('tradeMethod.standard'),
        value: TradeMode.Standard,
      },
      { label: t('tradeMethod.payment'), value: TradeMode.Payment },
    ],
    [t]
  );

  return <RadioGroup options={choices} selectedOption={mode} onSelect={onSelect} {...rest} />;
};
