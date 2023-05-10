import EnFlag from '@assets/images/flags/en.svg';
import DeFlag from '@assets/images/flags/de.svg';
import PlFlag from '@assets/images/flags/pl.svg';
import { View, TouchableOpacity } from 'react-native';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography';
import { resources } from '@libs/i18n';
import dayjs from 'dayjs';

interface Language {
  locale: keyof typeof resources;
  label: string;
  flag: React.ReactNode;
}

const flagStyle = { width: 14, height: 14 };
const enLanguage: Language = { locale: 'en', label: 'English', flag: <EnFlag style={flagStyle} /> };
const languages: Language[] = [
  enLanguage,
  { locale: 'de', label: 'Deutsch', flag: <DeFlag style={flagStyle} /> },
  { locale: 'pl', label: 'Polski', flag: <PlFlag style={flagStyle} /> },
];

export const LanguagePicker = () => {
  const { t, i18n } = useTranslation();
  const pickerRef = useRef<Picker<string>>(null);
  const selectedLanguage = languages.find((language) => language.locale === i18n.resolvedLanguage) || enLanguage;

  return (
    <TouchableOpacity
      className="bg-surface-100 rounded-lg flex-row justify-between p-3 mt-3"
      onPress={() => pickerRef.current?.focus()}
    >
      <View className="flex-row items-center gap-x-1">
        <Icon name="language" size={16} />
        <Typography>{t('language')}</Typography>
      </View>
      <Picker
        style={{ display: 'none' }}
        ref={pickerRef}
        selectedValue={i18n.resolvedLanguage}
        onValueChange={(itemValue) => {
          i18n.changeLanguage(itemValue);
          dayjs.locale(itemValue);
        }}
      >
        {languages.map((language) => (
          <Picker.Item key={language.locale} label={language.label} value={language.locale} />
        ))}
      </Picker>
      <View className="flex-row items-center gap-x-1">
        {selectedLanguage['flag']}
        <Typography className="text-gray-100">{selectedLanguage['label']}</Typography>
        <Icon name="keyboard-arrow-down" className="text-gray-100" />
      </View>
    </TouchableOpacity>
  );
};
