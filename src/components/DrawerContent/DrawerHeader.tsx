import { View, Image } from 'react-native';
import HeaderImage from '@assets/images/header.png';
import { Typography } from '@components/Typography';

export const DrawerHeader = () => {
  return <Image source={HeaderImage} className="w-full h-28" />;
};
