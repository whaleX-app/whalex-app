import { useCoin } from '@hooks/useCoin';
import { renderHook } from '@testing-library/react-native';

jest.mock('@config/coins', () => ({
  coins: [
    {
      network: 'network1',
      ticker: 'ticker1',
    },
    {
      network: 'network2',
      ticker: 'ticker2',
    },
    {
      network: 'network3',
      ticker: 'ticker3',
    },
  ],
}));

describe('useCoin', () => {
  it('returns correct coin', () => {
    const { result } = renderHook(() => useCoin('ticker2', 'network2'));

    expect(result.current.ticker).toEqual('ticker2');
    expect(result.current.network).toEqual('network2');
  });
});
