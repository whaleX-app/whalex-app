import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import SwipeImage from '@assets/images/swipe.png';
import { Typography } from '@components/Typography';
import { Modal } from '@components/Modal';
import { Icon } from '@components/Icon';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryHelpModal = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Modal title="Help" {...props}>
      <View className="flex-row items-center mt-2 gap-x-2">
        <Image source={SwipeImage} className="w-8 h-8" />
        <Typography>{'Swipe left to delete trades.'}</Typography>
      </View>
      <View className="flex-row mt-8 gap-x-2">
        <Icon name="info" size={20} />
        <Typography>Trades you delete from your device are also deleted from Trocador.</Typography>
      </View>
    </Modal>
  );
};
