import { Trade } from '@generated/gql';

export type RootStackParamList = {
  Trade: { id: string };
  CreateTrade: undefined;
  History: undefined;
  Settings: undefined;
};

export interface Coin {
  name: string;
  ticker: string;
  network: string;
  memo: boolean;
  image: string;
  minimum: number;
  maximum: number;
}

export interface LocalTrade extends Trade {
  kycRating: KycRating;
  insurance: number;
}

export type KycRating = 'A' | 'B' | 'C' | 'D';

export interface GraphQLError {
  response: {
    errors: {
      message: string;
    }[];
  };
}

export interface IconProps {
  size: number;
}
