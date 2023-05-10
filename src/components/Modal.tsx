import React, { PropsWithChildren } from 'react';
import { Modal as RNModal, View, TouchableOpacity } from 'react-native';
import { Typography } from '@components/Typography';
import { Icon } from './Icon';

export interface ModalProps extends PropsWithChildren {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => (
  <RNModal animationType="fade" transparent={true} visible={isOpen}>
    <View className="w-full h-full items-center justify-center p-8" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <View className="w-full p-5 bg-surface-100 rounded-lg ">
        <View className="flex-row justify-between items-center">
          <Typography className="text-xl">{title}</Typography>
          <TouchableOpacity onPress={onClose} className="bg-gray-200 rounded-full p-0.5">
            <Icon name="close" color="#fff" size={18} />
          </TouchableOpacity>
        </View>
        <View className="mt-4">{children}</View>
      </View>
    </View>
  </RNModal>
);
