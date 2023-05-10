import { TradeStatus } from '@generated/gql';
import { HistoryTradePanel } from '@modules/history/components/HistoryTradePanel';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { createTrade } from '../../../test-utils';

jest.mock('@stores/useTradeStore');

const trades = [
  createTrade({
    expiresAt: '2023-04-24T12:18:14Z',
    id: 'trade-1',
    amountFrom: 1.53535,
    amountTo: 2.353535,
    status: TradeStatus.Confirming,
  }),
  createTrade({
    expiresAt: '2523-04-24T12:18:14Z',
    id: 'trade-2',
    amountFrom: 1.53535,
    amountTo: 2.353535,
    status: TradeStatus.Confirming,
  }),
];

describe('HistoryTradePanel', () => {
  it('renders correctly', () => {
    render(<HistoryTradePanel trade={trades[0]} onDelete={() => {}} />);

    expect(screen.getByText('Swapuz')).toBeTruthy();
    expect(screen.getByText('1.53535')).toBeTruthy();
    expect(screen.getByText('2.353535')).toBeTruthy();
  });

  it('renders relative expiration time', () => {
    render(<HistoryTradePanel trade={trades[1]} onDelete={() => {}} />);

    expect(screen.getByText('tradeExpires')).toBeTruthy();
  });

  it('triggers delete event', () => {
    const onDelete = jest.fn();

    render(<HistoryTradePanel trade={trades[1]} onDelete={onDelete} />);
    fireEvent.press(screen.UNSAFE_getByProps({ name: 'delete' }));

    expect(onDelete).toHaveBeenCalled();
  });
});
