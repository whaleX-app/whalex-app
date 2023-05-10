import { useRoute as useUnwrappedRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@types';

export const useRoute = <T extends keyof RootStackParamList>() => useUnwrappedRoute<RouteProp<RootStackParamList, T>>();
