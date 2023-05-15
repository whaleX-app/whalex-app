export const extend = jest.fn();

export default jest.fn().mockReturnValue({ fromNow: jest.fn(), format: jest.fn(), isBefore: jest.fn() });
