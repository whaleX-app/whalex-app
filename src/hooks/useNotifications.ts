import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { navigationRef } from '@libs/navigation-ref';

Notifications.requestPermissionsAsync();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const useNotifications = () => {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const id = response.notification.request.content.data.id;

      navigationRef.navigate('Trade', { id });
    });
    return () => subscription.remove();
  }, []);
};
