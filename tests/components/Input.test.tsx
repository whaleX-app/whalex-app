import { fireEvent, render, screen } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import { Input } from '@components/Input';

describe('Input', () => {
  it('renders correctly', () => {
    const value = 'Input value';
    const label = 'Input label';

    render(<Input value={value} label={label} onChange={() => {}} />);

    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.UNSAFE_getByType(TextInput)).toBeTruthy();
  });

  it('triggers event', () => {
    const value = 'Input value';
    const label = 'Input label';
    const onChange = jest.fn();

    render(<Input value={value} label={label} onChange={onChange} />);
    fireEvent.changeText(screen.UNSAFE_getByType(TextInput), 'New input value');

    expect(onChange).toHaveBeenCalledWith('New input value');
  });
});
