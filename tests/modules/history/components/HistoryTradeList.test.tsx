import { TradeStatus } from '@generated/gql';
import { HistoryTradePanel } from '@modules/history/components/HistoryTradePanel';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { apiClient } from '@libs/api-client';
import { HistoryTradeList } from '@modules/history/components/HistoryTradeList';
import { useTradeStore } from '@stores/useTradeStore';
import { Toast } from '@libs/Toast';
import { LocalTrade } from '@types';
import { createTrade } from '../../../test-utils';

jest.mock('@libs/api-client');
jest.mock('@stores/useTradeStore');
jest.mock('@libs/Toast');

const apiClientMock = jest.mocked(apiClient);
const useTradeStoreMock = jest.mocked(useTradeStore);
const toastMock = jest.mocked(Toast);

const deleteTradeFromStoreMock = jest.fn();

useTradeStoreMock.mockReturnValue(deleteTradeFromStoreMock);

describe('HistoryTradeList', () => {
  it('deletes trade', () => {
    const trade = createTrade();

    render(<HistoryTradeList trades={[trade]} />);
    fireEvent(screen.UNSAFE_getByType(HistoryTradePanel), 'onDelete', trade);

    expect(apiClientMock.deleteTrade).toHaveBeenCalledWith({ id: trade.id });
    expect(deleteTradeFromStoreMock).toHaveBeenCalledWith(trade);
    expect(toastMock.show).toHaveBeenCalledWith('tradeDeleted');
  });
});
