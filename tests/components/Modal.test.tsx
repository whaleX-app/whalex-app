import { Icon } from '@components/Icon';
import { Modal } from '@components/Modal';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('Modal', () => {
  const title = 'Modal test title';
  const content = 'Modal test content';

  it('renders correctly', () => {
    render(
      <Modal title={title} isOpen={true} onClose={() => {}}>
        <Text>{content}</Text>
      </Modal>
    );

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(content)).toBeTruthy();
  });

  it('closes modal', () => {
    const onClose = jest.fn();

    render(<Modal title={title} isOpen={true} onClose={onClose} />);
    fireEvent.press(screen.UNSAFE_queryByType(Icon));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
