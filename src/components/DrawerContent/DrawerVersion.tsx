import { ComponentProps } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { styled } from 'nativewind';
import { Typography } from '@components/Typography';
import { Icon } from '@components/Icon';
import { useNavigation } from '@hooks/useNavigation';

const StyledFontawesome5 = styled<ComponentProps<typeof FontAwesome5>>(FontAwesome5);

export const DrawerVersion = () => {
  const navigation = useNavigation();

  return (
    <View className="w-full bg-black px-4 py-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-1">
          <StyledFontawesome5 name="github" size={14} className="text-gray-50" />
          <Typography className="text-gray-50 text-sm">v{Constants.manifest?.version}-stable</Typography>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={20} className="text-gray-50" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
