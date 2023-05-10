import { render, screen, fireEvent } from '@testing-library/react-native';
import { coins } from '@config/coins';
import { CoinInput } from '@components/CoinInput';
import { CoinPicker } from '@components/CoinPicker';

const btcCoin = coins.find((coin) => coin.ticker === 'btc')!;
const xmrCoin = coins.find((coin) => coin.ticker === 'xmr')!;

describe('CoinInput', () => {
  it('triggers amount update event', () => {
    const onAmountUpdate = jest.fn();
    render(
      <CoinInput
        coin={btcCoin}
        type="send"
        amount={500}
        onAmountUpdate={onAmountUpdate}
        isAmountLocked={false}
        isCoinLocked={false}
      />
    );

    const input = screen.getByDisplayValue('500');
    fireEvent.changeText(input, '1.53');

    expect(onAmountUpdate).toHaveBeenCalledWith(1.53);
  });

  it('triggers coin update event', () => {
    const onCoinUpdate = jest.fn();

    render(
      <CoinInput
        coin={btcCoin}
        type="send"
        amount={500}
        onCoinUpdate={onCoinUpdate}
        isAmountLocked={false}
        isCoinLocked={false}
      />
    );
    const picker = screen.UNSAFE_getByType(CoinPicker);
    fireEvent(picker, 'onCoinSelect', xmrCoin);

    expect(onCoinUpdate).toHaveBeenCalledWith(xmrCoin);
  });
});
