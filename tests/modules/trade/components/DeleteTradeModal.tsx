import { TradeStatus } from '@generated/gql';
import { createTrade } from '../../../test-utils';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useNavigation } from '@hooks/useNavigation';
import { DeleteTradeModal } from '@modules/trade/components/DeleteTradeModal';

jest.mock('@hooks/useNavigation');

const navigateMock = jest.fn();
const useNavigationMock = jest.mocked(useNavigation);

useNavigationMock.mockReturnValue({ navigate: navigateMock } as any);

describe('DeleteTradeModal', () => {
  it('deletes trade', () => {
    const trade = createTrade({ provider: 'Swapuz', status: TradeStatus.Waiting, amountFrom: 5.54, amountTo: 120 });
    const deleteTrade = jest.fn();

    render(<DeleteTradeModal isOpen={true} onClose={() => {}} trade={trade} deleteTrade={deleteTrade} />);
    fireEvent.press(screen.getByText('deleteTrade'));

    expect(deleteTrade).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('History');
  });
});
