import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ClientError } from 'graphql-request';
import { Typography } from '@components/Typography';
import { KycRating } from '@types';
import { Icon } from '@components/Icon';
import { Toast } from '@libs/Toast';
import { apiClient } from '@libs/api-client';
import { Offer, Trade, TradeMode } from '@generated/gql';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { CoinInput } from '@components/CoinInput';
import { useTradeStore } from '@stores/useTradeStore';
import { CreateTradeStep2InputSchema } from '../validation/step2';
import { OffersTable } from './OffersTable';
import { RefundAddressInput } from './RefundAddressInput';
import { CreateTradeStep1Result } from '../types';

interface Props {
  step1Result: CreateTradeStep1Result;
  onGoBack: () => void;
  onComplete: (trade: Trade) => void;
}

export const CreateTradeStep2Form = ({ step1Result, onGoBack, onComplete }: Props) => {
  const { t } = useTranslation();
  const addTradeToStore = useTradeStore((state) => state.upsertTrade);
  const [isLoading, setIsLoading] = useState(false);
  const [amountTo, setAmountTo] = useState<number | undefined>(step1Result.amountTo);
  const [amountFrom, setAmountFrom] = useState<number | undefined>(step1Result.amountFrom);
  const [receiveAddress, setReceiveAddress] = useState('');
  const [refundAddress, setRefundAddress] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer>();

  useEffect(() => {
    if (step1Result.mode === TradeMode.Standard) {
      setAmountTo(selectedOffer?.amount);
    } else if (step1Result.mode === TradeMode.Payment) {
      setAmountFrom(selectedOffer?.amount);
    }
  }, [selectedOffer]);

  const validate = () => {
    const parseResult = CreateTradeStep2InputSchema.safeParse({
      receiveAddress,
      refundAddress,
      selectedOffer,
    });

    if (!parseResult.success) {
      Toast.show(t(parseResult.error.errors[0].message));
      return false;
    }

    return true;
  };

  const createTrade = async () => {
    try {
      setIsLoading(true);
      const result = await apiClient.createTrade({
        id: step1Result.createTradeId,
        amount: step1Result.mode === TradeMode.Standard ? amountFrom! : amountTo!,
        mode: step1Result.mode,
        networkFrom: step1Result.coinFrom.network,
        networkTo: step1Result.coinTo.network,
        tickerFrom: step1Result.coinFrom.ticker,
        tickerTo: step1Result.coinTo.ticker,
        provider: selectedOffer!.provider,
        receiveAddress: receiveAddress,
        refundAddress: refundAddress,
      });
      addTradeToStore({
        ...result.createTrade,
        kycRating: selectedOffer!.kycRating as KycRating,
        insurance: selectedOffer!.insurance,
      });

      return result.createTrade;
    } catch (e) {
      if (e instanceof ClientError) {
        const errorType = e.response.errors![0].message;

        if (errorType === 'invalid_receive_address') {
          Toast.show(t('error.invalidReceiveAddress'));
        } else if (errorType === 'invalid_refund_address') {
          Toast.show(t('error.invalidRefundAddress'));
        } else if (errorType === 'provider') {
          Toast.show(t('error.provider'));
        } else {
          Toast.show(t('error.unknown'));
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    if (!validate()) {
      return;
    }

    const trade = await createTrade();

    if (trade) {
      onComplete(trade);
    }
  };
  return (
    <View className="gap-y-2">
      <CoinInput
        type="send"
        coin={step1Result.coinFrom}
        amount={amountFrom}
        onAmountUpdate={setAmountFrom}
        isAmountLocked={true}
        isCoinLocked={true}
      />
      <CoinInput
        type="receive"
        coin={step1Result.coinTo}
        amount={amountTo}
        onAmountUpdate={setAmountTo}
        isAmountLocked={true}
        isCoinLocked={true}
      />
      <View>
        <Input
          label={`${t('receiveAddress')} (${step1Result.coinTo.ticker.toUpperCase()})`}
          value={receiveAddress}
          onChange={setReceiveAddress}
        />
      </View>
      <RefundAddressInput address={refundAddress} onChange={setRefundAddress} coin={step1Result.coinFrom} />
      <OffersTable
        tradeMode={step1Result.mode}
        selectedOffer={selectedOffer}
        onSelect={setSelectedOffer}
        offers={step1Result.offers}
      />
      <Button label={t('editTransaction')} variant="secondary" onPress={onGoBack} disabled={isLoading} />
      <Button
        label={t('exchange')}
        variant="primary"
        icon={<Icon name="keyboard-arrow-right" size={20} />}
        onPress={onSubmit}
        isLoading={isLoading}
      />

      <Typography className="text-gray-200 text-xs text-center">Powered by Trocador.app</Typography>
    </View>
  );
};
