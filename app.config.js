import 'dotenv/config';
import { version } from './package.json';

export default {
  expo: {
    name: 'whaleX',
    slug: 'whaleX',
    version,
    orientation: 'portrait',
    icon: './assets/images/app-icon.png',
    assetBundlePatterns: ['**/*'],
    plugins: ['expo-localization'],
    backgroundColor: '#000000',
    userInterfaceStyle: 'dark',
    splash: {
      backgroundColor: '#000000',
    },
    android: {
      package: 'app.whalex.mobile',
      userInterfaceStyle: 'dark',
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon.png',
        backgroundColor: '#141414',
      },
    },
    extra: {
      eas: {
        projectId: process.env.EXPO_PROJECT_ID,
      },
      apiUrl: process.env.API_URL,
    },
  },
};
