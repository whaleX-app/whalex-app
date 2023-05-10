import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateTradeInput = {
  amount: Scalars['Float'];
  id: Scalars['String'];
  mode: TradeMode;
  networkFrom: Scalars['String'];
  networkTo: Scalars['String'];
  provider: Scalars['String'];
  receiveAddress: Scalars['String'];
  refundAddress?: InputMaybe<Scalars['String']>;
  tickerFrom: Scalars['String'];
  tickerTo: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTrade: Trade;
  deleteTrade: Scalars['Boolean'];
};


export type MutationCreateTradeArgs = {
  input: CreateTradeInput;
};


export type MutationDeleteTradeArgs = {
  id: Scalars['String'];
};

export type Offer = {
  __typename?: 'Offer';
  amount: Scalars['Float'];
  insurance: Scalars['Int'];
  kycRating: Scalars['String'];
  provider: Scalars['String'];
  rateType: OfferRateType;
  waste: Scalars['Float'];
};

export enum OfferRateType {
  Fixed = 'Fixed',
  Floating = 'Floating'
}

export type OffersResponse = {
  __typename?: 'OffersResponse';
  createTradeId: Scalars['String'];
  offers: Array<Offer>;
  tradeMode: TradeMode;
};

export type Query = {
  __typename?: 'Query';
  offers: OffersResponse;
  trade: Trade;
};


export type QueryOffersArgs = {
  amount: Scalars['Float'];
  networkFrom: Scalars['String'];
  networkTo: Scalars['String'];
  tickerFrom: Scalars['String'];
  tickerTo: Scalars['String'];
  tradeMode: TradeMode;
};


export type QueryTradeArgs = {
  id: Scalars['String'];
};

export type Trade = {
  __typename?: 'Trade';
  addressProvider: Scalars['String'];
  addressUser: Scalars['String'];
  amountFrom: Scalars['Float'];
  amountTo: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['String'];
  networkFrom: Scalars['String'];
  networkTo: Scalars['String'];
  provider: Scalars['String'];
  providerSupportPlatform: Scalars['String'];
  providerSupportUrl: Scalars['String'];
  providerTradeId: Scalars['String'];
  providerTradeUrl: Scalars['String'];
  status: TradeStatus;
  tickerFrom: Scalars['String'];
  tickerTo: Scalars['String'];
};

export enum TradeMode {
  Payment = 'Payment',
  Standard = 'Standard'
}

export enum TradeStatus {
  Completed = 'Completed',
  Confirming = 'Confirming',
  Expired = 'Expired',
  Sending = 'Sending',
  Unknown = 'Unknown',
  Waiting = 'Waiting'
}

export type CreateTradeMutationVariables = Exact<{
  id: Scalars['String'];
  provider: Scalars['String'];
  refundAddress?: InputMaybe<Scalars['String']>;
  receiveAddress: Scalars['String'];
  tickerFrom: Scalars['String'];
  tickerTo: Scalars['String'];
  networkFrom: Scalars['String'];
  networkTo: Scalars['String'];
  amount: Scalars['Float'];
  mode: TradeMode;
}>;


export type CreateTradeMutation = { __typename?: 'Mutation', createTrade: { __typename?: 'Trade', id: string, addressProvider: string, addressUser: string, amountFrom: number, amountTo: number, createdAt: any, expiresAt: any, networkFrom: string, networkTo: string, tickerFrom: string, tickerTo: string, provider: string, providerSupportPlatform: string, providerSupportUrl: string, providerTradeId: string, providerTradeUrl: string, status: TradeStatus } };

export type DeleteTradeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTradeMutation = { __typename?: 'Mutation', deleteTrade: boolean };

export type OffersQueryVariables = Exact<{
  tickerFrom: Scalars['String'];
  tickerTo: Scalars['String'];
  networkFrom: Scalars['String'];
  networkTo: Scalars['String'];
  amount: Scalars['Float'];
  tradeMode: TradeMode;
}>;


export type OffersQuery = { __typename?: 'Query', offers: { __typename?: 'OffersResponse', createTradeId: string, tradeMode: TradeMode, offers: Array<{ __typename?: 'Offer', provider: string, amount: number, waste: number, kycRating: string, insurance: number, rateType: OfferRateType }> } };

export type TradeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TradeQuery = { __typename?: 'Query', trade: { __typename?: 'Trade', id: string, addressProvider: string, addressUser: string, amountFrom: number, amountTo: number, createdAt: any, expiresAt: any, networkFrom: string, networkTo: string, tickerFrom: string, tickerTo: string, provider: string, providerSupportPlatform: string, providerSupportUrl: string, providerTradeId: string, providerTradeUrl: string, status: TradeStatus } };


export const CreateTradeDocument = gql`
    mutation createTrade($id: String!, $provider: String!, $refundAddress: String, $receiveAddress: String!, $tickerFrom: String!, $tickerTo: String!, $networkFrom: String!, $networkTo: String!, $amount: Float!, $mode: TradeMode!) {
  createTrade(
    input: {id: $id, provider: $provider, receiveAddress: $receiveAddress, refundAddress: $refundAddress, tickerFrom: $tickerFrom, tickerTo: $tickerTo, networkFrom: $networkFrom, networkTo: $networkTo, amount: $amount, mode: $mode}
  ) {
    id
    addressProvider
    addressUser
    amountFrom
    amountTo
    createdAt
    expiresAt
    networkFrom
    networkTo
    tickerFrom
    tickerTo
    provider
    providerSupportPlatform
    providerSupportUrl
    providerTradeId
    providerTradeUrl
    status
  }
}
    `;
export const DeleteTradeDocument = gql`
    mutation deleteTrade($id: String!) {
  deleteTrade(id: $id)
}
    `;
export const OffersDocument = gql`
    query offers($tickerFrom: String!, $tickerTo: String!, $networkFrom: String!, $networkTo: String!, $amount: Float!, $tradeMode: TradeMode!) {
  offers(
    tickerFrom: $tickerFrom
    tickerTo: $tickerTo
    networkFrom: $networkFrom
    networkTo: $networkTo
    amount: $amount
    tradeMode: $tradeMode
  ) {
    createTradeId
    tradeMode
    offers {
      provider
      amount
      waste
      kycRating
      insurance
      rateType
    }
  }
}
    `;
export const TradeDocument = gql`
    query trade($id: String!) {
  trade(id: $id) {
    id
    addressProvider
    addressUser
    amountFrom
    amountTo
    createdAt
    expiresAt
    networkFrom
    networkTo
    tickerFrom
    tickerTo
    provider
    providerSupportPlatform
    providerSupportUrl
    providerTradeId
    providerTradeUrl
    status
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createTrade(variables: CreateTradeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTradeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTradeMutation>(CreateTradeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTrade', 'mutation');
    },
    deleteTrade(variables: DeleteTradeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTradeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTradeMutation>(DeleteTradeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteTrade', 'mutation');
    },
    offers(variables: OffersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OffersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OffersQuery>(OffersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'offers', 'query');
    },
    trade(variables: TradeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TradeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TradeQuery>(TradeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'trade', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;