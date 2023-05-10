import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation as useUnwrappedNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@types';

export const useNavigation = useUnwrappedNavigation<DrawerNavigationProp<RootStackParamList>>;
