const config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./tests/setup-tests.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/mocks/svg.ts',
    'react-i18next': '<rootDir>/mocks/react-i18next.ts',
    '@react-native-async-storage/async-storage': '<rootDir>/mocks/async-storage.ts',
    i18next: '<rootDir>/mocks/i18next.ts',
    '@react-navigation/native': '<rootDir>/mocks/react-navigation.ts',
    dayjs: '<rootDir>/mocks/dayjs.ts',
  },
};

module.exports = config;
