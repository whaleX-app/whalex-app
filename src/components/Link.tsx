import { ViewProps, TouchableOpacity, Linking } from 'react-native';
import { Typography } from './Typography';
import { Icon } from './Icon';

interface Props extends ViewProps {
  url: string;
  textClassName?: string;
  iconClassName?: string;
  iconSize?: number;
}

export const Link = ({ url, textClassName, iconClassName, iconSize, className, children, ...rest }: Props) => {
  return (
    <TouchableOpacity className="flex-row items-center" onPress={() => Linking.openURL(url)} {...rest}>
      <Typography numberOfLines={1} className={textClassName}>
        {children}{' '}
      </Typography>
      <Icon name="open-in-new" size={iconSize} className={iconClassName} />
    </TouchableOpacity>
  );
};
