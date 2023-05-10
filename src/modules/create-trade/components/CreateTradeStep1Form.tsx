import { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ClientError } from 'graphql-request';
import { z } from 'zod';
import { Typography } from '@components/Typography';
import { coins } from '@config/coins';
import { Icon } from '@components/Icon';
import { Coin } from '@types';
import { Toast } from '@libs/Toast';
import { apiClient } from '@libs/api-client';
import { TradeMode } from '@generated/gql';
import { CoinInput } from '@components/CoinInput';
import { CreateTradeStep1InputSchema } from '../validation/step1';
import { TradeModeRadioGroup } from './TradeModeRadioGroup';
import { CreateTradeStep1Result } from '../types';
import { Button } from '@components/Button';

interface Props {
  onComplete: (result: CreateTradeStep1Result) => void;
}

const btcCoin = coins.find((coin) => coin.ticker === 'btc')!;
const xmrCoin = coins.find((coin) => coin.ticker === 'xmr')!;

export const CreateTradeStep1Form = ({ onComplete }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [coinFrom, setCoinFrom] = useState<Coin>(btcCoin);
  const [amountFrom, setAmountFrom] = useState<number>();
  const [coinTo, setCoinTo] = useState<Coin>(xmrCoin);
  const [amountTo, setAmountTo] = useState<number>();
  const [mode, setMode] = useState<TradeMode>(TradeMode.Standard);
  const amountFromInputRef = useRef<TextInput>(null);
  const amountToInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setAmountFrom(undefined);
    setAmountTo(undefined);
    amountToInputRef.current?.clear();
    amountFromInputRef.current?.clear();
  }, [mode]);

  const swapCoins = () => {
    const oldCoinFrom = coinFrom;

    setCoinFrom(coinTo);
    setCoinTo(oldCoinFrom);
  };

  const validate = useCallback(() => {
    const parseResult = CreateTradeStep1InputSchema.extend(
      mode === TradeMode.Standard
        ? {
            amountFrom: z
              .number({ required_error: t('validation.amountFromRequired') })
              .min(
                coinFrom.minimum,
                t('validation.amountFromMin', { minAmount: coinFrom.minimum, ticker: coinFrom.ticker.toUpperCase() })
              )
              .max(
                coinFrom.maximum,
                t('validation.amountFromMax', { maxAmount: coinFrom.maximum, ticker: coinFrom.ticker.toUpperCase() })
              ),
          }
        : {
            amountTo: z
              .number({ required_error: t('validation.amountToRequired') })
              .min(
                coinTo.minimum,
                t('validation.amountToMin', { minAmount: coinTo.minimum, ticker: coinTo.ticker.toUpperCase() })
              )
              .max(
                coinTo.maximum,
                t('validation.amountToMax', { maxAmount: coinTo.maximum, ticker: coinTo.ticker.toUpperCase() })
              ),
          }
    ).safeParse({
      coinFrom,
      amountFrom,
      coinTo,
      amountTo,
    });

    if (!parseResult.success) {
      Toast.show(parseResult.error.errors[0].message);
      return false;
    }

    return true;
  }, [coinFrom, coinTo, amountTo, amountFrom, mode, t]);

  const onSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await apiClient.offers({
        amount: mode === TradeMode.Payment ? amountTo! : amountFrom!,
        tradeMode: mode,
        networkFrom: coinFrom.network,
        networkTo: coinTo.network,
        tickerFrom: coinFrom.ticker,
        tickerTo: coinTo.ticker,
      });

      onComplete({
        mode,
        coinFrom,
        coinTo,
        amountFrom: amountFrom!,
        amountTo: amountTo!,
        createTradeId: response.offers.createTradeId,
        offers: response.offers.offers,
      });
    } catch (e) {
      if (e instanceof ClientError) {
        Toast.show(t('noOffersFound'));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="gap-y-2">
      <TradeModeRadioGroup mode={mode} onSelect={setMode} disabled={isLoading} />
      <CoinInput
        type="send"
        coin={coinFrom}
        onCoinUpdate={setCoinFrom}
        onAmountUpdate={setAmountFrom}
        isAmountLocked={mode === TradeMode.Payment || isLoading}
        isCoinLocked={isLoading}
        amountInputRef={amountFromInputRef}
      />
      <View className="flex-row items-center justify-between px-3">
        <Typography className="text-sm text-gray-50">
          {t('minimumAmount')}: {mode === TradeMode.Standard ? coinFrom.minimum : coinTo.minimum}
        </Typography>
        <TouchableOpacity className="p-0.5 rounded bg-primary" onPress={swapCoins} disabled={isLoading}>
          <Icon name="swap-vert" size={20} />
        </TouchableOpacity>
      </View>

      <CoinInput
        type="receive"
        coin={coinTo}
        onCoinUpdate={setCoinTo}
        onAmountUpdate={setAmountTo}
        isAmountLocked={mode === TradeMode.Standard || isLoading}
        isCoinLocked={isLoading}
        amountInputRef={amountToInputRef}
      />
      <Button
        label={t('findOffers')}
        variant="primary"
        icon={<Icon name="keyboard-arrow-right" size={20} />}
        onPress={onSubmit}
        disabled={isLoading}
        isLoading={isLoading}
      />

      <Typography className="text-gray-200 text-xs text-center">Powered by Trocador.app</Typography>
    </View>
  );
};
