import { Link } from '@components/Link';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('Link', () => {
  const url = 'http://test.com';

  it('renders correctly', () => {
    render(<Link url={url}>{url}</Link>);
    expect(screen.getByText(url)).toBeTruthy();
  });

  it('opens url', () => {
    render(<Link url={url}>{url}</Link>);
    fireEvent.press(screen.getByText(url));

    expect(Linking.openURL).toHaveBeenCalledWith(url);
  });
});
