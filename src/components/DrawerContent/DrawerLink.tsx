import React from 'react';
import { Linking, TouchableOpacity, ViewProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Typography } from '../Typography';

type Props = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  isFeautured?: boolean;
  onPress?: () => void;
} & ViewProps;

export const DrawerLink = ({ label, href, icon, isFeautured, onPress, ...rest }: Props) => {
  const { t } = useTranslation();

  const openLink = () => {
    if (href) {
      Linking.openURL(href);
    }
  };

  return (
    <TouchableOpacity className="flex-row items-center px-4 gap-2" onPress={onPress ?? openLink} {...rest}>
      {icon}
      <Typography className="text-sm">{label}</Typography>
      {isFeautured && (
        <TouchableOpacity className="text-cs px-1 py-0.5 bg-primary rounded">
          <Typography className="text-xs">{t('featured')}</Typography>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
