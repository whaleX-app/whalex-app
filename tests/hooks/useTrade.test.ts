import { renderHook } from '@testing-library/react-native';
import { TradeStatus } from '@generated/gql';
import { useTrade } from '@hooks/useTrade';
import { useTradeStore } from '@stores/useTradeStore';
import { apiClient } from '@libs/api-client';

jest.mock('@stores/useTradeStore');
jest.mock('@libs/api-client');

const apiClientMock = jest.mocked(apiClient);
const useTradeStoreMock = jest.mocked(useTradeStore);
const deleteTradeFromStore = jest.fn();
const trades: any[] = [
  {
    id: 'id1',
    status: TradeStatus.Completed,
    expiresAt: '2023-04-24T12:18:14Z',
  },
  { id: 'id2', status: TradeStatus.Expired, expiresAt: '2023-04-24T12:18:14Z' },
  { id: 'id3', status: TradeStatus.Waiting, expiresAt: '2023-04-24T12:18:14Z' },
  { id: 'id4', status: TradeStatus.Waiting, expiresAt: '2553-04-25T12:18:14Z' },
];

describe('useTrade', () => {
  beforeEach(() => {
    useTradeStoreMock.mockReturnValueOnce(deleteTradeFromStore);
    useTradeStoreMock.mockReturnValueOnce(trades);
  });

  it('returns correct trade', () => {
    const { result } = renderHook(() => useTrade('id2'));
    expect(result.current.trade).toBe(trades.find((trade) => trade.id === 'id2'));
  });

  it('does not find trade', () => {
    const { result } = renderHook(() => useTrade('id5'));
    expect(result.current.trade).toBeUndefined();
  });

  it('returns ongoing trade', () => {
    const { result } = renderHook(() => useTrade());
    expect(result.current.trade).toBe(trades.find((trade) => trade.id === 'id3'));
  });

  it('deletes trade', () => {
    const { result } = renderHook(() => useTrade('id2'));

    result.current.deleteTrade();

    expect(apiClientMock.deleteTrade).toHaveBeenCalledWith({ id: 'id2' });
    expect(deleteTradeFromStore).toHaveBeenCalledWith(result.current.trade);
  });
});
