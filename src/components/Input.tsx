import { View, ViewProps, TextInput } from 'react-native';
import { Typography } from '@components/Typography';
import { Field } from '@components/Field';

type Props = {
  label: string;
  value: string;
  onChange: (address: string) => void;
} & ViewProps;

export const Input = ({ label, value, onChange, ...rest }: Props) => {
  return (
    <Field {...rest}>
      <View className="flex-1 pt-1">
        <View className="flex-row items-center">
          <Typography className="text-sm text-gray-50 ">{label}</Typography>
        </View>
        <TextInput className="font-sans text-primary flex-1" onChangeText={onChange}>
          {value}
        </TextInput>
      </View>
    </Field>
  );
};
