import { TradeStatus } from '@generated/gql';
import { Image, ImageSourcePropType } from 'react-native';

interface Props {
  status: TradeStatus;
}

const cardImages: Record<TradeStatus, ImageSourcePropType> = {
  [TradeStatus.Waiting]: require('@assets/images/status-cards/waiting.png'),
  [TradeStatus.Confirming]: require('@assets/images/status-cards/confirming.png'),
  [TradeStatus.Sending]: require('@assets/images/status-cards/sending.png'),
  [TradeStatus.Completed]: require('@assets/images/status-cards/completed.png'),
  [TradeStatus.Expired]: require('@assets/images/status-cards/expired.png'),
  [TradeStatus.Unknown]: require('@assets/images/status-cards/expired.png'),
};

export const StatusCard = ({ status }: Props) => {
  return <Image source={cardImages[status]} resizeMode="contain" className="w-16 h-12" />;
};
