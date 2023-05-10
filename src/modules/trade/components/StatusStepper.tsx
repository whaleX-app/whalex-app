import React from 'react';
import { View } from 'react-native';
import classNames from 'classnames';
import { TradeStatus } from '@generated/gql';
import { statusColors } from '@config/status-colors';
import { twConfig } from '@utils/tw-config';

interface Props {
  status: TradeStatus;
}

const statusWeights = {
  [TradeStatus.Waiting]: 0,
  [TradeStatus.Confirming]: 1,
  [TradeStatus.Sending]: 2,
  [TradeStatus.Completed]: 3,
};

export const StatusStepper = ({ status }: Props) => {
  const statusWeight = statusWeights[status as keyof typeof statusWeights];

  const getColor = (idx: number) => {
    if (status === TradeStatus.Expired && idx === 0) {
      return statusColors[TradeStatus.Expired];
    }

    if (statusWeight >= idx) {
      return statusColors[status];
    }

    return undefined;
  };

  return (
    <View className="flex-row items-center justify-center py-2">
      {Array.from(Array(4).keys()).map((_, idx) => (
        <React.Fragment key={idx}>
          {idx !== 0 && (
            <View
              className={classNames('w-7 h-0.5')}
              style={{ backgroundColor: getColor(idx) ?? twConfig.theme.colors.gray['100'] }}
            ></View>
          )}
          <View
            className={classNames('rounded-full w-4 h-4 border-2')}
            style={{
              backgroundColor: getColor(idx) ?? twConfig.theme.colors.gray['100'],
              borderColor: getColor(idx) ?? twConfig.theme.colors.gray['100'],
            }}
          ></View>
        </React.Fragment>
      ))}
    </View>
  );
};
