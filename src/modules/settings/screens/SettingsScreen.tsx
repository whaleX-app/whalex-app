import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Topbar } from '@components/Topbar';
import { Footer } from '@components/Footer';
import { Icon } from '@components/Icon';
import { LanguagePicker } from '../components/LanguagePicker';
import { Typography } from '@components/Typography';

export const SettingsScreen = () => {
  const { t } = useTranslation();

  return (
    <View className="flex-1">
      <ScrollView className="px-6 bg-black flex-1">
        <Topbar screenTitle={t('settings')} screenIcon={<Icon name="settings" size={24} />} />
        <LanguagePicker />
        <View className="mt-8">
          <View className="flex-row items-center gap-x-1">
            <Icon name="info" size={16} />
            <Typography>Disclaimer</Typography>
          </View>
          <Typography className="mt-3 text-gray-100">
            whaleX provides software that allows users to choose between exchanges and trade directly with them, we
            never have access, receive or transfer any of the funds between the parties. As such, whaleX does not
            qualify as a Virtual Asset Service Provider (VASP) as defined by FATF.
          </Typography>
        </View>
        <View className="mt-8">
          <Typography className="text-gray-200">support@whalex.app</Typography>
          <Typography className="text-gray-200">abuse@whalex.app</Typography>
        </View>
        <View className="mt-8">
          <View className="flex-row items-center gap-x-1">
            <Icon name="info" size={16} />
            <Typography>Privacy policy</Typography>
          </View>
          <Typography className="mt-3 text-gray-100">
            We do not log or store any of your personal data including IP address, device information (build, OS version
            etc) or your transaction details (amount, coins, addresses).
          </Typography>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};
