import { View, ViewProps } from 'react-native';

export const Field = ({ children, ...rest }: ViewProps) => {
  return (
    <View
      className="px-3 py-1 bg-surface-100 border border-primary rounded-xl flex-row items-center justify-between"
      {...rest}
    >
      {children}
    </View>
  );
};
