import { Image, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import TrocadorLogo from '@assets/images/partners/Trocador.png';
import SimplexchatLogo from '@assets/images/socials/Simplexchat.png';
import RedditLogo from '@assets/images/socials/Reddit.png';
import AppLogo from '@assets/images/logo.png';
import TwitterIcon from '@assets/images/socials/Twitter.svg';
import { TelegramIcon } from '@components/icons/TelegramIcon';
import { NostrIcon } from '@components/icons/NostrIcon';
import { providerSquareLogoLoaders } from '@utils/provider-logo-loaders';
import { Typography } from '../Typography';
import { DrawerHeader } from './DrawerHeader';
import { DrawerDivider } from './DrawerDivider';
import { DrawerLink } from './DrawerLink';
import { DrawerVersion } from './DrawerVersion';

const socialLinks = [
  { label: 'Website', icon: <Image source={AppLogo} className="rounded-full w-5 h-5" />, href: 'https://whalex.app/' },
  { label: 'Nostr', icon: <NostrIcon size={20} />, href: 'https://nostrplebs.com/s/whalexapp' },
  { label: 'Twitter', icon: <TwitterIcon width={20} height={20} />, href: 'https://twitter.com/whaleXapp' },
  { label: 'Telegram', icon: <TelegramIcon size={20} />, href: 'https://t.me/whaleXapp' },
  {
    label: 'Reddit',
    icon: <Image source={RedditLogo} className="rounded-full w-5 h-5" />,
    href: 'https://www.reddit.com/r/whaleXapp/',
  },
  {
    label: 'SimpleX Chat',
    icon: <Image source={SimplexchatLogo} className="rounded-full w-5 h-5" />,
    href: 'https://simplex.chat/contact#/?v=1-2&smp=smp%3A%2F%2FSkIkI6EPd2D63F4xFKfHk7I1UGZVNn6k1QWZ5rcyr6w%3D%40smp9.simplex.im%2Fes_j6MizYy6geTYKqnJ3-EKoIrLSPsj6%23%2F%3Fv%3D1-2%26dh%3DMCowBQYDK2VuAyEAnKHaHorpWYGpY2CZF4UYtKT8tBnqNgMv0zwtfHrheHw%253D%26srv%3Djssqzccmrcws6bhmn77vgmhfjmhwlyr3u7puw4erkyoosywgl67slqqd.onion&data=%7B%22type%22%3A%22group%22%2C%22groupLinkId%22%3A%22O3t6cYO7vip7qcC7l-xVKA%3D%3D%22%7D',
  },
];

const providerLinks = [
  { label: 'LocalMonero', href: 'https://localmonero.co/?rc=32za', isFeautured: true },
  { label: 'ChangeNow', href: 'https://changenow.app.link/referral?link_id=f11dae30455b71' },
  { label: 'Exch', href: 'http://exch.cx/?ref=aAFCfcdA' },
  { label: 'StealthEx', href: 'https://stealthex.io/?ref=xjsq6sm4bh9' },
  { label: 'Swapuz', href: 'https://swapuz.com/?ref=c6229117-af87-4032-92c3-0493f2434cfb' },
  { label: 'FixedFloat', href: 'https://fixedfloat.com/?ref=vtjdb6mb' },
  { label: 'Exolix', href: 'https://exolix.com?ref=0BF4D61743FD6E373D5A5BC5FB97DC9F' },
  { label: 'Swapter', href: 'https://swapter.io/?ref=["yXsW7UrPNRQi35v8"]' },
];

const walletLinks = [
  {
    label: 'Monerujo',
    href: 'https://play.google.com/store/apps/details?id=com.m2049r.xmrwallet',
    iconLoader: () => require('@assets/images/wallets/Monerujo.png'),
  },
  {
    label: 'Cake Wallet',
    href: 'https://play.google.com/store/apps/details?id=com.cakewallet.cake_wallet',
    iconLoader: () => require('@assets/images/wallets/CakeWallet.png'),
  },
  {
    label: 'Monero.com',
    href: 'https://play.google.com/store/apps/details?id=com.monero.app',
    iconLoader: () => require('@assets/images/wallets/Monerocom.png'),
  },
  {
    label: 'Edge',
    href: 'https://play.google.com/store/apps/details?id=co.edgesecure.app',
    iconLoader: () => require('@assets/images/wallets/Edge.png'),
  },
  {
    label: 'Samourai Wallet',
    href: 'https://play.google.com/store/apps/details?id=com.samourai.wallet',
    iconLoader: () => require('@assets/images/wallets/Samourai.png'),
  },
  {
    label: 'Wallet of Satoshi',
    href: 'https://play.google.com/store/apps/details?id=com.livingroomofsatoshi.wallet',
    iconLoader: () => require('@assets/images/wallets/Walletofsatoshi.png'),
  },
];

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { t } = useTranslation();

  return (
    <View {...props} className="flex-1 bg-surface-100">
      <ScrollView>
        <DrawerHeader />
        <Typography className="text-gray-50 px-4 mb-1 mt-3">{t('findUsAt')}</Typography>
        <View className="gap-y-0.5">
          {socialLinks.map((link, idx) => (
            <DrawerLink key={idx} {...link} />
          ))}
        </View>
        <DrawerDivider />
        <Typography className="text-gray-50 px-4 mb-1">{t('partners')}</Typography>
        <View className="gap-y-0.5">
          <DrawerLink
            icon={<Image source={TrocadorLogo} className="w-5 h-5 rounded-full" />}
            label="Trocador"
            href="https://trocador.app/?ref=EQNKoL6uc6"
            isFeautured={true}
          />
          {providerLinks.map((link, idx) => (
            <DrawerLink
              key={idx}
              icon={
                <Image
                  source={providerSquareLogoLoaders[link.label as keyof typeof providerSquareLogoLoaders]()}
                  className="w-5 h-5 rounded-full"
                />
              }
              {...link}
            />
          ))}
        </View>
        <DrawerDivider />
        <Typography className="text-gray-50 px-4 mb-1">{t('wallets')}</Typography>
        <View className="gap-y-0.5 pb-2">
          {walletLinks.map((link, idx) => (
            <DrawerLink
              key={idx}
              icon={<Image source={link.iconLoader()} className="w-5 h-5 rounded-full" />}
              {...link}
            />
          ))}
        </View>
      </ScrollView>
      <DrawerVersion />
    </View>
  );
};
