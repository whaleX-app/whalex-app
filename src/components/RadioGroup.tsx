import { View, TouchableOpacity, ViewProps } from 'react-native';
import classNames from 'classnames';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from './Typography';
import { twConfig } from '@utils/tw-config';

export interface RadioGroupOption<T> {
  label: string;
  value: T;
}

export interface RadioGroupProps<T> extends ViewProps {
  selectedOption: T;
  options: RadioGroupOption<T>[];
  disabled?: boolean;
  onSelect: (value: T) => void;
}

export const RadioGroup = <T,>({ selectedOption, options, disabled, onSelect, ...rest }: RadioGroupProps<T>) => {
  return (
    <View className="border border-primary rounded-full flex-row items-center" {...rest}>
      {options.map((option, idx) => (
        <TouchableOpacity
          className="flex-1"
          key={option.label}
          disabled={disabled}
          onPress={() => onSelect(option.value)}
        >
          <LinearGradient
            colors={
              option.value === selectedOption ? twConfig.theme.colors.gradient.primary : ['transparent', 'transparent']
            }
            start={{ x: 0, y: 0.5 }}
            className={classNames('flex-1 py-1.5', {
              'bg-primary': option.value === selectedOption,
              'rounded-l-full': idx === 0,
              'rounded-r-full': idx === options.length - 1,
            })}
          >
            <Typography className="text-center text-sm">{option.label}</Typography>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};
