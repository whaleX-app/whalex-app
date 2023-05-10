import { TouchableOpacity, View, Linking } from 'react-native';
import { Typography } from '@components/Typography';
import { useNavigation } from '@hooks/useNavigation';
import { Icon } from './Icon';

interface Props {
  isHomeScreen?: boolean;
  screenTitle?: string;
  screenIcon?: React.ReactNode;
  actionComponent?: React.ReactNode;
}

export const Topbar = ({ isHomeScreen, screenTitle, screenIcon, actionComponent }: Props) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between my-4">
      {isHomeScreen && (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} />
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
