import { fireEvent, render, screen } from '@testing-library/react-native';
import { coins } from '@config/coins';
import { CreateTradeScreen } from '@modules/create-trade';
import { CreateTradeStep1Form } from '@modules/create-trade/components/CreateTradeStep1Form';
import { CreateTradeStep2Form } from '@modules/create-trade/components/CreateTradeStep2Form';
import { CreateTradeStep1Result } from '@modules/create-trade/types';
import { TradeMode } from '@generated/gql';

describe('CreateTradeScreen', () => {
  it('renders step1 form', () => {
    render(<CreateTradeScreen />);

    expect(screen.UNSAFE_getByType(CreateTradeStep1Form)).toBeTruthy();
  });

  it('renders step2 form', async () => {
    const btcCoin = coins.find((coin) => coin.ticker === 'btc')!;
    const xmrCoin = coins.find((coin) => coin.ticker === 'xmr')!;
    const step1Result: CreateTradeStep1Result = {
      mode: TradeMode.Payment,
      coinFrom: btcCoin,
      coinTo: xmrCoin,
      amountFrom: 1,
      amountTo: 2,
      offers: [],
      createTradeId: 'test-id',
    };

    render(<CreateTradeScreen />);
    fireEvent(screen.UNSAFE_getByType(CreateTradeStep1Form), 'onComplete', step1Result);

    expect(screen.UNSAFE_getByType(CreateTradeStep2Form)).toBeTruthy();
  });
});
