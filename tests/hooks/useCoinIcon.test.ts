import { renderHook } from '@testing-library/react-native';
import { coinIconLoaders } from '@utils/coin-icon-loaders';
import { useCoinIcon } from '@hooks/useCoinIcon';

jest.mock('@utils/coin-icon-loaders', () => ({
  coinIconLoaders: {
    ticker1: jest.fn().mockReturnValue({ default: 'ticker1' }),
    ticker2: jest.fn().mockReturnValue({ default: 'ticker2' }),
  },
}));

describe('useCoinIcon', () => {
  it('returns the correct icon', () => {
    const { result } = renderHook(() => useCoinIcon('ticker1'));

    expect(result.current).toBe(coinIconLoaders['ticker1' as keyof typeof coinIconLoaders]().default);
  });

  it('returns undefined', () => {
    const { result } = renderHook(() => useCoinIcon('ticker3'));

    expect(result.current).toBeUndefined();
  });
});
