import { View, ViewProps } from 'react-native';
import { Typography } from '@components/Typography';
import { KycRating } from '@types';

interface Props extends ViewProps {
  rating: KycRating;
}

const ratingBgColor: Record<KycRating, string> = {
  A: '#1bbd00',
  B: '#6c9e00',
  C: '#e4bc00',
  D: '#df0010',
};

export const KycIcon = ({ rating, style, ...rest }: Props) => (
  <View
    className="w-4 rounded items-center justify-center"
    style={[{ backgroundColor: ratingBgColor[rating] }, style]}
    {...rest}
  >
    <Typography className="text-sm">{rating}</Typography>
  </View>
);
