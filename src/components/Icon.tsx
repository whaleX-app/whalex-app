import { MaterialIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledMaterialIcons = styled(MaterialIcons);

export const Icon = (props: React.ComponentProps<typeof StyledMaterialIcons>) => {
  return <StyledMaterialIcons className="text-white" {...props} />;
};
