import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import ShieldEmptyIcon from '@assets/images/shield-empty.svg';
import ShieldHalfIcon from '@assets/images/shield-half.svg';
import ShieldFullIcon from '@assets/images/shield-full.svg';

interface Props extends ViewProps {
  rate: number;
}

export const InsuranceIcon = ({ rate, style, ...rest }: Props) => {
  if (rate >= 80) {
    return <ShieldFullIcon style={[iconStyle, style]} {...rest} />;
  }

  if (rate >= 50) {
    return <ShieldHalfIcon style={[iconStyle, style]} {...rest} />;
  }

  return <ShieldEmptyIcon style={[iconStyle, style]} {...rest} />;
};

const iconStyle: StyleProp<ViewStyle> = { width: 13, height: 13 };
