import RootToast from 'react-native-root-toast';
import { twConfig } from '@utils/tw-config';

export class Toast {
  static show(message: string) {
    RootToast.show(message, { position: -90, backgroundColor: twConfig.theme.colors.surface['100'] });
  }
}
