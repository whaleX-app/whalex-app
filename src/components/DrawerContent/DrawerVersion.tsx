import { ComponentProps } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { styled } from 'nativewind';
import { Typography } from '@components/Typography';
import { Icon } from '@components/Icon';
import { useNavigation } from '@hooks/useNavigation';
import { useAppUpdate } from '@hooks/useAppUpdate';

const StyledFontawesome5 = styled<ComponentProps<typeof FontAwesome5>>(FontAwesome5);

export const DrawerVersion = () => {
  const navigation = useNavigation();
  const { isUpdateAvailable, version, downloadUrl } = useAppUpdate();

  return (
    <View className="w-full bg-black px-4 py-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row">
          <View className="flex-row items-center gap-x-1">
            <StyledFontawesome5 name="github" size={14} className="text-gray-50" />
            <Typography className="text-gray-50 text-sm">v{Constants.manifest?.version}</Typography>
            {isUpdateAvailable && <Typography className="text-primary text-sm">(v{version} available)</Typography>}
          </View>
        </View>
        <View className="flex-row gap-2 items-center">
          {isUpdateAvailable && (
            <TouchableOpacity onPress={() => Linking.openURL(downloadUrl!)}>
              <Icon name="file-download" size={20} className="text-primary" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" size={20} className="text-gray-50" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
