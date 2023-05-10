import { useState } from 'react';
import { ScrollView, View, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import logo from '@assets/images/logo.png';
import { useNavigation } from '@hooks/useNavigation';
import { Typography } from '@components/Typography';
import { Topbar } from '@components/Topbar';
import { Footer } from '@components/Footer';
import { CreateTradeStep1Result } from '../types';
import { CreateTradeStep1Form } from '../components/CreateTradeStep1Form';
import { CreateTradeStep2Form } from '../components/CreateTradeStep2Form';
import { TelegramIcon } from '@components/icons/TelegramIcon';

export const CreateTradeScreen = () => {
  const navigation = useNavigation();
  const [step1Result, setStep1Result] = useState<CreateTradeStep1Result>();

  return (
    <View className="flex-1">
      <ScrollView className="px-6 bg-black">
        <Topbar
          isHomeScreen={true}
          actionComponent={
            <TouchableOpacity onPress={() => Linking.openURL('https://t.me/whaleXapp')}>
              <TelegramIcon size={38} bgColor="transparent" />
            </TouchableOpacity>
          }
        />
        <Image className="h-20 w-20 mx-auto" source={logo} />
        <Typography className="text-primary text-[32px] text-center">whaleX.app</Typography>
        <Typography className="text-gray-50 text-xl text-center">Safe cryptocurrency exchanges</Typography>
        <View className="px-2 py-10">
          {step1Result ? (
            <CreateTradeStep2Form
              step1Result={step1Result}
              onGoBack={() => setStep1Result(undefined)}
              onComplete={(trade) => {
                setStep1Result(undefined);
                navigation.navigate('Trade', { id: trade.id });
              }}
            />
          ) : (
            <CreateTradeStep1Form onComplete={(result) => setStep1Result(result)} />
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};
