import { RadioGroup, RadioGroupOption } from '@components/RadioGroup';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('RadioGroup', () => {
  const options: RadioGroupOption<string>[] = [
    {
      label: 'Option1',
      value: 'Value1',
    },
    {
      label: 'Option2',
      value: 'Value2',
    },
  ];

  it('renders correctly', () => {
    render(<RadioGroup selectedOption="Option1" options={options} onSelect={() => {}} />);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeTruthy();
    });
  });

  it('triggers event', () => {
    const onSelect = jest.fn();

    render(<RadioGroup selectedOption="Option1" options={options} onSelect={onSelect} />);
    fireEvent.press(screen.getByText('Option2'));

    expect(onSelect).toHaveBeenCalledWith('Value2');
  });
});
