import { OfferRateType, Trade, TradeMode } from '@generated/gql';
import { getCoinByTicker } from '../../../test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { CreateTradeStep2Form } from '@modules/create-trade/components/CreateTradeStep2Form';
import { CreateTradeStep1Result } from '@modules/create-trade/types';
import { Input } from '@components/Input';
import { apiClient } from '@libs/api-client';
import { ClientError } from 'graphql-request';
import { Toast } from '@libs/Toast';
import { OffersTable } from '@modules/create-trade/components/OffersTable';
import { RefundAddressInput } from '@modules/create-trade/components/RefundAddressInput';

jest.mock('@libs/api-client');
jest.mock('@libs/Toast');

const btcCoin = getCoinByTicker('btc');
const xmrCoin = getCoinByTicker('xmr');

const apiClientMock = jest.mocked(apiClient);
const toastMock = jest.mocked(Toast);

describe('CreateTradeStep2Form', () => {
  const step1Result: CreateTradeStep1Result = {
    mode: TradeMode.Standard,
    coinFrom: btcCoin,
    coinTo: xmrCoin,
    amountFrom: 1,
    amountTo: 0,
    createTradeId: 'test-id',
    offers: [
      { provider: 'Swapuz', amount: 5, insurance: 50, kycRating: 'a', rateType: OfferRateType.Fixed, waste: 5 },
      {
        provider: 'LocalMonero',
        amount: 7,
        insurance: 20,
        kycRating: 'b',
        rateType: OfferRateType.Floating,
        waste: 15,
      },
      {
        provider: 'Exch',
        amount: 9,
        insurance: 50,
        kycRating: 'c',
        rateType: OfferRateType.Fixed,
        waste: 25,
      },
    ],
  };

  afterEach(() => jest.clearAllMocks());

  it('fails offer validation', () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep2Form step1Result={step1Result} onGoBack={jest.fn()} onComplete={onComplete} />);

    fireEvent(screen.UNSAFE_getByType(Input), 'onChange', 'abc');
    fireEvent.press(screen.UNSAFE_getByProps({ label: 'exchange' }));

    expect(toastMock.show).toHaveBeenLastCalledWith('validation.selectedOfferRequired');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  it('fails receive address validation', () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep2Form step1Result={step1Result} onGoBack={jest.fn()} onComplete={onComplete} />);

    fireEvent(screen.UNSAFE_getByType(OffersTable), 'onSelect', step1Result.offers[0]);
    fireEvent.press(screen.UNSAFE_getByProps({ label: 'exchange' }));

    expect(toastMock.show).toHaveBeenLastCalledWith('validation.receiveAddressRequired');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  it('fails receive address validation on server', () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep2Form step1Result={step1Result} onGoBack={jest.fn()} onComplete={onComplete} />);

    apiClientMock.createTrade.mockImplementation(() => {
      throw new ClientError({ errors: [{ message: 'invalid_receive_address' }] } as any, {} as any);
    });

    fireEvent(screen.UNSAFE_getByType(OffersTable), 'onSelect', step1Result.offers[0]);
    fireEvent(screen.UNSAFE_getByType(Input), 'onChange', 'abc');
    fireEvent.press(screen.UNSAFE_getByProps({ label: 'exchange' }));

    expect(toastMock.show).toHaveBeenLastCalledWith('error.invalidReceiveAddress');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  it('fails refund address validation on server', () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep2Form step1Result={step1Result} onGoBack={jest.fn()} onComplete={onComplete} />);

    apiClientMock.createTrade.mockImplementation(() => {
      throw new ClientError({ errors: [{ message: 'invalid_refund_address' }] } as any, {} as any);
    });

    fireEvent(screen.UNSAFE_getByType(OffersTable), 'onSelect', step1Result.offers[0]);
    fireEvent(screen.UNSAFE_getByType(Input), 'onChange', 'abc');
    fireEvent(screen.UNSAFE_getByType(RefundAddressInput), 'onChange', 'abc');
    fireEvent.press(screen.UNSAFE_getByProps({ label: 'exchange' }));

    expect(toastMock.show).toHaveBeenLastCalledWith('error.invalidRefundAddress');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  it('fails to create trade due to provider error', () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep2Form step1Result={step1Result} onGoBack={jest.fn()} onComplete={onComplete} />);

    apiClientMock.createTrade.mockImplementation(() => {
      throw new ClientError({ errors: [{ message: 'provider' }] } as any, {} as any);
    });

    fireEvent(screen.UNSAFE_getByType(OffersTable), 'onSelect', step1Result.offers[0]);
    fireEvent(screen.UNSAFE_getByType(Input), 'onChange', 'abc');
    fireEvent(screen.UNSAFE_getByType(RefundAddressInput), 'onChange', 'abc');
    fireEvent.press(screen.UNSAFE_getByProps({ label: 'exchange' }));

    expect(toastMock.show).toHaveBeenLastCalledWith('error.provider');
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  it('creates the trade', async () => {
    const onComplete = jest.fn();

    render(<CreateTradeStep2Form step1Result={step1Result} onGoBack={jest.fn()} onComplete={onComplete} />);

    apiClientMock.createTrade.mockResolvedValue({ createTrade: { id: 'new-trade' } as Trade });

    await waitFor(() => {
      fireEvent(screen.UNSAFE_getByType(OffersTable), 'onSelect', step1Result.offers[1]);
      fireEvent(screen.UNSAFE_getByType(Input), 'onChange', 'abc');
      fireEvent(screen.UNSAFE_getByType(RefundAddressInput), 'onChange', 'abc');
      fireEvent.press(screen.UNSAFE_getByProps({ label: 'exchange' }));
    });

    expect(apiClientMock.createTrade).toHaveBeenCalledWith({
      id: step1Result.createTradeId,
      amount: step1Result.amountFrom,
      mode: step1Result.mode,
      networkFrom: step1Result.coinFrom.network,
      networkTo: step1Result.coinTo.network,
      tickerFrom: step1Result.coinFrom.ticker,
      tickerTo: step1Result.coinTo.ticker,
      provider: step1Result.offers[1].provider,
      receiveAddress: 'abc',
      refundAddress: 'abc',
    });
    expect(onComplete).toHaveBeenCalledWith({ id: 'new-trade' });
  });

  it('navigates back to step 1', async () => {
    const onComplete = jest.fn();
    const onGoBack = jest.fn();

    render(<CreateTradeStep2Form step1Result={step1Result} onGoBack={onGoBack} onComplete={onComplete} />);
    fireEvent.press(screen.UNSAFE_getByProps({ label: 'editTransaction' }));

    expect(onComplete).toHaveBeenCalledTimes(0);
    expect(onGoBack).toHaveBeenCalled();
  });
});
