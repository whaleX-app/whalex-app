import { useProviderLogo } from '@hooks/useProviderLogo';
import { renderHook } from '@testing-library/react-native';
import { providerLogoLoaders, providerSquareLogoLoaders } from '@utils/provider-logo-loaders';

jest.mock('@utils/provider-logo-loaders', () => ({
  providerLogoLoaders: {
    provider1: jest.fn(),
    provider2: jest.fn(),
  },
  providerSquareLogoLoaders: {
    provider1: jest.fn(),
    provider2: jest.fn(),
  },
}));

describe('useProviderLogo', () => {
  it('returns correct logo', () => {
    const { result } = renderHook(() => useProviderLogo('provider2'));

    expect(result.current).toBe(providerLogoLoaders['provider2' as keyof typeof providerLogoLoaders]());
  });

  it('returns correct square logo', () => {
    const { result } = renderHook(() => useProviderLogo('provider2', true));

    expect(result.current).toBe(providerSquareLogoLoaders['provider2' as keyof typeof providerSquareLogoLoaders]());
  });

  it('returns undefined', () => {
    const { result } = renderHook(() => useProviderLogo('provider3', true));

    expect(result.current).toBeUndefined();
  });
});
