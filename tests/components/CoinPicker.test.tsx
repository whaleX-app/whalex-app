import { render, screen, fireEvent } from '@testing-library/react-native';
import { coins } from '@config/coins';
import { CoinPicker } from '@components/CoinPicker';
import { Picker } from '@react-native-picker/picker';

const btcCoin = coins.find((coin) => coin.ticker === 'btc')!;
const xmrCoin = coins.find((coin) => coin.ticker === 'xmr')!;

describe('CoinPicker', () => {
  it('renders selected coin', () => {
    render(<CoinPicker coin={btcCoin} isLocked={false} />);

    expect(screen.getByText('Bitcoin')).toBeTruthy();
  });

  it('triggers event', () => {
    const onCoinSelect = jest.fn();

    render(<CoinPicker coin={btcCoin} isLocked={false} onCoinSelect={onCoinSelect} />);
    fireEvent(screen.UNSAFE_getByType(Picker), 'onValueChange', 'Monero');

    expect(onCoinSelect).toHaveBeenCalledWith(xmrCoin);
  });
});
