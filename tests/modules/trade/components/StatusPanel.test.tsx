import { TradeStatus } from '@generated/gql';
import { render, screen } from '@testing-library/react-native';
import { StatusPanel } from '@modules/trade/components/StatusPanel';
import { TradeUtils } from '@utils/TradeUtils';
import { createTrade } from '../../../test-utils';

jest.mock('@utils/TradeUtils');

const TradeUtilsMock = jest.mocked(TradeUtils);

describe('StatusPanel', () => {
  it('renders waiting status', () => {
    const trade = createTrade({ status: TradeStatus.Waiting });

    render(<StatusPanel trade={trade} />);

    expect(screen.getByText('statusDescription.waiting')).toBeTruthy();
  });

  it('renders confirming status', () => {
    const trade = createTrade({ status: TradeStatus.Confirming });

    render(<StatusPanel trade={trade} />);

    expect(screen.getByText('statusDescription.confirming')).toBeTruthy();
  });

  it('renders sending status', () => {
    const trade = createTrade({ status: TradeStatus.Sending });

    render(<StatusPanel trade={trade} />);

    expect(screen.getByText('statusDescription.sending')).toBeTruthy();
  });

  it('renders completed status', () => {
    const trade = createTrade({ status: TradeStatus.Completed });

    render(<StatusPanel trade={trade} />);

    expect(screen.getByText('statusDescription.completed')).toBeTruthy();
  });

  it('renders expired status', () => {
    const trade = createTrade({ status: TradeStatus.Expired });

    render(<StatusPanel trade={trade} />);

    expect(screen.getByText('statusDescription.expired')).toBeTruthy();
  });

  it('does not render expiration time for an expired trade whose status has yet not been confirmed by the server', () => {
    const trade = createTrade({ status: TradeStatus.Waiting, expiresAt: '2023-04-24T12:18:14Z' });

    TradeUtilsMock.resolveExpiresAt.mockReturnValueOnce(undefined);

    render(<StatusPanel trade={trade} />);

    expect(screen.queryByText('tradeExpires')).toBeNull();
  });
});
