import 'react-native-gesture-handler';
import '@libs/i18n';
import techSansFont from '@assets/fonts/TechnaSans.otf';
import myriadProFont from '@assets/fonts/MyriadPro-Bold.otf';
import { useFonts } from 'expo-font';
import { StatusBar, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import * as dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/pl';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TradeScreen } from '@modules/trade';
import { CreateTradeScreen } from '@modules/create-trade';
import { HistoryScreen } from '@modules/history';
import { Drawer } from '@components/Drawer';
import { DrawerContent } from '@components/DrawerContent/DrawerContent';
import { useStatusUpdate } from '@hooks/useStatusUpdate';
import { useNotifications } from '@hooks/useNotifications';
import { navigationRef } from '@libs/navigation-ref';
import { SettingsScreen } from '@modules/settings';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const App = () => {
  const [loaded] = useFonts({
    TechnaSans: techSansFont,
    'MyriadPro-Bold': myriadProFont,
  });

  useNotifications();
  useStatusUpdate();

  if (!loaded) {
    return <View className="bg-black"></View>;
  }

  return (
    <RootSiblingParent>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <Drawer.Navigator
          initialRouteName="CreateTrade"
          screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: 'black' } }}
          backBehavior="history"
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Trade" component={TradeScreen} />
          <Drawer.Screen name="CreateTrade" component={CreateTradeScreen} />
          <Drawer.Screen name="History" component={HistoryScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};
