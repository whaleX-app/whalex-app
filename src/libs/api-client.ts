import Constants from 'expo-constants';
import * as Network from 'expo-network';
import { GraphQLClient } from 'graphql-request';
import { ClientError, PatchedRequestInit } from 'graphql-request/dist/types';
import { getSdk } from '../generated/gql';
import { Toast } from './Toast';
import i18n from './i18n';

const responseMiddleware: PatchedRequestInit['responseMiddleware'] = async (response) => {
  if (response instanceof Error && !(response instanceof ClientError)) {
    const networkState = await Network.getNetworkStateAsync();

    // networkState.isInternetReachable is always true if the type is VPN due to a bug.
    // Show no internet connection message if the request failed and there is an active VPN connection.
    if (!networkState.isInternetReachable || networkState.type === Network.NetworkStateType.VPN) {
      Toast.show(i18n.t('error.noInternetConnection'));
    } else {
      Toast.show(i18n.t('error.unableToConnect'));
    }
  }
};

export const apiClient = getSdk(
  new GraphQLClient(Constants.expoConfig?.extra?.apiUrl, { timeout: 30000, responseMiddleware })
);
