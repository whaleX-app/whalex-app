module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@components': './src/components',
            '@modules': './src/modules',
            '@libs': './src/libs',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@config': './src/config',
            '@stores': './src/stores',
            '@tasks': './src/tasks',
            '@generated': './src/generated',
          },
        },
      ],
      'react-native-reanimated/plugin',
      'nativewind/babel',
    ],
  };
};
