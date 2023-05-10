import { Trade, TradeStatus } from '@generated/gql';
import { HistoryScreen } from '@modules/history';
import { useTradeStore } from '@stores/useTradeStore';
import { render, screen } from '@testing-library/react-native';
import { createTrade } from '../../../test-utils';

jest.mock('@stores/useTradeStore');

const trades: Trade[] = [
  createTrade({
    id: 'test-trade0',
    provider: 'Swapuz',
    status: TradeStatus.Waiting,
  }),
  createTrade({
    id: 'test-trade1',
    expiresAt: '2023-04-24T12:18:14Z',
    provider: 'LocalMonero',
    status: TradeStatus.Confirming,
  }),
  createTrade({
    id: 'test-trade2',
    provider: 'Exch',
    status: TradeStatus.Completed,
  }),
  createTrade({
    id: 'test-trade3',
    provider: 'LetsExchange',
    status: TradeStatus.Expired,
  }),
];

const useTradeStoreMock = jest.mocked(useTradeStore);
useTradeStoreMock.mockReturnValue(trades);

describe('HistoryScreen', () => {
  it('renders trades correctly', () => {
    render(<HistoryScreen />);

    expect(screen.getByText('Swapuz')).toBeTruthy();
    expect(screen.getByText('LocalMonero')).toBeTruthy();
    expect(screen.getByText('Exch')).toBeTruthy();
    expect(screen.getByText('LetsExchange')).toBeTruthy();
  });
});
