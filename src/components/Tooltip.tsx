import { useState, PropsWithChildren } from 'react';
import { View, TouchableWithoutFeedback, ViewProps } from 'react-native';
import { Typography } from './Typography';

interface Props extends PropsWithChildren, ViewProps {
  content: string;
}

export const Tooltip = ({ content, children, ...rest }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
      <View className="overflow-visible" {...rest}>
        {isOpen && (
          <View className="bg-surface-100 p-3 absolute -top-12 right-0 z-10 rounded-lg">
            <Typography className="text-sm">{content}</Typography>
          </View>
        )}
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};
