import { fireEvent, render, screen } from '@testing-library/react-native';
import { TradeScreen } from '@modules/trade';
import { TradeStatus } from '@generated/gql';
import { useTrade } from '@hooks/useTrade';
import { createTrade } from '../../../test-utils';
import * as Clipboard from 'expo-clipboard';
import { useRoute } from '@hooks/useRoute';

jest.mock('@hooks/useRoute');
jest.mock('@hooks/useTrade');
jest.mock('expo-clipboard');

const ClipboardMock = jest.mocked(Clipboard);
const useRouteMock = jest.mocked(useRoute);
const useTradeMock = jest.mocked(useTrade);

useRouteMock.mockReturnValue({ params: { id: 1 } } as any);

describe('TradeScreen', () => {
  it('renders trade correctly', () => {
    const trade = createTrade({ provider: 'Swapuz', status: TradeStatus.Waiting, amountFrom: 5.54, amountTo: 120 });

    useTradeMock.mockReturnValue({ trade: trade, deleteTrade: jest.fn() });

    render(<TradeScreen />);

    expect(screen.getByText('statusType.waiting'));
    expect(screen.getByText('statusDescription.waiting'));
  });

  it('copies address to clipboard', () => {
    const trade = createTrade({ provider: 'Swapuz', status: TradeStatus.Waiting, amountFrom: 5.54, amountTo: 120 });

    useTradeMock.mockReturnValue({ trade: trade, deleteTrade: jest.fn() });

    render(<TradeScreen />);
    fireEvent.press(screen.getByText(trade.addressProvider));

    expect(ClipboardMock.setStringAsync).toHaveBeenCalledWith(trade.addressProvider);
  });
});
