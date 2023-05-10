import { useMemo, useState } from 'react';
import { TouchableOpacity, View, ViewProps, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Offer, OfferRateType, TradeMode } from '@generated/gql';
import { Typography } from '@components/Typography';
import { Icon } from '@components/Icon';
import { Tooltip } from '@components/Tooltip';
import { InsuranceIcon } from '@components/icons/InsuranceIcon';
import { KycIcon } from '@components/icons/KycIcon';
import { providerSquareLogoLoaders } from '@utils/provider-logo-loaders';
import { KycRating } from '@types';
import { RateTypeRadioGroup } from './RateTypeRadioGroup';
import { KycModal } from './KycModal';

interface Props extends ViewProps {
  offers: Offer[];
  selectedOffer?: Offer;
  tradeMode: TradeMode;
  onSelect: (offer: Offer) => void;
}

export const OffersTable = ({ selectedOffer, offers, tradeMode, onSelect, ...rest }: Props) => {
  const { t } = useTranslation();
  const [showKycModal, setShowKycModal] = useState(false);
  const [rateType, setRateType] = useState<OfferRateType>(OfferRateType.Floating);

  const filteredOffers = useMemo(() => {
    if (tradeMode === TradeMode.Payment) {
      return offers;
    }
    return offers.filter((offer) => offer.rateType === rateType);
  }, [rateType]);

  return (
    <View className="pb-5" {...rest}>
      <KycModal isOpen={showKycModal} onClose={() => setShowKycModal(false)} />
      {tradeMode === TradeMode.Standard && <RateTypeRadioGroup rateType={rateType} onSelect={setRateType} />}
      <View className="border rounded-lg mt-2">
        <View className="flex-row items-center p-2 bg-surface-50 rounded-t-lg">
          <View className="basis-[35%] p-0">
            <Typography className="text-sm">{t('provider')}</Typography>
          </View>
          <View className="basis-[30%] p-0">
            <Typography className="text-sm">{t('rate')}</Typography>
          </View>
          <View className="basis-[20%] p-0">
            <Typography className="text-sm">{t('spread')}</Typography>
          </View>
          <TouchableOpacity
            className="basis-[15%] p-0 flex-row items-center gap-x-1"
            onPress={() => setShowKycModal(true)}
          >
            <Typography className="text-sm">KYC</Typography>
            <Icon name="info" size={14} />
          </TouchableOpacity>
        </View>
        {filteredOffers.map((offer, idx) => (
          <TouchableOpacity
            key={offer.provider}
            className={classNames(
              'flex-row p-2 items-center',
              offer.provider === selectedOffer?.provider && offer.rateType === selectedOffer.rateType
                ? 'bg-primary'
                : 'bg-surface-100',
              {
                'rounded-b-lg': idx === filteredOffers.length - 1,
              }
            )}
            onPress={() => onSelect(offer)}
          >
            <View className="flex-row items-center gap-x-1 basis-[35%]">
              {offer.provider in providerSquareLogoLoaders && (
                <Image
                  source={providerSquareLogoLoaders[offer.provider as keyof typeof providerSquareLogoLoaders]()}
                  className="h-4 w-4"
                  resizeMode="contain"
                />
              )}

              <Typography className="text-sm">{offer.provider}</Typography>
            </View>
            <Typography className="basis-[30%] text-sm flex-1" numberOfLines={1}>
              {offer.amount}
            </Typography>
            <Typography className="basis-[20%] text-sm">{offer.waste}%</Typography>
            <Tooltip
              content={`Trocador insurance: ${offer.insurance}%`}
              className="basis-[15%] text-sm flex-row items-center"
            >
              <KycIcon rating={offer.kycRating as KycRating} className="mr-1" />
              <InsuranceIcon rate={offer.insurance} />
            </Tooltip>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
