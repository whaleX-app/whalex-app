import { Button } from '@components/Button';
import { render, screen, fireEvent } from '@testing-library/react-native';

describe('Button', () => {
  it('triggers callback', () => {
    const cb = jest.fn();

    render(<Button variant="primary" label="Test" onPress={cb} />);
    fireEvent.press(screen.getByText('Test'));

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('is disabled', () => {
    const cb = jest.fn();

    render(<Button variant="primary" label="Test" onPress={cb} disabled={true} />);
    fireEvent.press(screen.getByText('Test'));

    expect(cb).toHaveBeenCalledTimes(0);
  });
});
