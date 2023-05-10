import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Location from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const STORE_LANGUAGE_KEY = 'settings.lang';

export const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async () => {
    const storedLocale = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);

    dayjs.locale(storedLocale ?? Location.locale);

    return storedLocale ?? Location.locale;
  },
  cacheUserLanguage(lng) {
    AsyncStorage.setItem(STORE_LANGUAGE_KEY, lng);
  },
};

export const resources = {
  en: {
    translation: require('../../locales/en.json'),
  },
  de: {
    translation: require('../../locales/de.json'),
  },
  pl: {
    translation: require('../../locales/pl.json'),
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
