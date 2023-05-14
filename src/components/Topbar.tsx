import { TouchableOpacity, View } from 'react-native';
import { Typography } from '@components/Typography';
import { useNavigation } from '@hooks/useNavigation';
import { useAppUpdate } from '@hooks/useAppUpdate';
import { Icon } from './Icon';

interface Props {
  isHomeScreen?: boolean;
  screenTitle?: string;
  screenIcon?: React.ReactNode;
  actionComponent?: React.ReactNode;
}

export const Topbar = ({ isHomeScreen, screenTitle, screenIcon, actionComponent }: Props) => {
  const navigation = useNavigation();
  const { isUpdateAvailable } = useAppUpdate();

  return (
    <View className="flex-row items-center justify-between my-4">
      {isHomeScreen && (
        <TouchableOpacity onPress={() => navigation.openDrawer()} className="relative">
          <Icon name="menu" size={30} />
          {isUpdateAvailable && (
            <View className="bg-primary rounded-full w-3.5 h-3.5 absolute bottom-1 right-0 border-2 boder-black" />
          )}
        </TouchableOpacity>
      )}
      <View className="flex-row items-center gap-1">
        {screenIcon}
        <Typography className="text-lg">{screenTitle}</Typography>
      </View>
      {actionComponent}
    </View>
  );
};
