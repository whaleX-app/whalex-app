import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { CoinInput } from '@components/CoinInput';
import { CreateTradeStep1Form } from '@modules/create-trade/components/CreateTradeStep1Form';
import { Button } from '@components/Button';
import { TradeMode } from '@generated/gql';
import { TradeModeRadioGroup } from '@modules/create-trade/components/TradeModeRadioGroup';
import { Toast } from '@libs/Toast';
import { getCoinByTicker } from '../../../test-utils';

jest.mock('@libs/Toast');
jest.mock('@libs/api-client', () => ({
  apiClient: {
    offers: jest.fn().mockImplementation(() => ({
      offers: {
        createTradeId: 'test-id',
        offers: ['offer1', 'offer2'],
      },
    })),
  },
}));

const toastMock = jest.mocked(Toast);

const btcCoin = getCoinByTicker('btc');
const xmrCoin = getCoinByTicker('xmr');

describe('CreateTradeStep1Form', () => {
  afterEach(() => jest.clearAllMocks());

  it('completes form with standard mode', async () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep1Form onComplete={onComplete} />);

    const coinInputs = screen.UNSAFE_getAllByType(CoinInput);
    const sendCoinInput = coinInputs[0];

    await waitFor(() => {
      fireEvent(sendCoinInput, 'onAmountUpdate', 1);
      fireEvent.press(screen.UNSAFE_getByType(Button));
    });

    expect(onComplete).toHaveBeenCalledWith({
      mode: TradeMode.Standard,
      coinFrom: btcCoin,
      coinTo: xmrCoin,
      amountFrom: 1,
      amountTo: undefined,
      createTradeId: 'test-id',
      offers: ['offer1', 'offer2'],
    });
  });

  it('completes form with payment mode', async () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep1Form onComplete={onComplete} />);

    const coinInputs = screen.UNSAFE_getAllByType(CoinInput);
    const receiveCoinInput = coinInputs[1];

    await waitFor(() => {
      fireEvent(screen.UNSAFE_getByType(TradeModeRadioGroup), 'onSelect', TradeMode.Payment);
      fireEvent(receiveCoinInput, 'onAmountUpdate', 5.0035);
      fireEvent.press(screen.UNSAFE_getByType(Button));
    });

    expect(onComplete).toHaveBeenCalledWith({
      mode: TradeMode.Payment,
      coinFrom: btcCoin,
      coinTo: xmrCoin,
      amountFrom: undefined,
      amountTo: 5.0035,
      createTradeId: 'test-id',
      offers: ['offer1', 'offer2'],
    });
  });

  it('fails send min amount validation', async () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep1Form onComplete={onComplete} />);

    const coinInputs = screen.UNSAFE_getAllByType(CoinInput);
    const sendCoinInput = coinInputs[0];

    await waitFor(() => {
      fireEvent(screen.UNSAFE_getByType(TradeModeRadioGroup), 'onSelect', TradeMode.Standard);
      fireEvent(sendCoinInput, 'onAmountUpdate', 0.000001);
      fireEvent.press(screen.UNSAFE_getByType(Button));
    });

    expect(toastMock.show).toHaveBeenCalledWith('validation.amountFromMin');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  it('fails send max amount validation', async () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep1Form onComplete={onComplete} />);

    const coinInputs = screen.UNSAFE_getAllByType(CoinInput);
    const sendCoinInput = coinInputs[0];

    await waitFor(() => {
      fireEvent(screen.UNSAFE_getByType(TradeModeRadioGroup), 'onSelect', TradeMode.Standard);
      fireEvent(sendCoinInput, 'onAmountUpdate', 9999999999999);
      fireEvent.press(screen.UNSAFE_getByType(Button));
    });

    expect(toastMock.show).toHaveBeenCalledWith('validation.amountFromMax');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  it('fails receive min amount validation', async () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep1Form onComplete={onComplete} />);

    const coinInputs = screen.UNSAFE_getAllByType(CoinInput);
    const receiveCoinInput = coinInputs[1];

    await waitFor(() => {
      fireEvent(screen.UNSAFE_getByType(TradeModeRadioGroup), 'onSelect', TradeMode.Payment);
      fireEvent(receiveCoinInput, 'onAmountUpdate', 0.000001);
      fireEvent.press(screen.UNSAFE_getByType(Button));
    });

    expect(toastMock.show).toHaveBeenCalledWith('validation.amountToMin');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  it('fails receive max amount validation', async () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep1Form onComplete={onComplete} />);

    const coinInputs = screen.UNSAFE_getAllByType(CoinInput);
    const receiveCoinInput = coinInputs[1];

    await waitFor(() => {
      fireEvent(screen.UNSAFE_getByType(TradeModeRadioGroup), 'onSelect', TradeMode.Payment);
      fireEvent(receiveCoinInput, 'onAmountUpdate', 9999999999999);
      fireEvent.press(screen.UNSAFE_getByType(Button));
    });

    expect(toastMock.show).toHaveBeenCalledWith('validation.amountToMax');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });
});
