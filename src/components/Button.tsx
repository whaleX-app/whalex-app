import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { twConfig } from '@utils/tw-config';
import { Typography } from './Typography';

interface Props extends TouchableOpacityProps {
  label: string;
  variant: 'primary' | 'secondary';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const variantContainerClassNames: Record<Props['variant'], string> = {
  primary: 'p-3',
  secondary: 'border p-1 border-gray-200',
};

const variantTextClassNames: Record<Props['variant'], string> = {
  primary: 'text-base',
  secondary: 'text-sm',
};

const loadingIndicatorSizes: Record<Props['variant'], number> = {
  primary: 24,
  secondary: 14,
};

const variantGradientColors: Record<Props['variant'], string[]> = {
  primary: twConfig.theme.colors.gradient.primary,
  secondary: [twConfig.theme.colors.surface['100'], twConfig.theme.colors.surface['100']],
};

export const Button = ({ variant, isLoading, icon, label, disabled, ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest} disabled={isLoading || disabled}>
      <LinearGradient
        colors={variantGradientColors[variant]}
        className={'rounded-xl flex-row justify-center items-center ' + variantContainerClassNames[variant]}
        start={{ x: 0, y: 0.5 }}
      >
        {!isLoading ? (
          <>
            <Typography className={variantTextClassNames[variant]}>{label}</Typography>
            {icon}
          </>
        ) : (
          <ActivityIndicator size={loadingIndicatorSizes[variant]} color="white" />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
