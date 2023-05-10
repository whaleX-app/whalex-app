import { TradeStatus } from '@generated/gql';
import { createTrade } from '../../../test-utils';
import { render, screen } from '@testing-library/react-native';
import { StatusPanel } from '@modules/trade/components/StatusPanel';

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

  it('renders expired status for trade whose status has yet not been updated.', () => {
    const trade = createTrade({ status: TradeStatus.Waiting, expiresAt: '2023-04-24T12:18:14Z' });

    render(<StatusPanel trade={trade} />);

    expect(screen.getByText('statusDescription.expired')).toBeTruthy();
  });
});
