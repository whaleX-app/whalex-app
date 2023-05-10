import { TradeStatus } from '@generated/gql';
import { twConfig } from '@utils/tw-config';

export const statusColors: Record<TradeStatus, string> = {
  Waiting: twConfig.theme.colors.white,
  Confirming: twConfig.theme.colors.info['100'],
  Sending: twConfig.theme.colors.primary,
  Completed: twConfig.theme.colors.success['100'],
  Expired: twConfig.theme.colors.danger['100'],
  Unknown: twConfig.theme.colors.danger['100'],
};
