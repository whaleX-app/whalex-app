import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalProps } from '@components/Modal';
import { Trade } from '@generated/gql';
import { Typography } from '@components/Typography';
import { Button } from '@components/Button';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@hooks/useNavigation';

interface Props extends ModalProps {
  trade: Trade;
  deleteTrade: () => void;
}

export const DeleteTradeModal = ({ trade, deleteTrade, onClose, ...rest }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleDeletePress = () => {
    deleteTrade();
    onClose();
    Toast.show(t('tradeDeleted'));
    navigation.navigate('History');
  };

  return (
    <Modal title="Delete trade" onClose={onClose} {...rest}>
      <Typography>Do you really want to delete the trade?</Typography>
      <Button label={t('deleteTrade')} variant="secondary" onPress={handleDeletePress} className="mt-4" />
    </Modal>
  );
};
