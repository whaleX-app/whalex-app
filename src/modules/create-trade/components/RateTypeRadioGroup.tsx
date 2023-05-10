import { ViewProps } from 'react-native';
import { RadioGroup } from '@components/RadioGroup';
import { OfferRateType } from '@generated/gql';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

interface Props extends ViewProps {
  rateType: OfferRateType;
  onSelect: (mrateTypede: OfferRateType) => void;
}

export const RateTypeRadioGroup = ({ rateType, onSelect, ...rest }: Props) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      {
        label: t('rateType.floating'),
        value: OfferRateType.Floating,
      },
      { label: t('rateType.fixed'), value: OfferRateType.Fixed },
    ],
    [t]
  );

  return <RadioGroup options={options} selectedOption={rateType} onSelect={onSelect} {...rest} />;
};
