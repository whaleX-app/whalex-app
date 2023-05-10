import { useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Clipboard from 'expo-clipboard';
import { Footer } from '@components/Footer';
import { Typography } from '@components/Typography';
import { Field } from '@components/Field';
import { Icon } from '@components/Icon';
import { useRoute } from '@hooks/useRoute';
import { Toast } from '@libs/Toast';
import { CoinInput } from '@components/CoinInput';
import { Link } from '@components/Link';
import { useCoin } from '@hooks/useCoin';
import { useProviderLogo } from '@hooks/useProviderLogo';
import { Button } from '@components/Button';
import { useTrade } from '@hooks/useTrade';
import { TradeUtils } from '@utils/TradeUtils';
import { StatusPanel } from '../components/StatusPanel';
import { DeleteTradeModal } from '../components/DeleteTradeModal';

export const TradeScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<'Trade'>();
  const { trade, deleteTrade } = useTrade(route.params.id);
  const coinFrom = useCoin(trade?.tickerFrom || '', trade?.networkFrom || '');
  const coinTo = useCoin(trade?.tickerTo || '', trade?.networkTo || '');
  const providerLogo = useProviderLogo(trade?.provider || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Trade was deleted and a re-render was caused due to the store state update.
  // Do not render anything. onDeletePress handler takes care of redirect.
  if (!trade) {
    return <></>;
  }

  const copyAddressToClipboard = async () => {
    await Clipboard.setStringAsync(trade.addressProvider);
    Toast.show(t('clipboardAddress'));
  };

  return (
    <View className="flex-1">
      <ScrollView className="px-6 pt-3 bg-black">
        {providerLogo && <Image source={providerLogo} resizeMode="contain" className="w-full rounded-lg mt-2 flex-1" />}
        <StatusPanel trade={trade} />
        <CoinInput
          coin={coinFrom}
          amount={trade.amountFrom}
          type="send"
          isAmountLocked={true}
          isCoinLocked={true}
          className="mt-3"
        />
        <CoinInput
          coin={coinTo}
          type="receive"
          amount={trade.amountTo}
          isAmountLocked={true}
          isCoinLocked={true}
          className="mt-3"
        />
        <View className="flex-row items-center mt-4 flex-wrap">
          <Typography>{t('sendExactly')} </Typography>
          <Typography className="text-primary">
            {trade.amountFrom} {trade.tickerFrom.toUpperCase()}
          </Typography>
          <Typography> {t('toAddress')}:</Typography>
        </View>
        <Field className="py-3 mt-2">
          <TouchableOpacity onPress={copyAddressToClipboard} className="flex-row">
            <Typography className="text-gray-50 flex-1">{trade.addressProvider}</Typography>
            <Icon name="content-copy" size={16} className="ml-1 h-full flex-row items-center" />
          </TouchableOpacity>
        </Field>
        <Typography className="mt-3 flex-wrap">{t('receiveAddressCoin', { coinName: coinTo.name })}:</Typography>
        <Field className="mt-2 flex-row items-center py-3">
          <Typography className="text-gray-50">{trade.addressUser}</Typography>
        </Field>
        <View className="gap-y-2 pt-4 pb-7">
          <Button variant="secondary" label={t('deleteTrade')} onPress={() => setShowDeleteModal(true)} />
          <View className="flex-row items-center justify-between">
            <Link
              textClassName="text-gray-50 text-xs"
              iconClassName="text-primary"
              iconSize={13}
              url={TradeUtils.getUrl(trade.id)}
            >
              Trocador ID: {trade.id}
            </Link>
            <Link
              className="ml-1"
              textClassName="text-gray-50 text-xs"
              iconClassName="text-primary"
              iconSize={13}
              url={trade.providerTradeUrl}
            >
              {t('provider')} ID: {trade.providerTradeId}
            </Link>
          </View>
        </View>
      </ScrollView>
      <Footer />
      <DeleteTradeModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        trade={trade}
        deleteTrade={deleteTrade}
      />
    </View>
  );
};
