import { Text } from 'react-native';
import { TextProps } from 'react-native/types';

export const Typography = ({ children, ...rest }: TextProps) => {
  return (
    <Text className="text-white font-sans" {...rest}>
      {children}
    </Text>
  );
};
