import { Footer } from '@components/Footer';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useTrade } from '@hooks/useTrade';
import { useNavigation } from '@hooks/useNavigation';
import { Toast } from '@libs/Toast';

jest.mock('@hooks/useTrade');
jest.mock('@libs/Toast');

const useTradeMock = jest.mocked(useTrade);
const useNavigationMock = jest.mocked(useNavigation);
const toastMock = jest.mocked(Toast);

const navigateMock = jest.fn();
useNavigationMock.mockReturnValue({ navigate: navigateMock } as any);

const tradeMock = { id: 'test-id' };
useTradeMock.mockReturnValue({ trade: tradeMock } as any);

describe('Footer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to correct screens', () => {
    render(<Footer />);

    fireEvent.press(screen.getByText('trade'));
    fireEvent.press(screen.getByText('newTrade'));
    fireEvent.press(screen.getByText('history'));

    expect(navigateMock).toHaveBeenCalledWith('Trade', { id: 'test-id' });
    expect(navigateMock).toHaveBeenCalledWith('CreateTrade');
    expect(navigateMock).toHaveBeenCalledWith('History');
  });

  it('does not navigate to trade screen', () => {
    useTradeMock.mockReturnValue({ trade: undefined } as any);
    render(<Footer />);

    fireEvent.press(screen.getByText('trade'));

    expect(navigateMock).toHaveBeenCalledTimes(0);
    expect(toastMock.show).toHaveBeenCalledTimes(1);
  });
});
